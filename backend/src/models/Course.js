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
}, {
  timestamps: true,
});

// Course Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Course description is required"],
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseCategory",
    required: [true, "Course category is required"],
  },
  thumbnail: {
    type: String, // URL to uploaded thumbnail image
    default: "",
  },
  duration: {
    type: String,
    required: [true, "Course duration is required"],
  },
  instructor: {
    type: String,
    required: [true, "Instructor name is required"],
    trim: true,
  },
  access: {
    type: String,
    enum: ["Free", "Pro"],
    default: "Free",
  },
  status: {
    type: String,
    enum: ["Draft", "Active", "Archived"],
    default: "Draft",
  },
  enrolled: {
    type: Number,
    default: 0,
  },
  avgCompletion: {
    type: Number,
    default: 0,
  },
  totalVideos: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  requirements: [{
    type: String,
    trim: true,
  }],
  learningOutcomes: [{
    type: String,
    trim: true,
  }],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
}, {
  timestamps: true,
});

// Video Schema
const videoSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course reference is required"],
  },
  title: {
    type: String,
    required: [true, "Video title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  vimeoId: {
    type: String,
    required: [true, "Vimeo video ID is required"],
  },
  vimeoUrl: {
    type: String,
  },
  duration: {
    type: String, // Format: "HH:MM:SS"
    required: [true, "Video duration is required"],
  },
  order: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  access: {
    type: String,
    enum: ["Free", "Pro"],
    default: "Pro",
  },
  drmProtected: {
    type: Boolean,
    default: true,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
  thumbnail: {
    type: String, // Vimeo thumbnail URL
  },
  fileSize: {
    type: Number, // File size in bytes
  },
  resolution: {
    type: String, // e.g., "1080p", "720p"
  },
}, {
  timestamps: true,
});

// Course Progress Schema
const courseProgressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student reference is required"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course reference is required"],
  },
  completedVideos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  lastWatchedVideo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
  timeSpent: {
    type: Number, // Total time spent in seconds
    default: 0,
  },
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Certificate",
  }],
}, {
  timestamps: true,
});

// Course Enrollment Schema
const courseEnrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student reference is required"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course reference is required"],
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  paymentId: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
  },
  accessExpiresAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Indexes for better performance
courseSchema.index({ category: 1, status: 1 });
courseSchema.index({ access: 1, status: 1 });
courseSchema.index({ isFeatured: 1, status: 1 });
courseSchema.index({ title: "text", description: "text" });

videoSchema.index({ course: 1, order: 1 });
videoSchema.index({ access: 1 });

courseProgressSchema.index({ student: 1, course: 1 }, { unique: true });
courseProgressSchema.index({ student: 1 });
courseProgressSchema.index({ course: 1 });

courseEnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
courseEnrollmentSchema.index({ student: 1 });
courseEnrollmentSchema.index({ course: 1 });

// Middleware to update course count when videos are added/removed
videoSchema.post("save", async function() {
  const Course = mongoose.model("Course");
  const course = await Course.findById(this.course);
  if (course) {
    const videoCount = await mongoose.model("Video").countDocuments({ course: this.course });
    await Course.findByIdAndUpdate(this.course, { totalVideos: videoCount });
  }
});

videoSchema.post("remove", async function() {
  const Course = mongoose.model("Course");
  const course = await Course.findById(this.course);
  if (course) {
    const videoCount = await mongoose.model("Video").countDocuments({ course: this.course });
    await Course.findByIdAndUpdate(this.course, { totalVideos: videoCount });
  }
});

// Middleware to update category course count
courseSchema.post("save", async function() {
  const CourseCategory = mongoose.model("CourseCategory");
  const category = await CourseCategory.findById(this.category);
  if (category) {
    const courseCount = await mongoose.model("Course").countDocuments({ category: this.category, status: "Active" });
    await CourseCategory.findByIdAndUpdate(this.category, { courseCount });
  }
});

courseSchema.post("remove", async function() {
  const CourseCategory = mongoose.model("CourseCategory");
  const category = await CourseCategory.findById(this.category);
  if (category) {
    const courseCount = await mongoose.model("Course").countDocuments({ category: this.category, status: "Active" });
    await CourseCategory.findByIdAndUpdate(this.category, { courseCount });
  }
});

// Virtual for course progress calculation
courseProgressSchema.virtual("completionPercentage").get(function() {
  if (!this.course || !this.course.totalVideos) return 0;
  return Math.round((this.completedVideos.length / this.course.totalVideos) * 100);
});

// Methods
courseProgressSchema.methods.updateProgress = function(videoId) {
  if (!this.completedVideos.includes(videoId)) {
    this.completedVideos.push(videoId);
    this.lastWatchedVideo = videoId;
    this.lastAccessedAt = new Date();
    
    // Calculate progress percentage
    this.progress = this.completedVideos.length / this.course.totalVideos * 100;
    
    // Mark as completed if all videos are watched
    if (this.progress >= 100) {
      this.completedAt = new Date();
    }
  }
  return this.save();
};

// Export models
export const CourseCategory = mongoose.model("CourseCategory", courseCategorySchema);
export const Course = mongoose.model("Course", courseSchema);
export const Video = mongoose.model("Video", videoSchema);
export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export const CourseEnrollment = mongoose.model("CourseEnrollment", courseEnrollmentSchema);