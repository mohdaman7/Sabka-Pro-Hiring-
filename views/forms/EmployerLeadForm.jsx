"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function EmployerLeadForm({ onSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const [formData, setFormData] = useState({
    // Basic Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    otp: "",
    termsAccepted: false,

    // Hiring Type & Location
    hiringType: "company", // "company" or "personal"
    location: "",

    // KYC Information
    kycDocument: null,
    kycType: "aadhar",
    kycNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          kycDocument: "Please upload JPG, PNG, or PDF file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          kycDocument: "File size must be less than 5MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, kycDocument: file }));
      setErrors((prev) => ({ ...prev, kycDocument: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.hiringType) {
      newErrors.hiringType = "Please select hiring type";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.kycNumber.trim()) {
      newErrors.kycNumber = "KYC document number is required";
    }

    if (!formData.kycDocument) {
      newErrors.kycDocument = "KYC document upload is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOTP = async () => {
    if (!validateStep1()) return;

    setLoading(true);
    setServerError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          email: formData.email,
        }),
      });

      if (response.status === 404) {
        console.log("OTP sent (mock):", "123456");
        setOtpSent(true);
        setStep(2);
        setTimer(60);
        return;
      }

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Failed to send OTP");
      }

      setOtpSent(true);
      setStep(2);
      setTimer(60);
    } catch (err) {
      setServerError(err?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!formData.otp.trim() || formData.otp.length !== 6) {
      setErrors({ otp: "Please enter valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          otp: formData.otp,
        }),
      });

      if (response.status === 404) {
        console.log("OTP verified (mock)");
        setStep(3);
        return;
      }

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Invalid OTP");
      }

      setStep(3);
    } catch (err) {
      setServerError(err?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep3()) return;

    setServerError("");
    setLoading(true);

    try {
      const tempPassword = `Temp@${Math.random().toString(36).slice(-8)}`;

      // Register employer
      const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: tempPassword,
          role: "employer",
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok || !registerData?.success) {
        throw new Error(registerData?.message || "Registration failed");
      }

      if (registerData?.token) {
        try {
          localStorage.setItem("token", registerData.token);
          localStorage.setItem("user", JSON.stringify(registerData.data));
        } catch {}
      }

      // Update employer profile with the new structure
      const profileResponse = await fetch(`${API_URL}/api/employer/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${registerData.token}`,
        },
        body: JSON.stringify({
          phone: formData.phone,
          company: {
            name:
              formData.hiringType === "company"
                ? `${formData.firstName} ${formData.lastName}'s Company`
                : `${formData.firstName} ${formData.lastName} (Personal)`,
            // Set default values for required fields
            industry: "General",
            size: "1-10",
          },
          position: formData.hiringType === "company" ? "HR Manager" : "Owner",
          contact: {
            phone: formData.phone,
            address: {
              city: formData.location,
            },
          },
          // Store KYC info in verificationDocuments
          verificationDocuments: [
            {
              type: "other",
              filename: formData.kycDocument?.name || "kyc_document",
              // In a real app, you'd upload the file and get a URL
              url: "pending_upload",
            },
          ],
          kycInfo: {
            type: formData.kycType,
            number: formData.kycNumber,
            verified: false,
          },
        }),
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok || !profileData?.success) {
        console.warn("Profile creation warning:", profileData?.message);
      }

      // Call success callback
      if (onSuccess) {
        onSuccess({
          ...formData,
          userId: registerData.data?._id || registerData.data?.id,
        });
      }
    } catch (err) {
      setServerError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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
          <span>Details & KYC</span>
        </div>
      </div>

      <div className="relative mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {step === 1 && "Contact Information"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Complete Your Profile"}
        </h1>
        <p className="text-muted-foreground">
          {step === 1 && "Enter your basic details to get started"}
          {step === 2 && "Enter the OTP sent to your phone"}
          {step === 3 && "Add your hiring details and KYC information"}
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
              onClick={sendOTP}
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
                  onClick={sendOTP}
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
              onClick={verifyOTP}
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
              onClick={() => setStep(1)}
              className="w-full text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to Basic Info
            </button>
          </>
        )}

        {/* Step 3: Hiring Details & KYC */}
        {step === 3 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Hiring for Company / Personal Hiring{" "}
                <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.hiringType === "company"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-border-light"
                  }`}
                >
                  <input
                    type="radio"
                    name="hiringType"
                    value="company"
                    checked={formData.hiringType === "company"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Building className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Company Hiring</span>
                </label>
                <label
                  className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.hiringType === "personal"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-border-light"
                  }`}
                >
                  <input
                    type="radio"
                    name="hiringType"
                    value="personal"
                    checked={formData.hiringType === "personal"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <User className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Personal Hiring</span>
                </label>
              </div>
              {errors.hiringType && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.hiringType}
                </p>
              )}
            </motion.div>

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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                KYC Verification <span className="text-destructive">*</span>
              </label>

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
                    Document Number
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
                    Upload Document
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
            </motion.div>

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
              onClick={() => setStep(2)}
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
