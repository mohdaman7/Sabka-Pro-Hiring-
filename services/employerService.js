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
};
