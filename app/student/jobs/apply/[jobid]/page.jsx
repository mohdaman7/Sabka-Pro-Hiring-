"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { jobService } from "@/services/jobService";
import { applicationService } from "@/services/applicationService";
import { userService } from "@/services/userService";
import api from "@/lib/axios";
import {
  Upload,
  FileText,
  Briefcase,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Award,
  Globe,
  Send,
  X,
  Sparkles,
  CheckCircle2,
  User,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon,
} from "lucide-react";
import { customToast } from "@/components/ui/toast";

export default function ApplyJobPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobid || params?.jobId;

  const [job, setJob] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    resume: null,
    previousCompany: "",
    previousPosition: "",
    yearsExperience: "",
    languages: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Experience", icon: Briefcase },
    { number: 3, title: "Resume", icon: FileText },
    { number: 4, title: "Review", icon: CheckCircle },
  ];

  useEffect(() => {
    let mounted = true;

    async function loadJob() {
      if (!jobId) {
        customToast.error("Error", "No job specified");
        router.push("/student/jobs");
        return;
      }

      try {
        setLoading(true);
        const response = await jobService.getJobById(jobId);
        const jobData = response?.data;
        if (!jobData) {
          customToast.error("Error", "Job not found");
          router.push("/student/jobs");
          return;
        }
        if (mounted) setJob(jobData);
      } catch (error) {
        console.error("Failed to load job:", error);
        customToast.error(
          "Error",
          error?.response?.data?.message || "Failed to load job details"
        );
        router.push("/student/jobs");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadJob();
    return () => {
      mounted = false;
    };
  }, [jobId, router]);

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
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          resume: "File size must be less than 5MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, resume: null }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.previousCompany)
        newErrors.previousCompany = "Company is required";
      if (!formData.previousPosition)
        newErrors.previousPosition = "Position is required";
    }

    if (step === 2) {
      if (!formData.yearsExperience)
        newErrors.yearsExperience = "Years of experience is required";
    }

    if (step === 3) {
      if (!formData.resume) newErrors.resume = "Resume is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    if (!jobId) {
      customToast.error("Error", "No job specified");
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl;

      if (formData.resume) {
        const uploadRes = await userService.uploadResume(formData.resume);
        const rawUrl = uploadRes?.data?.url || uploadRes?.url;
        resumeUrl = rawUrl?.startsWith("http")
          ? rawUrl
          : `${api.defaults.baseURL}${rawUrl}`;
      }

      await applicationService.apply({
        jobId,
        resumeUrl,
        previousCompany: formData.previousCompany,
        previousPosition: formData.previousPosition,
        yearsExperience: formData.yearsExperience,
        languages: formData.languages,
      });

      setSubmitSuccess(true);

      setTimeout(() => {
        customToast.success("Success", "Application submitted successfully!");
        router.push("/student/jobs");
      }, 1500);
    } catch (error) {
      console.error("Application submission failed:", error);
      customToast.error(
        "Error",
        error?.response?.data?.message || "Failed to submit application"
      );
      setIsSubmitting(false);
    }
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "CO";
  };

  const getJobTypeColor = (jobType) => {
    const colors = {
      "Full-time": "bg-emerald-500/20 text-emerald-300",
      "Part-time": "bg-blue-500/20 text-blue-300",
      Contract: "bg-amber-500/20 text-amber-300",
      Internship: "bg-purple-500/20 text-purple-300",
      Freelance: "bg-pink-500/20 text-pink-300",
    };
    return colors[jobType] || "bg-gray-500/20 text-gray-300";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  // Step Components - Defined as useCallback to prevent re-renders
  const Step1PersonalInfo = useCallback(
    () => (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center gap-4">
          <div
            className="p-3 rounded-2xl shadow-lg"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
            }}
          >
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Personal Information
            </h3>
            <p className="text-white/70 text-sm">
              Tell us about your professional background
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#b87bd1]" />
              Previous Company <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="previousCompany"
                value={formData.previousCompany}
                onChange={handleChange}
                className={`w-full pl-5 pr-4 py-4 rounded-xl bg-white/5 border ${
                  errors.previousCompany
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-[#b87bd1]"
                } text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all duration-300 hover:bg-white/[0.07]`}
                placeholder="Enter company name"
              />
              {formData.previousCompany && (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
              )}
            </div>
            {errors.previousCompany && (
              <p className="text-red-400 text-sm flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4" />
                {errors.previousCompany}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#b87bd1]" />
              Position <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="previousPosition"
                value={formData.previousPosition}
                onChange={handleChange}
                className={`w-full pl-5 pr-4 py-4 rounded-xl bg-white/5 border ${
                  errors.previousPosition
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-[#b87bd1]"
                } text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all duration-300 hover:bg-white/[0.07]`}
                placeholder="e.g., Software Engineer"
              />
              {formData.previousPosition && (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
              )}
            </div>
            {errors.previousPosition && (
              <p className="text-red-400 text-sm flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4" />
                {errors.previousPosition}
              </p>
            )}
          </div>
        </div>
      </div>
    ),
    [
      formData.previousCompany,
      formData.previousPosition,
      errors.previousCompany,
      errors.previousPosition,
    ]
  );

  const Step2Experience = useCallback(
    () => (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center gap-4">
          <div
            className="p-3 rounded-2xl shadow-lg"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
            }}
          >
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Experience Details
            </h3>
            <p className="text-white/70 text-sm">
              Share your experience level and language skills
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#b87bd1]" />
              Years of Experience <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.5"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
                className={`w-full pl-5 pr-4 py-4 rounded-xl bg-white/5 border ${
                  errors.yearsExperience
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-[#b87bd1]"
                } text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all duration-300 hover:bg-white/[0.07]`}
                placeholder="e.g., 3"
              />
              {formData.yearsExperience && (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
              )}
            </div>
            {errors.yearsExperience && (
              <p className="text-red-400 text-sm flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4" />
                {errors.yearsExperience}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#b87bd1]" />
              Languages
            </label>
            <div className="relative">
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all duration-300 hover:bg-white/[0.07]"
                placeholder="e.g., English, Hindi, Spanish"
              />
              {formData.languages && (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    [formData.yearsExperience, formData.languages, errors.yearsExperience]
  );

  const Step3Resume = useCallback(
    () => (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center gap-4">
          <div
            className="p-3 rounded-2xl shadow-lg"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
            }}
          >
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              Upload Resume <span className="text-red-400">*</span>
            </h3>
            <p className="text-white/70 text-sm">
              Upload your latest resume (PDF, DOC, DOCX)
            </p>
          </div>
        </div>

        {!formData.resume ? (
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
              className={`group flex flex-col items-center justify-center w-full px-8 py-14 rounded-2xl border-2 border-dashed ${
                errors.resume
                  ? "border-red-500/50 bg-red-500/5"
                  : "border-white/20 bg-white/5"
              } hover:bg-white/10 hover:border-[#b87bd1]/50 cursor-pointer transition-all duration-300`}
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div
                  className="relative p-5 rounded-2xl border border-[#803791]/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <Upload className="w-10 h-10 text-white" />
                </div>
              </div>
              <p className="text-white font-semibold text-xl mb-2 group-hover:text-[#b87bd1] transition-colors duration-300">
                Click to upload your resume
              </p>
              <p className="text-white/60 text-sm">
                PDF, DOC, or DOCX • Maximum file size 5MB
              </p>
            </label>
            {errors.resume && (
              <p className="text-red-400 text-sm mt-4 flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4" />
                {errors.resume}
              </p>
            )}
          </div>
        ) : (
          <div
            className="group relative flex items-center justify-between p-5 rounded-2xl border border-white/10 hover:border-[#b87bd1]/30 transition-all duration-300"
            style={{
              background:
                "linear-gradient(90deg, rgba(128,55,145,0.10), rgba(184,123,209,0.05))",
            }}
          >
            <div className="flex items-center gap-5 relative z-10">
              <div
                className="p-4 rounded-xl shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white font-medium text-lg">
                  {formData.resume.name}
                </p>
                <p className="text-white/70 text-sm flex items-center gap-2">
                  <span>
                    {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/50"></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Ready to upload
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="relative z-10 p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all duration-300 border border-red-500/20 hover:border-red-500/40 group/remove"
            >
              <X className="w-5 h-5 group-hover/remove:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>
    ),
    [formData.resume, errors.resume]
  );

  const Step4Review = useCallback(
    () => (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center gap-4">
          <div
            className="p-3 rounded-2xl shadow-lg"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
            }}
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Review Application
            </h3>
            <p className="text-white/70 text-sm">
              Please review your information before submitting
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
              Personal Information
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-sm">Previous Company</p>
                <p className="text-white font-medium">
                  {formData.previousCompany || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Position</p>
                <p className="text-white font-medium">
                  {formData.previousPosition || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
              Experience Details
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-sm">Years of Experience</p>
                <p className="text-white font-medium">
                  {formData.yearsExperience || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Languages</p>
                <p className="text-white font-medium">
                  {formData.languages || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            Resume
          </h4>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <FileText className="w-8 h-8 text-[#b87bd1]" />
            <div>
              <p className="text-white font-medium">
                {formData.resume ? formData.resume.name : "No resume uploaded"}
              </p>
              {formData.resume && (
                <p className="text-white/60 text-sm">
                  {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    [
      formData.previousCompany,
      formData.previousPosition,
      formData.yearsExperience,
      formData.languages,
      formData.resume,
    ]
  );

  // Render current step component
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo />;
      case 2:
        return <Step2Experience />;
      case 3:
        return <Step3Resume />;
      case 4:
        return <Step4Review />;
      default:
        return <Step1PersonalInfo />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(128,55,145,0.08)" }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(184,123,209,0.06)" }}
          />
        </div>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#803791]/20 border-t-[#803791] rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#b87bd1] animate-pulse" />
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(128,55,145,0.08)" }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(184,123,209,0.06)" }}
          />
        </div>
        <div className="text-center max-w-lg relative z-10">
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 blur-3xl opacity-30 rounded-full animate-pulse"></div>
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 flex items-center justify-center shadow-2xl animate-bounce">
              <CheckCircle className="w-14 h-14 text-white drop-shadow-lg" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white mb-4">
            Application Submitted Successfully!
          </h3>
          <p className="text-white/70 mb-10 text-lg leading-relaxed">
            Your application has been received and is under review.
          </p>
          <button
            onClick={() => router.push("/student/jobs")}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-0.5"
          >
            <span className="relative flex items-center justify-center gap-2">
              <Briefcase className="w-5 h-5" />
              Browse More Jobs
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.push("/student/jobs")}
          className="group flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-all duration-300 hover:gap-3"
        >
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 border border-white/10 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <span className="font-medium">Back to Jobs</span>
        </button>

        {/* Job Header */}
        <div
          className="group relative mb-8 overflow-hidden rounded-3xl backdrop-blur-md shadow-2xl border border-white/6 transition-all duration-500"
          style={{
            background:
              "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          }}
        >
          <div className="relative p-6 sm:p-8">
            <div className="flex items-start gap-6">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                {job?.employerId?.company ? (
                  <span className="text-white font-bold text-2xl">
                    {getInitials(job.employerId.company)}
                  </span>
                ) : (
                  <Building2 className="w-10 h-10 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {job?.title || "Position"}
                </h1>
                <p className="text-[#b87bd1] font-semibold text-lg">
                  {job?.employerId?.company || "Demo Company"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                          ? "bg-[#b87bd1] text-white shadow-lg"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium mt-2 transition-colors duration-300 ${
                        isCompleted || isCurrent
                          ? "text-white"
                          : "text-white/50"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 transition-colors duration-300 ${
                        isCompleted ? "bg-emerald-500" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div
          className="rounded-3xl backdrop-blur-md shadow-2xl border border-white/6 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
          }}
        >
          <div className="p-6 sm:p-8">
            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 mt-8 border-t border-white/10">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
