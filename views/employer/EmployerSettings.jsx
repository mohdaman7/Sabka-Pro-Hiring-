import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import {
  User,
  Building,
  Bell,
  Lock,
  CreditCard,
  Shield,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  Camera,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

export default function EmployerSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [company, setCompany] = useState({ name: "", website: "", description: "" });
  const [contact, setContact] = useState({ email: "", phone: "", address: "" });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await userService.getProfile();
        const { user, profile } = res.data || {};
        if (!mounted) return;
        setCompany({
          name: profile?.company?.name || "",
          website: profile?.company?.website || "",
          description: profile?.company?.description || "",
        });
        setContact({
          email: user?.email || "",
          phone: profile?.contact?.phone || "",
          address: [
            profile?.contact?.address?.street,
            profile?.contact?.address?.city,
            profile?.contact?.address?.state,
            profile?.contact?.address?.country,
            profile?.contact?.address?.zipCode,
          ]
            .filter(Boolean)
            .join(", ") || "",
        });
      } catch (_) {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const tabs = [
    { id: "profile", label: "Company Profile", icon: Building },
    { id: "account", label: "Account Settings", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Decorative background orbs */}
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
      </div>

      {/* Header */}
      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Settings
        </h1>
        <p className="text-white/80">
          Manage your account and company preferences
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div
          className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl border animate-in slide-in-from-top-5"
          style={{
            background: "rgba(16,185,129,0.15)",
            borderColor: "rgba(16,185,129,0.3)",
            backdropFilter: "blur(12px)",
          }}
        >
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-white font-medium">
            Settings saved successfully!
          </span>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div
          className="lg:col-span-1 rounded-xl p-4 shadow-xl h-fit"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
                      : "text-white/80 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div
          className="lg:col-span-3 rounded-xl p-6 shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Company Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Company Profile
                </h2>
                <p className="text-white/70">
                  Update your company information and branding
                </p>
              </div>

              {/* Company Logo */}
              <div className="flex items-center gap-6">
                <div
                  className="w-24 h-24 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <Building className="w-12 h-12 text-white" />
                </div>
                <div>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors border border-white/10 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Upload Logo
                  </button>
                  <p className="text-xs text-white/60 mt-2">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#b87bd1]" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#b87bd1]" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#b87bd1]" />
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#b87bd1]" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#b87bd1]" />
                  Company Address
                </label>
                <textarea
                  rows={3}
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">
                  Company Description
                </label>
                <textarea
                  rows={4}
                  value={company.description}
                  onChange={(e) => setCompany({ ...company, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all resize-none"
                />
              </div>

              <button
                onClick={async () => {
                  const [street, city, state, country, zip] = contact.address.split(",").map((s) => s.trim());
                  await userService.updateProfile({
                    company: { name: company.name, website: company.website, description: company.description },
                    contact: { phone: contact.phone, address: { street, city, state, country, zipCode: zip } },
                  });
                  handleSave();
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform hover:scale-105 font-medium shadow-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}

          {/* Account Settings Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Account Settings
                </h2>
                <p className="text-white/70">
                  Manage your personal account information
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="john.doe@techsolutions.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Job Title
                  </label>
                  <input
                    type="text"
                    defaultValue="HR Manager"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform hover:scale-105 font-medium shadow-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Notification Preferences
                </h2>
                <p className="text-white/70">
                  Choose how you want to be notified
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "New Applications",
                    desc: "Get notified when candidates apply",
                  },
                  {
                    label: "Application Updates",
                    desc: "Status changes on applications",
                  },
                  {
                    label: "Messages",
                    desc: "Direct messages from candidates",
                  },
                  {
                    label: "Job Post Expiry",
                    desc: "Reminders before job posts expire",
                  },
                  {
                    label: "Weekly Summary",
                    desc: "Weekly digest of your activities",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#803791] peer-checked:to-[#b87bd1]"></div>
                    </label>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform hover:scale-105 font-medium shadow-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Security Settings
                </h2>
                <p className="text-white/70">Keep your account secure</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all pr-12"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all pr-12"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
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
                  <label className="text-sm font-semibold text-white mb-2 block">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] transition-all"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="p-4 rounded-lg bg-[#b87bd1]/10 border border-[#b87bd1]/20">
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#b87bd1]" />
                    Password Requirements
                  </h3>
                  <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                    <li>At least 8 characters long</li>
                    <li>Contains uppercase and lowercase letters</li>
                    <li>Includes at least one number</li>
                    <li>Has at least one special character</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform hover:scale-105 font-medium shadow-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Update Password
              </button>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Billing & Subscription
                </h2>
                <p className="text-white/70">
                  Manage your subscription and payment methods
                </p>
              </div>

              {/* Current Plan */}
              <div
                className="p-6 rounded-lg border"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(128,55,145,0.15), rgba(184,123,209,0.10))",
                  borderColor: "rgba(184,123,209,0.3)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                    <p className="text-white/70">₹2,999/month</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Unlimited job postings</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                  <li>• Featured listings</li>
                </ul>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold text-white mb-4">
                  Payment Method
                </h3>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        •••• •••• •••• 4242
                      </p>
                      <p className="text-sm text-white/60">Expires 12/24</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors text-sm">
                    Edit
                  </button>
                </div>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform hover:scale-105 font-medium shadow-lg">
                Upgrade Plan
              </button>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Privacy Settings
                </h2>
                <p className="text-white/70">Control your privacy and data</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Profile Visibility",
                    desc: "Make your company profile public",
                  },
                  {
                    label: "Show Contact Info",
                    desc: "Display email and phone publicly",
                  },
                  { label: "Activity Status", desc: "Show when you're online" },
                  {
                    label: "Data Sharing",
                    desc: "Share analytics data for improvements",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#803791] peer-checked:to-[#b87bd1]"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="font-semibold text-white mb-2">Danger Zone</h3>
                <p className="text-sm text-white/70 mb-4">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
