import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { UserModel } from "../models/User.js";
import { StudentModel } from "../models/Student.js";
import { EmployerModel } from "../models/Employer.js";
import { env } from "../config/env.js";
import { sendRegistrationAlert } from "../utils/mailer.js";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["student", "employer"]).default("student"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

router.post("/register", async (req, res, next) => {
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
    if (parsed.role === "student") {
      await StudentModel.create({ userId: user._id });
    } else if (parsed.role === "employer") {
      await EmployerModel.create({ userId: user._id });
    }

    // ✅ Send email alert to admin
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
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/login", async (req, res, next) => {
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
});

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

export default router;
