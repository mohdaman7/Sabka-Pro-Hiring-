import mongoose from 'mongoose';

const { Schema } = mongoose;

const panelMemberSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    role: { type: String },
    responseStatus: {
      type: String,
      enum: ['needs_action', 'accepted', 'declined', 'tentative'],
      default: 'needs_action',
    },
  },
  { _id: false }
);

const feedbackSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: { type: String },
    text: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const interviewSchema = new Schema(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    status: {
      type: String,
      enum: ['scheduled', 'rescheduled', 'canceled', 'completed'],
      default: 'scheduled',
      required: true,
    },

    type: { type: String, enum: ['online', 'onsite', 'phone'], default: 'online' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    timezone: { type: String, default: 'UTC' },
    durationMin: { type: Number, default: 60 },

    location: { type: String },
    meetingLink: { type: String },

    panel: [panelMemberSchema],

    notes: { type: String },
    feedback: [feedbackSchema],

    reminders: {
      oneDaySent: { type: Boolean, default: false },
      oneHourSent: { type: Boolean, default: false },
    },

    icsUid: { type: String },
  },
  { timestamps: true }
);

interviewSchema.index({ startTime: 1 });

export const InterviewModel = mongoose.model('Interview', interviewSchema);
