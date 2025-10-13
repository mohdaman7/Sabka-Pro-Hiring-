// services/authService.js
import api from "@/lib/axios";

export const authService = {
  // Login user
  login: async (email, password, role) => {
    const response = await api.post("/api/auth/login", {
      email,
      password,
      role,
    });
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post("/api/auth/logout");
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post("/api/auth/forgot-password", { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/api/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put("/api/auth/profile", profileData);
    return response.data;
  },
};
