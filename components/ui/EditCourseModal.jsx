"use client"

import { useState, useEffect } from "react"
import { X, Plus, Trash2 } from "lucide-react"
import courseService from "@/services/courseService"

export default function EditCourseModal({ course, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    instructor: "",
    level: "Beginner",
    status: "draft",
  })
  const [pricing, setPricing] = useState({
    bundlePrice: 0,
    individualPrice: 0,
    discountPercent: 0,
  })
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [saveSuccess, setSaveSuccess] = useState("")

  const isParent = course.type === "parent"
  const isModule = course.type === "module"

  useEffect(() => {
    setFormData({
      title: course.title || "",
      description: course.description || "",
      category: course.category || "",
      thumbnail: course.thumbnail || "",
      instructor: course.instructor || "",
      level: course.level || "Beginner",
      status: course.status || "draft",
    })
    setPricing({
      bundlePrice: course.pricing?.bundlePrice || 0,
      individualPrice: course.pricing?.individualPrice || 0,
      discountPercent: course.pricing?.discountPercent || 0,
    })
    if (isModule && course.lessons) {
      setLessons(course.lessons)
    }
  }, [course])

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
    ])
  }

  const removeLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index))
  }

  const updateLesson = (index, field, value) => {
    const updated = [...lessons]
    updated[index] = { ...updated[index], [field]: value }
    setLessons(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSaveSuccess("")
    try {
      const updateData = {
        ...formData,
        pricing: isParent
          ? { bundlePrice: pricing.bundlePrice, discountPercent: pricing.discountPercent }
          : { individualPrice: pricing.individualPrice },
      }
      if (isModule) {
        updateData.lessons = lessons
      }
      await courseService.adminUpdate(course._id, updateData)
      setSaveSuccess("Saved")
      onSuccess()
      onClose()
    } catch (e) {
      setError(e?.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Edit {isParent ? "Course" : "Module"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
          )}
          {saveSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">{saveSuccess}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Instructor Name</label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Thumbnail URL</label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isParent ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bundle Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={pricing.bundlePrice}
                  onChange={(e) => setPricing({ ...pricing, bundlePrice: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={pricing.discountPercent}
                  onChange={(e) => setPricing({ ...pricing, discountPercent: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
              <input
                type="number"
                min="0"
                value={pricing.individualPrice}
                onChange={(e) => setPricing({ ...pricing, individualPrice: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Lessons Section for Modules */}
          {isModule && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Lessons</h3>
                <button
                  type="button"
                  onClick={addLesson}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Lesson
                </button>
              </div>

              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-900">Lesson {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeLesson(index)}
                        className="text-red-600 hover:text-red-700"
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
                          onChange={(e) => updateLesson(index, "title", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <textarea
                          rows={2}
                          placeholder="Description"
                          value={lesson.description}
                          onChange={(e) => updateLesson(index, "description", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <select
                        value={lesson.videoProvider}
                        onChange={(e) => updateLesson(index, "videoProvider", e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="youtube">YouTube</option>
                        <option value="vimeo">Vimeo</option>
                        <option value="external">External</option>
                      </select>
                      <input
                        type="text"
                        placeholder={lesson.videoProvider === "youtube" ? "Video ID" : "Video URL"}
                        value={lesson.videoProvider === "youtube" ? lesson.videoId : lesson.videoUrl}
                        onChange={(e) =>
                          updateLesson(
                            index,
                            lesson.videoProvider === "youtube" ? "videoId" : "videoUrl",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Duration (seconds)"
                        value={lesson.durationSec}
                        onChange={(e) => updateLesson(index, "durationSec", Number(e.target.value))}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label className="flex items-center gap-2 px-3 py-2">
                        <input
                          type="checkbox"
                          checked={lesson.isFreePreview}
                          onChange={(e) => updateLesson(index, "isFreePreview", e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm text-slate-700">Free Preview</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
