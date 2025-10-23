import api from "@/lib/axios";

const courseService = {
  listPublic: async () => {
    const res = await api.get("/api/courses");
    return res.data.data;
  },
  getById: async (id) => {
    const res = await api.get(`/api/courses/${id}`);
    return res.data.data;
  },
  getMyProgress: async (courseId) => {
    const res = await api.get(`/api/courses/${courseId}/progress`);
    return res.data.data;
  },
  updateMyProgress: async (courseId, payload) => {
    const res = await api.post(`/api/courses/${courseId}/progress`, payload);
    return res.data.data;
  },
  myAccess: async () => {
    const res = await api.get("/api/courses/me/access");
    return res.data.data;
  },
  recommendations: async () => {
    const res = await api.get("/api/courses/me/recommendations");
    return res.data.data;
  },

  // Admin
  adminCreateParent: async (payload) => {
    const res = await api.post("/api/courses/admin/parent", payload);
    return res.data.data;
  },
  adminCreateModule: async (payload) => {
    const res = await api.post("/api/courses/admin/module", payload);
    return res.data.data;
  },
  adminAddLesson: async (courseId, payload) => {
    const res = await api.post(`/api/courses/admin/${courseId}/lessons`, payload);
    return res.data.data;
  },
  adminList: async () => {
    const res = await api.get("/api/courses/admin");
    return res.data.data;
  },
  adminListAccess: async (params = {}) => {
    const search = new URLSearchParams(params).toString();
    const res = await api.get(`/api/courses/admin/access${search ? `?${search}` : ""}`);
    return res.data.data;
  },
  adminGrantAccess: async (payload) => {
    const res = await api.post("/api/courses/admin/access", payload);
    return res.data.data;
  },
  adminRevokeAccess: async (accessId) => {
    const res = await api.delete(`/api/courses/admin/access/${accessId}`);
    return res.data;
  },
  adminUpdate: async (id, payload) => {
    const res = await api.put(`/api/courses/admin/${id}`, payload);
    return res.data.data;
  },
  adminDelete: async (id) => {
    const res = await api.delete(`/api/courses/admin/${id}`);
    return res.data;
  },
};

export default courseService;
