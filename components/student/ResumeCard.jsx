"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Copy,
  Trash2,
  TrendingUp,
  Crown,
  CheckCircle2,
  MoreVertical,
  Share2,
} from "lucide-react";
import { useState } from "react";

export default function ResumeCard({
  resume,
  onView,
  onDownload,
  onDuplicate,
  onDelete,
  isPro,
  getScoreColor,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const scoreColors = getScoreColor(resume.atsScore || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/8 to-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-[#b87bd1]/20 transition-all duration-300"
    >
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#803791] via-[#b87bd1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Primary Badge */}
      {resume.isPrimary && (
        <motion.div
          className="absolute top-3 right-3 z-10"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#b87bd1] to-pink-500 px-2.5 py-1 rounded-full shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-bold text-white">Primary</span>
          </div>
        </motion.div>
      )}

      {/* Score Badge */}
      <motion.div
        className="absolute top-3 left-3 z-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <div
          className={`flex items-center gap-1.5 bg-gradient-to-r ${scoreColors.bg} border ${scoreColors.border} px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm`}
        >
          <div
            className={`w-2 h-2 rounded-full ${scoreColors.text.replace(
              "text-",
              "bg-"
            )}`}
          ></div>
          <span className={`text-xs font-bold ${scoreColors.text}`}>
            {resume.atsScore || 0}%
          </span>
        </div>
      </motion.div>

      {/* Thumbnail Area */}
      <div className="h-48 bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#b87bd1] rounded-full filter blur-3xl opacity-20" />
          <div className="absolute -bottom-20 left-0 w-40 h-40 bg-[#803791] rounded-full filter blur-3xl opacity-20" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center mx-auto mb-3 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-white/60 font-medium">
              {resume.type?.toUpperCase() || "RESUME"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div>
          <h3 className="font-bold text-white truncate group-hover:text-[#b87bd1] transition-colors line-clamp-2">
            {resume.name}
          </h3>
          <p className="text-xs text-white/50 mt-1">
            {new Date(resume.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Keywords Preview */}
        {resume.keywords && resume.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resume.keywords.slice(0, 3).map((keyword, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-2 py-0.5 bg-gradient-to-r from-[#b87bd1]/20 to-pink-500/20 border border-[#b87bd1]/30 rounded text-xs text-[#b87bd1] font-medium hover:from-[#b87bd1]/30 hover:to-pink-500/30 transition-all cursor-pointer"
              >
                {keyword.word || keyword}
              </motion.span>
            ))}
            {resume.keywords.length > 3 && (
              <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/60 font-medium border border-white/10">
                +{resume.keywords.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 pt-2 border-t border-white/10">
          <div
            className="flex items-center gap-1.5 text-white/60 text-xs hover:text-white transition-colors cursor-help"
            title="Profile views"
          >
            <Eye className="w-4 h-4" />
            <span>{resume.views || 0}</span>
          </div>
          <div
            className="flex items-center gap-1.5 text-white/60 text-xs hover:text-white transition-colors cursor-help"
            title="Downloads"
          >
            <Download className="w-4 h-4" />
            <span>{resume.downloads || 0}</span>
          </div>
          {resume.atsScore && resume.atsScore >= 80 && (
            <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Excellent</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onView?.(resume)}
            className="flex-1 py-2.5 bg-gradient-to-r from-[#803791]/30 to-[#b87bd1]/30 hover:from-[#803791]/50 hover:to-[#b87bd1]/50 text-white text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 border border-[#b87bd1]/20 hover:border-[#b87bd1]/50"
            title="View details"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload?.(resume)}
            className="p-2.5 text-white/60 hover:text-green-400 hover:bg-green-400/20 rounded-lg transition-all border border-transparent hover:border-green-400/30"
            title="Download resume"
          >
            <Download className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDuplicate?.(resume)}
            className="p-2.5 text-white/60 hover:text-blue-400 hover:bg-blue-400/20 rounded-lg transition-all border border-transparent hover:border-blue-400/30"
            title="Duplicate resume"
          >
            <Copy className="w-4 h-4" />
          </motion.button>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className="p-2.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all border border-transparent"
              title="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </motion.button>

            {/* Dropdown Menu */}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-20 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="w-full px-4 py-2.5 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/10">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
                <button
                  onClick={() => {
                    onDelete?.(resume);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-red-400 hover:bg-red-400/20 transition-colors flex items-center gap-3"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b87bd1]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
