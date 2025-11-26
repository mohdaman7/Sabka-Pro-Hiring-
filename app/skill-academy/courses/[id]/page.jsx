"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import courseService from "@/services/courseService";
import purchaseService from "@/services/purchaseService";
import { customToast } from "@/components/ui/toast";
import { triggerSuccessAnimation } from "@/utils/successAnimations";
import { handleApiError } from "@/utils/globalErrorHandler";
import VideoPlayer from "@/components/ui/VideoPlayer";
import {
  ChevronDown,
  Play,
  Clock,
  Star,
  Lock,
  Award,
  Users,
  BookOpen,
  Share2,
  Heart,
  TrendingUp,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";

const isValidObjectId = (value) =>
  typeof value === "string" && /^[0-9a-fA-F]{24}$/.test(value);

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [courseData, setCourseData] = useState(null);
  const [modules, setModules] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchasingBundle, setPurchasingBundle] = useState(false);
  const [purchasingModuleId, setPurchasingModuleId] = useState(null);
  const [myAccess, setMyAccess] = useState([]);
  const [userEmail, setUserEmail] = useState("user@sabka.com");

  // Get user email from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("skillAcademyUser");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserEmail(user.email || "user@sabka.com");
        } catch (e) {
          setUserEmail("user@sabka.com");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!id) return;

    if (!isValidObjectId(id)) {
      setError(
        "Invalid course link. Please open this course from the Skill Academy courses list again."
      );
      setLoading(false);
      return;
    }

    const loadCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await courseService.getById(id);
        if (!data) {
          setError("Course not found.");
          return;
        }

        setCourseData(data);

        if (data.type === "parent") {
          setModules(Array.isArray(data.modules) ? data.modules : []);
        } else {
          setModules([data]);
        }

        try {
          const access = await courseService.myAccess();
          setMyAccess(access || []);
        } catch {
          setMyAccess([]);
        }
      } catch (err) {
        const message = handleApiError(err, "Loading course");
        setError(
          message || "Failed to load course. Please refresh and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const calculateTotals = () => {
    const totalLessons = modules.reduce(
      (sum, mod) => sum + (mod?.lessons?.length || 0),
      0
    );
    const totalDurationSec = modules.reduce(
      (sum, mod) =>
        sum +
        (mod?.lessons?.reduce((ls, l) => ls + (l?.durationSec || 0), 0) || 0),
      0
    );
    const hours = Math.floor(totalDurationSec / 3600);
    const minutes = Math.floor((totalDurationSec % 3600) / 60);
    return {
      totalLessons,
      totalDuration: `${hours}h ${minutes}m`,
      totalDurationSec,
    };
  };

  const totals = calculateTotals();

  const isParentCourse = courseData?.type === "parent";

  const bundlePrice = Number(courseData?.pricing?.bundlePrice || 0);
  const isFreeBundle = bundlePrice === 0;

  const sumModulePrice =
    Array.isArray(modules) && modules.length > 0
      ? modules.reduce(
          (sum, m) => sum + Number(m?.pricing?.individualPrice || 0),
          0
        )
      : 0;

  const finalPrice = bundlePrice;
  let originalPrice = null;
  let discountPercentLabel = null;

  if (!isFreeBundle && sumModulePrice > bundlePrice && sumModulePrice > 0) {
    originalPrice = sumModulePrice;
    const computedDiscount = Math.round(
      ((sumModulePrice - bundlePrice) / sumModulePrice) * 100
    );
    if (computedDiscount > 0) {
      discountPercentLabel = `${computedDiscount}% OFF`;
    }
  }

  const currency = "₹";

  const bundleAccessTypes = ["full_course", "bundle", "admin_grant", "gift"];
  const moduleAccessTypes = ["sub_course", "admin_grant", "gift"];

  const hasFullBundleAccess =
    !!courseData &&
    myAccess.some(
      (access) =>
        access.courseId?._id === courseData._id &&
        bundleAccessTypes.includes(access.accessType)
    );

  const ownedModuleIds = new Set(
    myAccess
      .filter(
        (access) =>
          access.courseId &&
          moduleAccessTypes.includes(access.accessType) &&
          (!courseData ||
            access.courseId.parentCourse === courseData._id ||
            courseData.type !== "parent")
      )
      .map((access) => access.courseId._id)
  );

  const rating = typeof courseData?.rating === "number" ? courseData.rating : 0;
  const ratingLabel = rating.toFixed(1);
  const enrolledLabel = (courseData?.enrolledCount || 0).toLocaleString(
    "en-IN"
  );
  const tags = Array.isArray(courseData?.tags) ? courseData.tags : [];
  const instructorName = courseData?.instructor || "Instructor";
  const instructorInitial = instructorName.charAt(0) || "I";
  const levelLabel = courseData?.level || "All levels";
  const categoryLabel = courseData?.category || "General";

  const handleBundleAction = async () => {
    if (!courseData || purchasingBundle) return;

    if (hasFullBundleAccess || isFreeBundle) {
      router.push(`/student/courses/${courseData._id}`);
      return;
    }

    try {
      setPurchasingBundle(true);
      await purchaseService.create({
        type: "full_course",
        courseId: courseData._id,
      });

      triggerSuccessAnimation({ type: "achievement" });
      customToast.success(
        "Course unlocked!",
        "You now have full access to all modules."
      );

      router.push(`/student/courses/${courseData._id}`);
    } catch (error) {
      handleApiError(error, "Purchase Course");
    } finally {
      setPurchasingBundle(false);
    }
  };

  const handleModulePurchase = async (moduleId, isFreeModule) => {
    if (!moduleId || purchasingModuleId === moduleId) return;

    if (isFreeModule) {
      router.push(`/student/courses/${moduleId}`);
      return;
    }

    try {
      setPurchasingModuleId(moduleId);
      await purchaseService.create({
        type: "sub_course",
        moduleCourseId: moduleId,
      });

      triggerSuccessAnimation({ type: "achievement" });
      customToast.success(
        "Module purchased!",
        "You now have access to this module."
      );

      router.push(`/student/courses/${moduleId}`);
    } catch (error) {
      handleApiError(error, "Purchase Module");
    } finally {
      setPurchasingModuleId(null);
    }
  };

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60);
    return m > 0 ? `${m}min` : `${sec}sec`;
  };

  const toggleModule = (id) =>
    setExpandedModule((prev) => (prev === id ? null : id));

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#3d1642] via-[#2a1138] to-[#4a1f52]" />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-white/80 text-base md:text-lg">
            Loading course...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative">
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#3d1642] via-[#2a1138] to-[#4a1f52]" />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="max-w-md w-full bg-red-500/10 border border-red-500/40 text-white px-4 py-3 rounded-xl text-sm md:text-base">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#3d1642] via-[#2a1138] to-[#4a1f52]" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-l from-[#9463a8]/30 to-[#692c7a]/15 rounded-full blur-3xl animate-pulse" />
      </div>
      {/* main content placed above page background */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left (main) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            {courseData?.videoUrl && (
              <div className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-2xl">
                <VideoPlayer
                  videoUrl={courseData.videoUrl}
                  title={courseData.title}
                  duration={totals.totalDurationSec}
                  thumbnail={courseData.thumbnail}
                  userEmail={userEmail}
                />
              </div>
            )}

            {/* Course header */}
            <div className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-2xl">
              <div className="relative h-64 md:h-80 overflow-hidden bg-[#2a1138]">
                <img
                  src={
                    courseData.thumbnail ||
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" ||
                    "/placeholder.svg"
                  }
                  alt={courseData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a1138] via-[#4a1f52]/60 to-transparent" />

                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button className="p-2.5 bg-white/8 backdrop-blur-xl rounded-lg border border-white/10 hover:bg-white/14 transition-all">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2.5 bg-white/8 backdrop-blur-xl rounded-lg border border-white/10 hover:bg-white/14 transition-all group">
                    <Heart className="w-5 h-5 text-white group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-[#692c7a]/20 border border-[#9463a8]/30 rounded-lg text-xs font-semibold text-[#e9d5ff]">
                    {levelLabel}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-semibold text-blue-300">
                    {categoryLabel}
                  </span>

                  {hasFullBundleAccess && (
                    <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-xs font-semibold text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      You own this bundle
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  {courseData.title}
                </h1>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                  {courseData.description}
                </p>

                <div className="flex items-center gap-4 flex-wrap mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-700 text-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {ratingLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{enrolledLabel} students</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 hover:border-[#9463a8]/30 hover:text-[#e9d5ff] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Course includes */}
            <div className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/8 p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4">
                Course Includes
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#692c7a]/10 rounded-lg flex items-center justify-center border border-[#9463a8]/20">
                    <Clock className="w-5 h-5 text-[#e9d5ff]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {totals.totalDuration}
                    </p>
                    <p className="text-xs text-gray-300">Total duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-400/20">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {totals.totalLessons} Lessons
                    </p>
                    <p className="text-xs text-gray-300">Video content</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-400/20">
                    <Award className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Certificate
                    </p>
                    <p className="text-xs text-gray-300">On completion</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center border border-pink-400/20">
                    <TrendingUp className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Lifetime Access
                    </p>
                    <p className="text-xs text-gray-300">Learn at your pace</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/8 p-6 shadow-2xl">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-1">
                  Course Content
                </h2>
                <p className="text-sm text-gray-300">
                  {modules.length} modules • {totals.totalLessons} lessons •{" "}
                  {totals.totalDuration}
                </p>
              </div>

              <div className="space-y-3">
                {modules.map((mod, idx) => {
                  const dur =
                    mod.lessons?.reduce(
                      (s, l) => s + (l.durationSec || 0),
                      0
                    ) || 0;
                  const h = Math.floor(dur / 3600);
                  const m = Math.floor((dur % 3600) / 60);
                  const fmt = h > 0 ? `${h}h ${m}m` : `${m}m`;
                  const exp = expandedModule === mod._id;

                  const modulePrice = Number(
                    mod?.pricing?.individualPrice || 0
                  );
                  const isFreeModule = modulePrice === 0;
                  const isOwnedModule =
                    hasFullBundleAccess || ownedModuleIds.has(mod._id);

                  return (
                    <div
                      key={mod._id}
                      className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
                    >
                      <button
                        onClick={() => toggleModule(mod._id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 text-left">
                          <div className="w-10 h-10 bg-[#692c7a]/20 rounded-lg flex items-center justify-center border border-[#9463a8]/30 flex-shrink-0">
                            <span className="text-sm font-bold text-[#e9d5ff]">
                              {idx + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white mb-1">
                              {mod.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-[13px] text-gray-100">
                              <span className="font-medium">
                                {mod.lessons?.length || 0} lessons
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-100">{fmt}</span>
                              {!isFreeModule && modulePrice > 0 && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <span className="font-semibold text-amber-300">
                                    {currency}
                                    {modulePrice.toLocaleString("en-IN")}
                                  </span>
                                </>
                              )}
                              {isFreeModule && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-emerald-300 font-semibold">
                                    Free module
                                  </span>
                                </>
                              )}
                              {isOwnedModule && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-emerald-300 font-semibold flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Owned
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                            exp ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div className="px-4 pb-3 flex items-center justify-between border-t border-white/5">
                        <span className="text-xs text-gray-300">
                          {isOwnedModule
                            ? "You already own this module"
                            : isFreeModule
                            ? "This module is free"
                            : `Module price: ₹${modulePrice.toLocaleString(
                                "en-IN"
                              )}`}
                        </span>
                        <button
                          onClick={() => {
                            if (isOwnedModule) {
                              router.push(`/student/courses/${mod._id}`);
                              return;
                            }
                            handleModulePurchase(mod._id, isFreeModule);
                          }}
                          disabled={
                            purchasingModuleId === mod._id || isOwnedModule
                          }
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-xs font-semibold text-[#111827] flex items-center gap-1.5 border border-amber-300/70 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:shadow-amber-500/40"
                        >
                          {isOwnedModule ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              Go to Module
                            </>
                          ) : purchasingModuleId === mod._id ? (
                            <>
                              <ShoppingCart className="w-3 h-3 animate-spin" />
                              Processing...
                            </>
                          ) : isFreeModule ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              Start Free Module
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3 h-3" />
                              Buy Module
                            </>
                          )}
                        </button>
                      </div>

                      {exp && mod.lessons && (
                        <div className="px-4 pb-4 space-y-2 border-t border-white/5">
                          {mod.lessons
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((l) => {
                              const locked = !l.isFreePreview;
                              return (
                                <div
                                  key={l._id}
                                  onClick={() => {
                                    if (!locked) {
                                      router.push(
                                        `/skill-academy/courses/${id}/lesson/${l._id}`
                                      );
                                    }
                                  }}
                                  className={`flex items-center gap-3 p-3 rounded-lg transition-all mt-2 ${
                                    locked
                                      ? "bg-white/[0.02]"
                                      : "bg-[#692c7a]/5 border border-[#9463a8]/20 cursor-pointer hover:bg-[#692c7a]/10"
                                  }`}
                                >
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                      locked
                                        ? "bg-white/[0.05]"
                                        : "bg-[#692c7a]/20"
                                    }`}
                                  >
                                    {locked ? (
                                      <Lock className="w-4 h-4 text-gray-500" />
                                    ) : (
                                      <Play className="w-4 h-4 text-[#e9d5ff]" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4
                                        className={`text-sm font-medium flex-1 ${
                                          locked
                                            ? "text-gray-500"
                                            : "text-white"
                                        }`}
                                      >
                                        {l.title}
                                      </h4>
                                      {l.isFreePreview && (
                                        <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs font-semibold text-green-300">
                                          Preview
                                        </span>
                                      )}
                                    </div>
                                    <span
                                      className={`text-[13px] font-medium ${
                                        locked
                                          ? "text-gray-400"
                                          : "text-gray-100"
                                      }`}
                                    >
                                      {formatDuration(l.durationSec)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/8 p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4">
                Your Instructor
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#692c7a] to-[#9463a8] rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 shadow-lg shadow-[#692c7a]/30">
                  {instructorInitial}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {instructorName}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Expert Instructor at Sabka Skill Academy
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Learn with structured modules and real-world projects
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-2xl">
                <div className="p-6">
                  <div className="mb-6">
                    {isFreeBundle ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                          Free
                        </span>
                        <span className="text-xs text-gray-300">
                          Full bundle is free for a limited time
                        </span>
                      </div>
                    ) : bundlePrice <= 0 ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-3xl font-bold text-white">
                          {currency}0
                        </span>
                        <span className="text-xs text-gray-300">
                          Pricing not configured
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl font-bold text-white">
                            {currency}
                            {finalPrice.toLocaleString("en-IN")}
                          </span>
                          {originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                              {currency}
                              {originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                        {discountPercentLabel && (
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-xs font-semibold text-green-300">
                              {discountPercentLabel}
                            </span>
                            <span className="text-xs text-gray-300">
                              Limited time offer
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleBundleAction}
                    disabled={purchasingBundle || !isParentCourse}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-[#692c7a] to-[#9463a8] hover:from-[#5a1f68] hover:to-[#8a5299] rounded-xl font-semibold text-white transition-all shadow-lg shadow-[#692c7a]/50 hover:shadow-xl hover:shadow-[#692c7a]/60 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {hasFullBundleAccess ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Go to Course
                      </>
                    ) : purchasingBundle ? (
                      <>
                        <ShoppingCart className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : isFreeBundle ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Start Free Bundle
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Buy Complete Bundle
                      </>
                    )}
                  </button>

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Access</span>
                      <span className="text-white font-semibold">Lifetime</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Certificate</span>
                      <span className="text-white font-semibold">Included</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Modules</span>
                      <span className="text-white font-semibold">
                        {modules.length || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Total lessons</span>
                      <span className="text-white font-semibold">
                        {totals.totalLessons}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
