import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import {
  getAllUsers,
  getUserById,
  updateUserStatus,
  getPlatformStats,
  getAllJobsAdmin,
  getAllApplications,
} from "../controllers/crmController.js";

const router = Router();

// All CRM routes require admin authentication
router.use(authenticate, authorize(["admin"]));

// User management
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/status", updateUserStatus);

// Platform statistics
router.get("/stats", getPlatformStats);

// Job management (admin view)
router.get("/jobs", getAllJobsAdmin);

// Application management (admin view)
router.get("/applications", getAllApplications);

export default router;
