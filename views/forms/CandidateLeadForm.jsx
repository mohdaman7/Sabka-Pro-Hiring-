"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, CheckCircle, Loader2, Sparkles, FileText, Mail, Phone, GraduationCap, Briefcase } from "lucide-react"

export default function CandidateLeadForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    qualification: "",
    jobPreferences: "",
    cvFile: null,
    registrationType: "free",
  })

  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, cvFile: "Please upload a PDF or Word document" }))
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, cvFile: "File size must be less than 5MB" }))
        return
      }
      setFormData((prev) => ({ ...prev, cvFile: file }))
      setErrors((prev) => ({ ...prev, cvFile: "" }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required"
    } else if (!/^\d{10}$/.test(formData.whatsapp.replace(/\D/g, ""))) {
      newErrors.whatsapp = "Invalid phone number (10 digits required)"
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = "Educational qualification is required"
    }

    if (!formData.jobPreferences.trim()) {
      newErrors.jobPreferences = "Job preferences are required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl border border-border shadow-2xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-3"
        >
          Welcome Aboard! 🎉
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
        >
          Your registration is complete. We'll reach out to you shortly via WhatsApp and email with exciting
          opportunities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-inner max-w-md mx-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-sm font-semibold text-foreground">Registration Summary</p>
          </div>
          <div className="space-y-3 text-left">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="text-sm font-medium text-foreground">{formData.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium text-foreground truncate ml-2">{formData.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  formData.registrationType === "pro"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {formData.registrationType === "pro" ? "Pro ⭐" : "Free"}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl border border-border shadow-2xl p-8 md:p-10 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="relative mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Start Your Career Journey</span>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">Candidate Registration</h1>
        <p className="text-muted-foreground text-lg">Join thousands of professionals finding their dream jobs</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        {/* Name Field */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Full Name <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
                errors.name
                  ? "border-destructive"
                  : focusedField === "name"
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-border"
              } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200`}
              placeholder="Enter your full name"
            />
          </div>
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email Field */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.email
                ? "border-destructive"
                : focusedField === "email"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200`}
            placeholder="your.email@example.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* WhatsApp Field */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <label
            htmlFor="whatsapp"
            className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-primary" />
            WhatsApp Number <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            onFocus={() => setFocusedField("whatsapp")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.whatsapp
                ? "border-destructive"
                : focusedField === "whatsapp"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200`}
            placeholder="+91 98765 43210"
          />
          <AnimatePresence>
            {errors.whatsapp && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.whatsapp}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Qualification Field */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <label
            htmlFor="qualification"
            className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-primary" />
            Educational Qualification <span className="text-destructive">*</span>
          </label>
          <select
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            onFocus={() => setFocusedField("qualification")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.qualification
                ? "border-destructive"
                : focusedField === "qualification"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground focus:outline-none transition-all duration-200`}
          >
            <option value="">Select your qualification</option>
            <option value="10th">10th Pass</option>
            <option value="12th">12th Pass</option>
            <option value="diploma">Diploma</option>
            <option value="graduate">Graduate</option>
            <option value="postgraduate">Post Graduate</option>
            <option value="phd">PhD</option>
          </select>
          <AnimatePresence>
            {errors.qualification && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.qualification}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Job Preferences Field */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <label
            htmlFor="jobPreferences"
            className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-primary" />
            Job Preferences <span className="text-destructive">*</span>
          </label>
          <textarea
            id="jobPreferences"
            name="jobPreferences"
            value={formData.jobPreferences}
            onChange={handleChange}
            onFocus={() => setFocusedField("jobPreferences")}
            onBlur={() => setFocusedField(null)}
            rows={4}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.jobPreferences
                ? "border-destructive"
                : focusedField === "jobPreferences"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 resize-none`}
            placeholder="e.g., Software Developer, Full-time, Remote, Mumbai"
          />
          <AnimatePresence>
            {errors.jobPreferences && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.jobPreferences}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CV Upload */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <label htmlFor="cvFile" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            Upload CV (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              id="cvFile"
              name="cvFile"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <label
              htmlFor="cvFile"
              className={`flex flex-col items-center justify-center gap-3 w-full px-6 py-8 bg-background/50 backdrop-blur-sm border-2 ${
                errors.cvFile
                  ? "border-destructive"
                  : formData.cvFile
                    ? "border-primary bg-primary/5"
                    : "border-dashed border-border"
              } rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 group`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground mb-1">
                  {formData.cvFile ? formData.cvFile.name : "Click to upload your CV"}
                </p>
                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX - Max 5MB</p>
              </div>
            </label>
          </div>
          <AnimatePresence>
            {errors.cvFile && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.cvFile}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Registration Type */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <label className="block text-sm font-semibold text-foreground mb-4">
            Choose Your Plan <span className="text-destructive">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.registrationType === "free"
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                  : "border-border bg-background/50 hover:border-border-light"
              }`}
            >
              <input
                type="radio"
                name="registrationType"
                value="free"
                checked={formData.registrationType === "free"}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-foreground">Free</span>
                <span className="text-3xl font-bold text-foreground">₹0</span>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Basic job listings access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Profile creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Limited applications</span>
                </li>
              </ul>
            </motion.label>

            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.registrationType === "pro"
                  ? "border-amber-500 bg-gradient-to-br from-amber-500/10 to-orange-500/10 shadow-lg shadow-amber-500/20"
                  : "border-border bg-background/50 hover:border-border-light"
              }`}
            >
              <input
                type="radio"
                name="registrationType"
                value="pro"
                checked={formData.registrationType === "pro"}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                POPULAR
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-foreground flex items-center gap-1">
                  Pro <Sparkles className="w-4 h-4 text-amber-500" />
                </span>
                <div className="text-right">
                  <span className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    ₹999
                  </span>
                  <span className="text-xs text-muted-foreground block">/month</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>Unlimited job applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>Video resume feature</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>Full training course access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>Priority support & profile highlighting</span>
                </li>
              </ul>
            </motion.label>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl transition-all duration-200 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Complete Registration
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </motion.button>

        <p className="text-sm text-muted-foreground text-center">
          By registering, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline font-medium">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline font-medium">
            Privacy Policy
          </a>
        </p>
      </form>
    </motion.div>
  )
}
