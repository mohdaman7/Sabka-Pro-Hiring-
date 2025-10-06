import mongoose, { Document, Schema, Types } from 'mongoose';

export interface JobDocument extends Document {
  title: string;
  description: string;
  employerId: Types.ObjectId; // references User with employer role
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    employerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
  },
  { timestamps: true }
);

export const JobModel = mongoose.model<JobDocument>('Job', jobSchema);
