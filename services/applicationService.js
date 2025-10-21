import api from "@/lib/axios";

export const applicationService = {
  // Student
  apply: async (payload) => {
    // payload may include jobId, resumeUrl, previousCompany, previousPosition, yearsExperience, languages
    const response = await api.post("/api/applications/apply", payload);
    return response.data;
  },
  studentMyApplications: async (params = {}) => {
    const response = await api.get("/api/applications/student/my-applications", { params });
    return response.data;
  },
  withdraw: async (applicationId) => {
    const response = await api.patch(`/api/applications/${applicationId}/withdraw`);
    return response.data;
  },

  // Employer
  employerMyApplications: async (params = {}) => {
    const response = await api.get("/api/applications/employer/my-applications", { params });
    return response.data;
  },
  updateStatus: async (applicationId, status, feedback) => {
    const response = await api.patch(`/api/applications/${applicationId}/status`, { status, feedback });
    return response.data;
  },
  // Interview scheduling
  scheduleInterview: async (applicationId, payload) => {
    const response = await api.post(`/api/applications/${applicationId}/interview/schedule`, payload);
    return response.data;
  },
  rescheduleInterview: async (applicationId, payload) => {
    const response = await api.patch(`/api/applications/${applicationId}/interview/reschedule`, payload);
    return response.data;
  },
  cancelInterview: async (applicationId, reason) => {
    const response = await api.patch(`/api/applications/${applicationId}/interview/cancel`, { reason });
    return response.data;
  },
  completeInterview: async (applicationId, feedback) => {
    const response = await api.patch(`/api/applications/${applicationId}/interview/complete`, { feedback });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/api/applications/${id}`);
    return response.data;
  },
};
