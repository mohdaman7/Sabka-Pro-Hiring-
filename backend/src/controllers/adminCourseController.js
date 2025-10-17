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
import { User } from "../models/User.js";

// Validation schemas
const courseCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  instructor: z.string().min(1, "Instructor is required"),
  instructorId: z.string().optional(),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().min(0, "Price must be non-negative"),
  access: z.enum(["Free", "Pro"]).default("Free"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).default("Beginner"),
  language: z.string().default("English"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).default("Beginner"),
  tags: z.array(z.string()).optional().default([]),
  requirements: z.array(z.string()).optional().default([]),
  learningOutcomes: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().default(false),
  certificate: z.object({
    enabled: z.boolean().default(false),
    template: z.string().optional(),
    requirements: z.object({
      minProgress: z.number().min(0).max(100).default(80),
      minTimeSpent: z.number().min(0).optional(),
    }).optional(),
  }).optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
});

const courseUpdateSchema = courseCreateSchema.partial();

const categoryCreateSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.string().optional().default("📚"),
  description: z.string().optional(),
  sortOrder: z.number().optional().default(0),
});

const categoryUpdateSchema = categoryCreateSchema.partial();

const moduleCreateSchema = z.object({
  course: z.string().min(1, "Course is required"),
  title: z.string().min(1, "Module title is required"),
  description: z.string().optional(),
  order: z.number().min(0, "Order must be non-negative"),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().min(0, "Price must be non-negative"),
  access: z.enum(["Free", "Pro"]).default("Pro"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).default("Beginner"),
  learningOutcomes: z.array(z.string()).optional().default([]),
  requirements: z.array(z.string()).optional().default([]),
  isPreview: z.boolean().default(false),
});

const moduleUpdateSchema = moduleCreateSchema.partial();

const videoCreateSchema = z.object({
  course: z.string().min(1, "Course is required"),
  module: z.string().optional(),
  title: z.string().min(1, "Video title is required"),
  description: z.string().optional(),
  vimeoId: z.string().min(1, "Vimeo ID is required"),
  vimeoUrl: z.string().optional(),
  duration: z.string().min(1, "Duration is required"),
  order: z.number().min(0).default(0),
  access: z.enum(["Free", "Pro"]).default("Pro"),
  drmProtected: z.boolean().default(true),
  isPreview: z.boolean().default(false),
  quality: z.enum(["SD", "HD", "FHD", "4K"]).default("HD"),
  downloadAllowed: z.boolean().default(false),
  screenshotAllowed: z.boolean().default(false),
});

const videoUpdateSchema = videoCreateSchema.partial();

