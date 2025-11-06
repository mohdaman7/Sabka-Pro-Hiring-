"use client";

import { toast } from "sonner";
import { CheckCircle, XCircle, AlertTriangle, Info, Loader2, Sparkles } from "lucide-react";

// Premium toast component with custom styling and icons
export const customToast = {
  success: (message, description) => {
    toast.success(message, {
      description,
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      className: "group bg-gradient-to-br from-green-900/90 to-emerald-900/90 backdrop-blur-xl border-2 border-green-500/40 text-white shadow-2xl shadow-green-500/20",
      descriptionClassName: "text-green-200/80",
      duration: 4000,
      style: {
        borderRadius: "16px",
        padding: "16px",
      },
    });
  },

  error: (message, description) => {
    toast.error(message, {
      description,
      icon: <XCircle className="w-5 h-5 text-red-400" />,
      className: "group bg-gradient-to-br from-red-900/90 to-rose-900/90 backdrop-blur-xl border-2 border-red-500/40 text-white shadow-2xl shadow-red-500/20",
      descriptionClassName: "text-red-200/80",
      duration: 5000,
      style: {
        borderRadius: "16px",
        padding: "16px",
      },
    });
  },

  warning: (message, description) => {
    toast.warning(message, {
      description,
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      className: "group bg-gradient-to-br from-yellow-900/90 to-amber-900/90 backdrop-blur-xl border-2 border-yellow-500/40 text-white shadow-2xl shadow-yellow-500/20",
      descriptionClassName: "text-yellow-200/80",
      duration: 4000,
      style: {
        borderRadius: "16px",
        padding: "16px",
      },
    });
  },

  info: (message, description) => {
    toast.info(message, {
      description,
      icon: <Info className="w-5 h-5 text-blue-400" />,
      className: "group bg-gradient-to-br from-blue-900/90 to-cyan-900/90 backdrop-blur-xl border-2 border-blue-500/40 text-white shadow-2xl shadow-blue-500/20",
      descriptionClassName: "text-blue-200/80",
      duration: 3000,
      style: {
        borderRadius: "16px",
        padding: "16px",
      },
    });
  },

  loading: (message, description) => {
    return toast.loading(message, {
      description,
      icon: <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />,
      className: "group bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-xl border-2 border-purple-500/40 text-white shadow-2xl shadow-purple-500/20",
      descriptionClassName: "text-purple-200/80",
      style: {
        borderRadius: "16px",
        padding: "16px",
      },
    });
  },

  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: {
        title: messages.loading,
        icon: <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />,
        className: "bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-xl border-2 border-purple-500/40 text-white shadow-2xl",
      },
      success: {
        title: messages.success,
        icon: <CheckCircle className="w-5 h-5 text-green-400" />,
        className: "bg-gradient-to-br from-green-900/90 to-emerald-900/90 backdrop-blur-xl border-2 border-green-500/40 text-white shadow-2xl",
      },
      error: {
        title: messages.error,
        icon: <XCircle className="w-5 h-5 text-red-400" />,
        className: "bg-gradient-to-br from-red-900/90 to-rose-900/90 backdrop-blur-xl border-2 border-red-500/40 text-white shadow-2xl",
      },
    });
  },

  custom: (message, description, icon = <Sparkles className="w-5 h-5 text-purple-400" />) => {
    toast(message, {
      description,
      icon,
      className: "group bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-xl border-2 border-purple-500/40 text-white shadow-2xl shadow-purple-500/20",
      descriptionClassName: "text-purple-200/80",
      duration: 4000,
      style: {
        borderRadius: "16px",
        padding: "16px",
      },
    });
  },
};

export { toast };
