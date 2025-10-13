// services/userService.js
import api from "@/lib/axios";

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get("/api/user/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put("/api/user/profile", profileData);
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put("/api/user/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    const response = await api.post(
      "/api/user/upload-profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};
