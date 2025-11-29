"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
  GraduationCap,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(100, 116, 139) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
      </div>

      {/* Clean Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <button
              onClick={handleSkip}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
            >
              Skip for now
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full max-w-md mx-auto pt-24 pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Join Sabka Skill Academy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Start your learning journey today
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            {/* Step 1 */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                step >= 1
                  ? "bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-md"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
            </div>

            {/* Line */}
            <div className="relative w-20 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full transition-all duration-500 ${
                  step >= 2 ? "w-full" : "w-0"
                }`}
              />
            </div>

            {/* Step 2 */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                step >= 2
                  ? "bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-md"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 sm:p-8">
          {step === 1 ? (
            <div className="space-y-5">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Create Your Account
                </h2>
                <p className="text-sm text-slate-600">
                  Enter your details to get started
                </p>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                        : "border-slate-200 focus:ring-orange-500/20 focus:border-orange-500 hover:border-slate-300"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                        : "border-slate-200 focus:ring-orange-500/20 focus:border-orange-500 hover:border-slate-300"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                        : "border-slate-200 focus:ring-orange-500/20 focus:border-orange-500 hover:border-slate-300"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSendOtp}
                disabled={isOtpSent}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-6 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isOtpSent ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Verify Your Phone
                </h2>
                <p className="text-sm text-slate-600">
                  Enter the 6-digit code sent to
                </p>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {formData.phone}
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 text-center">
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
                  placeholder="000000"
                  className={`w-full px-4 py-4 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 text-center text-2xl tracking-[0.5em] font-mono transition-all ${
                    errors.otp
                      ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                      : "border-slate-200 focus:ring-orange-500/20 focus:border-orange-500"
                  }`}
                  maxLength={6}
                  autoFocus
                />
                {errors.otp && (
                  <p className="text-red-600 text-xs mt-1.5 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.otp}
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyOtp}
                disabled={isVerifying || formData.otp.length !== 6}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Back Button */}
              <button
                onClick={() => setStep(1)}
                className="w-full py-2.5 text-slate-600 hover:text-slate-900 transition-colors text-sm flex items-center justify-center gap-2 hover:bg-slate-50 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Details</span>
              </button>

              {/* Resend Link */}
              <div className="text-center pt-4 border-t border-slate-100">
                <button
                  onClick={handleSendOtp}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Didn't receive the code?{" "}
                  <span className="text-orange-600 font-semibold hover:underline">
                    Resend
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* API Error Message */}
          {apiError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-in fade-in duration-200">
              <p className="text-sm text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{apiError}</span>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6 px-4 leading-relaxed">
          By continuing, you agree to our{" "}
          <button className="text-slate-700 hover:underline font-medium">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-slate-700 hover:underline font-medium">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
}
