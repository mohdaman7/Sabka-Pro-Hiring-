import { Router } from "express";
import * as employerController from "../controllers/employerController.js";
import * as collabController from "../controllers/collabController.js";
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

// Plan & Analytics
router.put("/plan", authorize(["employer", "admin"]), employerController.updateEmployerPlan);
router.get("/analytics", authorize(["employer", "admin"]), employerController.getEmployerAnalytics);

// Team collaboration routes (employer only)
router.get("/team", authorize(["employer", "admin"]), collabController.getTeam);
router.post("/team/invite", authorize(["employer", "admin"]), collabController.inviteTeamMember);
router.patch(
  "/team/members/:memberId",
  authorize(["employer", "admin"]),
  collabController.updateTeamMember
);
router.delete(
  "/team/members/:memberId",
  authorize(["employer", "admin"]),
  collabController.removeTeamMember
);

// Candidate notes
router.get("/notes", authorize(["employer", "admin"]), collabController.listNotes);
router.post("/notes", authorize(["employer", "admin"]), collabController.addNote);
router.patch("/notes/:id", authorize(["employer", "admin"]), collabController.updateNote);
router.delete("/notes/:id", authorize(["employer", "admin"]), collabController.deleteNote);

// Activity feed
router.get("/activity", authorize(["employer", "admin"]), collabController.getActivityFeed);

// Saved candidate views
router.get("/views", authorize(["employer", "admin"]), collabController.listSavedViews);
router.post("/views", authorize(["employer", "admin"]), collabController.createSavedView);
router.patch("/views/:id", authorize(["employer", "admin"]), collabController.updateSavedView);
router.delete("/views/:id", authorize(["employer", "admin"]), collabController.deleteSavedView);

// Public routes (optional) - remove authentication for these
router.get("/public/:id", employerController.getEmployerById);
router.get("/public", employerController.getAllEmployers);

export default router;
