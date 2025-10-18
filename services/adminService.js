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

  // Get user by id with profile/jobs
  getUserById: async (userId) => {
    const response = await api.get(`/api/admin/users/${userId}`);
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

  // Moderate a job (approve/reject/close)
  moderateJob: async (jobId, action) => {
    const response = await api.post(`/api/admin/jobs/${jobId}/moderate`, { action });
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

  // Employer documents
  listEmployerDocuments: async (employerUserId) => {
    const response = await api.get(`/api/admin/employers/${employerUserId}/documents`);
    return response.data;
  },
  reviewEmployerDocument: async (employerUserId, docId, action, reason) => {
    const response = await api.post(
      `/api/admin/employers/${employerUserId}/documents/${docId}/review`,
      { action, reason }
    );
    return response.data;
  },

  // Employer plan management
  updateEmployerPlan: async (employerUserId, plan) => {
    const response = await api.post(`/api/admin/employers/${employerUserId}/plan`, { plan });
    return response.data;
  },
};
