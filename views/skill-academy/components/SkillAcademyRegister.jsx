"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Shield,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Lock,
  Zap,
} from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SkillAcademyRegister() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateStep1()) return;

    try {
      setApiError("");
      setIsOtpSent(true);

      const response = await api.post("/api/auth/skill-academy/send-otp", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      const data = response.data;

      if (!data?.success) {
        setApiError(data?.message || "Failed to send OTP. Please try again.");
        return;
      }

      setStep(2);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to send OTP. Please try again.";
      setApiError(message);
    } finally {
      setIsOtpSent(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp.trim()) {
      setErrors({ otp: "Please enter the OTP" });
      return;
    }

    try {
      setApiError("");
      setIsVerifying(true);

      const verifyResponse = await api.post(
        "/api/auth/skill-academy/verify-otp",
        {
          phone: formData.phone,
          otp: formData.otp,
        }
      );

      const verifyData = verifyResponse.data;

      if (!verifyData?.success) {
        setErrors({ otp: verifyData?.message || "Invalid or expired OTP" });
        return;
      }

      // Save user to localStorage for auth
      localStorage.setItem(
        "skillAcademyUser",
        JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
        })
      );

      router.push("/skill-academy");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Verification failed. Please try again.";
      setApiError(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSkip = () => {
    router.push("/skill-academy");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-[#0f0820] to-[#1a0f2e] text-white flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden relative">
      {/* Ultra Premium Background - Multiple Layers */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Layer 1: Base Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/50 via-pink-500/30 to-transparent rounded-full blur-3xl animate-float opacity-80" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-purple-500/40 via-indigo-500/20 to-transparent rounded-full blur-3xl animate-float-delayed opacity-70" />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-r from-pink-600/25 via-purple-600/15 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow opacity-60" />

        {/* Layer 2: Additional Accent Orbs */}
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-gradient-to-bl from-purple-700/30 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] bg-gradient-to-tr from-pink-700/25 to-transparent rounded-full blur-3xl animate-float-reversed" />

        {/* Layer 3: Mesh/Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.3) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Layer 4: Fine Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0820]/40 opacity-60" />

        {/* Layer 5: Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise'/%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23fff' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Layer 6: Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.sin(i) * 80, 0],
              opacity: [0, 0.5, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            className="absolute rounded-full blur-sm"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 3 === 0
                  ? "rgba(168, 85, 247, 0.6)"
                  : i % 3 === 1
                  ? "rgba(236, 72, 153, 0.5)"
                  : "rgba(139, 92, 246, 0.4)",
              boxShadow: `0 0 ${Math.random() * 10 + 10}px ${
                i % 3 === 0
                  ? "rgba(168, 85, 247, 0.5)"
                  : i % 3 === 1
                  ? "rgba(236, 72, 153, 0.4)"
                  : "rgba(139, 92, 246, 0.3)"
              }`,
            }}
          />
        ))}
      </div>

      {/* Premium Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 border-b border-white/5 backdrop-blur-2xl bg-gradient-to-b from-white/8 via-white/3 to-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-3 text-gray-300 hover:text-white transition-all group px-4 py-2.5 rounded-xl hover:bg-white/8 border border-white/10 hover:border-purple-400/50 backdrop-blur-sm shadow-lg shadow-purple-500/5"
            >
              <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
              <span className="text-sm font-semibold">Go Back</span>
            </button>
          </motion.div>

          <motion.button
            onClick={handleSkip}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 text-sm font-bold text-gray-200 hover:text-white transition-all border border-purple-500/50 rounded-xl hover:border-pink-400/70 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/10 font-semibold backdrop-blur-md shadow-xl shadow-purple-500/20 hover:shadow-pink-500/30"
          >
            Skip for now
          </motion.button>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-lg mx-auto pt-16 sm:pt-24 pb-8">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Animated Icon with 3D effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 15,
            }}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-purple-600/60 relative group"
          >
            {/* Icon Background Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-400/30 to-pink-400/10 blur-xl group-hover:blur-2xl transition-all duration-500" />

            <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10" />
          </motion.div>

          {/* Premium Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Start Your Journey
            </h1>
            <p className="text-base sm:text-lg text-gray-400 px-4 leading-relaxed max-w-xl mx-auto">
              Unlock your potential and join thousands of successful learners
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-6 sm:gap-8">
            {/* Step 1 Circle */}
            <motion.div
              animate={{
                scale: step === 1 ? [1, 1.2, 1] : 1,
                boxShadow:
                  step === 1
                    ? "0 0 40px rgba(168, 85, 247, 0.8), inset 0 0 20px rgba(168, 85, 247, 0.4)"
                    : "0 0 0px rgba(168, 85, 247, 0)",
              }}
              transition={{
                duration: 2,
                repeat: step === 1 ? Infinity : 0,
              }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 transition-all font-bold text-lg sm:text-xl ${
                step >= 1
                  ? "bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 border-purple-300 text-white shadow-2xl"
                  : "border-gray-700/60 text-gray-600 bg-gray-900/40 backdrop-blur-sm"
              }`}
            >
              {step > 1 ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <CheckCircle className="w-8 h-8 sm:w-9 sm:h-9" />
                </motion.div>
              ) : (
                <span>1</span>
              )}
            </motion.div>

            {/* Progress Line */}
            <div className="relative w-24 sm:w-32 h-1.5 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 overflow-hidden shadow-inner shadow-black/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: step >= 2 ? "100%" : "0%" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full shadow-2xl shadow-purple-500/70"
              />
            </div>

            {/* Step 2 Circle */}
            <motion.div
              animate={{
                scale: step === 2 ? [1, 1.2, 1] : 1,
                boxShadow:
                  step === 2
                    ? "0 0 40px rgba(168, 85, 247, 0.8), inset 0 0 20px rgba(168, 85, 247, 0.4)"
                    : "0 0 0px rgba(168, 85, 247, 0)",
              }}
              transition={{
                duration: 2,
                repeat: step === 2 ? Infinity : 0,
              }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 transition-all font-bold text-lg sm:text-xl ${
                step >= 2
                  ? "bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 border-purple-300 text-white shadow-2xl"
                  : "border-gray-700/60 text-gray-600 bg-gray-900/40 backdrop-blur-sm"
              }`}
            >
              <span>2</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Premium Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative group"
        >
          {/* Outer Glow - Layer 1 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/60 via-pink-500/40 to-purple-600/60 rounded-3xl opacity-75 blur-2xl group-hover:opacity-100 transition-all duration-500 -z-10" />

          {/* Outer Glow - Layer 2 (Secondary) */}
          <div className="absolute -inset-2 bg-gradient-to-l from-indigo-600/30 to-pink-600/20 rounded-3xl opacity-40 blur-3xl group-hover:opacity-60 transition-all duration-500 -z-10" />

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-[#2a1a40]/95 via-[#3d2557]/80 to-[#4a2d5f]/70 backdrop-blur-3xl border border-gradient-to-tr from-white/20 via-white/12 to-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden group">
            {/* Card Inner Shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-3xl" />

            {/* Card Accent Line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-7 sm:space-y-8 relative z-10"
                >
                  {/* Section Header */}
                  <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                      Create Account
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      Fill in your details to begin your learning adventure
                    </p>
                  </div>

                  {/* Name Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-3"
                  >
                    <label className="text-xs sm:text-sm font-bold text-gray-200 flex items-center gap-2.5 uppercase tracking-widest">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/20">
                        <User className="w-4 h-4 text-purple-300" />
                      </div>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      className={`w-full px-6 py-4 sm:py-4.5 bg-white/8 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-gray-500/60 focus:outline-none transition-all duration-300 text-sm sm:text-base font-medium ${
                        errors.name
                          ? "border-red-500/60 focus:border-red-400 bg-red-500/10"
                          : "border-white/20 focus:border-purple-400/80 focus:bg-white/12 hover:bg-white/10 hover:border-white/30"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs sm:text-sm flex items-center gap-2 font-semibold"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="space-y-3"
                  >
                    <label className="text-xs sm:text-sm font-bold text-gray-200 flex items-center gap-2.5 uppercase tracking-widest">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/20">
                        <Mail className="w-4 h-4 text-purple-300" />
                      </div>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@example.com"
                      className={`w-full px-6 py-4 sm:py-4.5 bg-white/8 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-gray-500/60 focus:outline-none transition-all duration-300 text-sm sm:text-base font-medium ${
                        errors.email
                          ? "border-red-500/60 focus:border-red-400 bg-red-500/10"
                          : "border-white/20 focus:border-purple-400/80 focus:bg-white/12 hover:bg-white/10 hover:border-white/30"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs sm:text-sm flex items-center gap-2 font-semibold"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Phone Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-3"
                  >
                    <label className="text-xs sm:text-sm font-bold text-gray-200 flex items-center gap-2.5 uppercase tracking-widest">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/20">
                        <Phone className="w-4 h-4 text-purple-300" />
                      </div>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      className={`w-full px-6 py-4 sm:py-4.5 bg-white/8 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-gray-500/60 focus:outline-none transition-all duration-300 text-sm sm:text-base font-medium ${
                        errors.phone
                          ? "border-red-500/60 focus:border-red-400 bg-red-500/10"
                          : "border-white/20 focus:border-purple-400/80 focus:bg-white/12 hover:bg-white/10 hover:border-white/30"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs sm:text-sm flex items-center gap-2 font-semibold"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Premium CTA Button */}
                  <motion.button
                    onClick={handleSendOtp}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isOtpSent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="w-full py-4.5 sm:py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-2xl text-white font-black text-base sm:text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed border border-purple-400/40 hover:border-pink-300/60 relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    {isOtpSent ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        <span className="relative z-10">Sending Code...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">
                          Send Verification Code
                        </span>
                        <motion.div
                          whileHover={{ x: 6 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-5 h-5 relative z-10" />
                        </motion.div>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-7 sm:space-y-8 relative z-10"
                >
                  {/* Verification Header */}
                  <div className="text-center mb-8 sm:mb-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        duration: 0.7,
                        stiffness: 80,
                      }}
                      className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-600/50 relative group"
                    >
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10" />
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                      Verify Your Phone
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400">
                      Enter the 6-digit code we sent to
                    </p>
                    <p className="text-base sm:text-lg text-purple-300 font-bold mt-2 break-all tracking-wide">
                      {formData.phone}
                    </p>
                  </div>

                  {/* OTP Input - Premium */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-4"
                  >
                    <label className="text-xs sm:text-sm font-bold text-gray-200 text-center block uppercase tracking-widest">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={formData.otp}
                      onChange={(e) =>
                        handleInputChange(
                          "otp",
                          e.target.value.replace(/\D/g, "").slice(0, 6)
                        )
                      }
                      placeholder="●●●●●●"
                      className={`w-full px-6 py-6 sm:py-7 bg-gradient-to-br from-white/12 via-white/8 to-white/5 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-gray-500/40 focus:outline-none text-center text-5xl sm:text-6xl tracking-[0.3em] font-mono transition-all duration-300 shadow-inner shadow-black/50 ${
                        errors.otp
                          ? "border-red-500/60 bg-red-500/10 focus:border-red-400"
                          : "border-white/20 focus:border-purple-400/80 focus:bg-white/12 hover:bg-white/10"
                      }`}
                      maxLength={6}
                      autoFocus
                    />
                    <AnimatePresence>
                      {errors.otp && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs sm:text-sm flex items-center justify-center gap-2 font-semibold"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.otp}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Verify Button */}
                  <motion.button
                    onClick={handleVerifyOtp}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isVerifying || formData.otp.length !== 6}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="w-full py-4.5 sm:py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-2xl text-white font-black text-base sm:text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed border border-purple-400/40 hover:border-pink-300/60 relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    {isVerifying ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        <span className="relative z-10">Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Verify & Continue</span>
                        <motion.div
                          whileHover={{ x: 6 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle className="w-5 h-5 relative z-10" />
                        </motion.div>
                      </>
                    )}
                  </motion.button>

                  {/* Back & Resend Links */}
                  <motion.button
                    onClick={() => setStep(1)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full py-3 text-gray-400 hover:text-gray-200 transition-all text-sm flex items-center justify-center gap-2.5 group/back font-semibold"
                  >
                    <motion.div
                      whileHover={{ x: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </motion.div>
                    Edit Details
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-center pt-3 border-t border-white/10"
                  >
                    <button className="text-purple-300 hover:text-pink-300 transition-all text-xs sm:text-sm font-bold">
                      Didn't receive code?{" "}
                      <span className="underline decoration-purple-400 underline-offset-3 font-black">
                        Resend Now
                      </span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* API Error Message - Premium */}
            <AnimatePresence>
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="mt-6 p-5 sm:p-6 bg-gradient-to-r from-red-500/25 to-red-500/15 border border-red-500/50 rounded-2xl backdrop-blur-md relative z-20"
                >
                  <p className="text-xs sm:text-sm text-red-200 flex items-center gap-3 font-semibold">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{apiError}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Premium Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center text-gray-500 text-xs sm:text-sm mt-9 sm:mt-11 px-4 leading-relaxed font-medium"
        >
          By continuing, you agree to our{" "}
          <button className="text-purple-400 hover:text-pink-300 transition-all font-bold underline decoration-purple-500/50 underline-offset-3 hover:decoration-pink-500">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-purple-400 hover:text-pink-300 transition-all font-bold underline decoration-purple-500/50 underline-offset-3 hover:decoration-pink-500">
            Privacy Policy
          </button>
        </motion.p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(30px, 45px) rotate(8deg);
          }
        }
        @keyframes floatDelayed {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-30px, -45px) rotate(-8deg);
          }
        }
        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }
        @keyframes floatReversed {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, 20px);
          }
        }
        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.35;
          }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatDelayed 14s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: floatSlow 16s ease-in-out infinite;
        }
        .animate-float-reversed {
          animation: floatReversed 15s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
