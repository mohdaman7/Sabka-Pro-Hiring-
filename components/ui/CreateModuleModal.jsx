"use client";

import { useEffect, useState } from "react";
import {
  X,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Video,
  DollarSign,
  Settings,
  CheckCircle,
  Sparkles,
  Upload,
  Eye,
} from "lucide-react";
import courseService from "@/services/courseService";

export default function CreateModuleModal({
  onClose,
  onSuccess,
  parentCourses,
  defaultParentId = "",
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    parentCourseId: "",
    title: "",
    description: "",
    thumbnail: "",
    instructor: "",
    level: "Beginner",
    individualPrice: 0,
    status: "draft",
  });

  useEffect(() => {
    if (defaultParentId) {
      setFormData((prev) => ({ ...prev, parentCourseId: defaultParentId }));
    }
  }, [defaultParentId]);

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validation, setValidation] = useState({
    parentCourseId: "",
    title: "",
  });

  const steps = [
    { id: 0, title: "Basic Info", icon: BookOpen, desc: "Module details" },
    {
      id: 1,
      title: "Configuration",
      icon: Settings,
      desc: "Settings & pricing",
    },
    { id: 2, title: "Lessons", icon: Video, desc: "Add content" },
    { id: 3, title: "Review", icon: CheckCircle, desc: "Final check" },
  ];

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

  const validateStep = () => {
    const v = { parentCourseId: "", title: "" };
    if (currentStep === 0) {
      if (!formData.parentCourseId)
        v.parentCourseId = "Parent course is required";
      if (!formData.title.trim()) v.title = "Module title is required";
      setValidation(v);
      return !v.parentCourseId && !v.title;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await courseService.adminCreateModule({
        ...formData,
        lessons,
      });
      onSuccess();
      onClose();
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div
        className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-[32px] shadow-2xl"
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
                <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Create New Module
                </h2>
                <p className="text-sm text-slate-600 font-medium">
                  Step {currentStep + 1} of {steps.length}
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

        {/* Progress Steps */}
        <div className="px-8 py-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 mb-2 ${
                        isActive
                          ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] shadow-lg scale-110"
                          : isCompleted
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md"
                          : "bg-slate-200"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle
                          className="w-6 h-6 text-white"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? "text-white" : "text-slate-400"
                          }`}
                          strokeWidth={2.5}
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-sm font-bold ${
                          isActive
                            ? "text-[#803791]"
                            : isCompleted
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-4 rounded-full transition-all duration-500 ${
                        isCompleted
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-280px)]">
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl font-semibold flex items-center gap-2">
              <X className="w-5 h-5" strokeWidth={2.5} />
              {error}
            </div>
          )}

          {/* Step 0: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <BookOpen
                    className="w-4 h-4 text-[#803791]"
                    strokeWidth={2.5}
                  />
                  Parent Course *
                </label>
                <select
                  value={formData.parentCourseId}
                  onChange={(e) =>
                    setFormData({ ...formData, parentCourseId: e.target.value })
                  }
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium bg-white"
                >
                  <option value="">Select Parent Course</option>
                  {parentCourses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {validation.parentCourseId && (
                  <p className="text-sm text-red-600 mt-2 font-semibold flex items-center gap-1">
                    <X className="w-4 h-4" strokeWidth={2.5} />
                    {validation.parentCourseId}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Sparkles
                    className="w-4 h-4 text-[#803791]"
                    strokeWidth={2.5}
                  />
                  Module Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium"
                  placeholder="e.g., Introduction to React Hooks"
                />
                {validation.title && (
                  <p className="text-sm text-red-600 mt-2 font-semibold flex items-center gap-1">
                    <X className="w-4 h-4" strokeWidth={2.5} />
                    {validation.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium resize-none"
                  placeholder="Describe what students will learn in this module..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Upload
                    className="w-4 h-4 text-[#803791]"
                    strokeWidth={2.5}
                  />
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.thumbnail && (
                  <div className="mt-4 rounded-2xl overflow-hidden border-2 border-slate-200">
                    <img
                      src={formData.thumbnail}
                      alt="preview"
                      className="h-48 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 1: Configuration */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium bg-white"
                  >
                    <option value="Beginner">🟢 Beginner</option>
                    <option value="Intermediate">🟡 Intermediate</option>
                    <option value="Advanced">🔴 Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <DollarSign
                      className="w-4 h-4 text-[#803791]"
                      strokeWidth={2.5}
                    />
                    Individual Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.individualPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        individualPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Instructor Name
                </label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) =>
                    setFormData({ ...formData, instructor: e.target.value })
                  }
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium"
                  placeholder="e.g., John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Publication Status
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      value: "draft",
                      label: "Draft",
                      desc: "Not visible to students",
                      color: "amber",
                    },
                    {
                      value: "active",
                      label: "Active",
                      desc: "Published & visible",
                      color: "emerald",
                    },
                    {
                      value: "archived",
                      label: "Archived",
                      desc: "Hidden from view",
                      color: "slate",
                    },
                  ].map((status) => (
                    <button
                      key={status.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, status: status.value })
                      }
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                        formData.status === status.value
                          ? `border-${status.color}-500 bg-${status.color}-50 scale-105 shadow-lg`
                          : "border-slate-200 hover:border-slate-300 hover:scale-102"
                      }`}
                    >
                      <p
                        className={`font-bold ${
                          formData.status === status.value
                            ? `text-${status.color}-600`
                            : "text-slate-600"
                        }`}
                      >
                        {status.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {status.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Lessons */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-[#803791]/10 to-[#b87bd1]/10 border-2 border-[#803791]/20">
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">
                    Course Lessons
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">
                    Add video lessons to your module
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addLesson}
                  className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-2xl hover:opacity-95 transition-all font-bold flex items-center gap-2 shadow-lg hover:scale-105 duration-300"
                >
                  <Plus className="w-5 h-5" strokeWidth={2.5} />
                  Add Lesson
                </button>
              </div>

              {lessons.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Video
                      className="w-12 h-12 text-slate-400"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    No lessons yet
                  </h3>
                  <p className="text-slate-600 font-medium mb-6">
                    Click "Add Lesson" to create your first lesson
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="border-2 border-slate-200 rounded-2xl p-6 space-y-4 hover:border-[#803791]/30 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center text-white font-black shadow-lg">
                            {index + 1}
                          </div>
                          <h4 className="font-black text-slate-900 text-lg">
                            Lesson {index + 1}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLesson(index)}
                          className="text-red-600 hover:text-red-700 hover:scale-110 transition-all p-2 rounded-xl hover:bg-red-50"
                        >
                          <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <input
                            type="text"
                            placeholder="Lesson Title"
                            value={lesson.title}
                            onChange={(e) =>
                              updateLesson(index, "title", e.target.value)
                            }
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-semibold"
                          />
                        </div>
                        <div className="col-span-2">
                          <textarea
                            rows={2}
                            placeholder="Lesson Description"
                            value={lesson.description}
                            onChange={(e) =>
                              updateLesson(index, "description", e.target.value)
                            }
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium resize-none"
                          />
                        </div>
                        <select
                          value={lesson.videoProvider}
                          onChange={(e) =>
                            updateLesson(index, "videoProvider", e.target.value)
                          }
                          className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-semibold bg-white"
                        >
                          <option value="youtube">📺 YouTube</option>
                          <option value="vimeo">🎬 Vimeo</option>
                          <option value="external">🔗 External</option>
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
                          className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium"
                        />
                        <input
                          type="number"
                          placeholder="Duration (seconds)"
                          value={lesson.durationSec}
                          onChange={(e) =>
                            updateLesson(
                              index,
                              "durationSec",
                              Number(e.target.value)
                            )
                          }
                          className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#803791]/50 focus:border-[#803791] transition-all font-medium"
                        />
                        <label className="flex items-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-[#803791]/30 transition-all">
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
                            className="w-5 h-5 rounded accent-[#803791]"
                          />
                          <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Eye className="w-4 h-4" strokeWidth={2.5} />
                            Free Preview
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#803791]/10 to-[#b87bd1]/10 border-2 border-[#803791]/20">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle
                    className="w-6 h-6 text-[#803791]"
                    strokeWidth={2.5}
                  />
                  Review Your Module
                </h3>
                <p className="text-slate-600 font-medium">
                  Please review all details before creating the module
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl border-2 border-slate-200">
                  <h4 className="font-black text-slate-900 mb-4">
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 font-semibold mb-1">
                        Parent Course
                      </p>
                      <p className="font-bold text-slate-900">
                        {parentCourses.find(
                          (c) => c._id === formData.parentCourseId
                        )?.title || "Not selected"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold mb-1">
                        Module Title
                      </p>
                      <p className="font-bold text-slate-900">
                        {formData.title || "Not provided"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-500 font-semibold mb-1">
                        Description
                      </p>
                      <p className="font-medium text-slate-700">
                        {formData.description || "No description"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-2 border-slate-200">
                  <h4 className="font-black text-slate-900 mb-4">
                    Configuration
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 font-semibold mb-1">Level</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-lg font-bold text-xs ${
                          formData.level === "Beginner"
                            ? "bg-emerald-100 text-emerald-700"
                            : formData.level === "Intermediate"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {formData.level}
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold mb-1">Price</p>
                      <p className="font-bold text-slate-900">
                        ₹{formData.individualPrice}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold mb-1">
                        Status
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-lg font-bold text-xs ${
                          formData.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : formData.status === "draft"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {formData.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-2 border-slate-200">
                  <h4 className="font-black text-slate-900 mb-4">
                    Lessons ({lessons.length})
                  </h4>
                  {lessons.length === 0 ? (
                    <p className="text-slate-500 font-medium">
                      No lessons added
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 text-sm">
                              {lesson.title || `Lesson ${index + 1}`}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">
                              {lesson.videoProvider} • {lesson.durationSec}s
                            </p>
                          </div>
                          {lesson.isFreePreview && (
                            <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold">
                              Free
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div
          className="px-8 py-6 border-t border-slate-200 flex gap-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.92) 100%)",
          }}
        >
          <button
            type="button"
            onClick={currentStep === 0 ? onClose : prevStep}
            className="flex-1 px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-slate-50 transition-all font-bold flex items-center justify-center gap-2 hover:scale-105 duration-300"
          >
            {currentStep === 0 ? (
              <>
                <X className="w-5 h-5" strokeWidth={2.5} />
                Cancel
              </>
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                Previous
              </>
            )}
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-2xl hover:opacity-95 transition-all font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 duration-300"
            >
              Next Step
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl hover:opacity-95 transition-all font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
                  Create Module
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #803791, #b87bd1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #703181, #a86bc1);
        }
      `}</style>
    </div>
  );
}
