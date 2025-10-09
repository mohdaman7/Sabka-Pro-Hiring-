"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function PostNewJob() {
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

  const handleSubmit = (action) => {
    console.log("Job posting:", action, formData);
    alert(
      `Job ${action === "draft" ? "saved as draft" : "published"} successfully!`
    );
  };

  const CustomSelect = ({ name, value, options, icon: Icon, label }) => {
    const isOpen = openDropdown === name;
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          {label} <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : name)}
          className="w-full flex items-center justify-between pl-10 pr-4 py-3 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all bg-transparent hover:border-white/20 text-white"
        >
          <Icon className="absolute left-3 top-[2.7rem] w-5 h-5 text-white/70" />
          <span className="text-white">{value}</span>
          <ChevronDown
            className={`w-5 h-5 text-white/70 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white/5 border border-[#803791]/20 rounded-lg shadow-xl overflow-hidden">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectChange(name, option)}
                className="w-full px-4 py-3 text-left hover:bg-white/6 transition-all flex items-center justify-between group"
              >
                <span
                  className={`font-medium ${
                    value === option ? "text-[#b87bd1]" : "text-white/90"
                  }`}
                >
                  {option}
                </span>
                {value === option && (
                  <Check className="w-5 h-5 text-[#b87bd1]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-[#803791] via-[#6a2a6f] to-[#b87bd1] rounded-2xl p-10 text-white shadow-2xl mb-8 overflow-hidden transform-gpu will-change-transform hover:scale-[1.01] transition-transform">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b87bd1]/20 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#803791]/12 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center ring-2 ring-white/30">
                <Briefcase className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Post a New Job</h1>
                <p className="text-white/90 text-lg mt-1">
                  Create an attractive job posting to find the best talent
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white/5 rounded-2xl border border-[#803791]/8 p-8 shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Basic Information
                </h2>
                <p className="text-sm text-white/75">
                  Essential details about the position
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-white/90 mb-2">
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
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
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
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
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
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent"
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
          <div className="bg-white/5 rounded-2xl border border-[#803791]/8 p-8 shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Job Requirements
                </h2>
                <p className="text-sm text-white/75">
                  Qualifications and experience needed
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
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
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
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
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
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
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
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
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white bg-transparent"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-[#803791] transition-colors" />
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white bg-transparent"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-white/90 mb-3">
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
                      className="w-full pl-11 pr-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all text-white placeholder-white/60 bg-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg hover:from-[#6a2a6f] hover:to-[#a36bc2] transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Add
                  </button>
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/6 text-white rounded-full text-sm font-semibold border border-[#803791]/12 flex items-center gap-2 hover:border-[#803791]/20 hover:shadow-md transition-all group"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="w-5 h-5 bg-[#803791]/12 rounded-full flex items-center justify-center text-white hover:bg-[#803791]/20 transition-all group-hover:scale-110"
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
          <div className="bg-white/5 rounded-2xl border border-[#803791]/8 p-8 shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Job Details</h2>
                <p className="text-sm text-white/75">
                  Comprehensive role information
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Provide a detailed description of the role, company culture, and what makes this opportunity unique..."
                  className="w-full px-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all resize-none text-white placeholder-white/60 bg-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Key Responsibilities <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="• Responsibility 1&#10;• Responsibility 2&#10;• Responsibility 3"
                  className="w-full px-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all resize-none text-white placeholder-white/60 bg-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Any additional requirements, certifications, or nice-to-have qualifications..."
                  className="w-full px-4 py-3.5 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/40 transition-all resize-none text-white placeholder-white/60 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white/5 rounded-2xl border border-[#803791]/8 p-8 shadow-md">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => handleSubmit("draft")}
                className="px-8 py-4 bg-transparent border border-white/10 text-white/90 rounded-xl hover:bg-white/6 transition-all font-semibold flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:scale-105"
              >
                <Save className="w-5 h-5 text-white/90" />
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("publish")}
                className="px-8 py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl hover:from-[#6a2a6f] hover:to-[#a36bc2] transition-all font-semibold flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Send className="w-5 h-5" />
                Publish Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
