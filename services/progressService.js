// services/progressService.js
import api from "@/lib/axios";

export const progressService = {
  // Get progress for a specific course
  getCourseProgress: async (courseId) => {
    try {
      const response = await api.get(`/api/courses/me/progress/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course progress:", error);
      return { progress: 0, completedLessons: [] };
    }
  },

  // Get overall progress for all courses
  getOverallProgress: async () => {
    try {
      const response = await api.get("/api/courses/me/progress");
      return response.data;
    } catch (error) {
      console.error("Error fetching overall progress:", error);
      return [];
    }
  },

  // Mark a lesson as completed
  completeLesson: async (courseId, lessonId) => {
    try {
      const response = await api.post(
        `/api/courses/me/progress/${courseId}/lessons/${lessonId}/complete`
      );
      return response.data;
    } catch (error) {
      console.error("Error completing lesson:", error);
      throw error;
    }
  },

  // Update lesson progress (for video progress tracking)
  updateLessonProgress: async (courseId, lessonId, progressData) => {
    try {
      const response = await api.put(
        `/api/courses/me/progress/${courseId}/lessons/${lessonId}`,
        progressData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating lesson progress:", error);
      throw error;
    }
  },

  // Get course statistics
  getCourseStats: async () => {
    try {
      const response = await api.get("/api/courses/me/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching course stats:", error);
      return {
        totalEnrolled: 0,
        totalCompleted: 0,
        totalHours: 0,
        averageProgress: 0,
      };
    }
  },
};

export default progressService;