/**
 * Global Error Handler Utility
 * Provides centralized error handling with toast notifications
 * Handles network errors, session expiration, permission errors, and more
 */

import { customToast } from "@/components/ui/toast";

/**
 * Handle API errors with appropriate toast notifications
 * @param {Error} error - The error object
 * @param {string} context - Context of the error (e.g., "Profile Update", "File Upload")
 * @returns {string} - Error message
 */
export const handleApiError = (error, context = "Operation") => {
  // Network error
  if (!error.response) {
    const message = "Network error. Please check your connection and try again.";
    customToast.error("Network Error", message);
    return message;
  }

  const status = error.response?.status;
  const errorData = error.response?.data;
  const message = errorData?.message || error.message || "An error occurred";

  // Session expired / Unauthorized
  if (status === 401) {
    customToast.error("Session Expired", "Your session has expired. Please log in again.");
    // Optionally redirect to login
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
    return "Session expired";
  }

  // Permission denied
  if (status === 403) {
    customToast.error("Permission Denied", "You don't have permission to perform this action.");
    return "Permission denied";
  }

  // Not found
  if (status === 404) {
    customToast.error("Not Found", `${context} not found. Please try again.`);
    return "Resource not found";
  }

  // Validation error
  if (status === 400) {
    customToast.error("Invalid Input", message);
    return message;
  }

  // Server error
  if (status >= 500) {
    customToast.error("Server Error", "Server is experiencing issues. Please try again later.");
    return "Server error";
  }

  // Generic error
  customToast.error(context, message);
  return message;
};

/**
 * Handle file upload errors
 * @param {Error} error - The error object
 * @returns {string} - Error message
 */
export const handleFileUploadError = (error) => {
  if (error.response?.status === 413) {
    customToast.error("File Too Large", "File size exceeds the maximum limit (10MB).");
    return "File too large";
  }

  if (error.response?.status === 415) {
    customToast.error("Invalid File Type", "This file type is not supported.");
    return "Invalid file type";
  }

  return handleApiError(error, "File Upload");
};

/**
 * Handle form submission errors
 * @param {Error} error - The error object
 * @returns {string} - Error message
 */
export const handleFormError = (error) => {
  return handleApiError(error, "Form Submission");
};

/**
 * Handle data fetch errors
 * @param {Error} error - The error object
 * @param {string} dataType - Type of data being fetched (e.g., "Courses", "Jobs")
 * @returns {string} - Error message
 */
export const handleFetchError = (error, dataType = "Data") => {
  if (!error.response) {
    customToast.error("Connection Error", `Failed to load ${dataType}. Please check your connection.`);
    return "Connection error";
  }

  if (error.response?.status === 404) {
    customToast.error("Not Found", `${dataType} not found.`);
    return "Not found";
  }

  return handleApiError(error, `Loading ${dataType}`);
};

/**
 * Handle deletion errors
 * @param {Error} error - The error object
 * @param {string} itemName - Name of item being deleted
 * @returns {string} - Error message
 */
export const handleDeleteError = (error, itemName = "Item") => {
  if (error.response?.status === 409) {
    customToast.error("Cannot Delete", `${itemName} is in use and cannot be deleted.`);
    return "Item in use";
  }

  return handleApiError(error, `Delete ${itemName}`);
};

/**
 * Show network status toast
 * @param {boolean} isOnline - Whether user is online
 */
export const showNetworkStatus = (isOnline) => {
  if (isOnline) {
    customToast.success("Back Online", "Connection restored. You're back online.");
  } else {
    customToast.warning("Offline", "You're currently offline. Some features may be limited.");
  }
};

/**
 * Wrap an async function with error handling
 * @param {Function} asyncFn - Async function to wrap
 * @param {string} context - Error context
 * @returns {Function} - Wrapped function
 */
export const withErrorHandler = (asyncFn, context = "Operation") => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      handleApiError(error, context);
      throw error;
    }
  };
};

/**
 * Global error event listener setup
 * Call this in your app's root component
 */
export const setupGlobalErrorHandling = () => {
  // Handle unhandled promise rejections
  if (typeof window !== "undefined") {
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      customToast.error("Unexpected Error", "An unexpected error occurred. Please refresh the page.");
    });

    // Handle network status changes
    window.addEventListener("online", () => showNetworkStatus(true));
    window.addEventListener("offline", () => showNetworkStatus(false));
  }
};

export default {
  handleApiError,
  handleFileUploadError,
  handleFormError,
  handleFetchError,
  handleDeleteError,
  showNetworkStatus,
  withErrorHandler,
  setupGlobalErrorHandling,
};
