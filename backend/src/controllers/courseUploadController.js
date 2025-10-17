import { z } from "zod";
import { Course } from "../models/Course.js";
import { CourseModule } from "../models/CourseModule.js";
import { Video } from "../models/Video.js";
import { CourseCategory } from "../models/CourseCategory.js";
import { CloudinaryService, FileValidationService } from "../services/uploadService.js";
import vimeoService from "../services/vimeoService.js";
import fs from "fs";
import path from "path";

// Validation schemas
const thumbnailUploadSchema = z.object({
  type: z.enum(["course", "module", "category"]).required(),
  id: z.string().required(),
});

const videoUploadSchema = z.object({
  courseId: z.string().required(),
  moduleId: z.string().optional(),
  title: z.string().min(1, "Video title is required"),
  description: z.string().optional(),
  access: z.enum(["Free", "Pro"]).default("Pro"),
  order: z.number().min(0).default(0),
  isPreview: z.boolean().default(false),
});

// Upload course thumbnail
export async function uploadCourseThumbnail(req, res, next) {
  try {
    const { type, id } = thumbnailUploadSchema.parse(req.body);
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Validate image file
    const validation = FileValidationService.validateImage(req.file);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    // Process and upload image
    const uploadResult = await CloudinaryService.uploadImage(req.file.path, {
      folder: `courses/${type}s`,
      public_id: `${type}_${id}_${Date.now()}`,
    });

    if (!uploadResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
        error: uploadResult.error,
      });
    }

    // Update the respective model with thumbnail URL
    let updateResult;
    switch (type) {
      case "course":
        updateResult = await Course.findByIdAndUpdate(
          id,
          { thumbnail: uploadResult.url },
          { new: true }
        );
        break;
      case "module":
        updateResult = await CourseModule.findByIdAndUpdate(
          id,
          { thumbnail: uploadResult.url },
          { new: true }
        );
        break;
      case "category":
        updateResult = await CourseCategory.findByIdAndUpdate(
          id,
          { icon: uploadResult.url },
          { new: true }
        );
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid type specified",
        });
    }

    if (!updateResult) {
      return res.status(404).json({
        success: false,
        message: `${type} not found`,
      });
    }

    // Clean up local file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: "Thumbnail uploaded successfully",
      data: {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        responsiveUrls: CloudinaryService.generateResponsiveUrls(uploadResult.publicId),
        [type]: updateResult,
      },
    });
  } catch (error) {
    // Clean up local file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
}

// Upload course video
export async function uploadCourseVideo(req, res, next) {
  try {
    const videoData = videoUploadSchema.parse(req.body);
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No video file uploaded",
      });
    }

    // Validate video file
    const validation = FileValidationService.validateVideo(req.file);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    // Check if course exists
    const course = await Course.findById(videoData.courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if module exists (if provided)
    if (videoData.moduleId) {
      const module = await CourseModule.findById(videoData.moduleId);
      if (!module) {
        return res.status(404).json({
          success: false,
          message: "Module not found",
        });
      }
    }

    // Upload video to Vimeo
    const vimeoResult = await vimeoService.uploadVideo(req.file.path, {
      name: videoData.title,
      description: videoData.description || "",
    });

    if (!vimeoResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload video to Vimeo",
        error: vimeoResult.error,
      });
    }

    // Set video privacy for DRM protection
    await vimeoService.setVideoPrivacy(vimeoResult.videoId, {
      view: "disable",
      embed: "private",
      download: false,
    });

    // Get video thumbnail from Vimeo
    const thumbnailResult = await vimeoService.getVideoThumbnail(vimeoResult.videoId);

    // Create video record in database
    const video = await Video.create({
      course: videoData.courseId,
      module: videoData.moduleId,
      title: videoData.title,
      description: videoData.description,
      vimeoId: vimeoResult.videoId,
      vimeoUrl: vimeoResult.link,
      duration: vimeoResult.duration,
      order: videoData.order,
      access: videoData.access,
      isPreview: videoData.isPreview,
      thumbnail: thumbnailResult.thumbnail,
      width: vimeoResult.width,
      height: vimeoResult.height,
      fileSize: vimeoResult.size,
      drmProtected: true,
      downloadAllowed: false,
      screenshotAllowed: false,
    });

    // Clean up local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      data: {
        video,
        vimeo: {
          videoId: vimeoResult.videoId,
          url: vimeoResult.link,
          embedUrl: vimeoResult.player_embed_url,
          duration: vimeoResult.duration,
          thumbnail: thumbnailResult.thumbnail,
        },
      },
    });
  } catch (error) {
    // Clean up local file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
}

