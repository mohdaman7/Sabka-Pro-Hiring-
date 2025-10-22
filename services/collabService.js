import api from "@/lib/axios";

export const collabService = {
  // Team
  getTeam: async () => {
    const res = await api.get("/api/employer/team");
    return res.data;
  },
  inviteMember: async (email, role) => {
    const res = await api.post("/api/employer/team/invite", { email, role });
    return res.data;
  },
  updateMember: async (memberId, payload) => {
    const res = await api.patch(`/api/employer/team/members/${encodeURIComponent(memberId)}`, payload);
    return res.data;
  },
  removeMember: async (memberId) => {
    const res = await api.delete(`/api/employer/team/members/${encodeURIComponent(memberId)}`);
    return res.data;
  },

  // Notes
  listNotes: async (params = {}) => {
    const res = await api.get("/api/employer/notes", { params });
    return res.data;
  },
  addNote: async (payload) => {
    const res = await api.post("/api/employer/notes", payload);
    return res.data;
  },
  updateNote: async (id, payload) => {
    const res = await api.patch(`/api/employer/notes/${id}`, payload);
    return res.data;
  },
  deleteNote: async (id) => {
    const res = await api.delete(`/api/employer/notes/${id}`);
    return res.data;
  },

  // Activity
  getActivity: async (params = {}) => {
    const res = await api.get("/api/employer/activity", { params });
    return res.data;
  },

  // Saved Views
  listViews: async (params = {}) => {
    const res = await api.get("/api/employer/views", { params });
    return res.data;
  },
  createView: async (payload) => {
    const res = await api.post("/api/employer/views", payload);
    return res.data;
  },
  updateView: async (id, payload) => {
    const res = await api.patch(`/api/employer/views/${id}`, payload);
    return res.data;
  },
  deleteView: async (id) => {
    const res = await api.delete(`/api/employer/views/${id}`);
    return res.data;
  },
};
