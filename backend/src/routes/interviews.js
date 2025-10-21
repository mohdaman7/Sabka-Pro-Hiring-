import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  scheduleInterview,
  listEmployerInterviews,
  listStudentInterviews,
  updateInterview,
  addFeedback,
  listByApplication,
  downloadICS,
} from '../controllers/interviewController.js';

const router = Router();

// Employer schedules interview
router.post(
  '/schedule',
  authenticate,
  authorize(['employer', 'admin']),
  scheduleInterview
);

// Employer lists interviews
router.get(
  '/employer',
  authenticate,
  authorize(['employer', 'admin']),
  listEmployerInterviews
);

// Student lists interviews
router.get(
  '/student',
  authenticate,
  authorize(['student', 'admin']),
  listStudentInterviews
);

// Shared: list by application
router.get(
  '/by-application/:applicationId',
  authenticate,
  authorize(['student', 'employer', 'admin']),
  listByApplication
);

// Employer updates interview (reschedule/cancel/complete)
router.patch(
  '/:id',
  authenticate,
  authorize(['employer', 'admin']),
  updateInterview
);

// Employer adds feedback
router.post(
  '/:id/feedback',
  authenticate,
  authorize(['employer', 'admin']),
  addFeedback
);

// Download ICS
router.get(
  '/:id/ics',
  authenticate,
  authorize(['student', 'employer', 'admin']),
  downloadICS
);

export default router;
