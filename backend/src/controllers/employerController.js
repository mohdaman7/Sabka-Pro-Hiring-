import { z } from "zod";
import { EmployerModel } from "../models/Employer.js";
import { UserModel } from "../models/User.js";

// Validation schema for profile completion (required fields)
export const completeEmployerProfileSchema = z.object({
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    description: z.string().optional(),
    industry: z.string().min(1, "Industry is required"),
    size: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]),
    website: z.string().url().optional().or(z.literal("")),
    foundedYear: z.number().min(1900).max(new Date().getFullYear()).optional(),
  }),
  contact: z.object({
    phone: z.string().min(10, "Valid phone number is required"),
    address: z.object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      country: z.string().min(1, "Country is required"),
      zipCode: z.string().min(1, "Zip code is required"),
    }),
  }),
  position: z.string().min(1, "Position is required"),
  department: z.string().optional(),
  bio: z.string().max(500).optional(),
  hiringGoals: z.string().max(300).optional(),
});

// Validation schema for partial updates (all fields optional)
export const updateEmployerSchema = z.object({
  company: z
    .object({
      name: z.string().min(1).optional(),
      description: z.string().optional(),
      industry: z.string().optional(),
      size: z
        .enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
        .optional(),
      website: z.string().url().optional().or(z.literal("")),
      foundedYear: z
        .number()
        .min(1900)
        .max(new Date().getFullYear())
        .optional(),
    })
    .optional(),
  contact: z
    .object({
      phone: z.string().min(10).optional(),
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
            currency: z.string().default("USD"),
          })
        )
        .optional(),
    })
    .optional(),
  bio: z.string().max(500).optional(),
  hiringGoals: z.string().max(300).optional(),
});

// Calculate profile completion percentage
function calculateProfileCompletion(employer) {
  let completedFields = 0;
  const totalFields = 8; // Adjust based on your important fields

  const fieldsToCheck = [
    employer?.position,
    employer?.company?.name,
    employer?.company?.industry,
    employer?.company?.size,
    employer?.contact?.phone,
    employer?.contact?.address?.street,
    employer?.contact?.address?.city,
    employer?.contact?.address?.country,
  ];

  completedFields = fieldsToCheck.filter(
    (field) => field !== undefined && field !== null && field !== ""
  ).length;

  return Math.round((completedFields / totalFields) * 100);
}

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

    // Calculate current profile completion
    const profileCompletion = calculateProfileCompletion(employer);

    res.json({
      success: true,
      data: {
        ...employer.toObject(),
        profileCompletion,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Complete employer profile (for initial setup)
export const completeEmployerProfile = async (req, res, next) => {
  try {
    const parsed = completeEmployerProfileSchema.parse(req.body);

    const employer = await EmployerModel.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
          ...parsed,
          profileCompletion: 100, // Mark as fully complete
        },
      },
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
      message: "Profile completed successfully",
      profileCompletion: employer.profileCompletion,
    });
  } catch (err) {
    next(err);
  }
};

// Update employer profile (for partial updates)
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

    // Recalculate profile completion
    const profileCompletion = calculateProfileCompletion(employer);

    // Update profile completion in database
    employer.profileCompletion = profileCompletion;
    await employer.save();

    // Update user profile completion status if profile is 100% complete
    if (profileCompletion === 100) {
      await UserModel.findByIdAndUpdate(req.user.id, {
        profileCompleted: true,
      });
    }

    res.json({
      success: true,
      data: employer,
      message: "Profile updated successfully",
      profileCompletion,
    });
  } catch (err) {
    next(err);
  }
};

// Update hiring preferences specifically
export const updateHiringPreferences = async (req, res, next) => {
  try {
    const { typesOfRoles, locations, typicalSalaryRanges } = req.body;

    const employer = await EmployerModel.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
          hiringNeeds: {
            typesOfRoles: typesOfRoles || [],
            locations: locations || [],
            typicalSalaryRanges: typicalSalaryRanges || [],
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer profile not found" });
    }

    res.json({
      success: true,
      data: employer,
      message: "Hiring preferences updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get employer dashboard stats
export const getEmployerDashboard = async (req, res, next) => {
  try {
    const employer = await EmployerModel.findOne({
      userId: req.user.id,
    }).populate("userId", "firstName lastName email");

    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer profile not found" });
    }

    // TODO: Add actual stats from your job and application models
    const dashboardStats = {
      profileCompletion: employer.profileCompletion,
      company: employer.company,
      totalJobsPosted: 0, // Replace with actual count
      totalApplications: 0, // Replace with actual count
      activeJobs: 0, // Replace with actual count
      newApplications: 0, // Replace with actual count
    };

    res.json({
      success: true,
      data: dashboardStats,
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
      .select("-hiringNeeds.typicalSalaryRanges -verificationDocuments");

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

    const filter = { isActive: true }; // Only show active employers

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
        { position: new RegExp(search, "i") },
      ];
    }

    const employers = await EmployerModel.find(filter)
      .populate("userId", "firstName lastName email")
      .select("-hiringNeeds.typicalSalaryRanges -verificationDocuments")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await EmployerModel.countDocuments(filter);

    res.json({
      success: true,
      data: employers,
      pagination: {
        currentPage: parseInt(page),
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
