// services/leadService.js
import api from "@/lib/axios";

export const leadService = {
  // Lead CRUD operations
  async createLead(leadData) {
    try {
      const response = await api.post("/api/leads", leadData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create lead");
    }
  },

  async getAllLeads(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const response = await api.get(`/api/leads?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch leads");
    }
  },

  async getLeadById(leadId) {
    try {
      const response = await api.get(`/api/leads/${leadId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch lead");
    }
  },

  async updateLead(leadId, updateData) {
    try {
      const response = await api.put(`/api/leads/${leadId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update lead");
    }
  },

  async deleteLead(leadId, reason = "") {
    try {
      const response = await api.delete(`/api/leads/${leadId}`, {
        data: { reason },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete lead");
    }
  },

  // Lead assignment operations
  async assignLead(leadId, assignedTo, reason = "") {
    try {
      const response = await api.post(`/api/leads/${leadId}/assign`, {
        assignedTo,
        reason,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to assign lead");
    }
  },

  async unassignLead(leadId) {
    try {
      const response = await api.post(`/api/leads/${leadId}/unassign`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to unassign lead");
    }
  },

  // Lead status operations
  async updateLeadStatus(leadId, status, reason = "") {
    try {
      const response = await api.patch(`/api/leads/${leadId}/status`, {
        status,
        reason,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update lead status");
    }
  },

  async convertLead(leadId, convertedTo = "student", conversionValue = 0) {
    try {
      const response = await api.post(`/api/leads/${leadId}/convert`, {
        convertedTo,
        conversionValue,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to convert lead");
    }
  },

  // Follow-up operations
  async addFollowUp(leadId, followUpData) {
    try {
      const response = await api.post(`/api/leads/${leadId}/follow-ups`, followUpData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add follow-up");
    }
  },

  async getFollowUps(leadId) {
    try {
      const response = await api.get(`/api/leads/${leadId}/follow-ups`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch follow-ups");
    }
  },

  // Analytics and statistics
  async getLeadStats(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const response = await api.get(`/api/leads/stats?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch lead statistics");
    }
  },

  async getLeadsBySource(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const response = await api.get(`/api/leads/source-stats?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch source statistics");
    }
  },

  async getStaffPerformance(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const response = await api.get(`/api/leads/staff-performance?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch staff performance");
    }
  },

  // Bulk operations
  async bulkAssignLeads(leadIds, assignedTo) {
    try {
      const response = await api.post("/api/leads/bulk/assign", {
        leadIds,
        assignedTo,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to bulk assign leads");
    }
  },

  async bulkUpdateStatus(leadIds, status) {
    try {
      const response = await api.post("/api/leads/bulk/status", {
        leadIds,
        status,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to bulk update lead status");
    }
  },

  // Auto-assign via round-robin
  async autoAssignLeads(leadIds) {
    try {
      const response = await api.post("/api/leads/auto-assign", {
        leadIds,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to auto-assign leads");
    }
  },
};
