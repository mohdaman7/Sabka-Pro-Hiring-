import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import {
  createJob,
  getAllJobs,
  getMyJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobApplications,
} from "../controllers/jobController.js";

const router = Router();

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Employer routes
router.post("/", authenticate, authorize(["employer", "admin"]), createJob);
router.get(
  "/employer/my-jobs",
  authenticate,
  authorize(["employer", "admin"]),
  getMyJobs
);
router.put("/:id", authenticate, authorize(["employer", "admin"]), updateJob);
router.delete(
  "/:id",
  authenticate,
  authorize(["employer", "admin"]),
  deleteJob
);
router.get(
  "/:id/applications",
  authenticate,
  authorize(["employer", "admin"]),
  getJobApplications
);

export default router;
