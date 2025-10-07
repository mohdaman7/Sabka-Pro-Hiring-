"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  CheckCircle,
  Loader2,
  Sparkles,
  FileText,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Eye,
  EyeOff,
  Lock,
  MapPin,
  Calendar,
  BookOpen,
  User,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function CandidateLeadForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    registrationType: "free",

    // Address
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },

    // Education
    education: [
      {
        degree: "",
        institution: "",
        fieldOfStudy: "",
        graduationYear: new Date().getFullYear(),
        gpa: "",
        currentlyEnrolled: false,
      },
    ],

    // Job Preferences
    jobPreferences: {
      preferredRoles: [""],
      preferredLocations: [""],
      jobTypes: [],
      expectedSalary: {
        min: "",
        max: "",
        currency: "INR",
      },
      willingToRelocate: false,
    },

    // Skills
    skills: [""],

    // Career Plan
    careerPlan: {
      shortTermGoals: "",
      longTermGoals: "",
      areasOfInterest: [""],
    },

    // Files
    cvFile: null,
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child, subChild] = name.split(".");
      if (subChild) {
        // Handle nested objects like address.street
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [subChild]: type === "checkbox" ? checked : value,
            },
          },
        }));
      } else {
        // Handle first level nested objects
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === "checkbox" ? checked : value,
          },
        }));
      }
    } else {
      // Handle top level fields
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Fixed array handling functions
  const handleArrayChange = (fieldPath, index, value) => {
    setFormData((prev) => {
      const fields = fieldPath.split(".");
      let updated = { ...prev };
      let current = updated;

      // Navigate to the parent object
      for (let i = 0; i < fields.length - 1; i++) {
        current[fields[i]] = { ...current[fields[i]] };
        current = current[fields[i]];
      }

      const lastField = fields[fields.length - 1];
      if (Array.isArray(current[lastField])) {
        const newArray = [...current[lastField]];
        newArray[index] = value;
        current[lastField] = newArray;
      }

      return updated;
    });
  };

  const addArrayField = (fieldPath, initialValue = "") => {
    setFormData((prev) => {
      const fields = fieldPath.split(".");
      let updated = { ...prev };
      let current = updated;

      // Navigate to the parent object
      for (let i = 0; i < fields.length - 1; i++) {
        current[fields[i]] = { ...current[fields[i]] };
        current = current[fields[i]];
      }

      const lastField = fields[fields.length - 1];
      if (Array.isArray(current[lastField])) {
        current[lastField] = [...current[lastField], initialValue];
      }

      return updated;
    });
  };

  const removeArrayField = (fieldPath, index) => {
    setFormData((prev) => {
      const fields = fieldPath.split(".");
      let updated = { ...prev };
      let current = updated;

      // Navigate to the parent object
      for (let i = 0; i < fields.length - 1; i++) {
        current[fields[i]] = { ...current[fields[i]] };
        current = current[fields[i]];
      }

      const lastField = fields[fields.length - 1];
      if (Array.isArray(current[lastField])) {
        current[lastField] = current[lastField].filter((_, i) => i !== index);
      }

      return updated;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          cvFile: "Please upload a PDF or Word document",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          cvFile: "File size must be less than 5MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, cvFile: file }));
      setErrors((prev) => ({ ...prev, cvFile: "" }));
    }
  };

  const validate = () => {
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

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }

    if (!formData.education[0]?.degree.trim()) {
      newErrors.education = "At least one education entry is required";
    }

    if (!formData.jobPreferences.preferredRoles[0]?.trim()) {
      newErrors.preferredRoles = "At least one preferred role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setServerError("");
    setLoading(true);

    try {
      // Register user
      const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: "student",
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok || !registerData?.success) {
        throw new Error(registerData?.message || "Registration failed");
      }

      // Store token
      if (registerData?.token) {
        try {
          localStorage.setItem("token", registerData.token);
          localStorage.setItem("user", JSON.stringify(registerData.data));
        } catch {}
      }

      // Create student profile
      const profileResponse = await fetch(`${API_URL}/api/student/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${registerData.token}`,
        },
        body: JSON.stringify({
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          address: formData.address,
          education: formData.education,
          jobPreferences: formData.jobPreferences,
          skills: formData.skills
            .filter((skill) => skill.trim() !== "")
            .map((skill) => ({ name: skill, level: "intermediate" })),
          careerPlan: formData.careerPlan,
        }),
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok || !profileData?.success) {
        console.warn("Profile creation warning:", profileData?.message);
        // Continue even if profile creation has issues
      }

      setSubmitted(true);
    } catch (err) {
      setServerError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          Welcome Aboard! 🎉
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
        >
          Your registration is complete. You can now complete your profile and
          start applying for jobs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-inner max-w-md mx-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Registration Summary
            </p>
          </div>
          <div className="space-y-3 text-left">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="text-sm font-medium text-foreground">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium text-foreground truncate ml-2">
                {formData.email}
              </span>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={() => (window.location.href = "/student/dashboard")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl border border-border shadow-2xl p-6 md:p-8 relative overflow-hidden max-h-[80vh] overflow-y-auto"
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="relative mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-3"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Start Your Career Journey
          </span>
        </motion.div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Student Registration
        </h1>
        <p className="text-muted-foreground">
          Complete your profile to get matched with the best opportunities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        {/* Basic Information */}
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
              placeholder="Enter your first name"
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
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-destructive">{errors.lastName}</p>
            )}
          </motion.div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-4">
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
              <Lock className="w-4 h-4 text-primary" />
              Password <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 ${
                  errors.password ? "border-destructive" : "border-border"
                } rounded-xl focus:outline-none focus:border-primary transition-all pr-12`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password}</p>
            )}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Phone <span className="text-destructive">*</span>
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
            <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all"
            />
          </motion.div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            Education <span className="text-destructive">*</span>
          </label>

          {formData.education.map((edu, index) => (
            <div
              key={index}
              className="bg-background/30 rounded-lg p-4 mb-4 border border-border"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index] = {
                        ...newEducation[index],
                        degree: e.target.value,
                      };
                      setFormData((prev) => ({
                        ...prev,
                        education: newEducation,
                      }));
                    }}
                    className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="e.g., Bachelor of Technology"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index] = {
                        ...newEducation[index],
                        institution: e.target.value,
                      };
                      setFormData((prev) => ({
                        ...prev,
                        education: newEducation,
                      }));
                    }}
                    className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="e.g., University of Example"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index] = {
                        ...newEducation[index],
                        fieldOfStudy: e.target.value,
                      };
                      setFormData((prev) => ({
                        ...prev,
                        education: newEducation,
                      }));
                    }}
                    className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    value={edu.graduationYear}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index] = {
                        ...newEducation[index],
                        graduationYear: parseInt(e.target.value),
                      };
                      setFormData((prev) => ({
                        ...prev,
                        education: newEducation,
                      }));
                    }}
                    className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="2024"
                    min="1900"
                    max="2030"
                  />
                </div>
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const newEducation = formData.education.filter(
                      (_, i) => i !== index
                    );
                    setFormData((prev) => ({
                      ...prev,
                      education: newEducation,
                    }));
                  }}
                  className="mt-3 text-sm text-destructive hover:text-destructive/80"
                >
                  Remove Education
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              addArrayField("education", {
                degree: "",
                institution: "",
                fieldOfStudy: "",
                graduationYear: new Date().getFullYear(),
                gpa: "",
                currentlyEnrolled: false,
              })
            }
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
          >
            <BookOpen className="w-4 h-4" />
            Add Another Education
          </button>

          {errors.education && (
            <p className="mt-1 text-sm text-destructive">{errors.education}</p>
          )}
        </motion.div>

        {/* Job Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Job Preferences <span className="text-destructive">*</span>
          </label>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Preferred Roles
              </label>
              {formData.jobPreferences.preferredRoles.map((role, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={role}
                    onChange={(e) =>
                      handleArrayChange(
                        "jobPreferences.preferredRoles",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-primary"
                    placeholder="e.g., Software Developer"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayField("jobPreferences.preferredRoles", index)
                      }
                      className="px-3 text-destructive hover:text-destructive/80"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayField("jobPreferences.preferredRoles", "")
                }
                className="text-sm text-primary hover:text-primary/80"
              >
                + Add Role
              </button>
              {errors.preferredRoles && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.preferredRoles}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Preferred Locations
              </label>
              {formData.jobPreferences.preferredLocations.map(
                (location, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) =>
                        handleArrayChange(
                          "jobPreferences.preferredLocations",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-primary"
                      placeholder="e.g., Bangalore, Remote"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField(
                            "jobPreferences.preferredLocations",
                            index
                          )
                        }
                        className="px-3 text-destructive hover:text-destructive/80"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )
              )}
              <button
                type="button"
                onClick={() =>
                  addArrayField("jobPreferences.preferredLocations", "")
                }
                className="text-sm text-primary hover:text-primary/80"
              >
                + Add Location
              </button>
            </div>
          </div>
        </motion.div>

        {/* CV Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            Upload CV (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              id="cvFile"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <label
              htmlFor="cvFile"
              className={`flex flex-col items-center justify-center gap-2 w-full px-6 py-6 bg-background/50 backdrop-blur-sm border-2 ${
                errors.cvFile
                  ? "border-destructive"
                  : formData.cvFile
                  ? "border-primary bg-primary/5"
                  : "border-dashed border-border"
              } rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 group`}
            >
              <Upload className="w-6 h-6 text-primary" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {formData.cvFile
                    ? formData.cvFile.name
                    : "Click to upload your CV"}
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, DOCX - Max 5MB
                </p>
              </div>
            </label>
          </div>
          {errors.cvFile && (
            <p className="mt-1 text-sm text-destructive">{errors.cvFile}</p>
          )}
        </motion.div>

        {/* Registration Type - Plan Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
                  <span className="text-xs text-muted-foreground block">
                    /month
                  </span>
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

        {serverError && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive text-center bg-destructive/10 py-2 px-4 rounded-lg"
          >
            {serverError}
          </motion.p>
        )}

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
      </form>
    </motion.div>
  );
}
