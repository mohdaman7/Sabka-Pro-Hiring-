// Course Model - Represents training course data structure
export class CourseModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.title = data.title || ""
    this.description = data.description || ""
    this.categoryId = data.categoryId || null
    this.categoryName = data.categoryName || ""
    this.thumbnail = data.thumbnail || ""
    this.duration = data.duration || ""
    this.totalVideos = data.totalVideos || 0
    this.instructor = data.instructor || ""
    this.access = data.access || "Free" // 'Free' or 'Pro'
    this.status = data.status || "Draft" // 'Draft' or 'Active'
    this.enrolled = data.enrolled || 0
    this.avgCompletion = data.avgCompletion || 0
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  // Validation
  validate() {
    const errors = []

    if (!this.title || this.title.trim().length === 0) {
      errors.push("Course title is required")
    }

    if (!this.categoryId) {
      errors.push("Category is required")
    }

    if (!this.duration || this.duration.trim().length === 0) {
      errors.push("Duration is required")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Convert to API format
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category_id: this.categoryId,
      thumbnail: this.thumbnail,
      duration: this.duration,
      total_videos: this.totalVideos,
      instructor: this.instructor,
      access: this.access,
      status: this.status,
      enrolled: this.enrolled,
      avg_completion: this.avgCompletion,
    }
  }

  // Create from API response
  static fromJSON(json) {
    return new CourseModel({
      id: json.id,
      title: json.title,
      description: json.description,
      categoryId: json.category_id,
      categoryName: json.category_name,
      thumbnail: json.thumbnail,
      duration: json.duration,
      totalVideos: json.total_videos,
      instructor: json.instructor,
      access: json.access,
      status: json.status,
      enrolled: json.enrolled,
      avgCompletion: json.avg_completion,
      createdAt: json.created_at ? new Date(json.created_at) : new Date(),
      updatedAt: json.updated_at ? new Date(json.updated_at) : new Date(),
    })
  }
}

// Course Category Model
export class CourseCategoryModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.name = data.name || ""
    this.icon = data.icon || "📚"
    this.description = data.description || ""
    this.courseCount = data.courseCount || 0
    this.createdAt = data.createdAt || new Date()
  }

  validate() {
    const errors = []

    if (!this.name || this.name.trim().length === 0) {
      errors.push("Category name is required")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      description: this.description,
    }
  }

  static fromJSON(json) {
    return new CourseCategoryModel({
      id: json.id,
      name: json.name,
      icon: json.icon,
      description: json.description,
      courseCount: json.course_count || 0,
      createdAt: json.created_at ? new Date(json.created_at) : new Date(),
    })
  }
}

// Video Model
export class VideoModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.courseId = data.courseId || null
    this.title = data.title || ""
    this.description = data.description || ""
    this.vimeoId = data.vimeoId || "" // Vimeo video ID
    this.duration = data.duration || ""
    this.order = data.order || 0
    this.views = data.views || 0
    this.access = data.access || "Pro" // 'Free' or 'Pro'
    this.drmProtected = data.drmProtected || true
    this.createdAt = data.createdAt || new Date()
  }

  validate() {
    const errors = []

    if (!this.title || this.title.trim().length === 0) {
      errors.push("Video title is required")
    }

    if (!this.courseId) {
      errors.push("Course is required")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  toJSON() {
    return {
      id: this.id,
      course_id: this.courseId,
      title: this.title,
      description: this.description,
      vimeo_id: this.vimeoId,
      duration: this.duration,
      order: this.order,
      views: this.views,
      access: this.access,
      drm_protected: this.drmProtected,
    }
  }

  static fromJSON(json) {
    return new VideoModel({
      id: json.id,
      courseId: json.course_id,
      title: json.title,
      description: json.description,
      vimeoId: json.vimeo_id,
      duration: json.duration,
      order: json.order,
      views: json.views,
      access: json.access,
      drmProtected: json.drm_protected,
      createdAt: json.created_at ? new Date(json.created_at) : new Date(),
    })
  }
}

// Course Progress Model
export class CourseProgressModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.candidateId = data.candidateId || null
    this.courseId = data.courseId || null
    this.completedVideos = data.completedVideos || []
    this.progress = data.progress || 0
    this.lastWatchedVideoId = data.lastWatchedVideoId || null
    this.startedAt = data.startedAt || new Date()
    this.lastAccessedAt = data.lastAccessedAt || new Date()
    this.completedAt = data.completedAt || null
  }

  toJSON() {
    return {
      id: this.id,
      candidate_id: this.candidateId,
      course_id: this.courseId,
      completed_videos: this.completedVideos,
      progress: this.progress,
      last_watched_video_id: this.lastWatchedVideoId,
      started_at: this.startedAt,
      last_accessed_at: this.lastAccessedAt,
      completed_at: this.completedAt,
    }
  }

  static fromJSON(json) {
    return new CourseProgressModel({
      id: json.id,
      candidateId: json.candidate_id,
      courseId: json.course_id,
      completedVideos: json.completed_videos || [],
      progress: json.progress || 0,
      lastWatchedVideoId: json.last_watched_video_id,
      startedAt: json.started_at ? new Date(json.started_at) : new Date(),
      lastAccessedAt: json.last_accessed_at ? new Date(json.last_accessed_at) : new Date(),
      completedAt: json.completed_at ? new Date(json.completed_at) : null,
    })
  }
}
