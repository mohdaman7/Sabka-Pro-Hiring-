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
  listEmployerDocuments,
  reviewEmployerDocument,
  adminUpdateEmployerPlan,
  adminModerateJob,
  createCompany,
  listCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
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

// Employer document verification
router.get("/employers/:id/documents", listEmployerDocuments);
router.post("/employers/:id/documents/:docId/review", reviewEmployerDocument);

// Employer plan management
router.post("/employers/:id/plan", adminUpdateEmployerPlan);

// ============================================
// User Management
// ============================================
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/status", updateUserStatus);

// ============================================
// Platform Statistics
// ============================================
router.get("/dashboard/stats", getPlatformStats);

// ============================================
// Job Management (admin view)
// ============================================
router.get("/jobs", getAllJobsAdmin);
router.post("/jobs/:id/moderate", adminModerateJob);

// ============================================
// Application Management (admin view)
// ============================================
router.get("/applications", getAllApplications);

// ============================================
// Company Management
// ============================================
router.get("/companies", listCompanies);
router.post("/companies", createCompany);
router.get("/companies/:id", getCompanyById);
router.put("/companies/:id", updateCompany);
router.delete("/companies/:id", deleteCompany);

export default router;
