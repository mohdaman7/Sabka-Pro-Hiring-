"use client";

import { useState } from "react";
import { X, Video, Clock, Eye, Upload, CheckCircle, Sparkles } from "lucide-react";

export default function CreateLessonModal({ onClose, onAddLesson, moduleName }) {
  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    videoProvider: "youtube",
    videoId: "",
    videoUrl: "",
    durationSec: 0,
    isFreePreview: false,
  });

  const [validation, setValidation] = useState({ title: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    if (!lessonData.title.trim()) {
      setValidation({ title: "Lesson title is required" });
      return;
    }

    // Add lesson
    setIsSubmitting(true);
    try {
      await onAddLesson(lessonData);
      // Modal will be closed by parent component
    } catch (error) {
      setIsSubmitting(false);
      // Error will be handled by parent
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[60] p-4">
      <div
        className="relative max-w-3xl w-full max-h-[90vh] overflow-hidden rounded-[32px] shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.92) 100%)",
        }}
      >
        {/* Header */}
        <div
          className="relative overflow-hidden px-8 py-6 border-b"
          style={{
            background:
              "linear-gradient(135deg, rgba(128,55,145,0.12), rgba(184,123,209,0.08))",
            borderColor: "rgba(128,55,145,0.15)",
          }}
        >
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Video className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Create New Lesson
                </h2>
                <p className="text-sm text-slate-600 font-medium">
                  {moduleName ? `Add a video lesson to "${moduleName}"` : "Add a video lesson to your module"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors hover:scale-110 duration-300"
            >
              <X className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#803791]" strokeWidth={2.5} />
                Lesson Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lessonData.title}
                onChange={(e) => {
                  setLessonData({ ...lessonData, title: e.target.value });
                  setValidation({ title: "" });
                }}
                className="w-full px-4 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium text-slate-900 placeholder-slate-500 hover:border-slate-400"
                placeholder="e.g., Introduction to React Hooks"
              />
              {validation.title && (
                <p className="text-sm text-red-600 mt-2 font-semibold flex items-center gap-1">
                  <X className="w-4 h-4" strokeWidth={2.5} />
                  {validation.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                Description
              </label>
              <textarea
                rows={4}
                value={lessonData.description}
                onChange={(e) =>
                  setLessonData({ ...lessonData, description: e.target.value })
                }
                className="w-full px-4 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium text-slate-900 placeholder-slate-500 resize-none hover:border-slate-400"
                placeholder="Describe what students will learn in this lesson..."
              />
            </div>

            {/* Video Provider and ID/URL */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  Video Provider
                </label>
                <select
                  value={lessonData.videoProvider}
                  onChange={(e) =>
                    setLessonData({ ...lessonData, videoProvider: e.target.value })
                  }
                  className="w-full px-4 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium bg-white text-slate-900 appearance-none cursor-pointer hover:border-slate-400"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23803791' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="youtube" className="text-slate-900">
                    📺 YouTube
                  </option>
                  <option value="vimeo" className="text-slate-900">
                    🎬 Vimeo
                  </option>
                  <option value="external" className="text-slate-900">
                    🔗 External
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  {lessonData.videoProvider === "youtube" ? "Video ID" : "Video URL"}
                </label>
                <input
                  type="text"
                  placeholder={
                    lessonData.videoProvider === "youtube"
                      ? "e.g., dQw4w9WgXcQ"
                      : "https://..."
                  }
                  value={
                    lessonData.videoProvider === "youtube"
                      ? lessonData.videoId
                      : lessonData.videoUrl
                  }
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      [lessonData.videoProvider === "youtube" ? "videoId" : "videoUrl"]:
                        e.target.value,
                    })
                  }
                  className="w-full px-4 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium text-slate-900 placeholder-slate-500 hover:border-slate-400"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#803791]" strokeWidth={2.5} />
                Duration (seconds)
              </label>
              <input
                type="number"
                min="0"
                value={lessonData.durationSec}
                onChange={(e) =>
                  setLessonData({
                    ...lessonData,
                    durationSec: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium text-slate-900 placeholder-slate-500 hover:border-slate-400"
                placeholder="e.g., 300 (5 minutes)"
              />
            </div>

            {/* Free Preview */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                Access Settings
              </label>
              <label className="flex items-center gap-3 px-4 py-4 border-2 border-slate-300 rounded-2xl cursor-pointer hover:border-[#803791]/50 transition-all bg-white">
                <input
                  type="checkbox"
                  checked={lessonData.isFreePreview}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      isFreePreview: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded accent-[#803791]"
                />
                <Eye className="w-5 h-5 text-[#803791]" strokeWidth={2.5} />
                <div>
                  <span className="text-sm font-bold text-slate-900 block">
                    Free Preview
                  </span>
                  <span className="text-xs text-slate-600">
                    Allow non-enrolled students to watch this lesson
                  </span>
                </div>
              </label>
            </div>

            {/* Preview Card */}
            {lessonData.title && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#803791]/10 to-[#b87bd1]/10 border-2 border-[#803791]/20">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#803791]" strokeWidth={2.5} />
                  Lesson Preview
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-semibold">Title:</span>
                    <span className="font-bold text-slate-900">{lessonData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-semibold">Provider:</span>
                    <span className="font-bold text-slate-900 capitalize">
                      {lessonData.videoProvider}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-semibold">Duration:</span>
                    <span className="font-bold text-slate-900">
                      {Math.floor(lessonData.durationSec / 60)}m {lessonData.durationSec % 60}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-semibold">Access:</span>
                    <span
                      className={`font-bold ${
                        lessonData.isFreePreview ? "text-cyan-600" : "text-slate-900"
                      }`}
                    >
                      {lessonData.isFreePreview ? "Free Preview" : "Premium Only"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-2xl hover:opacity-95 transition-all duration-300 font-bold shadow-lg hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Video className="w-5 h-5" strokeWidth={2.5} />
                  Create Lesson
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
