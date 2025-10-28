"use client";

import { useState, useEffect } from "react";
import {
  X,
  Edit2,
  Save,
  BookOpen,
  Video,
  ArrowLeft,
  Layers,
  FileText,
  CheckCircle2,
  AlertCircle,
  Settings,
} from "lucide-react";
import courseService from "@/services/courseService";
import CourseOverviewTab from "./CourseOverviewTab";
import CourseLessonsTab from "./CourseLessonsTab";
import CourseModulesTab from "./CourseModulesTab";

export default function CourseDetailView({ course, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [courseData, setCourseData] = useState({
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

  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);

  const isParent = course.type === "parent";
  const isModule = course.type === "module";

  useEffect(() => {
    loadCourseData();
  }, [course]);

  const loadCourseData = async () => {
    setCourseData({
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

    if (isParent && course.modules) {
      setModules(course.modules);
    }

    if (isModule && course.lessons) {
      setLessons(course.lessons);
    }
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        _id: `temp_${Date.now()}`,
        title: "",
        description: "",
        videoProvider: "youtube",
        videoId: "",
        videoUrl: "",
        durationSec: 0,
        isFreePreview: false,
        order: lessons.length,
        isNew: true,
      },
    ]);
    if (!editMode) setEditMode(true);
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updateData = {
        ...courseData,
        pricing: isParent
          ? {
              bundlePrice: pricing.bundlePrice,
              discountPercent: pricing.discountPercent,
            }
          : { individualPrice: pricing.individualPrice },
      };

      if (isModule) {
        updateData.lessons = lessons.map((lesson) => ({
          title: lesson.title,
          description: lesson.description,
          videoProvider: lesson.videoProvider,
          videoId: lesson.videoId,
          videoUrl: lesson.videoUrl,
          durationSec: lesson.durationSec,
          isFreePreview: lesson.isFreePreview,
          order: lesson.order,
        }));
      }

      await courseService.adminUpdate(course._id, updateData);
      setSuccess("Course updated successfully!");
      setEditMode(false);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-purple-500/20">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#803791] via-[#9647a8] to-[#b87bd1] px-8 py-6 flex items-center justify-between backdrop-blur-md z-10 shadow-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                {isParent ? (
                  <BookOpen className="w-7 h-7 text-white" strokeWidth={2.5} />
                ) : (
                  <Video className="w-7 h-7 text-white" strokeWidth={2.5} />
                )}
              </div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  {courseData.title || "Course Details"}
                </h2>
                <p className="text-white/80 text-sm font-semibold mt-1">
                  {isParent ? "Parent Course" : "Module Course"} •{" "}
                  {courseData.status}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white/30"
              >
                <Edit2 className="w-5 h-5" strokeWidth={2.5} />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditMode(false);
                    loadCourseData();
                  }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all duration-300 border border-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-3 bg-white text-purple-600 hover:bg-white/90 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 shadow-xl disabled:opacity-50"
                >
                  <Save className="w-5 h-5" strokeWidth={2.5} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mx-8 mt-6 bg-red-500/20 border-2 border-red-500/50 text-red-200 px-6 py-4 rounded-2xl flex items-center gap-3 animate-pulse">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}
        {success && (
          <div className="mx-8 mt-6 bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-200 px-6 py-4 rounded-2xl flex items-center gap-3 animate-pulse">
            <CheckCircle2 className="w-5 h-5" />
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="px-8 pt-6 flex gap-3 border-b border-white/10">
          {[
            { id: "overview", label: "Overview", icon: FileText },
            {
              id: "content",
              label: isParent ? "Modules" : "Lessons",
              icon: isParent ? Layers : Video,
            },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 rounded-t-2xl font-bold transition-all duration-300 flex items-center gap-2 relative ${
                  isActive
                    ? "bg-white/10 text-white border-t-4 border-purple-400"
                    : "text-white/60 hover:text-white/90 hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={2.5} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
          {activeTab === "overview" && (
            <CourseOverviewTab
              courseData={courseData}
              setCourseData={setCourseData}
              pricing={pricing}
              setPricing={setPricing}
              isParent={isParent}
              isModule={isModule}
              editMode={editMode}
              modules={modules}
              lessons={lessons}
              course={course}
            />
          )}

          {activeTab === "content" && isParent && (
            <CourseModulesTab modules={modules} />
          )}

          {activeTab === "content" && isModule && (
            <CourseLessonsTab
              lessons={lessons}
              setLessons={setLessons}
              editMode={editMode}
              addLesson={addLesson}
            />
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white flex items-center gap-3">
                <Settings className="w-7 h-7 text-purple-400" />
                Course Settings
              </h3>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <label className="block text-sm font-bold text-white/80 mb-3">
                  Status
                </label>
                {editMode ? (
                  <select
                    value={courseData.status}
                    onChange={(e) =>
                      setCourseData({ ...courseData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                ) : (
                  <p className="text-white font-semibold text-lg capitalize">
                    {courseData.status}
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-6 border border-amber-500/30">
                <h4 className="text-lg font-bold text-white mb-4">
                  Course Information
                </h4>
                <div className="space-y-3 text-white/80">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-bold capitalize">{course.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span className="font-bold">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="font-bold">
                      {new Date(course.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Course ID:</span>
                    <span className="font-mono text-xs">{course._id}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
