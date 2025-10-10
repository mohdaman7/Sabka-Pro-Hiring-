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

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["student", "employer"]).default("student"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
});

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

    // Mark as verified
    otpDoc.verified = true;
    await otpDoc.save();

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    next(err);
  }
}

// Register
export async function register(req, res, next) {
  try {
    const parsed = registerSchema.parse(req.body);

    const existing = await UserModel.findOne({ email: parsed.email });
    if (existing)
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });

    const passwordHash = await bcrypt.hash(parsed.password, 10);
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
        phoneVerified: true, // Assuming OTP was verified
      });
    } else if (parsed.role === "employer") {
      profile = await EmployerModel.create({ userId: user._id });
    }

    // Send email alert to admin
    sendRegistrationAlert(user).catch((err) =>
      console.error("❌ Failed to send registration alert:", err)
    );

    const token = jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      data: serializeUser(user),
      token,
      message: "Registration successful. Please complete your profile.",
    });
  } catch (err) {
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

    res.json({ success: true, data: serializeUser(user), token });
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
