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
  adminUpdate: async (id, payload) => {
    const res = await api.put(`/api/courses/admin/${id}`, payload);
    return res.data.data;
  },
  adminDelete: async (id) => {
    const res = await api.delete(`/api/courses/admin/${id}`);
    return res.data;
  },
  adminListAccesses: async () => {
    const res = await api.get("/api/courses/admin/accesses");
    return res.data.data;
  },
};

export default courseService;
