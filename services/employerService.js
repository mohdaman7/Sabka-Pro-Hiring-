// In employerService.js
import api from "@/lib/axios";

export const employerService = {
  getProfile: async () => {
    try {
      const response = await api.get("/api/employer/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  getDashboard: async () => {
    try {
      const response = await api.get("/api/employer/dashboard");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      throw error;
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await api.put("/api/employer/profile", data);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  updateHiringPreferences: async (data) => {
    try {
      const response = await api.put("/api/employer/hiring-preferences", data);
      return response.data;
    } catch (error) {
      console.error("Error updating hiring preferences:", error);
      throw error;
    }
  },

  updatePlan: async (plan) => {
    try {
      const response = await api.put("/api/employer/plan", { plan });
      return response.data;
    } catch (error) {
      console.error("Error updating plan:", error);
      throw error;
    }
  },

  getAnalytics: async (params = {}) => {
    try {
      const response = await api.get("/api/employer/analytics", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      // Return mock data if API fails
      return {
        success: true,
        data: {
          overview: {
            totalApplications: 0,
            conversionRate: 0,
            averageTimeToHireDays: 0,
          },
          monthlyStats: [],
          jobPerformance: [],
          topLocations: [],
          candidateSources: [
            { source: "LinkedIn", percentage: 35, count: 0 },
            { source: "Indeed", percentage: 25, count: 0 },
            { source: "Company Website", percentage: 20, count: 0 },
            { source: "Referrals", percentage: 15, count: 0 },
            { source: "Other", percentage: 5, count: 0 },
          ],
          status: {},
          recentActivity: [],
        },
      };
    }
  },

  // Verification docs
  listVerificationDocuments: async () => {
    const response = await api.get("/api/employer/verification/documents");
    return response.data;
  },
  uploadVerificationDocument: async (type, file) => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("document", file);
    const response = await api.post(
      "/api/employer/verification/documents",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },
  deleteVerificationDocument: async (docId) => {
    const response = await api.delete(
      `/api/employer/verification/documents/${docId}`
    );
    return response.data;
  },
  getVerificationStatus: async () => {
    const response = await api.get("/api/employer/verification/status");
    return response.data;
  },

  // Branding
  uploadCoverImage: async (file) => {
    const formData = new FormData();
    formData.append("coverImage", file);
    const response = await api.post("/api/employer/branding/cover-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  updateBranding: async (branding) => {
    const response = await api.put("/api/employer/branding", branding);
    return response.data;
  },
};
