import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/auth.js"; // assuming authorize exists alongside authenticate
import { courseController } from "../controllers/courseController.js";

const router = Router();

// Public
router.get("/", courseController.listPublicCourses);
router.get("/:id", courseController.getCourseById);

// Authenticated student
router.get("/me/access", authenticate, courseController.listMyAccess);
router.get("/me/recommendations", authenticate, courseController.getRecommendations);

// Admin endpoints (under /api/admin via crm router usually; provide here as well if mounted separately)
router.post("/admin/parent", authenticate, authorize(["admin"]), courseController.adminCreateParentCourse);
router.post("/admin/module", authenticate, authorize(["admin"]), courseController.adminCreateSubCourse);
router.post("/admin/:id/lessons", authenticate, authorize(["admin"]), courseController.adminAddLesson);
router.get("/admin", authenticate, authorize(["admin"]), courseController.adminListCourses);
router.put("/admin/:id", authenticate, authorize(["admin"]), courseController.adminUpdateCourse);
router.delete("/admin/:id", authenticate, authorize(["admin"]), courseController.adminDeleteCourse);
router.get("/admin/accesses", authenticate, authorize(["admin"]), courseController.adminListAccesses);

export default router;
