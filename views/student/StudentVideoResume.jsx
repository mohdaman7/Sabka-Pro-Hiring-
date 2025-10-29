"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Video,
  Play,
  Trash2,
  Eye,
  Share2,
  Clock,
  Sparkles,
  Camera,
  FileVideo,
  ChevronDown,
  CheckCircle2,
  Target,
  Scissors,
  Crown,
} from "lucide-react";
import { resumeService } from "@/services/resumeService";

export default function StudentVideoResume() {
  const [videoResumes, setVideoResumes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [showVideoEditor, setShowVideoEditor] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const videoInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoResumes([
        {
          id: 1,
          name: "My Video Resume",
          date: "2023-10-15",
          duration: "1:25",
          isPrimary: true,
          views: 42,
          thumbnail: "/video-thumbnail-1.jpg",
          status: "processed",
          atsScore: 88,
        },
        {
          id: 2,
          name: "Updated Video Resume",
          date: "2023-11-01",
          duration: "2:10",
          isPrimary: false,
          views: 18,
          thumbnail: "/video-thumbnail-2.jpg",
          status: "processing",
          atsScore: 0,
        },
      ]);
      setIsPro(true);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const videoTemplates = [
    {
      id: 1,
      name: "Introduction",
      duration: "30s",
      free: true,
      description: "Quick introduction to make a strong first impression",
    },
    {
      id: 2,
      name: "Elevator Pitch",
      duration: "60s",
      free: true,
      description: "Perfect for networking and job applications",
    },
    {
      id: 3,
      name: "Project Showcase",
      duration: "90s",
      free: false,
      description: "Highlight your best work and achievements",
    },
    {
      id: 4,
      name: "Full Profile",
      duration: "120s",
      free: false,
      description: "Comprehensive professional profile with work history",
    },
    {
      id: 5,
      name: "Technical Skills",
      duration: "75s",
      free: true,
      description: "Showcase your technical expertise and certifications",
    },
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
      setTimeout(async () => {
        try {
          const response = await resumeService.uploadVideoResume({
            name: file.name,
            videoUrl: "/temp/" + file.name,
            thumbnailUrl: "/placeholder-video.jpg",
            duration: 0,
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleVideoUpload({ target: { files } });
    }
  };

  const handleFileChange = (e) => {
    handleVideoUpload(e);
    setShowUploadOptions(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative p-4 md:p-6 lg:p-8 space-y-8 min-h-screen overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: "rgba(128,55,145,0.12)",
            animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse"
          style={{
            background: "rgba(184,123,209,0.08)",
            animation: "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-2xl"
          style={{
            background: "rgba(240,194,238,0.04)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_40%)]" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Video Resume Studio
          </h1>
          <p className="text-white/60 text-sm">
            Showcase your personality and skills with professional video resumes
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <button
              onClick={() => setShowUploadOptions(!showUploadOptions)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Video</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showUploadOptions ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Upload Options Dropdown */}
            {showUploadOptions && (
              <div className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-10 animate-fadeIn">
                <div
                  className={`p-4 border-b border-white/10 ${
                    isDragging ? "bg-[#b87bd1]/20" : "bg-transparent"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => videoInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:bg-[#b87bd1]/10 transition-colors">
                    <Upload className="w-8 h-8 text-white/60 mb-2" />
                    <p className="text-sm text-center text-white/80">
                      {isDragging
                        ? "Drop your video here"
                        : "Click or drag & drop video file"}
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      MP4, Max. 100MB
                    </p>
                  </div>
                  <input
                    type="file"
                    ref={videoInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                  />
                </div>
                <div className="p-2 bg-white/5 text-center">
                  <p className="text-xs text-white/60">
                    Supports: MP4, WebM (Max 100MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowVideoEditor(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create New</span>
          </button>
        </div>
      </div>

      {/* Empty state for templates */}
      {!loading && videoResumes.length === 0 && (
        <div className="mt-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#803791]/20 mb-4">
            <Video className="w-8 h-8 text-[#b87bd1]" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No Video Resumes Yet
          </h3>
          <p className="text-white/70 mb-6">
            Create your first video resume to make a lasting impression on
            employers. Showcase your personality and stand out from the crowd.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowUploadOptions(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Video
            </button>
            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Try a Template
            </button>
          </div>
        </div>
      )}

      {/* Video List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-96 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-sm">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#b87bd1]/30 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#b87bd1] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-white/80 font-medium">
            Loading your video resumes...
          </p>
          <p className="text-sm text-white/60 mt-1">This may take a moment</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {videoResumes.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${
                video.isPrimary
                  ? "ring-2 ring-[#b87bd1] ring-offset-2 ring-offset-slate-950"
                  : ""
              }`}
            >
              {video.isPrimary && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="flex items-center gap-1.5 bg-[#b87bd1] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Primary</span>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              {video.status === "processing" && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="flex items-center gap-1.5 bg-blue-500/20 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>Processing</span>
                  </div>
                </div>
              )}

              {/* Video Thumbnail */}
              <div className="relative h-40 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
                <Video className="w-16 h-16 text-white/30" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-[#b87bd1] shadow-lg transform transition-transform group-hover:scale-110">
                    <Play className="w-5 h-5 ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded-tl-lg">
                  {video.duration}
                </div>
              </div>

              {/* Video Details */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#803791]/20 to-[#b87bd1]/20 flex items-center justify-center shadow-inner">
                      <Video className="w-5 h-5 text-[#b87bd1]" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate">
                      {video.name}
                    </h3>
                    <p className="text-xs text-white/60 mt-0.5">
                      Uploaded {formatDate(video.date)}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-white/60">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{video.views} views</span>
                      </div>
                      {video.atsScore > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>ATS: {video.atsScore}/100</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button className="p-1.5 text-white/60 hover:text-[#b87bd1] hover:bg-[#b87bd1]/20 rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-white/60 hover:text-green-400 hover:bg-green-400/20 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-white/60 hover:text-purple-400 hover:bg-purple-400/20 rounded-lg transition-colors">
                    <Scissors className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetPrimary(video.id)}
                    className="p-1.5 text-white/60 hover:text-amber-400 hover:bg-amber-400/20 rounded-lg transition-colors"
                    title="Set as Primary"
                  >
                    <Target
                      className={`w-4 h-4 ${
                        video.isPrimary ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="p-1.5 text-white/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                    title="Delete Video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Video Templates */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Video Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videoTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Template Thumbnail */}
              <div className="h-40 bg-white/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 bg-white/5 shadow-inner rounded-sm border border-white/10 flex items-center justify-center">
                    <Video className="w-10 h-10 text-white/30" />
                  </div>
                </div>
                {!template.free && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>PRO</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Template Details */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-white">{template.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5 text-white/60" />
                      <span className="text-xs text-white/60">
                        {template.duration}
                      </span>
                    </div>
                  </div>
                  <button className="p-1.5 text-white/60 hover:text-[#b87bd1] hover:bg-[#b87bd1]/20 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-white/70 mt-2">
                  {template.description}
                </p>
                <button className="w-full mt-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                  {template.free ? "Use Template" : "Upgrade to Pro"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          Tips for Great Video Resumes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#803791]/20 flex items-center justify-center">
                  <tip.icon className="w-5 h-5 text-[#b87bd1]" />
                </div>
                <h3 className="font-semibold text-white">{tip.title}</h3>
              </div>
              <p className="text-white/70 text-sm">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
