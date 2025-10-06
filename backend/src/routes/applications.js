import { Router } from 'express';
import { z } from 'zod';
import { authenticate, authorize } from '../middleware/auth.js';
import { ApplicationModel } from '../models/Application.js';
import { JobModel } from '../models/Job.js';

const router = Router();

const applySchema = z.object({
  jobId: z.string().min(1),
  resumeUrl: z.string().url().optional(),
  coverLetter: z.string().max(5000).optional(),
});

router.post('/apply', authenticate, authorize(['student']), async (req, res, next) => {
  try {
    const parsed = applySchema.parse(req.body);
    const job = await JobModel.findById(parsed.jobId);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const existing = await ApplicationModel.findOne({ jobId: job._id, studentId: req.user.id });
    if (existing) return res.status(409).json({ success: false, message: 'Already applied' });

    const application = await ApplicationModel.create({
      jobId: job._id,
      studentId: req.user.id,
      employerId: job.employerId,
      resumeUrl: parsed.resumeUrl,
      coverLetter: parsed.coverLetter,
      status: 'applied',
    });

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
});

router.get('/mine', authenticate, authorize(['student']), async (req, res, next) => {
  try {
    const apps = await ApplicationModel.find({ studentId: req.user.id }).sort({ createdAt: -1 });

    res.json({ success: true, data: apps });
  } catch (err) {
    next(err);
  }
});

router.get('/for-my-jobs', authenticate, authorize(['employer', 'admin']), async (req, res, next) => {
  try {
    const apps = await ApplicationModel.find({ employerId: req.user.id })
      .populate('jobId')
      .populate('studentId');
    res.json({ success: true, data: apps });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/status', authenticate, authorize(['employer', 'admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const schema = z.object({ status: z.enum(['applied', 'reviewed', 'interview', 'rejected', 'hired']) });
    const parsed = schema.parse(req.body);

    const updated = await ApplicationModel.findOneAndUpdate(
      { _id: id, employerId: req.user.id },
      { status: parsed.status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: 'Application not found' });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
