import api from "@/lib/axios";

export const supportService = {
  // Student's tickets
  listMyTickets: async (params = {}) => {
    const response = await api.get("/api/student/support/tickets", { params });
    return response.data;
  },
  createTicket: async ({ subject, description, category, priority }) => {
    const response = await api.post("/api/student/support/tickets", {
      subject,
      description,
      category,
      priority,
    });
    return response.data;
  },
  getTicketById: async (id) => {
    const response = await api.get(`/api/student/support/tickets/${id}`);
    return response.data;
  },
};
