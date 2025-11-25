import { toast } from "sonner";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

/**
 * Skill Academy Toast Notifications
 * Custom toast utility for Skill Academy with premium UI
 */

const createToast = (type, title, message, options = {}) => {
  const defaultDuration = options.duration || 4000;

  return toast.custom(
    (t) => (
      <div
        className={`
          flex items-start gap-3 px-4 py-3 rounded-xl backdrop-blur-xl
          border-2 shadow-2xl animate-in fade-in slide-in-from-right-5
          ${
            type === "success"
              ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/50 text-emerald-100"
              : type === "error"
              ? "bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/50 text-red-100"
              : type === "info"
              ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50 text-blue-100"
              : "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-100"
          }
        `}
      >
        <div className="flex-shrink-0 mt-0.5">
          {type === "success" && (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          )}
          {type === "error" && <AlertCircle className="w-5 h-5 text-red-400" />}
          {type === "info" && <Info className="w-5 h-5 text-blue-400" />}
          {type === "warning" && (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">{title}</p>
          {message && <p className="text-xs opacity-90 mt-1">{message}</p>}
        </div>
      </div>
    ),
    { duration: defaultDuration }
  );
};

export const skillAcademyToast = {
  // Course Actions
  courseEnrolled: (courseName) =>
    createToast(
      "success",
      "Enrolled Successfully! 🎉",
      `You've been enrolled in ${courseName}. Start learning now!`
    ),

  enrollmentError: (error) =>
    createToast(
      "error",
      "Enrollment Failed",
      error || "Unable to enroll in course. Please try again."
    ),

  courseAdded: (courseName) =>
    createToast(
      "success",
      "Course Added to Cart",
      `${courseName} has been added to your cart.`
    ),

  courseRemoved: (courseName) =>
    createToast(
      "success",
      "Course Removed",
      `${courseName} has been removed from your cart.`
    ),

  // Review Actions
  reviewSubmitted: () =>
    createToast(
      "success",
      "Review Submitted! ⭐",
      "Thank you for sharing your feedback. Your review helps others!"
    ),

  reviewError: (error) =>
    createToast(
      "error",
      "Review Failed",
      error || "Unable to submit review. Please try again."
    ),

  // Registration
  registrationSuccess: () =>
    createToast(
      "success",
      "Registration Complete! 🎓",
      "Welcome to Sabka Skill Academy. Check your email for next steps."
    ),

  registrationError: (error) =>
    createToast(
      "error",
      "Registration Failed",
      error || "Unable to complete registration. Please try again."
    ),

  // Contact Form
  messageSent: () =>
    createToast(
      "success",
      "Message Sent! 📧",
      "Thank you for contacting us. We'll get back to you soon."
    ),

  messageError: (error) =>
    createToast(
      "error",
      "Message Failed",
      error || "Unable to send message. Please try again."
    ),

  // Payment
  paymentSuccess: (courseName) =>
    createToast(
      "success",
      "Payment Successful! 💳",
      `You're now enrolled in ${courseName}. Happy learning!`
    ),

  paymentError: (error) =>
    createToast(
      "error",
      "Payment Failed",
      error || "Payment could not be processed. Please try again."
    ),

  // General
  loading: (message) =>
    toast.loading(message || "Loading...", {
      style: {
        background: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        border: "2px solid rgba(168, 123, 204, 0.5)",
        borderRadius: "12px",
        backdropFilter: "blur(10px)",
      },
    }),

  info: (title, message) => createToast("info", title, message),

  warning: (title, message) => createToast("warning", title, message),

  success: (title, message) => createToast("success", title, message),

  error: (title, message) => createToast("error", title, message),

  dismiss: (toastId) => toast.dismiss(toastId),

  dismissAll: () => toast.dismiss(),
};

export default skillAcademyToast;
