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
    <div className="relative p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8 min-h-screen overflow-hidden">
      {/* Enhanced Background with Grid - Responsive */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl"
          style={{
            background: "rgba(128,55,145,0.12)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-64 h-64 md:w-[500px] md:h-[500px] rounded-full blur-2xl md:blur-3xl"
          style={{
            background: "rgba(184,123,209,0.08)",
            animation: "float 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-40 h-40 md:w-80 md:h-80 rounded-full blur-2xl md:blur-3xl"
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

      <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
        {/* Premium Welcome Section - Responsive */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl group shadow-xl sm:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-purple-700/90 to-blue-600/90 backdrop-blur-xl" />
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400"
              style={{
                mixBlendMode: "overlay",
                animation: "pulse 8s ease-in-out infinite",
              }}
            />
          </div>
          <div className="relative p-5 sm:p-8 md:p-10 lg:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-amber-300 animate-pulse drop-shadow-lg" strokeWidth={2.5} />
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/25 backdrop-blur-xl text-white text-xs sm:text-sm font-bold border border-white/40 shadow-lg">
                    Welcome Back! 👋
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight drop-shadow-2xl">
                  Hey, Amit!
                </h1>
                <p className="text-white/95 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 font-medium">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" strokeWidth={2.5} />
                  <span>You have{" "}
                  <span className="font-black text-amber-300 text-lg sm:text-xl md:text-2xl">
                    2 upcoming interviews
                  </span>{" "}
                  and{" "}
                  <span className="font-black text-emerald-300 text-lg sm:text-xl md:text-2xl">
                    5 new job matches
                  </span></span>
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  <button className="group/btn relative px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white text-purple-700 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base shadow-xl sm:shadow-2xl shadow-white/30 transition-all hover:scale-105 sm:hover:scale-110 hover:shadow-white/50 flex items-center gap-2 sm:gap-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-purple-50 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10" strokeWidth={2.5} />
                    <span className="relative z-10">Browse Jobs</span>
                  </button>
                  <button className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white rounded-xl sm:rounded-2xl font-black text-sm sm:text-base border-2 border-white/40 transition-all hover:scale-105 sm:hover:scale-110 flex items-center gap-2 sm:gap-3 shadow-xl">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                    <span className="hidden sm:inline">Explore Courses</span>
                    <span className="sm:hidden">Courses</span>
                  </button>
                  <button className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/15 backdrop-blur-xl text-white rounded-xl sm:rounded-2xl font-black text-sm sm:text-base border-2 border-white/30 transition-all hover:scale-105 sm:hover:scale-110 flex items-center gap-2 sm:gap-3 shadow-xl">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                    <span className="hidden sm:inline">Update Profile</span>
                    <span className="sm:hidden">Profile</span>
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-xl border border-white/30 shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl backdrop-blur-xl border-2 border-white/50 shadow-2xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                    <TrendingUp className="w-20 h-20 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">  
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = TrendingUp;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-7 transition-all duration-300 cursor-pointer"
                style={{
                  background:
                    hoveredStat === index
                      ? "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))"
                      : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                  border: hoveredStat === index ? "1.5px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.1)",
                  transform:
                    hoveredStat === index
                      ? "translateY(-8px) scale(1.02)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    hoveredStat === index
                      ? `0 24px 80px ${stat.bgGlow}, 0 0 0 1px rgba(255,255,255,0.15)`
                      : "0 10px 40px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: stat.bgGlow }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-5">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                      style={{
                        boxShadow:
                          hoveredStat === index
                            ? `0 8px 32px ${stat.bgGlow}`
                            : "none",
                      }}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-500/25 backdrop-blur-xl border border-emerald-500/40 shadow-lg">
                      <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" strokeWidth={2.5} />
                      <span className="text-xs font-black text-emerald-300 hidden sm:inline">
                        {stat.percentage}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                      {stat.value}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-200">
                      {stat.label}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-300 pt-2 sm:pt-3 border-t border-white/15">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50" />
                      {stat.trend}
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-2xl transform translate-x-6 -translate-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Main Content Grid - Responsive */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Recommended Jobs - Enhanced & Responsive */}
          <div className="lg:col-span-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 bg-white/8 backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-2xl">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white">
                    Recommended Jobs
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-300">
                    Personalized matches for you
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 transition-all hover:scale-110 shadow-lg">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" strokeWidth={2.5} />
                </button>
                <button className="hidden sm:block p-3 rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 transition-all hover:scale-110 shadow-lg">
                  <Search className="w-5 h-5 text-slate-200" strokeWidth={2.5} />
                </button>
                <a
                  href="/student/jobs"
                  className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl bg-purple-600/25 hover:bg-purple-600/35 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-black transition-all hover:scale-110 shadow-lg"
                >
                  <span className="hidden sm:inline">View All</span>
                  <span className="sm:hidden">All</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </a>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  onMouseEnter={() => setHoveredJob(job.id)}
                  onMouseLeave={() => setHoveredJob(null)}
                  className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 bg-white/5 hover:bg-white/8 border border-white/15 transition-all duration-300 cursor-pointer"
                  style={{
                    transform:
                      hoveredJob === job.id
                        ? "translateX(10px) scale(1.01)"
                        : "translateX(0) scale(1)",
                    boxShadow:
                      hoveredJob === job.id
                        ? "0 16px 60px rgba(168, 85, 247, 0.3), -6px 0 0 0 rgba(168, 85, 247, 0.6)"
                        : "0 6px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4 md:mb-5 gap-3 sm:gap-0">
                    <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-sm sm:text-base shadow-2xl group-hover:scale-110 transition-transform"
                        style={{
                          background:
                            "linear-gradient(135deg, #803791, #b87bd1)",
                        }}
                      >
                        {job.companyInitials}
                      </div>
                      <div>
                        <h3 className="font-black text-white mb-1 sm:mb-2 text-base sm:text-lg md:text-xl group-hover:text-purple-200 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-300 font-semibold">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl backdrop-blur-sm shadow-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(184,123,209,0.2), rgba(128,55,145,0.15))",
                        border: "1.5px solid rgba(184,123,209,0.4)",
                      }}
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" strokeWidth={2.5} />
                      <span className="text-sm sm:text-base font-black text-white">
                        {job.matchScore}%
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                    {job.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white border bg-purple-500/15 border-purple-500/30 shadow-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 text-sm sm:text-base text-slate-200 mb-3 sm:mb-4 md:mb-5">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-white/8 backdrop-blur-xl border border-white/10 font-semibold">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" strokeWidth={2.5} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-white/8 backdrop-blur-xl border border-white/10 font-semibold">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" strokeWidth={2.5} />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-white/8 backdrop-blur-xl border border-white/10 font-semibold">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" strokeWidth={2.5} />
                      {job.postedDate}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 sm:pt-4 md:pt-5 border-t border-white/15 gap-3 sm:gap-0">
                    <span className="text-lg sm:text-xl md:text-2xl font-black text-white">
                      {job.salary}
                    </span>
                    <button className="group/btn w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl sm:rounded-2xl transition-all font-black text-sm sm:text-base shadow-2xl hover:shadow-purple-500/50 hover:scale-105 sm:hover:scale-110 flex items-center justify-center gap-2">
                      Apply Now
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </button>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-0 bg-gradient-to-b from-purple-400 to-purple-600 rounded-r-full transition-all duration-300 group-hover:h-3/4 shadow-lg shadow-purple-500/50" />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews - Enhanced & Responsive */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 bg-white/8 backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-2xl">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white">Interviews</h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-300">Stay prepared</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 bg-white/5 hover:bg-white/8 border border-white/15 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  style={{
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5">
                    <div className="relative">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-sm sm:text-base text-white shadow-2xl group-hover:scale-110 transition-transform"
                        style={{
                          background:
                            "linear-gradient(135deg, #803791, #b87bd1)",
                        }}
                      >
                        {interview.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center border-2 border-slate-950 shadow-lg">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-white text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-emerald-200 transition-colors">
                        {interview.position}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-300 truncate font-semibold">
                        {interview.company}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/8 border border-white/10">
                      <span className="text-slate-300 flex items-center gap-1.5 sm:gap-2 font-semibold">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                        Date
                      </span>
                      <span className="font-black text-white">
                        {interview.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/8 border border-white/10">
                      <span className="text-slate-300 flex items-center gap-1.5 sm:gap-2 font-semibold">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                        Time
                      </span>
                      <span className="font-black text-white">
                        {interview.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/8 border border-white/10">
                      <span className="text-slate-300 font-semibold">Mode</span>
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black bg-purple-500/25 text-purple-200 border border-purple-500/40 shadow-lg">
                        {interview.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/8 border border-white/10">
                      <span className="text-slate-300 font-semibold">Status</span>
                      <span
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black ${
                          interview.status === "Confirmed"
                            ? "bg-emerald-500/25 text-emerald-200 border border-emerald-500/40 shadow-lg"
                            : "bg-amber-500/25 text-amber-200 border border-amber-500/40 shadow-lg"
                        }`}
                      >
                        {interview.status}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 sm:mt-5 md:mt-6 px-4 py-2.5 sm:px-5 sm:py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl sm:rounded-2xl transition-all font-black text-sm sm:text-base border border-white/15 hover:border-emerald-500/40 group-hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                    View Details
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 sm:mt-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600/25 to-blue-600/25 hover:from-emerald-600/35 hover:to-blue-600/35 border border-emerald-500/40 text-white font-black text-sm sm:text-base transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2">
              Schedule More
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Course Progress - Enhanced */}
        <div className="rounded-3xl p-8 md:p-10 bg-white/8 backdrop-blur-xl border border-white/15 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-2xl">
                <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">
                  Course Progress
                </h2>
                <p className="text-sm font-medium text-slate-300">
                  Keep learning, keep growing
                </p>
              </div>
            </div>
            <a
              href="/student/courses"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600/25 hover:bg-blue-600/35 border border-blue-500/40 text-blue-200 text-sm font-black transition-all hover:scale-110 shadow-lg"
            >
              View All
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCourse(index)}
                onMouseLeave={() => setHoveredCourse(null)}
                className="group relative rounded-2xl p-7 bg-white/5 hover:bg-white/8 border border-white/15 transition-all duration-300 cursor-pointer"
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
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{
                      background: `${course.color}20`,
                      border: `1px solid ${course.color}30`,
                    }}
                  >
                    <GraduationCap
                      className="w-7 h-7"
                      style={{ color: course.color }}
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-4xl font-black text-white drop-shadow-lg">
                    {course.progress}%
                  </span>
                </div>

                <h3 className="font-black text-white mb-3 text-xl group-hover:text-blue-200 transition-colors">
                  {course.title}
                </h3>

                <div className="space-y-3 mb-5">
                  <p className="text-base text-slate-300 font-semibold">
                    {course.lessons}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                    <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shadow-lg">
                      <span className="text-sm">👤</span>
                    </div>
                    {course.instructor}
                  </div>
                </div>

                <div className="relative w-full bg-white/15 rounded-full h-4 mb-4 overflow-hidden shadow-inner border border-white/10">
                  <div
                    className="h-4 rounded-full transition-all duration-1000 ease-out shadow-2xl"
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

                <div className="flex items-center justify-between pt-4 border-t border-white/15">
                  <div>
                    <p className="text-sm text-slate-400 mb-1 font-medium">Next Lesson</p>
                    <p className="text-sm font-black text-slate-200">
                      {course.nextLesson}
                    </p>
                  </div>
                  <button className="p-3 rounded-xl bg-white/8 hover:bg-white/12 transition-all group-hover:scale-110 border border-white/15 shadow-lg">
                    <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-white" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Progress indicator */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl transition-all duration-1000 shadow-lg"
                  style={{
                    background: `linear-gradient(90deg, ${course.color} ${course.progress}%, transparent ${course.progress}%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Learning Analytics - New Premium Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl p-8 bg-white/8 backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-2xl">
                  <BarChart3 className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-black text-white text-xl">Learning Performance</h3>
                  <p className="text-sm text-slate-300 font-medium">Last 30 days</p>
                </div>
              </div>
              <button className="p-3 rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 transition-all hover:scale-110 shadow-lg">
                <Download className="w-5 h-5 text-slate-200" strokeWidth={2.5} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-base text-slate-300 font-semibold">Study Hours</div>
                    <div className="text-xl font-black text-white">+18.5%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-purple-400 drop-shadow-lg">24h</div>
                  <div className="text-sm text-slate-400 font-medium">This month</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-base text-slate-300 font-semibold">
                      Completion Rate
                    </div>
                    <div className="text-xl font-black text-white">85.3%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-emerald-400 drop-shadow-lg">29</div>
                  <div className="text-sm text-slate-400 font-medium">Lessons done</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-base text-slate-300 font-semibold">Current Streak</div>
                    <div className="text-xl font-black text-white">
                      🔥 Excellent!
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-amber-400 drop-shadow-lg">12</div>
                  <div className="text-sm text-slate-400 font-medium">Days</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8 bg-white/8 backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-2xl">
                  <Target className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-black text-white text-xl">Application Success</h3>
                  <p className="text-sm text-slate-300 font-medium">Your job metrics</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
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
                    className="group p-4 rounded-2xl bg-white/5 border border-white/15 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="font-black text-white text-base">
                          {metric.label}
                        </span>
                      </div>
                      <span className="text-sm font-black text-slate-200">
                        {metric.count}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 rounded-full bg-white/15 overflow-hidden border border-white/10 shadow-inner">
                        <div
                          className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 shadow-lg`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                      <span className="text-base font-black text-white min-w-[3.5rem] text-right">
                        {metric.value}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full mt-5 py-4 rounded-2xl bg-gradient-to-r from-blue-600/25 to-purple-600/25 hover:from-blue-600/35 hover:to-purple-600/35 border border-blue-500/40 text-white font-black text-base transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2">
              Improve Profile
              <Star className="w-5 h-5" strokeWidth={2.5} />
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
