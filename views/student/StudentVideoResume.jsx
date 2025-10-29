"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Video,
  Play,
  Trash2,
  Settings,
  Crown,
  Shield,
  Scissors,
  Eye,
  Share2,
  Clock,
  AlertCircle,
  Sparkles,
  Camera,
  FileVideo,
} from "lucide-react";
import { resumeService } from "@/services/resumeService";

export default function StudentVideoResume() {
  const [videoResumes, setVideoResumes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [showVideoEditor, setShowVideoEditor] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoInputRef = useRef(null);

  const videoTemplates = [
    { id: 1, name: "Introduction", duration: "30s", free: true },
    { id: 2, name: "Elevator Pitch", duration: "60s", free: true },
    { id: 3, name: "Project Showcase", duration: "90s", free: false },
    { id: 4, name: "Full Profile", duration: "120s", free: false },
  ];

  const tips = [
    {
      icon: Clock,
      title: "Keep it concise",
      description: "Aim for 60-90 seconds. Employers appreciate brevity.",
    },
    {
      icon: Camera,
      title: "Good lighting matters",
      description: "Face a window or use soft lighting for professional look.",
    },
    {
      icon: FileVideo,
      title: "Practice makes perfect",
      description: "Rehearse your script before recording to sound natural.",
    },
  ];

  useEffect(() => {
    fetchVideoResumes();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsPro(user?.isPro || false);
  }, []);

  const fetchVideoResumes = async () => {
    try {
      setLoading(true);
      const response = await resumeService.getMyVideoResumes();
      if (response.success) {
        setVideoResumes(response.data);
      }
    } catch (error) {
      console.error("Error fetching video resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // In production, upload to cloud storage first
      setTimeout(async () => {
        try {
          const response = await resumeService.uploadVideoResume({
            name: file.name,
            videoUrl: "/temp/" + file.name,
            thumbnailUrl: "/placeholder-video.jpg",
            duration: 0, // Will be calculated
            fileSize: file.size,
          });

          if (response.success) {
            await fetchVideoResumes();
          }
        } catch (error) {
          console.error("Upload error:", error);
        } finally {
          setUploading(false);
        }
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const response = await resumeService.deleteVideoResume(id);
      if (response.success) {
        await fetchVideoResumes();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSetPrimary = async (id) => {
    try {
      const response = await resumeService.setPrimaryVideo(id);
      if (response.success) {
        await fetchVideoResumes();
      }
    } catch (error) {
      console.error("Set primary error:", error);
    }
  };

  const handleUpdateSettings = async (id, settings) => {
    try {
      const response = await resumeService.updateVideoResume(id, settings);
      if (response.success) {
        await fetchVideoResumes();
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Video Resume Manager
            </h1>
            <p className="text-white/60 text-lg">
              Create professional video introductions to stand out
            </p>
          </div>
          {!isPro && (
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all hover:scale-105">
              <Crown className="w-5 h-5" />
              Upgrade to Pro
            </button>
          )}
        </div>

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

        {/* Stats Card */}
        {!loading && videoResumes.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-white/60 text-sm mb-1">Total Videos</div>
                <div className="text-3xl font-black text-white">
                  {videoResumes.length}
                  <span className="text-white/40 text-lg ml-2">
                    / {isPro ? "∞" : "2"}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-1">Total Views</div>
                <div className="text-3xl font-black text-white">
                  {videoResumes.reduce((sum, v) => sum + (v.views || 0), 0)}
                </div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-1">Unique Viewers</div>
                <div className="text-3xl font-black text-white">
                  {videoResumes.reduce(
                    (sum, v) => sum + (v.uniqueViews?.length || 0),
                    0
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">My Video Resumes</h2>

          {loading ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#b87bd1]/30 border-t-[#b87bd1] animate-spin mx-auto mb-4" />
              <p className="text-white/60">Loading videos...</p>
            </div>
          ) : videoResumes.length === 0 ? (
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
                  key={video.id || video._id}
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
                        {video.formattedDuration || video.duration}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                            {video.name}
                            {video.isPrimary && (
                              <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                                Primary
                              </span>
                            )}
                          </h4>
                          <p className="text-white/60 text-sm">
                            Uploaded {new Date(video.createdAt).toLocaleDateString()} ·{" "}
                            {video.privacy}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Eye className="w-4 h-4" />
                          {video.views || 0} views
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap mt-4">
                        <button
                          onClick={() => setSelectedVideo(video)}
                          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Play
                        </button>
                        <button
                          onClick={() => {
                            /* Open settings modal */
                          }}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        {!video.isPrimary && (
                          <button
                            onClick={() => handleSetPrimary(video.id || video._id)}
                            className="px-4 py-2 bg-[#b87bd1]/20 hover:bg-[#b87bd1]/30 text-[#b87bd1] rounded-lg text-sm font-semibold transition-all"
                          >
                            Set Primary
                          </button>
                        )}
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                        <button
                          onClick={() => handleDelete(video.id || video._id)}
                          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                        >
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
          <h2 className="text-2xl font-bold text-white">Video Templates</h2>
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

        {/* Pro Tips */}
        <div className="bg-gradient-to-br from-[#803791]/20 to-[#b87bd1]/10 border border-[#b87bd1]/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#b87bd1]/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#b87bd1]" />
            </div>
            <h3 className="text-xl font-bold text-white">Pro Tips for Video Resumes</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {tips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div
                  key={index}
                  className="p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{tip.title}</h4>
                      <p className="text-sm text-white/80">{tip.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
              <p className="text-sm text-white/90">
                <strong>Remember:</strong> Your video resume complements your traditional
                resume. Highlight your unique personality and enthusiasm for the role.
              </p>
            </div>
          </div>
        </div>

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
                <div className="w-12 h-12 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
                <div>
                  <h4 className="font-bold text-white">Processing Video...</h4>
                  <p className="text-white/60 text-sm">
                    Generating thumbnail and optimizing
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
