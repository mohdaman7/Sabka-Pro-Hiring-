"use client"

import { useEffect, useState } from "react"
import { X, Plus, Trash2 } from "lucide-react"
import courseService from "@/services/courseService"

export default function CreateModuleModal({ onClose, onSuccess, parentCourses, defaultParentId = "" }) {
  const [formData, setFormData] = useState({
    parentCourseId: "",
    title: "",
    description: "",
    thumbnail: "",
    instructor: "",
    level: "Beginner",
    individualPrice: 0,
    status: "draft",
  })
  // Preselect parent when opened from a specific course
  useEffect(() => {
    if (defaultParentId) {
      setFormData((prev) => ({ ...prev, parentCourseId: defaultParentId }))
    }
  }, [defaultParentId])
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [validation, setValidation] = useState({ parentCourseId: "", title: "" })

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
    try {
      const v = { parentCourseId: "", title: "" }
      if (!formData.parentCourseId) v.parentCourseId = "Parent is required"
      if (!formData.title.trim()) v.title = "Title is required"
      setValidation(v)
      if (v.parentCourseId || v.title) {
        setLoading(false)
        return
      }
      await courseService.adminCreateModule({
        ...formData,
        lessons,
      })
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
          <h2 className="text-2xl font-bold text-slate-900">Create Module</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Parent Course *</label>
            <select
              required
              value={formData.parentCourseId}
              onChange={(e) => setFormData({ ...formData, parentCourseId: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Parent Course</option>
              {parentCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
            {validation.parentCourseId && <p className="text-sm text-red-600 mt-1">{validation.parentCourseId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Module Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Introduction to React"
            />
            {validation.title && <p className="text-sm text-red-600 mt-1">{validation.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Module description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
              <input
                type="number"
                min="0"
                value={formData.individualPrice}
                onChange={(e) => setFormData({ ...formData, individualPrice: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Instructor Name</label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Thumbnail URL</label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {formData.thumbnail && (
              <div className="mt-2">
                <img src={formData.thumbnail} alt="preview" className="h-24 w-full object-cover rounded border" onError={(e)=>{e.currentTarget.style.display='none'}} />
              </div>
            )}
          </div>

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

          {/* Lessons Section */}
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
                    {lesson.videoProvider !== 'youtube' && lesson.videoUrl && (
                      <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">Open video</a>
                    )}
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
              {loading ? "Creating..." : "Create Module"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
