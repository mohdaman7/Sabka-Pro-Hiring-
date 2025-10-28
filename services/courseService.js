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
  myProgress: async (courseId) => {
    const res = await api.get(`/api/courses/me/progress/${courseId}`);
    return res.data.data;
  },
  completeLesson: async (courseId, lessonId) => {
    const res = await api.post(
      `/api/courses/me/progress/${courseId}/lessons/${lessonId}/complete`
    );
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
    const res = await api.post(
      `/api/courses/admin/${courseId}/lessons`,
      payload
    );
    return res.data.data;
  },
  adminList: async () => {
    console.log("Fetching admin courses list...");
    const res = await api.get("/api/courses/admin");
    console.log("Admin courses response:", res.data);
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
  adminUpdateLesson: async (courseId, lessonId, payload) => {
    const res = await api.put(
      `/api/courses/admin/${courseId}/lessons/${lessonId}`,
      payload
    );
    return res.data.data;
  },
  adminDeleteLesson: async (courseId, lessonId) => {
    const res = await api.delete(
      `/api/courses/admin/${courseId}/lessons/${lessonId}`
    );
    return res.data;
  },
  // Admin Access Control
  adminListAccess: async (params) => {
    const res = await api.get("/api/courses/admin/access", { params });
    return res.data.data;
  },
  adminGrantAccess: async (payload) => {
    const res = await api.post("/api/courses/admin/access", payload);
    return res.data.data;
  },
  adminRevokeAccess: async (id) => {
    const res = await api.delete(`/api/courses/admin/access/${id}`);
    return res.data;
  },
};

export default courseService;
