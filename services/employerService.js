import api from "@/lib/axios";

export const employerService = {
  getProfile: async () => {
    const response = await api.get("/api/employer/profile");
    return response.data;
  },
  getDashboard: async () => {
    const response = await api.get("/api/employer/dashboard");
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await api.put("/api/employer/profile", data);
    return response.data;
  },
  updateHiringPreferences: async (data) => {
    const response = await api.put("/api/employer/hiring-preferences", data);
    return response.data;
  },
  updatePlan: async (plan) => {
    const response = await api.put("/api/employer/plan", { plan });
    return response.data;
  },
  getAnalytics: async (params = {}) => {
    const response = await api.get("/api/employer/analytics", { params });
    return response.data;
  },
};
