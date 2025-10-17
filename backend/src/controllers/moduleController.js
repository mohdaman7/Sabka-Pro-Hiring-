import { z } from "zod";
import { CourseModule } from "../models/CourseModule.js";
import { Video } from "../models/Video.js";
import { ModuleProgress } from "../models/ModuleProgress.js";
import { ModuleEnrollment } from "../models/ModuleEnrollment.js";
import { Course } from "../models/Course.js";
import { Student } from "../models/Student.js";

// Validation schemas
const modulePurchaseSchema = z.object({
  paymentMethod: z.enum(["card", "upi", "netbanking", "wallet", "cod"]).optional().default("card"),
  paymentId: z.string().optional(),
  metadata: z.object({}).optional().default({}),
});

const moduleSearchSchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  course: z.string().optional(),
  access: z.enum(["Free", "Pro"]).optional(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  sortBy: z.enum(["title", "order", "price", "createdAt"]).optional().default("order"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
});

// Get all modules with filters
export async function getModules(req, res, next) {
  try {
    const { page, limit, course, access, difficulty, sortBy, sortOrder } = moduleSearchSchema.parse(req.query);
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Build filter object
    const filter = { status: "Active" };
    
    if (course) filter.course = course;
    if (access) filter.access = access;
    if (difficulty) filter.difficulty = difficulty;
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    
    const modules = await CourseModule.find(filter)
      .populate("course", "title thumbnail instructor")
      .populate("previewVideo", "title duration thumbnail")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    const total = await CourseModule.countDocuments(filter);
    
    // Check student access for each module
    const studentId = req.user?.id;
    let moduleAccess = {};
    
    if (studentId) {
      const enrollments = await ModuleEnrollment.find({
        student: studentId,
        module: { $in: modules.map(m => m._id) },
        paymentStatus: "completed",
        isActive: true,
      }).lean();
      
      moduleAccess = enrollments.reduce((acc, enrollment) => {
        acc[enrollment.module.toString()] = true;
        return acc;
      }, {});
    }
    
    const modulesWithAccess = modules.map(module => ({
      ...module,
      hasAccess: module.access === "Free" || moduleAccess[module._id.toString()] || false,
    }));
    
    res.json({
      success: true,
      data: {
        modules: modulesWithAccess,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalModules: total,
          hasNext: pageNum < Math.ceil(total / limitNum),
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get module by ID
export async function getModuleById(req, res, next) {
  try {
    const { id } = req.params;
    
    const module = await CourseModule.findById(id)
      .populate("course", "title thumbnail instructor category")
      .populate("previewVideo", "title duration thumbnail vimeoId")
      .lean();
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }
    
    // Check if student has access
    const studentId = req.user?.id;
    let hasAccess = false;
    let isEnrolled = false;
    
    if (studentId) {
      const enrollment = await ModuleEnrollment.findOne({
        student: studentId,
        module: id,
        paymentStatus: "completed",
        isActive: true,
      });
      
      isEnrolled = !!enrollment;
      hasAccess = module.access === "Free" || isEnrolled;
    }
    
    res.json({
      success: true,
      data: {
        ...module,
        hasAccess,
        isEnrolled,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Purchase module
export async function purchaseModule(req, res, next) {
  try {
    const { moduleId } = req.params;
    const studentId = req.user.id;
    const { paymentMethod, paymentId, metadata } = modulePurchaseSchema.parse(req.body);
    
    // Check if module exists
    const module = await CourseModule.findById(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }
    
    // Check if already enrolled
    const existingEnrollment = await ModuleEnrollment.findOne({
      student: studentId,
      module: moduleId,
    });
    
    if (existingEnrollment) {
      if (existingEnrollment.paymentStatus === "completed") {
        return res.status(400).json({
          success: false,
          message: "You are already enrolled in this module",
        });
      } else {
        // Update existing enrollment
        existingEnrollment.paymentMethod = paymentMethod;
        existingEnrollment.paymentId = paymentId;
        existingEnrollment.metadata = metadata;
        existingEnrollment.paymentStatus = "completed";
        existingEnrollment.isActive = true;
        await existingEnrollment.save();
        
        return res.json({
          success: true,
          message: "Module enrollment updated successfully",
          data: existingEnrollment,
        });
      }
    }
    
    // Create new enrollment
    const enrollment = await ModuleEnrollment.create({
      student: studentId,
      module: moduleId,
      course: module.course,
      paymentMethod,
      paymentId,
      amount: module.price,
      paymentStatus: "completed",
      isActive: true,
      metadata,
    });
    
    // Create module progress record
    await ModuleProgress.create({
      student: studentId,
      module: moduleId,
      isPurchased: true,
      purchasedAt: new Date(),
    });
    
    res.status(201).json({
      success: true,
      message: "Module purchased successfully",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
}

// Get student's enrolled modules
export async function getMyModules(req, res, next) {
  try {
    const studentId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const filter = { student: studentId, isActive: true };
    if (status) filter.paymentStatus = status;
    
    const enrollments = await ModuleEnrollment.find(filter)
      .populate({
        path: "module",
        populate: {
          path: "course",
          select: "title thumbnail instructor",
        },
      })
      .sort({ enrolledAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    const total = await ModuleEnrollment.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        enrollments,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalEnrollments: total,
          hasNext: pageNum < Math.ceil(total / limitNum),
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get module videos with access control
export async function getModuleVideos(req, res, next) {
  try {
    const { moduleId } = req.params;
    const studentId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Check if student has access to the module
    const enrollment = await ModuleEnrollment.findOne({
      student: studentId,
      module: moduleId,
      paymentStatus: "completed",
      isActive: true,
    });
    
    const module = await CourseModule.findById(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }
    
    const hasAccess = module.access === "Free" || !!enrollment;
    
    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to this module",
      });
    }
    
    const videos = await Video.find({ module: moduleId, isActive: true })
      .sort({ order: 1 })
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    const total = await Video.countDocuments({ module: moduleId, isActive: true });
    
    res.json({
      success: true,
      data: {
        videos,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalVideos: total,
          hasNext: pageNum < Math.ceil(total / limitNum),
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get module progress
export async function getModuleProgress(req, res, next) {
  try {
    const { moduleId } = req.params;
    const studentId = req.user.id;
    
    // Check if student has access
    const enrollment = await ModuleEnrollment.findOne({
      student: studentId,
      module: moduleId,
      paymentStatus: "completed",
      isActive: true,
    });
    
    const module = await CourseModule.findById(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }
    
    const hasAccess = module.access === "Free" || !!enrollment;
    
    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to this module",
      });
    }
    
    let progress = await ModuleProgress.findOne({
      student: studentId,
      module: moduleId,
    })
      .populate("module", "title thumbnail totalVideos")
      .populate("completedVideos.video", "title duration order")
      .populate("lastWatchedVideo", "title duration order")
      .lean();
    
    if (!progress) {
      // Create new progress record
      progress = await ModuleProgress.create({
        student: studentId,
        module: moduleId,
        isPurchased: !!enrollment,
        purchasedAt: enrollment?.enrolledAt,
      });
      
      progress = await ModuleProgress.findById(progress._id)
        .populate("module", "title thumbnail totalVideos")
        .populate("completedVideos.video", "title duration order")
        .populate("lastWatchedVideo", "title duration order")
        .lean();
    }
    
    res.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    next(error);
  }
}

// Update module video progress
export async function updateModuleVideoProgress(req, res, next) {
  try {
    const { moduleId } = req.params;
    const studentId = req.user.id;
    const { videoId, timeSpent, watchPercentage } = req.body;
    
    // Check if student has access
    const enrollment = await ModuleEnrollment.findOne({
      student: studentId,
      module: moduleId,
      paymentStatus: "completed",
      isActive: true,
    });
    
    const module = await CourseModule.findById(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }
    
    const hasAccess = module.access === "Free" || !!enrollment;
    
    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to this module",
      });
    }
    
    // Get or create progress record
    let progress = await ModuleProgress.findOne({
      student: studentId,
      module: moduleId,
    });
    
    if (!progress) {
      progress = await ModuleProgress.create({
        student: studentId,
        module: moduleId,
        isPurchased: !!enrollment,
        purchasedAt: enrollment?.enrolledAt,
      });
    }
    
    // Update video progress
    await progress.updateVideoProgress(videoId, timeSpent, watchPercentage);
    
    // Update video views
    await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });
    
    res.json({
      success: true,
      message: "Progress updated successfully",
      data: progress,
    });
  } catch (error) {
    next(error);
  }
}

// Get module statistics for student
export async function getMyModuleStats(req, res, next) {
  try {
    const studentId = req.user.id;
    
    const [
      totalEnrolled,
      completedModules,
      inProgressModules,
      totalTimeSpent,
      recentActivity,
    ] = await Promise.all([
      ModuleEnrollment.countDocuments({ student: studentId, isActive: true }),
      ModuleProgress.countDocuments({ student: studentId, progress: 100 }),
      ModuleProgress.countDocuments({ student: studentId, progress: { $gt: 0, $lt: 100 } }),
      ModuleProgress.aggregate([
        { $match: { student: studentId } },
        { $group: { _id: null, totalTime: { $sum: "$timeSpent" } } },
      ]),
      ModuleProgress.find({ student: studentId })
        .populate("module", "title thumbnail")
        .sort({ lastAccessedAt: -1 })
        .limit(5)
        .lean(),
    ]);
    
    res.json({
      success: true,
      data: {
        totalEnrolled,
        completedModules,
        inProgressModules,
        totalTimeSpent: totalTimeSpent[0]?.totalTime || 0,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get free modules
export async function getFreeModules(req, res, next) {
  try {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit);
    
    const modules = await CourseModule.find({
      status: "Active",
      access: "Free",
    })
      .populate("course", "title thumbnail instructor")
      .populate("previewVideo", "title duration thumbnail")
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .lean();
    
    res.json({
      success: true,
      data: modules,
    });
  } catch (error) {
    next(error);
  }
}

// Get module by course
export async function getModulesByCourse(req, res, next) {
  try {
    const { courseId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const modules = await CourseModule.find({
      course: courseId,
      status: "Active",
    })
      .populate("previewVideo", "title duration thumbnail")
      .sort({ order: 1 })
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    const total = await CourseModule.countDocuments({
      course: courseId,
      status: "Active",
    });
    
    // Check student access for each module
    const studentId = req.user?.id;
    let moduleAccess = {};
    
    if (studentId) {
      const enrollments = await ModuleEnrollment.find({
        student: studentId,
        module: { $in: modules.map(m => m._id) },
        paymentStatus: "completed",
        isActive: true,
      }).lean();
      
      moduleAccess = enrollments.reduce((acc, enrollment) => {
        acc[enrollment.module.toString()] = true;
        return acc;
      }, {});
    }
    
    const modulesWithAccess = modules.map(module => ({
      ...module,
      hasAccess: module.access === "Free" || moduleAccess[module._id.toString()] || false,
    }));
    
    res.json({
      success: true,
      data: {
        modules: modulesWithAccess,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalModules: total,
          hasNext: pageNum < Math.ceil(total / limitNum),
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}