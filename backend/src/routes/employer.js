import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import {
  getEmployerProfile,
  updateEmployerProfile,
  getEmployerById,
  getAllEmployers,
} from "../controllers/employerController.js";

const router = Router();

// Get employer profile
router.get(
  "/profile",
  authenticate,
  authorize(["employer"]),
  getEmployerProfile
);

// Update employer profile
router.put(
  "/profile",
  authenticate,
  authorize(["employer"]),
  updateEmployerProfile
);

// Public routes (optional - for employer listings)
router.get("/", getAllEmployers);
router.get("/:id", getEmployerById);

export default router;
