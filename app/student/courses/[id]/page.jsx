"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import courseService from "@/services/courseService";
import purchaseService from "@/services/purchaseService";
import { Play, Lock, CheckCircle2, ShoppingCart, ChevronRight, BookOpen, DollarSign, Star, Users, Clock, Award } from "lucide-react";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [course, setCourse] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [purchasing, setPurchasing] = useState(false);
  const [myAccess, setMyAccess] = useState([]);

  const isParent = course?.type === "parent";
  const isModule = course?.type === "module";

  const hasFullAccess = useMemo(() => {
    if (!course) return false;
    return myAccess.some((access) => 
      access.courseId?._id === course._id || 
      access.courseId?._id === course.parentCourse
    );
  }, [myAccess, course]);

  const lessons = useMemo(() => (isModule ? course?.lessons || [] : []), [course, isModule]);

  const activeLesson = useMemo(() => lessons.find((l) => l._id === activeLessonId) || lessons[0], [lessons, activeLessonId]);

  const activeModule = useMemo(() => {
    if (!isParent) return null;
    return course?.modules?.find((m) => m._id === activeModuleId) || course?.modules?.[0];
  }, [course, activeModuleId, isParent]);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [courseData, accessData] = await Promise.all([
        courseService.getById(id),
        courseService.myAccess().catch(() => []),
      ]);
      setCourse(courseData);
      setMyAccess(accessData || []);
      if (courseData?.lessons?.length) setActiveLessonId(courseData.lessons[0]._id);
      if (courseData?.modules?.length) setActiveModuleId(courseData.modules[0]._id);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  async function purchaseModule(moduleId) {
    try {
      setPurchasing(true);
      await purchaseService.create({ type: "sub_course", moduleCourseId: moduleId });
      alert("Module purchased successfully!");
      loadData();
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  }

  async function purchaseFull(courseId) {
    try {
      setPurchasing(true);
      await purchaseService.create({ type: "full_course", courseId });
      alert("Course bundle unlocked successfully!");
      loadData();
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-white/80 text-lg">Loading course...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-2xl">{error}</div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      {/* Course Header */}
      <div 
        className="relative overflow-hidden rounded-3xl p-6 md:p-8 text-white shadow-2xl backdrop-blur-xl border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(128,55,145,0.18) 0%, rgba(184,123,209,0.12) 50%, rgba(240,194,238,0.08) 100%)",
          boxShadow: "0 20px 60px rgba(128,55,145,0.15)",
        }}
      >
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{course.title}</h1>
            <p className="text-white/80 mb-4">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {course.category && (
                <span className="px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
                  {course.category}
                </span>
              )}
              {course.level && (
                <span className="px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
                  {course.level}
                </span>
              )}
              {course.instructor && (
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {course.instructor}
                </span>
              )}
              {isParent && (
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {course.modules?.length || 0} modules
                </span>
              )}
              {isModule && (
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  {course.lessons?.length || 0} lessons
                </span>
              )}
            </div>
          </div>
          {isParent && !hasFullAccess && (
            <div className="flex flex-col items-end gap-2">
              <div className="text-3xl font-black">₹{course.pricing?.bundlePrice || 0}</div>
              <button
                onClick={() => purchaseFull(course._id)}
                disabled={purchasing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-black flex items-center gap-2 hover:opacity-95 disabled:opacity-50 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" /> Buy Complete Bundle
              </button>
            </div>
          )}
          {hasFullAccess && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-xl border border-emerald-500/50">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-bold">Full Access</span>
            </div>
          )}
        </div>
      </div>

      {/* Module Type: Video Player and Lessons */}
      {isModule && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player */}
          <div className="lg:col-span-2 bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
            {activeLesson ? (
              <div className="aspect-video w-full">
                {activeLesson.videoProvider === "youtube" && activeLesson.videoId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeLesson.videoId}`}
                    title={activeLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : activeLesson.videoUrl ? (
                  <video className="w-full h-full" controls src={activeLesson.videoUrl} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <Play className="w-8 h-8" />
                    <span className="ml-2">No video available</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video w-full flex items-center justify-center text-white/60">
                Select a lesson
              </div>
            )}
            <div className="p-4 border-t border-white/10">
              <h2 className="text-white font-bold text-lg">{activeLesson?.title}</h2>
              <p className="text-white/70 text-sm mt-1">{activeLesson?.description}</p>
            </div>
          </div>

          {/* Lessons List */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 max-h-[70vh] overflow-auto">
            <h3 className="text-white font-bold text-lg mb-4">Lessons</h3>
            {lessons.length > 0 ? (
              lessons.map((lesson, idx) => (
                <button
                  key={lesson._id}
                  onClick={() => setActiveLessonId(lesson._id)}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${
                    activeLessonId === lesson._id
                      ? "bg-white/10 border border-white/20"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {lesson.isFreePreview || hasFullAccess ? (
                      <Play className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-purple-300" />
                    )}
                    <div>
                      <p className="text-white font-medium">{lesson.title}</p>
                      {lesson.isFreePreview && !hasFullAccess && (
                        <p className="text-xs text-emerald-400">Free preview</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/50" />
                </button>
              ))
            ) : (
              <div className="text-white/60 text-center py-4">No lessons available</div>
            )}
          </div>
        </div>
      )}

      {/* Parent Type: Modules Grid */}
      {isParent && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Course Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((module) => {
                const hasModuleAccess = myAccess.some((access) => access.courseId?._id === module._id);
                return (
                  <div
                    key={module._id}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                  >
                    <div className="aspect-video bg-black/30 relative">
                      {module.thumbnail ? (
                        <img src={module.thumbnail} alt={module.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/60">
                          <BookOpen className="w-8 h-8" />
                        </div>
                      )}
                      {hasModuleAccess && (
                        <div className="absolute top-2 right-2">
                          <span className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs font-bold">
                            Unlocked
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="text-white font-bold text-lg">{module.title}</h3>
                      <p className="text-white/70 text-sm">{module.description}</p>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Play className="w-4 h-4" />
                        {module.lessons?.length || 0} lessons
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-white font-bold text-xl">
                          ₹{module.pricing?.individualPrice ?? 0}
                        </span>
                        {hasFullAccess || hasModuleAccess ? (
                          <button
                            onClick={() => router.push(`/student/courses/${module._id}`)}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white flex items-center gap-2 hover:opacity-95"
                          >
                            <Play className="w-4 h-4" /> Start Learning
                          </button>
                        ) : (
                          <button
                            onClick={() => purchaseModule(module._id)}
                            disabled={purchasing}
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center gap-2 disabled:opacity-50"
                          >
                            <ShoppingCart className="w-4 h-4" /> Buy Module
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-12 text-white/60">No modules available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
