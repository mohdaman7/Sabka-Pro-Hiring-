import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { UserModel } from "../models/User.js";
import { StudentModel } from "../models/Student.js";
import { EmployerModel } from "../models/Employer.js";
import { OTPModel } from "../models/OTP.js";
import { env } from "../config/env.js";
import { sendRegistrationAlert, sendOTPEmail } from "../utils/mailer.js";

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
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
  password: z.string().min(6),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
});

// Student-specific schema
const studentRegisterSchema = baseRegisterSchema.extend({
  role: z.literal("student"),
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        field: z.string(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .optional(),
  skills: z.array(z.string()).optional(),
});

// Employer-specific schema
const employerRegisterSchema = baseRegisterSchema.extend({
  role: z.literal("employer"),
  position: z.string().min(1, "Position is required"),
  department: z.string().optional(),
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    description: z.string().optional(),
    industry: z.string().optional(),
    size: z
      .enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
      .optional(),
    website: z.string().optional(),
    foundedYear: z.number().optional(),
  }),
});

// Combined register schema using discriminated union
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

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing OTPs for this phone
    await OTPModel.deleteMany({ phone: parsed.phone });

    // Save new OTP
    await OTPModel.create({
      phone: parsed.phone,
      email: parsed.email,
      otp,
      expiresAt,
    });

    // Log OTP for development (remove in production)
    console.log(`✅ OTP generated for ${parsed.phone}: ${otp}`);

    // Send OTP via email (non-blocking)
    if (parsed.email) {
      sendOTPEmail(parsed.email, otp).catch((err) =>
        console.error("Failed to send OTP email:", err.message)
      );
    }

    // TODO: Integrate SMS service (Twilio, MSG91, etc.)
    // await sendSMS(parsed.phone, `Your OTP is: ${otp}`);

    res.json({
      success: true,
      message: "OTP sent successfully",
      expiresIn: 600,
      // Remove in production:
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

    // Debug: Log what we're looking for
    console.log("📞 Looking for OTP with:", {
      phone: parsed.phone,
      otp: parsed.otp,
      currentTime: new Date(),
    });

    const otpDoc = await OTPModel.findOne({
      phone: parsed.phone,
      otp: parsed.otp,
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    // Debug: Log what we found
    console.log("📄 OTP Document found:", otpDoc);

    if (!otpDoc) {
      // Check why it failed
      const expiredOtp = await OTPModel.findOne({
        phone: parsed.phone,
        otp: parsed.otp,
        expiresAt: { $lte: new Date() },
      });

      const wrongOtp = await OTPModel.findOne({
        phone: parsed.phone,
        verified: false,
        expiresAt: { $gt: new Date() },
      });

      console.log("❌ OTP Verification Failed - Debug Info:", {
        expiredOtpExists: !!expiredOtp,
        wrongOtpExists: !!wrongOtp,
        wrongOtpValue: wrongOtp?.otp,
      });

      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Mark as verified
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

// Register (Combined endpoint)
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

    const passwordHash = await bcrypt.hash(parsed.password, 10);

    // Create user
    const user = await UserModel.create({
      email: parsed.email,
      passwordHash,
      role: parsed.role,
      firstName: parsed.firstName,
      lastName: parsed.lastName,
    });

    // Create profile based on role
    let profile = null;
    if (parsed.role === "student") {
      profile = await StudentModel.create({
        userId: user._id,
        phone: parsed.phone,
        phoneVerified: true,
        education: parsed.education || [],
        skills: parsed.skills || [],
      });

      console.log("🎓 Student profile created:", profile._id);
      // In the register function, modify the employer creation part:
    } else if (parsed.role === "employer") {
      // Create employer with basic info - position and company are optional now
      const employerData = {
        userId: user._id,
        contact: {
          phone: parsed.phone || "",
        },
        profileCompletion: 10, // Basic registration complete
      };

      // Add position if provided
      if (parsed.position) {
        employerData.position = parsed.position;
      }

      // Add company if provided
      if (parsed.company) {
        employerData.company = {
          name: parsed.company.name || "",
          description: parsed.company.description || "",
          industry: parsed.company.industry || "",
          size: parsed.company.size || "",
          website: parsed.company.website || "",
          foundedYear: parsed.company.foundedYear || null,
        };
      }

      profile = await EmployerModel.create(employerData);

      console.log("💼 Employer profile created:", profile._id);
    }

    // Send email alert to admin
    sendRegistrationAlert(user).catch((err) =>
      console.error("❌ Failed to send registration alert:", err)
    );

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      env.jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      data: serializeUser(user),
      token,
      profileId: profile?._id,
      message: "Registration successful. Please complete your profile.",
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    next(err);
  }
}

// Separate registration functions (alternative approach)
export async function registerStudent(req, res, next) {
  try {
    console.log("🎓 Student registration request:", req.body);

    const parsed = studentRegisterSchema.parse(req.body);

    const existingUser = await UserModel.findOne({ email: parsed.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const passwordHash = await bcrypt.hash(parsed.password, 10);

    const user = await UserModel.create({
      email: parsed.email,
      passwordHash,
      role: "student",
      firstName: parsed.firstName,
      lastName: parsed.lastName,
    });

    const studentProfile = await StudentModel.create({
      userId: user._id,
      phone: parsed.phone,
      phoneVerified: true,
      education: parsed.education || [],
      skills: parsed.skills || [],
    });

    // Send email alert to admin
    sendRegistrationAlert(user).catch((err) =>
      console.error("❌ Failed to send registration alert:", err)
    );

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      env.jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      data: serializeUser(user),
      token,
      profileId: studentProfile._id,
      message: "Student registration successful.",
    });
  } catch (err) {
    console.error("❌ Student registration error:", err);
    next(err);
  }
}

export async function registerEmployer(req, res, next) {
  try {
    console.log("💼 Employer registration request:", req.body);

    const parsed = employerRegisterSchema.parse(req.body);

    const existingUser = await UserModel.findOne({ email: parsed.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const passwordHash = await bcrypt.hash(parsed.password, 10);

    const user = await UserModel.create({
      email: parsed.email,
      passwordHash,
      role: "employer",
      firstName: parsed.firstName,
      lastName: parsed.lastName,
    });

    const employerProfile = await EmployerModel.create({
      userId: user._id,
      position: parsed.position,
      department: parsed.department || "",
      company: {
        name: parsed.company.name,
        description: parsed.company.description || "",
        industry: parsed.company.industry || "",
        size: parsed.company.size || "",
        website: parsed.company.website || "",
        foundedYear: parsed.company.foundedYear || null,
      },
      contact: {
        phone: parsed.phone || "",
      },
      profileCompletion: 30,
    });

    // Send email alert to admin
    sendRegistrationAlert(user).catch((err) =>
      console.error("❌ Failed to send registration alert:", err)
    );

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      env.jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      data: serializeUser(user),
      token,
      profileId: employerProfile._id,
      message: "Employer registration successful.",
    });
  } catch (err) {
    console.error("❌ Employer registration error:", err);
    next(err);
  }
}

// Login
export async function login(req, res, next) {
  try {
    const parsed = loginSchema.parse(req.body);
    const user = await UserModel.findOne({ email: parsed.email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const valid = await bcrypt.compare(parsed.password, user.passwordHash);
    if (!valid)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      data: serializeUser(user),
      token,
    });
  } catch (err) {
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
    profileCompleted: user.profileCompleted,
    createdAt: user.createdAt,
  };
}
