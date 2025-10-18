import { CourseModel, CourseCategoryModel, VideoModel, CourseProgressModel } from "@/models/CourseModel"
import api from "@/lib/axios"

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
      const response = await api.get("/api/courses?" + new URLSearchParams(filters))
      const data = response.data

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
      const response = await api.get("/api/courses/categories")
      const data = response.data

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
      const response = await api.post("/api/courses", course.toJSON())
      const data = response.data

      const newCourse = CourseModel.fromJSON(data.course)
      this.courses.push(newCourse)
      return { success: true, course: newCourse }
    } catch (error) {
      this.error = error.response?.data?.message || error.message
      console.error("Error creating course:", error)
      return { success: false, errors: [error.response?.data?.message || error.message] }
    } finally {
      this.loading = false
    }
  }

  // Update course
  async updateCourse(courseId, updates) {
    this.loading = true
    this.error = null

    try {
      const response = await api.put(`/api/courses/${courseId}`, updates)
      const data = response.data

      const updatedCourse = CourseModel.fromJSON(data.course)
      const index = this.courses.findIndex((c) => c.id === courseId)
      if (index !== -1) {
        this.courses[index] = updatedCourse
      }
      return { success: true, course: updatedCourse }
    } catch (error) {
      this.error = error.response?.data?.message || error.message
      console.error("Error updating course:", error)
      return { success: false, errors: [error.response?.data?.message || error.message] }
    } finally {
      this.loading = false
    }
  }

  // Delete course
  async deleteCourse(courseId) {
    this.loading = true
    this.error = null

    try {
      await api.delete(`/api/courses/${courseId}`)
      this.courses = this.courses.filter((c) => c.id !== courseId)
      return { success: true }
    } catch (error) {
      this.error = error.response?.data?.message || error.message
      console.error("Error deleting course:", error)
      return { success: false, errors: [error.response?.data?.message || error.message] }
    } finally {
      this.loading = false
    }
  }

  // Fetch videos for a course
  async fetchCourseVideos(courseId) {
    this.loading = true
    this.error = null

    try {
      const response = await api.get(`/api/courses/${courseId}/videos`)
      const data = response.data

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
      const response = await api.post("/api/videos", video.toJSON())
      const data = response.data

      const newVideo = VideoModel.fromJSON(data.video)
      this.videos.push(newVideo)
      return { success: true, video: newVideo }
    } catch (error) {
      this.error = error.response?.data?.message || error.message
      console.error("Error adding video:", error)
      return { success: false, errors: [error.response?.data?.message || error.message] }
    } finally {
      this.loading = false
    }
  }

  // Track video progress
  async updateProgress(candidateId, courseId, videoId) {
    try {
      const response = await api.post("/api/courses/progress", {
        candidate_id: candidateId,
        course_id: courseId,
        video_id: videoId,
      })

      const data = response.data
      return { success: true, progress: data.progress }
    } catch (error) {
      console.error("Error updating progress:", error)
      return { success: false }
    }
  }

  // Get candidate's course progress
  async getCandidateProgress(candidateId, courseId) {
    try {
      const response = await api.get(`/api/courses/progress?candidate_id=${candidateId}&course_id=${courseId}`)
      const data = response.data

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
