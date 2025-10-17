# Course Module - Complete Backend Implementation

This document provides a comprehensive overview of the course module implementation for the student portal and CRM system.

## 🎯 Features Implemented

### Core Features
- ✅ **Course Management**: Full CRUD operations for courses
- ✅ **Module Management**: Module-wise course organization and purchases
- ✅ **Video Management**: Vimeo API integration with DRM protection
- ✅ **Progress Tracking**: Student progress tracking for courses and modules
- ✅ **Category Management**: Course categorization system
- ✅ **File Upload**: Thumbnail and video upload with Cloudinary integration
- ✅ **Analytics**: Course and video analytics
- ✅ **Access Control**: Free/Pro access levels with enrollment tracking

### Advanced Features
- ✅ **DRM Protection**: Video protection with no download/screenshot
- ✅ **Module-wise Purchases**: Students can purchase individual modules
- ✅ **Progress Tracking**: Detailed progress tracking per video and module
- ✅ **Responsive Images**: Multiple image sizes for thumbnails
- ✅ **Video Analytics**: Vimeo analytics integration
- ✅ **Bulk Upload**: Bulk video upload functionality
- ✅ **Search & Filtering**: Advanced search and filtering options

## 📁 File Structure

```
backend/src/
├── models/
│   ├── Course.js                 # Course model
│   ├── CourseCategory.js         # Category model
│   ├── CourseModule.js           # Module model
│   ├── Video.js                  # Video model
│   ├── CourseProgress.js         # Progress tracking
│   └── CourseEnrollment.js       # Enrollment management
├── controllers/
│   ├── courseController.js       # Student course operations
│   ├── moduleController.js       # Module operations
│   ├── adminCourseController.js  # Admin course management
│   └── courseUploadController.js # File upload operations
├── routes/
│   ├── courses.js                # Student course routes
│   └── adminCourses.js           # Admin course routes
├── services/
│   ├── vimeoService.js           # Vimeo API integration
│   └── uploadService.js          # File upload services
└── config/
    └── env.js                    # Environment configuration
```

## 🚀 API Endpoints

### Public Routes (No Authentication)
```
GET    /api/courses                    # Get all courses with filters
GET    /api/courses/featured           # Get featured courses
GET    /api/courses/categories         # Get course categories
GET    /api/courses/:id                # Get course by ID
GET    /api/courses/:id/modules        # Get course modules
GET    /api/courses/:id/modules/:moduleId/videos  # Get module videos
```

### Student Routes (Authentication Required)
```
# Course Management
GET    /api/student/courses/my/enrolled     # Get enrolled courses
GET    /api/student/courses/my/stats        # Get course statistics
GET    /api/student/courses/:id/progress    # Get course progress
POST   /api/student/courses/:id/progress    # Update video progress

# Module Management
GET    /api/student/modules                 # Get all modules
GET    /api/student/modules/free            # Get free modules
GET    /api/student/modules/:id             # Get module by ID
GET    /api/student/modules/:id/videos      # Get module videos
GET    /api/student/modules/:id/progress    # Get module progress
POST   /api/student/modules/:id/purchase    # Purchase module
POST   /api/student/modules/:id/progress    # Update module progress
GET    /api/student/my/modules              # Get enrolled modules
GET    /api/student/my/modules/stats        # Get module statistics

# Video Management
GET    /api/courses/videos/:videoId/embed   # Get video embed code
GET    /api/courses/videos/:videoId/analytics # Get video analytics
PUT    /api/courses/videos/:videoId/settings # Update video settings
DELETE /api/courses/videos/:videoId         # Delete video
```

