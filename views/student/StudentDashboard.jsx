"use client";

import { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  TrendingUp,
  ArrowRight,
  Clock,
  MapPin,
  Star,
  Award,
  Bell,
  Settings,
  ChevronRight,
  Sparkles,
  Target,
  BookOpen,
  Eye,
  Filter,
  Search,
  MoreVertical,
  Download,
  TrendingDown,
  BarChart3,
  Plus,
  MessageSquare,
  FileText,
  Zap,
} from "lucide-react";

export default function StudentDashboard() {
  const [hoveredJob, setHoveredJob] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const stats = [
    {
      label: "Jobs Applied",
      value: "14",
      icon: Briefcase,
      trend: "+3 this week",
      percentage: "+27.3%",
      color: "from-purple-500 to-purple-700",
      bgGlow: "rgba(168, 85, 247, 0.2)",
    },
    {
      label: "Courses Enrolled",
      value: "3",
      icon: GraduationCap,
      trend: "1 in progress",
      percentage: "+50%",
      color: "from-blue-500 to-blue-700",
      bgGlow: "rgba(59, 130, 246, 0.2)",
    },
    {
      label: "Interviews Scheduled",
      value: "2",
      icon: Calendar,
      trend: "Next: Tomorrow",
      percentage: "+100%",
      color: "from-emerald-500 to-emerald-700",
      bgGlow: "rgba(16, 185, 129, 0.2)",
    },
    {
      label: "Profile Views",
      value: "45",
      icon: TrendingUp,
      trend: "+12 today",
      percentage: "+36.4%",
      color: "from-amber-500 to-amber-700",
      bgGlow: "rgba(245, 158, 11, 0.2)",
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹6-8 LPA",
      postedDate: "2 days ago",
      matchScore: 95,
      tags: ["React", "TypeScript", "Tailwind"],
      companyInitials: "TS",
    },
    {
      id: 2,
      title: "React Developer",
      company: "Digital Innovations",
      location: "Bangalore, Karnataka",
      type: "Remote",
      salary: "₹8-12 LPA",
      postedDate: "1 week ago",
      matchScore: 88,
      tags: ["React", "Node.js", "MongoDB"],
      companyInitials: "DI",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Global Tech Corp",
      location: "Pune, Maharashtra",
      type: "Full-time",
      salary: "₹10-15 LPA",
      postedDate: "3 days ago",
      matchScore: 82,
      tags: ["MERN", "AWS", "Docker"],
      companyInitials: "GT",
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      company: "Tech Solutions Pvt Ltd",
      position: "Frontend Developer",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Video Call",
      avatar: "TS",
      status: "Confirmed",
    },
    {
      id: 2,
      company: "Digital Innovations",
      position: "React Developer",
      date: "Jan 20, 2024",
      time: "2:00 PM",
      type: "In-person",
      avatar: "DI",
      status: "Pending",
    },
  ];

  const achievements = [
    { icon: Award, label: "Top Performer", color: "#FFD700" },
    { icon: Target, label: "Goal Crusher", color: "#b87bd1" },
    { icon: Sparkles, label: "Rising Star", color: "#00CED1" },
  ];

  const courses = [
    {
      title: "React Fundamentals",
      progress: 75,
      lessons: "12/16 lessons",
      color: "#61DAFB",
      instructor: "John Doe",
      nextLesson: "Advanced Hooks",
    },
    {
      title: "Node.js Backend",
      progress: 45,
      lessons: "9/20 lessons",
      color: "#68A063",
      instructor: "Jane Smith",
      nextLesson: "Express Middleware",
    },
    {
      title: "MongoDB Basics",
      progress: 90,
      lessons: "18/20 lessons",
      color: "#4DB33D",
      instructor: "Mike Johnson",
      nextLesson: "Aggregation Pipeline",
    },
  ];

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Enhanced Background with Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "rgba(128,55,145,0.12)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "rgba(184,123,209,0.08)",
            animation: "float 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "rgba(240,194,238,0.05)",
            animation: "float 12s ease-in-out infinite reverse",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(128,55,145,0.04),transparent_50%)]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(184,123,209,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(184,123,209,0.5) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 space-y-6 max-w-[1600px] mx-auto">
        {/* Premium Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl group">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600/90 via-purple-700/90 to-blue-600/90 backdrop-blur-xl" />
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0 bg-linear-to-r from-purple-400 to-blue-400"
              style={{
                mixBlendMode: "overlay",
                animation: "pulse 8s ease-in-out infinite",
              }}
            />
          </div>
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl text-white text-sm font-medium border border-white/30">
                    Welcome Back! 👋
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                  Hey, Amit!
                </h1>
                <p className="text-white/90 text-lg mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  You have{" "}
                  <span className="font-bold text-amber-300">
                    2 upcoming interviews
                  </span>{" "}
                  and{" "}
                  <span className="font-bold text-emerald-300">
                    5 new job matches
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="group/btn relative px-6 py-3 bg-white text-purple-700 rounded-xl font-semibold shadow-2xl shadow-white/20 transition-all hover:scale-105 hover:shadow-white/30 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-white to-purple-50 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Briefcase className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Browse Jobs</span>
                  </button>
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-semibold border border-white/30 transition-all hover:scale-105 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Explore Courses
                  </button>
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold border border-white/20 transition-all hover:scale-105 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Update Profile
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-linear-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-xl border border-white/30 shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-br from-white/30 to-white/10 rounded-3xl backdrop-blur-xl border border-white/40 shadow-2xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                    <TrendingUp className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = TrendingUp;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className="group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer"
                style={{
                  background:
                    hoveredStat === index
                      ? "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
                      : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transform:
                    hoveredStat === index
                      ? "translateY(-8px) scale(1.02)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    hoveredStat === index
                      ? `0 20px 60px ${stat.bgGlow}, 0 0 0 1px rgba(255,255,255,0.1)`
                      : "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: stat.bgGlow }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                      style={{
                        boxShadow:
                          hoveredStat === index
                            ? `0 8px 32px ${stat.bgGlow}`
                            : "none",
                      }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30">
                      <TrendIcon className="w-3 h-3 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400">
                        {stat.percentage}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-4xl font-black text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-slate-300">
                      {stat.label}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-white/10">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {stat.trend}
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-2xl transform translate-x-6 -translate-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recommended Jobs - Enhanced */}
          <div className="lg:col-span-2 rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Recommended Jobs
                  </h2>
                  <p className="text-xs text-slate-400">
                    Personalized matches for you
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105">
                  <Filter className="w-4 h-4 text-slate-300" />
                </button>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105">
                  <Search className="w-4 h-4 text-slate-300" />
                </button>
                <a
                  href="/student/jobs"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-sm font-medium transition-all hover:scale-105"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  onMouseEnter={() => setHoveredJob(job.id)}
                  onMouseLeave={() => setHoveredJob(null)}
                  className="group relative rounded-xl p-5 bg-white/3 hover:bg-white/5 border border-white/10 transition-all duration-300 cursor-pointer"
                  style={{
                    transform:
                      hoveredJob === job.id
                        ? "translateX(8px)"
                        : "translateX(0)",
                    boxShadow:
                      hoveredJob === job.id
                        ? "0 12px 48px rgba(168, 85, 247, 0.2), -4px 0 0 0 rgba(168, 85, 247, 0.5)"
                        : "0 4px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform"
                        style={{
                          background:
                            "linear-gradient(135deg, #803791, #b87bd1)",
                        }}
                      >
                        {job.companyInitials}
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1 text-lg group-hover:text-purple-300 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-400 font-medium">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(184,123,209,0.15), rgba(128,55,145,0.1))",
                        border: "1px solid rgba(184,123,209,0.3)",
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-bold text-white">
                        {job.matchScore}%
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs font-semibold text-white/90 border bg-purple-500/10 border-purple-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-slate-300 mb-4">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 backdrop-blur-xl">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 backdrop-blur-xl">
                      <Briefcase className="w-4 h-4 text-blue-400" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 backdrop-blur-xl">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      {job.postedDate}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-bold text-white">
                      {job.salary}
                    </span>
                    <button className="group/btn px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-purple-500/30 hover:scale-105 flex items-center gap-2">
                      Apply Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-purple-500 to-purple-700 rounded-r-full transition-all duration-300 group-hover:h-3/4" />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews - Enhanced */}
          <div className="rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Interviews</h2>
                  <p className="text-xs text-slate-400">Stay prepared</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="group relative rounded-xl p-5 bg-white/3 hover:bg-white/5 border border-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  style={{
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white shadow-lg group-hover:scale-110 transition-transform"
                        style={{
                          background:
                            "linear-gradient(135deg, #803791, #b87bd1)",
                        }}
                      >
                        {interview.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center border-2 border-slate-950">
                        <Calendar className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-base mb-1 group-hover:text-purple-300 transition-colors">
                        {interview.position}
                      </h3>
                      <p className="text-sm text-slate-400 truncate font-medium">
                        {interview.company}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </span>
                      <span className="font-bold text-white">
                        {interview.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time
                      </span>
                      <span className="font-bold text-white">
                        {interview.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <span className="text-slate-400">Mode</span>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {interview.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <span className="text-slate-400">Status</span>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          interview.status === "Confirmed"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {interview.status}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-5 px-4 py-3 bg-white/8 hover:bg-white/12 text-white rounded-xl transition-all font-semibold border border-white/10 hover:border-purple-500/30 group-hover:shadow-lg flex items-center justify-center gap-2">
                    View Details
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600/20 to-blue-600/20 hover:from-emerald-600/30 hover:to-blue-600/30 border border-emerald-500/30 text-white font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              Schedule More
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Course Progress - Enhanced */}
        <div className="rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Course Progress
                </h2>
                <p className="text-xs text-slate-400">
                  Keep learning, keep growing
                </p>
              </div>
            </div>
            <a
              href="/student/courses"
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-sm font-medium transition-all hover:scale-105"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCourse(index)}
                onMouseLeave={() => setHoveredCourse(null)}
                className="group relative rounded-xl p-6 bg-white/3 hover:bg-white/5 border border-white/10 transition-all duration-300 cursor-pointer"
                style={{
                  transform:
                    hoveredCourse === index
                      ? "translateY(-8px)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredCourse === index
                      ? `0 20px 60px ${course.color}33`
                      : "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{
                      background: `${course.color}20`,
                      border: `1px solid ${course.color}30`,
                    }}
                  >
                    <GraduationCap
                      className="w-6 h-6"
                      style={{ color: course.color }}
                    />
                  </div>
                  <span className="text-3xl font-black text-white">
                    {course.progress}%
                  </span>
                </div>

                <h3 className="font-bold text-white mb-2 text-lg group-hover:text-purple-300 transition-colors">
                  {course.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-slate-400 font-medium">
                    {course.lessons}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    {course.instructor}
                  </div>
                </div>

                <div className="relative w-full bg-white/10 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{
                      width: `${course.progress}%`,
                      background: `linear-gradient(90deg, ${course.color}, ${course.color}dd)`,
                    }}
                  >
                    <div
                      className="h-full w-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)",
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Next Lesson</p>
                    <p className="text-xs font-bold text-slate-300">
                      {course.nextLesson}
                    </p>
                  </div>
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all group-hover:scale-110">
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-white" />
                  </button>
                </div>

                {/* Progress indicator */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl transition-all duration-1000"
                  style={{
                    background: `linear-gradient(90deg, ${course.color} ${course.progress}%, transparent ${course.progress}%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Learning Analytics - New Premium Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Learning Performance</h3>
                  <p className="text-xs text-slate-400">Last 30 days</p>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105">
                <Download className="w-4 h-4 text-slate-300" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Study Hours</div>
                    <div className="text-lg font-bold text-white">+18.5%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-purple-400">24h</div>
                  <div className="text-xs text-slate-500">This month</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">
                      Completion Rate
                    </div>
                    <div className="text-lg font-bold text-white">85.3%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400">29</div>
                  <div className="text-xs text-slate-500">Lessons done</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Current Streak</div>
                    <div className="text-lg font-bold text-white">
                      🔥 Excellent!
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-400">12</div>
                  <div className="text-xs text-slate-500">Days</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Application Success</h3>
                  <p className="text-xs text-slate-400">Your job metrics</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Response Rate",
                  value: 67,
                  count: "9/14",
                  color: "from-blue-500 to-blue-700",
                  icon: MessageSquare,
                },
                {
                  label: "Interview Rate",
                  value: 45,
                  count: "2/14",
                  color: "from-purple-500 to-purple-700",
                  icon: Calendar,
                },
                {
                  label: "Profile Strength",
                  value: 88,
                  count: "Very Strong",
                  color: "from-emerald-500 to-emerald-700",
                  icon: Star,
                },
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={idx}
                    className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-white text-sm">
                          {metric.label}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-300">
                        {metric.count}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-white min-w-[3rem] text-right">
                        {metric.value}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 text-white font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              Improve Profile
              <Star className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions - Premium Version */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="group relative rounded-2xl p-6 bg-gradient-to-br from-purple-600/10 to-purple-800/5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors">
                Resume Builder
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Create an ATS-friendly resume with AI assistance
              </p>
              <div className="flex items-center gap-2 text-purple-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                Build Now
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl p-6 bg-gradient-to-br from-blue-600/10 to-blue-800/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">
                Skill Assessment
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Take tests to validate your skills and get certified
              </p>
              <div className="flex items-center gap-2 text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                Start Test
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl p-6 bg-gradient-to-br from-emerald-600/10 to-emerald-800/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-emerald-300 transition-colors">
                Mock Interviews
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Practice with AI-powered interview simulations
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                Practice Now
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
