import mongoose from "mongoose";

const { Schema } = mongoose;

const educationSchema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  gpa: { type: Number },
  currentlyEnrolled: { type: Boolean, default: false },
});

const experienceSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
});

const skillSchema = new Schema({
  name: { type: String, required: true },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "expert"],
    default: "intermediate",
  },
});

const studentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    phone: { type: String },
    dateOfBirth: { type: Date },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    bio: { type: String, maxlength: 500 },

    // Education
    education: [educationSchema],
    highestQualification: { type: String },

    // Professional Preferences
    jobPreferences: {
      preferredRoles: [{ type: String }],
      preferredLocations: [{ type: String }],
      jobTypes: [
        {
          type: String,
          enum: ["full-time", "part-time", "internship", "contract", "remote"],
        },
      ],
      expectedSalary: {
        min: Number,
        max: Number,
        currency: { type: String, default: "USD" },
      },
      willingToRelocate: { type: Boolean, default: false },
    },

    // Skills & Experience
    skills: [skillSchema],
    experiences: [experienceSchema],
    languages: [
      {
        language: String,
        proficiency: {
          type: String,
          enum: ["basic", "conversational", "fluent", "native"],
        },
      },
    ],

    // Career Plan
    careerPlan: {
      shortTermGoals: { type: String, maxlength: 300 },
      longTermGoals: { type: String, maxlength: 300 },
      areasOfInterest: [{ type: String }],
    },

    // Documents
    resume: {
      filename: String,
      originalName: String,
      url: String,
      uploadedAt: { type: Date, default: Date.now },
    },
    coverLetter: {
      filename: String,
      originalName: String,
      url: String,
      uploadedAt: { type: Date, default: Date.now },
    },
    portfolio: {
      website: String,
      github: String,
      linkedin: String,
      otherLinks: [String],
    },

    // Status
    profileCompletion: { type: Number, default: 0, min: 0, max: 100 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const StudentModel = mongoose.model("Student", studentSchema);
