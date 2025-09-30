"use client"

import { useState } from "react"
import { useLeadViewModel } from "@/viewmodels/LeadViewModel"
import { Upload, CheckCircle, Loader2 } from "lucide-react"

export default function CandidateLeadForm() {
  const { createLead, loading } = useLeadViewModel()
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, cvFile: "Please upload a PDF or Word document" }))
        return
      }
      // Validate file size (max 5MB)
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

    const result = await createLead({
      ...formData,
      source: "website",
      cvUrl: formData.cvFile ? URL.createObjectURL(formData.cvFile) : null,
    })

    if (result.success) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="bg-surface rounded-xl border border-border p-8 text-center">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for registering with Sabka Pro HIRIN. We will contact you shortly via WhatsApp and email.
        </p>
        <div className="bg-background rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Your registration details:</p>
          <div className="space-y-1 text-sm">
            <p className="text-foreground">
              <span className="text-muted-foreground">Name:</span> {formData.name}
            </p>
            <p className="text-foreground">
              <span className="text-muted-foreground">Email:</span> {formData.email}
            </p>
            <p className="text-foreground">
              <span className="text-muted-foreground">Plan:</span>{" "}
              <span className={formData.registrationType === "pro" ? "text-accent font-semibold" : ""}>
                {formData.registrationType === "pro" ? "Pro" : "Free"}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Candidate Registration</h1>
        <p className="text-muted-foreground">Fill in your details to get started with your job search journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${
              errors.name ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${
              errors.email ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-2">
            WhatsApp Number <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${
              errors.whatsapp ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
            placeholder="+91 98765 43210"
          />
          {errors.whatsapp && <p className="mt-1 text-sm text-destructive">{errors.whatsapp}</p>}
        </div>

        {/* Educational Qualification */}
        <div>
          <label htmlFor="qualification" className="block text-sm font-medium text-foreground mb-2">
            Educational Qualification <span className="text-destructive">*</span>
          </label>
          <select
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${
              errors.qualification ? "border-destructive" : "border-border"
            } rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
          >
            <option value="">Select your qualification</option>
            <option value="10th">10th Pass</option>
            <option value="12th">12th Pass</option>
            <option value="diploma">Diploma</option>
            <option value="graduate">Graduate</option>
            <option value="postgraduate">Post Graduate</option>
            <option value="phd">PhD</option>
          </select>
          {errors.qualification && <p className="mt-1 text-sm text-destructive">{errors.qualification}</p>}
        </div>

        {/* Job Preferences */}
        <div>
          <label htmlFor="jobPreferences" className="block text-sm font-medium text-foreground mb-2">
            Job Preferences <span className="text-destructive">*</span>
          </label>
          <textarea
            id="jobPreferences"
            name="jobPreferences"
            value={formData.jobPreferences}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 bg-background border ${
              errors.jobPreferences ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
            placeholder="e.g., Software Developer, Full-time, Remote, Mumbai"
          />
          {errors.jobPreferences && <p className="mt-1 text-sm text-destructive">{errors.jobPreferences}</p>}
        </div>

        {/* CV Upload */}
        <div>
          <label htmlFor="cvFile" className="block text-sm font-medium text-foreground mb-2">
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
              className={`flex items-center justify-center gap-2 w-full px-4 py-8 bg-background border-2 ${
                errors.cvFile ? "border-destructive" : "border-dashed border-border"
              } rounded-lg cursor-pointer hover:border-primary transition-colors`}
            >
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {formData.cvFile ? formData.cvFile.name : "Click to upload CV (PDF, DOC, DOCX - Max 5MB)"}
              </span>
            </label>
          </div>
          {errors.cvFile && <p className="mt-1 text-sm text-destructive">{errors.cvFile}</p>}
        </div>

        {/* Registration Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Choose Registration Type <span className="text-destructive">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <label
              className={`relative flex flex-col p-6 border-2 rounded-lg cursor-pointer transition-all ${
                formData.registrationType === "free"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-border-light"
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-foreground">Free</span>
                <span className="text-2xl font-bold text-foreground">₹0</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Basic job listings access</li>
                <li>• Profile creation</li>
                <li>• Limited applications</li>
                <li>• Introduction videos only</li>
              </ul>
            </label>

            <label
              className={`relative flex flex-col p-6 border-2 rounded-lg cursor-pointer transition-all ${
                formData.registrationType === "pro"
                  ? "border-accent bg-accent/5"
                  : "border-border bg-background hover:border-border-light"
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-foreground">Pro</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-accent">₹999</span>
                  <span className="text-xs text-muted-foreground block">/month</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Unlimited job applications</li>
                <li>• Video resume feature</li>
                <li>• Full training course access</li>
                <li>• Priority support</li>
                <li>• Profile highlighting</li>
              </ul>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Complete Registration"
          )}
        </button>

        <p className="text-sm text-muted-foreground text-center">
          By registering, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </form>
    </div>
  )
}
