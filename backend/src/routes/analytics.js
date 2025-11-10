import express from "express";
import {
  getOverviewStats,
  getLeadConversionAnalytics,
  getRevenueReports,
  getPlacementAnalytics,
  getEmployerEngagement,
  getCourseAnalytics,
  getStaffPerformance,
  exportReport,
} from "../controllers/analyticsController.js";

const router = express.Router();

// Overview Dashboard
router.get("/overview", getOverviewStats);

// Lead Conversion Analytics
router.get("/leads/conversion", getLeadConversionAnalytics);

// Revenue & Payment Reports
router.get("/revenue", getRevenueReports);

// Student Placement Analytics
router.get("/placements", getPlacementAnalytics);

// Employer Engagement Analytics
router.get("/employers/engagement", getEmployerEngagement);

// Training/Course Analytics
router.get("/courses", getCourseAnalytics);

// Staff Performance
router.get("/staff/performance", getStaffPerformance);

// Export Reports
router.get("/export", exportReport);

export default router;
