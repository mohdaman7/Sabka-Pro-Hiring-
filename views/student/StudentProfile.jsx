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
  X,
  Check,
  Home,
  ChevronRight,
} from "lucide-react";
import { customToast } from "@/components/ui/toast";
import { triggerSuccessAnimation } from "@/utils/successAnimations";

// Enhanced Loading Skeleton Component
const ProfileSkeleton = () => {
  return (
    <div className="relative p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 min-h-screen overflow-hidden">
      {/* Enhanced Background Effects - Responsive */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{ background: "rgba(128,55,145,0.12)" }}
        />
        <div
          className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse delay-300"
          style={{ background: "rgba(184,123,209,0.08)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-36 h-36 md:w-72 md:h-72 rounded-full blur-xl md:blur-2xl animate-pulse delay-700"
          style={{ background: "rgba(240,194,238,0.05)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(128,55,145,0.06),transparent_50%)] animate-pulse" />
      </div>

      {/* Header Skeleton - Responsive */}
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-xl sm:shadow-2xl backdrop-blur-xl border border-white/10 animate-pulse"
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

      {/* Profile Completion Skeleton - Responsive */}
      <div
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl border border-white/10 backdrop-blur-sm animate-pulse"
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

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {/* Left Column Skeleton */}
        <div className="space-y-6">
          {/* Profile Picture Skeleton */}
          <div
            className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl border border-white/10 backdrop-blur-sm animate-pulse"
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
            className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl border border-white/10 backdrop-blur-sm animate-pulse"
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
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
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
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

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

      // Trigger success animation
      triggerSuccessAnimation({ type: "achievement" });

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

  // Step navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step definitions
  const steps = [
    { number: 1, title: "Basic Info", icon: User, desc: "Name, Email, Phone" },
    { number: 2, title: "Address", icon: Home, desc: "Location Details" },
    {
      number: 3,
      title: "Education",
      icon: GraduationCap,
      desc: "Academic Background",
    },
    { number: 4, title: "Skills", icon: Zap, desc: "Skills & Experience" },
    { number: 5, title: "Job Preferences", icon: Target, desc: "Career Goals" },
    {
      number: 6,
      title: "Plan & Resume",
      icon: Crown,
      desc: "Upload & Upgrade",
    },
  ];

  // Show skeleton while loading data initially
  if (dataLoading && initialLoad) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="relative p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 min-h-screen overflow-hidden">
      {/* Enhanced Background Effects */}
      <FloatingParticles />

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse-slow"
          style={{ background: "rgba(128,55,145,0.12)" }}
        />
        <div
          className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse-slow delay-1000"
          style={{ background: "rgba(184,123,209,0.08)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-36 h-36 md:w-72 md:h-72 rounded-full blur-xl md:blur-2xl animate-pulse-slow delay-2000"
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
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl sm:text-4xl md:text-5xl md:text-6xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow-2xl">
              My Profile
            </h1>
            <Sparkles
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#b87bd1] animate-pulse"
              strokeWidth={2.5}
            />
          </div>
          <p className="text-white/90 text-xl font-bold">
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

      {/* Step Indicator */}
      <div
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl backdrop-blur-xl border-2 border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
        }}
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/90 font-black text-lg">
              Profile Setup Progress
            </span>
            <span className="text-white font-black text-2xl">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <button
                key={step.number}
                onClick={() => goToStep(step.number)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                  isCurrent
                    ? "bg-gradient-to-br from-[#803791] to-[#b87bd1] border-white/30 shadow-2xl shadow-purple-500/40 scale-105"
                    : isCompleted
                    ? "bg-white/10 border-emerald-400/50 hover:scale-105"
                    : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-xl ${
                      isCurrent
                        ? "bg-white/20"
                        : isCompleted
                        ? "bg-emerald-400/20"
                        : "bg-white/10"
                    }`}
                  >
                    {isCompleted ? (
                      <Check
                        className="w-5 h-5 text-emerald-400"
                        strokeWidth={3}
                      />
                    ) : (
                      <StepIcon
                        className={`w-5 h-5 ${
                          isCurrent ? "text-white" : "text-white/60"
                        }`}
                        strokeWidth={2.5}
                      />
                    )}
                  </div>
                  <span
                    className={`text-xs font-black ${
                      isCurrent ? "text-white" : "text-white/60"
                    }`}
                  >
                    STEP {step.number}
                  </span>
                </div>
                <h4
                  className={`font-black text-sm mb-1 ${
                    isCurrent ? "text-white" : "text-white/80"
                  }`}
                >
                  {step.title}
                </h4>
                <p
                  className={`text-xs ${
                    isCurrent ? "text-white/80" : "text-white/50"
                  }`}
                >
                  {step.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Content Card */}
      <div
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 md:p-12 shadow-2xl backdrop-blur-xl border-2 border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
        }}
      >
        {/* Step Content */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* STEP 1: BASIC INFO */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fadeIn">
              {/* Header */}
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#803791] to-[#b87bd1] shadow-2xl">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                    Basic Information
                  </h2>
                  <p className="text-white/70 font-semibold text-lg">
                    Let's start with your personal details
                  </p>
                </div>
              </div>

              {/* Profile Picture Upload */}
              <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 bg-white/5 border-2 border-white/10">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-8 flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-2xl">
                    <Camera className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow-lg">
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
                      className="w-48 h-48 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl overflow-hidden border-3 border-white/15 transition-all duration-500 group-hover/logo:border-[#b87bd1] group-hover/logo:shadow-purple-500/50"
                      style={{
                        background: "linear-gradient(135deg,#803791,#b87bd1)",
                        boxShadow: "0 20px 40px rgba(128,55,145,0.4)",
                      }}
                    >
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/logo:scale-110"
                        />
                      ) : (
                        <User
                          className="w-20 h-20 text-white transition-transform duration-500 group-hover/logo:scale-110"
                          strokeWidth={2.5}
                        />
                      )}
                    </div>
                    <label
                      className="absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-purple-500/60 group/upload"
                      style={{
                        background: "linear-gradient(135deg,#803791,#b87bd1)",
                        boxShadow: "0 10px 40px rgba(128,55,145,0.5)",
                      }}
                    >
                      <Camera
                        className="w-7 h-7 text-white transition-transform duration-300 group-hover/upload:scale-110"
                        strokeWidth={2.5}
                      />
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
                  <p className="text-base text-white/90 text-center font-bold">
                    Upload a professional photo
                  </p>
                </div>
              </div>

              {/* Form Fields for Step 1 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    Experience Type
                  </label>
                  <select
                    name="experienceType"
                    value={formData.experienceType}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  >
                    <option value="fresher">Fresher</option>
                    <option value="experienced">Experienced</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-white font-black mb-2 text-base">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 2: ADDRESS */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fadeIn">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#803791] to-[#b87bd1] shadow-2xl">
                  <Home className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                    Address Details
                  </h2>
                  <p className="text-white/70 font-semibold text-lg">
                    Where are you located?
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-white font-black mb-2 text-base">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) =>
                      handleAddressChange("street", e.target.value)
                    }
                    placeholder="123 Main Street"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    placeholder="Mumbai"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                    placeholder="Maharashtra"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) =>
                      handleAddressChange("country", e.target.value)
                    }
                    placeholder="India"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-base">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={formData.address.zipCode}
                    onChange={(e) =>
                      handleAddressChange("zipCode", e.target.value)
                    }
                    placeholder="400001"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EDUCATION */}
          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fadeIn">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#803791] to-[#b87bd1] shadow-2xl">
                  <GraduationCap
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                    Education
                  </h2>
                  <p className="text-white/70 font-semibold text-lg">
                    Your academic background
                  </p>
                </div>
              </div>

              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-6 p-8 border-2 border-white/10 rounded-3xl relative transition-all duration-300 hover:border-white/20 hover:shadow-lg group/edu bg-white/5"
                  onMouseEnter={() => setIsHovering(`edu-${index}`)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div className="space-y-2">
                    <label className="block text-white font-black mb-2 text-base">
                      Degree <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
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
                    <label className="block text-white font-black mb-2 text-base">
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
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white font-black mb-2 text-base">
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
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white font-black mb-2 text-base">
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
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between pt-4 border-t-2 border-white/10">
                    <label className="flex items-center gap-3 cursor-pointer group/checkbox">
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          edu.currentlyEnrolled
                            ? "border-[#b87bd1] bg-[#b87bd1]"
                            : "border-white/20 group-hover/checkbox:border-[#b87bd1]"
                        }`}
                      >
                        {edu.currentlyEnrolled && (
                          <Check
                            className="w-4 h-4 text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <span className="text-white font-semibold group-hover/checkbox:text-white transition-colors duration-300">
                        Currently Enrolled
                      </span>
                    </label>

                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducationEntry(index)}
                        className="px-4 py-2 sm:px-6 sm:py-3 text-red-400 border-2 border-red-400/30 rounded-2xl hover:bg-red-400 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105 font-semibold"
                      >
                        <Trash2 className="w-5 h-5" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addEducationEntry}
                className="w-full p-6 border-2 border-dashed border-white/10 rounded-3xl text-white/80 hover:text-white hover:border-[#b87bd1] transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] group/add bg-white/5"
              >
                <Plus className="w-6 h-6 transition-transform duration-300 group-hover/add:scale-110" />
                <span className="font-black text-lg">
                  Add Another Education
                </span>
              </button>
            </div>
          )}

          {/* STEP 4: SKILLS */}
          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fadeIn">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#803791] to-[#b87bd1] shadow-2xl">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                    Skills & Experience
                  </h2>
                  <p className="text-white/70 font-semibold text-lg">
                    What are you good at?
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-black mb-4 text-xl">
                    Key Skills
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="List your key skills separated by commas (e.g., React, JavaScript, Node.js, Python, UI/UX Design, Project Management)"
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all resize-none"
                  ></textarea>
                  <p className="text-white/60 text-sm mt-2">
                    Separate skills with commas. Be specific about technologies,
                    tools, and methodologies you're proficient with.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-black mb-2 text-base">
                      Experience Type
                    </label>
                    <select
                      name="experienceType"
                      value={formData.experienceType}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                    >
                      <option value="fresher">Fresher (0-1 years)</option>
                      <option value="experienced">
                        Experienced (1+ years)
                      </option>
                      <option value="senior">Senior (5+ years)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 text-center">
                      <div className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">
                        {
                          formData.skills
                            .split(",")
                            .filter((skill) => skill.trim()).length
                        }
                      </div>
                      <div className="text-white/70 font-semibold">
                        Skills Added
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: JOB PREFERENCES */}
          {currentStep === 5 && (
            <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fadeIn">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#803791] to-[#b87bd1] shadow-2xl">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                    Job Preferences
                  </h2>
                  <p className="text-white/70 font-semibold text-lg">
                    What kind of job are you looking for?
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Preferred Roles */}
                <div className="space-y-4">
                  <label className="block text-white font-black text-xl">
                    Preferred Job Roles
                  </label>
                  {formData.jobPreferences.preferredRoles.map((role, index) => (
                    <div key={index} className="flex gap-4">
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
                        placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
                        className="flex-1 px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                      />
                      {index ===
                        formData.jobPreferences.preferredRoles.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            addJobPreferenceEntry("preferredRoles")
                          }
                          className="px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white/80 hover:text-white hover:border-[#b87bd1] transition-all duration-300 hover:scale-105 font-semibold"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Preferred Locations */}
                <div className="space-y-4">
                  <label className="block text-white font-black text-xl">
                    Preferred Locations
                  </label>
                  {formData.jobPreferences.preferredLocations.map(
                    (location, index) => (
                      <div key={index} className="flex gap-4">
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
                          placeholder="e.g., Mumbai, Bangalore, Remote, Hybrid"
                          className="flex-1 px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                        />
                        {index ===
                          formData.jobPreferences.preferredLocations.length -
                            1 && (
                          <button
                            type="button"
                            onClick={() =>
                              addJobPreferenceEntry("preferredLocations")
                            }
                            className="px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white/80 hover:text-white hover:border-[#b87bd1] transition-all duration-300 hover:scale-105 font-semibold"
                          >
                            <Plus className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* Job Type & Salary */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-white font-black text-xl">
                      Job Type
                    </label>
                    <select
                      value={formData.jobPreferences.jobTypes[0] || ""}
                      onChange={(e) =>
                        handleJobPreferenceChange("jobTypes", e.target.value)
                      }
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                    >
                      <option value="">Select job type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-white font-black text-xl">
                      Expected Salary (LPA)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="number"
                          value={formData.jobPreferences.expectedSalary.min}
                          onChange={(e) =>
                            handleSalaryChange("min", e.target.value)
                          }
                          placeholder="Min"
                          className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={formData.jobPreferences.expectedSalary.max}
                          onChange={(e) =>
                            handleSalaryChange("max", e.target.value)
                          }
                          placeholder="Max"
                          className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white font-semibold placeholder:text-white/40 focus:border-[#b87bd1] focus:ring-4 focus:ring-[#b87bd1]/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Willing to Relocate */}
                <div className="flex items-center gap-4 p-6 bg-white/5 border-2 border-white/10 rounded-3xl">
                  <label className="flex items-center gap-4 cursor-pointer group/relocate">
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                        formData.jobPreferences.willingToRelocate
                          ? "border-[#b87bd1] bg-[#b87bd1]"
                          : "border-white/20 group-hover/relocate:border-[#b87bd1]"
                      }`}
                    >
                      {formData.jobPreferences.willingToRelocate && (
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-white font-black text-lg group-hover/relocate:text-white transition-colors duration-300">
                      Willing to relocate for job opportunities
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: PLAN & RESUME */}
          {currentStep === 6 && (
            <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fadeIn">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#803791] to-[#b87bd1] shadow-2xl">
                  <Crown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                    Plan & Resume
                  </h2>
                  <p className="text-white/70 font-semibold text-lg">
                    Upgrade and upload your resume
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Plan Selection */}
                <div className="space-y-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-4">
                    Choose Your Plan
                  </h3>

                  <div className="space-y-4">
                    {/* Free Plan */}
                    <div
                      className={`p-6 border-2 rounded-3xl transition-all duration-300 cursor-pointer ${
                        selectedPlan === "free"
                          ? "border-[#b87bd1] bg-[#b87bd1]/10 shadow-2xl shadow-purple-500/40"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                      onClick={() => setSelectedPlan("free")}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base sm:text-lg md:text-xl font-black text-white">
                          Free Plan
                        </h4>
                        <div className="text-lg sm:text-xl md:text-2xl font-black text-white">₹0</div>
                      </div>
                      <ul className="space-y-2 text-white/80">
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400" />
                          <span>Basic job matching</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400" />
                          <span>Up to 5 job applications/month</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400" />
                          <span>Standard profile visibility</span>
                        </li>
                      </ul>
                    </div>

                    {/* Pro Plan */}
                    <div
                      className={`p-6 border-2 rounded-3xl transition-all duration-300 cursor-pointer ${
                        selectedPlan === "pro"
                          ? "border-[#b87bd1] bg-[#b87bd1]/10 shadow-2xl shadow-purple-500/40"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                      onClick={() => setSelectedPlan("pro")}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base sm:text-lg md:text-xl font-black text-white">
                          Pro Plan
                        </h4>
                        <div className="text-lg sm:text-xl md:text-2xl font-black text-white">
                          ₹999<span className="text-sm">/month</span>
                        </div>
                      </div>
                      <ul className="space-y-2 text-white/80">
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400" />
                          <span>Advanced job matching</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400" />
                          <span>Unlimited job applications</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400" />
                          <span>Priority profile visibility</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400" />
                          <span>Direct recruiter access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-4">
                    Upload Your Resume
                  </h3>

                  <div
                    className="border-2 border-dashed border-white/10 rounded-3xl p-8 text-center transition-all duration-300 hover:border-[#b87bd1] hover:shadow-lg group/cv cursor-pointer bg-white/5"
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
                        <Upload className="w-10 h-10 text-[#b87bd1] transition-transform duration-300 group-hover/cv:scale-110" />
                      </div>
                      <p className="text-white font-black text-xl mb-2 transition-colors duration-300 group-hover/cv:text-[#b87bd1]">
                        {cvFile
                          ? cvFile.name
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-white/60 font-semibold">
                        PDF, DOC, DOCX (Max 5MB)
                      </p>
                      {cvFile && (
                        <div className="mt-4 p-3 bg-green-400/20 border border-green-400/30 rounded-2xl">
                          <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                            <Check className="w-5 h-5" />
                            Resume uploaded successfully!
                          </p>
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="bg-white/5 border-2 border-white/10 rounded-3xl p-6">
                    <h4 className="text-lg font-black text-white mb-3">
                      Resume Tips
                    </h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[#b87bd1]" />
                        <span>Keep it to 1-2 pages maximum</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[#b87bd1]" />
                        <span>
                          Include relevant keywords from job descriptions
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[#b87bd1]" />
                        <span>Highlight your achievements and impact</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[#b87bd1]" />
                        <span>Update your contact information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t-2 border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg border-2 border-white/20 transition-all flex items-center gap-3"
            >
              <ChevronRight className="w-6 h-6 rotate-180" strokeWidth={2.5} />
              Previous
            </button>

            <div className="text-white font-black text-lg">
              Step {currentStep} of {totalSteps}
            </div>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:scale-105 text-white rounded-2xl font-black text-lg shadow-2xl shadow-purple-500/40 transition-all flex items-center gap-3"
              >
                Next
                <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:scale-105 disabled:opacity-50 text-white rounded-2xl font-black text-lg shadow-2xl shadow-green-500/40 transition-all flex items-center gap-3"
              >
                {loading ? "Saving..." : "Save Profile"}
                <Save className="w-6 h-6" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm text-white transition-all duration-500 hover:shadow-purple-500/40 hover:scale-[1.02] group">
        <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/25 shadow-2xl">
            <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="drop-shadow-lg">Profile Stats</span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/15 rounded-2xl border-2 border-white/15 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-2xl">
                <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-base text-blue-50 font-black">
                Applications
              </span>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-black text-white drop-shadow-lg">
              {activity.totalApplications}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/15 rounded-2xl border-2 border-white/15 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-2xl">
                <Target className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-base text-blue-50 font-black">
                Profile Completion
              </span>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-black text-white drop-shadow-lg">
              {activity.profileCompletion}%
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/15 rounded-2xl border-2 border-white/15 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-2xl">
                <Eye className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-base text-blue-50 font-black">
                Resume Uploaded
              </span>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-black text-white drop-shadow-lg">
              {activity.hasResume ? "Yes" : "No"}
            </span>
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
