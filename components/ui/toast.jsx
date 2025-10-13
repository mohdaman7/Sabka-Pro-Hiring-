"use client";

import { toast } from "sonner";

// Custom toast styles that match your theme
export const customToast = {
  success: (message, description) => {
    toast.success(message, {
      description,
      className: "bg-green-500/20 border-green-500/30 text-green-300",
      duration: 4000,
    });
  },

  error: (message, description) => {
    toast.error(message, {
      description,
      className: "bg-red-500/20 border-red-500/30 text-red-300",
      duration: 5000,
    });
  },

  warning: (message, description) => {
    toast.warning(message, {
      description,
      className: "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
      duration: 4000,
    });
  },

  info: (message, description) => {
    toast.info(message, {
      description,
      className: "bg-blue-500/20 border-blue-500/30 text-blue-300",
      duration: 3000,
    });
  },

  loading: (message, description) => {
    return toast.loading(message, {
      description,
      className: "bg-purple-500/20 border-purple-500/30 text-purple-300",
    });
  },
};

export { toast };
