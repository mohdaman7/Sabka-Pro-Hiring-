"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Shield,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  CheckCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="absolute top-6 left-6 z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>
      </nav>

      {/* Skip Button */}
      <motion.button
        onClick={handleSkip}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-6 right-6 z-20 px-4 py-2 text-white/80 hover:text-white transition-colors border border-white/20 rounded-lg hover:border-white/40"
      >
        Skip Registration
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-20 h-20 mx-auto mb-6 relative"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Welcome to Sabka Skill Academy
          </h1>
          <p className="text-gray-400">
            Join thousands of students and start your learning journey
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                step >= 1
                  ? "bg-purple-500 border-purple-500 text-white"
                  : "border-gray-600 text-gray-400"
              }`}
            >
              {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
            </div>
            <div
              className={`w-16 h-1 rounded-full transition-all ${
                step >= 2 ? "bg-purple-500" : "bg-gray-600"
              }`}
            />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                step >= 2
                  ? "bg-purple-500 border-purple-500 text-white"
                  : "border-gray-600 text-gray-400"
              }`}
            >
              2
            </div>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
        >
          {step === 1 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center mb-6">
                Create Your Account
              </h2>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all ${
                    errors.name
                      ? "border-red-500"
                      : "border-white/20 focus:border-purple-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all ${
                    errors.email
                      ? "border-red-500"
                      : "border-white/20 focus:border-purple-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all ${
                    errors.phone
                      ? "border-red-500"
                      : "border-white/20 focus:border-purple-500"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <motion.button
                onClick={handleSendOtp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isOtpSent}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
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
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  Verify Your Phone
                </h2>
                <p className="text-gray-400 text-sm">
                  We've sent a verification code to
                  <br />
                  <span className="text-white font-medium">
                    {formData.phone}
                  </span>
                </p>
              </div>

              {/* OTP Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300">
                  Enter Verification Code
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
                  placeholder="Enter 6-digit code"
                  className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none text-center text-2xl tracking-widest transition-all ${
                    errors.otp
                      ? "border-red-500"
                      : "border-white/20 focus:border-purple-500"
                  }`}
                  maxLength={6}
                />
                {errors.otp && (
                  <p className="text-red-400 text-sm flex items-center justify-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.otp}
                  </p>
                )}
              </div>

              <motion.button
                onClick={handleVerifyOtp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isVerifying}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
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
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Continue
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              <button
                onClick={() => setStep(1)}
                className="w-full py-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← Back to edit details
              </button>

              <div className="text-center">
                <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                  Didn't receive code? Resend
                </button>
              </div>
            </div>
          )}
          {apiError && (
            <p className="mt-4 text-sm text-red-400 flex items-center gap-1">
              <X className="w-3 h-3" />
              {apiError}
            </p>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-gray-500 text-xs mt-6"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </div>
    </div>
  );
}
