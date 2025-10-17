import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as courseController from "../controllers/courseController.js";
import * as moduleController from "../controllers/moduleController.js";
import * as courseUploadController from "../controllers/courseUploadController.js";
import { uploadCourseThumbnail, uploadCourseVideo, uploadMultipleFiles } from "../services/uploadService.js";

const router = Router();

// Public routes (no authentication required)
router.get("/", courseController.getCourses);
router.get("/featured", courseController.getFeaturedCourses);
router.get("/categories", courseController.getCourseCategories);
router.get("/:id", courseController.getCourseById);
router.get("/:id/modules", courseController.getCourseModules);
router.get("/:id/modules/:moduleId/videos", courseController.getModuleVideos);

// Student routes (authentication required)
router.use(authenticate, authorize(["student"]));

// Course enrollment and progress
router.get("/my/enrolled", courseController.getMyCourses);
router.get("/my/stats", courseController.getMyCourseStats);
router.get("/:id/progress", courseController.getCourseProgress);
router.post("/:id/progress", courseController.updateVideoProgress);

// Module routes
router.get("/modules", moduleController.getModules);
router.get("/modules/free", moduleController.getFreeModules);
router.get("/modules/:id", moduleController.getModuleById);
router.get("/modules/:id/videos", moduleController.getModuleVideos);
router.get("/modules/:id/progress", moduleController.getModuleProgress);
router.post("/modules/:id/purchase", moduleController.purchaseModule);
router.post("/modules/:id/progress", moduleController.updateModuleVideoProgress);
router.get("/my/modules", moduleController.getMyModules);
router.get("/my/modules/stats", moduleController.getMyModuleStats);

// Video Management
router.get("/videos/:videoId/embed", courseUploadController.getVideoEmbedCode);
router.get("/videos/:videoId/analytics", courseUploadController.getVideoAnalytics);
router.put("/videos/:videoId/settings", courseUploadController.updateVideoSettings);
router.delete("/videos/:videoId", courseUploadController.deleteVideo);

// File Upload (Admin only)
router.post("/upload/thumbnail", authenticate, authorize(["admin"]), uploadCourseThumbnail, courseUploadController.uploadCourseThumbnail);
router.post("/upload/video", authenticate, authorize(["admin"]), uploadCourseVideo, courseUploadController.uploadCourseVideo);
router.post("/upload/videos/bulk", authenticate, authorize(["admin"]), uploadMultipleFiles, courseUploadController.bulkUploadVideos);

export default router;