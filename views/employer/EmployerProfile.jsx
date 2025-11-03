"use client";

import { useState, useEffect } from "react";
import { employerService } from "@/services/employerService";
import { userService } from "@/services/userService";
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
  Shield,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";

const customToast = {
  success: (title, message) => console.log("Success:", title, message),
  error: (title, message) => console.error("Error:", title, message),
};

// Enhanced Loading Skeleton Component
const CompanyProfileSkeleton = () => {
  return (
    <div className="relative min-h-screen p-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow opacity-20"
          style={{
            background: "radial-gradient(circle, #803791 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-[140px] animate-pulse-slower opacity-15"
          style={{
            background: "radial-gradient(circle, #b87bd1 0%, transparent 70%)",
          }}
        />
      </div>

      <div
        className="rounded-[32px] p-10 mb-8 animate-pulse"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08))",
        }}
      >
        <div className="h-10 bg-white/25 rounded-xl sm:rounded-2xl w-1/3 mb-3"></div>
        <div className="h-6 bg-white/25 rounded-xl sm:rounded-2xl w-1/2"></div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-[28px] p-8 animate-pulse"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              }}
            >
              <div className="h-8 bg-white/25 rounded-xl sm:rounded-2xl w-48 mb-6"></div>
              <div className="space-y-4">
                {[1, 2].map((j) => (
                  <div key={j} className="h-16 bg-white/25 rounded-xl sm:rounded-2xl"></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4 sm:space-y-5 md:space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-[24px] p-6 animate-pulse"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              }}
            >
              <div className="h-6 bg-white/25 rounded-xl w-32 mb-4"></div>
              <div className="h-32 bg-white/25 rounded-xl"></div>
            </div>
          ))}
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
  const [verification, setVerification] = useState(null);
  const [docs, setDocs] = useState([]);
  const [docType, setDocType] = useState("business_license");
  const [docFile, setDocFile] = useState(null);
  const [docUploading, setDocUploading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [themeColor, setThemeColor] = useState("");
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
    branding: {
      themeColor: "",
      coverImage: null,
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
        setCoverImage(profile?.branding?.coverImage?.url || null);
        setThemeColor(profile?.branding?.themeColor || "");

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
            branding: {
              themeColor: profile?.branding?.themeColor || "",
              coverImage: profile?.branding?.coverImage || null,
            },
          });
        }

        try {
          const v = await employerService.getVerificationStatus();
          setVerification(v.data);
          setDocs(v.data?.documents || []);
        } catch (e) {}
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
        branding: {
          themeColor,
        },
      };

      await employerService.updateProfile(payload);
      customToast.success("Success", "Company profile updated successfully");
    } catch (error) {
      console.error("Failed to update company profile:", error);
      customToast.error("Error", "Failed to update company profile");
    } finally {
      setLoading(false);
    }
  };

  const refreshVerification = async () => {
    try {
      const v = await employerService.getVerificationStatus();
      setVerification(v.data);
      setDocs(v.data?.documents || []);
    } catch {}
  };

  const handleDocUpload = async () => {
    try {
      if (!docFile) {
        customToast.error("Error", "Please choose a document file");
        return;
      }
      setDocUploading(true);
      await employerService.uploadVerificationDocument(docType, docFile);
      setDocFile(null);
      await refreshVerification();
      customToast.success("Success", "Document uploaded");
    } catch (e) {
      console.error(e);
      customToast.error("Error", "Failed to upload document");
    } finally {
      setDocUploading(false);
    }
  };

  const handleDocDelete = async (docId) => {
    try {
      await employerService.deleteVerificationDocument(docId);
      await refreshVerification();
      customToast.success("Deleted", "Document removed");
    } catch {
      customToast.error("Error", "Failed to delete document");
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      customToast.error("Error", "Only image files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      customToast.error("Error", "Max size is 10MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setCoverImage(reader.result);
    reader.readAsDataURL(file);
    try {
      await employerService.uploadCoverImage(file);
      customToast.success("Success", "Cover image updated");
    } catch (e) {
      customToast.error("Error", "Failed to upload cover image");
    }
  };

  const handleBrandingSave = async () => {
    try {
      await employerService.updateBranding({ themeColor });
      customToast.success("Success", "Branding updated");
    } catch (e) {
      customToast.error("Error", "Failed to update branding");
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

  const completeness = verification?.profileCompletion ?? profileCompleteness();

  return (
    <div className="relative min-h-screen p-8 space-y-8 overflow-hidden">
      {/* Sophisticated Animated Background */}
      <FloatingParticles />

      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow opacity-20"
          style={{
            background: "radial-gradient(circle, #803791 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-[140px] animate-pulse-slower opacity-15"
          style={{
            background: "radial-gradient(circle, #b87bd1 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] animate-float opacity-10"
          style={{
            background: "radial-gradient(circle, #f0c2ee 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>

      {/* Ultra Premium Header */}
      <div
        className="relative overflow-hidden rounded-[32px] shadow-[0_20px_80px_-20px_rgba(128,55,145,0.5)] backdrop-blur-xl transition-all duration-700 hover:shadow-[0_30px_100px_-20px_rgba(128,55,145,0.6)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
          borderImage:
            "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05)) 1",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-[#803791]/10 via-transparent to-[#b87bd1]/10 animate-gradient-shift" />
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>

        <div className="relative p-10">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative group/icon">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-[24px] blur-xl opacity-50 group-hover/icon:opacity-75 transition-all duration-500" />
                  <div
                    className="relative w-20 h-20 rounded-[20px] flex items-center justify-center shadow-2xl transform group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-all duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg,#803791 0%,#b87bd1 100%)",
                    }}
                  >
                    <Building2
                      className="w-9 h-9 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-5xl font-black tracking-tight mb-2">
                    <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                      Company Profile
                    </span>
                  </h1>
                  <p className="text-white/60 text-lg font-medium">
                    Manage your employer profile and company information
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 pl-24">
                <div className="flex items-center gap-2 text-white/70">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">Active Profile</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">Live Updates</span>
                </div>
              </div>
            </div>

            {/* Profile Completeness Indicator */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <div className="text-right">
                <div className="text-sm text-white/80 font-medium">
                  Profile Completeness
                </div>
                <div className="text-base sm:text-lg md:text-xl sm:text-lg sm:text-base sm:text-lg md:text-xl md:text-2xl md:text-3xl font-black text-white bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
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
      </div>

      {/* Professional Grid Layout: Main Content (Left) + Sidebar (Right) */}
      <div className="grid grid-cols-12 gap-8">
        {/* Main Content Area - Left Side (8 columns) */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Company Information Card */}
          <div
            className="rounded-[28px] p-8 shadow-2xl backdrop-blur-xl border transition-all duration-700 hover:shadow-[0_30px_80px_-20px_rgba(128,55,145,0.4)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <h2 className="text-lg sm:text-base sm:text-lg md:text-xl md:text-2xl font-black text-white mb-8 flex items-center gap-4">
              <div className="p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <Building2 className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Company Information
              </span>
            </h2>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white/90">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company.name}
                    onChange={(e) =>
                      handleInputChange("company.name", e.target.value)
                    }
                    placeholder="Enter company name"
                    className="w-full px-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-white/90">
                  Website
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                    <Globe className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <input
                    type="url"
                    value={formData.company.website}
                    onChange={(e) =>
                      handleInputChange("company.website", e.target.value)
                    }
                    placeholder="https://example.com"
                    className="w-full pl-14 pr-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-white/90">
                  Company Description
                </label>
                <textarea
                  value={formData.company.description}
                  onChange={(e) =>
                    handleInputChange("company.description", e.target.value)
                  }
                  rows={4}
                  placeholder="Tell us about your company, mission, values, and culture..."
                  className="w-full px-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] resize-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div
            className="rounded-[28px] p-8 shadow-2xl backdrop-blur-xl border transition-all duration-700 hover:shadow-[0_30px_80px_-20px_rgba(128,55,145,0.4)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <h2 className="text-lg sm:text-base sm:text-lg md:text-xl md:text-2xl font-black text-white mb-8 flex items-center gap-4">
              <div className="p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <Phone className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Contact Information
              </span>
            </h2>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white/90">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                      <Phone className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <input
                      type="tel"
                      value={formData.contact.phone}
                      onChange={(e) =>
                        handleInputChange("contact.phone", e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      className="w-full pl-14 pr-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white/90">
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
                    className="w-full px-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white/90">
                    City
                  </label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                      <MapPin className="w-5 h-5" strokeWidth={2.5} />
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
                      className="w-full pl-14 pr-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white/90">
                    State / Province
                  </label>
                  <input
                    type="text"
                    value={formData.contact.address.state}
                    onChange={(e) =>
                      handleInputChange("contact.address.state", e.target.value)
                    }
                    placeholder="Enter state"
                    className="w-full px-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white/90">
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
                    className="w-full px-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white/90">
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
                    className="w-full px-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div
            className="rounded-[28px] p-8 shadow-2xl backdrop-blur-xl border transition-all duration-700 hover:shadow-[0_30px_80px_-20px_rgba(128,55,145,0.4)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <h2 className="text-lg sm:text-base sm:text-lg md:text-xl md:text-2xl font-black text-white mb-8 flex items-center gap-4">
              <div className="p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <Globe className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Social Media Links
              </span>
            </h2>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-white/90">
                  LinkedIn
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                    <Linkedin className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) =>
                      handleInputChange("socialLinks.linkedin", e.target.value)
                    }
                    placeholder="https://linkedin.com/company/your-company"
                    className="w-full pl-14 pr-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-white/90">
                  Twitter
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                    <Twitter className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <input
                    type="url"
                    value={formData.socialLinks.twitter}
                    onChange={(e) =>
                      handleInputChange("socialLinks.twitter", e.target.value)
                    }
                    placeholder="https://twitter.com/your-company"
                    className="w-full pl-14 pr-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-white/90">
                  Facebook
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                    <Facebook className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <input
                    type="url"
                    value={formData.socialLinks.facebook}
                    onChange={(e) =>
                      handleInputChange("socialLinks.facebook", e.target.value)
                    }
                    placeholder="https://facebook.com/your-company"
                    className="w-full pl-14 pr-5 py-4 border-2 border-white/10 rounded-[20px] bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Right Side (4 columns) */}
        <div className="col-span-12 lg:col-span-4 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Company Logo Card */}
          <div
            className="rounded-[24px] p-6 shadow-xl backdrop-blur-xl border transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30 hover:scale-[1.02] group"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <Camera className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Company Logo
              </span>
            </h3>
            <div className="flex flex-col items-center">
              <div className="relative group/logo mb-6 transform transition-all duration-500 hover:scale-105">
                <div
                  className="w-40 h-40 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl overflow-hidden border-2 border-white/10 transition-all duration-500 group-hover/logo:border-[#b87bd1]"
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
                    <Building2
                      className="w-16 h-16 text-white transition-transform duration-500 group-hover/logo:scale-110"
                      strokeWidth={2}
                    />
                  )}
                </div>
                <label
                  className="absolute -bottom-2 -right-2 w-14 h-14 rounded-xl sm:rounded-2xl flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl group/upload"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                    boxShadow: "0 8px 32px rgba(128,55,145,0.4)",
                  }}
                >
                  <Camera
                    className="w-6 h-6 text-white transition-transform duration-300 group-hover/upload:scale-110"
                    strokeWidth={2.5}
                  />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </label>
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] opacity-0 group-hover/logo:opacity-20 blur-xl transition-all duration-500 -z-10" />
              </div>
              <p className="text-sm text-white/70 text-center font-semibold">
                Max size: 5MB • PNG, JPG, WEBP
              </p>
            </div>
          </div>

          {/* Company Insights Card */}
          <div
            className="rounded-[24px] p-6 shadow-xl backdrop-blur-xl border transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30 hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Quick Insights
              </span>
            </h3>
            <div className="space-y-3">
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
                  className="group/stat p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg transform transition-transform duration-300 group-hover/stat:scale-110`}
                      >
                        <stat.icon
                          className="w-4 h-4 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/70 font-semibold">
                          {stat.label}
                        </div>
                        <div className="text-base sm:text-lg md:text-xl font-black text-white">
                          {stat.value}
                        </div>
                      </div>
                    </div>
                    <Zap
                      className="w-4 h-4 text-[#b87bd1] opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification & Documents Card */}
          <div
            className="rounded-[24px] p-6 shadow-xl backdrop-blur-xl border"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                {verification?.isVerified ? (
                  <ShieldCheck
                    className="w-5 h-5 text-white"
                    strokeWidth={2.5}
                  />
                ) : (
                  <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
                )}
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Verification
              </span>
            </h3>

            <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs text-white/60 font-semibold mb-1">
                Status
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    verification?.isVerified ? "bg-emerald-400" : "bg-amber-400"
                  } animate-pulse`}
                />
                <span className="text-sm font-bold text-white">
                  {verification?.isVerified ? "Verified" : "Pending Review"}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-white/10 rounded-xl bg-white/5 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.6)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_0.75rem]"
                style={{ paddingRight: "2.5rem" }}
              >
                <option value="business_license">Business License</option>
                <option value="tax_certificate">Tax Certificate</option>
                <option value="company_registration">
                  Company Registration
                </option>
                <option value="gst">GST</option>
                <option value="pan">PAN</option>
                <option value="other">Other</option>
              </select>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#803791] file:to-[#b87bd1] file:text-white hover:file:opacity-90 file:cursor-pointer file:transition-opacity"
              />
            </div>

            <button
              disabled={docUploading}
              onClick={handleDocUpload}
              className="w-full px-4 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-bold disabled:opacity-50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {docUploading ? "Uploading..." : "Upload Document"}
            </button>

            {docs?.length > 0 && (
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {docs.map((d) => (
                  <div
                    key={d._id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="text-white/90 text-sm flex-1 min-w-0">
                      <div className="font-bold capitalize truncate">
                        {d.type?.replaceAll("_", " ")}
                      </div>
                      <div className="text-white/60 text-xs">{d.status}</div>
                    </div>
                    <button
                      onClick={() => handleDocDelete(d._id)}
                      className="ml-2 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-300 text-xs font-semibold flex-shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Branding Card */}
          <div
            className="rounded-[24px] p-6 shadow-xl backdrop-blur-xl border"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <ImageIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Branding
              </span>
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold text-white/80 mb-2">
                  Cover Image
                </div>
                <div className="rounded-xl overflow-hidden border-2 border-white/10 bg-white/5">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="Cover"
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center text-white/50 font-semibold">
                      No cover image
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="mt-3 w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/15 file:cursor-pointer file:transition-colors"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-white/80 mb-2">
                  Theme Color
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="#803791"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-white/10 rounded-xl bg-white/5 text-white placeholder:text-white/40 font-semibold focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 transition-all duration-300"
                  />
                  <input
                    type="color"
                    value={themeColor || "#803791"}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-14 h-12 rounded-xl border-2 border-white/10 bg-white/5 cursor-pointer"
                  />
                </div>
              </div>
              <button
                onClick={handleBrandingSave}
                className="w-full px-4 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Save Branding
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Button - Sticky at Bottom */}
      <div
        className="sticky bottom-8 rounded-[28px] p-6 mt-12 shadow-2xl backdrop-blur-xl border transition-all duration-500 hover:shadow-3xl hover:border-[#b87bd1]/30 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08))",
          borderColor: "rgba(255,255,255,0.15)",
        }}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-6">
          <div className="flex-1">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full px-8 py-5 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:from-[#703181] hover:to-[#a86bc1] text-white rounded-xl sm:rounded-2xl font-black shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] group"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-lg">Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save
                    className="w-6 h-6 transform transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={2.5}
                  />
                  <span className="text-lg">Save Company Profile</span>
                  <Sparkles
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    strokeWidth={2.5}
                  />
                </>
              )}
            </button>

            {completeness < 100 && (
              <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-4 backdrop-blur-sm">
                <AlertCircle
                  className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse"
                  strokeWidth={2.5}
                />
                <div className="text-sm text-amber-200 font-medium">
                  <span className="font-black">Complete your profile!</span>{" "}
                  Your profile is{" "}
                  <span className="font-black">{completeness}% complete</span>.
                  Finish setting up to attract more candidates.
                </div>
              </div>
            )}
          </div>

          <div className="text-right min-w-max">
            <div className="text-sm text-white/70 font-semibold">
              Last saved
            </div>
            <div className="text-sm text-white font-black flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#b87bd1]" strokeWidth={2.5} />
              Just now
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.08);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(100px) translateY(50px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes orbit-1 {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(40px) rotate(-360deg);
          }
        }

        @keyframes orbit-2 {
          0% {
            transform: rotate(120deg) translateX(40px) rotate(-120deg);
          }
          100% {
            transform: rotate(480deg) translateX(40px) rotate(-480deg);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-dash {
          animation: dash 1.5s ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-orbit-1 {
          animation: orbit-1 4s linear infinite;
        }

        .animate-orbit-2 {
          animation: orbit-2 6s linear infinite;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #803791, #b87bd1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #703181, #a86bc1);
        }
      `}</style>
    </div>
  );
}
