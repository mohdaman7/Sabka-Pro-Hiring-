"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Users,
  FileText,
  Building2,
  GraduationCap,
  Award,
  Tag,
  Calendar,
  Save,
  Send,
  ChevronDown,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { jobService } from "@/services/jobService";
import { customToast } from "@/components/ui/toast";

export default function PostNewJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    location: "",
    jobType: "Full-time",
    workMode: "On-site",
    experience: "",
    salary: "",
    vacancies: "1",
    deadline: "",
    education: "",
    skills: [],
    description: "",
    responsibilities: "",
    requirements: "",
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ];
  const workModes = ["On-site", "Remote", "Hybrid"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setOpenDropdown(null);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "jobTitle",
      "department",
      "location",
      "experience",
      "education",
      "salary",
      "description",
      "responsibilities",
    ];

    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        const fieldName = field.replace(/([A-Z])/g, " $1").toLowerCase();
        customToast.error("Validation Error", `${fieldName} is required`);
        return false;
      }
    }

    if (formData.skills.length === 0) {
      customToast.error("Validation Error", "At least one skill is required");
      return false;
    }

    if (!formData.deadline) {
      customToast.error("Validation Error", "Application deadline is required");
      return false;
    }

    const deadline = new Date(formData.deadline);
    if (deadline <= new Date()) {
      customToast.error("Validation Error", "Deadline must be in the future");
      return false;
    }

    return true;
  };

  const handleSubmit = async (action) => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const jobData = {
        title: formData.jobTitle,
        department: formData.department,
        location: formData.location,
        jobType: formData.jobType,
        workMode: formData.workMode,
        experience: formData.experience,
        education: formData.education,
        salary: formData.salary,
        vacancies: parseInt(formData.vacancies),
        deadline: formData.deadline, // Send as string (ISO format from date input)
        skills: formData.skills,
        description: formData.description,
        responsibilities: formData.responsibilities,
        requirements: formData.requirements,
        status: action === "draft" ? "draft" : "active",
      };

      const result = await jobService.createJob(jobData);

      if (result.success) {
        customToast.success("Success!", result.message);

        if (action === "publish") {
          router.push("/employer/jobs");
        } else {
          // Reset form for draft
          setFormData({
            jobTitle: "",
            department: "",
            location: "",
            jobType: "Full-time",
            workMode: "On-site",
            experience: "",
            salary: "",
            vacancies: "1",
            deadline: "",
            education: "",
            skills: [],
            description: "",
            responsibilities: "",
            requirements: "",
          });
        }
      }
    } catch (error) {
      console.error("Job posting error:", error);
      customToast.error(
        "Error",
        error.response?.data?.message || "Failed to post job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const CustomSelect = ({ name, value, options, icon: Icon, label }) => {
    const isOpen = openDropdown === name;
    return (
      <div className="relative">
        <label className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
          {label} <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : name)}
          className="w-full flex items-center justify-between pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all bg-transparent hover:border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          disabled={loading}
        >
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          <span className="text-white truncate">{value}</span>
          <ChevronDown
            className={`w-4 h-4 sm:w-5 sm:h-5 text-white/70 transition-transform flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white/5 border border-[#803791]/20 rounded-lg shadow-xl overflow-hidden backdrop-blur-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectChange(name, option)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-white/6 transition-all flex items-center justify-between group text-sm sm:text-base"
              >
                <span
                  className={`font-medium truncate ${
                    value === option ? "text-[#b87bd1]" : "text-white/90"
                  }`}
                >
                  {option}
                </span>
                {value === option && (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#b87bd1] flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-[#803791] via-[#6a2a6f] to-[#b87bd1] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 text-white shadow-2xl mb-8 overflow-hidden transform-gpu will-change-transform hover:scale-[1.01] transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#b87bd1]/20 rounded-full -translate-y-16 translate-x-16 sm:-translate-y-24 sm:translate-x-24 md:-translate-y-32 md:translate-x-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#803791]/12 rounded-full translate-y-16 -translate-x-16 sm:translate-y-24 sm:-translate-x-24 md:translate-y-32 md:-translate-x-32 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center ring-2 ring-white/30">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Post a New Job</h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg mt-1">
                  Create an attractive job posting to find the best talent
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Basic Information */}
          <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-[#803791]/8 p-4 sm:p-5 md:p-6 lg:p-8 shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                  Basic Information
                </h2>
                <p className="text-xs sm:text-sm text-white/75">
                  Essential details about the position
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g. Engineering"
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>
              </div>

              <CustomSelect
                name="jobType"
                value={formData.jobType}
                options={jobTypes}
                icon={Clock}
                label="Job Type"
              />

              <CustomSelect
                name="workMode"
                value={formData.workMode}
                options={workModes}
                icon={Building2}
                label="Work Mode"
              />
            </div>
          </div>

          {/* Job Requirements */}
          <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-[#803791]/8 p-4 sm:p-5 md:p-6 lg:p-8 shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                  Job Requirements
                </h2>
                <p className="text-xs sm:text-sm text-white/75">
                  Qualifications and experience needed
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Experience Required <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g. 3-5 years"
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Education <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="e.g. Bachelor's in Computer Science"
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Salary Range <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. ₹8-12 LPA"
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Number of Vacancies <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                  <input
                    type="number"
                    name="vacancies"
                    value={formData.vacancies}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-3">
                  Required Skills <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1 group">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                    <input
                      type="text"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                      }
                      placeholder="Type a skill and press Enter"
                      className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addSkill}
                    disabled={loading || !currentSkill.trim()}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg hover:from-[#6a2a6f] hover:to-[#a36bc2] transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    Add
                  </button>
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/6 text-white rounded-full text-xs sm:text-sm font-semibold border border-[#803791]/12 flex items-center gap-2 hover:border-[#803791]/20 hover:shadow-md transition-all group"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          disabled={loading}
                          className="w-5 h-5 bg-[#803791]/12 rounded-full flex items-center justify-center text-white hover:bg-[#803791]/20 transition-all group-hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-[#803791]/8 p-4 sm:p-5 md:p-6 lg:p-8 shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">Job Details</h2>
                <p className="text-xs sm:text-sm text-white/75">
                  Comprehensive role information
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Provide a detailed description of the role, company culture, and what makes this opportunity unique..."
                  className="w-full px-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all resize-none text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Key Responsibilities <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="• Responsibility 1&#10;• Responsibility 2&#10;• Responsibility 3"
                  className="w-full px-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all resize-none text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Any additional requirements, certifications, or nice-to-have qualifications..."
                  className="w-full px-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all resize-none text-white placeholder-white/60 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-[#803791]/8 p-4 sm:p-5 md:p-6 shadow-md">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
              <button
                type="button"
                onClick={() => handleSubmit("draft")}
                disabled={loading}
                className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-transparent border border-white/10 text-white/90 rounded-lg sm:rounded-xl hover:bg-white/6 transition-all font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-sm hover:shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 text-sm sm:text-base"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                )}
                <span className="hidden sm:inline">{loading ? "Saving..." : "Save as Draft"}</span>
                <span className="sm:hidden">{loading ? "Save..." : "Draft"}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("publish")}
                disabled={loading}
                className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg sm:rounded-xl hover:from-[#6a2a6f] hover:to-[#a36bc2] transition-all font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 text-sm sm:text-base"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span className="hidden sm:inline">{loading ? "Publishing..." : "Publish Job"}</span>
                <span className="sm:hidden">{loading ? "Publish..." : "Publish"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
