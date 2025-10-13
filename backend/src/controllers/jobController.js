import { z } from "zod";
import { JobModel } from "../models/Job.js";

// Validation schemas
export const createJobSchema = z.object({
  title: z.string().min(2, "Job title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  jobType: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ]),
  workMode: z.enum(["On-site", "Remote", "Hybrid"]),
  experience: z.string().min(1, "Experience is required"),
  education: z.string().min(1, "Education is required"),
  salary: z.string().min(1, "Salary is required"),
  vacancies: z.number().int().positive("Vacancies must be a positive number"),
  deadline: z.string().min(1, "Deadline is required"), // Keep as string
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  responsibilities: z
    .string()
    .min(10, "Responsibilities must be at least 10 characters"),
  requirements: z.string().optional(),
  status: z.enum(["draft", "active"]).default("draft"),
});

export const updateJobSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  department: z.string().optional(),
  location: z.string().optional(),
  jobType: z
    .enum(["Full-time", "Part-time", "Contract", "Internship", "Freelance"])
    .optional(),
  workMode: z.enum(["On-site", "Remote", "Hybrid"]).optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  salary: z.string().optional(),
  vacancies: z.number().int().positive().optional(),
  deadline: z.string().optional(), // Keep as string
  skills: z.array(z.string()).optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  status: z.enum(["draft", "active", "paused", "closed"]).optional(),
});

// Create a new job
export const createJob = async (req, res, next) => {
  try {
    const parsed = createJobSchema.parse({
      ...req.body,
      vacancies: parseInt(req.body.vacancies),
      // Keep deadline as string, let MongoDB handle the date conversion
    });

    const job = await JobModel.create({
      ...parsed,
      employerId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: `Job ${
        parsed.status === "draft" ? "saved as draft" : "published"
      } successfully`,
      data: job,
    });
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
      workMode,
      minSalary,
      maxSalary,
    } = req.query;

    const filter = { status: "active" };

    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { department: new RegExp(search, "i") },
        { skills: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (location) {
      filter.location = new RegExp(location, "i");
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (workMode) {
      filter.workMode = workMode;
    }

    const jobs = await JobModel.find(filter)
      .populate("employerId", "firstName lastName company")
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
    const { status } = req.query;
    const filter = { employerId: req.user.id };

    if (status) {
      filter.status = status;
    }

    const jobs = await JobModel.find(filter)
      .populate("employerId", "firstName lastName company")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
};

// Get single job by ID
export const getJobById = async (req, res, next) => {
  try {
    const job = await JobModel.findById(req.params.id)
      .populate("employerId", "firstName lastName company website industry")
      .populate("applications");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (err) {
    next(err);
  }
};

// Update job
export const updateJob = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    // Convert string numbers to actual numbers
    if (updateData.vacancies) {
      updateData.vacancies = parseInt(updateData.vacancies);
    }
    if (updateData.deadline) {
      updateData.deadline = new Date(updateData.deadline);
    }

    const parsed = updateJobSchema.parse(updateData);

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

    res.json({
      success: true,
      data: applications,
    });
  } catch (err) {
    next(err);
  }
};
