import mongoose from "mongoose";

// Course Module Schema - Individual modules within a course
const courseModuleSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course reference is required"],
  },
  title: {
    type: String,
    required: [true, "Module title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    required: [true, "Module order is required"],
  },
  duration: {
    type: String, // Format: "HH:MM:SS"
    required: [true, "Module duration is required"],
  },
  price: {
    type: Number,
    required: [true, "Module price is required"],
    min: 0,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  access: {
    type: String,
    enum: ["Free", "Pro"],
    default: "Pro",
  },
  status: {
    type: String,
    enum: ["Draft", "Active", "Archived"],
    default: "Draft",
  },
  thumbnail: {
    type: String, // URL to uploaded thumbnail image
    default: "",
  },
  learningOutcomes: [{
    type: String,
    trim: true,
  }],
  requirements: [{
    type: String,
    trim: true,
  }],
  totalVideos: {
    type: Number,
    default: 0,
  },
  totalLessons: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
  previewVideo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
}, {
  timestamps: true,
});

// Indexes
courseModuleSchema.index({ course: 1, order: 1 });
courseModuleSchema.index({ course: 1, status: 1 });
courseModuleSchema.index({ access: 1, status: 1 });
courseModuleSchema.index({ title: "text", description: "text" });

// Middleware to update course module count
courseModuleSchema.post("save", async function() {
  const Course = mongoose.model("Course");
  const course = await Course.findById(this.course);
  if (course) {
    const moduleCount = await mongoose.model("CourseModule").countDocuments({ course: this.course, status: "Active" });
    await Course.findByIdAndUpdate(this.course, { totalModules: moduleCount });
  }
});

courseModuleSchema.post("remove", async function() {
  const Course = mongoose.model("Course");
  const course = await Course.findById(this.course);
  if (course) {
    const moduleCount = await mongoose.model("CourseModule").countDocuments({ course: this.course, status: "Active" });
    await Course.findByIdAndUpdate(this.course, { totalModules: moduleCount });
  }
});

export const CourseModule = mongoose.model("CourseModule", courseModuleSchema);