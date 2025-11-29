// lib/axios.js
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage - check for both token keys
    let token = localStorage.getItem("token");
    if (!token) {
      token = localStorage.getItem("skillAcademyToken");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      const path = window.location.pathname || "";

      // Public pages that don't require authentication
      const publicPages = [
        "/skill-academy/courses", // Course detail pages are public
        "/skill-academy/register", // Registration is public
      ];

      const isPublicPage = publicPages.some(
        (publicPath) =>
          path.startsWith(publicPath) && path !== "/skill-academy/login"
      );

      // If on a public page, don't redirect - let the component handle it
      if (isPublicPage) {
        return Promise.reject(error);
      }

      // Handle skill-academy area - redirect to skill-academy login
      if (path.startsWith("/skill-academy")) {
        localStorage.removeItem("skillAcademyToken");
        localStorage.removeItem("skillAcademyUser");
        window.location.href = "/skill-academy/login";
        return;
      }

      const isProtectedArea =
        path.startsWith("/student") ||
        path.startsWith("/employer") ||
        path.startsWith("/crm") ||
        path.startsWith("/admin");

      if (isProtectedArea) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      // For public areas, just let the caller handle the 401
      return Promise.reject(error);
    }

    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
        status: 0,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
