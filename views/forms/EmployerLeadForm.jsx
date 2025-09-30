"use client"

import { useState } from "react"
import { CheckCircle, Loader2 } from "lucide-react"

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-surface rounded-xl border border-border p-8 text-center">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Registration Submitted!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for your interest in Sabka Pro HIRIN. Our team will verify your company details and contact you
          within 24-48 hours.
        </p>
        <div className="bg-background rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Your registration details:</p>
          <div className="space-y-1 text-sm">
            <p className="text-foreground">
              <span className="text-muted-foreground">Company:</span> {formData.companyName}
            </p>
            <p className="text-foreground">
              <span className="text-muted-foreground">Contact:</span> {formData.contactPerson}
            </p>
            <p className="text-foreground">
              <span className="text-muted-foreground">Email:</span> {formData.email}
            </p>
            <p className="text-foreground">
              <span className="text-muted-foreground">Plan:</span>{" "}
              <span className={formData.registrationType === "premium" ? "text-accent font-semibold" : ""}>
                {formData.registrationType === "premium" ? "Premium" : "Free"}
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Employer Registration</h1>
        <p className="text-muted-foreground">
          Register your company to access verified candidates and post job openings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
            Company Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${
              errors.companyName ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
            placeholder="Enter your company name"
          />
          {errors.companyName && <p className="mt-1 text-sm text-destructive">{errors.companyName}</p>}
        </div>

        {/* Contact Person */}
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-foreground mb-2">
            Contact Person Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${
              errors.contactPerson ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
            placeholder="Enter contact person name"
          />
          {errors.contactPerson && <p className="mt-1 text-sm text-destructive">{errors.contactPerson}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Business Email <span className="text-destructive">*</span>
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
            placeholder="company@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${
              errors.phone ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
        </div>

        {/* Company Size */}
        <div>
          <label htmlFor="companySize" className="block text-sm font-medium text-foreground mb-2">
            Company Size <span className="text-destructive">*</span>
          </label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${
              errors.companySize ? "border-destructive" : "border-border"
            } rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
          {errors.companySize && <p className="mt-1 text-sm text-destructive">{errors.companySize}</p>}
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
            Industry <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${
              errors.industry ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
            placeholder="e.g., IT, Healthcare, Finance, Manufacturing"
          />
          {errors.industry && <p className="mt-1 text-sm text-destructive">{errors.industry}</p>}
        </div>

        {/* Hiring Needs */}
        <div>
          <label htmlFor="hiringNeeds" className="block text-sm font-medium text-foreground mb-2">
            Current Hiring Needs <span className="text-destructive">*</span>
          </label>
          <textarea
            id="hiringNeeds"
            name="hiringNeeds"
            value={formData.hiringNeeds}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 bg-background border ${
              errors.hiringNeeds ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
            placeholder="Describe the positions you're looking to fill and any specific requirements"
          />
          {errors.hiringNeeds && <p className="mt-1 text-sm text-destructive">{errors.hiringNeeds}</p>}
        </div>

        {/* Registration Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Choose Plan <span className="text-destructive">*</span>
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
                <li>• Post up to 3 jobs</li>
                <li>• Basic candidate search</li>
                <li>• Email support</li>
                <li>• Manual verification</li>
              </ul>
            </label>

            <label
              className={`relative flex flex-col p-6 border-2 rounded-lg cursor-pointer transition-all ${
                formData.registrationType === "premium"
                  ? "border-accent bg-accent/5"
                  : "border-border bg-background hover:border-border-light"
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-foreground">Premium</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-accent">₹4,999</span>
                  <span className="text-xs text-muted-foreground block">/month</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Unlimited job postings</li>
                <li>• Advanced candidate filtering</li>
                <li>• Priority support</li>
                <li>• Fast-track verification</li>
                <li>• ATS integration</li>
                <li>• Analytics dashboard</li>
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
            "Submit Registration"
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
