"use client";

import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  BookOpen,
  Tag,
  User,
  ImageIcon,
  DollarSign,
  Settings,
  Video,
  Clock,
  Eye,
} from "lucide-react";
import courseService from "@/services/courseService";

export default function EditCourseModal({ course, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    instructor: "",
    level: "Beginner",
    status: "draft",
  });
  const [pricing, setPricing] = useState({
    bundlePrice: 0,
    individualPrice: 0,
    discountPercent: 0,
  });
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  const isParent = course.type === "parent";
  const isModule = course.type === "module";

  useEffect(() => {
    setFormData({
      title: course.title || "",
      description: course.description || "",
      category: course.category || "",
      thumbnail: course.thumbnail || "",
      instructor: course.instructor || "",
      level: course.level || "Beginner",
      status: course.status || "draft",
    });
    setPricing({
      bundlePrice: course.pricing?.bundlePrice || 0,
      individualPrice: course.pricing?.individualPrice || 0,
      discountPercent: course.pricing?.discountPercent || 0,
    });
    if (isModule && course.lessons) {
      setLessons(course.lessons);
    }
  }, [course]);

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        title: "",
        description: "",
        videoProvider: "youtube",
        videoId: "",
        videoUrl: "",
        durationSec: 0,
        isFreePreview: false,
        order: lessons.length,
      },
    ]);
  };

  const removeLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const updateLesson = (index, field, value) => {
    const updated = [...lessons];
    updated[index] = { ...updated[index], [field]: value };
    setLessons(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaveSuccess("");
    try {
      const updateData = {
        ...formData,
        pricing: isParent
          ? {
              bundlePrice: pricing.bundlePrice,
              discountPercent: pricing.discountPercent,
            }
          : { individualPrice: pricing.individualPrice },
      };
      if (isModule) {
        updateData.lessons = lessons;
      }
      await courseService.adminUpdate(course._id, updateData);
      setSaveSuccess("Saved");
      onSuccess();
      onClose();
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50">
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 px-6 py-5 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Edit {isParent ? "Course" : "Module"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {error}
            </div>
          )}
          {saveSuccess && (
            <div className="bg-green-900/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {saveSuccess}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-cyan-400" />
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600 resize-none"
              placeholder="Enter course description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-purple-400" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600"
              >
                <option value="">Select Category</option>
                <option value="IT & Software">IT & Software</option>
                <option value="Management">Management</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4 text-orange-400" />
                Level
              </label>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-pink-400" />
              Instructor Name
            </label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600"
              placeholder="Enter instructor name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-indigo-400" />
              Thumbnail URL
            </label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({ ...formData, thumbnail: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {isParent ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  Bundle Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={pricing.bundlePrice}
                  onChange={(e) =>
                    setPricing({
                      ...pricing,
                      bundlePrice: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-yellow-400" />
                  Discount (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={pricing.discountPercent}
                  onChange={(e) =>
                    setPricing({
                      ...pricing,
                      discountPercent: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600"
                  placeholder="0"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={pricing.individualPrice}
                onChange={(e) =>
                  setPricing({
                    ...pricing,
                    individualPrice: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600"
                placeholder="0"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-red-400" />
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-600"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {isModule && (
            <div className="border-t border-slate-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-400" />
                  Lessons
                </h3>
                <button
                  type="button"
                  onClick={addLesson}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-blue-500/50"
                >
                  <Plus className="w-4 h-4" />
                  Add Lesson
                </button>
              </div>

              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="border border-slate-700 rounded-lg p-4 space-y-3 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-100 flex items-center gap-2">
                        <Video className="w-4 h-4 text-cyan-400" />
                        Lesson {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeLesson(index)}
                        className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <input
                          type="text"
                          placeholder="Lesson Title"
                          value={lesson.title}
                          onChange={(e) =>
                            updateLesson(index, "title", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="col-span-2">
                        <textarea
                          rows={2}
                          placeholder="Description"
                          value={lesson.description}
                          onChange={(e) =>
                            updateLesson(index, "description", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        />
                      </div>
                      <select
                        value={lesson.videoProvider}
                        onChange={(e) =>
                          updateLesson(index, "videoProvider", e.target.value)
                        }
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="youtube">YouTube</option>
                        <option value="vimeo">Vimeo</option>
                        <option value="external">External</option>
                      </select>
                      <input
                        type="text"
                        placeholder={
                          lesson.videoProvider === "youtube"
                            ? "Video ID"
                            : "Video URL"
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
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <input
                          type="number"
                          placeholder="Duration (sec)"
                          value={lesson.durationSec}
                          onChange={(e) =>
                            updateLesson(
                              index,
                              "durationSec",
                              Number(e.target.value)
                            )
                          }
                          className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <label className="flex items-center gap-2 px-3 py-2 bg-slate-800/30 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-all duration-200">
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
                          className="rounded accent-blue-500"
                        />
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300">
                          Free Preview
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-blue-500/50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
