import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Create axios instance with default config
const analyticsAPI = axios.create({
  baseURL: `${API_URL}/api/analytics`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
analyticsAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== OVERVIEW DASHBOARD ====================
export const getOverviewStats = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/overview", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching overview stats:", error);
    throw error;
  }
};

// ==================== LEAD CONVERSION ANALYTICS ====================
export const getLeadConversionAnalytics = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/leads/conversion", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching lead conversion analytics:", error);
    throw error;
  }
};

// ==================== REVENUE & PAYMENT REPORTS ====================
export const getRevenueReports = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/revenue", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue reports:", error);
    throw error;
  }
};

// ==================== STUDENT PLACEMENT ANALYTICS ====================
export const getPlacementAnalytics = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/placements", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching placement analytics:", error);
    throw error;
  }
};

// ==================== EMPLOYER ENGAGEMENT ANALYTICS ====================
export const getEmployerEngagement = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/employers/engagement", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching employer engagement:", error);
    throw error;
  }
};

// ==================== TRAINING/COURSE ANALYTICS ====================
export const getCourseAnalytics = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/courses", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching course analytics:", error);
    throw error;
  }
};

// ==================== STAFF PERFORMANCE ====================
export const getStaffPerformance = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/staff/performance", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching staff performance:", error);
    throw error;
  }
};

// ==================== TOP EMPLOYERS BY JOB POSTS ====================
export const getTopEmployersByJobPosts = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/employers/top-by-jobs", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching top employers by job posts:", error);
    throw error;
  }
};

// ==================== TOP EMPLOYERS BY APPLICATIONS ====================
export const getTopEmployersByApplications = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/employers/top-by-applications", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching top employers by applications:", error);
    throw error;
  }
};

// ==================== TOP COURSES BY PERFORMANCE ====================
export const getTopCoursesByPerformance = async (params = {}) => {
  try {
    const response = await analyticsAPI.get("/courses/top-performance", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching top courses by performance:", error);
    throw error;
  }
};

// ==================== GET ALL COURSES (USING EXISTING ENDPOINT) ====================
export const getAllCourses = async (params = {}) => {
  try {
    // Use existing courses endpoint with pagination
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${API_URL}/api/courses?${new URLSearchParams(params)}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching all courses:", error);
    throw error;
  }
};

// ==================== GET ALL EMPLOYERS (USING EXISTING ENDPOINT) ====================
export const getAllEmployers = async (params = {}) => {
  try {
    // Use existing employer endpoint
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${API_URL}/api/employer/public?${new URLSearchParams(params)}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching all employers:", error);
    throw error;
  }
};

// ==================== EXPORT REPORTS ====================
export const exportReport = async (reportType, format = "json", params = {}) => {
  try {
    const response = await analyticsAPI.get("/export", {
      params: { reportType, format, ...params },
      responseType: format === "csv" ? "blob" : "json",
    });

    if (format === "csv") {
      // Create download link for CSV
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${reportType}-report.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { success: true, message: "Report downloaded successfully" };
    }

    return response.data;
  } catch (error) {
    console.error("Error exporting report:", error);
    throw error;
  }
};

// ==================== HELPER FUNCTIONS ====================

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

// Format percentage
export const formatPercentage = (value) => {
  return `${parseFloat(value || 0).toFixed(1)}%`;
};

// Format number with commas
export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-IN").format(num || 0);
};

// Get date range presets
export const getDateRangePresets = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const last7Days = new Date(today);
  last7Days.setDate(last7Days.getDate() - 7);

  const last30Days = new Date(today);
  last30Days.setDate(last30Days.getDate() - 30);

  const last90Days = new Date(today);
  last90Days.setDate(last90Days.getDate() - 90);

  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  const thisYearStart = new Date(today.getFullYear(), 0, 1);
  const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
  const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);

  return {
    today: { startDate: today, endDate: today, label: "Today" },
    yesterday: { startDate: yesterday, endDate: yesterday, label: "Yesterday" },
    last7Days: { startDate: last7Days, endDate: today, label: "Last 7 Days" },
    last30Days: { startDate: last30Days, endDate: today, label: "Last 30 Days" },
    last90Days: { startDate: last90Days, endDate: today, label: "Last 90 Days" },
    thisMonth: { startDate: thisMonthStart, endDate: today, label: "This Month" },
    lastMonth: { startDate: lastMonthStart, endDate: lastMonthEnd, label: "Last Month" },
    thisYear: { startDate: thisYearStart, endDate: today, label: "This Year" },
    lastYear: { startDate: lastYearStart, endDate: lastYearEnd, label: "Last Year" },
  };
};

// Format date for API
export const formatDateForAPI = (date) => {
  if (!date) return null;
  return date.toISOString().split("T")[0];
};

// Calculate growth percentage
export const calculateGrowth = (current, previous) => {
  if (!previous || previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

// Get trend direction
export const getTrendDirection = (growth) => {
  if (growth > 0) return "up";
  if (growth < 0) return "down";
  return "neutral";
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    // Lead statuses
    new: "blue",
    contacted: "purple",
    qualified: "indigo",
    converted: "green",
    lost: "red",

    // Application statuses
    pending: "yellow",
    reviewing: "blue",
    shortlisted: "purple",
    interview: "indigo",
    hired: "green",
    rejected: "red",

    // Payment statuses
    completed: "green",
    failed: "red",

    // Course statuses
    active: "green",
    inactive: "gray",
    in_progress: "blue",

    // Interview statuses
    scheduled: "blue",
    cancelled: "red",
    "no-show": "orange",
  };

  return colors[status] || "gray";
};

export default {
  getOverviewStats,
  getLeadConversionAnalytics,
  getRevenueReports,
  getPlacementAnalytics,
  getEmployerEngagement,
  getCourseAnalytics,
  getStaffPerformance,
  getTopEmployersByJobPosts,
  getTopEmployersByApplications,
  getTopCoursesByPerformance,
  getAllCourses,
  getAllEmployers,
  exportReport,
  formatCurrency,
  formatPercentage,
  formatNumber,
  getDateRangePresets,
  formatDateForAPI,
  calculateGrowth,
  getTrendDirection,
  getStatusColor,
};
