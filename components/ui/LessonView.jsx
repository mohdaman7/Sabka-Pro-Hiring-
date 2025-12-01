"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Lock,
  Clock,
  BookmarkPlus,
  Share2,
  MessageSquare,
} from "lucide-react";
import VideoPlayer from "./VideoPlayer";

export default function LessonView({
  lesson = {},
  module = {},
  courseId = "",
  allModules = [],
  onLessonComplete = () => {},
  onNavigateLesson = () => {},
  userEmail = "user@sabka.com",
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandedModule, setExpandedModule] = useState(module._id);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [notes, setNotes] = useState("");
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [moduleAccessMap, setModuleAccessMap] = useState(new Map());

  // Find current module index
  const currentModuleIndex = allModules.findIndex((m) => m._id === module._id);
  const nextModule = allModules[currentModuleIndex + 1];

  // Find current lesson index
  const currentLessonIndex = (module.lessons || []).findIndex(
    (l) => l._id === lesson._id
  );
  const nextLesson = (module.lessons || [])[currentLessonIndex + 1];
  const prevLesson = (module.lessons || [])[currentLessonIndex - 1];

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60);
    return m > 0 ? `${m}min` : `${sec}sec`;
  };

  const handleVideoComplete = () => {
    onLessonComplete(lesson._id);
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      onNavigateLesson(nextLesson._id, module._id);
    } else if (nextModule) {
      onNavigateLesson(nextModule.lessons?.[0]?._id, nextModule._id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3d1642] via-[#2a1138] to-[#4a1f52]">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-[#9463a8]/30 to-[#692c7a]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <VideoPlayer
              videoUrl={lesson.videoUrl || ""}
              title={lesson.title}
              duration={lesson.durationSec || 0}
              thumbnail={lesson.thumbnail}
              onComplete={handleVideoComplete}
              userEmail={userEmail}
            />

            {/* Lesson Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/8 p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h1 className="text-1xl md:text-2xl font-bold text-white">
                      {lesson.title}
                    </h1>
                    {lesson.isFreePreview && (
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-xs font-semibold text-green-300">
                        Free Preview
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 flex-wrap text-sm text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {formatDuration(lesson.durationSec)}
                    </div>
                    <span className="text-gray-500">•</span>
                    <span>Module: {module.title}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2.5 rounded-lg border transition-all ${
                      isBookmarked
                        ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <BookmarkPlus className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:border-white/20 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Description */}
              {lesson.description && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {lesson.description}
                  </p>
                </div>
              )}

              {/* Lesson Resources */}
              {lesson.resources && lesson.resources.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-white font-semibold mb-3">Resources</h3>
                  <div className="space-y-2">
                    {lesson.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-[#9463a8]/50 hover:bg-white/8 transition-all group"
                      >
                        <span className="text-[#d8b4f0]">📎</span>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1">
                          {resource.name || "Download Resource"}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#d8b4f0] transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02, x: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  prevLesson
                    ? onNavigateLesson(prevLesson._id, module._id)
                    : null
                }
                disabled={!prevLesson}
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold text-white hover:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                ← Previous Lesson
              </motion.button>

              {nextLesson ? (
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextLesson}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-600/50 text-sm sm:text-base"
                >
                  Next Lesson →
                </motion.button>
              ) : nextModule ? (
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextLesson}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-600/50 text-sm sm:text-base"
                >
                  Next Module →
                </motion.button>
              ) : (
                <div className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold text-white text-center text-sm sm:text-base">
                  Course Complete ✓
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Course Outline */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-6 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-2xl max-h-[80vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-[#692c7a]/20 to-transparent">
                <h2 className="text-white font-bold text-lg">Course Outline</h2>
              </div>

              {/* Modules List */}
              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-white/5">
                  {allModules.map((mod) => {
                    // Check if module is locked (no free preview lessons)
                    const hasFreeLesson = (mod.lessons || []).some(
                      (l) => l.isFreePreview
                    );
                    const isModuleLocked = !hasFreeLesson;
                    const moduleLessonCount = mod.lessons?.length || 0;
                    const completedCount = (mod.lessons || []).filter((les) =>
                      completedLessons.has(les._id)
                    ).length;
                    const progressPercent =
                      moduleLessonCount > 0
                        ? Math.round((completedCount / moduleLessonCount) * 100)
                        : 0;

                    return (
                      <div key={mod._id} className="border-b border-white/5">
                        <button
                          onClick={() =>
                            setExpandedModule(
                              expandedModule === mod._id ? null : mod._id
                            )
                          }
                          className="w-full p-3 flex items-center justify-between transition-colors text-left hover:bg-white/5"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-white truncate">
                                {mod.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <p className="text-xs text-gray-400">
                                  {moduleLessonCount} lessons
                                </p>
                                {moduleLessonCount > 0 && (
                                  <div className="flex items-center gap-1">
                                    <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300"
                                        style={{ width: `${progressPercent}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-400">
                                      {progressPercent}%
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                              expandedModule === mod._id ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Lessons List */}
                        {expandedModule === mod._id && (
                          <div className="bg-white/[0.02] divide-y divide-white/5">
                            {(mod.lessons || []).map((les, idx) => {
                              const isCurrentLesson =
                                les._id === lesson._id &&
                                mod._id === module._id;
                              const isCompleted = completedLessons.has(les._id);

                              return (
                                <motion.button
                                  key={les._id}
                                  onClick={() =>
                                    onNavigateLesson(les._id, mod._id)
                                  }
                                  whileHover={{ x: 4 }}
                                  className={`w-full p-3 flex items-center gap-3 text-left transition-all group ${
                                    isCurrentLesson
                                      ? "bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/20 border-l-2 border-[#9463a8]"
                                      : "hover:bg-white/5"
                                  }`}
                                >
                                  <div
                                    className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                                      isCurrentLesson
                                        ? "bg-[#9463a8]/40 border border-[#9463a8]/60 shadow-lg shadow-[#9463a8]/30"
                                        : isCompleted
                                        ? "bg-emerald-500/30 border border-emerald-500/50"
                                        : "bg-white/10 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40"
                                    }`}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : isCurrentLesson ? (
                                      <PlayCircle className="w-3.5 h-3.5 text-[#d8b4f0] fill-current" />
                                    ) : (
                                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 opacity-60 group-hover:opacity-100" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-xs font-medium truncate transition-colors ${
                                        isCurrentLesson
                                          ? "text-white"
                                          : isCompleted
                                          ? "text-emerald-300"
                                          : "text-gray-300 group-hover:text-white"
                                      }`}
                                    >
                                      {idx + 1}. {les.title}
                                    </p>
                                    <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors">
                                      {formatDuration(les.durationSec)}
                                    </p>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
