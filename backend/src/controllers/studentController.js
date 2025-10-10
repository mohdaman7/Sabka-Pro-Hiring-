import { z } from "zod";
import { StudentModel } from "../models/Student.js";
import { UserModel } from "../models/User.js";

const updateStudentSchema = z.object({
  phone: z.string().optional(),
  phoneVerified: z.boolean().optional(),
  dateOfBirth: z.string().optional(),
  experienceType: z.enum(["fresher", "experienced"]).optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),
  bio: z.string().max(500).optional(),
  kycInfo: z
    .object({
      type: z.enum(["aadhar", "pan", "passport"]).optional(),
      number: z.string().optional(),
      documentUrl: z.string().optional(),
      verified: z.boolean().optional(),
    })
    .optional(),
  education: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        fieldOfStudy: z.string(),
        graduationYear: z.number(),
        gpa: z.number().optional(),
        currentlyEnrolled: z.boolean().optional(),
      })
    )
    .optional(),
  jobPreferences: z
    .object({
      preferredRoles: z.array(z.string()).optional(),
      preferredLocations: z.array(z.string()).optional(),
      jobTypes: z
        .array(
          z.enum(["full-time", "part-time", "internship", "contract", "remote"])
        )
        .optional(),
      expectedSalary: z
        .object({
          min: z.number().optional(),
          max: z.number().optional(),
          currency: z.string().optional(),
        })
        .optional(),
      willingToRelocate: z.boolean().optional(),
    })
    .optional(),
  skills: z
    .array(
      z.object({
        name: z.string(),
        level: z
          .enum(["beginner", "intermediate", "advanced", "expert"])
          .optional(),
      })
    )
    .optional(),
  careerPlan: z
    .object({
      shortTermGoals: z.string().max(300).optional(),
      longTermGoals: z.string().max(300).optional(),
      areasOfInterest: z.array(z.string()).optional(),
    })
    .optional(),
});

export async function getProfile(req, res, next) {
  try {
    const student = await StudentModel.findOne({
      userId: req.user.id,
    }).populate("userId", "firstName lastName email");

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student profile not found" });
    }

    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const parsed = updateStudentSchema.parse(req.body);

    const student = await StudentModel.findOneAndUpdate(
      { userId: req.user.id },
      { $set: parsed },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student profile not found" });
    }

    // Update user profile completion status
    await UserModel.findByIdAndUpdate(req.user.id, {
      profileCompleted: true,
    });

    res.json({
      success: true,
      data: student,
      message: "Profile updated successfully",
    });
  } catch (err) {
    next(err);
  }
}
