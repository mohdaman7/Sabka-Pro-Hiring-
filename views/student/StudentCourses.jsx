"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Lock,
  CheckCircle,
  Clock,
  BookOpen,
  TrendingUp,
  Code,
  BarChart3,
  Settings,
  Megaphone,
  Award,
  Zap,
  Star,
  Users,
  Target,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Trophy,
  Flame,
  ShoppingCart,
  DollarSign,
  Crown,
} from "lucide-react";
import courseService from "@/services/courseService";
import purchaseService from "@/services/purchaseService";
import { studentService } from "@/services/studentService";

export default function StudentCourses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [myAccess, setMyAccess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPro, setIsPro] = useState(false);

  const categories = [
    { id: "all", name: "All Courses", icon: BookOpen },
    { id: "IT & Software", name: "IT & Software", icon: Code },
    { id: "Management", name: "Management", icon: BarChart3 },
    { id: "Engineering", name: "Engineering", icon: Settings },
    { id: "Marketing", name: "Marketing", icon: Megaphone },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesData, accessData, profileRes] = await Promise.all([
        courseService.listPublic(),
        courseService.myAccess().catch(() => []),
        studentService.getProfile().catch(() => null),
      ]);
      setCourses(coursesData || []);
      setMyAccess(accessData || []);
      
      // Check if user is premium
      const studentData = profileRes?.data || profileRes?.data?.data || profileRes?.data;
      const plan = (studentData?.plan || studentData?.data?.plan || "free").toLowerCase();
      setIsPro(plan === "pro");
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const hasAccess = (courseId) => {
    return isPro || myAccess.some((access) => access.courseId?._id === courseId);
  };

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const enrolledCourses = courses.filter((c) => hasAccess(c._id));
  const avgProgress = enrolledCourses.length > 0 ? Math.round(Math.random() * 40 + 10) : 0; // Mock progress - would be calculated from actual progress data

  const getLevelColor = (level) => {
    const colors = {
      Beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      Advanced: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    };
    return colors[level] || colors.Beginner;
  };

  const statIcons = [BookOpen, TrendingUp, Trophy, Flame];
  const statColors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-500",
  ];

  return (
    <>
      <div className="relative p-4 md:p-6 lg:p-8 space-y-8 min-h-screen overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: isPro ? "rgba(245,158,11,0.15)" : "rgba(128,55,145,0.12)",
              animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse"
            style={{
              background: isPro ? "rgba(217,119,6,0.10)" : "rgba(184,123,209,0.08)",
              animation: "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-2xl"
            style={{ background: isPro ? "rgba(251,191,36,0.06)" : "rgba(240,194,238,0.04)" }}
          />
          <div className={`absolute inset-0 ${isPro ? 'bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.06),_transparent_40%)]' : 'bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_40%)]'}`} />
          
          {/* Premium floating particles */}
          {isPro && (
            <>
              <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="absolute top-40 right-32 w-1 h-1 bg-amber-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-yellow-300/35 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 right-20 w-1 h-1 bg-amber-300/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            </>
          )}
        </div>

        {/* Premium Header */}
        <div
          className={`relative overflow-hidden rounded-3xl p-8 md:p-10 text-white shadow-2xl backdrop-blur-xl border group transition-all duration-500 ${
            isPro 
              ? 'border-yellow-400/20 hover:shadow-yellow-500/20 hover:border-yellow-400/30' 
              : 'border-white/10 hover:shadow-purple-500/20'
          }`}
          style={{
            background: isPro
              ? "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(217,119,6,0.12) 50%, rgba(251,191,36,0.08) 100%)"
              : "linear-gradient(135deg, rgba(128,55,145,0.18) 0%, rgba(184,123,209,0.12) 50%, rgba(240,194,238,0.08) 100%)",
            boxShadow: isPro
              ? "0 20px 60px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "0 20px 60px rgba(128,55,145,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${
            isPro ? 'via-yellow-400' : 'via-purple-400'
          }`} />
          <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
            isPro ? 'bg-yellow-500/10' : 'bg-purple-500/10'
          }`} />
          <div
            className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
              isPro ? 'bg-amber-500/10' : 'bg-pink-500/10'
            }`}
            style={{ animationDelay: "1s" }}
          />

          <div className="relative flex items-center gap-6">
            <div
              className="p-5 rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
              style={{
                background: isPro 
                  ? "linear-gradient(135deg,#f59e0b,#d97706,#fbbf24)"
                  : "linear-gradient(135deg,#803791,#b87bd1,#f0c2ee)",
                boxShadow: isPro
                  ? "0 20px 40px rgba(245,158,11,0.4)"
                  : "0 20px 40px rgba(128,55,145,0.4)",
              }}
            >
              {isPro ? (
                <Crown className="w-12 h-12 text-white" />
              ) : (
                <GraduationCap className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                {isPro ? "Premium Learning Hub" : "My Learning Journey"}
              </h1>
              <p className="text-white/90 text-lg font-medium flex items-center gap-2">
                {isPro ? (
                  <>
                    <Crown className="w-5 h-5 text-yellow-400" />
                    Unlimited access to all premium content
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Continue your path to excellence
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Enrolled Courses",
              value: enrolledCourses.length,
              suffix: "",
            },
            { label: "Avg. Progress", value: avgProgress, suffix: "%" },
            {
              label: "Available",
              value: courses.length,
              suffix: "",
            },
            {
              label: "Categories",
              value: categories.length - 1,
              suffix: "",
            },
          ].map((stat, index) => {
            const Icon = statIcons[index];
            const gradient = statColors[index];
            return (
              <div
                key={index}
                className="group relative rounded-2xl p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-2xl" />
                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-5xl font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {stat.value}
                      {stat.suffix}
                    </p>
                  </div>
                  <div
                    className={`h-20 w-20 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-br ${gradient}`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Category Filters */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-2xl shadow-purple-500/40 scale-105"
                    : "bg-white/6 text-white/80 hover:bg-white/12 hover:text-white shadow-lg hover:shadow-xl hover:scale-105 border border-white/10"
                }`}
              >
                <div
                  className={`p-2 rounded-xl ${
                    isSelected ? "bg-white/20" : "bg-white/10"
                  } transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="relative">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-2xl">
            {error}
          </div>
        )}

        {/* Premium Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center py-12 text-white/80">Loading courses...</div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => {
              const enrolled = hasAccess(course._id);
              return (
                <Link
                  key={course._id}
                  href={`/student/courses/${course._id}`}
                  onMouseEnter={() => setHoveredCourse(course._id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                  className="group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-500/30 cursor-pointer"
                  style={{
                    background:
                      hoveredCourse === course._id
                        ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))"
                        : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                    border:
                      hoveredCourse === course._id
                        ? "1px solid rgba(184,123,209,0.3)"
                        : "1px solid rgba(255,255,255,0.08)",
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl pointer-events-none z-10" />

                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Access Badge */}
                    <div className="absolute top-4 left-4 z-30">
                      {isPro ? (
                        <span
                          className="px-4 py-2 text-white rounded-2xl text-xs font-black shadow-2xl flex items-center gap-2 backdrop-blur-xl border border-yellow-400/30"
                          style={{
                            background: "linear-gradient(135deg,#f59e0b,#d97706)",
                            boxShadow: "0 10px 30px rgba(245,158,11,0.4)",
                          }}
                        >
                          <Crown className="w-4 h-4" />
                          Pro Access
                        </span>
                      ) : enrolled ? (
                        <span
                          className="px-4 py-2 text-white rounded-2xl text-xs font-black shadow-2xl flex items-center gap-2 backdrop-blur-xl border border-emerald-400/30"
                          style={{
                            background: "linear-gradient(135deg,#10b981,#059669)",
                            boxShadow: "0 10px 30px rgba(16,185,129,0.4)",
                          }}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Enrolled
                        </span>
                      ) : course.bundlePrice === 0 ? (
                        <span
                          className="px-4 py-2 text-white rounded-2xl text-xs font-black shadow-2xl flex items-center gap-2 backdrop-blur-xl border border-emerald-400/30"
                          style={{
                            background: "linear-gradient(135deg,#10b981,#059669)",
                            boxShadow: "0 10px 30px rgba(16,185,129,0.4)",
                          }}
                        >
                          <Award className="w-4 h-4" />
                          Free
                        </span>
                      ) : null}
                    </div>

                    {/* Rating Badge */}
                    {course.rating > 0 && (
                      <div className="absolute bottom-4 right-4 z-30">
                        <div className="px-3 py-2 bg-black/50 backdrop-blur-xl rounded-xl border border-white/20 flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-bold text-sm">{course.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6 space-y-4 z-20">
                    <div>
                      <h3 className="text-white font-black text-xl leading-tight group-hover:text-purple-200 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">{course.category}</p>
                    </div>

                    <div className="flex items-center gap-3 text-sm flex-wrap">
                      <span className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-white/80 font-semibold backdrop-blur-sm">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        {course.moduleCount || 0} modules
                      </span>
                      {!isPro && (
                        <span className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-white/80 font-semibold backdrop-blur-sm">
                          <DollarSign className="w-4 h-4 text-purple-400" />
                          ₹{course.bundlePrice ?? 0}
                        </span>
                      )}
                      {course.level && (
                        <span
                          className={`px-3 py-2 rounded-xl text-xs font-bold border backdrop-blur-sm ${getLevelColor(
                            course.level
                          )}`}
                        >
                          {course.level}
                        </span>
                      )}
                    </div>

                    {course.enrolledCount > 0 && (
                      <div className="text-sm text-white/70 font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        {course.enrolledCount} students
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      className={`group/btn relative w-full px-6 py-4 rounded-2xl font-black transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
                        enrolled || isPro
                          ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white shadow-2xl shadow-purple-500/40 hover:scale-105 active:scale-95"
                          : "bg-white/8 hover:bg-white/15 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 border border-white/15"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                      {enrolled || isPro ? (
                        <>
                          <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          <span className="relative">{isPro ? "Start Learning" : "Continue Learning"}</span>
                          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      ) : course.bundlePrice === 0 ? (
                        <>
                          <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          <span className="relative">Start Free Course</span>
                          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          <span className="relative">View Course</span>
                          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12 text-white/80">No courses available</div>
          )}
        </div>
      </div>

      <style jsx>{`
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

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
