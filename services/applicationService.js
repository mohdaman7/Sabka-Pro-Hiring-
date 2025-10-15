import api from "@/lib/axios";

export const applicationService = {
  // Student
  apply: async ({ jobId, resumeUrl, coverLetter }) => {
    const response = await api.post("/api/applications/apply", {
      jobId,
      resumeUrl,
      coverLetter,
    });
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
  getById: async (id) => {
    const response = await api.get(`/api/applications/${id}`);
    return response.data;
  },
};
