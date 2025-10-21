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

  // Get candidates with filters (search, status, plan, pagination)
  getCandidates: async (params = {}) => {
    const response = await api.get("/api/admin/candidates", { params });
    return response.data;
  },

  // Get user with profile/details
  getUserById: async (id) => {
    const response = await api.get(`/api/admin/users/${id}`);
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

  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await api.get("/api/admin/dashboard/stats");
    return response.data;
  },

  // Admin - list jobs
  listJobs: async (params = {}) => {
    const response = await api.get("/api/admin/jobs", { params });
    return response.data;
  },

  // Change job status (admin moderation)
  changeJobStatus: async (jobId, status) => {
    const response = await api.patch(`/api/admin/jobs/${jobId}/status`, { status });
    return response.data;
  },

  // Companies CRUD
  listCompanies: async (params = {}) => {
    const response = await api.get("/api/admin/companies", { params });
    return response.data;
  },
  createCompany: async (data) => {
    const response = await api.post("/api/admin/companies", data);
    return response.data;
  },
  getCompanyById: async (id) => {
    const response = await api.get(`/api/admin/companies/${id}`);
    return response.data;
  },
  updateCompany: async (id, data) => {
    const response = await api.put(`/api/admin/companies/${id}`, data);
    return response.data;
  },
  deleteCompany: async (id) => {
    const response = await api.delete(`/api/admin/companies/${id}`);
    return response.data;
  },

  // Employer admin actions
  setEmployerVerification: async (userId, isVerified) => {
    const response = await api.patch(`/api/admin/employers/${userId}/verify`, { isVerified });
    return response.data;
  },

  updateEmployerPlan: async (userId, plan) => {
    const response = await api.patch(`/api/admin/employers/${userId}/plan`, { plan });
    return response.data;
  },

  updateEmployerDocumentStatus: async (userId, docId, payload) => {
    const response = await api.patch(`/api/admin/employers/${userId}/documents/${docId}`, payload);
    return response.data;
  },
};
