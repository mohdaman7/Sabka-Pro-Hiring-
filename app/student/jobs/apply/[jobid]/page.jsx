"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { customToast } from "@/components/ui/toast";

export default function ApplyJobPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobid || params?.jobId;

  const [job, setJob] = useState(null);
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.previousCompany)
      newErrors.previousCompany = "Company is required";
    if (!formData.previousPosition)
      newErrors.previousPosition = "Position is required";
    if (!formData.yearsExperience)
      newErrors.yearsExperience = "Years of experience is required";
    if (!formData.resume) newErrors.resume = "Resume is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background matching dashboard */}
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
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-[#b87bd1]/20 border-t-[#b87bd1] rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1s" }}
          ></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#b87bd1] animate-pulse" />
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background matching dashboard */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(128,55,145,0.08)" }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(184,123,209,0.06)" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
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
            <br />
            We'll get back to you soon with updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/student/jobs")}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#b87bd1] to-[#803791] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <Briefcase className="w-5 h-5" />
                Browse More Jobs
              </span>
            </button>

            <button
              onClick={() => router.push("/student/applications")}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 hover:border-[#b87bd1]/30 transition-all duration-300 backdrop-blur-sm"
            >
              View My Applications
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background matching dashboard */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
          style={{ background: "rgba(240,194,238,0.03)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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

        {/* Job Header Card */}
        <div
          className="group relative mb-10 overflow-hidden rounded-3xl backdrop-blur-md shadow-2xl border border-white/6 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(128,55,145,0.18)]"
          style={{
            background:
              "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          }}
        >
          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#803791]/0 to-[#b87bd1]/0 group-hover:from-[#803791]/5 group-hover:to-[#b87bd1]/5 transition-all duration-500"></div>

          <div className="relative p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start gap-8">
              {/* Company Logo */}
              <div className="relative group/logo">
                <div className="absolute inset-0 bg-gradient-to-br from-[#803791] to-[#b87bd1] rounded-3xl blur-xl opacity-40 group-hover/logo:opacity-60 transition-opacity duration-300"></div>
                <div
                  className="relative w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover/logo:scale-105 transition-transform duration-300"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  {job?.employerId?.company ? (
                    <span className="text-white font-bold text-3xl drop-shadow-lg">
                      {getInitials(job.employerId.company)}
                    </span>
                  ) : (
                    <Building2 className="w-12 h-12 text-white drop-shadow-lg" />
                  )}
                </div>
              </div>

              {/* Job Info */}
              <div className="flex-1 space-y-5">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">
                    {job?.title || "Position"}
                  </h1>
                  <p className="text-[#b87bd1] font-semibold text-xl flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    {job?.employerId?.company || "Demo Company"}
                  </p>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 text-white/80 group/item">
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover/item:bg-white/10 border border-white/10 transition-all duration-300">
                      <MapPin className="w-4 h-4 text-[#b87bd1]" />
                    </div>
                    <span className="text-sm font-medium">
                      {job?.location || "Remote"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-white/80 group/item">
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover/item:bg-emerald-500/10 border border-white/10 transition-all duration-300">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {job?.salary || "Competitive"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-white/80 group/item">
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover/item:bg-blue-500/10 border border-white/10 transition-all duration-300">
                      <Clock className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm">
                      {formatDate(job?.createdAt)}
                    </span>
                  </div>

                  {job?.jobType && (
                    <div
                      className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm ${getJobTypeColor(
                        job.jobType
                      )} hover:scale-105 transition-transform duration-300 cursor-default`}
                    >
                      {job.jobType}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div
          className="rounded-3xl backdrop-blur-md shadow-2xl border border-white/6 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
          }}
        >
          <div className="p-6 sm:p-10 space-y-10">
            {/* Form Header */}
            <div className="flex items-center justify-between pb-8 border-b border-white/10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Submit Your Application
                </h2>
                <p className="text-white/70 text-lg">
                  Complete the form below to apply for this position
                </p>
              </div>
              <div className="hidden sm:block p-4 rounded-2xl bg-gradient-to-br from-[#803791]/20 to-[#b87bd1]/20 border border-[#803791]/30">
                <Send className="w-7 h-7 text-[#b87bd1]" />
              </div>
            </div>

            {/* Professional Experience Section */}
            <div className="space-y-8">
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
                    Professional Experience
                  </h3>
                  <p className="text-white/70 text-sm">
                    Share your work history and expertise
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Previous Company */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/80 flex items-center gap-2">
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

                {/* Previous Position */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/80 flex items-center gap-2">
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

                {/* Years of Experience */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/80 flex items-center gap-2">
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

                {/* Languages */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/80 flex items-center gap-2">
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

            {/* Resume Upload Section */}
            <div className="space-y-8">
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
                    Resume <span className="text-red-400">*</span>
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-8 border-t border-white/10">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative flex-1 px-10 py-5 rounded-2xl font-bold text-lg text-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 disabled:transform-none"
              >
                <div
                  className="absolute inset-0 transition-transform group-hover:scale-105 duration-300"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                ></div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg,#b87bd1,#803791)",
                  }}
                ></div>
                <div className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Submit Application</span>
                    </>
                  )}
                </div>
              </button>

              <button
                onClick={() => router.push("/student/jobs")}
                className="px-10 py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-lg border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div
          className="mt-8 p-6 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="p-3 rounded-xl shadow-md"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1)",
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Application Tips
              </h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#b87bd1] mt-1">•</span>
                  <span>
                    Ensure your resume is up-to-date with your latest experience
                    and skills
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b87bd1] mt-1">•</span>
                  <span>
                    Double-check all information for accuracy before submitting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b87bd1] mt-1">•</span>
                  <span>
                    Highlight relevant experience that matches the job
                    requirements
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
