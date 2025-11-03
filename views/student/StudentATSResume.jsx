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

  // Simplified upload - backend handles everything
  const uploadResumeFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await resumeService.uploadResume(formData);
      return response;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOC, or DOCX file");
      return;
    }

    setUploading(true);
    setParsing(true);
    try {
      const response = await uploadResumeFile(file);
      
      if (response.success) {
        // Show success message
        console.log("✅ Resume uploaded successfully!", response.data);
        
        // Store the analysis data
        if (response.data.atsScore) {
          setAtsAnalysis({
            score: response.data.atsScore,
            keywords: response.data.keywords,
          });
        }
        if (response.data.suggestions) {
          setSuggestions(response.data.suggestions);
        }
        if (response.data.parsedData) {
          setParsedData(response.data.parsedData);
        }
        
        // Refresh the resumes list
        await fetchResumes();
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
      setParsing(false);
      setScoring(false);
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
                  <div className="flex items-center justify-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                    <Zap className="w-3.5 h-3.5" />
                    <span>FREE AI-Powered Analysis • No API Key Required</span>
                  </div>
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
          { icon: TrendingUp, label: "Avg ATS Score", value: resumes.length > 0 ? `${Math.round(resumes.reduce((acc, r) => acc + (r.atsScore || 0), 0) / resumes.length)}%` : "0%", color: "from-emerald-500/20 to-emerald-600/20", border: "border-emerald-500/30" },
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
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-dashed border-white/20">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#b87bd1]/20 blur-2xl rounded-full"></div>
                <FileText className="relative w-20 h-20 text-white/40" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Resumes Yet</h3>
              <p className="text-sm text-white/60 mb-6 max-w-md text-center">
                Upload your first resume to get instant ATS analysis, keyword optimization, and improvement suggestions
              </p>
              <button
                onClick={() => setShowUploadOptions(true)}
                className="group px-8 py-3.5 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-semibold rounded-xl shadow-lg hover:shadow-[#b87bd1]/50 transition-all flex items-center gap-2"
              >
                <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
                          {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : "Recently uploaded"}
                        </p>
                      </div>

                      {/* Keywords Preview */}
                      {resume.keywords && resume.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {resume.keywords.slice(0, 3).map((keyword, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-[#b87bd1]/20 border border-[#b87bd1]/30 rounded text-xs text-[#b87bd1] font-medium">
                              {keyword.word}
                            </span>
                          ))}
                          {resume.keywords.length > 3 && (
                            <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/60">
                              +{resume.keywords.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedResume(resume)}
                            className="p-2 text-white/60 hover:text-[#b87bd1] hover:bg-[#b87bd1]/20 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-white/60 hover:text-green-400 hover:bg-green-400/20 rounded-lg transition-all" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-400/20 rounded-lg transition-all" title="Duplicate">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all" title="Delete">
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
          <div className="space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Free ATS Analysis System</h2>
                  <p className="text-sm text-white/60">No API keys or paid services required</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <h3 className="font-semibold text-white">Smart Parsing</h3>
                  </div>
                  <p className="text-sm text-white/70">Automatic keyword extraction and content analysis</p>
                </div>
                
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-white">ATS Scoring</h3>
                  </div>
                  <p className="text-sm text-white/70">Instant compatibility score with detailed breakdown</p>
                </div>
                
                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">AI Suggestions</h3>
                  </div>
                  <p className="text-sm text-white/70">Actionable tips to improve your resume score</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-[#b87bd1]/10 border border-[#b87bd1]/20">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#b87bd1] mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">100% Free During Development</h4>
                    <p className="text-sm text-white/70">
                      This is a development version with simulated AI analysis. All features are completely free with no API keys required.
                      Perfect for testing and optimizing your resume!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resume Details Modal */}
      <AnimatePresence>
        {selectedResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedResume(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/20 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] p-6 border-b border-white/10 z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedResume.name}</h2>
                    <p className="text-white/70 text-sm">
                      Uploaded {selectedResume.createdAt ? new Date(selectedResume.createdAt).toLocaleDateString() : "recently"}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedResume(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-all"
                  >
                    <span className="text-white text-2xl">&times;</span>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* ATS Score Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <div className="relative rounded-xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                      <div className="text-center">
                        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="url(#gradient)"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${(selectedResume.atsScore || 0) * 3.51} 351`}
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#803791" />
                                <stop offset="100%" stopColor="#b87bd1" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-white">{selectedResume.atsScore || 0}</span>
                            <span className="text-sm text-white/60">ATS Score</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${getScoreColor(selectedResume.atsScore || 0).text.replace('text-', 'bg-')}`}></div>
                          <span className="text-white/80">
                            {selectedResume.atsScore >= 80 ? "Excellent" : selectedResume.atsScore >= 60 ? "Good" : "Needs Work"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    {/* Keywords */}
                    <div className="rounded-xl p-5 bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-[#b87bd1]" />
                        <h3 className="font-semibold text-white">Detected Keywords</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedResume.keywords && selectedResume.keywords.length > 0 ? (
                          selectedResume.keywords.map((keyword, idx) => (
                            <div key={idx} className="group relative">
                              <div className="px-3 py-1.5 bg-gradient-to-r from-[#803791]/20 to-[#b87bd1]/20 border border-[#b87bd1]/30 rounded-lg">
                                <span className="text-sm font-medium text-white">{keyword.word}</span>
                                <span className="ml-2 text-xs text-white/60">×{keyword.frequency}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-white/60">No keywords detected</p>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg p-4 bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-white/60">File Size</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {selectedResume.fileSize ? `${(selectedResume.fileSize / 1024).toFixed(1)} KB` : "N/A"}
                        </p>
                      </div>
                      <div className="rounded-lg p-4 bg-purple-500/10 border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-white/60">Keywords</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {selectedResume.keywords?.length || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                {selectedResume.suggestions && selectedResume.suggestions.length > 0 && (
                  <div className="rounded-xl p-5 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <h3 className="font-semibold text-white">Improvement Suggestions</h3>
                    </div>
                    <div className="space-y-3">
                      {selectedResume.suggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#b87bd1]/30 transition-all">
                          <div className={`mt-1 p-1.5 rounded-lg ${
                            suggestion.priority === 'high' ? 'bg-red-500/20 border border-red-500/30' :
                            suggestion.priority === 'medium' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                            'bg-blue-500/20 border border-blue-500/30'
                          }`}>
                            <AlertCircle className={`w-4 h-4 ${
                              suggestion.priority === 'high' ? 'text-red-400' :
                              suggestion.priority === 'medium' ? 'text-yellow-400' :
                              'text-blue-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-white/80 uppercase">{suggestion.category}</span>
                              {suggestion.impact && (
                                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                                  {suggestion.impact}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-white/80">{suggestion.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
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
            className="fixed bottom-6 right-6 bg-gradient-to-br from-[#803791] to-[#b87bd1] backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl z-50"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">
                  {parsing ? "Analyzing Resume..." : "Uploading..."}
                </h4>
                <p className="text-sm text-white/80">
                  {parsing ? "AI is extracting keywords & scoring" : "Processing your file"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
