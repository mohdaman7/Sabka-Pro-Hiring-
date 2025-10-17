// routes/student.js (updated)
import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as studentController from "../controllers/studentController.js";
import * as courseController from "../controllers/courseController.js";
import * as moduleController from "../controllers/moduleController.js";
import {
  uploadProfilePicture,
  uploadResume,
} from "../controllers/uploadController.js";

const router = Router();

// Get student profile
router.get("/profile", authenticate, studentController.getProfile);

// Update student profile
router.put("/profile", authenticate, studentController.updateProfile);

// Upload profile picture
router.post("/upload-profile-picture", authenticate, uploadProfilePicture);

// Upload resume
router.post("/upload-resume", authenticate, uploadResume);

// Support tickets
router.get(
  "/support/tickets",
  authenticate,
  authorize(["student"]),
  studentController.listMySupportTickets
);
router.post(
  "/support/tickets",
  authenticate,
  authorize(["student"]),
  studentController.createSupportTicket
);
router.get(
  "/support/tickets/:id",
  authenticate,
  authorize(["student"]),
  studentController.getMySupportTicketById
);

// Course Management for Students
router.get("/courses", courseController.getCourses);
router.get("/courses/featured", courseController.getFeaturedCourses);
router.get("/courses/categories", courseController.getCourseCategories);
router.get("/courses/:id", courseController.getCourseById);
router.get("/courses/:id/modules", courseController.getCourseModules);
router.get("/courses/:id/modules/:moduleId/videos", courseController.getModuleVideos);
router.get("/courses/my/enrolled", courseController.getMyCourses);
router.get("/courses/my/stats", courseController.getMyCourseStats);
router.get("/courses/:id/progress", courseController.getCourseProgress);
router.post("/courses/:id/progress", courseController.updateVideoProgress);

// Module Management for Students
router.get("/modules", moduleController.getModules);
router.get("/modules/free", moduleController.getFreeModules);
router.get("/modules/:id", moduleController.getModuleById);
router.get("/modules/:id/videos", moduleController.getModuleVideos);
router.get("/modules/:id/progress", moduleController.getModuleProgress);
router.post("/modules/:id/purchase", moduleController.purchaseModule);
router.post("/modules/:id/progress", moduleController.updateModuleVideoProgress);
router.get("/my/modules", moduleController.getMyModules);
router.get("/my/modules/stats", moduleController.getMyModuleStats);

export default router;
