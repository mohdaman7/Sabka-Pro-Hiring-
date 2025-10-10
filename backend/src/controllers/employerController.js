import { z } from "zod";
import { EmployerModel } from "../models/Employer.js";
import { UserModel } from "../models/User.js";

// Validation schema
export const updateEmployerSchema = z.object({
  company: z
    .object({
      name: z.string(),
      description: z.string().optional(),
      industry: z.string().optional(),
      size: z
        .enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
        .optional(),
      website: z.string().optional(),
      foundedYear: z.number().optional(),
    })
    .optional(),
  contact: z
    .object({
      phone: z.string().optional(),
      address: z
        .object({
          street: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          country: z.string().optional(),
          zipCode: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  hiringNeeds: z
    .object({
      typesOfRoles: z.array(z.string()).optional(),
      locations: z.array(z.string()).optional(),
      typicalSalaryRanges: z
        .array(
          z.object({
            role: z.string(),
            min: z.number(),
            max: z.number(),
            currency: z.string().optional(),
          })
        )
        .optional(),
    })
    .optional(),
  bio: z.string().max(500).optional(),
  hiringGoals: z.string().max(300).optional(),
});

// Get employer profile
export const getEmployerProfile = async (req, res, next) => {
  try {
    const employer = await EmployerModel.findOne({
      userId: req.user.id,
    }).populate("userId", "firstName lastName email");

    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer profile not found" });
    }

    res.json({ success: true, data: employer });
  } catch (err) {
    next(err);
  }
};

// Update employer profile
export const updateEmployerProfile = async (req, res, next) => {
  try {
    const parsed = updateEmployerSchema.parse(req.body);

    const employer = await EmployerModel.findOneAndUpdate(
      { userId: req.user.id },
      { $set: parsed },
      { new: true, runValidators: true }
    );

    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer profile not found" });
    }

    // Update user profile completion status
    await UserModel.findByIdAndUpdate(req.user.id, {
      profileCompleted: true,
    });

    res.json({
      success: true,
      data: employer,
      message: "Profile updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Optional: Get employer by ID (public profile)
export const getEmployerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employer = await EmployerModel.findById(id)
      .populate("userId", "firstName lastName email")
      .select("-hiringNeeds.typicalSalaryRanges"); // Exclude sensitive salary data

    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer not found" });
    }

    res.json({ success: true, data: employer });
  } catch (err) {
    next(err);
  }
};

// Optional: Get all employers (for admin or public listing)
export const getAllEmployers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, industry, companySize, search } = req.query;

    const filter = {};

    if (industry) {
      filter["company.industry"] = new RegExp(industry, "i");
    }

    if (companySize) {
      filter["company.size"] = companySize;
    }

    if (search) {
      filter.$or = [
        { "company.name": new RegExp(search, "i") },
        { "company.description": new RegExp(search, "i") },
      ];
    }

    const employers = await EmployerModel.find(filter)
      .populate("userId", "firstName lastName email")
      .select("-hiringNeeds.typicalSalaryRanges")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await EmployerModel.countDocuments(filter);

    res.json({
      success: true,
      data: employers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalEmployers: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    next(err);
  }
};
