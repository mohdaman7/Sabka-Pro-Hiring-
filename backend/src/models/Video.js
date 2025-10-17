import mongoose from "mongoose";

// Video Schema
const videoSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course reference is required"],
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModule",
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
  quality: {
    type: String,
    enum: ["SD", "HD", "FHD", "4K"],
    default: "HD",
  },
  subtitles: [{
    language: String,
    url: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  }],
  chapters: [{
    title: String,
    startTime: Number, // in seconds
    endTime: Number, // in seconds
  }],
  notes: [{
    timestamp: Number, // in seconds
    content: String,
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  downloadAllowed: {
    type: Boolean,
    default: false,
  },
  screenshotAllowed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Indexes
videoSchema.index({ course: 1, order: 1 });
videoSchema.index({ module: 1, order: 1 });
videoSchema.index({ access: 1, isActive: 1 });
videoSchema.index({ vimeoId: 1 });
videoSchema.index({ title: "text", description: "text" });

// Middleware to update course video count
videoSchema.post("save", async function() {
  const Course = mongoose.model("Course");
  const CourseModule = mongoose.model("CourseModule");
  
  // Update course video count
  const course = await Course.findById(this.course);
  if (course) {
    const videoCount = await mongoose.model("Video").countDocuments({ course: this.course, isActive: true });
    await Course.findByIdAndUpdate(this.course, { totalVideos: videoCount });
  }
  
  // Update module video count
  if (this.module) {
    const module = await CourseModule.findById(this.module);
    if (module) {
      const videoCount = await mongoose.model("Video").countDocuments({ module: this.module, isActive: true });
      await CourseModule.findByIdAndUpdate(this.module, { totalVideos: videoCount });
    }
  }
});

videoSchema.post("remove", async function() {
  const Course = mongoose.model("Course");
  const CourseModule = mongoose.model("CourseModule");
  
  // Update course video count
  const course = await Course.findById(this.course);
  if (course) {
    const videoCount = await mongoose.model("Video").countDocuments({ course: this.course, isActive: true });
    await Course.findByIdAndUpdate(this.course, { totalVideos: videoCount });
  }
  
  // Update module video count
  if (this.module) {
    const module = await CourseModule.findById(this.module);
    if (module) {
      const videoCount = await mongoose.model("Video").countDocuments({ module: this.module, isActive: true });
      await CourseModule.findByIdAndUpdate(this.module, { totalVideos: videoCount });
    }
  }
});

// Method to increment views
videoSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to add note
videoSchema.methods.addNote = function(studentId, timestamp, content) {
  this.notes.push({
    student: studentId,
    timestamp,
    content,
  });
  return this.save();
};

export const Video = mongoose.model("Video", videoSchema);