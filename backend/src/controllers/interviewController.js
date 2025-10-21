import { z } from 'zod';
import crypto from 'crypto';
import { InterviewModel } from '../models/Interview.js';
import { ApplicationModel } from '../models/Application.js';
import { generateInterviewICS } from '../utils/ics.js';
import { sendInterviewInvite, sendInterviewReminder } from '../utils/mailer.js';

const scheduleSchema = z.object({
  applicationId: z.string().min(1),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  durationMin: z.number().int().positive().optional(),
  type: z.enum(['online', 'onsite', 'phone']).default('online'),
  timezone: z.string().optional(),
  location: z.string().optional(),
  meetingLink: z.string().url().optional(),
  notes: z.string().max(2000).optional(),
  panel: z
    .array(
      z.object({
        name: z.string().optional(),
        email: z.string().email(),
        role: z.string().optional(),
      })
    )
    .optional(),
});

export async function scheduleInterview(req, res, next) {
  try {
    const parsed = scheduleSchema.parse(req.body);

    const application = await ApplicationModel.findOne({
      _id: parsed.applicationId,
      employerId: req.user.id,
    })
      .populate('jobId', 'title')
      .populate('studentId', 'firstName lastName email');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const start = new Date(parsed.startTime);
    const end = parsed.endTime
      ? new Date(parsed.endTime)
      : new Date(start.getTime() + (parsed.durationMin || 60) * 60000);

    // Basic conflict check (student)
    const overlapFilter = {
      studentId: application.studentId._id,
      status: { $in: ['scheduled', 'rescheduled'] },
      $or: [
        { startTime: { $lte: end }, endTime: { $gte: start } },
        { startTime: { $gte: start, $lte: end } },
      ],
    };

    const studentConflict = await InterviewModel.findOne(overlapFilter);
    if (studentConflict) {
      return res.status(409).json({ success: false, message: 'Student has a conflicting interview' });
    }

    const panel = parsed.panel || [];

    const interview = await InterviewModel.create({
      applicationId: application._id,
      jobId: application.jobId._id,
      studentId: application.studentId._id,
      employerId: req.user.id,
      startTime: start,
      endTime: end,
      durationMin: parsed.durationMin || 60,
      timezone: parsed.timezone || 'UTC',
      type: parsed.type,
      location: parsed.location,
      meetingLink: parsed.meetingLink,
      panel,
      notes: parsed.notes,
      icsUid: crypto.randomUUID(),
    });

    // Move application to interview stage
    await ApplicationModel.updateOne(
      { _id: application._id },
      { status: 'interview', updatedAt: new Date() }
    );

    // Send invites (student + panel)
    const summary = `${application.jobId.title} Interview`;
    const description = parsed.notes || 'Interview scheduled via Sabka Pro';
    const attendees = [
      { name: `${application.studentId.firstName} ${application.studentId.lastName}`.trim(), email: application.studentId.email },
      ...panel.map((p) => ({ name: p.name || p.email, email: p.email })),
    ];

    const icsContent = generateInterviewICS({
      uid: interview.icsUid,
      startTime: start,
      endTime: end,
      summary,
      description,
      location: parsed.location,
      url: parsed.meetingLink,
      organizer: { name: 'Sabka Pro', email: 'no-reply@sabka.pro' },
      attendees,
    });

    const toEmails = attendees.map((a) => a.email);
    await sendInterviewInvite({
      to: toEmails,
      summary,
      description,
      when: start,
      meetingLink: parsed.meetingLink,
      icsContent,
    });

    res.status(201).json({ success: true, data: interview });
  } catch (err) {
    next(err);
  }
}

