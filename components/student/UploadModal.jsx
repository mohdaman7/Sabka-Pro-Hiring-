"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  FileText,
  Video,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
  isLoading,
  type = "resume",
  maxSize = 10,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const fileInput = useRef(null);

  const acceptTypes = type === "resume" ? ".pdf,.doc,.docx" : "video/*";
  const displayTypes = type === "resume" ? "PDF, DOCX" : "MP4, WebM";
  const maxSizeText = type === "resume" ? "10MB" : "100MB";

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setError(null);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file) => {
    // Check size
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    // Check type
    if (type === "resume") {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a PDF, DOC, or DOCX file");
        return false;
      }
    } else {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }
    }

    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    await onUpload(file);
    setFile(null);
    setError(null);
    onClose();
  };

  const handleClose = () => {
    setFile(null);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#803791] via-[#b87bd1] to-transparent" />

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Content */}
            <div className="p-6 sm:p-8 md:p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center">
                    {type === "resume" ? (
                      <FileText className="w-5 h-5 text-white" />
                    ) : (
                      <Video className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Upload {type === "resume" ? "Resume" : "Video"}
                    </h2>
                    <p className="text-sm text-white/60">
                      {type === "resume"
                        ? "Submit your resume for ATS analysis"
                        : "Showcase your personality with a professional video"}
                    </p>
                  </div>
                </div>
              </div>

              {/* File Display */}
              {file ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      </motion.div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-white/60 mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Drag & Drop Area */}
                  <motion.div
                    whileHover={{ scale: isDragging ? 1.02 : 1 }}
                    className={`relative p-8 sm:p-12 md:p-16 border-2 border-dashed rounded-2xl transition-all mb-6 cursor-pointer ${
                      isDragging
                        ? "border-[#b87bd1] bg-[#b87bd1]/10"
                        : "border-white/30 hover:border-white/50 hover:bg-white/5"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInput.current?.click()}
                  >
                    {/* Animated Icons */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="mb-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-full filter blur-2xl opacity-20 animate-pulse" />
                        <Upload className="relative w-16 h-16 text-white/60" />
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2">
                        {isDragging
                          ? "Drop your file here"
                          : "Click or drag & drop"}
                      </h3>
                      <p className="text-sm text-white/60 mb-4">
                        {displayTypes} up to {maxSizeText}
                      </p>

                      {/* Feature Badges */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full"
                        >
                          <Zap className="w-3 h-3 text-green-400" />
                          <span className="text-xs font-medium text-green-400">
                            Instant Analysis
                          </span>
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full"
                        >
                          <CheckCircle2 className="w-3 h-3 text-blue-400" />
                          <span className="text-xs font-medium text-blue-400">
                            No API Key
                          </span>
                        </motion.span>
                      </div>
                    </motion.div>

                    <input
                      ref={fileInput}
                      type="file"
                      onChange={handleFileSelect}
                      accept={acceptTypes}
                      className="hidden"
                    />
                  </motion.div>
                </>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400 font-medium">{error}</p>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20 hover:border-white/30"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpload}
                  disabled={!file || isLoading}
                  className={`flex-1 py-3 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                    file && !isLoading
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white hover:shadow-lg hover:shadow-[#b87bd1]/40"
                      : "bg-white/5 text-white/60 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>
                        Upload {type === "resume" ? "Resume" : "Video"}
                      </span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
