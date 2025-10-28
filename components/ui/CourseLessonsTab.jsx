"use client";

import { Plus, Video, Trash2, Clock, Eye } from "lucide-react";

export default function CourseLessonsTab({
  lessons,
  setLessons,
  editMode,
  addLesson,
}) {
  const removeLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const updateLesson = (index, field, value) => {
    const updated = [...lessons];
    updated[index] = { ...updated[index], [field]: value };
    setLessons(updated);
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
          <Video className="w-7 h-7 text-purple-400" />
          Course Lessons
        </h3>
        {editMode && (
          <button
            onClick={addLesson}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 shadow-xl"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            Add Lesson
          </button>
        )}
      </div>

      {lessons.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
          <Video className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 text-lg font-semibold">
            No lessons added yet
          </p>
          {editMode && (
            <button
              onClick={addLesson}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" strokeWidth={2.5} />
              Add Your First Lesson
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div
              key={lesson._id || index}
              className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                    <Video className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Lesson {index + 1}
                  </h4>
                </div>
                {editMode && (
                  <button
                    onClick={() => removeLesson(index)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                    Title
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      placeholder="Lesson Title"
                      value={lesson.title}
                      onChange={(e) =>
                        updateLesson(index, "title", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <p className="text-white font-semibold text-lg">
                      {lesson.title || "Untitled Lesson"}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  {editMode ? (
                    <textarea
                      rows={3}
                      placeholder="Lesson description"
                      value={lesson.description}
                      onChange={(e) =>
                        updateLesson(index, "description", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  ) : (
                    <p className="text-white/70">
                      {lesson.description || "No description"}
                    </p>
                  )}
                </div>

                {/* Video Provider and ID/URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                      Video Provider
                    </label>
                    {editMode ? (
                      <select
                        value={lesson.videoProvider}
                        onChange={(e) =>
                          updateLesson(index, "videoProvider", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="youtube">YouTube</option>
                        <option value="vimeo">Vimeo</option>
                        <option value="external">External</option>
                      </select>
                    ) : (
                      <p className="text-white font-semibold capitalize">
                        {lesson.videoProvider}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                      {lesson.videoProvider === "youtube"
                        ? "Video ID"
                        : "Video URL"}
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        placeholder={
                          lesson.videoProvider === "youtube"
                            ? "e.g., dQw4w9WgXcQ"
                            : "https://..."
                        }
                        value={
                          lesson.videoProvider === "youtube"
                            ? lesson.videoId
                            : lesson.videoUrl
                        }
                        onChange={(e) =>
                          updateLesson(
                            index,
                            lesson.videoProvider === "youtube"
                              ? "videoId"
                              : "videoUrl",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <p className="text-white font-mono text-sm break-all">
                        {lesson.videoProvider === "youtube"
                          ? lesson.videoId || "Not set"
                          : lesson.videoUrl || "Not set"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Duration and Free Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                      Duration (seconds)
                    </label>
                    {editMode ? (
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <input
                          type="number"
                          placeholder="Duration in seconds"
                          value={lesson.durationSec}
                          onChange={(e) =>
                            updateLesson(
                              index,
                              "durationSec",
                              Number(e.target.value)
                            )
                          }
                          className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    ) : (
                      <p className="text-white font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        {formatDuration(lesson.durationSec || 0)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                      Free Preview
                    </label>
                    {editMode ? (
                      <label className="flex items-center gap-3 px-4 py-3 bg-slate-800/30 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-all duration-200">
                        <input
                          type="checkbox"
                          checked={lesson.isFreePreview}
                          onChange={(e) =>
                            updateLesson(
                              index,
                              "isFreePreview",
                              e.target.checked
                            )
                          }
                          className="w-5 h-5 rounded accent-purple-500"
                        />
                        <Eye className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-semibold">
                          Allow free preview
                        </span>
                      </label>
                    ) : (
                      <div className="flex items-center gap-2">
                        {lesson.isFreePreview ? (
                          <span className="px-3 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-bold border border-cyan-500/30 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Free Preview
                          </span>
                        ) : (
                          <span className="px-3 py-2 bg-slate-700/30 text-slate-400 rounded-lg text-sm font-semibold">
                            Premium Only
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Preview (if not in edit mode and has video) */}
                {!editMode &&
                  lesson.videoProvider === "youtube" &&
                  lesson.videoId && (
                    <div className="mt-4">
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                        Video Preview
                      </label>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                        <iframe
                          src={`https://www.youtube.com/embed/${lesson.videoId}`}
                          title={lesson.title}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
