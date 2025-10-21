"use client";

import { useEffect, useState } from "react";
import { studentService } from "@/services/studentService";
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
  Sparkles,
  Zap,
  Star,
  Rocket,
  Eye,
  Clock,
  Shield,
  BadgeCheck,
} from "lucide-react";
import { customToast } from "@/components/ui/toast";

// Enhanced Loading Skeleton Component
const ProfileSkeleton = () => {
  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
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
        className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl backdrop-blur-xl border border-white/10 animate-pulse"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.18), rgba(184,123,209,0.12))",
          boxShadow: "0 20px 60px rgba(128,55,145,0.18)",
        }}
      >
        <div className="animate-pulse">
          <div className="h-8 bg-white/25 rounded-2xl w-1/3 mb-2"></div>
          <div className="h-4 bg-white/25 rounded-2xl w-1/2"></div>
        </div>
      </div>

      {/* Profile Completion Skeleton */}
      <div
        className="rounded-3xl p-6 shadow-xl border border-white/10 backdrop-blur-sm animate-pulse"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
        }}
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <div className="h-6 bg-white/25 rounded-2xl w-32"></div>
              <div className="h-4 bg-white/25 rounded-2xl w-48"></div>
            </div>
            <div className="text-right">
              <div className="h-8 bg-white/25 rounded-2xl w-16 mb-1"></div>
              <div className="h-3 bg-white/25 rounded-2xl w-12"></div>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div className="h-3 bg-white/25 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column Skeleton */}
        <div className="space-y-6">
          {/* Profile Picture Skeleton */}
          <div
            className="rounded-3xl p-6 shadow-xl border border-white/10 backdrop-blur-sm animate-pulse"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
            }}
          >
            <div className="animate-pulse">
              <div className="h-6 bg-white/25 rounded-2xl w-32 mb-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-white/25 rounded-full mb-4"></div>
                <div className="h-4 bg-white/25 rounded-2xl w-40"></div>
              </div>
            </div>
          </div>

          {/* Plan Selection Skeleton */}
          <div
            className="rounded-3xl p-6 shadow-xl border border-white/10 backdrop-blur-sm animate-pulse"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
            }}
          >
            <div className="animate-pulse">
              <div className="h-6 bg-white/25 rounded-2xl w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-white/10">
                  <div className="h-5 bg-white/25 rounded-2xl w-24 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/25 rounded-2xl w-full"></div>
                    <div className="h-4 bg-white/25 rounded-2xl w-3/4"></div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10">
                  <div className="h-5 bg-white/25 rounded-2xl w-24 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/25 rounded-2xl w-full"></div>
                    <div className="h-4 bg-white/25 rounded-2xl w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Skeleton */}
          <div className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 rounded-3xl p-6 shadow-xl backdrop-blur-sm animate-pulse">
            <div className="animate-pulse">
              <div className="h-6 bg-white/25 rounded-2xl w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-white/25 rounded-2xl w-24"></div>
                  <div className="h-6 bg-white/25 rounded-2xl w-8"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-white/25 rounded-2xl w-24"></div>
                  <div className="h-6 bg-white/25 rounded-2xl w-8"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-white/25 rounded-2xl w-24"></div>
                  <div className="h-6 bg-white/25 rounded-2xl w-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Form Skeleton */}
        <div
          className="lg:col-span-2 rounded-3xl p-8 shadow-xl border border-white/10 backdrop-blur-sm animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
          }}
        >
          <div className="animate-pulse">
            <div className="h-8 bg-white/25 rounded-2xl w-48 mb-6"></div>

            {/* Form Sections Skeleton */}
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((section) => (
                <div key={section} className="space-y-4">
                  <div className="h-6 bg-white/25 rounded-2xl w-40 mb-2"></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((field) => (
                      <div key={field}>
                        <div className="h-4 bg-white/25 rounded-2xl w-24 mb-2"></div>
                        <div className="h-12 bg-white/25 rounded-2xl"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Submit Button Skeleton */}
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
      {[...Array(15)].map((_, i) => (
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

export default function StudentProfile() {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isHovering, setIsHovering] = useState(null);
  const [activity, setActivity] = useState({
    totalApplications: 0,
    lastAppliedAt: null,
    profileCompletion: 0,
    hasResume: false,
    plan: "free",
    lastLogin: null,
    accountCreatedAt: null,
  });
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

  // Transform backend data to frontend format
  const transformBackendData = (studentData) => {
    if (!studentData) return null;

    console.log("Transforming student data:", studentData);

    // Extract user data from student if populated, otherwise use student data directly
    const userData = studentData.userId || {};

    const transformedData = {
      // Basic info - get from userData if populated, otherwise from studentData
      firstName: userData.firstName || studentData.firstName || "",
      lastName: userData.lastName || studentData.lastName || "",
      email: userData.email || studentData.email || "",
      phone: studentData?.phone || "",
      dateOfBirth: studentData?.dateOfBirth
        ? new Date(studentData.dateOfBirth).toISOString().split("T")[0]
        : "",

      // Address
      address: {
        street: studentData?.address?.street || "",
        city: studentData?.address?.city || "",
        state: studentData?.address?.state || "",
        country: studentData?.address?.country || "India",
        zipCode: studentData?.address?.zipCode || "",
      },

      // Education
      education:
        studentData?.education &&
        Array.isArray(studentData.education) &&
        studentData.education.length > 0
          ? studentData.education.map((edu) => ({
              degree: edu?.degree || "",
              institution: edu?.institution || "",
              fieldOfStudy: edu?.fieldOfStudy || "",
              graduationYear: edu?.graduationYear || new Date().getFullYear(),
              currentlyEnrolled: edu?.currentlyEnrolled || false,
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
          studentData?.jobPreferences?.preferredRoles &&
          Array.isArray(studentData.jobPreferences.preferredRoles) &&
          studentData.jobPreferences.preferredRoles.length > 0
            ? studentData.jobPreferences.preferredRoles
            : [""],
        preferredLocations:
          studentData?.jobPreferences?.preferredLocations &&
          Array.isArray(studentData.jobPreferences.preferredLocations) &&
          studentData.jobPreferences.preferredLocations.length > 0
            ? studentData.jobPreferences.preferredLocations
            : [""],
        jobTypes:
          studentData?.jobPreferences?.jobTypes &&
          Array.isArray(studentData.jobPreferences.jobTypes) &&
          studentData.jobPreferences.jobTypes.length > 0
            ? studentData.jobPreferences.jobTypes
            : [""],
        expectedSalary: studentData?.jobPreferences?.expectedSalary || {
          min: "",
          max: "",
          currency: "INR",
        },
        willingToRelocate:
          studentData?.jobPreferences?.willingToRelocate || false,
      },

      // Skills
      skills: Array.isArray(studentData?.skills)
        ? studentData.skills
            .map((s) => s?.name || "")
            .filter(Boolean)
            .join(", ")
        : "",

      // Bio
      bio: studentData?.bio || "",

      // Experience
      experienceType: studentData?.experienceType || "fresher",
    };

    console.log("Transformed student data:", transformedData);
    return transformedData;
  };

  // Transform frontend data for backend
  const transformDataForBackend = (data, plan) => {
    // Validate education data - only include if all required fields are filled
    const educationData = data.education
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

    // Prepare skills array
    const skillsArray = data.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name, level: "intermediate" }));

    // Prepare the payload
    const payload = {
      plan: plan,
      phone: data.phone || undefined,
      dateOfBirth: data.dateOfBirth || undefined,
      address: Object.fromEntries(
        Object.entries(data.address).filter(([_, v]) => v !== "")
      ),
      bio: data.bio || undefined,
      experienceType: data.experienceType,
      education: educationData,
      highestQualification: educationData[0]?.degree || "",
      jobPreferences: {
        preferredRoles: data.jobPreferences.preferredRoles.filter(Boolean),
        preferredLocations:
          data.jobPreferences.preferredLocations.filter(Boolean),
        jobTypes: data.jobPreferences.jobTypes.filter(Boolean),
        expectedSalary:
          data.jobPreferences.expectedSalary.min ||
          data.jobPreferences.expectedSalary.max
            ? {
                min: parseInt(data.jobPreferences.expectedSalary.min) || 0,
                max: parseInt(data.jobPreferences.expectedSalary.max) || 0,
                currency: "INR",
              }
            : undefined,
        willingToRelocate: data.jobPreferences.willingToRelocate,
      },
      skills: skillsArray,
    };

    // Remove undefined values and empty arrays/objects
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => {
        if (value === undefined || value === null || value === "") return false;
        if (Array.isArray(value) && value.length === 0) return false;
        if (
          typeof value === "object" &&
          !Array.isArray(value) &&
          Object.keys(value).length === 0
        )
          return false;
        return true;
      })
    );

    // Clean nested objects
    if (
      cleanPayload.address &&
      Object.keys(cleanPayload.address).length === 0
    ) {
      delete cleanPayload.address;
    }

    if (cleanPayload.jobPreferences) {
      cleanPayload.jobPreferences = Object.fromEntries(
        Object.entries(cleanPayload.jobPreferences).filter(([_, v]) => {
          if (v === undefined || v === null) return false;
          if (Array.isArray(v) && v.length === 0) return false;
          if (
            typeof v === "object" &&
            !Array.isArray(v) &&
            Object.keys(v).length === 0
          )
            return false;
          return true;
        })
      );

      if (Object.keys(cleanPayload.jobPreferences).length === 0) {
        delete cleanPayload.jobPreferences;
      }
    }

    console.log("Final payload for backend:", cleanPayload);
    return cleanPayload;
  };

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        setDataLoading(true);
        // Use studentService instead of userService
        const res = await studentService.getProfile();

        if (!mounted) return;

        const studentData = res.data || {};
        console.log("Loaded student profile data:", studentData);

        // Set plan and image
        setSelectedPlan(studentData?.plan || "free");
        setProfileImage(studentData?.profilePicture?.url || null);

        // Transform and set form data
        if (studentData) {
          const transformedData = transformBackendData(studentData);
          if (transformedData) {
            setFormData(transformedData);
            console.log("Form data set:", transformedData);
          }
        }

        // Load activity
        try {
          const activityRes = await studentService.getActivity();
          if (activityRes?.success && activityRes?.data) {
            setActivity(activityRes.data);
          }
        } catch (e) {
          console.warn("Failed to load activity:", e?.message);
        }
      } catch (error) {
        console.error("Failed to load student profile:", error);
        customToast.error("Error", "Failed to load profile data");
      } finally {
        if (mounted) {
          setDataLoading(false);
          setInitialLoad(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  // Debug function to check data
  const debugData = () => {
    console.log("Current Form Data:", formData);
    console.log("Selected Plan:", selectedPlan);
    console.log("Profile Image:", profileImage);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
      // Use studentService instead of userService
      await studentService.uploadProfilePicture(file);
      customToast.success("Success", "Profile picture updated successfully");
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      customToast.error("Error", "Failed to upload profile picture");
    }
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

    try {
      // Use studentService instead of userService
      await studentService.uploadResume(file);
      customToast.success("Success", "CV uploaded successfully");
    } catch (error) {
      console.error("Failed to upload CV:", error);
      customToast.error("Error", "Failed to upload CV");
    }
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
          [field]: updatedArray,
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

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Transform data for backend
      const payload = transformDataForBackend(formData, selectedPlan);
      console.log("Sending student payload to backend:", payload);

      // Use studentService instead of userService
      await studentService.updateProfile(payload);

      // Reload data to ensure frontend is in sync
      const res = await studentService.getProfile();
      if (res.data) {
        const transformedData = transformBackendData(res.data);
        if (transformedData) {
          setFormData(transformedData);
          console.log("Student profile reloaded after save:", transformedData);
        }
      }

      customToast.success("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Failed to update student profile:", error);
      customToast.error(
        "Error",
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // Show skeleton while loading data initially
  if (dataLoading && initialLoad) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
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

      {/* Enhanced Header */}
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

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              My Profile
            </h1>
            <Sparkles className="w-6 h-6 text-[#b87bd1] animate-pulse" />
          </div>
          <p className="text-white/85 text-lg font-light">
            Complete your profile to get better job matches
          </p>
          {/* Debug button - remove in production */}
          <button
            onClick={debugData}
            className="absolute top-0 right-0 text-xs text-white/50 hover:text-white transition-colors"
            title="Debug Data"
          >
            Debug
          </button>
        </div>
      </div>

      {/* Enhanced Profile Completion Status */}
      <div
        className="rounded-3xl p-6 shadow-xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30 group"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Profile Completion
              </span>
            </h3>
            <p className="text-sm text-white/80">
              Complete your profile to unlock more opportunities
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-white bg-gradient-to-r from-white to-white/80 bg-clip-text">
              75%
            </div>
            <p className="text-xs text-white/70 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Almost there!
            </p>
          </div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
            style={{
              width: "75%",
              background: "linear-gradient(90deg,#803791,#b87bd1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Enhanced Cards */}
        <div className="space-y-6">
          {/* Enhanced Profile Picture */}
          <div
            className="rounded-3xl p-6 shadow-xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30 hover:scale-[1.02] group"
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
                Profile Picture
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
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/logo:scale-110"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white transition-transform duration-500 group-hover/logo:scale-110" />
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
                    onChange={handleImageUpload}
                  />
                </label>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] opacity-0 group-hover/logo:opacity-20 blur-xl transition-all duration-500 -z-10" />
              </div>
              <p className="text-sm text-white/80 text-center font-medium">
                Upload a professional photo
              </p>
            </div>
          </div>

          {/* Enhanced Plan Selection */}
          <div
            className="rounded-3xl p-6 shadow-xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30 hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Registration Plan
              </span>
            </h3>
            <div className="space-y-4">
              {/* Free Plan */}
              <div
                onClick={() => setSelectedPlan("free")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group/plan ${
                  selectedPlan === "free"
                    ? "border-white/20 bg-white/8 shadow-lg"
                    : "border-white/10 hover:border-white/20 hover:bg-white/5"
                }`}
                onMouseEnter={() => setIsHovering("free-plan")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedPlan === "free"
                          ? "border-[#b87bd1] bg-[#b87bd1]"
                          : "border-white/20 group-hover/plan:border-[#b87bd1]"
                      }`}
                    >
                      {selectedPlan === "free" && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-bold text-white">Free Plan</span>
                  </div>
                  <span className="text-2xl font-black text-white bg-gradient-to-r from-white to-white/80 bg-clip-text">
                    ₹0
                  </span>
                </div>
                <ul className="space-y-2 ml-9 text-sm text-white/80">
                  <li className="flex items-center gap-2 transition-transform duration-300 group-hover/plan:translate-x-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Basic job search
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-300 group-hover/plan:translate-x-1 delay-75">
                    <CheckCircle className="w-4 h-4 text-green-600" />5
                    applications/month
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-300 group-hover/plan:translate-x-1 delay-150">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Standard profile visibility
                  </li>
                </ul>
              </div>

              {/* Pro Plan */}
              <div
                onClick={() => setSelectedPlan("pro")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group/plan ${
                  selectedPlan === "pro"
                    ? "border-[#b87bd1] bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-2xl text-white"
                    : "border-white/10 hover:border-[#b87bd1] hover:bg-white/5 text-white"
                }`}
                onMouseEnter={() => setIsHovering("pro-plan")}
                onMouseLeave={() => setIsHovering(null)}
              >
                {/* Premium Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
                  POPULAR
                </div>

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedPlan === "pro"
                          ? "border-white bg-white"
                          : "border-white/20 group-hover/plan:border-white"
                      }`}
                    >
                      {selectedPlan === "pro" && (
                        <CheckCircle className="w-4 h-4 text-[#803791]" />
                      )}
                    </div>
                    <span className="font-bold text-white">Pro Plan</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">₹999</span>
                    <span className="text-xs text-white/80 block">/month</span>
                  </div>
                </div>
                <ul className="space-y-2 ml-9 text-sm text-white/80">
                  <li className="flex items-center gap-2 transition-transform duration-300 group-hover/plan:translate-x-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                    Unlimited applications
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-300 group-hover/plan:translate-x-1 delay-75">
                    <CheckCircle className="w-4 h-4 text-white" />
                    Priority profile visibility
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-300 group-hover/plan:translate-x-1 delay-150">
                    <CheckCircle className="w-4 h-4 text-white" />
                    AI job matching
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-300 group-hover/plan:translate-x-1 delay-200">
                    <CheckCircle className="w-4 h-4 text-white" />
                    Advanced analytics
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Stats */}
          <div className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 rounded-3xl p-6 shadow-xl backdrop-blur-sm text-white transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20 shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span>Profile Stats</span>
            </h3>
            <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-blue-100 font-medium">Applications</span>
              </div>
              <span className="text-xl font-black text-white">{activity.totalApplications}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-blue-100 font-medium">Profile Completion</span>
              </div>
              <span className="text-xl font-black text-white">{activity.profileCompletion}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-blue-100 font-medium">Resume Uploaded</span>
              </div>
              <span className="text-xl font-black text-white">{activity.hasResume ? "Yes" : "No"}</span>
            </div>
            </div>
          </div>
        </div>

        {/* Right Column - Enhanced Profile Form */}
        <div
          className="lg:col-span-2 rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:border-[#b87bd1]/30"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
          }}
        >
          <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Personal Information
            </span>
          </h3>

          <div className="space-y-8">
            {/* Enhanced Basic Information */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Basic Details
                </span>
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

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
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Experience Type
                  </label>
                  <select
                    name="experienceType"
                    value={formData.experienceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="fresher">Fresher</option>
                    <option value="experienced">Experienced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/90">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us about yourself, your career goals, and what you're looking for..."
                  className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm resize-none"
                ></textarea>
              </div>
            </div>

            {/* Enhanced Address Information */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Address Information
                </span>
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) =>
                      handleAddressChange("street", e.target.value)
                    }
                    placeholder="Enter your street address"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    placeholder="Enter your city"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                    placeholder="Enter your state"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) =>
                      handleAddressChange("country", e.target.value)
                    }
                    placeholder="Enter your country"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.address.zipCode}
                    onChange={(e) =>
                      handleAddressChange("zipCode", e.target.value)
                    }
                    placeholder="Enter ZIP code"
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Educational Qualification */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Educational Qualification
                </span>
              </h4>

              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-6 p-6 border border-white/10 rounded-2xl relative transition-all duration-300 hover:border-white/20 hover:shadow-lg group/edu"
                  onMouseEnter={() => setIsHovering(`edu-${index}`)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white/90">
                      Degree <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
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

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white/90">
                      Institution <span className="text-red-400">*</span>
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
                      className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white/90">
                      Field of Study <span className="text-red-400">*</span>
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
                      className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white/90">
                      Graduation Year <span className="text-red-400">*</span>
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
                      className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer group/checkbox">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          edu.currentlyEnrolled
                            ? "border-[#b87bd1] bg-[#b87bd1]"
                            : "border-white/20 group-hover/checkbox:border-[#b87bd1]"
                        }`}
                      >
                        {edu.currentlyEnrolled && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-white/90 group-hover/checkbox:text-white transition-colors duration-300">
                        Currently Enrolled
                      </span>
                    </label>

                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducationEntry(index)}
                        className="px-4 py-2 text-red-400 border border-red-400/30 rounded-xl hover:bg-red-400 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105"
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
                className="w-full p-4 border border-dashed border-white/10 rounded-2xl text-white/80 hover:text-white hover:border-[#b87bd1] transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] group/add"
              >
                <Plus className="w-5 h-5 transition-transform duration-300 group-hover/add:scale-110" />
                Add Another Education
              </button>
            </div>

            {/* Enhanced Job Preferences */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Job Preferences
                </span>
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/90">
                    Preferred Job Roles
                  </label>
                  {formData.jobPreferences.preferredRoles.map((role, index) => (
                    <div key={index} className="flex gap-3">
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
                        className="flex-1 px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                      />
                      {index ===
                        formData.jobPreferences.preferredRoles.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            addJobPreferenceEntry("preferredRoles")
                          }
                          className="px-4 py-4 border border-white/10 rounded-2xl text-white/80 hover:text-white hover:border-[#b87bd1] transition-all duration-300 hover:scale-105"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/90">
                    Preferred Locations
                  </label>
                  {formData.jobPreferences.preferredLocations.map(
                    (location, index) => (
                      <div key={index} className="flex gap-3">
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
                          className="flex-1 px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                        />
                        {index ===
                          formData.jobPreferences.preferredLocations.length -
                            1 && (
                          <button
                            type="button"
                            onClick={() =>
                              addJobPreferenceEntry("preferredLocations")
                            }
                            className="px-4 py-4 border border-white/10 rounded-2xl text-white/80 hover:text-white hover:border-[#b87bd1] transition-all duration-300 hover:scale-105"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Job Types
                  </label>
                  <select
                    value={formData.jobPreferences.jobTypes[0] || ""}
                    onChange={(e) =>
                      handleJobPreferenceChange("jobTypes", e.target.value)
                    }
                    className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white/90">
                      Min Salary (LPA)
                    </label>
                    <input
                      type="number"
                      value={formData.jobPreferences.expectedSalary.min}
                      onChange={(e) =>
                        handleSalaryChange("min", e.target.value)
                      }
                      placeholder="Min"
                      className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white/90">
                      Max Salary (LPA)
                    </label>
                    <input
                      type="number"
                      value={formData.jobPreferences.expectedSalary.max}
                      onChange={(e) =>
                        handleSalaryChange("max", e.target.value)
                      }
                      placeholder="Max"
                      className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/90">
                  Key Skills
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List your key skills separated by commas (e.g., React, JavaScript, Node.js, Python)"
                  className="w-full px-4 py-4 border border-white/10 rounded-2xl bg-white/5 text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 backdrop-blur-sm resize-none"
                ></textarea>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group/relocate">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                    formData.jobPreferences.willingToRelocate
                      ? "border-[#b87bd1] bg-[#b87bd1]"
                      : "border-white/20 group-hover/relocate:border-[#b87bd1]"
                  }`}
                >
                  {formData.jobPreferences.willingToRelocate && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-white/90 group-hover/relocate:text-white transition-colors duration-300">
                  Willing to relocate for job opportunities
                </span>
              </label>
            </div>

            {/* Enhanced CV Upload */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Upload CV/Resume
                </span>
              </h4>

              <div
                className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#b87bd1] hover:shadow-lg group/cv cursor-pointer"
                onMouseEnter={() => setIsHovering("cv")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <input
                  type="file"
                  id="cv-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvUpload}
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover/cv:scale-110 group-hover/cv:bg-[#b87bd1]/20">
                    <Upload className="w-8 h-8 text-[#b87bd1] transition-transform duration-300 group-hover/cv:scale-110" />
                  </div>
                  <p className="text-white font-bold mb-1 transition-colors duration-300 group-hover/cv:text-[#b87bd1]">
                    {cvFile ? cvFile.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-white/60">
                    PDF, DOC, DOCX (Max 5MB)
                  </p>
                </label>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex gap-4 pt-8 border-t border-white/10">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-8 py-5 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:from-[#703181] hover:to-[#a86bc1] text-white rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] group/save"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-lg">Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6 transform transition-transform duration-500 group-hover/save:scale-110" />
                    <span className="text-lg">Save Profile</span>
                    <Sparkles className="w-5 h-5 opacity-0 group-hover/save:opacity-100 transition-opacity duration-500" />
                  </>
                )}
              </button>
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
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
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
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
