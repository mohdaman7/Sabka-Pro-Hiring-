"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Upload,
  Loader2,
  Sparkles,
  Mail,
  Phone,
  User,
  MapPin,
  Building,
  Shield,
  CheckCircle,
  Briefcase,
  Globe,
  Users,
  ArrowLeft,
  Target,
  Rocket,
  Star,
  TrendingUp,
} from "lucide-react";

// Redux imports
import {
  updateField,
  updateFileField,
  setErrors,
  setStep,
  setTimer,
  decrementTimer,
  clearServerError,
} from "@/src/store/slices/employerSlice";
import {
  sendOTP,
  verifyOTP,
  registerEmployer,
} from "@/src/store/slices/employerSlice";
import {
  validateStep1,
  validateStep3,
  validateFile,
} from "@/src/store/utils/validation";

// Constants
const companySizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];
const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Hospitality",
  "Construction",
  "Transportation",
  "Media & Entertainment",
  "Real Estate",
  "Other",
];

export default function EmployerLeadForm({ onSuccess }) {
  const dispatch = useDispatch();
  const employerState = useSelector((state) => state.employer);

  const {
    formData,
    step,
    loading,
    serverError,
    otpSent,
    timer,
    errors,
    isRegistered,
  } = employerState;

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, dispatch]);

  // Handle success registration
  useEffect(() => {
    if (isRegistered && employerState.registrationResult && onSuccess) {
      onSuccess(employerState.registrationResult.formData);
    }
  }, [isRegistered, employerState.registrationResult, onSuccess]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      updateField({
        field: name,
        value: type === "checkbox" ? checked : value,
      })
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        dispatch(setErrors({ ...errors, kycDocument: fileError }));
        return;
      }
      dispatch(updateFileField({ field: "kycDocument", file }));
    }
  };

  const handleSendOTP = async () => {
    const step1Errors = validateStep1(formData);
    if (Object.keys(step1Errors).length > 0) {
      dispatch(setErrors(step1Errors));
      return;
    }
    dispatch(
      sendOTP({
        phone: formData.phone,
        email: formData.email,
      })
    );
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp.trim() || formData.otp.length !== 6) {
      dispatch(setErrors({ otp: "Please enter valid 6-digit OTP" }));
      return;
    }
    dispatch(
      verifyOTP({
        phone: formData.phone,
        otp: formData.otp,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const step3Errors = validateStep3(formData);
    if (Object.keys(step3Errors).length > 0) {
      dispatch(setErrors(step3Errors));
      const firstErrorField = Object.keys(step3Errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    dispatch(registerEmployer(formData));
  };

  const handleBack = () => {
    if (step > 1) {
      dispatch(setStep(step - 1));
      dispatch(clearServerError());
    }
  };

  const handleResendOTP = () => {
    if (timer === 0) {
      handleSendOTP();
    }
  };

  const handleBackToSelection = () => {
    window.location.href = "/register";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-5 h-full">
          {/* Sidebar - Full height */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-8 border-r border-white/10 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Employer Registration
                </h2>
                <p className="text-white/60">Find your perfect talent</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-6 mb-8 flex-1">
              {[
                {
                  number: 1,
                  title: "Contact Details",
                  desc: "Your personal information",
                },
                {
                  number: 2,
                  title: "OTP Verification",
                  desc: "Secure your account",
                },
                {
                  number: 3,
                  title: "Company Details",
                  desc: "Business information",
                },
              ].map((item, index) => (
                <div key={item.number} className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= item.number
                        ? "bg-white text-blue-600 shadow-lg shadow-blue-500/25"
                        : "bg-white/10 text-white/40 border border-white/20"
                    }`}
                  >
                    {step > item.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      item.number
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        step >= item.number ? "text-white" : "text-white/40"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">
                Why Register?
              </h3>
              {[
                { icon: Target, text: "Access verified candidate database" },
                { icon: Rocket, text: "Fast and efficient hiring process" },
                { icon: Star, text: "Premium employer branding" },
                { icon: TrendingUp, text: "Advanced recruitment analytics" },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-white/80"
                >
                  <benefit.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content - Full width */}
          <div className="lg:col-span-3 p-8">
            <div className="w-full max-w-none">
              {/* Header with Back Button */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handleBackToSelection}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Selection</span>
                </button>
              </div>

              {/* Main Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {step === 1 && "Contact Information"}
                  {step === 2 && "Secure Verification"}
                  {step === 3 && "Company Profile"}
                </h1>
                <p className="text-white/60 text-lg">
                  {step === 1 && "Enter your details to get started"}
                  {step === 2 && "Verify your identity with OTP"}
                  {step === 3 && "Tell us about your company"}
                </p>
              </div>

              <form
                onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}
                className="space-y-6"
              >
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-400" />
                          First Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-4 bg-white/5 border-2 ${
                            errors.firstName
                              ? "border-red-500/50"
                              : "border-white/10"
                          } rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.firstName}
                          </p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-400" />
                          Last Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-4 bg-white/5 border-2 ${
                            errors.lastName
                              ? "border-red-500/50"
                              : "border-white/10"
                          } rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.lastName}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-4 bg-white/5 border-2 ${
                          errors.email ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-400" />
                        Mobile Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-4 bg-white/5 border-2 ${
                          errors.phone ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.phone}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="flex items-start gap-3 cursor-pointer p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-white text-sm">
                          I accept the{" "}
                          <a
                            href="/terms"
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            Privacy Policy
                          </a>
                          <span className="text-red-400 ml-1">*</span>
                        </span>
                      </label>
                      {errors.termsAccepted && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.termsAccepted}
                        </p>
                      )}
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleSendOTP}
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Send Verification OTP
                        </>
                      )}
                    </motion.button>
                  </>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-10 h-10 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Verify Your Identity
                      </h3>
                      <p className="text-white/60 text-lg mb-6">
                        Enter the 6-digit OTP sent to your mobile
                      </p>

                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        maxLength={6}
                        className={`w-full max-w-md mx-auto px-4 py-4 bg-white/5 border-2 ${
                          errors.otp ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-blue-500 transition-all`}
                        placeholder="000000"
                      />
                      {errors.otp && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.otp}
                        </p>
                      )}
                    </motion.div>

                    <div className="text-center text-white/60">
                      {timer > 0 ? (
                        <p className="text-lg">Resend OTP in {timer}s</p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          className="text-blue-400 hover:text-blue-300 font-semibold text-lg"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Verify & Continue
                        </>
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full text-center text-white/60 hover:text-white transition-colors flex items-center justify-center gap-2 text-lg"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Contact Info
                    </button>
                  </>
                )}

                {/* Step 3: Company Details & KYC */}
                {step === 3 && (
                  <>
                    {/* Company Information Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 rounded-xl p-8 border border-white/10"
                    >
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Building className="w-6 h-6 text-blue-400" />
                        Company Information
                      </h3>

                      <div className="space-y-6">
                        {/* Position */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <label className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-blue-400" />
                            Your Position{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className={`w-full px-4 py-4 bg-white/5 border-2 ${
                              errors.position
                                ? "border-red-500/50"
                                : "border-white/10"
                            } rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all text-lg`}
                            placeholder="e.g., HR Manager, Recruiter, Founder"
                          />
                          {errors.position && (
                            <p className="mt-2 text-lg text-red-400">
                              {errors.position}
                            </p>
                          )}
                        </motion.div>

                        {/* Company Name */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <label className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Building className="w-5 h-5 text-blue-400" />
                            Company Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className={`w-full px-4 py-4 bg-white/5 border-2 ${
                              errors.companyName
                                ? "border-red-500/50"
                                : "border-white/10"
                            } rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all text-lg`}
                            placeholder="Enter company name"
                          />
                          {errors.companyName && (
                            <p className="mt-2 text-lg text-red-400">
                              {errors.companyName}
                            </p>
                          )}
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Industry */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <label className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                              <Users className="w-5 h-5 text-blue-400" />
                              Industry <span className="text-red-400">*</span>
                            </label>
                            <select
                              name="companyIndustry"
                              value={formData.companyIndustry}
                              onChange={handleChange}
                              className={`w-full px-4 py-4 bg-white/5 border-2 ${
                                errors.companyIndustry
                                  ? "border-red-500/50"
                                  : "border-white/10"
                              } rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg`}
                            >
                              <option value="">Select Industry</option>
                              {industries.map((industry) => (
                                <option key={industry} value={industry}>
                                  {industry}
                                </option>
                              ))}
                            </select>
                            {errors.companyIndustry && (
                              <p className="mt-2 text-lg text-red-400">
                                {errors.companyIndustry}
                              </p>
                            )}
                          </motion.div>

                          {/* Company Size */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <label className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                              <Users className="w-5 h-5 text-blue-400" />
                              Company Size{" "}
                              <span className="text-red-400">*</span>
                            </label>
                            <select
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleChange}
                              className={`w-full px-4 py-4 bg-white/5 border-2 ${
                                errors.companySize
                                  ? "border-red-500/50"
                                  : "border-white/10"
                              } rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg`}
                            >
                              <option value="">Select Size</option>
                              {companySizes.map((size) => (
                                <option key={size} value={size}>
                                  {size} employees
                                </option>
                              ))}
                            </select>
                            {errors.companySize && (
                              <p className="mt-2 text-lg text-red-400">
                                {errors.companySize}
                              </p>
                            )}
                          </motion.div>
                        </div>

                        {/* Website */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <label className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-blue-400" />
                            Company Website
                          </label>
                          <input
                            type="url"
                            name="companyWebsite"
                            value={formData.companyWebsite}
                            onChange={handleChange}
                            className="w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all text-lg"
                            placeholder="https://example.com"
                          />
                        </motion.div>

                        {/* Company Description */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <label className="text-lg font-semibold text-white mb-3">
                            Company Description
                          </label>
                          <textarea
                            name="companyDescription"
                            value={formData.companyDescription}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all resize-none text-lg"
                            placeholder="Brief description about your company..."
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Location */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        Location (City) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full px-4 py-4 bg-white/5 border-2 ${
                          errors.location
                            ? "border-red-500/50"
                            : "border-white/10"
                        } rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-all text-lg`}
                        placeholder="e.g., Bangalore, Mumbai, Delhi"
                      />
                      {errors.location && (
                        <p className="mt-2 text-lg text-red-400">
                          {errors.location}
                        </p>
                      )}
                    </motion.div>

                    {/* KYC Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 rounded-xl p-8 border border-white/10"
                    >
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-blue-400" />
                        KYC Verification <span className="text-red-400">*</span>
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <label className="text-lg font-medium text-white/80 mb-3 block">
                            Document Type
                          </label>
                          <select
                            name="kycType"
                            value={formData.kycType}
                            onChange={handleChange}
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg"
                          >
                            <option value="aadhar">Aadhar Card</option>
                            <option value="pan">PAN Card</option>
                            <option value="passport">Passport</option>
                            <option value="business_license">
                              Business License
                            </option>
                            <option value="gst">GST Certificate</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-lg font-medium text-white/80 mb-3 block">
                            Document Number{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="kycNumber"
                            value={formData.kycNumber}
                            onChange={handleChange}
                            className={`w-full px-4 py-4 bg-white/5 border-2 ${
                              errors.kycNumber
                                ? "border-red-500/50"
                                : "border-white/10"
                            } rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 text-lg`}
                            placeholder="Enter document number"
                          />
                          {errors.kycNumber && (
                            <p className="mt-2 text-lg text-red-400">
                              {errors.kycNumber}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-lg font-medium text-white/80 mb-3 block">
                            Upload Document{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="file"
                            id="kycDocument"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="hidden"
                          />
                          <label
                            htmlFor="kycDocument"
                            className={`flex flex-col items-center justify-center gap-4 w-full px-8 py-12 bg-white/5 border-2 ${
                              errors.kycDocument
                                ? "border-red-500/50"
                                : formData.kycDocument
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-dashed border-white/20"
                            } rounded-xl cursor-pointer hover:border-blue-500 transition-all duration-200`}
                          >
                            <Upload className="w-10 h-10 text-blue-400" />
                            <div className="text-center">
                              <p className="text-white font-bold text-lg">
                                {formData.kycDocument
                                  ? formData.kycDocument.name
                                  : "Click to upload document"}
                              </p>
                              <p className="text-white/60 text-base mt-2">
                                JPG, PNG, PDF - Max 5MB
                              </p>
                            </div>
                          </label>
                          {errors.kycDocument && (
                            <p className="mt-2 text-lg text-red-400">
                              {errors.kycDocument}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-xl"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Creating Company Account...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-6 h-6" />
                          Complete Registration
                        </>
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full text-center text-white/60 hover:text-white transition-colors flex items-center justify-center gap-2 text-lg"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to OTP Verification
                    </button>
                  </>
                )}

                {serverError && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg text-red-400 text-center bg-red-400/10 py-4 px-6 rounded-lg border border-red-400/20"
                  >
                    {serverError}
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
