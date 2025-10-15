// backend/src/routes/crm.js
import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import {
  getAllUsers,
  getUserById,
  updateUserStatus,
  getPlatformStats,
  getAllJobsAdmin,
  getAllApplications,
  getPendingRegistrations,
  approveUser,
  rejectUser,
  getAllCandidatesAdmin,
  getAllEmployersAdmin,
} from "../controllers/crmController.js";

const router = Router();

// All CRM routes require admin authentication
// router.use(authenticate, authorize(["admin"]));

// ============================================
// NEW: Pending Registrations Management
// ============================================
router.get("/pending", getPendingRegistrations);
router.post("/approve/:id", approveUser);
router.post("/reject/:id", rejectUser);

// ============================================
// User Management
// ============================================
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/status", updateUserStatus);

// ============================================
// Platform Statistics
// ============================================
router.get("/stats", getPlatformStats);

// ============================================
// Admin lists for CRM: candidates and employers
// ============================================
router.get("/candidates", getAllCandidatesAdmin);
router.get("/employers", getAllEmployersAdmin);

// ============================================
// Job Management (admin view)
// ============================================
router.get("/jobs", getAllJobsAdmin);

// ============================================
// Application Management (admin view)
// ============================================
router.get("/applications", getAllApplications);

export default router;
