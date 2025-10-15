"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  Mail,
  Phone,
  Upload,
  Save,
  Camera,
  Edit3,
  Briefcase,
  Target,
  Award,
  FileText,
  Plus,
  Trash2,
  Check,
  X,
  Linkedin,
  Twitter,
  Facebook,
  ExternalLink,
  TrendingUp,
  Clock,
  DollarSign,
  AlertCircle,
  Sparkles,
  Zap,
  Star,
  Rocket,
} from "lucide-react";

import { customToast } from "@/components/ui/toast";

import { userService } from "@/services/userService";

// Enhanced Loading Skeleton Component
const CompanyProfileSkeleton = () => {
  return (
    <div className="relative min-h-screen p-6 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: "rgba(128,55,145,0.12)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse delay-300"
          style={{ background: "rgba(184,123,209,0.08)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl animate-pulse delay-700"
          style={{ background: "rgba(240,194,238,0.05)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.06),_transparent_50%)] animate-pulse" />
      </div>

      {/* Header Skeleton */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/10 mb-6 animate-pulse"
        style={{
          background:
            "linear-gradient(90deg, rgba(128,55,145,0.18), rgba(184,123,209,0.12))",
          boxShadow: "0 20px 60px rgba(128,55,145,0.18)",
        }}
      >
        <div className="animate-pulse">
          <div className="h-8 bg-white/25 rounded-xl w-1/3 mb-2"></div>
          <div className="h-4 bg-white/25 rounded-xl w-1/2"></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column Skeleton */}
        <div className="space-y-6">
          {/* Company Logo Skeleton */}
          <div
            className="rounded-2xl p-6 shadow-lg border border-white/10 backdrop-blur-sm animate-pulse"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
            }}
          >
            <div className="animate-pulse">
              <div className="h-6 bg-white/25 rounded-xl w-32 mb-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-white/25 rounded-2xl mb-4"></div>
                <div className="h-4 bg-white/25 rounded-xl w-40"></div>
              </div>
            </div>
          </div>

          {/* Quick Stats Skeleton */}
          <div
            className="rounded-2xl p-6 shadow-lg border border-white/10 backdrop-blur-sm animate-pulse"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
            }}
          >
            <div className="animate-pulse">
              <div className="h-6 bg-white/25 rounded-xl w-32 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <div className="h-4 bg-white/25 rounded-xl w-24"></div>
                    <div className="h-6 bg-white/25 rounded-xl w-8"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Form Skeleton */}
        <div
          className="lg:col-span-2 rounded-2xl p-8 shadow-lg border border-white/10 backdrop-blur-sm animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
          }}
        >
          <div className="animate-pulse">
            <div className="h-8 bg-white/25 rounded-xl w-48 mb-6"></div>
            <div className="space-y-8">
              {[1, 2, 3, 4].map((section) => (
                <div key={section} className="space-y-4">
                  <div className="h-6 bg-white/25 rounded-xl w-40 mb-2"></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((field) => (
                      <div key={field}>
                        <div className="h-4 bg-white/25 rounded-xl w-24 mb-2"></div>
                        <div className="h-12 bg-white/25 rounded-2xl"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="h-14 bg-white/25 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating Particles Background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            background: `rgba(${128 + Math.random() * 50}, ${
              55 + Math.random() * 50
            }, ${145 + Math.random() * 50}, ${0.3 + Math.random() * 0.3})`,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 20 + "s",
            animationDuration: 15 + Math.random() * 20 + "s",
          }}
        />
      ))}
    </div>
  );
};

export default function CompanyProfile() {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [isHovering, setIsHovering] = useState(null);
  const [formData, setFormData] = useState({
    company: {
      name: "",
      description: "",
      industry: "",
      size: "",
      website: "",
      foundedYear: new Date().getFullYear(),
    },
    contact: {
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "India",
        zipCode: "",
      },
    },
    position: "",
    department: "",
    hiringNeeds: {
      typesOfRoles: [""],
      locations: [""],
      typicalSalaryRanges: [{ role: "", min: "", max: "", currency: "INR" }],
    },
    bio: "",
    hiringGoals: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
    },
  });

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setDataLoading(true);
        const res = await userService.getProfile();
        const { profile } = res.data || {};

        if (!mounted) return;
        setCompanyLogo(profile?.company?.logo?.url || null);

        if (profile) {
          setFormData({
            company: {
              name: profile?.company?.name || "",
              description: profile?.company?.description || "",
              industry: profile?.company?.industry || "",
              size: profile?.company?.size || "",
              website: profile?.company?.website || "",
              foundedYear:
                profile?.company?.foundedYear || new Date().getFullYear(),
            },
            contact: {
              phone: profile?.contact?.phone || "",
              address: {
                street: profile?.contact?.address?.street || "",
                city: profile?.contact?.address?.city || "",
                state: profile?.contact?.address?.state || "",
                country: profile?.contact?.address?.country || "India",
                zipCode: profile?.contact?.address?.zipCode || "",
              },
            },
            position: profile?.position || "",
            department: profile?.department || "",
            hiringNeeds: {
              typesOfRoles:
                profile?.hiringNeeds?.typesOfRoles?.length > 0
                  ? profile.hiringNeeds.typesOfRoles
                  : [""],
              locations:
                profile?.hiringNeeds?.locations?.length > 0
                  ? profile.hiringNeeds.locations
                  : [""],
              typicalSalaryRanges:
                profile?.hiringNeeds?.typicalSalaryRanges?.length > 0
                  ? profile.hiringNeeds.typicalSalaryRanges
                  : [{ role: "", min: "", max: "", currency: "INR" }],
            },
            bio: profile?.bio || "",
            hiringGoals: profile?.hiringGoals || "",
            socialLinks: {
              linkedin: profile?.socialLinks?.linkedin || "",
              twitter: profile?.socialLinks?.twitter || "",
              facebook: profile?.socialLinks?.facebook || "",
            },
          });
        }
      } catch (error) {
        console.error("Failed to load company profile:", error);
        customToast.error("Error", "Failed to load company profile data");
      } finally {
        if (mounted) {
          setDataLoading(false);
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (dataLoading) {
    return <CompanyProfileSkeleton />;
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      customToast.error("Error", "Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      customToast.error("Error", "Logo size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setCompanyLogo(reader.result);
    reader.readAsDataURL(file);

    try {
      await userService.uploadProfilePicture(file);
      customToast.success("Success", "Company logo updated successfully");
    } catch (error) {
      console.error("Failed to upload company logo:", error);
      customToast.error("Error", "Failed to upload company logo");
    }
  };

  const handleInputChange = (path, value) => {
    const paths = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < paths.length - 1; i++) {
        current[paths[i]] = { ...current[paths[i]] };
        current = current[paths[i]];
      }
      current[paths[paths.length - 1]] = value;
      return newData;
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!formData.company.name) {
        customToast.error("Error", "Company name is required");
        return;
      }

      const payload = {
        company: formData.company,
        contact: formData.contact,
        position: formData.position,
        department: formData.department,
        hiringNeeds: {
          typesOfRoles: formData.hiringNeeds.typesOfRoles.filter(
            (role) => role.trim() !== ""
          ),
          locations: formData.hiringNeeds.locations.filter(
            (location) => location.trim() !== ""
          ),
          typicalSalaryRanges: formData.hiringNeeds.typicalSalaryRanges
            .filter((range) => range.role && range.min && range.max)
            .map((range) => ({
              ...range,
              min: parseInt(range.min),
              max: parseInt(range.max),
            })),
        },
        bio: formData.bio,
        hiringGoals: formData.hiringGoals,
        socialLinks: formData.socialLinks,
      };

      await userService.updateProfile(payload);
      customToast.success("Success", "Company profile updated successfully");
    } catch (error) {
      console.error("Failed to update company profile:", error);
      customToast.error("Error", "Failed to update company profile");
    } finally {
      setLoading(false);
    }
  };

  const profileCompleteness = () => {
    let completed = 0;
    const total = 10;

    if (formData.company.name) completed++;
    if (formData.company.description) completed++;
    if (formData.company.industry) completed++;
    if (formData.company.website) completed++;
    if (formData.contact.phone) completed++;
    if (formData.contact.address.city) completed++;
    if (formData.hiringNeeds.typesOfRoles.some((r) => r)) completed++;
    if (formData.hiringNeeds.locations.some((l) => l)) completed++;
    if (formData.bio) completed++;
    if (companyLogo) completed++;

    return Math.round((completed / total) * 100);
  };

  const completeness = profileCompleteness();

  return (
    <div className="relative min-h-screen p-6 space-y-6 overflow-hidden">
      {/* Enhanced Background Effects */}
      <FloatingParticles />

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
          style={{ background: "rgba(128,55,145,0.12)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse-slow delay-1000"
          style={{ background: "rgba(184,123,209,0.08)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl animate-pulse-slow delay-2000"
          style={{ background: "rgba(240,194,238,0.05)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.06),_transparent_50%)]" />

        {/* Animated Gradient Orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-orb-1"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full blur-3xl animate-orb-2"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
      </div>

      {/* Enhanced Header Section */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-3xl hover:border-white/20 group"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.18), rgba(184,123,209,0.12))",
          boxShadow: "0 25px 60px rgba(128,55,145,0.18)",
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl animate-ping-slow"
            style={{ background: "rgba(184,123,209,0.08)" }}
          />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Company Profile
              </h1>
              <Sparkles className="w-6 h-6 text-[#b87bd1] animate-pulse" />
            </div>
            <p className="text-white/85 text-lg font-light">
              Manage your employer profile and hiring preferences
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-white/80 font-medium">
                Profile Completeness
              </div>
              <div className="text-3xl font-black text-white bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {completeness}%
              </div>
            </div>
            <div className="relative">
              <div className="w-20 h-20 transform hover:scale-110 transition-transform duration-300">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${completeness * 2} 200`}
                    strokeLinecap="round"
                    className="animate-dash"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#803791" />
                      <stop offset="50%" stopColor="#b87bd1" />
                      <stop offset="100%" stopColor="#f0c2ee" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {completeness === 100 ? (
                    <Check className="w-8 h-8 text-[#b87bd1] animate-bounce" />
                  ) : (
                    <Star className="w-6 h-6 text-[#b87bd1] animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Enhanced Cards */}
        <div className="space-y-8">
          {/* Enhanced Company Logo Card */}
          <div
            className="rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30 hover:scale-[1.02] group"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Company Logo
              </span>
            </h3>
            <div className="flex flex-col items-center">
              <div
                className="relative group/logo mb-6 transform transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setIsHovering("logo")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div
                  className="w-40 h-40 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl overflow-hidden border-2 border-white/10 transition-all duration-500 group-hover/logo:border-[#b87bd1]"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  {companyLogo ? (
                    <img
                      src={companyLogo}
                      alt="Company Logo"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/logo:scale-110"
                    />
                  ) : (
                    <Building2 className="w-16 h-16 text-white transition-transform duration-500 group-hover/logo:scale-110" />
                  )}
                </div>
                <label
                  className="absolute -bottom-2 -right-2 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl group/upload"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                    boxShadow: "0 8px 32px rgba(128,55,145,0.4)",
                  }}
                >
                  <Camera className="w-6 h-6 text-white transition-transform duration-300 group-hover/upload:scale-110" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </label>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] opacity-0 group-hover/logo:opacity-20 blur-xl transition-all duration-500 -z-10" />
              </div>
              <p className="text-sm text-white/80 text-center font-medium">
                Max size: 5MB • PNG, JPG, WEBP
              </p>
            </div>
          </div>

          {/* Enhanced Quick Stats */}
          <div
            className="rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30 hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Company Insights
              </span>
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: Briefcase,
                  label: "Active Jobs",
                  value: "12",
                  color: "from-green-500 to-emerald-400",
                },
                {
                  icon: Users,
                  label: "Applications",
                  value: "245",
                  color: "from-blue-500 to-cyan-400",
                },
                {
                  icon: Award,
                  label: "Success Rate",
                  value: "89%",
                  color: "from-purple-500 to-pink-400",
                },
                {
                  icon: Rocket,
                  label: "Response Time",
                  value: "2.1h",
                  color: "from-orange-500 to-red-400",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="group p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                  onMouseEnter={() => setIsHovering(`stat-${index}`)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg transform transition-transform duration-300 group-hover:scale-110`}
                      >
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-white/80 font-medium">
                          {stat.label}
                        </div>
                        <div className="text-2xl font-black text-white bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Zap className="w-4 h-4 text-[#b87bd1] animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div
            className="rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30 hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Quick Actions
              </span>
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: Plus,
                  label: "Post New Job",
                  color: "from-green-500 to-emerald-400",
                },
                {
                  icon: FileText,
                  label: "View Applications",
                  color: "from-blue-500 to-cyan-400",
                },
                {
                  icon: Target,
                  label: "Analytics Dashboard",
                  color: "from-purple-500 to-pink-400",
                },
                {
                  icon: Users,
                  label: "Team Management",
                  color: "from-orange-500 to-amber-400",
                },
              ].map((action, index) => (
                <button
                  key={action.label}
                  className="w-full p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all duration-300 flex items-center gap-4 border border-white/10 hover:border-[#b87bd1]/50 hover:shadow-lg hover:scale-[1.02] group/action"
                  onMouseEnter={() => setIsHovering(`action-${index}`)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div
                    className={`p-2 rounded-xl bg-gradient-to-br ${action.color} shadow-lg transform transition-transform duration-300 group-hover/action:scale-110`}
                  >
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-white/90 group-hover/action:text-white transition-colors duration-300">
                    {action.label}
                  </span>
                  <div className="ml-auto opacity-0 group-hover/action:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/action:translate-x-0">
                    <ExternalLink className="w-4 h-4 text-[#b87bd1]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Enhanced Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced Company Information */}
          <div
            className="rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            }}
          >
            <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Company Information
              </span>
            </h2>

            <div className="space-y-8">
              {/* Company Name & Industry */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company.name}
                    onChange={(e) =>
                      handleInputChange("company.name", e.target.value)
                    }
                    placeholder="Enter company name"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Industry
                  </label>
                  <select
                    value={formData.company.industry}
                    onChange={(e) =>
                      handleInputChange("company.industry", e.target.value)
                    }
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Company Size & Founded Year */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Company Size
                  </label>
                  <select
                    value={formData.company.size}
                    onChange={(e) =>
                      handleInputChange("company.size", e.target.value)
                    }
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Founded Year
                  </label>
                  <input
                    type="number"
                    value={formData.company.foundedYear}
                    onChange={(e) =>
                      handleInputChange("company.foundedYear", e.target.value)
                    }
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/90">
                  Website
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                    <Globe className="w-5 h-5" />
                  </div>
                  <input
                    type="url"
                    value={formData.company.website}
                    onChange={(e) =>
                      handleInputChange("company.website", e.target.value)
                    }
                    placeholder="https://example.com"
                    className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/90">
                  Company Description
                </label>
                <textarea
                  value={formData.company.description}
                  onChange={(e) =>
                    handleInputChange("company.description", e.target.value)
                  }
                  rows={4}
                  placeholder="Tell us about your company, mission, values, and culture..."
                  className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Contact Information */}
          <div
            className="rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            }}
          >
            <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Contact Information
              </span>
            </h2>

            <div className="space-y-8">
              {/* Phone & Street */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      value={formData.contact.phone}
                      onChange={(e) =>
                        handleInputChange("contact.phone", e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.contact.address.street}
                    onChange={(e) =>
                      handleInputChange(
                        "contact.address.street",
                        e.target.value
                      )
                    }
                    placeholder="123 Business Park"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    City
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={formData.contact.address.city}
                      onChange={(e) =>
                        handleInputChange(
                          "contact.address.city",
                          e.target.value
                        )
                      }
                      placeholder="Enter city"
                      className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    State / Province
                  </label>
                  <input
                    type="text"
                    value={formData.contact.address.state}
                    onChange={(e) =>
                      handleInputChange("contact.address.state", e.target.value)
                    }
                    placeholder="Enter state"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Country & Zip Code */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.contact.address.country}
                    onChange={(e) =>
                      handleInputChange(
                        "contact.address.country",
                        e.target.value
                      )
                    }
                    placeholder="Enter country"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Zip / Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.contact.address.zipCode}
                    onChange={(e) =>
                      handleInputChange(
                        "contact.address.zipCode",
                        e.target.value
                      )
                    }
                    placeholder="Enter zip code"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Save Button Section */}
          <div
            className="sticky bottom-6 rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-3xl hover:border-[#b87bd1]/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            }}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full px-8 py-5 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:from-[#703181] hover:to-[#a86bc1] text-white rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] group"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-lg">Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-6 h-6 transform transition-transform duration-500 group-hover:scale-110" />
                      <span className="text-lg">Save Company Profile</span>
                      <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                  )}
                </button>

                {completeness < 100 && (
                  <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-4 backdrop-blur-sm">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
                    <div className="text-sm text-amber-200">
                      <span className="font-bold">Complete your profile!</span>{" "}
                      Your profile is{" "}
                      <span className="font-black">
                        {completeness}% complete
                      </span>
                      . Finish setting up to attract more candidates and unlock
                      all features.
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right min-w-max">
                <div className="text-sm text-white/80 font-medium">
                  Last saved
                </div>
                <div className="text-sm text-white font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#b87bd1]" />
                  Just now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes orb-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, -30px) scale(1.1);
          }
        }
        @keyframes orb-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 40px) scale(1.05);
          }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-dash {
          animation: dash 1.5s ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
        .animate-orb-1 {
          animation: orb-1 15s ease-in-out infinite;
        }
        .animate-orb-2 {
          animation: orb-2 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