export async function listEmployerInterviews(req, res, next) {
  try {
    const { applicationId, jobId, status, page = 1, limit = 20 } = req.query;
    const filter = { employerId: req.user.id };
    if (applicationId) filter.applicationId = applicationId;
    if (jobId) filter.jobId = jobId;
    if (status) filter.status = status;

    const interviews = await InterviewModel.find(filter)
      .populate('applicationId', 'status')
      .populate('jobId', 'title')
      .populate('studentId', 'firstName lastName email')
      .sort({ startTime: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await InterviewModel.countDocuments(filter);

    res.json({
      success: true,
      data: interviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function listStudentInterviews(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = { studentId: req.user.id };
    if (status) filter.status = status;

    const interviews = await InterviewModel.find(filter)
      .populate('jobId', 'title company location')
      .sort({ startTime: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await InterviewModel.countDocuments(filter);

    res.json({
      success: true,
      data: interviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function listByApplication(req, res, next) {
  try {
    const { applicationId } = req.params;

    // Authorization: student owning app or employer owning app
    const app = await ApplicationModel.findById(applicationId);
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });

    if (
      !(req.user.role === 'admin' ||
        (req.user.role === 'student' && String(app.studentId) === String(req.user.id)) ||
        (req.user.role === 'employer' && String(app.employerId) === String(req.user.id)))
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const interviews = await InterviewModel.find({ applicationId })
      .populate('jobId', 'title')
      .populate('studentId', 'firstName lastName email')
      .sort({ startTime: 1 });

    res.json({ success: true, data: interviews });
  } catch (err) {
    next(err);
  }
}

const updateSchema = z.object({
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  durationMin: z.number().int().positive().optional(),
  status: z.enum(['scheduled', 'rescheduled', 'canceled', 'completed']).optional(),
  location: z.string().optional(),
  meetingLink: z.string().url().optional(),
  notes: z.string().max(2000).optional(),
  panel: z
    .array(
      z.object({ name: z.string().optional(), email: z.string().email(), role: z.string().optional(), responseStatus: z.string().optional() })
    )
    .optional(),
});

export async function updateInterview(req, res, next) {
  try {
    const { id } = req.params;
    const parsed = updateSchema.parse(req.body);

    const interview = await InterviewModel.findOne({ _id: id, employerId: req.user.id });
    if (!interview) return res.status(404).json({ success: false, message: 'Interview not found' });

    const updates = { ...parsed };
    if (parsed.startTime || parsed.endTime || parsed.durationMin) {
      const start = parsed.startTime ? new Date(parsed.startTime) : interview.startTime;
      const end = parsed.endTime
        ? new Date(parsed.endTime)
        : new Date(start.getTime() + (parsed.durationMin || interview.durationMin || 60) * 60000);
      updates.startTime = start;
      updates.endTime = end;
      updates.status = 'rescheduled';
    }

    const updated = await InterviewModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

const feedbackSchema = z.object({
  text: z.string().min(1).max(2000),
  rating: z.number().int().min(1).max(5).optional(),
});

export async function addFeedback(req, res, next) {
  try {
    const { id } = req.params;
    const parsed = feedbackSchema.parse(req.body);

    const interview = await InterviewModel.findOne({ _id: id, employerId: req.user.id });
    if (!interview) return res.status(404).json({ success: false, message: 'Interview not found' });

    const entry = {
      authorId: req.user.id,
      authorName: `${req.user.firstName || ''} ${req.user.lastName || ''}`.trim() || undefined,
      text: parsed.text,
      rating: parsed.rating,
      createdAt: new Date(),
    };

    interview.feedback.push(entry);
    await interview.save();

    res.status(201).json({ success: true, data: interview.feedback });
  } catch (err) {
    next(err);
  }
}

export async function downloadICS(req, res, next) {
  try {
    const { id } = req.params;
    const interview = await InterviewModel.findById(id)
      .populate('jobId', 'title')
      .populate('studentId', 'firstName lastName email');
    if (!interview) return res.status(404).json({ success: false, message: 'Interview not found' });

    if (
      !(req.user.role === 'admin' ||
        (req.user.role === 'student' && String(interview.studentId._id) === String(req.user.id)) ||
        (req.user.role === 'employer' && String(interview.employerId) === String(req.user.id)))
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const summary = `${interview.jobId.title} Interview`;
    const attendees = [
      { name: `${interview.studentId.firstName} ${interview.studentId.lastName}`.trim(), email: interview.studentId.email },
      ...interview.panel.map((p) => ({ name: p.name || p.email, email: p.email })),
    ];

    const icsContent = generateInterviewICS({
      uid: interview.icsUid || interview._id.toString(),
      startTime: interview.startTime,
      endTime: interview.endTime,
      summary,
      description: interview.notes || 'Interview scheduled via Sabka Pro',
      location: interview.location,
      url: interview.meetingLink,
      organizer: { name: 'Sabka Pro', email: 'no-reply@sabka.pro' },
      attendees,
    });

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="interview-${interview._id}.ics"`);
    res.send(icsContent);
  } catch (err) {
    next(err);
  }
}
