"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
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
  Calendar,
  Trash2,
  Plus,
} from "lucide-react";
import { customToast } from "@/components/ui/toast";

// Loading Skeleton Component
const ProfileSkeleton = () => {
  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Background Effects */}
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

      {/* Header Skeleton */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6"
        style={{
          background:
            "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
        }}
      >
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
        </div>
      </div>

      {/* Profile Completion Skeleton */}
      <div
        className="rounded-xl p-6 shadow-lg"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <div className="h-6 bg-white/20 rounded w-32"></div>
              <div className="h-4 bg-white/20 rounded w-48"></div>
            </div>
            <div className="text-right">
              <div className="h-8 bg-white/20 rounded w-16 mb-1"></div>
              <div className="h-3 bg-white/20 rounded w-12"></div>
            </div>
          </div>
          <div className="w-full bg-white/6 rounded-full h-3">
            <div className="h-3 bg-white/20 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column Skeleton */}
        <div className="space-y-6">
          {/* Profile Picture Skeleton */}
          <div
            className="rounded-xl p-6 shadow-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded w-32 mb-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-white/20 rounded-full mb-4"></div>
                <div className="h-4 bg-white/20 rounded w-40"></div>
              </div>
            </div>
          </div>

          {/* Plan Selection Skeleton */}
          <div
            className="rounded-xl p-6 shadow-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-white/6">
                  <div className="h-5 bg-white/20 rounded w-24 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded w-full"></div>
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-white/6">
                  <div className="h-5 bg-white/20 rounded w-24 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded w-full"></div>
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Skeleton */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 shadow-lg">
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-white/20 rounded w-24"></div>
                  <div className="h-6 bg-white/20 rounded w-8"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-white/20 rounded w-24"></div>
                  <div className="h-6 bg-white/20 rounded w-8"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-white/20 rounded w-24"></div>
                  <div className="h-6 bg-white/20 rounded w-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Form Skeleton */}
        <div
          className="lg:col-span-2 rounded-xl p-8 shadow-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-48 mb-6"></div>

            {/* Form Sections Skeleton */}
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((section) => (
                <div key={section} className="space-y-4">
                  <div className="h-6 bg-white/20 rounded w-40 mb-2"></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((field) => (
                      <div key={field}>
                        <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
                        <div className="h-12 bg-white/20 rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Submit Button Skeleton */}
              <div className="h-14 bg-white/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StudentProfile() {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",

    // Address
    address: {
      street: "",
      city: "",
      state: "",
      country: "India",
      zipCode: "",
    },

    // Education
    education: [
      {
        degree: "",
        institution: "",
        fieldOfStudy: "",
        graduationYear: new Date().getFullYear(),
        currentlyEnrolled: false,
      },
    ],

    // Job Preferences
    jobPreferences: {
      preferredRoles: [""],
      preferredLocations: [""],
      jobTypes: [""],
      expectedSalary: {
        min: "",
        max: "",
        currency: "INR",
      },
      willingToRelocate: false,
    },

    // Skills
    skills: "",

    // Bio
    bio: "",

    // Experience
    experienceType: "fresher",
  });

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setDataLoading(true);
        const res = await userService.getProfile();
        const { user, profile } = res.data || {};
        if (!mounted) return;

        setSelectedPlan(profile?.plan || "free");
        setProfileImage(profile?.profilePicture?.url || null);

        // Set form data with proper structure
        if (user && profile) {
          setFormData((prev) => ({
            ...prev,
            // Basic info
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: profile?.phone || "",
            dateOfBirth: profile?.dateOfBirth
              ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
              : "",

            // Address
            address: {
              street: profile?.address?.street || "",
              city: profile?.address?.city || "",
              state: profile?.address?.state || "",
              country: profile?.address?.country || "India",
              zipCode: profile?.address?.zipCode || "",
            },

            // Education - ensure proper structure
            education:
              profile?.education?.length > 0
                ? profile.education.map((edu) => ({
                    ...edu,
                    graduationYear:
                      edu.graduationYear || new Date().getFullYear(),
                    currentlyEnrolled: edu.currentlyEnrolled || false,
                  }))
                : [
                    {
                      degree: "",
                      institution: "",
                      fieldOfStudy: "",
                      graduationYear: new Date().getFullYear(),
                      currentlyEnrolled: false,
                    },
                  ],

            // Job Preferences
            jobPreferences: {
              preferredRoles:
                profile?.jobPreferences?.preferredRoles?.length > 0
                  ? profile.jobPreferences.preferredRoles
                  : [""],
              preferredLocations:
                profile?.jobPreferences?.preferredLocations?.length > 0
                  ? profile.jobPreferences.preferredLocations
                  : [""],
              jobTypes:
                profile?.jobPreferences?.jobTypes?.length > 0
                  ? profile.jobPreferences.jobTypes
                  : [""],
              expectedSalary: profile?.jobPreferences?.expectedSalary || {
                min: "",
                max: "",
                currency: "INR",
              },
              willingToRelocate:
                profile?.jobPreferences?.willingToRelocate || false,
            },

            // Skills
            skills: (profile?.skills || []).map((s) => s.name).join(", "),

            // Bio
            bio: profile?.bio || "",

            // Experience
            experienceType: profile?.experienceType || "fresher",
          }));
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
        customToast.error("Error", "Failed to load profile data");
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

  // Show skeleton while loading data
  if (dataLoading) {
    return <ProfileSkeleton />;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      customToast.error("Error", "Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      customToast.error("Error", "Image size should be less than 5MB");
      return;
    }

    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);

    try {
      await userService.uploadProfilePicture(file);
      customToast.success("Success", "Profile picture updated successfully");
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      customToast.error("Error", "Failed to upload profile picture");
    }
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      customToast.error("Error", "Please upload PDF, DOC, or DOCX files only");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      customToast.error("Error", "File size should be less than 5MB");
      return;
    }

    setCvFile(file);
    customToast.info(
      "Info",
      "CV upload functionality will be implemented soon"
    );
  };

  // Handle basic input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle address changes
  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  // Handle education field changes
  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      };
      return {
        ...prev,
        education: updatedEducation,
      };
    });
  };

  // Handle job preferences changes
  const handleJobPreferenceChange = (field, value, index = 0) => {
    setFormData((prev) => {
      const currentArray = prev.jobPreferences[field] || [""];
      const updatedArray = [...currentArray];
      updatedArray[index] = value;

      return {
        ...prev,
        jobPreferences: {
          ...prev.jobPreferences,
          [field]: updatedArray.filter((item) => item !== ""),
        },
      };
    });
  };

  // Handle salary range changes
  const handleSalaryChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      jobPreferences: {
        ...prev.jobPreferences,
        expectedSalary: {
          ...prev.jobPreferences.expectedSalary,
          [field]: value ? parseInt(value) : "",
        },
      },
    }));
  };

  // Add new education entry
  const addEducationEntry = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          fieldOfStudy: "",
          graduationYear: new Date().getFullYear(),
          currentlyEnrolled: false,
        },
      ],
    }));
  };

  // Remove education entry
  const removeEducationEntry = (index) => {
    if (formData.education.length === 1) {
      customToast.info("Info", "You need at least one education entry");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Add new job preference entry
  const addJobPreferenceEntry = (field) => {
    setFormData((prev) => ({
      ...prev,
      jobPreferences: {
        ...prev.jobPreferences,
        [field]: [...prev.jobPreferences[field], ""],
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email) {
        customToast.error("Error", "Please fill in all required fields");
        return;
      }

      // Validate education data - only include if all required fields are filled
      const educationData = formData.education
        .filter(
          (edu) =>
            edu.degree &&
            edu.institution &&
            edu.fieldOfStudy &&
            edu.graduationYear
        )
        .map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          fieldOfStudy: edu.fieldOfStudy,
          graduationYear: parseInt(edu.graduationYear),
          currentlyEnrolled: edu.currentlyEnrolled,
        }));

      if (educationData.length === 0) {
        customToast.error(
          "Error",
          "Please fill in at least one education entry completely"
        );
        return;
      }

      // Prepare skills array
      const skillsArray = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((name) => ({ name, level: "intermediate" }));

      // Prepare the payload
      const payload = {
        plan: selectedPlan,
        phone: formData.phone || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
        address: formData.address,
        bio: formData.bio || undefined,
        experienceType: formData.experienceType,
        education: educationData,
        highestQualification: educationData[0]?.degree || "",
        jobPreferences: {
          preferredRoles:
            formData.jobPreferences.preferredRoles.filter(Boolean),
          preferredLocations:
            formData.jobPreferences.preferredLocations.filter(Boolean),
          jobTypes: formData.jobPreferences.jobTypes.filter(Boolean),
          expectedSalary:
            formData.jobPreferences.expectedSalary.min ||
            formData.jobPreferences.expectedSalary.max
              ? {
                  min:
                    parseInt(formData.jobPreferences.expectedSalary.min) || 0,
                  max:
                    parseInt(formData.jobPreferences.expectedSalary.max) || 0,
                  currency: "INR",
                }
              : undefined,
          willingToRelocate: formData.jobPreferences.willingToRelocate,
        },
        skills: skillsArray,
      };

      // Remove undefined values
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([_, v]) => v !== undefined && v !== null && v !== ""
        )
      );

      await userService.updateProfile(cleanPayload);
      customToast.success("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      customToast.error("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Background Effects */}
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

      {/* Profile Completion Status */}
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
                    <User className="w-12 h-12 text-white" />
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

          <div className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/6">
                <User className="w-5 h-5 text-[#b87bd1]" />
                Basic Details
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-11 pr-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Experience Type
                  </label>
                  <select
                    name="experienceType"
                    value={formData.experienceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  >
                    <option value="fresher">Fresher</option>
                    <option value="experienced">Experienced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us about yourself, your career goals, and what you're looking for..."
                  className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/6">
                <MapPin className="w-5 h-5 text-[#b87bd1]" />
                Address Information
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                    placeholder="Enter your state"
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) =>
                      handleAddressChange("country", e.target.value)
                    }
                    placeholder="Enter your country"
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.address.zipCode}
                    onChange={(e) =>
                      handleAddressChange("zipCode", e.target.value)
                    }
                    placeholder="Enter ZIP code"
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Educational Qualification */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/6">
                <GraduationCap className="w-5 h-5 text-[#b87bd1]" />
                Educational Qualification
              </h4>

              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-4 p-4 border border-white/6 rounded-xl relative"
                >
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-white/8 rounded-xl bg-fuchsia-900 text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                    >
                      <option value="">Select degree</option>
                      <option value="High School">High School</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor's Degree">
                        Bachelor's Degree
                      </option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Institution <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                      placeholder="University/College name"
                      className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Field of Study <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "fieldOfStudy",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Computer Science"
                      className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Graduation Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={edu.graduationYear}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "graduationYear",
                          e.target.value
                        )
                      }
                      placeholder="2024"
                      min="1900"
                      max="2030"
                      className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={edu.currentlyEnrolled}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "currentlyEnrolled",
                            e.target.checked
                          )
                        }
                        className="rounded border-white/8 bg-transparent text-[#b87bd1] focus:ring-[#b87bd1]"
                      />
                      <span className="text-white/90">Currently Enrolled</span>
                    </label>

                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducationEntry(index)}
                        className="px-3 py-1 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addEducationEntry}
                className="px-4 py-2 border border-dashed border-white/8 rounded-xl text-white/80 hover:text-white hover:border-white/12 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Another Education
              </button>
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
                    Preferred Job Roles
                  </label>
                  {formData.jobPreferences.preferredRoles.map((role, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={role}
                        onChange={(e) =>
                          handleJobPreferenceChange(
                            "preferredRoles",
                            e.target.value,
                            index
                          )
                        }
                        placeholder="e.g., Frontend Developer"
                        className="flex-1 px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                      />
                      {index ===
                        formData.jobPreferences.preferredRoles.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            addJobPreferenceEntry("preferredRoles")
                          }
                          className="px-3 py-3 border border-white/8 rounded-xl text-white/80 hover:text-white hover:border-white/12 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Preferred Locations
                  </label>
                  {formData.jobPreferences.preferredLocations.map(
                    (location, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) =>
                            handleJobPreferenceChange(
                              "preferredLocations",
                              e.target.value,
                              index
                            )
                          }
                          placeholder="e.g., Mumbai, Remote"
                          className="flex-1 px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                        />
                        {index ===
                          formData.jobPreferences.preferredLocations.length -
                            1 && (
                          <button
                            type="button"
                            onClick={() =>
                              addJobPreferenceEntry("preferredLocations")
                            }
                            className="px-3 py-3 border border-white/8 rounded-xl text-white/80 hover:text-white hover:border-white/12 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Job Types
                  </label>
                  <select
                    value={formData.jobPreferences.jobTypes[0] || ""}
                    onChange={(e) =>
                      handleJobPreferenceChange("jobTypes", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Min Salary (LPA)
                    </label>
                    <input
                      type="number"
                      value={formData.jobPreferences.expectedSalary.min}
                      onChange={(e) =>
                        handleSalaryChange("min", e.target.value)
                      }
                      placeholder="Min"
                      className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Max Salary (LPA)
                    </label>
                    <input
                      type="number"
                      value={formData.jobPreferences.expectedSalary.max}
                      onChange={(e) =>
                        handleSalaryChange("max", e.target.value)
                      }
                      placeholder="Max"
                      className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Key Skills
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List your key skills separated by commas (e.g., React, JavaScript, Node.js, Python)"
                  className="w-full px-4 py-3 border border-white/8 rounded-xl bg-transparent text-white placeholder:text-white/60 focus:ring-2 focus:ring-[#b87bd1] focus:border-[#b87bd1] transition-all resize-none"
                ></textarea>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.jobPreferences.willingToRelocate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      jobPreferences: {
                        ...prev.jobPreferences,
                        willingToRelocate: e.target.checked,
                      },
                    }))
                  }
                  className="rounded border-white/8 bg-transparent text-[#b87bd1] focus:ring-[#b87bd1]"
                />
                <span className="text-white/90">
                  Willing to relocate for job opportunities
                </span>
              </label>
            </div>

            {/* CV Upload */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/6">
                <FileText className="w-5 h-5 text-[#b87bd1]" />
                Upload CV/Resume
              </h4>

              <div className="border-2 border-dashed border-white/8 rounded-xl p-8 text-center hover:border-[#b87bd1] transition-all">
                <input
                  type="file"
                  id="cv-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvUpload}
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-white/6 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-[#b87bd1]" />
                  </div>
                  <p className="text-white font-medium mb-1">
                    {cvFile ? cvFile.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-white/60">
                    PDF, DOC, DOCX (Max 5MB)
                  </p>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-white/6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:from-[#703181] hover:to-[#a86bc1] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
