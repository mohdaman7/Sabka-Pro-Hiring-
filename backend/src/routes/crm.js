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
  createCompany,
  listCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/crmController.js";
import * as adminCourseController from "../controllers/adminCourseController.js";

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
router.get("/dashboard/stats", getPlatformStats);

// ============================================
// Job Management (admin view)
// ============================================
router.get("/jobs", getAllJobsAdmin);

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
// Course Management (admin view)
// ============================================
// Course Management
router.post("/courses", adminCourseController.createCourse);
router.get("/courses", adminCourseController.getAllCourses);
router.get("/courses/:id", adminCourseController.getCourseById);
router.put("/courses/:id", adminCourseController.updateCourse);
router.delete("/courses/:id", adminCourseController.deleteCourse);
router.get("/courses/:id/analytics", adminCourseController.getCourseAnalytics);

// Category Management
router.post("/categories", adminCourseController.createCategory);
router.get("/categories", adminCourseController.getAllCategories);
router.put("/categories/:id", adminCourseController.updateCategory);
router.delete("/categories/:id", adminCourseController.deleteCategory);

// Module Management
router.post("/modules", adminCourseController.createModule);
router.get("/modules", adminCourseController.getAllModules);
router.put("/modules/:id", adminCourseController.updateModule);
router.delete("/modules/:id", adminCourseController.deleteModule);

// Video Management
router.post("/videos", adminCourseController.createVideo);
router.get("/videos", adminCourseController.getAllVideos);
router.put("/videos/:id", adminCourseController.updateVideo);
router.delete("/videos/:id", adminCourseController.deleteVideo);

// Analytics and Reports
router.get("/analytics", adminCourseController.getOverallAnalytics);

export default router;
