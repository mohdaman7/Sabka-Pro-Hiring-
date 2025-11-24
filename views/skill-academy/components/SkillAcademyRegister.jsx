"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function SkillAcademyRegister() {
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
    setIsOtpSent(true);
    // Simulate API call
    setTimeout(() => {
      setIsOtpSent(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp.trim()) {
      setErrors({ otp: "Please enter the OTP" });
      return;
    }
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      alert("Registration successful!");
    }, 1500);
  };

  const handleSkip = () => {
    alert("Skipped to main page");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a1a3f] via-[#3d2557] to-[#4a2d5f] text-white flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden relative">
      {/* Background Effects - Matching Review Page */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#7c3a93]/30 to-[#9463a8]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-[#8b4fa8]/25 to-[#692c7a]/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#9463a8]/15 to-transparent rounded-full blur-3xl animate-pulse-slow" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-[#b893d1]/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-lg hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base font-medium">Back</span>
            </button>
          </motion.div>

          <motion.button
            onClick={handleSkip}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base text-gray-300 hover:text-white transition-all border border-white/20 rounded-lg hover:border-[#9463a8]/50 hover:bg-white/5 font-medium backdrop-blur-sm"
          >
            Skip for now
          </motion.button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto pt-6 sm:pt-12">
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white via-[#b893d1] to-[#d8b4f0] bg-clip-text text-transparent"
          >
            Welcome to Sabka Skill Academy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base text-gray-400 px-4"
          >
            Begin your journey to excellence
          </motion.p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              animate={{
                scale: step === 1 ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: step === 1 ? Infinity : 0,
              }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                step >= 1
                  ? "bg-gradient-to-r from-[#7c3a93] to-[#9463a8] border-transparent text-white shadow-lg shadow-[#7c3a93]/50"
                  : "border-gray-500/50 text-gray-500 bg-[#2a1a3f]/30"
              }`}
            >
              {step > 1 ? (
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <span className="text-sm sm:text-base font-semibold">1</span>
              )}
            </motion.div>

            <div className="relative w-16 sm:w-20 h-1">
              <div className="absolute inset-0 bg-gray-600/30 rounded-full" />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: step >= 2 ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-[#7c3a93] to-[#9463a8] rounded-full shadow-md shadow-[#7c3a93]/30"
              />
            </div>

            <motion.div
              animate={{
                scale: step === 2 ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: step === 2 ? Infinity : 0,
              }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                step >= 2
                  ? "bg-gradient-to-r from-[#7c3a93] to-[#9463a8] border-transparent text-white shadow-lg shadow-[#7c3a93]/50"
                  : "border-gray-500/50 text-gray-500 bg-[#2a1a3f]/30"
              }`}
            >
              <span className="text-sm sm:text-base font-semibold">2</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Registration Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative"
        >
          {/* Card Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7c3a93]/40 via-[#8b4fa8]/30 to-[#9463a8]/40 rounded-3xl opacity-50 blur-lg" />

          {/* Card Content */}
          <div className="relative bg-[#3d2557]/60 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 sm:space-y-6"
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                      Create Your Account
                    </h2>
                    <p className="text-sm text-gray-400">
                      Enter your details to get started
                    </p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 sm:py-3.5 bg-white/5 border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all text-sm sm:text-base ${
                        errors.name
                          ? "border-red-500 focus:border-red-400"
                          : "border-white/20 focus:border-[#9463a8] focus:bg-white/10"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs sm:text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 sm:py-3.5 bg-white/5 border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all text-sm sm:text-base ${
                        errors.email
                          ? "border-red-500 focus:border-red-400"
                          : "border-white/20 focus:border-[#9463a8] focus:bg-white/10"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs sm:text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 sm:py-3.5 bg-white/5 border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all text-sm sm:text-base ${
                        errors.phone
                          ? "border-red-500 focus:border-red-400"
                          : "border-white/20 focus:border-[#9463a8] focus:bg-white/10"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs sm:text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    onClick={handleSendOtp}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isOtpSent}
                    className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#7c3a93] via-[#8b4fa8] to-[#9463a8] rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-[#7c3a93]/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base mt-2 hover:scale-[1.02] active:scale-[0.98]"
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
                        Continue
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 sm:space-y-6"
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#7c3a93] to-[#9463a8] flex items-center justify-center shadow-xl shadow-[#7c3a93]/50"
                    >
                      <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                      Verify Your Phone
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 px-4">
                      We've sent a verification code to
                    </p>
                    <p className="text-sm sm:text-base text-white font-medium mt-1">
                      {formData.phone}
                    </p>
                  </div>

                  {/* OTP Input */}
                  <div className="space-y-3">
                    <label className="text-xs sm:text-sm font-medium text-gray-300 text-center block">
                      Enter 6-Digit Code
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
                      placeholder="000000"
                      className={`w-full px-4 py-4 sm:py-5 bg-[#2a1a3f]/50 border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none text-center text-2xl sm:text-3xl tracking-[0.5em] font-mono transition-all shadow-inner ${
                        errors.otp
                          ? "border-red-500/50 focus:border-red-400 bg-red-500/5"
                          : "border-white/10 focus:border-[#9463a8] focus:bg-[#2a1a3f]/70 focus:shadow-lg focus:shadow-[#9463a8]/10"
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
                          className="text-red-400 text-xs sm:text-sm flex items-center justify-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.otp}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    onClick={handleVerifyOtp}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isVerifying || formData.otp.length !== 6}
                    className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#7c3a93] via-[#8b4fa8] to-[#9463a8] rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-[#7c3a93]/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98]"
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
                    className="w-full py-2.5 text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2 group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to edit details
                  </button>

                  <div className="text-center pt-2">
                    <button className="text-[#b893d1] hover:text-[#d8b4f0] transition-colors text-xs sm:text-sm font-medium">
                      Didn't receive code? Resend
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* API Error */}
            <AnimatePresence>
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-xs sm:text-sm text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{apiError}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-gray-500 text-xs sm:text-sm mt-6 px-4"
        >
          By continuing, you agree to our{" "}
          <button className="text-[#b893d1] hover:text-[#d8b4f0] transition-colors">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-[#b893d1] hover:text-[#d8b4f0] transition-colors">
            Privacy Policy
          </button>
        </motion.p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 30px);
          }
        }
        @keyframes floatDelayed {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, -30px);
          }
        }
        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
