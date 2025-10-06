import mongoose from 'mongoose';

const { Schema } = mongoose;

const jobSchema = new Schema(
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

export const JobModel = mongoose.model('Job', jobSchema);
