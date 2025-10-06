import { Router } from 'express';
import { z } from 'zod';
import { JobModel } from '../models/Job.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

const createJobSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  location: z.string().optional(),
  salaryMin: z.number().int().nonnegative().optional(),
  salaryMax: z.number().int().nonnegative().optional(),
});

router.post('/', authenticate, authorize(['employer', 'admin']), async (req, res, next) => {
  try {
    const parsed = createJobSchema.parse(req.body);
    const job = await JobModel.create({
      title: parsed.title,
      description: parsed.description,
      location: parsed.location,
      salaryMin: parsed.salaryMin,
      salaryMax: parsed.salaryMax,
      employerId: req.user.id,
    });
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const jobs = await JobModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (err) {
    next(err);
  }
});

router.get('/mine', authenticate, authorize(['employer', 'admin']), async (req, res, next) => {
  try {
    const jobs = await JobModel.find({ employerId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (err) {
    next(err);
  }
});

export default router;
