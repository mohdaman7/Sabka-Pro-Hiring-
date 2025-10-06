import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { UserModel } from '../models/User.js';
import { ApplicationModel } from '../models/Application.js';

const router = Router();

router.get('/registrations', authenticate, authorize(['admin']), async (_req, res, next) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 }).select('-passwordHash');
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
});

router.get('/registrations/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const applications = await ApplicationModel.find({ studentId: user._id });
    res.json({ success: true, data: { user, applications } });
  } catch (err) {
    next(err);
  }
});

export default router;
