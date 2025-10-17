import mongoose from "mongoose";

// Course Category Schema
const courseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique: true,
  },
  icon: {
    type: String,
    default: "📚",
  },
  description: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  courseCount: {
    type: Number,
    default: 0,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes
courseCategorySchema.index({ isActive: 1, sortOrder: 1 });
courseCategorySchema.index({ name: "text" });

export const CourseCategory = mongoose.model("CourseCategory", courseCategorySchema);