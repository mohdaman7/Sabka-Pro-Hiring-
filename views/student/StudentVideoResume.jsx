"use client";

import { useState, useRef } from "react";
import {
  Video,
  Upload,
  Play,
  Trash2,
  Check,
  Clock,
  Camera,
  FileVideo,
  Sparkles,
  AlertCircle,
  Share2,
  Eye,
  FileText,
  Download,
  Edit3,
  Award,
  Briefcase,
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Crown,
  Lock,
  Zap,
} from "lucide-react";

export default function VideoResumePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState([
    {
      id: 1,
      title: "Introduction Video",
      duration: "2:34",
      uploadDate: "2024-01-15",
      status: "active",
      thumbnail: "/videoresume.jpg",
      views: 127,
      size: "24.5 MB",
    },
  ]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("video");
  const [isProStudent, setIsProStudent] = useState(true);
  const fileInputRef = useRef(null);

  // Mock ATS Resume Data
  const atsResume = {
    personalInfo: {
      name: "John Doe",
      title: "Senior Frontend Developer",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      portfolio: "johndoe.dev",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
    },
    summary:
      "Experienced Frontend Developer with 5+ years of expertise in React, TypeScript, and modern web technologies.",
    experience: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        period: "2022 - Present",
        description:
          "Lead development of customer-facing web applications using React and TypeScript.",
        skills: ["React", "TypeScript", "Next.js", "GraphQL"],
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "StartUpXYZ",
        period: "2020 - 2022",
        description:
          "Developed and maintained multiple client projects using Vue.js and Node.js.",
        skills: ["Vue.js", "JavaScript", "Node.js", "SASS"],
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        period: "2016 - 2020",
        gpa: "3.8/4.0",
      },
    ],
    skills: {
      technical: [
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "GraphQL",
        "Tailwind CSS",
      ],
      soft: ["Team Leadership", "Problem Solving", "Agile Methodology"],
    },
    atsScore: 85,
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (id) => {
    setRecordedVideos(recordedVideos.filter((video) => video.id !== id));
  };

  return (
    <>
      <div className="relative min-h-screen p-6 overflow-hidden">
        {/* Decorative background */}
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

        {/* Hero Section */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6 mb-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
            boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
          }}
        >
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "rgba(184,123,209,0.1)",
                color: "#b87bd1",
              }}
            >
              <Sparkles className="w-4 h-4" />
              Stand out with video & ATS-optimized resumes
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create Your Professional Profile
            </h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Make a lasting impression with video resumes and ATS-optimized
              documents
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div
            className="p-2 rounded-2xl shadow-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("video")}
                className={`rounded-xl px-8 py-3 font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "video"
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/6"
                }`}
              >
                <Video className="w-5 h-5" />
                Video Resume
              </button>
              <button
                onClick={() => setActiveTab("ats")}
                className={`rounded-xl px-8 py-3 font-semibold transition-all duration-300 flex items-center gap-2 relative ${
                  activeTab === "ats"
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/6"
                } ${!isProStudent ? "pr-12" : ""}`}
              >
                <FileText className="w-5 h-5" />
                ATS Resume
                {!isProStudent && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Video Resume Content */}
        {activeTab === "video" && (
          <>
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Upload/Record Section */}
              <div
                className="p-8 rounded-2xl shadow-xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,#803791,#b87bd1)",
                    }}
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Record or Upload
                  </h2>
                </div>

                {/* Upload Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? "border-[#b87bd1] scale-105"
                      : "border-white/12 hover:border-[#b87bd1]/50"
                  }`}
                  style={{
                    background: isDragging
                      ? "rgba(184,123,209,0.05)"
                      : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{
                        background: "linear-gradient(135deg,#803791,#b87bd1)",
                      }}
                    >
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white mb-2">
                        Drag and drop your video here
                      </p>
                      <p className="text-sm text-white/70 mb-4">
                        or click to browse files
                      </p>
                      <p className="text-xs text-white/50">
                        Supports MP4, MOV, AVI (Max 100MB)
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                    />
                    <button
                      onClick={handleFileSelect}
                      className="px-8 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white rounded-xl shadow-lg font-medium flex items-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Choose File
                    </button>
                  </div>
                </div>

                {/* Record Button */}
                <div
                  className="mt-6 pt-6"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-full py-4 rounded-xl font-semibold transition-all ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                        : "bg-white/6 hover:bg-white/10 text-white border border-white/12"
                    }`}
                  >
                    {isRecording ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        Stop Recording
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Video className="w-5 h-5" />
                        Start Recording
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Tips Section */}
              <div
                className="p-8 rounded-2xl shadow-xl"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Pro Tips</h2>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: Clock,
                      title: "Keep it concise",
                      description:
                        "Aim for 60-90 seconds. Employers appreciate brevity.",
                    },
                    {
                      icon: Camera,
                      title: "Good lighting matters",
                      description:
                        "Face a window or use soft lighting for professional look.",
                    },
                    {
                      icon: FileVideo,
                      title: "Practice makes perfect",
                      description:
                        "Rehearse your script before recording to sound natural.",
                    },
                    {
                      icon: Check,
                      title: "Dress professionally",
                      description: "Wear what you'd wear to an interview.",
                    },
                  ].map((tip, index) => {
                    const IconComponent = tip.icon;
                    return (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all duration-300"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">
                            {tip.title}
                          </h3>
                          <p className="text-sm text-white/80">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl"
                  style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90">
                      <strong>Remember:</strong> Your video resume complements
                      your traditional resume. Highlight your unique
                      personality.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Video Resumes Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">
                    My Video Resumes
                  </h2>
                  <p className="text-sm text-white/70">
                    Manage and share your professional video presentations
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <Video className="w-4 h-4 text-white/80" />
                  <span className="text-sm font-semibold text-white">
                    {recordedVideos.length}{" "}
                    {recordedVideos.length === 1 ? "video" : "videos"}
                  </span>
                </div>
              </div>

              {recordedVideos.length === 0 ? (
                <div
                  className="rounded-2xl p-16 text-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    border: "2px dashed rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="relative inline-block mb-6">
                    <div
                      className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-xl"
                      style={{
                        background: "linear-gradient(135deg,#803791,#b87bd1)",
                      }}
                    >
                      <Video className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    No video resumes yet
                  </h3>
                  <p className="text-white/70 mb-6 max-w-md mx-auto">
                    Start creating your professional video resume to stand out
                  </p>
                  <button
                    onClick={handleFileSelect}
                    className="px-8 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white rounded-xl shadow-lg font-medium inline-flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Your First Video
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recordedVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group rounded-2xl overflow-hidden shadow-xl transition-all hover:-translate-y-2"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Thumbnail Section */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                        {/* Play Button */}
                        <button
                          onClick={() => setSelectedVideo(video)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group-hover:bg-[#803791]">
                            <Play className="w-10 h-10 text-[#803791] group-hover:text-white ml-1 transition-colors duration-300" />
                          </div>
                        </button>

                        {/* Status Badge */}
                        {video.status === "active" && (
                          <div
                            className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm"
                            style={{
                              background:
                                "linear-gradient(135deg,#10b981,#059669)",
                            }}
                          >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            Active
                          </div>
                        )}

                        {/* Duration Badge */}
                        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {video.duration}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="font-bold text-white mb-3 text-xl leading-tight group-hover:text-[#b87bd1] transition-colors duration-300">
                          {video.title}
                        </h3>

                        {/* Metadata Grid */}
                        <div
                          className="grid grid-cols-2 gap-3 mb-5 pb-5"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <Eye className="w-4 h-4 text-white/50" />
                            <span className="font-medium">
                              {video.views} views
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <FileVideo className="w-4 h-4 text-white/50" />
                            <span className="font-medium">{video.size}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-white/60 mb-5">
                          <span className="font-medium">
                            Uploaded{" "}
                            {new Date(video.uploadDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                            onClick={() => setSelectedVideo(video)}
                          >
                            <Play className="w-4 h-4" />
                            Watch
                          </button>
                          <button className="px-4 py-2 rounded-xl bg-white/6 hover:bg-white/10 text-white border border-white/12 font-semibold transition-all shadow-sm">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold transition-all shadow-sm"
                            onClick={() => handleDelete(video.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* What to Include Section */}
            <div
              className="p-8 rounded-2xl shadow-xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                What to Include in Your Video Resume
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Introduction",
                    description:
                      "Start with your name, current role, and what you're looking for.",
                  },
                  {
                    title: "Key Skills",
                    description:
                      "Highlight 3-4 relevant skills with brief examples.",
                  },
                  {
                    title: "Call to Action",
                    description:
                      "End with enthusiasm and invite employers to connect.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white/3 rounded-xl hover:bg-white/5 transition-colors duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                      style={{
                        background: "linear-gradient(135deg,#803791,#b87bd1)",
                      }}
                    >
                      <span className="text-white font-bold text-xl">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ATS Resume Content */}
        {activeTab === "ats" && (
          <div className="space-y-8">
            {!isProStudent ? (
              /* Pro Student Upgrade Required */
              <div
                className="p-12 rounded-2xl shadow-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="max-w-4xl mx-auto text-center">
                  <div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-semibold mb-8"
                    style={{
                      background: "rgba(184,123,209,0.1)",
                      color: "#b87bd1",
                    }}
                  >
                    <Crown className="w-6 h-6" />
                    Pro Student Feature
                  </div>

                  <div
                    className="w-32 h-32 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl"
                    style={{
                      background: "linear-gradient(135deg,#803791,#b87bd1)",
                    }}
                  >
                    <Lock className="w-16 h-16 text-white" />
                  </div>

                  <h2 className="text-4xl font-bold text-white mb-4">
                    Unlock ATS Resume Conversion
                  </h2>

                  <p className="text-xl text-white/80 mb-8 leading-relaxed">
                    Convert your resume to an ATS-optimized format that gets
                    past automated screening systems.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                      {
                        icon: Zap,
                        title: "ATS Optimization",
                        description: "Optimize for Applicant Tracking Systems",
                      },
                      {
                        icon: Award,
                        title: "Higher Score",
                        description: "Increase your resume match rate by 70%",
                      },
                      {
                        icon: Briefcase,
                        title: "More Interviews",
                        description: "Get 3x more interview calls",
                      },
                    ].map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <div
                          key={index}
                          className="p-6 bg-white/3 rounded-2xl hover:bg-white/5 transition-colors duration-300"
                          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                            style={{
                              background: "rgba(184,123,209,0.1)",
                            }}
                          >
                            <IconComponent className="w-6 h-6 text-[#b87bd1]" />
                          </div>
                          <h3 className="font-bold text-white mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-white/70 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setIsProStudent(true)}
                      className="px-12 py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white rounded-xl text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-3"
                    >
                      <Crown className="w-6 h-6" />
                      Upgrade to Pro Student
                    </button>
                    <button
                      onClick={() => setActiveTab("video")}
                      className="px-12 py-4 rounded-xl text-lg font-semibold bg-white/6 text-white hover:bg-white/10 transition-all shadow-sm border border-white/12"
                    >
                      Continue with Video Resume
                    </button>
                  </div>

                  <p className="text-sm text-white/60 mt-6">
                    Already a Pro Student?{" "}
                    <button className="text-[#b87bd1] font-semibold hover:text-[#c88be1]">
                      Contact support
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              /* ATS Resume Content for Pro Students */
              <>
                {/* ATS Score Card */}
                <div
                  className="p-8 rounded-2xl shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-6">
                    <div className="flex-1 min-w-[300px]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            ATS Resume Score
                          </h2>
                          <p className="text-white/90">
                            How well your resume performs with ATS
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">
                            Overall Score
                          </span>
                          <span className="text-2xl font-bold text-white">
                            {atsResume.atsScore}%
                          </span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-full transition-all"
                            style={{
                              width: `${atsResume.atsScore}%`,
                              background:
                                "linear-gradient(90deg,#10b981,#059669)",
                            }}
                          />
                        </div>
                        <p className="text-sm text-white/90">
                          {atsResume.atsScore >= 80
                            ? "Excellent! Your resume is well-optimized for ATS."
                            : "Good start! Consider optimizing keywords."}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="px-6 py-3 bg-white text-[#803791] hover:bg-white/90 font-semibold rounded-xl shadow-lg transition-all flex items-center gap-2 mb-4">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                      <div className="flex gap-2 justify-end">
                        <button className="px-4 py-2 bg-white/20 text-white border border-white/30 hover:bg-white/30 rounded-lg transition-all flex items-center gap-2">
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-white/20 text-white border border-white/30 hover:bg-white/30 rounded-lg transition-all flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column - Personal Info & Skills */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Personal Info Card */}
                    <div
                      className="p-6 rounded-2xl shadow-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="text-center mb-6">
                        <div
                          className="w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                          style={{
                            background:
                              "linear-gradient(135deg,#803791,#b87bd1)",
                          }}
                        >
                          JD
                        </div>
                        <h2 className="text-xl font-bold text-white">
                          {atsResume.personalInfo.name}
                        </h2>
                        <p className="text-[#b87bd1] font-semibold">
                          {atsResume.personalInfo.title}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-white/80">
                          <Mail className="w-4 h-4 text-[#b87bd1]" />
                          <span>{atsResume.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/80">
                          <Phone className="w-4 h-4 text-[#b87bd1]" />
                          <span>{atsResume.personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/80">
                          <MapPin className="w-4 h-4 text-[#b87bd1]" />
                          <span>{atsResume.personalInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/80">
                          <Globe className="w-4 h-4 text-[#b87bd1]" />
                          <span>{atsResume.personalInfo.portfolio}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/80">
                          <Linkedin className="w-4 h-4 text-[#b87bd1]" />
                          <span>{atsResume.personalInfo.linkedin}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/80">
                          <Github className="w-4 h-4 text-[#b87bd1]" />
                          <span>{atsResume.personalInfo.github}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills Card */}
                    <div
                      className="p-6 rounded-2xl shadow-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(184,123,209,0.1)",
                          }}
                        >
                          <Award className="w-5 h-5 text-[#b87bd1]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Skills</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-white/80 mb-2">
                            Technical
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {atsResume.skills.technical.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                  background: "rgba(184,123,209,0.1)",
                                  color: "#b87bd1",
                                  border: "1px solid rgba(184,123,209,0.2)",
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white/80 mb-2">
                            Soft Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {atsResume.skills.soft.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-white/6 text-white/80 border border-white/12"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Experience & Education */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Summary Card */}
                    <div
                      className="p-6 rounded-2xl shadow-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(184,123,209,0.1)",
                          }}
                        >
                          <User className="w-5 h-5 text-[#b87bd1]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          Professional Summary
                        </h3>
                      </div>
                      <p className="text-white/80 leading-relaxed">
                        {atsResume.summary}
                      </p>
                    </div>

                    {/* Experience Card */}
                    <div
                      className="p-6 rounded-2xl shadow-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(184,123,209,0.1)",
                          }}
                        >
                          <Briefcase className="w-5 h-5 text-[#b87bd1]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          Work Experience
                        </h3>
                      </div>

                      <div className="space-y-6">
                        {atsResume.experience.map((exp) => (
                          <div
                            key={exp.id}
                            className="pb-6 last:pb-0"
                            style={{
                              borderBottom: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-white text-lg">
                                  {exp.title}
                                </h4>
                                <p className="text-[#b87bd1] font-semibold">
                                  {exp.company}
                                </p>
                              </div>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/6 text-white/80">
                                {exp.period}
                              </span>
                            </div>
                            <p className="text-white/70 mb-3 leading-relaxed">
                              {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-full text-xs font-medium"
                                  style={{
                                    background: "rgba(59,130,246,0.1)",
                                    color: "#60a5fa",
                                    border: "1px solid rgba(59,130,246,0.2)",
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education Card */}
                    <div
                      className="p-6 rounded-2xl shadow-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(184,123,209,0.1)",
                          }}
                        >
                          <GraduationCap className="w-5 h-5 text-[#b87bd1]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          Education
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {atsResume.education.map((edu) => (
                          <div key={edu.id}>
                            <h4 className="font-bold text-white">
                              {edu.degree}
                            </h4>
                            <p className="text-white/80">{edu.institution}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/6 text-white/80">
                                {edu.period}
                              </span>
                              {edu.gpa && (
                                <span className="text-sm text-white/70">
                                  GPA: {edu.gpa}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optimization Tips */}
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    ATS Optimization Tips
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        title: "Use Keywords",
                        description:
                          "Include job-specific keywords from the job description",
                      },
                      {
                        title: "Clear Formatting",
                        description:
                          "Use standard fonts and avoid tables/graphics",
                      },
                      {
                        title: "Proper Headings",
                        description:
                          "Use standard section headings like 'Experience'",
                      },
                      {
                        title: "File Format",
                        description:
                          "Save as .docx or PDF with selectable text",
                      },
                    ].map((tip, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-white/3 rounded-xl shadow-sm hover:bg-white/5 transition-colors"
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                          style={{
                            background: "rgba(184,123,209,0.1)",
                          }}
                        >
                          <Check className="w-6 h-6 text-[#b87bd1]" />
                        </div>
                        <h4 className="font-semibold text-white mb-2">
                          {tip.title}
                        </h4>
                        <p className="text-sm text-white/70">
                          {tip.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
