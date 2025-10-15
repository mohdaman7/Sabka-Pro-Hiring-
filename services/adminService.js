// services/adminService.js
import api from "@/lib/axios";

export const adminService = {
  // Get pending users
  getPendingUsers: async () => {
    const response = await api.get("/api/admin/pending");
    return response.data;
  },

  // Get all users with filter
  getUsers: async (status = "") => {
    const params = status ? { status } : {};
    const response = await api.get("/api/admin/users", { params });
    return response.data;
  },

  // Approve user
  approveUser: async (userId, sendCredentials = true) => {
    const response = await api.post(`/api/admin/approve/${userId}`, {
      sendCredentials,
    });
    return response.data;
  },

  // Reject user
  rejectUser: async (userId, reason) => {
    const response = await api.post(`/api/admin/reject/${userId}`, {
      reason,
    });
    return response.data;
  },

  // Get platform stats
  getDashboardStats: async () => {
    const response = await api.get("/api/admin/stats");
    return response.data;
  },

  // List candidates (admin view)
  getCandidates: async (params = {}) => {
    const response = await api.get("/api/admin/candidates", { params });
    return response.data;
  },

  // List employers (admin view)
  getEmployers: async (params = {}) => {
    const response = await api.get("/api/admin/employers", { params });
    return response.data;
  },

  // List jobs (admin view)
  getJobs: async (params = {}) => {
    const response = await api.get("/api/admin/jobs", { params });
    return response.data;
  },
};
