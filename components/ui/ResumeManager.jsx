"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  Star,
  Copy,
  Eye,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Edit2,
} from "lucide-react";
import { studentService } from "@/services/studentService";
import { customToast } from "@/components/ui/toast";
import { getFileUrl } from "@/lib/fileUrl";

export default function ResumeManager({ onResumeSelect }) {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeName, setResumeName] = useState("");

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);
      const response = await studentService.getMyResumes();
      setResumes(response.data || []);
    } catch (error) {
      customToast.error("Failed to load resumes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        customToast.error("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setResumeName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      customToast.error("Please select a file");
      return;
    }

    try {
      setUploading(true);
      await studentService.uploadNewResume(selectedFile, resumeName);
      customToast.success("Resume uploaded successfully!");
      setShowUploadModal(false);
      setSelectedFile(null);
      setResumeName("");
      loadResumes();
    } catch (error) {
      customToast.error(error.response?.data?.message || "Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  const handleSetPrimary = async (id) => {
    try {
      await studentService.setPrimaryResume(id);
      customToast.success("Primary resume updated");
      loadResumes();
    } catch (error) {
      customToast.error("Failed to set primary resume");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      await studentService.deleteResume(id);
      customToast.success("Resume deleted successfully");
      loadResumes();
    } catch (error) {
      customToast.error("Failed to delete resume");
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await studentService.duplicateResume(id);
      customToast.success("Resume duplicated successfully");
      loadResumes();
    } catch (error) {
      customToast.error("Failed to duplicate resume");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30";
    if (score >= 60) return "text-amber-400 bg-amber-500/20 border-amber-500/30";
    return "text-red-400 bg-red-500/20 border-red-500/30";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">My Resumes</h3>
          <p className="text-sm text-white/60">
            {resumes.length} resume{resumes.length !== 1 ? "s" : ""} uploaded
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          Upload New
        </button>
      </div>

      {/* Resume List */}
      {resumes.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
          <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <p className="text-white/60 mb-4">No resumes uploaded yet</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Upload Your First Resume
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all"
            >
              {/* Primary Badge */}
              {resume.isPrimary && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
                    <Star className="w-3 h-3 fill-amber-300" />
                    Primary
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-white mb-1 truncate">
                    {resume.name}
                  </h4>
                  <p className="text-sm text-white/60 mb-2">
                    {resume.fileName} • {(resume.fileSize / 1024).toFixed(0)} KB
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {resume.views || 0} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {resume.downloads || 0} downloads
                    </span>
                    {resume.appliedJobs && resume.appliedJobs.length > 0 && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {resume.appliedJobs.length} applications
                      </span>
                    )}
                  </div>

                  {/* ATS Score */}
                  {resume.atsScore > 0 && (
                    <div className="mt-3">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold border ${getScoreColor(
                          resume.atsScore
                        )}`}
                      >
                        ATS Score: {resume.atsScore}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {!resume.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(resume._id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Set as primary"
                    >
                      <Star className="w-4 h-4 text-white/70 hover:text-amber-400" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDuplicate(resume._id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4 text-white/70 hover:text-blue-400" />
                  </button>
                  <a
                    href={getFileUrl(resume.fileUrl)}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-white/70 hover:text-green-400" />
                  </a>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-white/70 hover:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Select Button (if onResumeSelect is provided) */}
              {onResumeSelect && (
                <button
                  onClick={() => onResumeSelect(resume)}
                  className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Select This Resume
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Upload Resume</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setResumeName("");
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            <div className="space-y-4">
              {/* File Input */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:font-semibold hover:file:bg-purple-700 transition-colors"
                />
                <p className="text-xs text-white/60 mt-2">
                  Supported formats: PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>

              {/* Resume Name */}
              {selectedFile && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Resume Name
                  </label>
                  <input
                    type="text"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    placeholder="e.g., Software Engineer Resume"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Resume
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
