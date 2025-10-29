"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Video,
  Sparkles,
  Star,
  Download,
  Eye,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Zap,
  Lock,
  Crown,
  Play,
  Pause,
  BarChart3,
  Target,
  Shield,
  Copy,
  Settings,
  PlusCircle,
  FileCheck,
  Scissors,
} from "lucide-react";

export default function ResumeManagement({ isPro = false }) {
  const [activeTab, setActiveTab] = useState("ats");
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: "Software Engineer Resume",
      type: "ats",
      score: 87,
      views: 124,
      downloads: 23,
      isPrimary: true,
      createdAt: "2024-10-15",
    },
  ]);
  const [videoResumes, setVideoResumes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showVideoEditor, setShowVideoEditor] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const tabs = [
    { id: "ats", label: "ATS Resume", icon: FileText },
    { id: "video", label: "Video Resume", icon: Video },
    { id: "analytics", label: "Analytics", icon: BarChart3, pro: true },
  ];

  const atsTemplates = [
    {
      id: 1,
      name: "Professional",
      preview: "/templates/professional.jpg",
      score: 95,
      free: true,
    },
    { id: 2, name: "Modern", preview: "/templates/modern.jpg", score: 92, free: true },
    {
      id: 3,
      name: "Creative",
      preview: "/templates/creative.jpg",
      score: 89,
      free: false,
    },
    { id: 4, name: "Executive", preview: "/templates/executive.jpg", score: 97, free: false },
  ];

  const videoTemplates = [
    { id: 1, name: "Introduction", duration: "30s", free: true },
    { id: 2, name: "Elevator Pitch", duration: "60s", free: true },
    { id: 3, name: "Project Showcase", duration: "90s", free: false },
    { id: 4, name: "Full Profile", duration: "120s", free: false },
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Simulate upload and ATS parsing
    setTimeout(() => {
      const newResume = {
        id: Date.now(),
        name: file.name,
        type: "ats",
        score: Math.floor(Math.random() * 30) + 70,
        views: 0,
        downloads: 0,
        isPrimary: resumes.length === 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setResumes([...resumes, newResume]);
      setUploading(false);
    }, 2000);
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setTimeout(() => {
      const newVideo = {
        id: Date.now(),
        name: file.name,
        thumbnail: "/placeholder-video.jpg",
        duration: "1:23",
        views: 0,
        isPrimary: videoResumes.length === 0,
        createdAt: new Date().toISOString().split("T")[0],
        privacy: "public",
      };
      setVideoResumes([...videoResumes, newVideo]);
      setUploading(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Pro Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">Resume Center</h2>
          <p className="text-white/60">
            Manage your ATS resumes and video profiles
          </p>
        </div>
        {!isPro && (
          <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all hover:scale-105">
            <Crown className="w-5 h-5" />
            Upgrade to Pro
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isLocked = tab.pro && !isPro;

          return (
            <button
              key={tab.id}
              onClick={() => !isLocked && setActiveTab(tab.id)}
              disabled={isLocked}
              className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
                  : isLocked
                  ? "text-white/40 cursor-not-allowed"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
              {isLocked && <Lock className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* ATS Resume Tab */}
        {activeTab === "ats" && (
          <motion.div
            key="ats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="group p-6 bg-gradient-to-br from-[#803791]/20 to-[#b87bd1]/10 border-2 border-[#b87bd1]/30 rounded-2xl hover:border-[#b87bd1] transition-all hover:scale-105"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <Upload className="w-10 h-10 text-[#b87bd1] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-1">Upload Resume</h3>
                <p className="text-white/60 text-sm">PDF, DOC, DOCX (Max 5MB)</p>
              </button>

              <button
                onClick={() => setShowBuilder(true)}
                className="group p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl hover:border-blue-500 transition-all hover:scale-105"
              >
                <Edit3 className="w-10 h-10 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-1">Build Resume</h3>
                <p className="text-white/60 text-sm">Use professional templates</p>
              </button>

              <button
                className={`group p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-2 border-amber-500/30 rounded-2xl hover:border-amber-500 transition-all hover:scale-105 relative ${
                  !isPro && "opacity-60"
                }`}
                disabled={!isPro}
              >
                <Target className="w-10 h-10 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-1">ATS Optimizer</h3>
                <p className="text-white/60 text-sm">Boost your score</p>
                {!isPro && (
                  <div className="absolute top-2 right-2">
                    <Crown className="w-5 h-5 text-amber-400" />
                  </div>
                )}
              </button>
            </div>

            {/* Resume List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">My Resumes</h3>
                <span className="text-white/60 text-sm">
                  {resumes.length} / {isPro ? "∞" : "3"} resumes
                </span>
              </div>

              {resumes.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                  <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60 mb-4">No resumes uploaded yet</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Upload Your First Resume
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {resumes.map((resume) => (
                    <motion.div
                      key={resume.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#b87bd1]/50 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#803791] to-[#b87bd1] rounded-xl flex items-center justify-center shrink-0">
                          <FileText className="w-7 h-7 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                {resume.name}
                                {resume.isPrimary && (
                                  <span className="px-2 py-0.5 bg-[#b87bd1]/20 border border-[#b87bd1]/30 rounded-full text-xs text-[#b87bd1]">
                                    Primary
                                  </span>
                                )}
                              </h4>
                              <p className="text-white/60 text-sm">
                                Uploaded {resume.createdAt}
                              </p>
                            </div>

                            {/* ATS Score */}
                            <div className="text-right">
                              <div
                                className={`text-2xl font-black ${
                                  resume.score >= 80
                                    ? "text-green-400"
                                    : resume.score >= 60
                                    ? "text-yellow-400"
                                    : "text-red-400"
                                }`}
                              >
                                {resume.score}%
                              </div>
                              <div className="text-white/60 text-xs">ATS Score</div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-6 mb-4">
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                              <Eye className="w-4 h-4" />
                              {resume.views} views
                            </div>
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                              <Download className="w-4 h-4" />
                              {resume.downloads} downloads
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                              <Copy className="w-4 h-4" />
                              Duplicate
                            </button>
                            <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* ATS Templates */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">ATS-Optimized Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {atsTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#b87bd1]/50 transition-all cursor-pointer"
                  >
                    {!template.free && (
                      <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center gap-1">
                        <Crown className="w-3 h-3 text-white" />
                        <span className="text-xs font-bold text-white">PRO</span>
                      </div>
                    )}
                    <div className="aspect-[3/4] bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                      <FileCheck className="w-16 h-16 text-white/40" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white mb-1">{template.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">Score: {template.score}%</span>
                        <button className="text-xs text-[#b87bd1] font-semibold hover:underline">
                          Use Template
                        </button>
                      </div>
                    </div>
                  </div>
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
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => videoInputRef.current?.click()}
                className="group p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl hover:border-purple-500 transition-all hover:scale-105"
              >
                <input
                  ref={videoInputRef}
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
                <Video className="w-10 h-10 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-1">Upload Video</h3>
                <p className="text-white/60 text-sm">MP4, MOV (Max 100MB)</p>
              </button>

              <button
                className={`group p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl hover:border-blue-500 transition-all hover:scale-105 relative ${
                  !isPro && "opacity-60"
                }`}
                onClick={() => isPro && setShowVideoEditor(true)}
                disabled={!isPro}
              >
                <Scissors className="w-10 h-10 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-1">Video Editor</h3>
                <p className="text-white/60 text-sm">Trim & merge clips</p>
                {!isPro && (
                  <div className="absolute top-2 right-2">
                    <Crown className="w-5 h-5 text-amber-400" />
                  </div>
                )}
              </button>

              <button
                className={`group p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl hover:border-green-500 transition-all hover:scale-105 relative ${
                  !isPro && "opacity-60"
                }`}
                disabled={!isPro}
              >
                <Shield className="w-10 h-10 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-1">DRM Protection</h3>
                <p className="text-white/60 text-sm">Secure your video</p>
                {!isPro && (
                  <div className="absolute top-2 right-2">
                    <Crown className="w-5 h-5 text-amber-400" />
                  </div>
                )}
              </button>
            </div>

            {/* Video List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">My Video Resumes</h3>
                <span className="text-white/60 text-sm">
                  {videoResumes.length} / {isPro ? "∞" : "2"} videos
                </span>
              </div>

              {videoResumes.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                  <Video className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60 mb-4">No video resumes yet</p>
                  <button
                    onClick={() => videoInputRef.current?.click()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Upload Your First Video
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {videoResumes.map((video) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative w-32 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl overflow-hidden shrink-0">
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-xs rounded">
                            {video.duration}
                          </span>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                            {video.name}
                            {video.isPrimary && (
                              <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                                Primary
                              </span>
                            )}
                          </h4>
                          <p className="text-white/60 text-sm mb-3">
                            Uploaded {video.createdAt} · {video.privacy}
                          </p>
                          <div className="flex items-center gap-2">
                            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                              <Play className="w-4 h-4" />
                              Play
                            </button>
                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                              <Settings className="w-4 h-4" />
                              Settings
                            </button>
                            <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Video Templates */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Video Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {videoTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer"
                  >
                    {!template.free && (
                      <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center gap-1">
                        <Crown className="w-3 h-3 text-white" />
                        <span className="text-xs font-bold text-white">PRO</span>
                      </div>
                    )}
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Video className="w-12 h-12 text-white/40" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white mb-1">{template.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">{template.duration}</span>
                        <button className="text-xs text-purple-400 font-semibold hover:underline">
                          Use Template
                        </button>
                      </div>
                    </div>
                  </div>
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
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Total Views", value: "1,247", icon: Eye, color: "blue" },
                { label: "Downloads", value: "342", icon: Download, color: "green" },
                { label: "Avg. ATS Score", value: "87%", icon: Target, color: "purple" },
                { label: "Profile Strength", value: "94%", icon: TrendingUp, color: "amber" },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color}-500/20`}
                      >
                        <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                      </div>
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                    </div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Charts Placeholder */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Views Over Time</h3>
              <div className="h-64 flex items-center justify-center text-white/40">
                <BarChart3 className="w-16 h-16" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl z-50"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-[#b87bd1]/30 border-t-[#b87bd1] animate-spin" />
              <div>
                <h4 className="font-bold text-white">
                  {activeTab === "ats" ? "Analyzing Resume..." : "Processing Video..."}
                </h4>
                <p className="text-white/60 text-sm">This may take a moment</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
