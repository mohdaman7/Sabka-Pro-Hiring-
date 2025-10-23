"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import courseService from "@/services/courseService";
import purchaseService from "@/services/purchaseService";
import { Play, Lock, CheckCircle2, ShoppingCart, ChevronRight } from "lucide-react";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [course, setCourse] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  const isParent = course?.type === "parent";
  const isModule = course?.type === "module";

  const lessons = useMemo(() => (isModule ? course?.lessons || [] : []), [course, isModule]);

  const activeLesson = useMemo(() => lessons.find((l) => l._id === activeLessonId) || lessons[0], [lessons, activeLessonId]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = await courseService.getById(id);
        if (!mounted) return;
        setCourse(data);
        if (data?.lessons?.length) setActiveLessonId(data.lessons[0]._id);
      } catch (e) {
        setError(e?.response?.data?.message || e.message || "Failed to load course");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (id) load();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function purchaseModule(moduleId) {
    try {
      setPurchasing(true);
      const result = await purchaseService.create({ type: "sub_course", moduleCourseId: moduleId });
      alert("Purchase successful");
      // Reload course to get unlocked lessons
      const data = await courseService.getById(id);
      setCourse(data);
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  }

  async function purchaseFull(courseId) {
    try {
      setPurchasing(true);
      const result = await purchaseService.create({ type: "full_course", courseId });
      alert("Bundle unlocked successfully");
      const data = await courseService.getById(id);
      setCourse(data);
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  }

  if (loading) return <div className="p-6 text-white/80">Loading...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;
  if (!course) return null;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">{course.title}</h1>
            {course.type === "parent" ? (
              <p className="text-white/70 mt-1">Complete bundle • {course.moduleCount ?? course.modules?.length || 0} modules</p>
            ) : (
              <p className="text-white/70 mt-1">{course.lessons?.length || 0} lessons</p>
            )}
          </div>
          {isParent ? (
            <button
              onClick={() => purchaseFull(course._id)}
              disabled={purchasing}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-black flex items-center gap-2 hover:opacity-95"
            >
              <ShoppingCart className="w-5 h-5" /> Buy Full Course
            </button>
          ) : null}
        </div>
      </div>

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
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <Play className="w-8 h-8" />
                    <span className="ml-2">No video</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video w-full flex items-center justify-center text-white/60">Select a lesson</div>
            )}
            <div className="p-4 border-t border-white/10">
              <h2 className="text-white font-bold text-lg">{activeLesson?.title}</h2>
              <p className="text-white/70 text-sm mt-1">{activeLesson?.description}</p>
            </div>
          </div>

          {/* Lessons */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 max-h-[70vh] overflow-auto">
            {lessons.map((lesson) => (
              <button
                key={lesson._id}
                onClick={() => setActiveLessonId(lesson._id)}
                className={`w-full text-left p-3 rounded-xl flex items-center justify-between ${
                  activeLessonId === lesson._id ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  {lesson.isFreePreview ? (
                    <Play className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-purple-300" />
                  )}
                  <div>
                    <p className="text-white font-medium">{lesson.title}</p>
                    {lesson.isFreePreview && <p className="text-xs text-emerald-400">Free preview</p>}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/50" />
              </button>
            ))}
          </div>
        </div>
      )}

      {isParent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.modules?.map((m) => (
            <div key={m._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-black/30">
                {m.thumbnail ? (
                  <img src={m.thumbnail} alt={m.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <Play className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-white font-bold text-lg">{m.title}</h3>
                <p className="text-white/70 text-sm">{m.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-white/80 font-bold">₹{m?.pricing?.individualPrice ?? 0}</span>
                  <button
                    onClick={() => purchaseModule(m._id)}
                    disabled={purchasing}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Buy Module
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
