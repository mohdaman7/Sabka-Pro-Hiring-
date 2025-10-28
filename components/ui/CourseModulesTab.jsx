"use client";

import { useState } from "react";
import { Layers, Video, ChevronDown, ChevronUp, Play, Trash2, Plus, Edit2, Clock, Eye, Sparkles } from "lucide-react";

export default function CourseModulesTab({ modules, onDeleteModule, onAddModule, onAddLessonToModule, onDeleteLesson, editMode }) {
  const [expandedModules, setExpandedModules] = useState(new Set());

  const toggleModuleExpand = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-white flex items-center gap-3">
          <Layers className="w-7 h-7 text-purple-400" strokeWidth={2.5} />
          Course Modules
        </h3>
        <div className="flex items-center gap-4">
          <div className="text-white/60 font-semibold">
            {modules.length} modules
          </div>
          <button
            onClick={onAddModule}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 shadow-xl hover:scale-105"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            Add Module
          </button>
        </div>
      </div>

      {modules.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
          <Layers className="w-16 h-16 text-white/20 mx-auto mb-4" strokeWidth={2} />
          <p className="text-white/60 text-lg font-semibold mb-4">
            No modules added yet
          </p>
          <button
            onClick={onAddModule}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 inline-flex items-center gap-2 shadow-xl"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            Add Your First Module
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div
              key={module._id}
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div 
                    className="flex items-start gap-4 flex-1 cursor-pointer"
                    onClick={() => toggleModuleExpand(module._id)}
                  >
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                      <Video className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {index + 1}. {module.title}
                      </h4>
                      <p className="text-white/60 text-sm mb-3">
                        {module.description || "No description"}
                      </p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-semibold border border-purple-500/30">
                          {module.lessons?.length || 0} lessons
                        </span>
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm font-semibold border border-emerald-500/30">
                          ₹{module.pricing?.individualPrice || 0}
                        </span>
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-sm font-semibold border border-amber-500/30">
                          {module.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDeleteModule(module._id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Delete Module"
                    >
                      <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={() => toggleModuleExpand(module._id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-all"
                    >
                      {expandedModules.has(module._id) ? (
                        <ChevronUp className="w-5 h-5 text-white" strokeWidth={2.5} />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white" strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {expandedModules.has(module._id) && (
                <div className="border-t border-white/10">
                  {/* Lessons Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-slate-800/40 to-slate-900/40 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Video className="w-5 h-5 text-purple-400" strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">
                          Lessons
                        </p>
                        <p className="text-white/50 text-xs font-semibold">
                          {module.lessons?.length || 0} total lessons
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onAddLessonToModule(module)}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 text-sm"
                    >
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                      Add Lesson
                    </button>
                  </div>

                  {/* Lessons List - Scrollable */}
                  {module.lessons && module.lessons.length > 0 ? (
                    <div className="px-6 pb-6 pt-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                      <div className="space-y-3">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson._id}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300"
                            style={{
                              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
                            }}
                          >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
                            
                            <div className="relative p-4 flex items-center gap-4">
                              {/* Lesson Number Badge */}
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <span className="text-white font-black text-sm">{lessonIndex + 1}</span>
                                </div>
                              </div>

                              {/* Play Icon */}
                              <div className="flex-shrink-0">
                                <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-all duration-300">
                                  <Play className="w-5 h-5 text-purple-400 group-hover:text-purple-300" strokeWidth={2.5} />
                                </div>
                              </div>

                              {/* Lesson Info */}
                              <div className="flex-1 min-w-0">
                                <h5 className="text-white font-bold text-base mb-1 truncate group-hover:text-purple-200 transition-colors">
                                  {lesson.title}
                                </h5>
                                <div className="flex items-center gap-3 flex-wrap">
                                  {lesson.description && (
                                    <p className="text-white/50 text-xs font-medium truncate max-w-xs">
                                      {lesson.description}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-2 text-white/60">
                                    <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
                                    <span className="text-xs font-semibold">
                                      {formatDuration(lesson.durationSec || 0)}
                                    </span>
                                  </div>
                                  {lesson.videoProvider && (
                                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-md text-xs font-bold border border-blue-500/30">
                                      {lesson.videoProvider}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Badges and Actions */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {lesson.isFreePreview && (
                                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs font-black border border-cyan-500/30">
                                    <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
                                    FREE
                                  </div>
                                )}
                                
                                {/* Delete Lesson Button */}
                                <button
                                  onClick={() => onDeleteLesson(module._id, lesson._id)}
                                  className="p-2.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                                  title="Delete Lesson"
                                >
                                  <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="px-6 pb-6 pt-4">
                      <div className="text-center py-12 bg-slate-800/20 rounded-2xl border-2 border-dashed border-white/10">
                        <div className="relative inline-block mb-4">
                          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-20" />
                          <div className="relative p-4 bg-slate-800/50 rounded-2xl">
                            <Video className="w-12 h-12 text-white/30" strokeWidth={2} />
                          </div>
                        </div>
                        <p className="text-white/40 font-bold mb-4 text-lg">
                          No lessons in this module yet
                        </p>
                        <p className="text-white/30 text-sm mb-6 max-w-sm mx-auto">
                          Start building your course by adding your first lesson
                        </p>
                        <button
                          onClick={() => onAddLessonToModule(module)}
                          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:scale-105"
                        >
                          <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                          Add First Lesson
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #803791, #b87bd1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #9647a8, #c88dd9);
        }
      `}</style>
    </div>
  );
}