// Course Management
export async function createCourse(req, res, next) {
  try {
    const courseData = courseCreateSchema.parse(req.body);
    
    const course = await Course.create(courseData);
    
    const populatedCourse = await Course.findById(course._id)
      .populate("category", "name icon")
      .populate("instructorId", "firstName lastName")
      .lean();
    
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: populatedCourse,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllCourses(req, res, next) {
  try {
    const { page = 1, limit = 10, status, category, search, sortBy = "createdAt", sortOrder = "desc" } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
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
    
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCourse(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = courseUpdateSchema.parse(req.body);
    
    const course = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("category", "name icon")
      .populate("instructorId", "firstName lastName");
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    
    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCourse(req, res, next) {
  try {
    const { id } = req.params;
    
    const course = await Course.findByIdAndDelete(id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    
    // Delete related modules and videos
    await CourseModule.deleteMany({ course: id });
    await Video.deleteMany({ course: id });
    await CourseProgress.deleteMany({ course: id });
    await ModuleProgress.deleteMany({ course: id });
    await CourseEnrollment.deleteMany({ course: id });
    await ModuleEnrollment.deleteMany({ course: id });
    
    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

// Category Management
export async function createCategory(req, res, next) {
  try {
    const categoryData = categoryCreateSchema.parse(req.body);
    
    const category = await CourseCategory.create(categoryData);
    
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllCategories(req, res, next) {
  try {
    const { page = 1, limit = 10, isActive, sortBy = "sortOrder", sortOrder = "asc" } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === "true";
    
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    
    const categories = await CourseCategory.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    const total = await CourseCategory.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        categories,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalCategories: total,
          hasNext: pageNum < Math.ceil(total / limitNum),
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = categoryUpdateSchema.parse(req.body);
    
    const category = await CourseCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    
    res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    
    // Check if category has courses
    const courseCount = await Course.countDocuments({ category: id });
    if (courseCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category with existing courses",
      });
    }
    
    const category = await CourseCategory.findByIdAndDelete(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    
    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

// Module Management
export async function createModule(req, res, next) {
  try {
    const moduleData = moduleCreateSchema.parse(req.body);
    
    const module = await CourseModule.create(moduleData);
    
    const populatedModule = await CourseModule.findById(module._id)
      .populate("course", "title thumbnail")
      .populate("previewVideo", "title duration thumbnail")
      .lean();
    
    res.status(201).json({
      success: true,
      message: "Module created successfully",
      data: populatedModule,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllModules(req, res, next) {
  try {
    const { page = 1, limit = 10, course, status, sortBy = "order", sortOrder = "asc" } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const filter = {};
    if (course) filter.course = course;
    if (status) filter.status = status;
    
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
    
    res.json({
      success: true,
      data: {
        modules,
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

export async function updateModule(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = moduleUpdateSchema.parse(req.body);
    
    const module = await CourseModule.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("course", "title thumbnail")
      .populate("previewVideo", "title duration thumbnail");
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }
    
    res.json({
      success: true,
      message: "Module updated successfully",
      data: module,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteModule(req, res, next) {
  try {
    const { id } = req.params;
    
    const module = await CourseModule.findByIdAndDelete(id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }
    
    // Delete related videos and progress
    await Video.deleteMany({ module: id });
    await ModuleProgress.deleteMany({ module: id });
    await ModuleEnrollment.deleteMany({ module: id });
    
    res.json({
      success: true,
      message: "Module deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

// Video Management
export async function createVideo(req, res, next) {
  try {
    const videoData = videoCreateSchema.parse(req.body);
    
    const video = await Video.create(videoData);
    
    const populatedVideo = await Video.findById(video._id)
      .populate("course", "title thumbnail")
      .populate("module", "title thumbnail")
      .lean();
    
    res.status(201).json({
      success: true,
      message: "Video created successfully",
      data: populatedVideo,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllVideos(req, res, next) {
  try {
    const { page = 1, limit = 10, course, module, status, sortBy = "order", sortOrder = "asc" } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const filter = {};
    if (course) filter.course = course;
    if (module) filter.module = module;
    if (status) filter.isActive = status === "active";
    
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    
    const videos = await Video.find(filter)
      .populate("course", "title thumbnail")
      .populate("module", "title thumbnail")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    const total = await Video.countDocuments(filter);
    
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

export async function updateVideo(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = videoUpdateSchema.parse(req.body);
    
    const video = await Video.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("course", "title thumbnail")
      .populate("module", "title thumbnail");
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    
    res.json({
      success: true,
      message: "Video updated successfully",
      data: video,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteVideo(req, res, next) {
  try {
    const { id } = req.params;
    
    const video = await Video.findByIdAndDelete(id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    
    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

// Analytics and Reports
export async function getCourseAnalytics(req, res, next) {
  try {
    const { courseId } = req.params;
    const { period = "30d" } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (period) {
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    
    const [
      totalEnrollments,
      completedEnrollments,
      averageProgress,
      recentEnrollments,
      moduleStats,
    ] = await Promise.all([
      CourseEnrollment.countDocuments({ course: courseId }),
      CourseProgress.countDocuments({ course: courseId, progress: 100 }),
      CourseProgress.aggregate([
        { $match: { course: courseId } },
        { $group: { _id: null, avgProgress: { $avg: "$progress" } } },
      ]),
      CourseEnrollment.find({ course: courseId, enrolledAt: { $gte: startDate } })
        .populate("student", "firstName lastName email")
        .sort({ enrolledAt: -1 })
        .limit(10)
        .lean(),
      ModuleProgress.aggregate([
        { $match: { course: courseId } },
        { $group: { _id: "$module", avgProgress: { $avg: "$progress" } } },
        { $lookup: { from: "coursemodules", localField: "_id", foreignField: "_id", as: "module" } },
        { $unwind: "$module" },
        { $project: { moduleTitle: "$module.title", avgProgress: 1 } },
      ]),
    ]);
    
    res.json({
      success: true,
      data: {
        totalEnrollments,
        completedEnrollments,
        averageProgress: averageProgress[0]?.avgProgress || 0,
        completionRate: totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0,
        recentEnrollments,
        moduleStats,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getOverallAnalytics(req, res, next) {
  try {
    const [
      totalCourses,
      totalModules,
      totalVideos,
      totalEnrollments,
      totalRevenue,
      topCourses,
      recentActivity,
    ] = await Promise.all([
      Course.countDocuments({ status: "Active" }),
      CourseModule.countDocuments({ status: "Active" }),
      Video.countDocuments({ isActive: true }),
      CourseEnrollment.countDocuments({ paymentStatus: "completed" }),
      CourseEnrollment.aggregate([
        { $match: { paymentStatus: "completed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Course.aggregate([
        { $match: { status: "Active" } },
        { $lookup: { from: "courseenrollments", localField: "_id", foreignField: "course", as: "enrollments" } },
        { $addFields: { enrollmentCount: { $size: "$enrollments" } } },
        { $sort: { enrollmentCount: -1 } },
        { $limit: 5 },
        { $project: { title: 1, enrollmentCount: 1, enrolled: 1 } },
      ]),
      CourseEnrollment.find({ paymentStatus: "completed" })
        .populate("course", "title thumbnail")
        .populate("student", "firstName lastName")
        .sort({ enrolledAt: -1 })
        .limit(10)
        .lean(),
    ]);
    
    res.json({
      success: true,
      data: {
        totalCourses,
        totalModules,
        totalVideos,
        totalEnrollments,
        totalRevenue: totalRevenue[0]?.total || 0,
        topCourses,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
}