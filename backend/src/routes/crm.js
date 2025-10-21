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
  getCandidates,
  getPendingRegistrations,
  approveUser,
  rejectUser,
  updateEmployerVerification,
  updateEmployerPlanAdmin,
  updateEmployerDocumentStatus,
  changeJobStatusAdmin,
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

// ============================================
// User Management
// ============================================
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/status", updateUserStatus);

// Candidates listing with filters
router.get("/candidates", getCandidates);

// ============================================
// Platform Statistics
// ============================================
router.get("/dashboard/stats", getPlatformStats);

// ============================================
// Job Management (admin view)
// ============================================
router.get("/jobs", getAllJobsAdmin);
router.patch("/jobs/:jobId/status", changeJobStatusAdmin);

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

// ============================================
// Employer Admin Actions
// ============================================
router.patch("/employers/:id/verify", updateEmployerVerification);
router.patch("/employers/:id/plan", updateEmployerPlanAdmin);
router.patch("/employers/:id/documents/:docId", updateEmployerDocumentStatus);

export default router;
