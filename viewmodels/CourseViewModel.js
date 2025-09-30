import { CourseModel, CourseCategoryModel, VideoModel, CourseProgressModel } from "@/models/CourseModel"

// Course ViewModel - Handles business logic for course management
export class CourseViewModel {
  constructor() {
    this.courses = []
    this.categories = []
    this.videos = []
    this.loading = false
    this.error = null
  }

  // Fetch all courses
  async fetchCourses(filters = {}) {
    this.loading = true
    this.error = null

    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch("/api/courses?" + new URLSearchParams(filters))
      const data = await response.json()

      this.courses = data.courses.map((course) => CourseModel.fromJSON(course))
      return this.courses
    } catch (error) {
      this.error = error.message
      console.error("Error fetching courses:", error)
      return []
    } finally {
      this.loading = false
    }
  }

  // Fetch course categories
  async fetchCategories() {
    this.loading = true
    this.error = null

    try {
      const response = await fetch("/api/courses/categories")
      const data = await response.json()

      this.categories = data.categories.map((cat) => CourseCategoryModel.fromJSON(cat))
      return this.categories
    } catch (error) {
      this.error = error.message
      console.error("Error fetching categories:", error)
      return []
    } finally {
      this.loading = false
    }
  }

  // Create new course
  async createCourse(courseData) {
    const course = new CourseModel(courseData)
    const validation = course.validate()

    if (!validation.isValid) {
      this.error = validation.errors.join(", ")
      return { success: false, errors: validation.errors }
    }

    this.loading = true
    this.error = null

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course.toJSON()),
      })

      const data = await response.json()

      if (response.ok) {
        const newCourse = CourseModel.fromJSON(data.course)
        this.courses.push(newCourse)
        return { success: true, course: newCourse }
      } else {
        this.error = data.message
        return { success: false, errors: [data.message] }
      }
    } catch (error) {
      this.error = error.message
      console.error("Error creating course:", error)
      return { success: false, errors: [error.message] }
    } finally {
      this.loading = false
    }
  }

  // Update course
  async updateCourse(courseId, updates) {
    this.loading = true
    this.error = null

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (response.ok) {
        const updatedCourse = CourseModel.fromJSON(data.course)
        const index = this.courses.findIndex((c) => c.id === courseId)
        if (index !== -1) {
          this.courses[index] = updatedCourse
        }
        return { success: true, course: updatedCourse }
      } else {
        this.error = data.message
        return { success: false, errors: [data.message] }
      }
    } catch (error) {
      this.error = error.message
      console.error("Error updating course:", error)
      return { success: false, errors: [error.message] }
    } finally {
      this.loading = false
    }
  }

  // Delete course
  async deleteCourse(courseId) {
    this.loading = true
    this.error = null

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        this.courses = this.courses.filter((c) => c.id !== courseId)
        return { success: true }
      } else {
        const data = await response.json()
        this.error = data.message
        return { success: false, errors: [data.message] }
      }
    } catch (error) {
      this.error = error.message
      console.error("Error deleting course:", error)
      return { success: false, errors: [error.message] }
    } finally {
      this.loading = false
    }
  }

  // Fetch videos for a course
  async fetchCourseVideos(courseId) {
    this.loading = true
    this.error = null

    try {
      const response = await fetch(`/api/courses/${courseId}/videos`)
      const data = await response.json()

      this.videos = data.videos.map((video) => VideoModel.fromJSON(video))
      return this.videos
    } catch (error) {
      this.error = error.message
      console.error("Error fetching videos:", error)
      return []
    } finally {
      this.loading = false
    }
  }

  // Add video to course
  async addVideo(videoData) {
    const video = new VideoModel(videoData)
    const validation = video.validate()

    if (!validation.isValid) {
      this.error = validation.errors.join(", ")
      return { success: false, errors: validation.errors }
    }

    this.loading = true
    this.error = null

    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(video.toJSON()),
      })

      const data = await response.json()

      if (response.ok) {
        const newVideo = VideoModel.fromJSON(data.video)
        this.videos.push(newVideo)
        return { success: true, video: newVideo }
      } else {
        this.error = data.message
        return { success: false, errors: [data.message] }
      }
    } catch (error) {
      this.error = error.message
      console.error("Error adding video:", error)
      return { success: false, errors: [error.message] }
    } finally {
      this.loading = false
    }
  }

  // Track video progress
  async updateProgress(candidateId, courseId, videoId) {
    try {
      const response = await fetch("/api/courses/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidate_id: candidateId,
          course_id: courseId,
          video_id: videoId,
        }),
      })

      const data = await response.json()
      return { success: response.ok, progress: data.progress }
    } catch (error) {
      console.error("Error updating progress:", error)
      return { success: false }
    }
  }

  // Get candidate's course progress
  async getCandidateProgress(candidateId, courseId) {
    try {
      const response = await fetch(`/api/courses/progress?candidate_id=${candidateId}&course_id=${courseId}`)
      const data = await response.json()

      return CourseProgressModel.fromJSON(data.progress)
    } catch (error) {
      console.error("Error fetching progress:", error)
      return null
    }
  }

  // Filter courses by category
  filterByCategory(categoryId) {
    if (!categoryId || categoryId === "all") {
      return this.courses
    }
    return this.courses.filter((course) => course.categoryId === categoryId)
  }

  // Search courses
  searchCourses(query) {
    if (!query || query.trim().length === 0) {
      return this.courses
    }

    const searchTerm = query.toLowerCase()
    return this.courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.instructor.toLowerCase().includes(searchTerm),
    )
  }

  // Get course statistics
  getCourseStats() {
    return {
      totalCourses: this.courses.length,
      activeCourses: this.courses.filter((c) => c.status === "Active").length,
      totalEnrolled: this.courses.reduce((sum, c) => sum + c.enrolled, 0),
      avgCompletion:
        this.courses.length > 0
          ? Math.round(this.courses.reduce((sum, c) => sum + c.avgCompletion, 0) / this.courses.length)
          : 0,
    }
  }
}