// Get video embed code
export async function getVideoEmbedCode(req, res, next) {
  try {
    const { videoId } = req.params;
    const { width = 640, height = 360, autoplay = false } = req.query;

    // Check if video exists and user has access
    const video = await Video.findById(videoId)
      .populate("course", "title access")
      .populate("module", "title access");

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Check access permissions
    const studentId = req.user?.id;
    let hasAccess = false;

    if (video.access === "Free") {
      hasAccess = true;
    } else if (studentId) {
      // Check if student has enrolled in the course or module
      if (video.course) {
        const enrollment = await CourseEnrollment.findOne({
          student: studentId,
          course: video.course._id,
          paymentStatus: "completed",
          isActive: true,
        });
        hasAccess = !!enrollment;
      }
      
      if (video.module && !hasAccess) {
        const moduleEnrollment = await ModuleEnrollment.findOne({
          student: studentId,
          module: video.module._id,
          paymentStatus: "completed",
          isActive: true,
        });
        hasAccess = !!moduleEnrollment;
      }
    }

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to this video",
      });
    }

    // Generate embed code
    const embedCode = vimeoService.getEmbedCode(video.vimeoId, {
      width: parseInt(width),
      height: parseInt(height),
      autoplay: autoplay === "true",
    });

    res.json({
      success: true,
      data: {
        embedCode,
        video: {
          id: video._id,
          title: video.title,
          duration: video.duration,
          thumbnail: video.thumbnail,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

// Delete video
export async function deleteVideo(req, res, next) {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Delete from Vimeo
    const vimeoResult = await vimeoService.deleteVideo(video.vimeoId);
    if (!vimeoResult.success) {
      console.error("Failed to delete video from Vimeo:", vimeoResult.error);
    }

    // Delete from database
    await Video.findByIdAndDelete(videoId);

    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

// Update video settings
export async function updateVideoSettings(req, res, next) {
  try {
    const { videoId } = req.params;
    const { title, description, access, order, isPreview } = req.body;

    const video = await Video.findByIdAndUpdate(
      videoId,
      {
        title,
        description,
        access,
        order,
        isPreview,
      },
      { new: true, runValidators: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Update Vimeo video settings
    const vimeoResult = await vimeoService.updateVideo(video.vimeoId, {
      name: title,
      description: description || "",
    });

    if (!vimeoResult.success) {
      console.error("Failed to update video on Vimeo:", vimeoResult.error);
    }

    res.json({
      success: true,
      message: "Video settings updated successfully",
      data: video,
    });
  } catch (error) {
    next(error);
  }
}

// Get video analytics
export async function getVideoAnalytics(req, res, next) {
  try {
    const { videoId } = req.params;
    const { period = "30d" } = req.query;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Get analytics from Vimeo
    const analytics = await vimeoService.getVideoAnalytics(video.vimeoId, period);

    if (!analytics.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch video analytics",
        error: analytics.error,
      });
    }

    res.json({
      success: true,
      data: {
        video: {
          id: video._id,
          title: video.title,
          vimeoId: video.vimeoId,
          views: video.views,
        },
        analytics: analytics.analytics,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Bulk upload videos
export async function bulkUploadVideos(req, res, next) {
  try {
    const { courseId, moduleId } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No video files uploaded",
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const results = [];
    const errors = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      
      try {
        // Validate video file
        const validation = FileValidationService.validateVideo(file);
        if (!validation.valid) {
          errors.push({
            file: file.originalname,
            error: validation.error,
          });
          continue;
        }

        // Upload to Vimeo
        const vimeoResult = await vimeoService.uploadVideo(file.path, {
          name: file.originalname.replace(/\.[^/.]+$/, ""), // Remove extension
        });

        if (!vimeoResult.success) {
          errors.push({
            file: file.originalname,
            error: vimeoResult.error,
          });
          continue;
        }

        // Set privacy settings
        await vimeoService.setVideoPrivacy(vimeoResult.videoId);

        // Get thumbnail
        const thumbnailResult = await vimeoService.getVideoThumbnail(vimeoResult.videoId);

        // Create video record
        const video = await Video.create({
          course: courseId,
          module: moduleId,
          title: file.originalname.replace(/\.[^/.]+$/, ""),
          vimeoId: vimeoResult.videoId,
          vimeoUrl: vimeoResult.link,
          duration: vimeoResult.duration,
          order: i,
          access: "Pro",
          thumbnail: thumbnailResult.thumbnail,
          width: vimeoResult.width,
          height: vimeoResult.height,
          fileSize: vimeoResult.size,
        });

        results.push({
          file: file.originalname,
          video: video,
          success: true,
        });

        // Clean up local file
        fs.unlinkSync(file.path);
      } catch (error) {
        errors.push({
          file: file.originalname,
          error: error.message,
        });
        
        // Clean up local file on error
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    res.json({
      success: true,
      message: `Processed ${req.files.length} files`,
      data: {
        successful: results,
        errors: errors,
        summary: {
          total: req.files.length,
          successful: results.length,
          failed: errors.length,
        },
      },
    });
  } catch (error) {
    // Clean up all files on error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    next(error);
  }
}