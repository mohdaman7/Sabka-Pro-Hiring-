"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  Upload,
  Save,
  Camera,
  Award,
  CheckCircle,
  FileText,
  Target,
  TrendingUp,
  Crown,
} from "lucide-react";

export default function StudentProfile() {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [profileImage, setProfileImage] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    location: "",
    qualification: "",
    fieldOfStudy: "",
    institution: "",
    yearOfPassing: "",
    preferredRole: "",
    jobType: "",
    expectedSalary: "",
    preferredLocation: "",
    skills: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted", formData, selectedPlan);
  };

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Header - purple glass */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6"
        style={{
          background:
            "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
        <div className="relative">
          <h1 className="text-3xl font-extrabold mb-2">My Profile</h1>
          <p className="text-white/85">
            Complete your profile to get better job matches
          </p>
        </div>
      </div>

      {/* Profile Completion Status - glass */}
      <div
        className="rounded-xl p-6 shadow-lg"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Profile Completion
            </h3>
            <p className="text-sm text-white/80">
              Complete your profile to unlock more opportunities
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">75%</div>
            <p className="text-xs text-white/70">Almost there!</p>
          </div>
        </div>
        <div className="w-full bg-white/6 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-500 shadow-md"
            style={{
              width: "75%",
              background: "linear-gradient(90deg,#803791,#b87bd1)",
            }}
          ></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Image & Plan Selection */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div
            className="rounded-xl p-6 shadow-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#b87bd1]" />
              Profile Picture
            </h3>
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "AS"
                  )}
                </div>
                <label
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110"
                  style={{ background: "#803791" }}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-sm text-white/80 mt-4 text-center">
                Upload a professional photo
              </p>
            </div>
          </div>

          {/* Plan Selection */}
          <div
            className="rounded-xl p-6 shadow-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#b87bd1]" />
              Registration Plan
            </h3>
            <div className="space-y-3">
              {/* Free Plan */}
              <div
                onClick={() => setSelectedPlan("free")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan === "free"
                    ? "border-white/8 bg-white/6 shadow-md"
                    : "border-white/6 hover:border-white/10"
                }`}
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-white/12 flex items-center justify-center">
                      {selectedPlan === "free" && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: "#fff" }}
                        ></div>
                      )}
                    </div>
                    <span className="font-semibold text-white">Free Plan</span>
                  </div>
                  <span className="text-2xl font-bold text-white">₹0</span>
                </div>
                <ul className="space-y-2 ml-7 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Basic job search
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />5
                    applications/month
                  </li>
                </ul>
              </div>

              {/* Pro Plan */}
              <div
                onClick={() => setSelectedPlan("pro")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden ${
                  selectedPlan === "pro"
                    ? "border-white/8 bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg text-white"
                    : "border-white/6 hover:border-white/10 text-white"
                }`}
              >
                <div className="absolute top-1 right-2"></div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-white/12 flex items-center justify-center">
                      {selectedPlan === "pro" && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: "#fff" }}
                        ></div>
                      )}
                    </div>
                    <span className="font-semibold text-white">Pro Plan</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">₹999</span>
                    <span className="text-xs text-white/80 block">/month</span>
                  </div>
                </div>
                <ul className="space-y-2 ml-7 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                    Unlimited applications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                    Priority profile
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                    AI job matching
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Profile Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-100">Profile Views</span>
                <span className="text-2xl font-bold">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-100">Applications</span>
                <span className="text-2xl font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-100">Match Score</span>
                <span className="text-2xl font-bold">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div
          className="lg:col-span-2 rounded-xl p-8 shadow-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 className="text-2xl font-extrabold text-white mb-6">
            Personal Information
          </h3>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/6">
                <User className="w-5 h-5 text-[#b87bd1]" />
                Basic Details
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full pl-11 pr-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Qualification */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/6">
                <GraduationCap className="w-5 h-5 text-[#b87bd1]" />
                Educational Qualification
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Highest Qualification
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-fuchsia-900 text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  >
                    <option value="">Select qualification</option>
                    <option value="10th">10th Pass</option>
                    <option value="12th">12th Pass</option>
                    <option value="diploma">Diploma</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Post Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleInputChange}
                    placeholder="e.g., Computer Science"
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder="University/College name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Year of Passing
                  </label>
                  <input
                    type="number"
                    name="yearOfPassing"
                    value={formData.yearOfPassing}
                    onChange={handleInputChange}
                    placeholder="2024"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Job Preferences */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/6">
                <Target className="w-5 h-5 text-[#b87bd1]" />
                Job Preferences
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Preferred Job Role
                  </label>
                  <input
                    type="text"
                    name="preferredRole"
                    value={formData.preferredRole}
                    onChange={handleInputChange}
                    placeholder="e.g., Frontend Developer"
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Job Type
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Expected Salary (LPA)
                  </label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    placeholder="e.g., 5-8 LPA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Mumbai, Remote"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Key Skills
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List your key skills separated by commas (e.g., React, JavaScript, Node.js)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* CV Upload */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                <FileText className="w-5 h-5 text-orange-600" />
                Upload CV/Resume
              </h4>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all">
                <input
                  type="file"
                  id="cv-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvUpload}
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">
                    {cvFile ? cvFile.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, DOCX (Max 5MB)
                  </p>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Profile
              </button>
              <button className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all border border-gray-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
