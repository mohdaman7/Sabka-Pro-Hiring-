import express from "express";
import {
  enrollInCourse,
  getMyEnrollments,
  getEnrollmentDetails,
  updateEnrollmentProgress,
  dropCourse,
  checkEnrollmentStatus,
  getAllEnrollments,
  getCourseEnrollmentStats,
  getTopEnrolledCourses,
} from "../controllers/enrollmentController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// ==================== STUDENT ROUTES ====================
// All student routes require authentication

// Enroll in a course
router.post("/enroll", authenticateToken, enrollInCourse);

// Get my enrollments
router.get("/my-enrollments", authenticateToken, getMyEnrollments);

// Check enrollment status for a course
router.get("/check/:courseId", authenticateToken, checkEnrollmentStatus);

// Get enrollment details
router.get("/:enrollmentId", authenticateToken, getEnrollmentDetails);

// Update enrollment progress
router.patch("/:enrollmentId/progress", authenticateToken, updateEnrollmentProgress);

// Drop/Unenroll from course
router.delete("/:enrollmentId", authenticateToken, dropCourse);

// ==================== CRM/ADMIN ROUTES ====================

// Get all enrollments (CRM)
router.get("/admin/all", authenticateToken, getAllEnrollments);

// Get enrollment stats for a course (CRM)
router.get("/admin/course/:courseId/stats", authenticateToken, getCourseEnrollmentStats);

// Get top enrolled courses (CRM)
router.get("/admin/top-courses", authenticateToken, getTopEnrolledCourses);

export default router;
