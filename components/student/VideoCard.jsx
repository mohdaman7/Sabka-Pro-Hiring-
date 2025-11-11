"use client";

import { motion } from "framer-motion";
import {
  Video,
  Play,
  Trash2,
  Eye,
  MoreVertical,
  Share2,
  Scissors,
  CheckCircle2,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useState } from "react";

export default function VideoCard({
  video,
  onPlay,
  onEdit,
  onDelete,
  isPrimary,
  onSetPrimary,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/8 to-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
    >
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Primary Badge */}
      {isPrimary && (
        <motion.div
          className="absolute top-3 right-3 z-10"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 px-2.5 py-1 rounded-full shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-bold text-white">Primary</span>
          </div>
        </motion.div>
      )}

      {/* Status Badge */}
      {video.status === "processing" && (
        <motion.div
          className="absolute top-3 left-3 z-10"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 px-2.5 py-1 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white">Processing</span>
          </div>
        </motion.div>
      )}

      {/* Thumbnail Area with Play Button */}
      <div
        className="h-56 relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl opacity-10" />
          <div className="absolute -bottom-20 left-0 w-48 h-48 bg-pink-500 rounded-full filter blur-3xl opacity-10" />
        </div>

        {/* Video Icon */}
        <div className="relative h-full flex items-center justify-center">
          <Video className="w-16 h-16 text-white/40" />
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-semibold">
          {video.duration}
        </div>

        {/* Play Button Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: isHovering ? 1 : 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlay?.(video)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl hover:shadow-purple-500/50"
          >
            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title & Date */}
        <div>
          <h3 className="font-bold text-white truncate group-hover:text-purple-400 transition-colors line-clamp-2">
            {video.name}
          </h3>
          <p className="text-xs text-white/50 mt-1">
            {new Date(video.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-white/60">
          <div
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-help"
            title="Views"
          >
            <Eye className="w-4 h-4" />
            <span>{video.views || 0} views</span>
          </div>
          {video.atsScore > 0 && (
            <div
              className="flex items-center gap-1.5 text-green-400 font-semibold"
              title="ATS Score"
            >
              <TrendingUp className="w-4 h-4" />
              <span>{video.atsScore}/100</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlay?.(video)}
            className="flex-1 py-2.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/50 hover:to-pink-500/50 text-white text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 border border-purple-500/20 hover:border-purple-500/50"
            title="Play video"
          >
            <Play className="w-4 h-4" />
            <span>Play</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit?.(video)}
            className="p-2.5 text-white/60 hover:text-blue-400 hover:bg-blue-400/20 rounded-lg transition-all border border-transparent hover:border-blue-400/30"
            title="Edit video"
          >
            <Scissors className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSetPrimary?.(video)}
            className="p-2.5 text-white/60 hover:text-amber-400 hover:bg-amber-400/20 rounded-lg transition-all border border-transparent hover:border-amber-400/30"
            title={isPrimary ? "Already primary" : "Set as primary"}
            disabled={isPrimary}
          >
            <Clock className="w-4 h-4" />
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
                    onDelete?.(video);
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
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
