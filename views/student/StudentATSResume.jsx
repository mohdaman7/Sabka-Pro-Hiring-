"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  Edit3,
  Target,
  Copy,
  Crown,
  FileCheck,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Zap,
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
      name: "Creative",
      preview: "/templates/creative.jpg",
      score: 89,
      free: false,
    },
    {
      id: 4,
      name: "Executive",
      preview: "/templates/executive.jpg",
      score: 97,
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

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // In production, upload to S3 first, then send URL to backend
      const formData = new FormData();
      formData.append("file", file);
      
      // Simulated upload for now
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
        // Show suggestions modal or panel
      }
    } catch (error) {
      console.error("Get suggestions error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              ATS Resume Manager
            </h1>
            <p className="text-white/60 text-lg">
              Upload and optimize your resumes for Applicant Tracking Systems
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

        {/* Stats Card */}
        {!loading && resumes.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-white/60 text-sm mb-1">Total Resumes</div>
                <div className="text-3xl font-black text-white">
                  {resumes.length}
                  <span className="text-white/40 text-lg ml-2">
                    / {isPro ? "∞" : "3"}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-1">Total Views</div>
                <div className="text-3xl font-black text-white">
                  {resumes.reduce((sum, r) => sum + (r.views || 0), 0)}
                </div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-1">Downloads</div>
                <div className="text-3xl font-black text-white">
                  {resumes.reduce((sum, r) => sum + (r.downloads || 0), 0)}
                </div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-1">Avg. ATS Score</div>
                <div className="text-3xl font-black text-green-400">
                  {Math.round(
                    resumes.reduce((sum, r) => sum + (r.atsScore || 0), 0) /
                      resumes.length
                  )}
                  %
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resume List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">My Resumes</h2>
            {!isPro && (
              <div className="text-white/60 text-sm">
                {resumes.length} / 3 resumes
              </div>
            )}
          </div>

          {loading ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#b87bd1]/30 border-t-[#b87bd1] animate-spin mx-auto mb-4" />
              <p className="text-white/60">Loading resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
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
                  key={resume.id || resume._id}
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
                            Uploaded {new Date(resume.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        {/* ATS Score */}
                        <div className="text-right">
                          <div
                            className={`text-2xl font-black ${
                              resume.atsScore >= 80
                                ? "text-green-400"
                                : resume.atsScore >= 60
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                          >
                            {resume.atsScore || 0}%
                          </div>
                          <div className="text-white/60 text-xs">ATS Score</div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Eye className="w-4 h-4" />
                          {resume.views || 0} views
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Download className="w-4 h-4" />
                          {resume.downloads || 0} downloads
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button
                          onClick={() => handleDuplicate(resume.id || resume._id)}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4" />
                          Duplicate
                        </button>
                        {!resume.isPrimary && (
                          <button
                            onClick={() => handleSetPrimary(resume.id || resume._id)}
                            className="px-4 py-2 bg-[#b87bd1]/20 hover:bg-[#b87bd1]/30 text-[#b87bd1] rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Set Primary
                          </button>
                        )}
                        <button
                          onClick={() => handleViewSuggestions(resume.id || resume._id)}
                          className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                        >
                          <Zap className="w-4 h-4" />
                          Optimize
                        </button>
                        <button
                          onClick={() => handleDelete(resume.id || resume._id)}
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

        {/* ATS Templates */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">ATS-Optimized Templates</h2>
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
                    <span className="text-xs text-white/60">
                      Score: {template.score}%
                    </span>
                    <button className="text-xs text-[#b87bd1] font-semibold hover:underline">
                      Use Template
                    </button>
                  </div>
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
                <div className="w-12 h-12 rounded-full border-4 border-[#b87bd1]/30 border-t-[#b87bd1] animate-spin" />
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
    </div>
  );
}
