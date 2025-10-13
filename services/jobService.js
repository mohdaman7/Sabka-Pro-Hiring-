import api from "@/lib/axios";

export const jobService = {
  // Create a new job
  createJob: async (jobData) => {
    const response = await api.post("/api/jobs", jobData);
    return response.data;
  },

  // Get all jobs (public)
  getAllJobs: async (params = {}) => {
    const response = await api.get("/api/jobs", { params });
    return response.data;
  },

  // Get employer's jobs
  getMyJobs: async (status = "") => {
    const params = status ? { status } : {};
    const response = await api.get("/api/jobs/employer/my-jobs", { params });
    return response.data;
  },

  // Get single job by ID
  getJobById: async (jobId) => {
    const response = await api.get(`/api/jobs/${jobId}`);
    return response.data;
  },

  // Update job
  updateJob: async (jobId, jobData) => {
    const response = await api.put(`/api/jobs/${jobId}`, jobData);
    return response.data;
  },

  // Delete job
  deleteJob: async (jobId) => {
    const response = await api.delete(`/api/jobs/${jobId}`);
    return response.data;
  },

  // Get job applications
  getJobApplications: async (jobId) => {
    const response = await api.get(`/api/jobs/${jobId}/applications`);
    return response.data;
  },

  // Change job status
  changeJobStatus: async (jobId, status) => {
    const response = await api.patch(`/api/jobs/${jobId}/status`, { status });
    return response.data;
  },

  // Get all jobs (public)
  getAllJobs: async (params = {}) => {
    const response = await api.get("/api/jobs", { params });
    return response.data;
  },
};
