// services/studentService.js
import api from "@/lib/axios";

export const studentService = {
  // Get student profile
  getProfile: async () => {
    try {
      const response = await api.get("/api/student/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching student profile:", error);
      // Check if it's a 403 Forbidden error
      if (error.response?.status === 403) {
        throw new Error("Access denied. You don't have student permissions.");
      }
      throw error;
    }
  },

  // Get activity overview (applications, last login, etc.)
  getActivity: async () => {
    const response = await api.get("/api/student/activity");
    return response.data;
  },

  // Update student profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put("/api/student/profile", profileData);
      return response.data;
    } catch (error) {
      console.error("Error updating student profile:", error);
      if (error.response?.status === 403) {
        throw new Error("Access denied. You don't have student permissions.");
      }
      throw error;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    const response = await api.post(
      "/api/student/upload-profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await api.post("/api/student/upload-resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Resume Management
  uploadNewResume: async (file, name) => {
    const formData = new FormData();
    formData.append("file", file);
    if (name) formData.append("name", name);

    const response = await api.post("/api/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getMyResumes: async () => {
    const response = await api.get("/api/resume");
    return response.data;
  },

  getResumeById: async (id) => {
    const response = await api.get(`/api/resume/${id}`);
    return response.data;
  },

  updateResume: async (id, data) => {
    const response = await api.put(`/api/resume/${id}`, data);
    return response.data;
  },

  deleteResume: async (id) => {
    const response = await api.delete(`/api/resume/${id}`);
    return response.data;
  },

  setPrimaryResume: async (id) => {
    const response = await api.post(`/api/resume/${id}/set-primary`);
    return response.data;
  },

  duplicateResume: async (id) => {
    const response = await api.post(`/api/resume/${id}/duplicate`);
    return response.data;
  },

  // Get support tickets
  getSupportTickets: async (params = {}) => {
    try {
      const response = await api.get("/api/student/support-tickets", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching support tickets:", error);
      throw error;
    }
  },

  // Create support ticket
  createSupportTicket: async (ticketData) => {
    try {
      const response = await api.post(
        "/api/student/support-tickets",
        ticketData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating support ticket:", error);
      throw error;
    }
  },

  // Job Application with resume
  applyToJob: async (jobId, applicationData) => {
    const response = await api.post(`/api/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },
};
