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
} from "lucide-react";

// Custom scrollbar styles
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #803791, #b87bd1);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #903fa1, #c88be1);
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: #803791 rgba(255, 255, 255, 0.03);
  }
`;

export default function StudentCourses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isPro, setIsPro] = useState(false);

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
    },
    {
      id: 4,
      title: "Introduction to Programming",
      category: "it",
      thumbnail: "/programming.jpg",
      progress: 0,
      totalVideos: 20,
      completedVideos: 0,
      duration: "15 hours",
      instructor: "Sarah Williams",
      isPro: false,
      isEnrolled: false,
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />

      <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
        {/* Decorative background orbs */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(128,55,145,0.08)" }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(184,123,209,0.06)" }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
            style={{ background: "rgba(240,194,238,0.03)" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
        </div>

        {/* Header */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6"
          style={{
            background:
              "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
            boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="p-4 rounded-xl shadow-lg"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1)",
              }}
            >
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-1">
                My Courses
              </h1>
              <p className="text-white/85">
                Continue learning and track your progress
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">
                  Enrolled Courses
                </p>
                <p className="text-4xl font-bold text-white">
                  {enrolledCourses.length}
                </p>
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div
            className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">
                  Avg. Progress
                </p>
                <p className="text-4xl font-bold text-white">{avgProgress}%</p>
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div
            className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">
                  Completed
                </p>
                <p className="text-4xl font-bold text-white">
                  {enrolledCourses.filter((c) => c.progress === 100).length}
                </p>
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div
            className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">
                  Learning Hours
                </p>
                <p className="text-4xl font-bold text-white">
                  {enrolledCourses.reduce(
                    (sum, c) => sum + Number.parseInt(c.duration),
                    0
                  )}
                  h
                </p>
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Pro Upgrade Banner */}
        {!isPro && (
          <div
            className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6"
            style={{
              background:
                "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
              boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div
                  className="p-4 rounded-xl shadow-lg"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                  }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-2xl">
                      Upgrade to Pro
                    </h3>
                    <Award className="w-6 h-6 text-yellow-300" />
                  </div>
                  <p className="text-white/90">
                    Get unlimited access to all courses and premium features
                  </p>
                </div>
              </div>
              <button className="px-8 py-3 bg-white text-[#803791] font-bold rounded-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg scale-105"
                    : "bg-white/6 text-white/80 hover:bg-white/10 hover:text-white shadow-md hover:shadow-lg hover:scale-105 border border-white/8"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl overflow-hidden shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="relative group overflow-hidden">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {course.isPro && !isPro && (
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm inline-block mb-2">
                        <Lock className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-white font-semibold text-lg">
                        Pro Only
                      </p>
                    </div>
                  </div>
                )}
                {course.isEnrolled && (
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-3 py-1.5 text-white rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1"
                      style={{
                        background: "linear-gradient(135deg,#10b981,#059669)",
                      }}
                    >
                      <CheckCircle className="w-3 h-3" />
                      Enrolled
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">
                    {course.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    by {course.instructor}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Play className="w-4 h-4" />
                    {course.totalVideos} videos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                </div>

                {course.isEnrolled && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80 font-medium">
                        Progress
                      </span>
                      <span className="text-white font-bold">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${course.progress}%`,
                          background: "linear-gradient(90deg,#803791,#b87bd1)",
                        }}
                      />
                    </div>
                    <p className="text-xs text-white/70">
                      {course.completedVideos} of {course.totalVideos} videos
                      completed
                    </p>
                  </div>
                )}

                <button
                  className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    course.isPro && !isPro
                      ? "bg-white/6 text-white/40 cursor-not-allowed shadow-sm border border-white/8"
                      : course.isEnrolled
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white shadow-lg hover:shadow-xl hover:scale-105"
                      : "bg-white/6 hover:bg-white/10 text-white shadow-md hover:shadow-lg hover:scale-105 border border-white/12"
                  }`}
                  disabled={course.isPro && !isPro}
                >
                  {course.isPro && !isPro ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Upgrade to Access
                    </>
                  ) : course.isEnrolled ? (
                    <>
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </>
                  ) : (
                    "Enroll Now"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
