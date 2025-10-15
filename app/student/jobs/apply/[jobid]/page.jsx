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
} from "lucide-react";
import { customToast } from "@/components/ui/toast";

export default function ApplyJobPage() {
  const params = useParams();
  const router = useRouter();
  // Dynamic segment folder name is [jobid]
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

  // Fetch job details from backend
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
        // Ensure absolute URL to satisfy backend URL validation
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
      "Full-time": "bg-green-500/20 text-green-300",
      "Part-time": "bg-blue-500/20 text-blue-300",
      Contract: "bg-orange-500/20 text-orange-300",
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

  // Loading state while fetching job
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b87bd1]"></div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Application Submitted!
          </h3>
          <p className="text-white/70 mb-6">
            We'll review your application and get back to you soon.
          </p>
          <button
            onClick={() => router.push("/student/jobs")}
            className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Background orbs */}
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

      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/student/jobs")}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Jobs
        </button>

        {/* Job Header */}
        <div
          className="rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6 mb-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          }}
        >
          <div className="flex items-start gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1)",
              }}
            >
              {job?.employerId?.company ? (
                <span className="text-white font-bold text-lg">
                  {getInitials(job.employerId.company)}
                </span>
              ) : (
                <Building2 className="w-10 h-10 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                Apply for {job?.title || "Position"}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">
                    {job?.employerId?.company || "Demo Company"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job?.location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-white">
                    {job?.salary || "Competitive Salary"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(job?.createdAt)}</span>
                </div>
              </div>
              {job?.jobType && (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(
                    job.jobType
                  )}`}
                >
                  {job.jobType}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div
          className="rounded-2xl p-8 shadow-2xl backdrop-blur-md border border-white/6"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,30,30,0.98), rgba(20,20,20,0.98))",
          }}
        >
          <div className="space-y-8">
            {/* Experience Summary */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-[#b87bd1]" />
                Experience Summary
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Previous Company *
                  </label>
                  <input
                    type="text"
                    name="previousCompany"
                    value={formData.previousCompany}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.previousCompany
                        ? "border-red-500"
                        : "border-white/10"
                    } text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all`}
                    placeholder="e.g., Acme Corp"
                  />
                  {errors.previousCompany && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.previousCompany}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Position *
                  </label>
                  <input
                    type="text"
                    name="previousPosition"
                    value={formData.previousPosition}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.previousPosition
                        ? "border-red-500"
                        : "border-white/10"
                    } text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all`}
                    placeholder="e.g., Software Engineer"
                  />
                  {errors.previousPosition && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.previousPosition}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.yearsExperience
                        ? "border-red-500"
                        : "border-white/10"
                    } text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all`}
                    placeholder="e.g., 3"
                  />
                  {errors.yearsExperience && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.yearsExperience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Languages
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 transition-all"
                    placeholder="e.g., English, Hindi"
                  />
                </div>
              </div>
            </div>

            {/* Resume */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#b87bd1]" />
                Resume *
              </h3>

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
                  className={`flex items-center justify-center gap-4 w-full px-8 py-12 rounded-lg border-2 border-dashed ${
                    errors.resume ? "border-red-500" : "border-white/20"
                  } bg-white/5 hover:bg-white/8 cursor-pointer transition-all group`}
                >
                  <Upload className="w-8 h-8 text-[#b87bd1] group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <p className="text-white font-medium text-lg">
                      {formData.resume
                        ? formData.resume.name
                        : "Click to upload resume"}
                    </p>
                    <p className="text-white/50 text-sm mt-2">
                      PDF, DOC, or DOCX (Max 5MB)
                    </p>
                  </div>
                </label>
                {errors.resume && (
                  <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.resume}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting Application...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
              <button
                onClick={() => router.push("/student/jobs")}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold text-lg border border-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
