import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const enrollmentAPI = axios.create({
  baseURL: `${API_URL}/api/enrollments`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
enrollmentAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== STUDENT ENROLLMENT ====================

// Enroll in a course
export const enrollInCourse = async (courseId) => {
  try {
    const response = await enrollmentAPI.post("/enroll", { courseId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get my enrollments
export const getMyEnrollments = async (params = {}) => {
  try {
    const response = await enrollmentAPI.get("/my-enrollments", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Check enrollment status
export const checkEnrollmentStatus = async (courseId) => {
  try {
    const response = await enrollmentAPI.get(`/check/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get enrollment details
export const getEnrollmentDetails = async (enrollmentId) => {
  try {
    const response = await enrollmentAPI.get(`/${enrollmentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update enrollment progress
export const updateEnrollmentProgress = async (enrollmentId, data) => {
  try {
    const response = await enrollmentAPI.patch(`/${enrollmentId}/progress`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Drop/Unenroll from course
export const dropCourse = async (enrollmentId) => {
  try {
    const response = await enrollmentAPI.delete(`/${enrollmentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== CRM/ADMIN ENDPOINTS ====================

// Get all enrollments (CRM)
export const getAllEnrollments = async (params = {}) => {
  try {
    const response = await enrollmentAPI.get("/admin/all", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get enrollment stats for a course (CRM)
export const getCourseEnrollmentStats = async (courseId) => {
  try {
    const response = await enrollmentAPI.get(`/admin/course/${courseId}/stats`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get top enrolled courses (CRM)
export const getTopEnrolledCourses = async (params = {}) => {
  try {
    const response = await enrollmentAPI.get("/admin/top-courses", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  enrollInCourse,
  getMyEnrollments,
  checkEnrollmentStatus,
  getEnrollmentDetails,
  updateEnrollmentProgress,
  dropCourse,
  getAllEnrollments,
  getCourseEnrollmentStats,
  getTopEnrolledCourses,
};
