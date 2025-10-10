import { UserModel } from "../models/User.js";
import { ApplicationModel } from "../models/Application.js";
import { JobModel } from "../models/Job.js";
import { EmployerModel } from "../models/Employer.js";

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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let additionalData = {};

    if (user.role === "student") {
      const applications = await ApplicationModel.find({ studentId: user._id })
        .populate("jobId", "title employerId")
        .populate({
          path: "jobId",
          populate: { path: "employerId", select: "company.name" },
        });
      additionalData.applications = applications;
    } else if (user.role === "employer") {
      const employerProfile = await EmployerModel.findOne({ userId: user._id });
      const jobs = await JobModel.find({ employerId: user._id });
      const jobApplications = await ApplicationModel.find({
        jobId: { $in: jobs.map((job) => job._id) },
      });

      additionalData.employerProfile = employerProfile;
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

    if (!["active", "inactive", "suspended"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be active, inactive, or suspended",
      });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      data: user,
      message: `User ${status} successfully`,
    });
  } catch (err) {
    next(err);
  }
};

// Get platform statistics
export const getPlatformStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalEmployers,
      totalJobs,
      totalApplications,
      activeJobs,
      recentRegistrations,
    ] = await Promise.all([
      UserModel.countDocuments(),
      UserModel.countDocuments({ role: "student" }),
      UserModel.countDocuments({ role: "employer" }),
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
