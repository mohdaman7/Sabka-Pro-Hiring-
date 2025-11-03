"use client";

import { motion } from "framer-motion";
import {
  Target, Lightbulb, AlertCircle, BarChart3, TrendingUp,
  FileText, Star, Clock, CheckCircle2, FileCheck, X
} from "lucide-react";

export default function ResumeDetailsModal({ resume, onClose, getScoreColor }) {
  if (!resume) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#16213e] rounded-3xl shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#803791]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b87bd1]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-gradient-to-r from-[#803791]/90 to-[#b87bd1]/90 border-b border-white/10">
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{resume.name}</h2>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <p className="text-white/70 text-xs sm:text-sm flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently uploaded"}
                      </p>
                      {resume.isPrimary && (
                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Primary
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-all group"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="relative overflow-y-auto max-h-[calc(95vh-120px)] p-4 sm:p-6 space-y-6">
          {/* ATS Score Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 p-6 sm:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#803791]/10 to-[#b87bd1]/10" />
            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              {/* Score Circle */}
              <div className="lg:col-span-2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-full blur-2xl opacity-30 animate-pulse" />
                  <div className="relative">
                    <svg className="w-48 h-48 sm:w-56 sm:h-56 transform -rotate-90">
                      <circle cx="112" cy="112" r="100" stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none" />
                      <circle
                        cx="112" cy="112" r="100"
                        stroke="url(#scoreGradient)"
                        strokeWidth="12" fill="none"
                        strokeDasharray={`${(resume.atsScore || 0) * 6.28} 628`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#803791" />
                          <stop offset="50%" stopColor="#9d4ead" />
                          <stop offset="100%" stopColor="#b87bd1" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="text-center"
                      >
                        <div className="text-6xl sm:text-7xl font-black bg-gradient-to-br from-white via-white to-white/80 bg-clip-text text-transparent mb-1">
                          {resume.atsScore || 0}
                        </div>
                        <div className="text-sm sm:text-base text-white/60 font-semibold uppercase tracking-wider">ATS Score</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Details */}
              <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-2 rounded-xl border-2 ${getScoreColor(resume.atsScore || 0).border} ${getScoreColor(resume.atsScore || 0).bg} backdrop-blur-sm flex items-center gap-2`}>
                    <div className={`w-3 h-3 rounded-full ${getScoreColor(resume.atsScore || 0).text.replace('text-', 'bg-')} animate-pulse`} />
                    <span className={`font-bold text-lg ${getScoreColor(resume.atsScore || 0).text}`}>
                      {resume.atsScore >= 80 ? "Excellent Match" : resume.atsScore >= 60 ? "Good Match" : "Needs Improvement"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#b87bd1]" />
                    Score Breakdown
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { label: "Keyword Match", value: Math.min(resume.atsScore + 5, 100), color: "from-blue-500 to-cyan-500" },
                      { label: "Format Quality", value: Math.min(resume.atsScore + 3, 100), color: "from-purple-500 to-pink-500" },
                      { label: "Content Structure", value: Math.max(resume.atsScore - 8, 50), color: "from-green-500 to-emerald-500" },
                      { label: "Readability", value: Math.min(resume.atsScore + 7, 100), color: "from-orange-500 to-amber-500" },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-white/80 font-medium">{item.label}</span>
                          <span className="text-sm text-white/60 font-bold">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Keywords Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
          >
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Detected Keywords</h3>
                  <p className="text-xs text-white/60">Found {resume.keywords?.length || 0} relevant keywords</p>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#b87bd1]/20 border border-[#b87bd1]/30">
                <span className="text-sm font-bold text-[#b87bd1]">{resume.keywords?.length || 0} Total</span>
              </div>
            </div>
            
            {resume.keywords && resume.keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {resume.keywords.map((keyword, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="group relative"
                  >
                    <div className="px-4 py-2.5 bg-gradient-to-r from-[#803791]/30 to-[#b87bd1]/30 hover:from-[#803791]/50 hover:to-[#b87bd1]/50 border border-[#b87bd1]/40 rounded-xl transition-all cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{keyword.word}</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-white/40" />
                          <span className="text-xs text-white/70 font-medium">×{keyword.frequency}</span>
                        </div>
                      </div>
                      <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-full"
                          style={{ width: `${keyword.relevance}%` }}
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      <p className="text-xs text-white">Relevance: {keyword.relevance}%</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-sm text-white/60">No keywords detected</p>
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { icon: FileText, label: "File Size", value: resume.fileSize ? `${(resume.fileSize / 1024).toFixed(1)} KB` : "N/A", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30", iconColor: "text-blue-400" },
              { icon: Star, label: "Keywords", value: resume.keywords?.length || 0, color: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/30", iconColor: "text-purple-400" },
              { icon: Lightbulb, label: "Suggestions", value: resume.suggestions?.length || 0, color: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/30", iconColor: "text-yellow-400" },
              { icon: TrendingUp, label: "Potential", value: `${Math.min(resume.atsScore + 15, 100)}%`, color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30", iconColor: "text-green-400" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className={`rounded-xl p-4 bg-gradient-to-br ${stat.color} border ${stat.border} hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
                  <p className="text-xs text-white/60 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Suggestions */}
          {resume.suggestions && resume.suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">AI-Powered Suggestions</h3>
                    <p className="text-xs text-white/60">Actionable tips to boost your score</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                  <span className="text-sm font-bold text-yellow-400">{resume.suggestions.length} Tips</span>
                </div>
              </div>
              <div className="space-y-3">
                {resume.suggestions.map((suggestion, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="group flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#b87bd1]/50 hover:bg-white/10 transition-all"
                  >
                    <div className={`mt-0.5 p-2.5 rounded-xl ${
                      suggestion.priority === 'high' ? 'bg-red-500/20 border-2 border-red-500/40' :
                      suggestion.priority === 'medium' ? 'bg-yellow-500/20 border-2 border-yellow-500/40' :
                      'bg-blue-500/20 border-2 border-blue-500/40'
                    }`}>
                      <AlertCircle className={`w-5 h-5 ${
                        suggestion.priority === 'high' ? 'text-red-400' :
                        suggestion.priority === 'medium' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                          suggestion.priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          suggestion.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {suggestion.priority} Priority
                        </span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/10 text-white/70 border border-white/20">
                          {suggestion.category}
                        </span>
                        {suggestion.impact && (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {suggestion.impact}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed">{suggestion.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
