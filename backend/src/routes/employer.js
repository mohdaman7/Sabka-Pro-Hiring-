import { Router } from "express";
import * as employerController from "../controllers/employerController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Optional: Only allow employers to access these routes
// router.use(authorize(['employer']));

// Employer profile routes
router.get("/profile", employerController.getEmployerProfile);
router.get("/dashboard", employerController.getEmployerDashboard);
router.post("/complete-profile", employerController.completeEmployerProfile); // For initial setup
router.put("/profile", employerController.updateEmployerProfile); // For partial updates
router.put("/hiring-preferences", employerController.updateHiringPreferences);

// Public routes (optional) - remove authentication for these
router.get("/public/:id", employerController.getEmployerById);
router.get("/public", employerController.getAllEmployers);

export default router;
