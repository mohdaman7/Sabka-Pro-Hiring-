// services/adminService.js
import api from "@/lib/axios";

export const adminService = {
  // ============================================
  // LEAD MANAGEMENT METHODS
  // ============================================
  
  // Get all leads with filters
  getLeads: async (params = {}) => {
    const response = await api.get("/api/leads", { params });
    return response.data;
  },

  // Get lead by ID
  getLeadById: async (id) => {
    const response = await api.get(`/api/leads/${id}`);
    return response.data;
  },

  // Create new lead
  createLead: async (data) => {
    const response = await api.post("/api/leads", data);
    return response.data;
  },

  // Update lead
  updateLead: async (id, data) => {
    const response = await api.put(`/api/leads/${id}`, data);
    return response.data;
  },

  // Delete lead (soft delete)
  deleteLead: async (id, reason) => {
    const response = await api.delete(`/api/leads/${id}`, { data: { reason } });
    return response.data;
  },

  // Assign lead to staff
  assignLead: async (id, assignedTo, reason) => {
    const response = await api.post(`/api/leads/${id}/assign`, { assignedTo, reason });
    return response.data;
  },

  // Unassign lead
  unassignLead: async (id) => {
    const response = await api.post(`/api/leads/${id}/unassign`);
    return response.data;
  },

  // Update lead status
  updateLeadStatus: async (id, status, reason) => {
    const response = await api.patch(`/api/leads/${id}/status`, { status, reason });
    return response.data;
  },

  // Convert lead to user
  convertLead: async (id, convertedTo, conversionValue) => {
    const response = await api.post(`/api/leads/${id}/convert`, { convertedTo, conversionValue });
    return response.data;
  },

  // Add follow-up to lead
  addFollowUp: async (id, followUpData) => {
    const response = await api.post(`/api/leads/${id}/follow-ups`, followUpData);
    return response.data;
  },

  // Get follow-ups for a lead
  getFollowUps: async (id) => {
    const response = await api.get(`/api/leads/${id}/follow-ups`);
    return response.data;
  },

  // Get lead statistics
  getLeadStats: async (params = {}) => {
    const response = await api.get("/api/leads/stats", { params });
    return response.data;
  },

  // Get leads by source
  getLeadsBySource: async (params = {}) => {
    const response = await api.get("/api/leads/source-stats", { params });
    return response.data;
  },

  // Get staff performance
  getStaffPerformance: async (params = {}) => {
    const response = await api.get("/api/leads/staff-performance", { params });
    return response.data;
  },

  // Bulk assign leads
  bulkAssignLeads: async (leadIds, assignedTo) => {
    const response = await api.post("/api/leads/bulk/assign", { leadIds, assignedTo });
    return response.data;
  },

  // Bulk update lead status
  bulkUpdateLeadStatus: async (leadIds, status) => {
    const response = await api.post("/api/leads/bulk/status", { leadIds, status });
    return response.data;
  },

  // Auto-assign leads (round-robin)
  autoAssignLeads: async (leadIds) => {
    const response = await api.post("/api/leads/auto-assign", { leadIds });
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

  // ============================================
  // USER MANAGEMENT (LEGACY - Keep for existing users)
  // ============================================
  
  // Get pending users (for existing approval workflow if needed)
  getPendingUsers: async () => {
    const response = await api.get("/api/admin/pending");
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

  // Job moderation actions
  approveJob: async (jobId) => {
    const response = await api.post(`/api/admin/jobs/${jobId}/approve`);
    return response.data;
  },
  rejectJob: async (jobId, reason) => {
    const response = await api.post(`/api/admin/jobs/${jobId}/reject`, { reason });
    return response.data;
  },
  requestJobChanges: async (jobId, note) => {
    const response = await api.post(`/api/admin/jobs/${jobId}/request-changes`, { note });
    return response.data;
  },
  reanalyzeJob: async (jobId) => {
    const response = await api.post(`/api/admin/jobs/${jobId}/reanalyze`);
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
