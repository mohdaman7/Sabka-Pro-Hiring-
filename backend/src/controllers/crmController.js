// backend/src/controllers/crmController.js
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User.js";
import { StudentModel } from "../models/Student.js";
import { EmployerModel } from "../models/Employer.js";
import { ApplicationModel } from "../models/Application.js";
import { JobModel } from "../models/Job.js";
import { sendApprovalEmail } from "../utils/mailer.js";

// Generate random password
function generatePassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// ============================================
// NEW FUNCTIONS FOR APPROVAL SYSTEM
// ============================================

// Get all pending registrations
export const getPendingRegistrations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pendingUsers = await UserModel.find({ status: "pending" })
      .select("-passwordHash")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get additional profile info
    const usersWithProfiles = await Promise.all(
      pendingUsers.map(async (user) => {
        let profileData = null;
        if (user.role === "student") {
          profileData = await StudentModel.findOne({ userId: user._id });
        } else if (user.role === "employer") {
          profileData = await EmployerModel.findOne({ userId: user._id });
        }
        return {
          ...user.toObject(),
          profile: profileData,
        };
      })
    );

    const total = await UserModel.countDocuments({ status: "pending" });

    res.json({
      success: true,
      data: usersWithProfiles,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalPending: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Approve user registration
export const approveUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sendCredentials = true } = req.body;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "User is not in pending status",
      });
    }

    // Generate new password
    const newPassword = generatePassword();
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user status and password
    user.status = "active";
    user.passwordHash = passwordHash;
    await user.save();

    // Send approval email with credentials
    if (sendCredentials) {
      try {
        await sendApprovalEmail(user, newPassword);
      } catch (emailError) {
        console.error("Failed to send approval email:", emailError);
        // Continue even if email fails
      }
    }

    res.json({
      success: true,
      message: "User approved successfully",
      data: {
        id: user._id,
        email: user.email,
        status: user.status,
        credentials: sendCredentials
          ? {
              username: user.email,
              password: newPassword,
            }
          : null,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Reject user registration
export const rejectUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "User is not in pending status",
      });
    }

    user.status = "rejected";
    user.rejectionReason = reason || "Application did not meet requirements";
    await user.save();

    // TODO: Send rejection email (optional)
    // await sendRejectionEmail(user, reason);

    res.json({
      success: true,
      message: "User rejected successfully",
      data: {
        id: user._id,
        email: user.email,
        status: user.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ============================================
// EXISTING FUNCTIONS (UPDATED)
// ============================================

// Get all users (for admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role, search, status } = req.query;

    const filter = {};

    if (role) {
      filter.role = role;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    const users = await UserModel.find(filter)
      .select("-passwordHash")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await UserModel.countDocuments(filter);

    res.json({
      success: true,
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get user by ID with details
export const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id).select(
      "-passwordHash"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let additionalData = {};

    if (user.role === "student") {
      const studentProfile = await StudentModel.findOne({ userId: user._id });
      const applications = await ApplicationModel.find({ studentId: user._id })
        .populate("jobId", "title employerId")
        .populate({
          path: "jobId",
          populate: { path: "employerId", select: "company.name" },
        });

      additionalData.profile = studentProfile;
      additionalData.applications = applications;
    } else if (user.role === "employer") {
      const employerProfile = await EmployerModel.findOne({ userId: user._id });
      const jobs = await JobModel.find({ employerId: user._id });
      const jobApplications = await ApplicationModel.find({
        jobId: { $in: jobs.map((job) => job._id) },
      });

      additionalData.profile = employerProfile;
      additionalData.jobs = jobs;
      additionalData.totalApplications = jobApplications.length;
    }

    res.json({
      success: true,
      data: {
        user,
        ...additionalData,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update user status (ban/unban, activate/deactivate)
export const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    // Updated to include new status options
    if (
      !["active", "inactive", "suspended", "pending", "rejected"].includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Must be active, inactive, suspended, pending, or rejected",
      });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
      message: `User status updated to ${status} successfully`,
    });
  } catch (err) {
    next(err);
  }
};

// Get platform statistics (UPDATED with pending count)
export const getPlatformStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalEmployers,
      pendingApprovals,
      totalJobs,
      totalApplications,
      activeJobs,
      recentRegistrations,
    ] = await Promise.all([
      UserModel.countDocuments({ status: { $ne: "rejected" } }),
      UserModel.countDocuments({ role: "student", status: "active" }),
      UserModel.countDocuments({ role: "employer", status: "active" }),
      UserModel.countDocuments({ status: "pending" }),
      JobModel.countDocuments(),
      ApplicationModel.countDocuments(),
      JobModel.countDocuments({ status: "active" }),
      UserModel.find().sort({ createdAt: -1 }).limit(5).select("-passwordHash"),
    ]);

    res.json({
      success: true,
      data: {
        totals: {
          users: totalUsers,
          students: totalStudents,
          employers: totalEmployers,
          pendingApprovals, // NEW: Added pending count
          jobs: totalJobs,
          applications: totalApplications,
          activeJobs,
        },
        recentRegistrations,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get all jobs (admin view)
export const getAllJobsAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, employer } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (employer) {
      filter.employerId = employer;
    }

    const jobs = await JobModel.find(filter)
      .populate("employerId", "firstName lastName email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await JobModel.countDocuments(filter);

    res.json({
      success: true,
      data: jobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalJobs: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get all applications (admin view)
export const getAllApplications = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, jobId, studentId } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (jobId) {
      filter.jobId = jobId;
    }

    if (studentId) {
      filter.studentId = studentId;
    }

    const applications = await ApplicationModel.find(filter)
      .populate("studentId", "firstName lastName email")
      .populate({
        path: "jobId",
        populate: { path: "employerId", select: "firstName lastName company" },
      })
      .sort({ appliedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ApplicationModel.countDocuments(filter);

    res.json({
      success: true,
      data: applications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalApplications: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    next(err);
  }
};
