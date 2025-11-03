"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileText, Download, Eye, Trash2, Target, Copy, Crown, CheckCircle2, 
  Sparkles, ChevronDown, BarChart3, TrendingUp, AlertCircle, Zap, Award, 
  Clock, RefreshCw, Lightbulb, FileCheck, Layout, PenTool, Star
} from "lucide-react";
import { resumeService } from "@/services/resumeService";

export default function StudentATSResume() {
  const [resumes, setResumes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [atsAnalysis, setAtsAnalysis] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [parsedData, setParsedData] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [activeTab, setActiveTab] = useState("resumes");

  // ATS Templates with sources
  const atsTemplates = [
    { id: 1, name: "Professional ATS", source: "Canva", score: 98, free: true, type: "classic" },
    { id: 2, name: "Modern Tech", source: "Novoresume", score: 96, free: true, type: "modern" },
    { id: 3, name: "Executive Pro", source: "FlowCV", score: 97, free: false, type: "executive" },
    { id: 4, name: "Minimal Clean", source: "JSONResume", score: 95, free: true, type: "minimal" },
    { id: 5, name: "Creative Bold", source: "Canva", score: 92, free: false, type: "creative" },
    { id: 6, name: "Corporate Elite", source: "Novoresume", score: 94, free: false, type: "corporate" },
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

  // Resume Parsing with Affinda API
  const parseResumeWithAffinda = async (file) => {
    try {
      setParsing(true);
      const formData = new FormData();
      formData.append("file", file);
      
      // API call to Affinda
      const response = await fetch("/api/resume/parse/affinda", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      setParsedData(data.parsed);
      return data.parsed;
    } catch (error) {
      console.error("Affinda parsing error:", error);
      // Fallback to RChilli
      return await parseResumeWithRChilli(file);
    } finally {
      setParsing(false);
    }
  };

  // Fallback: RChilli Parser
  const parseResumeWithRChilli = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch("/api/resume/parse/rchilli", {
        method: "POST",
        body: formData,
      });
      
      return await response.json();
    } catch (error) {
      console.error("RChilli parsing error:", error);
      return null;
    }
  };

  // ATS Scoring with Jobscan
  const scoreResumeWithJobscan = async (resumeId, jobDescription = "") => {
    try {
      setScoring(true);
      const response = await fetch("/api/resume/score/jobscan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId, jobDescription }),
      });
      
      const data = await response.json();
      setAtsAnalysis(data.analysis);
      return data.analysis;
    } catch (error) {
      console.error("Jobscan scoring error:", error);
      // Fallback to ResumeWorded
      return await scoreResumeWithResumeWorded(resumeId);
    } finally {
      setScoring(false);
    }
  };

  // Fallback: ResumeWorded Scoring
  const scoreResumeWithResumeWorded = async (resumeId) => {
    try {
      const response = await fetch("/api/resume/score/resumeworded", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      });
      
      return await response.json();
    } catch (error) {
      console.error("ResumeWorded scoring error:", error);
      return null;
    }
  };

  // Get Improvement Suggestions
  const getImprovementSuggestions = async (resumeId) => {
    try {
      const response = await fetch("/api/resume/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      });
      
      const data = await response.json();
      setSuggestions(data.suggestions);
      return data.suggestions;
    } catch (error) {
      console.error("Suggestions error:", error);
      return [];
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Step 1: Parse resume
      const parsedData = await parseResumeWithAffinda(file);
      
      // Step 2: Upload to backend
      const formData = new FormData();
      formData.append("file", file);
      formData.append("parsedData", JSON.stringify(parsedData));
      
      const response = await resumeService.uploadResume(formData);
      
      if (response.success) {
        // Step 3: Score the resume
        await scoreResumeWithJobscan(response.data.id);
        
        // Step 4: Get suggestions
        await getImprovementSuggestions(response.data.id);
        
        await fetchResumes();
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      setShowUploadOptions(false);
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

  const getScoreColor = (score) => {
    if (score >= 80) return { bg: "from-green-500/20 to-green-600/20", border: "border-green-500/30", text: "text-green-400" };
    if (score >= 60) return { bg: "from-yellow-500/20 to-yellow-600/20", border: "border-yellow-500/30", text: "text-yellow-400" };
    return { bg: "from-red-500/20 to-red-600/20", border: "border-red-500/30", text: "text-red-400" };
  };

  return (
    <div className="relative min-h-screen p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: "rgba(128,55,145,0.12)" }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: "rgba(184,123,209,0.10)" }} />
      </div>

      {/* Header */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#803791] to-[#6a2a6f] border border-[#b87bd1]/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#b87bd1]/5 to-transparent opacity-50" />
        <div className="relative p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg bg-white/10 border border-white/20">
                  <FileCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">ATS Resume Manager</h1>
                  <p className="text-white/70 text-sm sm:text-base">AI-powered resume optimization & tracking</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowUploadOptions(!showUploadOptions)}
                className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold transition-all"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Upload Resume</span>
                <span className="sm:hidden">Upload</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white text-[#803791] font-semibold hover:shadow-lg transition-all">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Create New</span>
                <span className="sm:hidden">Create</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowUploadOptions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Upload Resume</h3>
              <div
                className={`relative p-8 sm:p-12 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  isDragging ? "border-[#b87bd1] bg-[#b87bd1]/10" : "border-white/30 hover:border-white/50 hover:bg-white/5"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center text-center">
                  <Upload className="w-16 h-16 text-white/60 mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {isDragging ? "Drop your resume here" : "Click or drag & drop"}
                  </h4>
                  <p className="text-sm text-white/60 mb-4">PDF, DOCX up to 10MB</p>
                  <p className="text-xs text-white/50">
                    We'll automatically parse and score your resume with AI
                  </p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: FileText, label: "Total Resumes", value: resumes.length, color: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/30" },
          { icon: TrendingUp, label: "Avg ATS Score", value: "84%", color: "from-emerald-500/20 to-emerald-600/20", border: "border-emerald-500/30" },
          { icon: Eye, label: "Total Views", value: "342", color: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30" },
          { icon: Download, label: "Downloads", value: "127", color: "from-orange-500/20 to-orange-600/20", border: "border-orange-500/30" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`relative rounded-xl p-4 sm:p-5 bg-gradient-to-br ${stat.color} border ${stat.border} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs sm:text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        {["resumes", "templates", "analysis"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === tab
                ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Resumes Tab */}
      {activeTab === "resumes" && (
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 border-4 border-[#b87bd1]/30 border-t-[#b87bd1] rounded-full animate-spin mb-4"></div>
              <p className="text-white/70">Loading resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-white/5 border border-dashed border-white/20">
              <FileText className="w-16 h-16 text-white/30 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Resumes Yet</h3>
              <p className="text-sm text-white/60 mb-4">Upload your first resume to get started</p>
              <button
                onClick={() => setShowUploadOptions(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-semibold rounded-xl"
              >
                Upload Resume
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {resumes.map((resume) => {
                const scoreColors = getScoreColor(resume.atsScore || 0);
                return (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#b87bd1]/50 hover:shadow-xl transition-all"
                  >
                    {resume.isPrimary && (
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-[#b87bd1] px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        <span className="text-xs font-bold text-white">Primary</span>
                      </div>
                    )}
                    
                    {/* Score Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className={`flex items-center gap-1.5 bg-gradient-to-r ${scoreColors.bg} border ${scoreColors.border} px-2.5 py-1 rounded-full`}>
                        <div className={`w-2 h-2 rounded-full ${scoreColors.text.replace("text-", "bg-")}`}></div>
                        <span className={`text-xs font-bold ${scoreColors.text}`}>{resume.atsScore || 0}%</span>
                      </div>
                    </div>

                    <div className="h-40 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center relative">
                      <FileText className="w-16 h-16 text-white/30" />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#803791] to-[#b87bd1]"></div>
                    </div>

                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="font-semibold text-white truncate">{resume.name}</h3>
                        <p className="text-xs text-white/60 mt-1">
                          {resume.date ? new Date(resume.date).toLocaleDateString() : "Recently uploaded"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-white/60 hover:text-[#b87bd1] hover:bg-[#b87bd1]/20 rounded-lg transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-white/60 hover:text-green-400 hover:bg-green-400/20 rounded-lg transition-all">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-400/20 rounded-lg transition-all">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">ATS-Optimized Templates</h2>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Award className="w-4 h-4" />
              <span>98% ATS Compatibility</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {atsTemplates.map((template) => (
              <div key={template.id} className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#b87bd1]/50 hover:shadow-xl transition-all">
                {!template.free && (
                  <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-1 rounded-full">
                    <Crown className="w-3 h-3 text-white" />
                    <span className="text-xs font-bold text-white">PRO</span>
                  </div>
                )}
                
                <div className="h-48 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center relative">
                  <div className="w-3/4 h-3/4 bg-white/5 rounded-sm border border-white/10 flex items-center justify-center">
                    <Layout className="w-12 h-12 text-white/30" />
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                    <span className="text-xs font-bold text-green-400">{template.score}% ATS</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{template.name}</h3>
                      <p className="text-xs text-white/60 mt-0.5">by {template.source}</p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:shadow-lg text-white font-semibold rounded-lg transition-all">
                    {template.free ? "Use Template" : "Upgrade to Access"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === "analysis" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-6">ATS Analysis & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white/60 uppercase">Parsing APIs</h3>
                <div className="space-y-2">
                  {["Affinda (Primary)", "RChilli (Fallback)", "Sovren"].map((api, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-white">{api}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white/60 uppercase">Scoring APIs</h3>
                <div className="space-y-2">
                  {["Jobscan (Primary)", "ResumeWorded", "VMock"].map((api, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-white">{api}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <div className="w-12 h-12 border-4 border-[#b87bd1]/30 border-t-[#b87bd1] rounded-full animate-spin" />
              <div>
                <h4 className="font-bold text-white">
                  {parsing ? "Parsing Resume..." : scoring ? "Scoring ATS..." : "Uploading..."}
                </h4>
                <p className="text-sm text-white/60">
                  {parsing ? "Extracting data with AI" : scoring ? "Calculating compatibility" : "Processing file"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
