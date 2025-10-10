import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as studentController from "../controllers/studentController.js";

const router = Router();

// Get student profile
router.get(
  "/profile",
  authenticate,
  authorize(["student"]),
  studentController.getProfile
);

// Update student profile
router.put(
  "/profile",
  authenticate,
  authorize(["student"]),
  studentController.updateProfile
);

export default router;
