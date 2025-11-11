"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import courseService from "@/services/courseService";
import purchaseService from "@/services/purchaseService";
import { studentService } from "@/services/studentService";
import {
  Play,
  Lock,
  CheckCircle2,
  ShoppingCart,
  ChevronRight,
  BookOpen,
  DollarSign,
  Star,
  Users,
  Clock,
  Award,
  Target,
  Crown,
  Zap,
} from "lucide-react";
import { enrollInCourse, checkEnrollmentStatus } from "@/services/enrollmentService";
import { customToast } from "@/components/ui/toast";
import { triggerSuccessAnimation } from "@/utils/successAnimations";

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
  const [isPro, setIsPro] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const isParent = course?.type === "parent";
  const isModule = course?.type === "module";

  const hasFullAccess = useMemo(() => {
    if (!course) return false;
    if (isPro) return true;
    // Check enrollment status or legacy access
    if (isEnrolled) return true;
    return myAccess.some(
      (access) =>
        access.courseId?._id === course._id ||
        access.courseId?._id === course.parentCourse
    );
  }, [myAccess, course, isPro, isEnrolled]);

  // Check if course is free
  const isFree = useMemo(() => {
    if (!course) return false;
    return Number(course.bundlePrice || course.pricing?.bundlePrice || 0) === 0;
  }, [course]);

  const lessons = useMemo(
    () => (isModule ? course?.lessons || [] : []),
    [course, isModule]
  );

  const activeLesson = useMemo(
    () => lessons.find((l) => l._id === activeLessonId) || lessons[0],
    [lessons, activeLessonId]
  );

  const activeModule = useMemo(() => {
    if (!isParent) return null;
    return (
      course?.modules?.find((m) => m._id === activeModuleId) ||
      course?.modules?.[0]
    );
  }, [course, activeModuleId, isParent]);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [courseData, accessData, profileRes, enrollmentCheck] = await Promise.all([
        courseService.getById(id),
        courseService.myAccess().catch(() => []),
        studentService.getProfile().catch(() => null),
        checkEnrollmentStatus(id).catch(() => ({ data: { isEnrolled: false } })),
      ]);
      setCourse(courseData);
      setMyAccess(accessData || []);
      setIsEnrolled(enrollmentCheck?.data?.isEnrolled || false);
      
      const studentData =
        profileRes?.data || profileRes?.data?.data || profileRes?.data;
      const plan = (
        studentData?.plan ||
        studentData?.data?.plan ||
        "free"
      ).toLowerCase();
      setIsPro(plan === "pro");
      if (courseData?.lessons?.length)
        setActiveLessonId(courseData.lessons[0]._id);
      if (courseData?.modules?.length)
        setActiveModuleId(courseData.modules[0]._id);
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to load course"
      );
    } finally {
      setLoading(false);
    }
  };

  async function handleEnroll() {
    if (enrolling || hasFullAccess) return;
    
    try {
      setEnrolling(true);
      await enrollInCourse(id);
      
      triggerSuccessAnimation({ type: "achievement" });
      customToast.success("Enrolled successfully!", `Welcome to ${course.title}! Start learning now.`);
      
      setIsEnrolled(true);
      loadData();
    } catch (error) {
      console.error("Enrollment error:", error);
      customToast.error("Enrollment failed", error.response?.data?.message || error.message || "Please try again");
    } finally {
      setEnrolling(false);
    }
  }

  async function purchaseModule(moduleId) {
    try {
      setPurchasing(true);
      const response = await purchaseService.create({
        type: "sub_course",
        moduleCourseId: moduleId,
      });
      
      triggerSuccessAnimation({ type: "achievement" });
      customToast.success("Module purchased!", "You now have access to this module.");
      
      // Purchase automatically creates enrollment on backend
      setIsEnrolled(true);
      loadData();
    } catch (e) {
      customToast.error("Purchase failed", e?.response?.data?.message || e.message || "Please try again");
    } finally {
      setPurchasing(false);
    }
  }

  async function purchaseFull(courseId) {
    try {
      setPurchasing(true);
      const response = await purchaseService.create({ type: "full_course", courseId });
      
      triggerSuccessAnimation({ type: "achievement" });
      customToast.success("Course unlocked!", "You now have full access to all content.");
      
      // Purchase automatically creates enrollment on backend
      setIsEnrolled(true);
      loadData();
    } catch (e) {
      customToast.error("Purchase failed", e?.response?.data?.message || e.message || "Please try again");
    } finally {
      setPurchasing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
        <div className="text-white/80 text-base sm:text-lg">Loading course...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 sm:p-6">
        <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base">
          {error}
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6">
      {/* Premium Course Header */}
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 text-white shadow-xl sm:shadow-2xl backdrop-blur-xl border border-white/10 group transition-all duration-500 hover:shadow-purple-500/30"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.18) 0%, rgba(184,123,209,0.12) 50%, rgba(240,194,238,0.08) 100%)",
          boxShadow:
            "0 25px 60px rgba(128,55,145,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute -top-5 -right-5 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-5 -left-5 sm:-bottom-10 sm:-left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-pink-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-5 md:gap-6">
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Course Icon */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-300" />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3 leading-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  {course.title}
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Enhanced Course Meta */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {course.category && (
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm border border-white/20 text-white font-semibold flex items-center gap-1.5 sm:gap-2 hover:bg-white/20 transition-colors">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  {course.category}
                </span>
              )}
              {course.level && (
                <span
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl backdrop-blur-sm border font-semibold ${
                    course.level === "Beginner"
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : course.level === "Intermediate"
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                  }`}
                >
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5 sm:mr-2" />
                  {course.level}
                </span>
              )}
              {course.instructor && (
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm border border-white/20 text-white font-semibold flex items-center gap-1.5 sm:gap-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  {course.instructor}
                </span>
              )}
              {isParent && (
                <span className="px-4 py-2 bg-purple-500/15 rounded-xl backdrop-blur-sm border border-purple-500/30 text-purple-300 font-semibold flex items-center gap-2">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                  {course.modules?.length || 0} modules
                </span>
              )}
              {isModule && (
                <span className="px-4 py-2 bg-emerald-500/15 rounded-xl backdrop-blur-sm border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-2">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                  {course.lessons?.length || 0} lessons
                </span>
              )}
              {course.rating && (
                <span className="px-4 py-2 bg-yellow-500/15 rounded-xl backdrop-blur-sm border border-yellow-500/30 text-yellow-300 font-semibold flex items-center gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400" />
                  {course.rating}
                </span>
              )}
            </div>

            {/* Course Progress Bar (for enrolled users) */}
            {hasFullAccess && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 font-semibold">
                    Your Progress
                  </span>
                  <span className="text-white font-bold">0%</span>{" "}
                  {/* This would be dynamic */}
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700 shadow-lg"
                    style={{ width: "0%" }} // This would be dynamic based on actual progress
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-white/60">
                  <span>0 lessons completed</span>
                  <span>
                    {isModule
                      ? course.lessons?.length || 0
                      : "Multiple modules"}{" "}
                    total
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Professional Header Button Logic */}
          {isPro ? (
            // Pro users - show badge only
            <div className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg sm:rounded-xl border border-yellow-500/50">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg">
                  Pro Member
                </div>
                <div className="text-white/80 text-sm">
                  Full Access Included
                </div>
              </div>
            </div>
          ) : hasFullAccess ? (
            // Enrolled users - show access badge
            <div className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-emerald-500/20 rounded-xl border border-emerald-500/50">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              <div className="text-center">
                <div className="text-emerald-400 font-bold text-lg">
                  Enrolled
                </div>
                <div className="text-white/80 text-sm">
                  Full Access
                </div>
              </div>
            </div>
          ) : isFree ? (
            // Free course - show enroll button
            <div className="flex flex-col items-end gap-2 sm:gap-3">
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black flex items-center gap-2 hover:opacity-95 disabled:opacity-50 shadow-lg hover:scale-105 transition-all"
              >
                {enrolling ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    Enrolling...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Enroll Free
                  </>
                )}
              </button>
            </div>
          ) : (
            // Paid course - show buy bundle button
            <div className="flex flex-col items-end gap-2 sm:gap-3">
              <div className="text-2xl sm:text-3xl font-black text-white">
                ₹{course.bundlePrice || course.pricing?.bundlePrice || 0}
              </div>
              <button
                onClick={() => purchaseFull(course._id)}
                disabled={purchasing}
                className="px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-black flex items-center gap-2 hover:opacity-95 disabled:opacity-50 shadow-lg hover:scale-105 transition-all"
              >
                {purchasing ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Buy Complete Bundle
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Module Type: Video Player and Lessons */}
      {isModule && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Premium Video Player */}
          <div
            className="lg:col-span-2 relative rounded-2xl sm:rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-white/10 backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%)",
              boxShadow:
                "0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {activeLesson ? (
              <div className="aspect-video w-full relative group">
                {/* Video Content or Premium Lock */}
                {activeLesson.isFreePreview || hasFullAccess ? (
                  // Show actual video for free preview or full access
                  <>
                    {activeLesson.videoProvider === "youtube" &&
                    activeLesson.videoId ? (
                      <iframe
                        className="w-full h-full rounded-t-3xl"
                        src={`https://www.youtube.com/embed/${activeLesson.videoId}`}
                        title={activeLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : activeLesson.videoUrl ? (
                      <video
                        className="w-full h-full rounded-t-3xl"
                        controls
                        src={activeLesson.videoUrl}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/60 bg-black/50">
                        <Play className="w-12 h-12" />
                        <span className="ml-3 text-lg">No video available</span>
                      </div>
                    )}
                  </>
                ) : (
                  // Show premium lock overlay for locked content
                  <div className="w-full h-full relative">
                    {/* Blurred preview background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/60 to-pink-900/30 backdrop-blur-sm" />

                    {/* Premium Lock Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-6">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse" />
                        <div className="relative p-6 rounded-full bg-gradient-to-r from-[#803791] to-[#b87bd1] shadow-2xl">
                          <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          Premium Content
                        </h3>
                        <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
                          Unlock this lesson and access all premium content with
                          our Pro plan
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => router.push("/student/upgrade")}
                          className="group px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-black shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3"
                        >
                          <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          Upgrade to Pro
                        </button>

                        {isModule && !isPro && (
                          <button
                            onClick={() => purchaseModule(course._id)}
                            disabled={purchasing}
                            className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-3 disabled:opacity-50"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            Buy This Module
                          </button>
                        )}
                      </div>

                      <div className="text-sm text-white/60">
                        <span className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          Join thousands of students already learning
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Premium Badge for Free Preview */}
                {activeLesson.isFreePreview && !hasFullAccess && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-xl text-white rounded-xl text-sm font-bold shadow-lg border border-emerald-400/30">
                      🎁 Free Preview
                    </span>
                  </div>
                )}

                {/* Full Access Badge */}
                {hasFullAccess && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-4 py-2 bg-purple-500/90 backdrop-blur-xl text-white rounded-xl text-sm font-bold shadow-lg border border-purple-400/30 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Pro Access
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video w-full flex items-center justify-center text-white/60 bg-gradient-to-br from-gray-900/50 to-black/50">
                <div className="text-center space-y-3">
                  <Play className="w-16 h-16 mx-auto text-white/40" />
                  <span className="text-xl font-medium">
                    Select a lesson to start learning
                  </span>
                </div>
              </div>
            )}
            {/* Enhanced Lesson Info Panel */}
            <div className="p-4 sm:p-5 md:p-6 border-t border-white/10 bg-gradient-to-r from-black/40 to-black/60 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <h2 className="text-white font-black text-base sm:text-lg md:text-xl leading-tight">
                    {activeLesson?.title}
                  </h2>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    {activeLesson?.description}
                  </p>

                  {/* Lesson Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-white/60 mt-3">
                    {activeLesson?.duration && (
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {activeLesson.duration} min
                      </span>
                    )}
                    {activeLesson?.difficulty && (
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold">
                        {activeLesson.difficulty}
                      </span>
                    )}
                  </div>
                </div>

                {/* Lesson Status */}
                <div className="flex flex-col items-end gap-2 sm:gap-3">
                  {activeLesson?.isFreePreview || hasFullAccess ? (
                    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold text-sm">
                        Available
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 rounded-xl border border-purple-500/30">
                      <Lock className="w-5 h-5 text-purple-400" />
                      <span className="text-purple-400 font-bold text-sm">
                        Premium
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Lessons List */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-white/10 backdrop-blur-xl max-h-[70vh]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              boxShadow:
                "0 25px 50px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 md:p-6 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-black text-base sm:text-lg md:text-xl flex items-center gap-3">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  Course Lessons
                </h3>
                <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20">
                  <span className="text-white/80 font-bold text-sm">
                    {
                      lessons.filter((l) => l.isFreePreview || hasFullAccess)
                        .length
                    }
                    /{lessons.length} Available
                  </span>
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="p-4 space-y-2 overflow-auto max-h-[50vh] custom-scrollbar">
              {lessons.length > 0 ? (
                lessons.map((lesson, idx) => {
                  const isAccessible = lesson.isFreePreview || hasFullAccess;
                  const isActive = activeLessonId === lesson._id;

                  return (
                    <button
                      key={lesson._id}
                      onClick={() => setActiveLessonId(lesson._id)}
                      className={`group w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 border relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/40 shadow-lg shadow-purple-500/20"
                          : "hover:bg-white/8 border-white/10 hover:border-white/20 hover:shadow-lg"
                      }`}
                    >
                      {/* Background Gradient on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 rounded-2xl" />

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Lesson Number */}
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center text-sm font-black transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                : "bg-white/10 text-white/70 group-hover:bg-white/20"
                            }`}
                          >
                            {idx + 1}
                          </div>

                          {/* Status Icon */}
                          <div
                            className={`p-2 rounded-xl transition-all duration-300 ${
                              isAccessible
                                ? "bg-emerald-500/20 border border-emerald-500/30"
                                : "bg-purple-500/20 border border-purple-500/30"
                            }`}
                          >
                            {isAccessible ? (
                              <Play className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Lock className="w-4 h-4 text-purple-400" />
                            )}
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-base leading-tight group-hover:text-purple-200 transition-colors">
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              {lesson.isFreePreview && !hasFullAccess && (
                                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/30">
                                  🎁 Free Preview
                                </span>
                              )}
                              {lesson.duration && (
                                <span className="text-white/60 text-xs flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration}m
                                </span>
                              )}
                              {!isAccessible && (
                                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/30">
                                  Pro Only
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight
                          className={`w-5 h-5 transition-all duration-300 ${
                            isActive
                              ? "text-purple-400 translate-x-1"
                              : "text-white/50 group-hover:text-white/80 group-hover:translate-x-1"
                          }`}
                        />
                      </div>

                      {/* Progress Bar (if lesson is completed) */}
                      {isAccessible && (
                        <div className="mt-3 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: "0%" }} // This would be dynamic based on actual progress
                          />
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-12 space-y-4">
                  <BookOpen className="w-16 h-16 text-white/30 mx-auto" />
                  <div className="text-white/60 text-lg font-medium">
                    No lessons available
                  </div>
                  <p className="text-white/40 text-sm">
                    Check back later for new content
                  </p>
                </div>
              )}
            </div>

            {/* Footer with Course Progress */}
            {lessons.length > 0 && (
              <div className="p-4 border-t border-white/10 bg-gradient-to-r from-black/20 to-black/40">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70 font-medium">
                    Course Progress
                  </span>
                  <span className="text-white font-bold">
                    {Math.round(
                      (lessons.filter((l) => l.isFreePreview || hasFullAccess)
                        .length /
                        lessons.length) *
                        100
                    )}
                    % Available
                  </span>
                </div>
                <div className="mt-2 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${
                        (lessons.filter((l) => l.isFreePreview || hasFullAccess)
                          .length /
                          lessons.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Premium Parent Type: Modules Grid */}
      {isParent && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                <BookOpen className="w-8 h-8 text-purple-300" />
              </div>
              Course Modules
            </h2>
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20">
              <span className="text-white/80 font-bold">
                {course.modules?.filter((m) => {
                  const isFreeModule =
                    Number(m?.pricing?.individualPrice || 0) === 0;
                  return (
                    isPro ||
                    isFreeModule ||
                    myAccess.some((access) => access.courseId?._id === m._id)
                  );
                }).length || 0}
                /{course.modules?.length || 0} Unlocked
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((module, index) => {
                const isFreeModule =
                  Number(module?.pricing?.individualPrice || 0) === 0;
                const hasModuleAccess =
                  isPro ||
                  isFreeModule ||
                  myAccess.some(
                    (access) => access.courseId?._id === module._id
                  );

                return (
                  <div
                    key={module._id}
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/30 cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Background Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl pointer-events-none" />

                    {/* Module Image */}
                    <div className="relative overflow-hidden h-40 sm:h-44 md:h-48">
                      {module.thumbnail ? (
                        <img
                          src={module.thumbnail}
                          alt={module.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                          <BookOpen className="w-16 h-16 text-white/40" />
                        </div>
                      )}

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                      {/* Access Status Badge */}
                      <div className="absolute top-4 right-4">
                        {hasModuleAccess ? (
                          <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-xl text-white rounded-xl text-sm font-bold shadow-lg border border-emerald-400/30 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Unlocked
                          </span>
                        ) : (
                          <span className="px-4 py-2 bg-purple-500/90 backdrop-blur-xl text-white rounded-xl text-sm font-bold shadow-lg border border-purple-400/30 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Premium
                          </span>
                        )}
                      </div>

                      {/* Free Badge */}
                      {isFreeModule && (
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-xl text-white rounded-xl text-sm font-bold shadow-lg border border-emerald-400/30">
                            🎁 Free
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Module Content */}
                    <div className="relative p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-white font-black text-base sm:text-lg md:text-xl leading-tight group-hover:text-purple-200 transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-white/70 text-sm mt-2 leading-relaxed line-clamp-2">
                          {module.description}
                        </p>
                      </div>

                      {/* Module Stats */}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/20 text-white/80 font-semibold">
                          <Play className="w-4 h-4 text-purple-400" />
                          {module.lessons?.length || 0} lessons
                        </span>
                        {module.duration && (
                          <span className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/20 text-white/80 font-semibold">
                            <Clock className="w-4 h-4 text-blue-400" />
                            {module.duration}
                          </span>
                        )}
                      </div>

                      {/* Progress Bar (if accessible) */}
                      {hasModuleAccess && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/70">Progress</span>
                            <span className="text-white font-bold">0%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700"
                              style={{ width: "0%" }} // This would be dynamic
                            />
                          </div>
                        </div>
                      )}

                      {/* Price and Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="text-left">
                          <span className="text-2xl sm:text-3xl font-black text-white">
                            ₹{module.pricing?.individualPrice ?? 0}
                          </span>
                          {isFreeModule && (
                            <div className="text-emerald-400 text-sm font-bold">
                              Free Module
                            </div>
                          )}
                        </div>

                        {hasFullAccess || hasModuleAccess ? (
                          <button
                            onClick={() =>
                              router.push(`/student/courses/${module._id}`)
                            }
                            className="group/btn px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-black shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3"
                          >
                            <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                            Start Learning
                          </button>
                        ) : !isPro ? (
                          <button
                            onClick={() => purchaseModule(module._id)}
                            disabled={purchasing}
                            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-3 disabled:opacity-50 hover:scale-105"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            {purchasing ? "Processing..." : "Buy Module"}
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg sm:rounded-xl border border-yellow-500/30">
                            <Crown className="w-5 h-5 text-yellow-400" />
                            <span className="text-yellow-400 font-bold text-sm">
                              Pro Access
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-16 space-y-4">
                <BookOpen className="w-20 h-20 text-white/30 mx-auto" />
                <div className="text-white/60 text-xl font-medium">
                  No modules available
                </div>
                <p className="text-white/40">
                  This course is still being prepared. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Premium Custom Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #803791, #b87bd1);
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(128, 55, 145, 0.3);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #9d4baa, #c993d8);
          box-shadow: 0 4px 20px rgba(128, 55, 145, 0.5);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(128, 55, 145, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(128, 55, 145, 0.6),
              0 0 60px rgba(184, 123, 209, 0.4);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
