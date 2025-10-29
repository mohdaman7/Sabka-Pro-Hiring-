import api from "@/lib/axios";

export const resumeService = {
  // =============== ATS RESUME SERVICES ===============
  
  // Upload resume
  uploadResume: async (resumeData) => {
    const response = await api.post("/api/resume", resumeData);
    return response.data;
  },

  // Get all resumes
  getMyResumes: async () => {
    const response = await api.get("/api/resume");
    return response.data;
  },

  // Get single resume
  getResumeById: async (id) => {
    const response = await api.get(`/api/resume/${id}`);
    return response.data;
  },

  // Update resume
  updateResume: async (id, data) => {
    const response = await api.put(`/api/resume/${id}`, data);
    return response.data;
  },

  // Delete resume
  deleteResume: async (id) => {
    const response = await api.delete(`/api/resume/${id}`);
    return response.data;
  },

  // Duplicate resume
  duplicateResume: async (id) => {
    const response = await api.post(`/api/resume/${id}/duplicate`);
    return response.data;
  },

  // Set primary resume
  setPrimaryResume: async (id) => {
    const response = await api.post(`/api/resume/${id}/set-primary`);
    return response.data;
  },

  // Track resume view
  trackView: async (id) => {
    const response = await api.post(`/api/resume/${id}/track-view`);
    return response.data;
  },

  // Track resume download
  trackDownload: async (id) => {
    const response = await api.post(`/api/resume/${id}/track-download`);
    return response.data;
  },

  // Get ATS suggestions
  getATSSuggestions: async (id) => {
    const response = await api.get(`/api/resume/${id}/ats-suggestions`);
    return response.data;
  },

  // =============== VIDEO RESUME SERVICES ===============
  
  // Upload video resume
  uploadVideoResume: async (videoData) => {
    const response = await api.post("/api/resume/video", videoData);
    return response.data;
  },

  // Get all video resumes
  getMyVideoResumes: async () => {
    const response = await api.get("/api/resume/video/all");
    return response.data;
  },

  // Update video resume
  updateVideoResume: async (id, data) => {
    const response = await api.put(`/api/resume/video/${id}`, data);
    return response.data;
  },

  // Delete video resume
  deleteVideoResume: async (id) => {
    const response = await api.delete(`/api/resume/video/${id}`);
    return response.data;
  },

  // Set primary video
  setPrimaryVideo: async (id) => {
    const response = await api.post(`/api/resume/video/${id}/set-primary`);
    return response.data;
  },

  // Track video view
  trackVideoView: async (id, duration) => {
    const response = await api.post(`/api/resume/video/${id}/track-view`, { duration });
    return response.data;
  },

  // =============== ANALYTICS SERVICES ===============
  
  // Get analytics overview
  getAnalytics: async () => {
    const response = await api.get("/api/resume/analytics/overview");
    return response.data;
  },
};
