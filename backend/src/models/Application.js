import mongoose from 'mongoose';

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String },
    coverLetter: { type: String },
    status: {
      type: String,
      enum: ['applied', 'reviewed', 'interview', 'rejected', 'hired'],
      default: 'applied',
      required: true,
    },
  },
  { timestamps: true }
);

export const ApplicationModel = mongoose.model('Application', applicationSchema);
