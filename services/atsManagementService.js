import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const BASE_URL = `${API_URL}/api/ats-management`;

// ==================== APPLICATIONS API ====================

export const atsManagementService = {
  // Get all applications with filters
  getAllApplications: async (filters = {}) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error.response?.data || error;
    }
  },

  // Get single application details
  getApplicationDetails: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching application details:', error);
      throw error.response?.data || error;
    }
  },

  // Alias for getApplicationDetails
  getApplicationById: async (id) => {
    return atsManagementService.getApplicationDetails(id);
  },

  // Add note to application
  addNote: async (id, notes) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${BASE_URL}/applications/${id}/notes`,
        { notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error.response?.data || error;
    }
  },

  // Add comment with rating
  addComment: async (id, commentData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/applications/${id}/comments`,
        commentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error.response?.data || error;
    }
  },

  // Assign HR to application
  assignHR: async (id, hrUserId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${BASE_URL}/applications/${id}/assign`,
        { assignedTo: hrUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error assigning HR:', error);
      throw error.response?.data || error;
    }
  },

  // Update application status
  updateApplicationStatus: async (id, data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${BASE_URL}/applications/${id}/status`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error.response?.data || error;
    }
  },

  // Assign HR to application
  assignHRToApplication: async (id, hrId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${BASE_URL}/applications/${id}/assign-hr`,
        { hrId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error assigning HR:', error);
      throw error.response?.data || error;
    }
  },

  // Bulk update applications
  bulkUpdateApplications: async (applicationIds, action, data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/applications/bulk-update`,
        { applicationIds, action, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error in bulk update:', error);
      throw error.response?.data || error;
    }
  },

  // Add note to application
  addNoteToApplication: async (id, content, isInternal = true) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/applications/${id}/notes`,
        { content, isInternal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error.response?.data || error;
    }
  },

  // ==================== INTERVIEWS API ====================

  // Get all interviews with filters
  getAllInterviews: async (filters = {}) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/interviews`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching interviews:', error);
      throw error.response?.data || error;
    }
  },

  // Create new interview
  createInterview: async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/interviews`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating interview:', error);
      throw error.response?.data || error;
    }
  },

  // Reschedule interview
  rescheduleInterview: async (id, scheduledAt, reason) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${BASE_URL}/interviews/${id}/reschedule`,
        { scheduledAt, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error rescheduling interview:', error);
      throw error.response?.data || error;
    }
  },

  // Cancel interview
  cancelInterview: async (id, reason) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${BASE_URL}/interviews/${id}/cancel`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error cancelling interview:', error);
      throw error.response?.data || error;
    }
  },

  // Complete interview and add feedback
  completeInterview: async (id, evaluation, result) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/interviews/${id}/complete`,
        { evaluation, result },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error completing interview:', error);
      throw error.response?.data || error;
    }
  },

  // ==================== REPORTS API ====================

  // Get ATS dashboard stats
  getATSDashboardStats: async (filters = {}) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/reports/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ATS stats:', error);
      throw error.response?.data || error;
    }
  },

  // Get HR performance report
  getHRPerformanceReport: async (filters = {}) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/reports/hr-performance`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching HR performance:', error);
      throw error.response?.data || error;
    }
  },

  // Export applications
  exportApplications: async (filters = {}, format = 'json') => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/reports/export`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { ...filters, format },
        responseType: format === 'csv' ? 'blob' : 'json',
      });
      
      if (format === 'csv') {
        // Create download link for CSV
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `applications_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        return { success: true, message: 'Export successful' };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error exporting applications:', error);
      throw error.response?.data || error;
    }
  },
};

export default atsManagementService;
