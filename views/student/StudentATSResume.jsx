"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  Target,
  Copy,
  Crown,
  CheckCircle2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { resumeService } from "@/services/resumeService";

export default function StudentATSResume() {
  const [resumes, setResumes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResumes([
        {
          id: 1,
          name: "My Resume.pdf",
          date: "2023-10-15",
          atsScore: 85,
          isPrimary: true,
          views: 24,
          downloads: 8,
        },
        {
          id: 2,
          name: "Updated Resume.pdf",
          date: "2023-11-01",
          atsScore: 92,
          isPrimary: false,
          views: 15,
          downloads: 5,
        },
      ]);
      setIsPro(true);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const atsTemplates = [
    {
      id: 1,
      name: "Professional",
      preview: "/templates/professional.jpg",
      score: 95,
      free: true,
    },
    {
      id: 2,
      name: "Modern",
      preview: "/templates/modern.jpg",
      score: 92,
      free: true,
    },
    {
      id: 3,
      name: "Executive",
      preview: "/templates/executive.jpg",
      score: 94,
      free: false,
    },
    {
      id: 4,
      name: "Minimal",
      preview: "/templates/minimal.jpg",
      score: 89,
      free: true,
    },
    {
      id: 5,
      name: "Creative",
      preview: "/templates/creative.jpg",
      score: 89,
      free: false,
    },
  ];

  useEffect(() => {
    fetchResumes();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsPro(user?.isPro || false);
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await resumeService.getMyResumes();
      if (response.success) {
        setResumes(response.data);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
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
      handleFileUpload({ target: { files } });
    }
  };

  const handleFileChange = (e) => {
    handleFileUpload(e);
    setShowUploadOptions(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      setTimeout(async () => {
        try {
          const response = await resumeService.uploadResume({
            name: file.name,
            fileUrl: "/temp/" + file.name,
            fileName: file.name,
            fileSize: file.size,
          });

          if (response.success) {
            await fetchResumes();
          }
        } catch (error) {
          console.error("Upload error:", error);
        } finally {
          setUploading(false);
        }
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const response = await resumeService.duplicateResume(id);
      if (response.success) {
        await fetchResumes();
      }
    } catch (error) {
      console.error("Duplicate error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      const response = await resumeService.deleteResume(id);
      if (response.success) {
        await fetchResumes();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSetPrimary = async (id) => {
    try {
      const response = await resumeService.setPrimaryResume(id);
      if (response.success) {
        await fetchResumes();
      }
    } catch (error) {
      console.error("Set primary error:", error);
    }
  };

  const handleViewSuggestions = async (id) => {
    try {
      const response = await resumeService.getATSSuggestions(id);
      if (response.success) {
        setSelectedResume(response.data);
      }
    } catch (error) {
      console.error("Get suggestions error:", error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
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
    <div className="relative p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8 min-h-screen overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse"
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
          <h1 className="text-lg sm:text-xl md:text-2xl md:text-3xl font-bold text-white mb-2">
            ATS Resume Manager
          </h1>
          <p className="text-white/60 text-sm">
            Upload, optimize, and track your resumes
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <button
              onClick={() => setShowUploadOptions(!showUploadOptions)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Resume</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showUploadOptions ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Upload Options Dropdown */}
            {showUploadOptions && (
              <div className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-10 animate-fadeIn">
                <div
                  className={`p-4 border-b border-white/10 ${
                    isDragging ? "bg-[#b87bd1]/20" : "bg-transparent"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:bg-[#b87bd1]/10 transition-colors">
                    <Upload className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/60 mb-2" />
                    <p className="text-sm text-center text-white/80">
                      {isDragging
                        ? "Drop your file here"
                        : "Click or drag & drop PDF file"}
                    </p>
                    <p className="text-xs text-white/60 mt-1">Max. 5MB</p>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />
                </div>
                <div className="p-2 bg-white/5 text-center">
                  <p className="text-xs text-white/60">
                    Supports: PDF (Max 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowBuilder(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create New</span>
          </button>
        </div>
      </div>

      {/* Resume List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-sm">
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-[#b87bd1]/30 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#b87bd1] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-white/80 font-medium">
              Loading your resumes...
            </p>
            <p className="text-sm text-white/60 mt-1">This may take a moment</p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 text-center bg-white/5 rounded-2xl border border-dashed border-white/20">
            <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white/40 mb-3" />
            <h3 className="text-lg font-medium text-white/90">
              No Resumes Yet
            </h3>
            <p className="text-white/70 text-sm mt-1 mb-4 max-w-md">
              Upload your first resume to get started with ATS optimization and
              tracking.
            </p>
            <button
              onClick={() => setShowUploadOptions(true)}
              className="px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((resume) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  resume.isPrimary
                    ? "ring-2 ring-[#b87bd1] ring-offset-2 ring-offset-slate-950"
                    : ""
                }`}
              >
                {resume.isPrimary && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex items-center gap-1.5 bg-[#b87bd1] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Primary</span>
                    </div>
                  </div>
                )}

                {/* Score Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <div
                    className={`flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${
                      getScoreColor(resume.atsScore).includes("green")
                        ? "text-green-400"
                        : getScoreColor(resume.atsScore).includes("yellow")
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        getScoreColor(resume.atsScore).includes("green")
                          ? "bg-green-500"
                          : getScoreColor(resume.atsScore).includes("yellow")
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span>ATS Score: {resume.atsScore}/100</span>
                  </div>
                </div>

                {/* Document Preview */}
                <div className="relative h-40 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
                  <FileText className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white/30" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#803791] to-[#b87bd1]"></div>
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#803791]/20 to-[#b87bd1]/20 flex items-center justify-center shadow-inner">
                        <FileText className="w-5 h-5 text-[#b87bd1]" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white truncate">
                        {resume.name}
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        Uploaded {formatDate(resume.date)}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-3 text-xs text-white/60">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{resume.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" />
                          <span>{resume.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleViewSuggestions(resume.id)}
                        className="p-1.5 text-white/60 hover:text-[#b87bd1] hover:bg-[#b87bd1]/20 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-white/60 hover:text-green-400 hover:bg-green-400/20 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(resume.id)}
                        className="p-1.5 text-white/60 hover:text-purple-400 hover:bg-purple-400/20 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSetPrimary(resume.id)}
                        className="p-1.5 text-white/60 hover:text-amber-400 hover:bg-amber-400/20 rounded-lg transition-colors"
                        title="Set as Primary"
                      >
                        <Target
                          className={`w-4 h-4 ${
                            resume.isPrimary
                              ? "fill-amber-400 text-amber-400"
                              : ""
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(resume.id)}
                        className="p-1.5 text-white/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                        title="Delete Resume"
                      >
                        <Trash2 className="w-4 h-4" />
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
      <div className="mt-12">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6">
          ATS-Optimized Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {atsTemplates.map((template) => (
            <div
              key={template.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {!template.free && (
                <div className="absolute top-2 right-2">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    <span>PRO</span>
                  </div>
                </div>
              )}

              <div className="h-40 bg-white/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 bg-white/5 shadow-inner rounded-sm border border-white/10 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-white/30" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-white">{template.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-white/60">
                        {template.score}% ATS Score
                      </span>
                    </div>
                  </div>
                  <button className="p-1.5 text-white/60 hover:text-[#b87bd1] hover:bg-[#b87bd1]/20 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <button className="w-full mt-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                  {template.free ? "Use Template" : "Upgrade to Pro"}
                </button>
              </div>
            </div>
          ))}
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-[#b87bd1]/30 border-t-[#b87bd1] animate-spin" />
              <div>
                <h4 className="font-bold text-white">Analyzing Resume...</h4>
                <p className="text-white/60 text-sm">
                  Extracting keywords and calculating ATS score
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
