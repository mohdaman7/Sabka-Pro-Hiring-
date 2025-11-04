"use client";

import { useState, useEffect } from "react";
import {
  X,
  Upload,
  FileText,
  Briefcase,
  Mail,
  Phone,
  Linkedin,
  Github,
  CheckCircle,
  AlertCircle,
  Star,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { studentService } from "@/services/studentService";
import { customToast } from "@/components/ui/toast";

export default function ApplyNowModalEnhanced({ job, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    coverLetter: "",
    resumeId: null, // Selected resume ID
    newResume: null, // New resume file
    email: "",
    phone: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolio: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Resume selection
  const [savedResumes, setSavedResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [showResumeSelector, setShowResumeSelector] = useState(false);
  const [resumeOption, setResumeOption] = useState("saved"); // 'saved' or 'new'

  useEffect(() => {
    if (isOpen) {
      loadSavedResumes();
    }
  }, [isOpen]);

  const loadSavedResumes = async () => {
    try {
      setLoadingResumes(true);
      const response = await studentService.getMyResumes();
      setSavedResumes(response.data || []);
      
      // Auto-select primary resume if available
      const primaryResume = response.data?.find(r => r.isPrimary);
      if (primaryResume) {
        setFormData(prev => ({ ...prev, resumeId: primaryResume._id }));
      }
    } catch (error) {
      console.error("Failed to load resumes:", error);
    } finally {
      setLoadingResumes(false);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          resume: "File size must be less than 10MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, newResume: file, resumeId: null }));
      setErrors((prev) => ({ ...prev, resume: "" }));
      setResumeOption("new");
    }
  };

  const handleResumeSelect = (resumeId) => {
    setFormData((prev) => ({ ...prev, resumeId, newResume: null }));
    setErrors((prev) => ({ ...prev, resume: "" }));
    setResumeOption("saved");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.coverLetter || formData.coverLetter.length < 50) {
      newErrors.coverLetter = "Cover letter must be at least 50 characters";
    }

    if (!formData.resumeId && !formData.newResume) {
      newErrors.resume = "Please select a resume or upload a new one";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // If uploading new resume, upload it first
      let resumeIdToUse = formData.resumeId;
      
      if (formData.newResume) {
        const uploadResponse = await studentService.uploadNewResume(
          formData.newResume,
          `Resume for ${job?.title || "Job"}`
        );
        resumeIdToUse = uploadResponse.data._id;
      }

      // Submit application
      const applicationData = {
        ...formData,
        resumeId: resumeIdToUse,
        jobId: job._id,
      };
      
      await onSubmit(applicationData);
      
      setSubmitSuccess(true);
      customToast.success("Application submitted successfully!");

      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFormData({
          coverLetter: "",
          resumeId: null,
          newResume: null,
          email: "",
          phone: "",
          linkedinUrl: "",
          githubUrl: "",
          portfolio: "",
        });
      }, 2000);
    } catch (error) {
      customToast.error(error.response?.data?.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedResume = savedResumes.find(r => r._id === formData.resumeId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-slideUp"
        style={{
          background:
            "linear-gradient(180deg, rgba(30,30,30,0.98), rgba(20,20,20,0.98))",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {submitSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl z-10 animate-fadeIn">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 animate-scaleIn">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Application Submitted!
              </h3>
              <p className="text-white/70">
                We'll review your application and get back to you soon.
              </p>
            </div>
          </div>
        )}

        <div
          className="sticky top-0 z-10 p-6 border-b"
          style={{
            background:
              "linear-gradient(90deg, rgba(128,55,145,0.15), rgba(184,123,209,0.1))",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Apply for Position
              </h2>
              <div className="flex items-center gap-2 text-white/70">
                <Briefcase className="w-4 h-4" />
                <span className="font-medium">
                  {job?.title || "Job Position"}
                </span>
                <span className="text-white/50">•</span>
                <span>{job?.employerId?.employerProfile?.company?.name || job?.employerId?.company?.name || job?.company?.name || "Company Name"}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Resume Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#b87bd1]" />
                Resume *
              </h3>
              <button
                onClick={() => setShowResumeSelector(!showResumeSelector)}
                className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {showResumeSelector ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Hide Resumes
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    {savedResumes.length} Saved Resume{savedResumes.length !== 1 ? 's' : ''}
                  </>
                )}
              </button>
            </div>

            {/* Resume Options */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setResumeOption("saved")}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                  resumeOption === "saved"
                    ? "bg-purple-600 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                Use Saved Resume
              </button>
              <button
                onClick={() => setResumeOption("new")}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                  resumeOption === "new"
                    ? "bg-purple-600 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                Upload New
              </button>
            </div>

            {/* Saved Resumes List */}
            {resumeOption === "saved" && showResumeSelector && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {loadingResumes ? (
                  <div className="text-center py-4">
                    <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
                  </div>
                ) : savedResumes.length === 0 ? (
                  <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
                    <FileText className="w-12 h-12 text-white/40 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">No saved resumes</p>
                    <button
                      onClick={() => setResumeOption("new")}
                      className="mt-3 text-purple-400 text-sm hover:text-purple-300"
                    >
                      Upload your first resume
                    </button>
                  </div>
                ) : (
                  savedResumes.map((resume) => (
                    <button
                      key={resume._id}
                      onClick={() => handleResumeSelect(resume._id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        formData.resumeId === resume._id
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-white truncate">
                              {resume.name}
                            </h4>
                            {resume.isPrimary && (
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-white/60 truncate">
                            {resume.fileName} • {(resume.fileSize / 1024).toFixed(0)} KB
                          </p>
                          {resume.atsScore > 0 && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs font-semibold">
                              ATS: {resume.atsScore}%
                            </span>
                          )}
                        </div>
                        {formData.resumeId === resume._id && (
                          <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            {/* Selected Resume Display */}
            {resumeOption === "saved" && !showResumeSelector && selectedResume && (
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{selectedResume.name}</h4>
                    <p className="text-xs text-white/60">{selectedResume.fileName}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            )}

            {/* Upload New Resume */}
            {resumeOption === "new" && (
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume"
                  className={`flex items-center justify-center gap-3 w-full px-6 py-8 rounded-lg border-2 border-dashed ${
                    errors.resume ? "border-red-500" : "border-white/20"
                  } bg-white/5 hover:bg-white/8 cursor-pointer transition-all group`}
                >
                  <Upload className="w-6 h-6 text-[#b87bd1] group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <p className="text-white font-medium">
                      {formData.newResume
                        ? formData.newResume.name
                        : "Click to upload resume"}
                    </p>
                    <p className="text-white/50 text-sm mt-1">
                      PDF, DOC, or DOCX (Max 10MB)
                    </p>
                  </div>
                </label>
              </div>
            )}

            {errors.resume && (
              <p className="text-red-400 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.resume}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#b87bd1]" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.phone ? "border-red-500" : "border-white/10"
                  } text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all`}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-[#b87bd1]" />
              Professional Links
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all"
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all"
                  placeholder="github.com/yourusername"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Portfolio Website
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#b87bd1]" />
              Cover Letter *
            </h3>

            <div>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.coverLetter ? "border-red-500" : "border-white/10"
                } text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all resize-none`}
                placeholder="Tell us why you're a great fit for this position..."
              />
              <div className="flex justify-between items-center mt-2">
                {errors.coverLetter ? (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.coverLetter}
                  </p>
                ) : (
                  <p className="text-white/50 text-xs">Minimum 50 characters</p>
                )}
                <p className="text-white/50 text-xs">
                  {formData.coverLetter.length} characters
                </p>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold border border-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
