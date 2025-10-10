import { z } from "zod";
import { ApplicationModel } from "../models/Application.js";
import { JobModel } from "../models/Job.js";

// Validation schemas
export const applySchema = z.object({
  jobId: z.string().min(1),
  resumeUrl: z.string().url().optional(),
  coverLetter: z.string().max(5000).optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(["applied", "reviewed", "interview", "rejected", "hired"]),
  feedback: z.string().max(1000).optional(),
});

// Apply for a job
export const applyForJob = async (req, res, next) => {
  try {
    const parsed = applySchema.parse(req.body);
    const job = await JobModel.findById(parsed.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if job is still active
    if (job.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "This job is no longer accepting applications",
      });
    }

    // Check if already applied
    const existingApplication = await ApplicationModel.findOne({
      jobId: job._id,
      studentId: req.user.id,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await ApplicationModel.create({
      jobId: job._id,
      studentId: req.user.id,
      employerId: job.employerId,
      resumeUrl: parsed.resumeUrl,
      coverLetter: parsed.coverLetter,
      status: "applied",
    });

    // Populate the application with job details for response
    await application.populate("jobId", "title company");

    res.status(201).json({
      success: true,
      data: application,
      message: "Application submitted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get student's applications
export const getMyApplications = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = "appliedAt",
      sortOrder = "desc",
    } = req.query;

    const filter = { studentId: req.user.id };

    if (status) {
      filter.status = status;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const applications = await ApplicationModel.find(filter)
      .populate({
        path: "jobId",
        select:
          "title company location salaryMin salaryMax jobType requirements",
        populate: {
          path: "employerId",
          select: "company.name website industry",
        },
      })
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ApplicationModel.countDocuments(filter);

    // Calculate application statistics
    const stats = await ApplicationModel.aggregate([
      { $match: { studentId: req.user.id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusStats = {};
    stats.forEach((stat) => {
      statusStats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: applications,
      stats: statusStats,
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

// Get applications for employer's jobs
export const getApplicationsForMyJobs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      jobId,
      sortBy = "appliedAt",
      sortOrder = "desc",
    } = req.query;

    const filter = { employerId: req.user.id };

    if (status) {
      filter.status = status;
    }

    if (jobId) {
      filter.jobId = jobId;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const applications = await ApplicationModel.find(filter)
      .populate("jobId", "title location salaryMin salaryMax")
      .populate(
        "studentId",
        "firstName lastName email profile skills education"
      )
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ApplicationModel.countDocuments(filter);

    // Get application statistics for employer
    const stats = await ApplicationModel.aggregate([
      { $match: { employerId: req.user.id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusStats = {};
    stats.forEach((stat) => {
      statusStats[stat._id] = stat.count;
    });

    // Get unique job list for filter
    const employerJobs = await JobModel.find({ employerId: req.user.id })
      .select("title _id")
      .sort({ title: 1 });

    res.json({
      success: true,
      data: applications,
      stats: statusStats,
      filterOptions: {
        jobs: employerJobs,
      },
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

// Update application status
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsed = updateApplicationStatusSchema.parse(req.body);

    const application = await ApplicationModel.findOneAndUpdate(
      { _id: id, employerId: req.user.id },
      {
        status: parsed.status,
        ...(parsed.feedback && { feedback: parsed.feedback }),
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    )
      .populate("jobId", "title")
      .populate("studentId", "firstName lastName email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found or you are not authorized to update this application",
      });
    }

    res.json({
      success: true,
      data: application,
      message: `Application status updated to ${parsed.status}`,
    });
  } catch (err) {
    next(err);
  }
};

// Get single application details
export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let filter = { _id: id };

    // Students can only see their own applications
    // Employers can only see applications for their jobs
    if (req.user.role === "student") {
      filter.studentId = req.user.id;
    } else if (req.user.role === "employer") {
      filter.employerId = req.user.id;
    }

    const application = await ApplicationModel.findOne(filter)
      .populate(
        "jobId",
        "title description location salaryMin salaryMax jobType requirements benefits"
      )
      .populate(
        "studentId",
        "firstName lastName email profile skills education workExperience"
      )
      .populate("employerId", "company.name website industry");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// Withdraw application (student only)
export const withdrawApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await ApplicationModel.findOneAndUpdate(
      {
        _id: id,
        studentId: req.user.id,
        status: { $in: ["applied", "reviewed"] }, // Can only withdraw from certain statuses
      },
      {
        status: "withdrawn",
        withdrawnAt: new Date(),
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found or cannot be withdrawn at this stage",
      });
    }

    res.json({
      success: true,
      message: "Application withdrawn successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get application statistics for dashboard
export const getApplicationStats = async (req, res, next) => {
  try {
    let matchFilter = {};

    if (req.user.role === "student") {
      matchFilter.studentId = req.user.id;
    } else if (req.user.role === "employer") {
      matchFilter.employerId = req.user.id;
    }

    const stats = await ApplicationModel.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalApplications = await ApplicationModel.countDocuments(
      matchFilter
    );

    // Convert stats array to object
    const statusStats = {
      total: totalApplications,
    };

    stats.forEach((stat) => {
      statusStats[stat._id] = stat.count;
    });

    // Get recent activity
    const recentApplications = await ApplicationModel.find(matchFilter)
      .populate("jobId", "title")
      .populate("studentId", "firstName lastName")
      .sort({ appliedAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        stats: statusStats,
        recentActivity: recentApplications,
      },
    });
  } catch (err) {
    next(err);
  }
};
