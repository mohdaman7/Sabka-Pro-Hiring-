import api from "@/lib/axios";

const purchaseService = {
  create: async (payload) => {
    const res = await api.post("/api/purchases", payload);
    return res.data.data;
  },
  listMine: async () => {
    const res = await api.get("/api/purchases");
    return res.data.data;
  },
  getInvoice: async (id) => {
    const res = await api.get(`/api/purchases/${id}/invoice`);
    return res.data.data;
  },
};

export default purchaseService;
