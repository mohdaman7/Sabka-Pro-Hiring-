"use client";

import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  CreditCard,
  Palette,
  Download,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Check,
  Globe,
  Moon,
  Sun,
  Laptop,
  Mail,
  Smartphone,
  Lock,
  Trash2,
  Key,
  Users,
  FileText,
  Database,
  HelpCircle,
  Briefcase,
  ArrowRight,
  Zap,
  Star,
  Crown,
  Calendar,
} from "lucide-react";

export default function StudentSettings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: "Amit",
    lastName: "Sharma",
    email: "amit.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    bio: "Frontend developer passionate about creating beautiful user experiences with React and Next.js.",
    jobTitle: "Frontend Developer",
    company: "Tech Solutions",
  });

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    emailNotifications: true,
    pushNotifications: true,
    jobAlerts: true,
    courseUpdates: true,
    newsletter: false,
    autoSave: true,
    emailJobAlerts: true,
    emailApplications: true,
    emailCourses: true,
    pushInterviews: true,
    pushMessages: true,
    pushSystem: true,
  });

  const [securityData, setSecurityData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [billingData, setBillingData] = useState({
    plan: "pro",
    status: "active",
    nextBilling: "2024-02-15",
    paymentMethod: "card",
    cardLast4: "4242",
  });

  const sections = [
    {
      id: "profile",
      name: "Profile",
      icon: User,
      description: "Manage your personal information",
    },
    {
      id: "preferences",
      name: "Preferences",
      icon: Palette,
      description: "Customize your experience",
    },
    {
      id: "security",
      name: "Security",
      icon: Shield,
      description: "Update password and security",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: Bell,
      description: "Control your notifications",
    },
    {
      id: "billing",
      name: "Billing",
      icon: CreditCard,
      description: "Manage subscription and payments",
    },
    {
      id: "privacy",
      name: "Privacy",
      icon: Lock,
      description: "Privacy and data settings",
    },
  ];

  const themes = [
    { id: "light", name: "Light", icon: Sun },
    { id: "dark", name: "Dark", icon: Moon },
    { id: "system", name: "System", icon: Laptop },
  ];

  const languages = [
    { id: "en", name: "English" },
    { id: "hi", name: "Hindi" },
    { id: "mr", name: "Marathi" },
    { id: "ta", name: "Tamil" },
  ];

  const handleSave = async (section) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
  };

  const handleReset = (section) => {
    // Reset logic here
    console.log(`Reset ${section}`);
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleProfileChange = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSecurityChange = (key, value) => {
    setSecurityData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background matching dashboard theme */}
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

      <div className="flex min-h-screen">
        {/* Sidebar Navigation - Glass style */}
        <div
          className="w-80 backdrop-blur-md border-r border-white/6 p-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1)",
              }}
            >
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="text-white/80">Manage your account preferences</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 group ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg shadow-purple-500/25"
                      : "text-white/90 hover:bg-white/6 hover:shadow-md border border-transparent hover:border-white/8"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold">{section.name}</div>
                    <div
                      className={`text-sm ${
                        activeSection === section.id
                          ? "text-white/90"
                          : "text-white/70"
                      }`}
                    >
                      {section.description}
                    </div>
                  </div>
                  {activeSection === section.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div
            className="mt-8 p-6 rounded-2xl border border-white/6"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            }}
          >
            <h3 className="font-semibold text-white mb-4">Account Overview</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/80">Member since</span>
                <span className="font-medium text-white">Jan 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Plan</span>
                <span className="font-medium text-[#b87bd1] flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  Pro
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Storage used</span>
                <span className="font-medium text-white">1.2/5 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Profile Settings
                  </h2>
                  <p className="text-white/80">
                    Update your personal and professional information
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReset("profile")}
                    className="px-6 py-3 border border-white/10 text-white/90 rounded-xl font-semibold hover:bg-white/6 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  <button
                    onClick={() => handleSave("profile")}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 transform hover:-translate-y-0.5"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div
                  className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) =>
                            handleProfileChange("firstName", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) =>
                            handleProfileChange("lastName", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          handleProfileChange("email", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          handleProfileChange("phone", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) =>
                          handleProfileChange("location", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50"
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Professional Information */}
                  <div
                    className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      Professional Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={profileData.jobTitle}
                          onChange={(e) =>
                            handleProfileChange("jobTitle", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50"
                          placeholder="Enter job title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={profileData.company}
                          onChange={(e) =>
                            handleProfileChange("company", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          value={profileData.bio}
                          onChange={(e) =>
                            handleProfileChange("bio", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50 resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div
                    className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">
                      Profile Photo
                    </h3>
                    <div className="flex items-center gap-6">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                        style={{
                          background: "linear-gradient(135deg,#803791,#b87bd1)",
                        }}
                      >
                        AS
                      </div>
                      <div className="flex-1">
                        <p className="text-white/80 mb-4">
                          Upload a new profile photo. Recommended size:
                          256x256px
                        </p>
                        <div className="flex gap-3">
                          <button
                            className="px-4 py-2 rounded-xl font-semibold text-sm transition-all transform hover:-translate-y-0.5"
                            style={{
                              background:
                                "linear-gradient(135deg,#803791,#b87bd1)",
                            }}
                          >
                            Upload New
                          </button>
                          <button className="px-4 py-2 border border-white/10 text-white/90 rounded-xl font-semibold text-sm hover:bg-white/6 transition-all transform hover:-translate-y-0.5">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Section */}
          {activeSection === "preferences" && (
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Preferences
                  </h2>
                  <p className="text-white/80">
                    Customize your application experience
                  </p>
                </div>
                <button
                  onClick={() => handleSave("preferences")}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Preferences
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Theme Preferences */}
                <div
                  className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                      <Palette className="w-5 h-5 text-white" />
                    </div>
                    Theme Preferences
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-4">
                        Select Theme
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {themes.map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() =>
                              handlePreferenceChange("theme", theme.id)
                            }
                            className={`p-4 rounded-xl border-2 transition-all transform hover:-translate-y-1 ${
                              preferences.theme === theme.id
                                ? "border-[#b87bd1] bg-white/10"
                                : "border-white/10 hover:border-white/20"
                            }`}
                          >
                            <theme.icon
                              className={`w-6 h-6 mb-2 ${
                                preferences.theme === theme.id
                                  ? "text-[#b87bd1]"
                                  : "text-white/70"
                              }`}
                            />
                            <div className="text-sm font-medium text-white">
                              {theme.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) =>
                          handlePreferenceChange("language", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white"
                      >
                        {languages.map((lang) => (
                          <option
                            key={lang.id}
                            value={lang.id}
                            className="bg-slate-800"
                          >
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Application Preferences */}
                <div
                  className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                      <SettingsIcon className="w-5 h-5 text-white" />
                    </div>
                    Application Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        id: "autoSave",
                        label: "Auto-save progress",
                        description: "Automatically save your work",
                      },
                      {
                        id: "jobAlerts",
                        label: "Job alerts",
                        description: "Receive matching job notifications",
                      },
                      {
                        id: "courseUpdates",
                        label: "Course updates",
                        description: "Get notified about new course content",
                      },
                      {
                        id: "newsletter",
                        label: "Newsletter",
                        description: "Receive career tips and updates",
                      },
                    ].map((pref) => (
                      <div
                        key={pref.id}
                        className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-white/5"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                        }}
                      >
                        <div>
                          <div className="font-medium text-white">
                            {pref.label}
                          </div>
                          <div className="text-sm text-white/70">
                            {pref.description}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            handlePreferenceChange(
                              pref.id,
                              !preferences[pref.id]
                            )
                          }
                          className={`w-12 h-6 rounded-full transition-all ${
                            preferences[pref.id]
                              ? "bg-[#b87bd1]"
                              : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              preferences[pref.id]
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          ></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="max-w-2xl space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Security Settings
                </h2>
                <p className="text-white/80">
                  Manage your password and security preferences
                </p>
              </div>

              <div
                className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        value={securityData.oldPassword}
                        onChange={(e) =>
                          handleSecurityChange("oldPassword", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50 pr-12"
                        placeholder="Enter current password"
                      />
                      <button
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                      >
                        {showOldPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={securityData.newPassword}
                        onChange={(e) =>
                          handleSecurityChange("newPassword", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50 pr-12"
                        placeholder="Enter new password"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={securityData.confirmPassword}
                        onChange={(e) =>
                          handleSecurityChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white placeholder-white/50 pr-12"
                        placeholder="Confirm new password"
                      />
                      <button
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    className="w-full px-6 py-4 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg,#803791,#b87bd1)",
                    }}
                  >
                    <Lock className="w-5 h-5" />
                    Update Password
                  </button>
                </div>
              </div>

              {/* Security Features */}
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#b87bd1]" />
                    Two-Factor Authentication
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <button
                    className="w-full px-4 py-2 rounded-xl font-semibold text-sm transition-all transform hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg,#803791,#b87bd1)",
                    }}
                  >
                    Enable 2FA
                  </button>
                </div>
                <div
                  className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-[#b87bd1]" />
                    Active Sessions
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Manage your logged-in devices
                  </p>
                  <button className="w-full px-4 py-2 border border-white/10 text-white/90 rounded-xl font-semibold text-sm hover:bg-white/6 transition-all transform hover:-translate-y-0.5">
                    View Sessions
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="max-w-2xl space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Notification Settings
                </h2>
                <p className="text-white/80">
                  Choose how you want to be notified
                </p>
              </div>

              <div
                className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  Notification Preferences
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      category: "Email Notifications",
                      items: [
                        {
                          id: "emailJobAlerts",
                          label: "Job alerts",
                          description: "New job matches and opportunities",
                        },
                        {
                          id: "emailApplications",
                          label: "Application updates",
                          description: "Status changes for your applications",
                        },
                        {
                          id: "emailCourses",
                          label: "Course updates",
                          description: "New content and progress reminders",
                        },
                      ],
                    },
                    {
                      category: "Push Notifications",
                      items: [
                        {
                          id: "pushInterviews",
                          label: "Interview reminders",
                          description:
                            "Upcoming interviews and schedule changes",
                        },
                        {
                          id: "pushMessages",
                          label: "New messages",
                          description: "Messages from employers and support",
                        },
                        {
                          id: "pushSystem",
                          label: "System updates",
                          description: "Important platform announcements",
                        },
                      ],
                    },
                  ].map((category, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-white mb-4 text-lg">
                        {category.category}
                      </h4>
                      <div className="space-y-3">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-white/5"
                            style={{
                              background: "rgba(255,255,255,0.02)",
                            }}
                          >
                            <div>
                              <div className="font-medium text-white">
                                {item.label}
                              </div>
                              <div className="text-sm text-white/70">
                                {item.description}
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handlePreferenceChange(
                                  item.id,
                                  !preferences[item.id]
                                )
                              }
                              className={`w-12 h-6 rounded-full transition-all ${
                                preferences[item.id]
                                  ? "bg-[#b87bd1]"
                                  : "bg-white/20"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                                  preferences[item.id]
                                    ? "translate-x-7"
                                    : "translate-x-1"
                                }`}
                              ></div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Billing Section */}
          {activeSection === "billing" && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Billing & Subscription
                </h2>
                <p className="text-white/80">
                  Manage your subscription and payment methods
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Current Plan */}
                <div
                  className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    Current Plan
                  </h3>
                  <div
                    className="rounded-xl p-6 border border-[#b87bd1]/20 transition-all hover:shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(128,55,145,0.1), rgba(184,123,209,0.05))",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-white">
                          Pro Plan
                        </div>
                        <div className="text-[#b87bd1] font-semibold">
                          ₹499/month
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-[#b87bd1]/20 text-[#b87bd1] rounded-full text-sm font-semibold">
                        Active
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-white/80 mb-4">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#b87bd1]" />
                        Unlimited job applications
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#b87bd1]" />
                        Priority support
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#b87bd1]" />
                        Advanced analytics
                      </div>
                    </div>
                    <button className="w-full px-4 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/15 transition-all transform hover:-translate-y-0.5 border border-white/10">
                      Manage Subscription
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div
                  className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    Payment Method
                  </h3>
                  <div className="space-y-4">
                    <div
                      className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-white/5"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#b87bd1] rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            Visa ending in {billingData.cardLast4}
                          </div>
                          <div className="text-sm text-white/70">
                            Expires 12/2025
                          </div>
                        </div>
                      </div>
                      <button className="text-[#b87bd1] hover:text-[#803791] font-semibold text-sm">
                        Edit
                      </button>
                    </div>
                    <button className="w-full px-4 py-3 border-2 border-dashed border-white/10 text-white/70 rounded-xl font-semibold hover:border-white/20 hover:bg-white/5 transition-all transform hover:-translate-y-0.5">
                      + Add Payment Method
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div
                className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6">
                  Billing History
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      id: 1,
                      date: "2024-01-15",
                      amount: "₹499",
                      status: "Paid",
                    },
                    {
                      id: 2,
                      date: "2023-12-15",
                      amount: "₹499",
                      status: "Paid",
                    },
                    {
                      id: 3,
                      date: "2023-11-15",
                      amount: "₹499",
                      status: "Paid",
                    },
                  ].map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-white/5"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div>
                        <div className="font-medium text-white">
                          Invoice #{invoice.id}
                        </div>
                        <div className="text-sm text-white/70">
                          {invoice.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-semibold text-white">
                          {invoice.amount}
                        </div>
                        <div className="px-3 py-1 bg-[#b87bd1]/20 text-[#b87bd1] rounded-full text-sm font-semibold">
                          {invoice.status}
                        </div>
                        <button className="text-[#b87bd1] hover:text-[#803791] font-semibold text-sm">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Privacy Section */}
          {activeSection === "privacy" && (
            <div className="max-w-2xl space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Privacy Settings
                </h2>
                <p className="text-white/80">
                  Control your privacy and data preferences
                </p>
              </div>

              <div
                className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  Data & Privacy
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Profile Visibility",
                      description:
                        "Control who can see your profile and resume",
                      options: ["Public", "Employers only", "Private"],
                    },
                    {
                      title: "Data Sharing",
                      description:
                        "Allow us to use your data to improve job recommendations",
                      options: ["Enabled", "Disabled"],
                    },
                    {
                      title: "Marketing Communications",
                      description:
                        "Receive emails about new features and promotions",
                      options: ["Subscribed", "Unsubscribed"],
                    },
                  ].map((setting, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-white/5"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div>
                        <div className="font-medium text-white">
                          {setting.title}
                        </div>
                        <div className="text-sm text-white/70">
                          {setting.description}
                        </div>
                      </div>
                      <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all text-white">
                        {setting.options.map((option) => (
                          <option key={option} className="bg-slate-800">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Management */}
              <div
                className="rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6">
                  Data Management
                </h3>
                <div className="space-y-4">
                  <button
                    className="w-full flex items-center justify-between p-4 rounded-xl transition-all hover:bg-white/5"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div>
                      <div className="font-medium text-white">
                        Download Your Data
                      </div>
                      <div className="text-sm text-white/70">
                        Get a copy of all your data
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-white/50" />
                  </button>
                  <button
                    className="w-full flex items-center justify-between p-4 rounded-xl transition-all hover:bg-red-500/10 border border-red-500/20"
                    style={{
                      background: "rgba(239, 68, 68, 0.05)",
                    }}
                  >
                    <div>
                      <div className="font-medium text-red-400">
                        Delete Account
                      </div>
                      <div className="text-sm text-red-400/70">
                        Permanently delete your account and all data
                      </div>
                    </div>
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
