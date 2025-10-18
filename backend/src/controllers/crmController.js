// backend/src/controllers/crmController.js
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User.js";
import { StudentModel } from "../models/Student.js";
import { EmployerModel } from "../models/Employer.js";
import { ApplicationModel } from "../models/Application.js";
import { JobModel } from "../models/Job.js";
import { CompanyModel } from "../models/Company.js";
import mongoose from "mongoose";
import { SupportTicketModel } from "../models/SupportTicket.js";
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
      openSupportTickets,
    ] = await Promise.all([
      UserModel.countDocuments({ status: { $ne: "rejected" } }),
      UserModel.countDocuments({ role: "student", status: "active" }),
      UserModel.countDocuments({ role: "employer", status: "active" }),
      UserModel.countDocuments({ status: "pending" }),
      JobModel.countDocuments(),
      ApplicationModel.countDocuments(),
      JobModel.countDocuments({ status: "active" }),
      UserModel.find().sort({ createdAt: -1 }).limit(5).select("-passwordHash"),
      SupportTicketModel.countDocuments({ status: { $in: ["open", "in_progress"] } }),
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
          supportOpen: openSupportTickets,
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

// ============================================
// Employer Document Verification (Admin)
// ============================================

export const listEmployerDocuments = async (req, res, next) => {
  try {
    const { id } = req.params; // employer userId
    const employer = await EmployerModel.findOne({ userId: id }).select(
      "verificationDocuments isVerified"
    );
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer profile not found" });
    }
    res.json({ success: true, data: employer.verificationDocuments });
  } catch (err) {
    next(err);
  }
};

export const reviewEmployerDocument = async (req, res, next) => {
  try {
    const { id, docId } = req.params; // employer userId and document subdoc id
    const { action, reason } = req.body; // action: 'verify' | 'reject'
    if (!["verify", "reject"].includes(action)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    const employer = await EmployerModel.findOne({ userId: id });
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer profile not found" });
    }

    const document = employer.verificationDocuments.id(docId);
    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    if (action === "verify") {
      document.status = "verified";
      document.rejectionReason = undefined;
    } else if (action === "reject") {
      document.status = "rejected";
      document.rejectionReason = reason || "Unclear or invalid document";
    }
    document.reviewedBy = req.user?._id || null;
    document.reviewedAt = new Date();

    // If all docs verified, mark employer verified
    const allVerified = employer.verificationDocuments.every(
      (d) => (d._id.equals(document._id) ? document.status === "verified" : d.status === "verified")
    );
    employer.isVerified = allVerified;

    await employer.save();
    res.json({ success: true, data: document, isVerified: employer.isVerified });
  } catch (err) {
    next(err);
  }
};

// ============================================
// Employer Plan Management (Admin)
// ============================================

export const adminUpdateEmployerPlan = async (req, res, next) => {
  try {
    const { id } = req.params; // employer userId
    const { plan } = req.body; // 'free' | 'pro'
    if (!plan || !["free", "pro"].includes(plan)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid plan" });
    }
    const employer = await EmployerModel.findOneAndUpdate(
      { userId: id },
      { $set: { plan } },
      { new: true }
    );
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer profile not found" });
    }
    res.json({ success: true, data: { plan: employer.plan } });
  } catch (err) {
    next(err);
  }
};

// ============================================
// Job Moderation (Admin - approve/reject)
// ============================================

export const adminModerateJob = async (req, res, next) => {
  try {
    const { id } = req.params; // job id
    const { action } = req.body; // 'approve' | 'reject' | 'close'
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    if (action === "approve") {
      job.status = "active";
    } else if (action === "reject") {
      job.status = "draft";
    } else if (action === "close") {
      job.status = "closed";
    } else {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }
    await job.save();
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// ============================================
// Company Management (Admin)
// ============================================
export const createCompany = async (req, res, next) => {
  try {
    const payload = req.body || {};
    if (!payload.name) {
      return res.status(400).json({ success: false, message: "Company name is required" });
    }
    const company = await CompanyModel.create(payload);
    res.status(201).json({ success: true, data: company, message: "Company created" });
  } catch (err) {
    next(err);
  }
};

export const listCompanies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, industry } = req.query;
    const filter = {};
    if (search) filter.name = new RegExp(search, "i");
    if (industry) filter.industry = new RegExp(industry, "i");

    const companies = await CompanyModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await CompanyModel.countDocuments(filter);
    res.json({
      success: true,
      data: companies,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalCompanies: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const company = await CompanyModel.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    res.json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const company = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    res.json({ success: true, data: company, message: "Company updated" });
  } catch (err) {
    next(err);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const company = await CompanyModel.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    res.json({ success: true, message: "Company deleted" });
  } catch (err) {
    next(err);
  }
};
