import mongoose from "mongoose";

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
    enum: ["pending", "completed", "failed", "refunded", "cancelled"],
    default: "pending",
  },
  paymentId: {
    type: String,
  },
  paymentMethod: {
    type: String,
    enum: ["card", "upi", "netbanking", "wallet", "cod"],
  },
  amount: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "INR",
  },
  accessExpiresAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  refundRequested: {
    type: Boolean,
    default: false,
  },
  refundAmount: {
    type: Number,
    default: 0,
  },
  refundReason: {
    type: String,
  },
  refundProcessedAt: {
    type: Date,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

// Module Enrollment Schema
const moduleEnrollmentSchema = new mongoose.Schema({
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
    enum: ["pending", "completed", "failed", "refunded", "cancelled"],
    default: "pending",
  },
  paymentId: {
    type: String,
  },
  paymentMethod: {
    type: String,
    enum: ["card", "upi", "netbanking", "wallet", "cod"],
  },
  amount: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "INR",
  },
  accessExpiresAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  refundRequested: {
    type: Boolean,
    default: false,
  },
  refundAmount: {
    type: Number,
    default: 0,
  },
  refundReason: {
    type: String,
  },
  refundProcessedAt: {
    type: Date,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

// Indexes
courseEnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
courseEnrollmentSchema.index({ student: 1 });
courseEnrollmentSchema.index({ course: 1 });
courseEnrollmentSchema.index({ paymentStatus: 1 });
courseEnrollmentSchema.index({ enrolledAt: -1 });

moduleEnrollmentSchema.index({ student: 1, module: 1 }, { unique: true });
moduleEnrollmentSchema.index({ student: 1 });
moduleEnrollmentSchema.index({ module: 1 });
moduleEnrollmentSchema.index({ course: 1 });
moduleEnrollmentSchema.index({ paymentStatus: 1 });
moduleEnrollmentSchema.index({ enrolledAt: -1 });

// Methods
courseEnrollmentSchema.methods.isAccessible = function() {
  if (!this.isActive) return false;
  if (this.paymentStatus !== "completed") return false;
  if (this.accessExpiresAt && new Date() > this.accessExpiresAt) return false;
  return true;
};

moduleEnrollmentSchema.methods.isAccessible = function() {
  if (!this.isActive) return false;
  if (this.paymentStatus !== "completed") return false;
  if (this.accessExpiresAt && new Date() > this.accessExpiresAt) return false;
  return true;
};

courseEnrollmentSchema.methods.requestRefund = function(reason, amount = null) {
  this.refundRequested = true;
  this.refundReason = reason;
  this.refundAmount = amount || this.amount;
  return this.save();
};

moduleEnrollmentSchema.methods.requestRefund = function(reason, amount = null) {
  this.refundRequested = true;
  this.refundReason = reason;
  this.refundAmount = amount || this.amount;
  return this.save();
};

export const CourseEnrollment = mongoose.model("CourseEnrollment", courseEnrollmentSchema);
export const ModuleEnrollment = mongoose.model("ModuleEnrollment", moduleEnrollmentSchema);