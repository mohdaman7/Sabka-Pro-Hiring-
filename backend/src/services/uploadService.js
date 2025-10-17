import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "..", "uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

// Image processing service
export class ImageService {
  // Resize and optimize image
  static async processImage(inputPath, options = {}) {
    const {
      width = 800,
      height = 600,
      quality = 80,
      format = "jpeg",
    } = options;

    try {
      const outputPath = inputPath.replace(path.extname(inputPath), `_processed.${format}`);
      
      await sharp(inputPath)
        .resize(width, height, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality })
        .toFile(outputPath);

      return {
        success: true,
        processedPath: outputPath,
        originalPath: inputPath,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Generate multiple image sizes
  static async generateImageSizes(inputPath) {
    const sizes = [
      { name: "thumbnail", width: 300, height: 200 },
      { name: "medium", width: 600, height: 400 },
      { name: "large", width: 1200, height: 800 },
    ];

    const results = {};

    for (const size of sizes) {
      try {
        const outputPath = inputPath.replace(
          path.extname(inputPath),
          `_${size.name}.jpeg`
        );

        await sharp(inputPath)
          .resize(size.width, size.height, {
            fit: "cover",
            position: "center",
          })
          .jpeg({ quality: 80 })
          .toFile(outputPath);

        results[size.name] = outputPath;
      } catch (error) {
        console.error(`Error generating ${size.name} size:`, error);
      }
    }

    return results;
  }
}

// Cloudinary upload service
export class CloudinaryService {
  // Upload image to Cloudinary
  static async uploadImage(filePath, options = {}) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "courses",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "fill" },
          { quality: "auto" },
        ],
        ...options,
      });

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        size: result.bytes,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Upload video to Cloudinary
  static async uploadVideo(filePath, options = {}) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "courses/videos",
        resource_type: "video",
        transformation: [
          { width: 1280, height: 720, crop: "scale" },
          { quality: "auto" },
        ],
        ...options,
      });

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        size: result.bytes,
        duration: result.duration,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Delete file from Cloudinary
  static async deleteFile(publicId, resourceType = "image") {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });

      return {
        success: result.result === "ok",
        result: result.result,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Generate responsive image URLs
  static generateResponsiveUrls(publicId, options = {}) {
    const {
      width = 800,
      height = 600,
      quality = "auto",
      format = "auto",
    } = options;

    const baseUrl = `https://res.cloudinary.com/${env.cloudinaryCloudName}/image/upload`;
    
    return {
      thumbnail: `${baseUrl}/w_300,h_200,c_fill,q_${quality},f_${format}/${publicId}`,
      medium: `${baseUrl}/w_600,h_400,c_fill,q_${quality},f_${format}/${publicId}`,
      large: `${baseUrl}/w_${width},h_${height},c_fill,q_${quality},f_${format}/${publicId}`,
      original: `${baseUrl}/q_${quality},f_${format}/${publicId}`,
    };
  }
}

// File validation service
export class FileValidationService {
  // Validate image file
  static validateImage(file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      return {
        valid: false,
        error: "Invalid image type. Only JPEG, PNG, WebP, and GIF are allowed.",
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: "Image size too large. Maximum size is 5MB.",
      };
    }

    return { valid: true };
  }

  // Validate video file
  static validateVideo(file) {
    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!allowedTypes.includes(file.mimetype)) {
      return {
        valid: false,
        error: "Invalid video type. Only MP4, WebM, MOV, and AVI are allowed.",
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: "Video size too large. Maximum size is 100MB.",
      };
    }

    return { valid: true };
  }

  // Get file info
  static getFileInfo(file) {
    return {
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      extension: path.extname(file.originalname).toLowerCase(),
    };
  }
}

// Course thumbnail upload middleware
export const uploadCourseThumbnail = upload.single("thumbnail");

// Course video upload middleware
export const uploadCourseVideo = upload.single("video");

// Multiple files upload middleware
export const uploadMultipleFiles = upload.array("files", 10);