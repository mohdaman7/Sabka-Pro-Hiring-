import mongoose, { Document, Schema, Types } from 'mongoose';

export type ApplicationStatus = 'applied' | 'reviewed' | 'interview' | 'rejected' | 'hired';

export interface ApplicationDocument extends Document {
  jobId: Types.ObjectId;
  studentId: Types.ObjectId; // references User with student role
  employerId: Types.ObjectId; // denormalized for queries
  resumeUrl?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<ApplicationDocument>(
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

export const ApplicationModel = mongoose.model<ApplicationDocument>('Application', applicationSchema);
