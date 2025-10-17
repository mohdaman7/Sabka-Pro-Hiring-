import mongoose from "mongoose";

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
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  totalModules: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  isFree: {
    type: Boolean,
    default: true,
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
  language: {
    type: String,
    default: "English",
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Beginner",
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  reviews: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  certificate: {
    enabled: {
      type: Boolean,
      default: false,
    },
    template: String,
    requirements: {
      minProgress: {
        type: Number,
        default: 80,
      },
      minTimeSpent: Number, // in minutes
    },
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
}, {
  timestamps: true,
});

// Indexes for better performance
courseSchema.index({ category: 1, status: 1 });
courseSchema.index({ access: 1, status: 1 });
courseSchema.index({ isFeatured: 1, status: 1 });
courseSchema.index({ instructorId: 1, status: 1 });
courseSchema.index({ title: "text", description: "text", tags: "text" });
courseSchema.index({ "rating.average": -1 });
courseSchema.index({ createdAt: -1 });

// Virtual for course rating calculation
courseSchema.virtual("averageRating").get(function() {
  if (this.reviews.length === 0) return 0;
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / this.reviews.length) * 10) / 10;
});

// Method to add review
courseSchema.methods.addReview = function(studentId, rating, comment) {
  // Check if student already reviewed
  const existingReview = this.reviews.find(review => review.student.toString() === studentId.toString());
  
  if (existingReview) {
    // Update existing review
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    // Add new review
    this.reviews.push({
      student: studentId,
      rating,
      comment,
    });
  }
  
  // Update average rating
  this.rating.average = this.averageRating;
  this.rating.count = this.reviews.length;
  
  return this.save();
};

// Method to check if student can access course
courseSchema.methods.canAccess = function(studentId, isProUser = false) {
  if (this.status !== "Active") return false;
  if (this.access === "Free") return true;
  if (this.access === "Pro" && isProUser) return true;
  
  // Check if student has purchased the course
  return mongoose.model("CourseEnrollment").findOne({
    student: studentId,
    course: this._id,
    paymentStatus: "completed"
  }).then(enrollment => !!enrollment);
};

export const Course = mongoose.model("Course", courseSchema);