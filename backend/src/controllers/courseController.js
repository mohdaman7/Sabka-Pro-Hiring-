import { z } from "zod";
import { Course } from "../models/Course.js";
import { CourseCategory } from "../models/CourseCategory.js";
import { CourseModule } from "../models/CourseModule.js";
import { Video } from "../models/Video.js";
import { CourseProgress } from "../models/CourseProgress.js";
import { ModuleProgress } from "../models/ModuleProgress.js";
import { CourseEnrollment } from "../models/CourseEnrollment.js";
import { ModuleEnrollment } from "../models/ModuleEnrollment.js";
import { Student } from "../models/Student.js";

// Validation schemas
const courseSearchSchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  category: z.string().optional(),
  search: z.string().optional(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  access: z.enum(["Free", "Pro"]).optional(),
  sortBy: z.enum(["title", "createdAt", "rating", "price", "enrolled"]).optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

const progressUpdateSchema = z.object({
  videoId: z.string().required(),
  timeSpent: z.number().min(0).optional().default(0),
  watchPercentage: z.number().min(0).max(100).optional().default(100),
});

// Get all courses with filters and pagination
export async function getCourses(req, res, next) {
  try {
    const { page, limit, category, search, difficulty, access, sortBy, sortOrder } = courseSearchSchema.parse(req.query);
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Build filter object
    const filter = { status: "Active" };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (access) filter.access = access;
    
    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
        { instructor: { $regex: search, $options: "i" } },
      ];
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    
    const courses = await Course.find(filter)
      .populate("category", "name icon")
      .populate("instructorId", "firstName lastName")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    const total = await Course.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalCourses: total,
          hasNext: pageNum < Math.ceil(total / limitNum),
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get course by ID
export async function getCourseById(req, res, next) {
  try {
    const { id } = req.params;
    
    const course = await Course.findById(id)
      .populate("category", "name icon description")
      .populate("instructorId", "firstName lastName email")
      .lean();
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    
    // Check if student has access
    const studentId = req.user?.id;
    let hasAccess = false;
    let isEnrolled = false;
    
    if (studentId) {
      const enrollment = await CourseEnrollment.findOne({
        student: studentId,
        course: id,
        paymentStatus: "completed",
        isActive: true,
      });
      
      isEnrolled = !!enrollment;
      hasAccess = course.access === "Free" || isEnrolled;
    }
    
    res.json({
      success: true,
      data: {
        ...course,
        hasAccess,
        isEnrolled,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get course modules
export async function getCourseModules(req, res, next) {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const modules = await CourseModule.find({ course: id, status: "Active" })
      .populate("previewVideo", "title duration thumbnail")
      .sort({ order: 1 })
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    const total = await CourseModule.countDocuments({ course: id, status: "Active" });
    
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

// Get module videos
export async function getModuleVideos(req, res, next) {
  try {
    const { moduleId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
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

// Get course categories
export async function getCourseCategories(req, res, next) {
  try {
    const categories = await CourseCategory.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 })
      .lean();
    
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

// Get student's enrolled courses
export async function getMyCourses(req, res, next) {
  try {
    const studentId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const filter = { student: studentId, isActive: true };
    if (status) filter.paymentStatus = status;
    
    const enrollments = await CourseEnrollment.find(filter)
      .populate({
        path: "course",
        populate: {
          path: "category",
          select: "name icon",
        },
      })
      .sort({ enrolledAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    const total = await CourseEnrollment.countDocuments(filter);
    
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

// Get student's course progress
export async function getCourseProgress(req, res, next) {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;
    
    let progress = await CourseProgress.findOne({
      student: studentId,
      course: courseId,
    })
      .populate("course", "title thumbnail totalVideos")
      .populate("completedVideos.video", "title duration order")
      .populate("lastWatchedVideo", "title duration order")
      .lean();
    
    if (!progress) {
      // Create new progress record
      progress = await CourseProgress.create({
        student: studentId,
        course: courseId,
      });
      
      progress = await CourseProgress.findById(progress._id)
        .populate("course", "title thumbnail totalVideos")
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

// Update video progress
export async function updateVideoProgress(req, res, next) {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;
    const { videoId, timeSpent, watchPercentage } = progressUpdateSchema.parse(req.body);
    
    // Check if student has access to the course
    const enrollment = await CourseEnrollment.findOne({
      student: studentId,
      course: courseId,
      paymentStatus: "completed",
      isActive: true,
    });
    
    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to this course",
      });
    }
    
    // Get or create progress record
    let progress = await CourseProgress.findOne({
      student: studentId,
      course: courseId,
    });
    
    if (!progress) {
      progress = await CourseProgress.create({
        student: studentId,
        course: courseId,
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

// Get student's module progress
export async function getModuleProgress(req, res, next) {
  try {
    const { moduleId } = req.params;
    const studentId = req.user.id;
    
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
    const { videoId, timeSpent, watchPercentage } = progressUpdateSchema.parse(req.body);
    
    // Check if student has access to the module
    const enrollment = await ModuleEnrollment.findOne({
      student: studentId,
      module: moduleId,
      paymentStatus: "completed",
      isActive: true,
    });
    
    if (!enrollment) {
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

// Get featured courses
export async function getFeaturedCourses(req, res, next) {
  try {
    const { limit = 6 } = req.query;
    const limitNum = parseInt(limit);
    
    const courses = await Course.find({
      status: "Active",
      isFeatured: true,
    })
      .populate("category", "name icon")
      .populate("instructorId", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .lean();
    
    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
}

// Get course statistics for student
export async function getMyCourseStats(req, res, next) {
  try {
    const studentId = req.user.id;
    
    const [
      totalEnrolled,
      completedCourses,
      inProgressCourses,
      totalTimeSpent,
      recentActivity,
    ] = await Promise.all([
      CourseEnrollment.countDocuments({ student: studentId, isActive: true }),
      CourseProgress.countDocuments({ student: studentId, progress: 100 }),
      CourseProgress.countDocuments({ student: studentId, progress: { $gt: 0, $lt: 100 } }),
      CourseProgress.aggregate([
        { $match: { student: studentId } },
        { $group: { _id: null, totalTime: { $sum: "$timeSpent" } } },
      ]),
      CourseProgress.find({ student: studentId })
        .populate("course", "title thumbnail")
        .sort({ lastAccessedAt: -1 })
        .limit(5)
        .lean(),
    ]);
    
    res.json({
      success: true,
      data: {
        totalEnrolled,
        completedCourses,
        inProgressCourses,
        totalTimeSpent: totalTimeSpent[0]?.totalTime || 0,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
}