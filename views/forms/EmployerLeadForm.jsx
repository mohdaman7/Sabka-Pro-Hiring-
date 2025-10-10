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

      // Scroll to the first error if any
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl border border-border shadow-2xl p-6 md:p-8 relative overflow-hidden max-w-2xl mx-auto"
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      {/* Progress Steps */}
      <div className="relative mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Basic Info</span>
          <span>OTP Verify</span>
          <span>Company & KYC</span>
        </div>
      </div>

      <div className="relative mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {step === 1 && "Contact Information"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Company Details & KYC"}
        </h1>
        <p className="text-muted-foreground">
          {step === 1 && "Enter your basic details to get started"}
          {step === 2 && "Enter the OTP sent to your phone"}
          {step === 3 && "Add your company information and complete KYC"}
        </p>
      </div>

      <form
        onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}
        className="space-y-6 relative"
      >
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  First Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 ${
                    errors.firstName ? "border-destructive" : "border-border"
                  } rounded-xl focus:outline-none focus:border-primary transition-all`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.firstName}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Last Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 ${
                    errors.lastName ? "border-destructive" : "border-border"
                  } rounded-xl focus:outline-none focus:border-primary transition-all`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.lastName}
                  </p>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 ${
                  errors.email ? "border-destructive" : "border-border"
                } rounded-xl focus:outline-none focus:border-primary transition-all`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Mobile Number <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 ${
                  errors.phone ? "border-destructive" : "border-border"
                } rounded-xl focus:outline-none focus:border-primary transition-all`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">
                  I accept the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  <span className="text-destructive ml-1">*</span>
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="mt-1 text-sm text-destructive">
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
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  Send OTP
                  <Sparkles className="w-5 h-5" />
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
            >
              <label className="text-sm font-semibold text-foreground mb-2 block text-center">
                Enter 6-Digit OTP
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                maxLength={6}
                className={`w-full px-4 py-4 bg-background/50 backdrop-blur-sm border-2 ${
                  errors.otp ? "border-destructive" : "border-border"
                } rounded-xl focus:outline-none focus:border-primary transition-all text-center text-2xl font-bold tracking-widest`}
                placeholder="000000"
              />
              {errors.otp && (
                <p className="mt-1 text-sm text-destructive text-center">
                  {errors.otp}
                </p>
              )}
            </motion.div>

            <div className="text-center text-sm text-muted-foreground">
              {timer > 0 ? (
                <p>Resend OTP in {timer}s</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-primary hover:underline"
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
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <button
              type="button"
              onClick={handleBack}
              className="w-full text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to Basic Info
            </button>
          </>
        )}

        {/* Step 3: Company Details & KYC */}
        {step === 3 && (
          <>
            {/* Company Information Section */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Company Information
              </h3>

              <div className="space-y-4">
                {/* Position */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Your Position <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 ${
                      errors.position ? "border-destructive" : "border-border"
                    } rounded-xl focus:outline-none focus:border-primary transition-all`}
                    placeholder="e.g., HR Manager, Recruiter, Founder"
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.position}
                    </p>
                  )}
                </motion.div>

                {/* Company Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4 text-primary" />
                    Company Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 ${
                      errors.companyName
                        ? "border-destructive"
                        : "border-border"
                    } rounded-xl focus:outline-none focus:border-primary transition-all`}
                    placeholder="Enter company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.companyName}
                    </p>
                  )}
                </motion.div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Industry */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Industry <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="companyIndustry"
                      value={formData.companyIndustry}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-background/50 border-2 ${
                        errors.companyIndustry
                          ? "border-destructive"
                          : "border-border"
                      } rounded-xl focus:outline-none focus:border-primary`}
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    {errors.companyIndustry && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.companyIndustry}
                      </p>
                    )}
                  </motion.div>

                  {/* Company Size */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Company Size <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-background/50 border-2 ${
                        errors.companySize
                          ? "border-destructive"
                          : "border-border"
                      } rounded-xl focus:outline-none focus:border-primary`}
                    >
                      <option value="">Select Size</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size} employees
                        </option>
                      ))}
                    </select>
                    {errors.companySize && (
                      <p className="mt-1 text-sm text-destructive">
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
                  <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    Company Website
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all"
                    placeholder="https://example.com"
                  />
                </motion.div>

                {/* Company Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="text-sm font-semibold text-foreground mb-2">
                    Company Description
                  </label>
                  <textarea
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all resize-none"
                    placeholder="Brief description about your company..."
                  />
                </motion.div>
              </div>
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Location (City) <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 ${
                  errors.location ? "border-destructive" : "border-border"
                } rounded-xl focus:outline-none focus:border-primary transition-all`}
                placeholder="e.g., Bangalore, Mumbai, Delhi"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.location}
                </p>
              )}
            </motion.div>

            {/* KYC Section */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                KYC Verification <span className="text-destructive">*</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">
                    Document Type
                  </label>
                  <select
                    name="kycType"
                    value={formData.kycType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary"
                  >
                    <option value="aadhar">Aadhar Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="passport">Passport</option>
                    <option value="business_license">Business License</option>
                    <option value="gst">GST Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">
                    Document Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="kycNumber"
                    value={formData.kycNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-background/50 border-2 ${
                      errors.kycNumber ? "border-destructive" : "border-border"
                    } rounded-xl focus:outline-none focus:border-primary`}
                    placeholder="Enter document number"
                  />
                  {errors.kycNumber && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.kycNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">
                    Upload Document <span className="text-destructive">*</span>
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
                    className={`flex flex-col items-center justify-center gap-2 w-full px-6 py-6 bg-background/50 backdrop-blur-sm border-2 ${
                      errors.kycDocument
                        ? "border-destructive"
                        : formData.kycDocument
                        ? "border-primary bg-primary/5"
                        : "border-dashed border-border"
                    } rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 group`}
                  >
                    <Upload className="w-6 h-6 text-primary" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">
                        {formData.kycDocument
                          ? formData.kycDocument.name
                          : "Click to upload document"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG, PDF - Max 5MB
                      </p>
                    </div>
                  </label>
                  {errors.kycDocument && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.kycDocument}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Complete Registration
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <button
              type="button"
              onClick={handleBack}
              className="w-full text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to OTP Verification
            </button>
          </>
        )}

        {serverError && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive text-center bg-destructive/10 py-2 px-4 rounded-lg"
          >
            {serverError}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}
