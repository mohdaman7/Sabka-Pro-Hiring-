// backend/src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { UserModel } from "../models/User.js";
import { StudentModel } from "../models/Student.js";
import { EmployerModel } from "../models/Employer.js";
import { OTPModel } from "../models/OTP.js";
import { env } from "../config/env.js";
import {
  sendRegistrationAlert,
  sendOTPEmail,
  sendApprovalEmail,
  sendRegistrationConfirmation,
} from "../utils/mailer.js";

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate random password
function generatePassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Schemas
const sendOTPSchema = z.object({
  phone: z.string().min(10),
  email: z.string().email().optional(),
});

const verifyOTPSchema = z.object({
  phone: z.string().min(10),
  otp: z.string().length(6),
});

// Base registration schema
const baseRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
});

// Student-specific schema
const studentRegisterSchema = baseRegisterSchema.extend({
  role: z.literal("student"),
  experienceType: z.enum(["fresher", "experienced"]).optional(),
  location: z.string().optional(),
  kycType: z.string().optional(),
  kycNumber: z.string().optional(),
});

// Employer-specific schema
const employerRegisterSchema = baseRegisterSchema.extend({
  role: z.literal("employer"),
  position: z.string().optional(),
  department: z.string().optional(),
  location: z.string().optional(),
  kycType: z.string().optional(),
  kycNumber: z.string().optional(),
  company: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      industry: z.string().optional(),
      size: z.string().optional(),
      website: z.string().optional(),
    })
    .optional(),
});

// Combined register schema
const registerSchema = z.discriminatedUnion("role", [
  studentRegisterSchema,
  employerRegisterSchema,
]);

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Send OTP
export async function sendOTP(req, res, next) {
  try {
    console.log("📱 Send OTP request:", req.body);
    const parsed = sendOTPSchema.parse(req.body);

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTPModel.deleteMany({ phone: parsed.phone });

    await OTPModel.create({
      phone: parsed.phone,
      email: parsed.email,
      otp,
      expiresAt,
    });

    console.log(`✅ OTP generated for ${parsed.phone}: ${otp}`);

    if (parsed.email) {
      sendOTPEmail(parsed.email, otp).catch((err) =>
        console.error("Failed to send OTP email:", err.message)
      );
    }

    res.json({
      success: true,
      message: "OTP sent successfully",
      expiresIn: 600,
      otp: process.env.NODE_ENV === "development" ? otp : undefined,
    });
  } catch (err) {
    console.error("❌ Send OTP error:", err);
    next(err);
  }
}

// Verify OTP
export async function verifyOTP(req, res, next) {
  try {
    console.log("🔍 Verify OTP request:", req.body);
    const parsed = verifyOTPSchema.parse(req.body);

    const otpDoc = await OTPModel.findOne({
      phone: parsed.phone,
      otp: parsed.otp,
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    otpDoc.verified = true;
    await otpDoc.save();

    console.log("✅ OTP verified successfully for:", parsed.phone);

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.error("❌ Verify OTP error:", err);
    next(err);
  }
}

// Register (Creates pending user)
export async function register(req, res, next) {
  try {
    console.log("📝 Register request:", req.body);
    const parsed = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: parsed.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create temporary password (won't be used until approval)
    const tempPassword = parsed.password || generatePassword();
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    // Create user with PENDING status
    const user = await UserModel.create({
      email: parsed.email,
      passwordHash,
      role: parsed.role,
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      status: "pending", // User is pending approval
    });

    // Create profile based on role
    let profile = null;
    if (parsed.role === "student") {
      profile = await StudentModel.create({
        userId: user._id,
        phone: parsed.phone,
        phoneVerified: true,
        experienceType: parsed.experienceType || "fresher",
        address: {
          city: parsed.location || "",
        },
        kycInfo: {
          type: parsed.kycType,
          number: parsed.kycNumber,
          verified: false,
        },
      });
      console.log("🎓 Student profile created:", profile._id);
    } else if (parsed.role === "employer") {
      const employerData = {
        userId: user._id,
        contact: {
          phone: parsed.phone || "",
          address: {
            city: parsed.location || "",
          },
        },
        position: parsed.position || "",
        department: parsed.department || "",
        profileCompletion: 10,
      };

      if (parsed.company) {
        employerData.company = {
          name: parsed.company.name || "",
          description: parsed.company.description || "",
          industry: parsed.company.industry || "",
          size: parsed.company.size || "",
          website: parsed.company.website || "",
        };
      }

      profile = await EmployerModel.create(employerData);
      console.log("💼 Employer profile created:", profile._id);
    }

    // Send registration confirmation to user (non-blocking)
    sendRegistrationConfirmation(user, profile).catch((err) =>
      console.error("❌ Failed to send registration confirmation:", err)
    );

    // Send email alert to admin (non-blocking)
    sendRegistrationAlert(user, profile).catch((err) =>
      console.error("❌ Failed to send registration alert:", err)
    );

    res.status(201).json({
      success: true,
      message:
        "Registration submitted successfully. Your account is pending approval. You will receive an email confirmation shortly.",
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    next(err);
  }
}

// Login (Only for approved users)
export async function login(req, res, next) {
  try {
    const parsed = loginSchema.parse(req.body);
    const user = await UserModel.findOne({ email: parsed.email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user is approved
    if (user.status === "pending") {
      return res.status(403).json({
        success: false,
        message:
          "Your account is pending approval. Please wait for admin confirmation.",
        status: "pending",
      });
    }

    if (user.status === "rejected") {
      return res.status(403).json({
        success: false,
        message:
          "Your account application was rejected. Please contact support for more information.",
        status: "rejected",
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Please contact support.",
        status: "inactive",
      });
    }

    const valid = await bcrypt.compare(parsed.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      env.jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Get user profile based on role
    let profile = null;
    if (user.role === "student") {
      profile = await StudentModel.findOne({ userId: user._id });
    } else if (user.role === "employer") {
      profile = await EmployerModel.findOne({ userId: user._id });
    }

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: serializeUser(user),
        profile: profile || null,
        token,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    next(err);
  }
}

// Helper function
function serializeUser(user) {
  return {
    id: user._id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    status: user.status,
    createdAt: user.createdAt,
  };
}