### Admin Routes (Admin Authentication Required)
```
# Course Management
POST   /api/admin/courses                   # Create course
GET    /api/admin/courses                   # Get all courses
GET    /api/admin/courses/:id               # Get course by ID
PUT    /api/admin/courses/:id               # Update course
DELETE /api/admin/courses/:id               # Delete course
GET    /api/admin/courses/:id/analytics     # Get course analytics

# Category Management
POST   /api/admin/categories                # Create category
GET    /api/admin/categories                # Get all categories
PUT    /api/admin/categories/:id            # Update category
DELETE /api/admin/categories/:id            # Delete category

# Module Management
POST   /api/admin/modules                   # Create module
GET    /api/admin/modules                   # Get all modules
PUT    /api/admin/modules/:id               # Update module
DELETE /api/admin/modules/:id               # Delete module

# Video Management
POST   /api/admin/videos                    # Create video
GET    /api/admin/videos                    # Get all videos
PUT    /api/admin/videos/:id                # Update video
DELETE /api/admin/videos/:id                # Delete video

# File Upload
POST   /api/courses/upload/thumbnail        # Upload thumbnail
POST   /api/courses/upload/video            # Upload video
POST   /api/courses/upload/videos/bulk      # Bulk upload videos

# Analytics
GET    /api/admin/analytics                 # Get overall analytics
```

## 🔧 Environment Variables

Add these environment variables to your `.env` file:

```env
# Vimeo API Configuration
VIMEO_CLIENT_ID=your_vimeo_client_id
VIMEO_CLIENT_SECRET=your_vimeo_client_secret
VIMEO_ACCESS_TOKEN=your_vimeo_access_token

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 📊 Database Models

### Course Model
```javascript
{
  title: String,
  description: String,
  category: ObjectId,
  thumbnail: String,
  duration: String,
  instructor: String,
  instructorId: ObjectId,
  access: "Free" | "Pro",
  status: "Draft" | "Active" | "Archived",
  enrolled: Number,
  avgCompletion: Number,
  totalVideos: Number,
  totalModules: Number,
  price: Number,
  isFree: Boolean,
  tags: [String],
  requirements: [String],
  learningOutcomes: [String],
  isFeatured: Boolean,
  difficulty: "Beginner" | "Intermediate" | "Advanced",
  language: String,
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert",
  rating: {
    average: Number,
    count: Number
  },
  reviews: [Object],
  certificate: Object,
  seo: Object
}
```

### CourseModule Model
```javascript
{
  course: ObjectId,
  title: String,
  description: String,
  order: Number,
  duration: String,
  price: Number,
  isFree: Boolean,
  access: "Free" | "Pro",
  status: "Draft" | "Active" | "Archived",
  thumbnail: String,
  learningOutcomes: [String],
  requirements: [String],
  totalVideos: Number,
  totalLessons: Number,
  difficulty: "Beginner" | "Intermediate" | "Advanced",
  isPreview: Boolean,
  previewVideo: ObjectId
}
```

### Video Model
```javascript
{
  course: ObjectId,
  module: ObjectId,
  title: String,
  description: String,
  vimeoId: String,
  vimeoUrl: String,
  duration: String,
  order: Number,
  views: Number,
  access: "Free" | "Pro",
  drmProtected: Boolean,
  isPreview: Boolean,
  thumbnail: String,
  fileSize: Number,
  resolution: String,
  quality: "SD" | "HD" | "FHD" | "4K",
  subtitles: [Object],
  chapters: [Object],
  notes: [Object],
  isActive: Boolean,
  downloadAllowed: Boolean,
  screenshotAllowed: Boolean
}
```

## 🎥 Vimeo Integration

### Features
- **Video Upload**: Automatic upload to Vimeo
- **DRM Protection**: Disabled downloads and screenshots
- **Privacy Settings**: Private embedding and viewing
- **Analytics**: Video performance tracking
- **Thumbnails**: Automatic thumbnail generation

### Usage Example
```javascript
// Upload video
const result = await vimeoService.uploadVideo(filePath, {
  name: "Course Video",
  description: "Video description"
});

