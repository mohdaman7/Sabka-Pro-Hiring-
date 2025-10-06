"use client"

import { useState } from "react"
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
  Briefcase
} from "lucide-react"

export default function StudentSettings() {
  const [activeSection, setActiveSection] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: "Amit",
    lastName: "Sharma",
    email: "amit.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    bio: "Frontend developer passionate about creating beautiful user experiences with React and Next.js.",
    jobTitle: "Frontend Developer",
    company: "Tech Solutions"
  })

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
    pushSystem: true
  })

  const [securityData, setSecurityData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [billingData, setBillingData] = useState({
    plan: "pro",
    status: "active",
    nextBilling: "2024-02-15",
    paymentMethod: "card",
    cardLast4: "4242"
  })

  const sections = [
    { id: "profile", name: "Profile", icon: User, description: "Manage your personal information" },
    { id: "preferences", name: "Preferences", icon: Palette, description: "Customize your experience" },
    { id: "security", name: "Security", icon: Shield, description: "Update password and security" },
    { id: "notifications", name: "Notifications", icon: Bell, description: "Control your notifications" },
    { id: "billing", name: "Billing", icon: CreditCard, description: "Manage subscription and payments" },
    { id: "privacy", name: "Privacy", icon: Lock, description: "Privacy and data settings" }
  ]

  const themes = [
    { id: "light", name: "Light", icon: Sun },
    { id: "dark", name: "Dark", icon: Moon },
  ]

  const languages = [
    { id: "en", name: "English" },
    { id: "hi", name: "Hindi" },
    { id: "mr", name: "Marathi" },
    { id: "ta", name: "Tamil" }
  ]

  const handleSave = async (section) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Show success message
  }

  const handleReset = (section) => {
    // Reset logic here
    console.log(`Reset ${section}`)
  }

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleProfileChange = (key, value) => {
    setProfileData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSecurityChange = (key, value) => {
    setSecurityData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Sidebar Navigation */}
      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-slate-200/50 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-600">Manage your account preferences</p>
          </div>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-700 hover:bg-white hover:shadow-md hover:border hover:border-slate-200/50"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold">{section.name}</div>
                  <div className={`text-sm ${activeSection === section.id ? 'text-blue-100' : 'text-slate-500'}`}>
                    {section.description}
                  </div>
                </div>
                {activeSection === section.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-slate-50/50 rounded-2xl border border-slate-200/50">
          <h3 className="font-semibold text-slate-900 mb-3">Account Overview</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Member since</span>
              <span className="font-medium text-slate-900">Jan 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Plan</span>
              <span className="font-medium text-green-600">Pro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Storage used</span>
              <span className="font-medium text-slate-900">1.2/5 GB</span>
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
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Profile Settings</h2>
                <p className="text-slate-600">Update your personal and professional information</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleReset('profile')}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={() => handleSave('profile')}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
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
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-blue-600" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                    Professional Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        value={profileData.jobTitle}
                        onChange={(e) => handleProfileChange('jobTitle', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => handleProfileChange('company', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                      <textarea
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Profile Photo</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      AS
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-600 mb-4">Upload a new profile photo. Recommended size: 256x256px</p>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all">
                          Upload New
                        </button>
                        <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all">
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
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Preferences</h2>
                <p className="text-slate-600">Customize your application experience</p>
              </div>
              <button
                onClick={() => handleSave('preferences')}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
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
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Palette className="w-6 h-6 text-purple-600" />
                  Theme Preferences
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-4">Select Theme</label>
                    <div className="grid grid-cols-2 gap-4">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handlePreferenceChange('theme', theme.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            preferences.theme === theme.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <theme.icon className={`w-6 h-6 mb-2 ${
                            preferences.theme === theme.id ? 'text-blue-600' : 'text-slate-600'
                          }`} />
                          <div className="text-sm font-medium text-slate-900">{theme.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                    <select
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      {languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Application Preferences */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <SettingsIcon className="w-6 h-6 text-orange-600" />
                  Application Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    { id: 'autoSave', label: 'Auto-save progress', description: 'Automatically save your work' },
                    { id: 'jobAlerts', label: 'Job alerts', description: 'Receive matching job notifications' },
                    { id: 'courseUpdates', label: 'Course updates', description: 'Get notified about new course content' },
                    { id: 'newsletter', label: 'Newsletter', description: 'Receive career tips and updates' }
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div>
                        <div className="font-medium text-slate-900">{pref.label}</div>
                        <div className="text-sm text-slate-600">{pref.description}</div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange(pref.id, !preferences[pref.id])}
                        className={`w-12 h-6 rounded-full transition-all ${
                          preferences[pref.id] 
                            ? 'bg-blue-600' 
                            : 'bg-slate-300'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences[pref.id] 
                            ? 'translate-x-7' 
                            : 'translate-x-1'
                        }`}></div>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Security Settings</h2>
              <p className="text-slate-600">Manage your password and security preferences</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Key className="w-6 h-6 text-green-600" />
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      value={securityData.oldPassword}
                      onChange={(e) => handleSecurityChange('oldPassword', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
                    />
                    <button
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={securityData.newPassword}
                      onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={securityData.confirmPassword}
                      onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Update Password
                </button>
              </div>
            </div>

            {/* Security Features */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Two-Factor Authentication
                </h3>
                <p className="text-slate-600 text-sm mb-4">Add an extra layer of security to your account</p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all">
                  Enable 2FA
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  Active Sessions
                </h3>
                <p className="text-slate-600 text-sm mb-4">Manage your logged-in devices</p>
                <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all">
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
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Notification Settings</h2>
              <p className="text-slate-600">Choose how you want to be notified</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Bell className="w-6 h-6 text-orange-600" />
                Notification Preferences
              </h3>
              <div className="space-y-6">
                {[
                  {
                    category: "Email Notifications",
                    items: [
                      { id: 'emailJobAlerts', label: 'Job alerts', description: 'New job matches and opportunities' },
                      { id: 'emailApplications', label: 'Application updates', description: 'Status changes for your applications' },
                      { id: 'emailCourses', label: 'Course updates', description: 'New content and progress reminders' }
                    ]
                  },
                  {
                    category: "Push Notifications",
                    items: [
                      { id: 'pushInterviews', label: 'Interview reminders', description: 'Upcoming interviews and schedule changes' },
                      { id: 'pushMessages', label: 'New messages', description: 'Messages from employers and support' },
                      { id: 'pushSystem', label: 'System updates', description: 'Important platform announcements' }
                    ]
                  }
                ].map((category, index) => (
                  <div key={index}>
                    <h4 className="font-bold text-slate-900 mb-4 text-lg">{category.category}</h4>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                          <div>
                            <div className="font-medium text-slate-900">{item.label}</div>
                            <div className="text-sm text-slate-600">{item.description}</div>
                          </div>
                          <button
                            onClick={() => handlePreferenceChange(item.id, !preferences[item.id])}
                            className={`w-12 h-6 rounded-full transition-all ${
                              preferences[item.id] 
                                ? 'bg-blue-600' 
                                : 'bg-slate-300'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              preferences[item.id] 
                                ? 'translate-x-7' 
                                : 'translate-x-1'
                            }`}></div>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Billing & Subscription</h2>
              <p className="text-slate-600">Manage your subscription and payment methods</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Current Plan */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-green-600" />
                  Current Plan
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">Pro Plan</div>
                      <div className="text-green-600 font-semibold">₹999/month</div>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      Active
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Unlimited job applications
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Priority support
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Advanced analytics
                    </div>
                  </div>
                  <button className="w-full mt-6 px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all">
                    Manage Subscription
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Payment Method</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">Visa ending in {billingData.cardLast4}</div>
                        <div className="text-sm text-slate-600">Expires 12/2025</div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      Edit
                    </button>
                  </div>
                  <button className="w-full px-4 py-3 border-2 border-dashed border-slate-300 text-slate-600 rounded-xl font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all">
                    + Add Payment Method
                  </button>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Billing History</h3>
              <div className="space-y-3">
                {[
                  { id: 1, date: '2024-01-15', amount: '₹999', status: 'Paid' },
                  { id: 2, date: '2023-12-15', amount: '₹999', status: 'Paid' },
                  { id: 3, date: '2023-11-15', amount: '₹999', status: 'Paid' }
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <div className="font-medium text-slate-900">Invoice #{invoice.id}</div>
                      <div className="text-sm text-slate-600">{invoice.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-semibold text-slate-900">{invoice.amount}</div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {invoice.status}
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
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
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Privacy Settings</h2>
              <p className="text-slate-600">Control your privacy and data preferences</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-purple-600" />
                Data & Privacy
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Profile Visibility",
                    description: "Control who can see your profile and resume",
                    options: ["Public", "Employers only", "Private"]
                  },
                  {
                    title: "Data Sharing",
                    description: "Allow us to use your data to improve job recommendations",
                    options: ["Enabled", "Disabled"]
                  },
                  {
                    title: "Marketing Communications",
                    description: "Receive emails about new features and promotions",
                    options: ["Subscribed", "Unsubscribed"]
                  }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <div className="font-medium text-slate-900">{setting.title}</div>
                      <div className="text-sm text-slate-600">{setting.description}</div>
                    </div>
                    <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                      {setting.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Data Management</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
                  <div>
                    <div className="font-medium text-slate-900">Download Your Data</div>
                    <div className="text-sm text-slate-600">Get a copy of all your data</div>
                  </div>
                  <Download className="w-5 h-5 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all text-red-700">
                  <div>
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm">Permanently delete your account and all data</div>
                  </div>
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}