import mongoose from 'mongoose';

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String },
    // Optional metadata fields from application form
    meta: {
      previousCompany: { type: String },
      previousPosition: { type: String },
      yearsExperience: { type: Schema.Types.Mixed },
      languages: { type: String },
    },
    status: {
      type: String,
      enum: ['applied', 'reviewed', 'interview', 'rejected', 'hired'],
      default: 'applied',
      required: true,
    },
    // Optional employer feedback about this application (populated when updating status)
    feedback: { type: String },
  },
  { timestamps: true }
);

export const ApplicationModel = mongoose.model('Application', applicationSchema);