// Get embed code
const embedCode = vimeoService.getEmbedCode(videoId, {
  width: 640,
  height: 360,
  autoplay: false
});
```

## 📁 File Upload

### Supported Formats
- **Images**: JPEG, PNG, WebP, GIF (max 5MB)
- **Videos**: MP4, WebM, MOV, AVI (max 100MB)

### Upload Process
1. File validation
2. Local processing (resize, optimize)
3. Cloudinary upload
4. Database record creation
5. Cleanup of local files

### Usage Example
```javascript
// Upload thumbnail
const result = await CloudinaryService.uploadImage(filePath, {
  folder: "courses/thumbnails",
  transformation: [
    { width: 800, height: 600, crop: "fill" },
    { quality: "auto" }
  ]
});
```

## 📈 Progress Tracking

### Course Progress
- Tracks completion percentage
- Records time spent
- Tracks last watched video
- Manages completion status

### Module Progress
- Individual module tracking
- Purchase status
- Completion tracking
- Time spent per module

### Usage Example
```javascript
// Update video progress
await progress.updateVideoProgress(videoId, timeSpent, watchPercentage);

// Get progress statistics
const stats = await getMyCourseStats(req, res, next);
```

## 🔐 Access Control

### Access Levels
- **Free**: Accessible to all users
- **Pro**: Requires enrollment or Pro subscription

### Enrollment Types
- **Course Enrollment**: Full course access
- **Module Enrollment**: Individual module access

### Permission Checks
```javascript
// Check course access
const hasAccess = await course.canAccess(studentId, isProUser);

// Check module access
const enrollment = await ModuleEnrollment.findOne({
  student: studentId,
  module: moduleId,
  paymentStatus: "completed"
});
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install vimeo sharp cloudinary
   ```

2. **Set Environment Variables**
   ```bash
   # Add Vimeo and Cloudinary credentials to .env
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```

4. **Test Endpoints**
   ```bash
   # Test course endpoints
   curl http://localhost:4000/api/courses
   
   # Test admin endpoints (with auth)
   curl -H "Authorization: Bearer <token>" http://localhost:4000/api/admin/courses
   ```

## 📝 API Usage Examples

### Create a Course
```javascript
POST /api/admin/courses
{
  "title": "JavaScript Fundamentals",
  "description": "Learn JavaScript from scratch",
  "category": "64a1b2c3d4e5f6789abcdef0",
  "instructor": "John Doe",
  "duration": "10 hours",
  "price": 99.99,
  "access": "Pro",
  "difficulty": "Beginner",
  "tags": ["javascript", "programming", "web"],
  "learningOutcomes": [
    "Understand JavaScript basics",
    "Write clean code",
    "Build projects"
  ]
}
```

### Purchase a Module
```javascript
POST /api/student/modules/64a1b2c3d4e5f6789abcdef0/purchase
{
  "paymentMethod": "card",
  "paymentId": "pay_1234567890",
  "metadata": {
    "transactionId": "txn_1234567890"
  }
}
```

### Update Video Progress
```javascript
POST /api/student/courses/64a1b2c3d4e5f6789abcdef0/progress
{
  "videoId": "64a1b2c3d4e5f6789abcdef1",
  "timeSpent": 300,
  "watchPercentage": 100
}
```

## 🛠️ Customization

### Adding New Video Providers
1. Create a new service in `services/`
2. Implement required methods
3. Update video upload controller
4. Add provider-specific configurations

### Custom Progress Tracking
1. Extend progress models
2. Add custom tracking methods
3. Update progress controllers
4. Add analytics endpoints

### Custom Access Control
1. Modify access check methods
2. Add new enrollment types
3. Update permission middleware
4. Add custom validation rules

## 🔍 Troubleshooting

### Common Issues

1. **Vimeo Upload Fails**
   - Check API credentials
   - Verify file format
   - Check file size limits

2. **Cloudinary Upload Fails**
   - Verify API credentials
   - Check file permissions
   - Verify file format

3. **Progress Not Updating**
   - Check enrollment status
   - Verify video access
   - Check progress model

4. **Access Denied**
   - Verify authentication
   - Check enrollment status
   - Verify access levels

### Debug Mode
```javascript
// Enable debug logging
process.env.DEBUG = "course:*";
```

## 📚 Additional Resources

- [Vimeo API Documentation](https://developer.vimeo.com/api)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [MongoDB Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Documentation](https://expressjs.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.