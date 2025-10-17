"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function StudentCourses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isPro, setIsPro] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const categories = [
    { id: "all", name: "All Courses", icon: BookOpen },
    { id: "it", name: "IT & Software", icon: Code },
    { id: "management", name: "Management", icon: BarChart3 },
    { id: "engineering", name: "Engineering", icon: Settings },
    { id: "marketing", name: "Marketing", icon: Megaphone },
  ];

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "it",
      thumbnail: "/goal.jpg",
      progress: 45,
      totalVideos: 45,
      completedVideos: 20,
      duration: "40 hours",
      instructor: "John Doe",
      isPro: true,
      isEnrolled: true,
      rating: 4.8,
      students: 12500,
      level: "Intermediate",
    },
    {
      id: 2,
      title: "Project Management Fundamentals",
      category: "management",
      thumbnail: "/project-management-teamwork.jpg",
      progress: 0,
      totalVideos: 30,
      completedVideos: 0,
      duration: "25 hours",
      instructor: "Jane Smith",
      isPro: true,
      isEnrolled: false,
      rating: 4.9,
      students: 8400,
      level: "Beginner",
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      category: "marketing",
      thumbnail: "/digital-marketing-strategy.png",
      progress: 80,
      totalVideos: 35,
      completedVideos: 28,
      duration: "30 hours",
      instructor: "Mike Johnson",
      isPro: true,
      isEnrolled: true,
      rating: 4.7,
      students: 15200,
      level: "Advanced",
    },
    {
      id: 4,
      title: "Introduction to Programming",
      category: "it",
      thumbnail: "/programming.jpg",
      progress: 0,
      totalVideos: 25,
      completedVideos: 0,
      duration: "15 hours",
      instructor: "Sarah Williams",
      isPro: false,
      isEnrolled: false,
      rating: 4.6,
      students: 9800,
      level: "Beginner",
    },
  ];

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const enrolledCourses = courses.filter((c) => c.isEnrolled);
  const avgProgress =
    enrolledCourses.length > 0
      ? Math.round(
          enrolledCourses.reduce((sum, c) => sum + c.progress, 0) /
            enrolledCourses.length
        )
      : 0;

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
              background: "rgba(128,55,145,0.12)",
              animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse"
            style={{
              background: "rgba(184,123,209,0.08)",
              animation: "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-2xl"
            style={{ background: "rgba(240,194,238,0.04)" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_40%)]" />

          {/* Animated gradient mesh */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
            <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
          </div>
        </div>

        {/* Premium Header */}
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-white shadow-2xl backdrop-blur-xl border border-white/10 group transition-all duration-500 hover:shadow-purple-500/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(128,55,145,0.18) 0%, rgba(184,123,209,0.12) 50%, rgba(240,194,238,0.08) 100%)",
            boxShadow:
              "0 20px 60px rgba(128,55,145,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Animated accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating orbs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative flex items-center gap-6">
            <div
              className="p-5 rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1,#f0c2ee)",
                boxShadow: "0 20px 40px rgba(128,55,145,0.4)",
              }}
            >
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-4xl font-black mb-2 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                My Learning Journey
              </h1>
              <p className="text-white/90 text-lg font-medium flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Continue your path to excellence
              </p>
            </div>
          </div>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Enrolled Courses",
              value: enrolledCourses.length,
              suffix: "",
            },
            { label: "Avg. Progress", value: avgProgress, suffix: "%" },
            {
              label: "Completed",
              value: enrolledCourses.filter((c) => c.progress === 100).length,
              suffix: "",
            },
            {
              label: "Learning Hours",
              value: enrolledCourses.reduce(
                (sum, c) => sum + Number.parseInt(c.duration),
                0
              ),
              suffix: "h",
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
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-2xl" />

                {/* Animated border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(184,123,209,0.3), rgba(128,55,145,0.3))",
                    padding: "2px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {stat.value}
                      {stat.suffix}
                    </p>
                    <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                      <TrendingUp className="w-3 h-3" />
                      <span>+8% growth</span>
                    </div>
                  </div>
                  <div
                    className={`h-20 w-20 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-br ${gradient}`}
                    style={{
                      boxShadow: "0 10px 30px rgba(128,55,145,0.4)",
                    }}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Pro Upgrade Banner */}
        {!isPro && (
          <div
            className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl backdrop-blur-xl border border-white/10 group transition-all duration-500 hover:shadow-purple-500/30 hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, rgba(128,55,145,0.16), rgba(184,123,209,0.10))",
              boxShadow: "0 20px 60px rgba(128,55,145,0.2)",
            }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shimmer" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-pulse" />
            <div
              className="absolute bottom-4 left-4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div
                  className="p-5 rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #eab308)",
                    boxShadow: "0 10px 30px rgba(245,158,11,0.4)",
                  }}
                >
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-black text-3xl">
                      Unlock Premium Access
                    </h3>
                    <div className="flex items-center gap-1">
                      <Award className="w-7 h-7 text-yellow-300 fill-yellow-300 animate-bounce" />
                      <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-white/90 text-lg font-medium flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-300" />
                    Get unlimited access to all courses and premium features
                  </p>
                </div>
              </div>
              <button className="group/btn relative px-10 py-4 bg-white text-[#803791] font-black rounded-2xl transition-all shadow-2xl hover:shadow-white/30 overflow-hidden hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-purple-100 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2 text-lg">
                  Upgrade Now
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        )}

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
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                )}
                <div
                  className={`p-2 rounded-xl ${
                    isSelected ? "bg-white/20" : "bg-white/10"
                  } transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="relative">{category.name}</span>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Premium Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
              className="group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-500/30 cursor-pointer"
              style={{
                background:
                  hoveredCourse === course.id
                    ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border:
                  hoveredCourse === course.id
                    ? "1px solid rgba(184,123,209,0.3)"
                    : "1px solid rgba(255,255,255,0.08)",
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl pointer-events-none z-10" />

              {/* Image Container with Premium Overlay */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Pro Lock Overlay */}
                {course.isPro && !isPro && (
                  <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-purple-900/80 to-black/90 flex items-center justify-center backdrop-blur-md z-20">
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                      <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-xl inline-block mb-3 shadow-2xl border border-purple-400/30">
                        <Lock className="w-12 h-12 text-purple-300" />
                      </div>
                      <p className="text-white font-black text-xl mb-2">
                        Pro Exclusive
                      </p>
                      <p className="text-purple-200 text-sm font-medium">
                        Upgrade to unlock
                      </p>
                    </div>
                  </div>
                )}

                {/* Enrolled Badge */}
                {course.isEnrolled && (
                  <div className="absolute top-4 left-4 z-30">
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
                  </div>
                )}

                {/* Featured Badge for first 2 courses */}
                {index < 2 && !course.isEnrolled && (
                  <div className="absolute top-4 left-4 z-30">
                    <span
                      className="px-4 py-2 text-white rounded-2xl text-xs font-black shadow-2xl flex items-center gap-2 backdrop-blur-xl border border-amber-400/30 animate-pulse"
                      style={{
                        background: "linear-gradient(135deg,#f59e0b,#d97706)",
                        boxShadow: "0 10px 30px rgba(245,158,11,0.4)",
                      }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      Popular
                    </span>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute bottom-4 right-4 z-30">
                  <div className="px-3 py-2 bg-black/50 backdrop-blur-xl rounded-xl border border-white/20 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-sm">
                      {course.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="relative p-6 space-y-4 z-20">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-white font-black text-xl leading-tight group-hover:text-purple-200 transition-colors">
                      {course.title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    {course.instructor} • {course.students.toLocaleString()}{" "}
                    students
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-white/80 font-semibold backdrop-blur-sm">
                    <Play className="w-4 h-4 text-purple-400" />
                    {course.totalVideos} videos
                  </span>
                  <span className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-white/80 font-semibold backdrop-blur-sm">
                    <Clock className="w-4 h-4 text-purple-400" />
                    {course.duration}
                  </span>
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-bold border backdrop-blur-sm ${getLevelColor(
                      course.level
                    )}`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Progress Bar for Enrolled Courses */}
                {course.isEnrolled && (
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80 font-bold flex items-center gap-1">
                        <Target className="w-4 h-4 text-purple-400" />
                        Progress
                      </span>
                      <span className="text-white font-black text-lg">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className="h-3 rounded-full transition-all duration-700 relative overflow-hidden"
                        style={{
                          width: `${course.progress}%`,
                          background:
                            "linear-gradient(90deg,#803791,#b87bd1,#f0c2ee)",
                          boxShadow: "0 0 20px rgba(184,123,209,0.6)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer" />
                      </div>
                    </div>
                    <p className="text-xs text-white/70 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      {course.completedVideos} of {course.totalVideos} videos
                      completed
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  className={`group/btn relative w-full px-6 py-4 rounded-2xl font-black transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
                    course.isPro && !isPro
                      ? "bg-white/6 text-white/40 cursor-not-allowed shadow-sm border border-white/10"
                      : course.isEnrolled
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white shadow-2xl shadow-purple-500/40 hover:scale-105 active:scale-95"
                      : "bg-white/8 hover:bg-white/15 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 border border-white/15"
                  }`}
                  disabled={course.isPro && !isPro}
                >
                  {(course.isEnrolled || !course.isPro || isPro) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  )}
                  {course.isPro && !isPro ? (
                    <>
                      <Lock className="w-5 h-5" />
                      Upgrade to Access
                    </>
                  ) : course.isEnrolled ? (
                    <>
                      <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      <span className="relative">Continue Learning</span>
                      <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      <span className="relative">Enroll Now</span>
                      <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
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
