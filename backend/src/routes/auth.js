import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

// OTP Routes
router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);

// Authentication Routes (Choose one approach)

// Approach 1: Single register endpoint (recommended)
router.post("/register", authController.register);

// Approach 2: Separate endpoints (alternative)
// router.post("/register/student", authController.registerStudent);
// router.post("/register/employer", authController.registerEmployer);

router.post("/login", authController.login);

export default router;
