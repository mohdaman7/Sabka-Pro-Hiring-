import mongoose from "mongoose";

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
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0,
    },
    watchPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  }],
  completedModules: [{
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModule",
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
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
  lastWatchedModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModule",
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
  notes: [{
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    content: String,
    timestamp: Number, // in seconds
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  bookmarks: [{
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    timestamp: Number, // in seconds
    title: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  quizAttempts: [{
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    score: Number,
    maxScore: Number,
    attemptedAt: {
      type: Date,
      default: Date.now,
    },
    passed: Boolean,
  }],
}, {
  timestamps: true,
});

// Module Progress Schema
const moduleProgressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student reference is required"],
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModule",
    required: [true, "Module reference is required"],
  },
  completedVideos: [{
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0,
    },
    watchPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
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
  isPurchased: {
    type: Boolean,
    default: false,
  },
  purchasedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Indexes
courseProgressSchema.index({ student: 1, course: 1 }, { unique: true });
courseProgressSchema.index({ student: 1 });
courseProgressSchema.index({ course: 1 });
courseProgressSchema.index({ completedAt: -1 });

moduleProgressSchema.index({ student: 1, module: 1 }, { unique: true });
moduleProgressSchema.index({ student: 1 });
moduleProgressSchema.index({ module: 1 });
moduleProgressSchema.index({ completedAt: -1 });

// Virtual for course progress calculation
courseProgressSchema.virtual("completionPercentage").get(function() {
  if (!this.course || !this.course.totalVideos) return 0;
  return Math.round((this.completedVideos.length / this.course.totalVideos) * 100);
});

// Virtual for module progress calculation
moduleProgressSchema.virtual("completionPercentage").get(function() {
  if (!this.module || !this.module.totalVideos) return 0;
  return Math.round((this.completedVideos.length / this.module.totalVideos) * 100);
});

// Methods for course progress
courseProgressSchema.methods.updateVideoProgress = function(videoId, timeSpent = 0, watchPercentage = 100) {
  const existingVideo = this.completedVideos.find(v => v.video.toString() === videoId.toString());
  
  if (existingVideo) {
    // Update existing progress
    existingVideo.timeSpent += timeSpent;
    existingVideo.watchPercentage = Math.max(existingVideo.watchPercentage, watchPercentage);
    existingVideo.completedAt = new Date();
  } else {
    // Add new video progress
    this.completedVideos.push({
      video: videoId,
      timeSpent,
      watchPercentage,
      completedAt: new Date(),
    });
  }
  
  this.lastWatchedVideo = videoId;
  this.lastAccessedAt = new Date();
  this.timeSpent += timeSpent;
  
  // Calculate overall progress
  this.progress = this.completedVideos.length / this.course.totalVideos * 100;
  
  // Mark as completed if all videos are watched
  if (this.progress >= 100) {
    this.completedAt = new Date();
  }
  
  return this.save();
};

courseProgressSchema.methods.updateModuleProgress = function(moduleId) {
  const existingModule = this.completedModules.find(m => m.module.toString() === moduleId.toString());
  
  if (!existingModule) {
    this.completedModules.push({
      module: moduleId,
      progress: 100,
      completedAt: new Date(),
    });
  }
  
  this.lastWatchedModule = moduleId;
  this.lastAccessedAt = new Date();
  
  return this.save();
};

// Methods for module progress
moduleProgressSchema.methods.updateVideoProgress = function(videoId, timeSpent = 0, watchPercentage = 100) {
  const existingVideo = this.completedVideos.find(v => v.video.toString() === videoId.toString());
  
  if (existingVideo) {
    // Update existing progress
    existingVideo.timeSpent += timeSpent;
    existingVideo.watchPercentage = Math.max(existingVideo.watchPercentage, watchPercentage);
    existingVideo.completedAt = new Date();
  } else {
    // Add new video progress
    this.completedVideos.push({
      video: videoId,
      timeSpent,
      watchPercentage,
      completedAt: new Date(),
    });
  }
  
  this.lastWatchedVideo = videoId;
  this.lastAccessedAt = new Date();
  this.timeSpent += timeSpent;
  
  // Calculate overall progress
  this.progress = this.completedVideos.length / this.module.totalVideos * 100;
  
  // Mark as completed if all videos are watched
  if (this.progress >= 100) {
    this.completedAt = new Date();
  }
  
  return this.save();
};

moduleProgressSchema.methods.markAsPurchased = function() {
  this.isPurchased = true;
  this.purchasedAt = new Date();
  return this.save();
};

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export const ModuleProgress = mongoose.model("ModuleProgress", moduleProgressSchema);