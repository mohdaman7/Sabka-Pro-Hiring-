import { Router } from "express";
import { z } from "zod";
import { EmployerModel } from "../models/Employer.js";
import { UserModel } from "../models/User.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

// Get employer profile
router.get(
  "/profile",
  authenticate,
  authorize(["employer"]),
  async (req, res, next) => {
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
  }
);

// Update employer profile
const updateEmployerSchema = z.object({
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

router.put(
  "/profile",
  authenticate,
  authorize(["employer"]),
  async (req, res, next) => {
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
  }
);

export default router;
