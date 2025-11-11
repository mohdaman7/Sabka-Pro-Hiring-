"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Video,
  Sparkles,
  BarChart3,
  Target,
  Crown,
  Lock,
  Eye,
  Download,
  Copy,
  Trash2,
  Edit3,
  Scissors,
  Shield,
  Award,
  TrendingUp,
  Zap,
  Play,
  Settings,
} from "lucide-react";
import ResumeCard from "./ResumeCard";
import VideoCard from "./VideoCard";
import TemplateCard from "./TemplateCard";
import UploadModal from "./UploadModal";

export default function ResumeManagement({ isPro = false }) {
  const [activeTab, setActiveTab] = useState("ats");
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: "Software Engineer Resume",
      type: "ats",
      atsScore: 87,
      views: 124,
      downloads: 23,
      isPrimary: true,
      createdAt: "2024-10-15",
      keywords: [
        { word: "React" },
        { word: "TypeScript" },
        { word: "Node.js" },
        { word: "AWS" },
      ],
    },
  ]);
  const [videoResumes, setVideoResumes] = useState([
    {
      id: 1,
      name: "Introduction Video",
      duration: "1:30",
      views: 45,
      createdAt: "2024-10-14",
      isPrimary: true,
      status: "processed",
      atsScore: 88,
    },
  ]);
  const [uploading, setUploading] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showVideoEditor, setShowVideoEditor] = useState(false);

  const tabs = [
    {
      id: "ats",
      label: "ATS Resume",
      icon: FileText,
      description: "Professional resume management",
    },
    {
      id: "video",
      label: "Video Resume",
      icon: Video,
      description: "Showcase your personality",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      pro: true,
      description: "Track your performance",
    },
  ];

  const atsTemplates = [
    {
      id: 1,
      name: "Professional",
      source: "Canva",
      score: 98,
      free: true,
      type: "classic",
    },
    {
      id: 2,
      name: "Modern Tech",
      source: "Novoresume",
      score: 96,
      free: true,
      type: "modern",
    },
    {
      id: 3,
      name: "Executive Pro",
      source: "FlowCV",
      score: 97,
      free: false,
      type: "executive",
    },
    {
      id: 4,
      name: "Minimal Clean",
      source: "JSONResume",
      score: 95,
      free: true,
      type: "minimal",
    },
    {
      id: 5,
      name: "Creative Bold",
      source: "Canva",
      score: 92,
      free: false,
      type: "creative",
    },
    {
      id: 6,
      name: "Corporate Elite",
      source: "Novoresume",
      score: 94,
      free: false,
      type: "corporate",
    },
  ];

  const videoTemplates = [
    { id: 1, name: "Introduction", duration: "30s", free: true },
    { id: 2, name: "Elevator Pitch", duration: "60s", free: true },
    { id: 3, name: "Project Showcase", duration: "90s", free: false },
    { id: 4, name: "Full Profile", duration: "120s", free: false },
    { id: 5, name: "Technical Skills", duration: "75s", free: true },
  ];

  const getScoreColor = (score) => {
    if (score >= 80)
      return {
        bg: "from-green-500/20 to-green-600/20",
        border: "border-green-500/30",
        text: "text-green-400",
      };
    if (score >= 60)
      return {
        bg: "from-yellow-500/20 to-yellow-600/20",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
      };
    return {
      bg: "from-red-500/20 to-red-600/20",
      border: "border-red-500/30",
      text: "text-red-400",
    };
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      const newResume = {
        id: Date.now(),
        name: file.name,
        type: "ats",
        atsScore: Math.floor(Math.random() * 30) + 70,
        views: 0,
        downloads: 0,
        isPrimary: resumes.length === 0,
        createdAt: new Date().toISOString().split("T")[0],
        keywords: [
          { word: "Leadership" },
          { word: "Communication" },
          { word: "Project Management" },
        ],
      };
      setResumes([...resumes, newResume]);
      setUploading(false);
      setShowResumeUpload(false);
    }, 2000);
  };

  const handleVideoUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      const newVideo = {
        id: Date.now(),
        name: file.name,
        duration: "1:23",
        views: 0,
        isPrimary: videoResumes.length === 0,
        createdAt: new Date().toISOString().split("T")[0],
        status: "processed",
        atsScore: Math.floor(Math.random() * 30) + 75,
      };
      setVideoResumes([...videoResumes, newVideo]);
      setUploading(false);
      setShowVideoUpload(false);
    }, 3000);
  };

  const handleDeleteResume = (resume) => {
    if (confirm(`Delete "${resume.name}"?`)) {
      setResumes(resumes.filter((r) => r.id !== resume.id));
    }
  };

  const handleDeleteVideo = (video) => {
    if (confirm(`Delete "${video.name}"?`)) {
      setVideoResumes(videoResumes.filter((v) => v.id !== video.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#803791]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 right-0 w-96 h-96 bg-[#b87bd1]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white">
                    Resume Center
                  </h1>
                  <p className="text-white/60 text-sm sm:text-base mt-1">
                    Professional resume & video management
                  </p>
                </div>
              </div>
            </div>

            {!isPro && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg hover:shadow-amber-500/40 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Crown className="w-5 h-5" />
                Upgrade to Pro
              </motion.button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: FileText,
                label: "Resumes",
                value: resumes.length,
                color: "blue",
              },
              {
                icon: Video,
                label: "Videos",
                value: videoResumes.length,
                color: "purple",
              },
              { icon: Eye, label: "Total Views", value: "342", color: "cyan" },
              {
                icon: TrendingUp,
                label: "Avg Score",
                value: "87%",
                color: "green",
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/10 border border-${stat.color}-500/20`}
                >
                  <Icon className={`w-5 h-5 text-${stat.color}-400 mb-1.5`} />
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className={`text-2xl font-bold text-${stat.color}-400`}>
                    {stat.value}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Premium Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isLocked = tab.pro && !isPro;

              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: isLocked ? 1 : 1.02 }}
                  whileTap={{ scale: isLocked ? 1 : 0.98 }}
                  onClick={() => !isLocked && setActiveTab(tab.id)}
                  disabled={isLocked}
                  className={`relative px-4 sm:px-6 py-3 rounded-xl font-bold transition-all group flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg shadow-[#b87bd1]/40"
                      : isLocked
                      ? "bg-white/5 text-white/40 cursor-not-allowed"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {isLocked && <Lock className="w-4 h-4" />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ATS Resume Tab */}
          {activeTab === "ats" && (
            <motion.div
              key="ats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <motion.button
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowResumeUpload(true)}
                  className="group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#803791]/20 to-[#b87bd1]/10 border-2 border-[#b87bd1]/30 hover:border-[#b87bd1] transition-all"
                >
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-[#b87bd1]/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-all" />
                    <Upload className="relative w-10 h-10 text-[#b87bd1] group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Upload Resume
                  </h3>
                  <p className="text-white/60 text-sm">PDF, DOCX (Max 10MB)</p>
                </motion.button>

                <motion.button
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBuilder(true)}
                  className="group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-2 border-blue-500/30 hover:border-blue-500 transition-all"
                >
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-all" />
                    <Edit3 className="relative w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Build Resume
                  </h3>
                  <p className="text-white/60 text-sm">
                    Professional templates
                  </p>
                </motion.button>

                <motion.button
                  whileHover={{ y: isPro ? -6 : 0, scale: isPro ? 1.02 : 1 }}
                  whileTap={{ scale: isPro ? 0.98 : 1 }}
                  disabled={!isPro}
                  className={`group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-2 border-amber-500/30 transition-all relative ${
                    isPro
                      ? "hover:border-amber-500"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {!isPro && (
                    <div className="absolute top-2 right-2">
                      <Crown className="w-5 h-5 text-amber-400" />
                    </div>
                  )}
                  <div className="relative mb-4">
                    <div
                      className={`absolute inset-0 blur-xl rounded-lg opacity-0 ${
                        isPro ? "group-hover:opacity-100" : ""
                      } transition-all ${isPro ? "bg-amber-500/20" : ""}`}
                    />
                    <Target
                      className={`relative w-10 h-10 ${
                        isPro ? "text-amber-400" : "text-amber-400/50"
                      } ${
                        isPro ? "group-hover:scale-110" : ""
                      } transition-transform`}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    ATS Optimizer
                  </h3>
                  <p className="text-white/60 text-sm">Boost your score</p>
                </motion.button>
              </div>

              {/* Resumes Grid or Empty State */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">My Resumes</h2>
                  <span className="text-sm text-white/60">
                    {resumes.length} / {isPro ? "∞" : "3"}
                  </span>
                </div>

                {resumes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 sm:py-20 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#b87bd1]/20 mb-4">
                      <FileText className="w-8 h-8 text-[#b87bd1]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      No Resumes Yet
                    </h3>
                    <p className="text-white/60 mb-6 max-w-sm mx-auto">
                      Upload your first resume to get instant ATS analysis and
                      improvement suggestions
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowResumeUpload(true)}
                      className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-bold shadow-lg hover:shadow-[#b87bd1]/40"
                    >
                      Upload Resume
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {resumes.map((resume) => (
                      <ResumeCard
                        key={resume.id}
                        resume={resume}
                        getScoreColor={getScoreColor}
                        onView={(resume) => console.log("View:", resume)}
                        onDownload={(resume) =>
                          console.log("Download:", resume)
                        }
                        onDuplicate={(resume) =>
                          console.log("Duplicate:", resume)
                        }
                        onDelete={handleDeleteResume}
                        isPro={isPro}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Templates Showcase */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    ATS-Optimized Templates
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Award className="w-4 h-4" />
                    <span>98% ATS Compatibility</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {atsTemplates.map((template, idx) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      type="resume"
                      isLocked={!template.free && !isPro}
                      onSelect={(t) => console.log("Select template:", t)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Video Resume Tab */}
          {activeTab === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <motion.button
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowVideoUpload(true)}
                  className="group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-2 border-purple-500/30 hover:border-purple-500 transition-all"
                >
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-all" />
                    <Video className="relative w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Upload Video
                  </h3>
                  <p className="text-white/60 text-sm">MP4, WebM (Max 100MB)</p>
                </motion.button>

                <motion.button
                  whileHover={{ y: isPro ? -6 : 0, scale: isPro ? 1.02 : 1 }}
                  whileTap={{ scale: isPro ? 0.98 : 1 }}
                  disabled={!isPro}
                  className={`group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-2 border-blue-500/30 transition-all relative ${
                    isPro
                      ? "hover:border-blue-500"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {!isPro && (
                    <div className="absolute top-2 right-2">
                      <Crown className="w-5 h-5 text-amber-400" />
                    </div>
                  )}
                  <div className="relative mb-4">
                    <div
                      className={`absolute inset-0 blur-xl rounded-lg opacity-0 ${
                        isPro ? "group-hover:opacity-100" : ""
                      } transition-all ${isPro ? "bg-blue-500/20" : ""}`}
                    />
                    <Scissors
                      className={`relative w-10 h-10 ${
                        isPro ? "text-blue-400" : "text-blue-400/50"
                      } ${
                        isPro ? "group-hover:scale-110" : ""
                      } transition-transform`}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Video Editor
                  </h3>
                  <p className="text-white/60 text-sm">Trim & enhance clips</p>
                </motion.button>

                <motion.button
                  whileHover={{ y: isPro ? -6 : 0, scale: isPro ? 1.02 : 1 }}
                  whileTap={{ scale: isPro ? 0.98 : 1 }}
                  disabled={!isPro}
                  className={`group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-2 border-green-500/30 transition-all relative ${
                    isPro
                      ? "hover:border-green-500"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {!isPro && (
                    <div className="absolute top-2 right-2">
                      <Crown className="w-5 h-5 text-amber-400" />
                    </div>
                  )}
                  <div className="relative mb-4">
                    <div
                      className={`absolute inset-0 blur-xl rounded-lg opacity-0 ${
                        isPro ? "group-hover:opacity-100" : ""
                      } transition-all ${isPro ? "bg-green-500/20" : ""}`}
                    />
                    <Shield
                      className={`relative w-10 h-10 ${
                        isPro ? "text-green-400" : "text-green-400/50"
                      } ${
                        isPro ? "group-hover:scale-110" : ""
                      } transition-transform`}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    DRM Protection
                  </h3>
                  <p className="text-white/60 text-sm">Secure your content</p>
                </motion.button>
              </div>

              {/* Videos Grid or Empty State */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    My Video Resumes
                  </h2>
                  <span className="text-sm text-white/60">
                    {videoResumes.length} / {isPro ? "∞" : "2"}
                  </span>
                </div>

                {videoResumes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 sm:py-20 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/20 mb-4">
                      <Video className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      No Video Resumes Yet
                    </h3>
                    <p className="text-white/60 mb-6 max-w-sm mx-auto">
                      Create your first video resume to showcase your
                      personality and stand out
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowVideoUpload(true)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg hover:shadow-purple-500/40"
                    >
                      Upload Video
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {videoResumes.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        isPrimary={video.isPrimary}
                        onPlay={(v) => console.log("Play:", v)}
                        onEdit={(v) => console.log("Edit:", v)}
                        onDelete={handleDeleteVideo}
                        onSetPrimary={(v) => console.log("Set Primary:", v)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Video Templates */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Video Templates
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {videoTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      type="video"
                      isLocked={!template.free && !isPro}
                      onSelect={(t) => console.log("Select template:", t)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && isPro && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {[
                  {
                    label: "Total Views",
                    value: "1,247",
                    icon: Eye,
                    color: "blue",
                  },
                  {
                    label: "Downloads",
                    value: "342",
                    icon: Download,
                    color: "green",
                  },
                  {
                    label: "Avg ATS Score",
                    value: "87%",
                    icon: Target,
                    color: "purple",
                  },
                  {
                    label: "Profile Strength",
                    value: "94%",
                    icon: TrendingUp,
                    color: "amber",
                  },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-6 rounded-2xl bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/10 border border-${stat.color}-500/20`}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${stat.color}-500/20`}
                        >
                          <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                        </div>
                        <div
                          className={`text-3xl font-black text-${stat.color}-400`}
                        >
                          {stat.value}
                        </div>
                      </div>
                      <p className="text-white/60 text-sm">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Performance Analytics
                </h3>
                <div className="h-80 flex items-center justify-center text-white/40">
                  <BarChart3 className="w-20 h-20" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Modals */}
        <UploadModal
          isOpen={showResumeUpload}
          onClose={() => setShowResumeUpload(false)}
          onUpload={handleFileUpload}
          isLoading={uploading}
          type="resume"
          maxSize={10}
        />

        <UploadModal
          isOpen={showVideoUpload}
          onClose={() => setShowVideoUpload(false)}
          onUpload={handleVideoUpload}
          isLoading={uploading}
          type="video"
          maxSize={100}
        />

        {/* Upload Progress */}
        <AnimatePresence>
          {uploading && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-6 right-6 bg-gradient-to-br from-[#803791] to-[#b87bd1] backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl z-40 max-w-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">
                    {activeTab === "ats"
                      ? "Analyzing Resume..."
                      : "Processing Video..."}
                  </h4>
                  <p className="text-sm text-white/80 mt-1">
                    Please wait while we process your file
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
