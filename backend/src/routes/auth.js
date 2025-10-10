import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

// OTP Routes
router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);

// Authentication Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
