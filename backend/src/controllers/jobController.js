import { z } from "zod";
import { JobModel } from "../models/Job.js";

// Validation schemas
export const createJobSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  location: z.string().optional(),
  salaryMin: z.number().int().nonnegative().optional(),
  salaryMax: z.number().int().nonnegative().optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  jobType: z
    .enum(["full-time", "part-time", "contract", "internship", "remote"])
    .optional(),
  category: z.string().optional(),
  applicationDeadline: z.date().optional(),
});

export const updateJobSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  location: z.string().optional(),
  salaryMin: z.number().int().nonnegative().optional(),
  salaryMax: z.number().int().nonnegative().optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  jobType: z
    .enum(["full-time", "part-time", "contract", "internship", "remote"])
    .optional(),
  category: z.string().optional(),
  applicationDeadline: z.date().optional(),
  status: z.enum(["active", "paused", "closed"]).optional(),
});

// Create a new job
export const createJob = async (req, res, next) => {
  try {
    const parsed = createJobSchema.parse(req.body);
    const job = await JobModel.create({
      ...parsed,
      employerId: req.user.id,
    });
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// Get all jobs (public)
export const getAllJobs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      location,
      jobType,
      category,
      minSalary,
      maxSalary,
    } = req.query;

    const filter = { status: "active" }; // Only show active jobs by default

    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
      ];
    }

    if (location) {
      filter.location = new RegExp(location, "i");
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (category) {
      filter.category = new RegExp(category, "i");
    }

    if (minSalary) {
      filter.salaryMin = { $gte: parseInt(minSalary) };
    }

    if (maxSalary) {
      filter.salaryMax = { $lte: parseInt(maxSalary) };
    }

    const jobs = await JobModel.find(filter)
      .populate("employerId", "company name")
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

// Get employer's jobs
export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await JobModel.find({ employerId: req.user.id })
      .populate("employerId", "company name")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (err) {
    next(err);
  }
};

// Get single job by ID
export const getJobById = async (req, res, next) => {
  try {
    const job = await JobModel.findById(req.params.id).populate(
      "employerId",
      "company name website size industry"
    );

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// Update job
export const updateJob = async (req, res, next) => {
  try {
    const parsed = updateJobSchema.parse(req.body);

    const job = await JobModel.findOneAndUpdate(
      { _id: req.params.id, employerId: req.user.id },
      { $set: parsed },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you are not authorized to update this job",
      });
    }

    res.json({
      success: true,
      data: job,
      message: "Job updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Delete job
export const deleteJob = async (req, res, next) => {
  try {
    const job = await JobModel.findOneAndDelete({
      _id: req.params.id,
      employerId: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you are not authorized to delete this job",
      });
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get job applications for a specific job
export const getJobApplications = async (req, res, next) => {
  try {
    const job = await JobModel.findOne({
      _id: req.params.id,
      employerId: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message:
          "Job not found or you are not authorized to view applications for this job",
      });
    }

    const applications = await ApplicationModel.find({ jobId: req.params.id })
      .populate("studentId", "firstName lastName email profile")
      .sort({ appliedAt: -1 });

    res.json({ success: true, data: applications });
  } catch (err) {
    next(err);
  }
};
