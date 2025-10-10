import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import {
  applyForJob,
  getMyApplications,
  getApplicationsForMyJobs,
  updateApplicationStatus,
  getApplicationById,
  withdrawApplication,
  getApplicationStats,
} from "../controllers/applicationController.js";

const router = Router();

// Student routes
router.post("/apply", authenticate, authorize(["student"]), applyForJob);
router.get(
  "/student/my-applications",
  authenticate,
  authorize(["student"]),
  getMyApplications
);
router.get(
  "/student/stats",
  authenticate,
  authorize(["student"]),
  getApplicationStats
);
router.get(
  "/:id",
  authenticate,
  authorize(["student", "employer", "admin"]),
  getApplicationById
);
router.patch(
  "/:id/withdraw",
  authenticate,
  authorize(["student"]),
  withdrawApplication
);

// Employer routes
router.get(
  "/employer/my-applications",
  authenticate,
  authorize(["employer", "admin"]),
  getApplicationsForMyJobs
);
router.get(
  "/employer/stats",
  authenticate,
  authorize(["employer", "admin"]),
  getApplicationStats
);
router.patch(
  "/:id/status",
  authenticate,
  authorize(["employer", "admin"]),
  updateApplicationStatus
);

export default router;
