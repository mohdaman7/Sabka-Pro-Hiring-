"use client";

import { useState } from "react";
import { Layers, Video, ChevronDown, ChevronUp, Play } from "lucide-react";

export default function CourseModulesTab({ modules }) {
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
          <Layers className="w-7 h-7 text-purple-400" />
          Course Modules
        </h3>
        <div className="text-white/60 font-semibold">
          {modules.length} modules
        </div>
      </div>

      {modules.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
          <Layers className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 text-lg font-semibold">
            No modules added yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div
              key={module._id}
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-300"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleModuleExpand(module._id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
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
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                    {expandedModules.has(module._id) ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </div>

              {expandedModules.has(module._id) && (
                <div className="px-6 pb-6 space-y-3 border-t border-white/10 pt-4">
                  {module.lessons && module.lessons.length > 0 ? (
                    module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson._id}
                        className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-all"
                      >
                        <Play className="w-4 h-4 text-purple-400" />
                        <div className="flex-1">
                          <p className="text-white font-semibold">
                            {lessonIndex + 1}. {lesson.title}
                          </p>
                          <p className="text-white/50 text-sm">
                            {formatDuration(lesson.durationSec || 0)}
                          </p>
                        </div>
                        {lesson.isFreePreview && (
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-bold">
                            FREE
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-white/40 text-center py-4">
                      No lessons in this module
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
