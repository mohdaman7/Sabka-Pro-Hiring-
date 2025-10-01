"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Loader2, Sparkles, Building2, User, Mail, Phone, Users, Briefcase, FileText } from "lucide-react"

export default function EmployerLeadForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    hiringNeeds: "",
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

  const validate = () => {
    const newErrors = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required"
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number (10 digits required)"
    }

    if (!formData.companySize) {
      newErrors.companySize = "Company size is required"
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required"
    }

    if (!formData.hiringNeeds.trim()) {
      newErrors.hiringNeeds = "Hiring needs are required"
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
          Registration Submitted! 🎉
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
        >
          Thank you for your interest. Our team will verify your company details and contact you within 24-48 hours.
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
              <span className="text-sm text-muted-foreground">Company</span>
              <span className="text-sm font-medium text-foreground">{formData.companyName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Contact</span>
              <span className="text-sm font-medium text-foreground">{formData.contactPerson}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium text-foreground truncate ml-2">{formData.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  formData.registrationType === "premium"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {formData.registrationType === "premium" ? "Premium ⭐" : "Free"}
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
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="relative mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4"
        >
          <Building2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Find Top Talent</span>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">Employer Registration</h1>
        <p className="text-muted-foreground text-lg">Connect with verified candidates and build your dream team</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        {/* Company Name */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label
            htmlFor="companyName"
            className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-primary" />
            Company Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            onFocus={() => setFocusedField("companyName")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.companyName
                ? "border-destructive"
                : focusedField === "companyName"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200`}
            placeholder="Enter your company name"
          />
          <AnimatePresence>
            {errors.companyName && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.companyName}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Person */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label
            htmlFor="contactPerson"
            className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
          >
            <User className="w-4 h-4 text-primary" />
            Contact Person Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            onFocus={() => setFocusedField("contactPerson")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.contactPerson
                ? "border-destructive"
                : focusedField === "contactPerson"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200`}
            placeholder="Enter contact person name"
          />
          <AnimatePresence>
            {errors.contactPerson && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.contactPerson}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <label htmlFor="email" className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Business Email <span className="text-destructive">*</span>
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
            placeholder="company@example.com"
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

        {/* Phone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <label htmlFor="phone" className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Phone Number <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.phone
                ? "border-destructive"
                : focusedField === "phone"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200`}
            placeholder="+91 98765 43210"
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Company Size */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <label
            htmlFor="companySize"
            className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-primary" />
            Company Size <span className="text-destructive">*</span>
          </label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            onFocus={() => setFocusedField("companySize")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.companySize
                ? "border-destructive"
                : focusedField === "companySize"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground focus:outline-none transition-all duration-200`}
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
          <AnimatePresence>
            {errors.companySize && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.companySize}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Industry */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <label
            htmlFor="industry"
            className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-primary" />
            Industry <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            onFocus={() => setFocusedField("industry")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.industry
                ? "border-destructive"
                : focusedField === "industry"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200`}
            placeholder="e.g., IT, Healthcare, Finance, Manufacturing"
          />
          <AnimatePresence>
            {errors.industry && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.industry}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hiring Needs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <label
            htmlFor="hiringNeeds"
            className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-primary" />
            Current Hiring Needs <span className="text-destructive">*</span>
          </label>
          <textarea
            id="hiringNeeds"
            name="hiringNeeds"
            value={formData.hiringNeeds}
            onChange={handleChange}
            onFocus={() => setFocusedField("hiringNeeds")}
            onBlur={() => setFocusedField(null)}
            rows={4}
            className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
              errors.hiringNeeds
                ? "border-destructive"
                : focusedField === "hiringNeeds"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
            } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 resize-none`}
            placeholder="Describe the positions you're looking to fill and any specific requirements"
          />
          <AnimatePresence>
            {errors.hiringNeeds && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors.hiringNeeds}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Registration Type */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <label className="block text-sm font-semibold text-foreground mb-4">
            Choose Plan <span className="text-destructive">*</span>
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
                  <span>Post up to 3 jobs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Basic candidate search</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
            </motion.label>

            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.registrationType === "premium"
                  ? "border-blue-500 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 shadow-lg shadow-blue-500/20"
                  : "border-border bg-background/50 hover:border-border-light"
              }`}
            >
              <input
                type="radio"
                name="registrationType"
                value="premium"
                checked={formData.registrationType === "premium"}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                RECOMMENDED
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-foreground flex items-center gap-1">
                  Premium <Sparkles className="w-4 h-4 text-blue-500" />
                </span>
                <div className="text-right">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    ₹4,999
                  </span>
                  <span className="text-xs text-muted-foreground block">/month</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Unlimited job postings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Advanced candidate filtering</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Priority support & fast-track verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>ATS integration & analytics dashboard</span>
                </li>
              </ul>
            </motion.label>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl transition-all duration-200 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Registration
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
