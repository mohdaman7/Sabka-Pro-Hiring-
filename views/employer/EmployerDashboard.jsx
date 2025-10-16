"use client";

import {
  Briefcase,
  Users,
  FileText,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Plus,
  ArrowRight,
  Eye,
  Star,
  Calendar,
  BarChart3,
  Filter,
  Search,
  MoreVertical,
  Download,
  Bell,
  Settings,
  ChevronRight,
  TrendingDown,
  Award,
  Target,
} from "lucide-react";
import { useState } from "react";

export default function PremiumEmployerDashboard() {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredJob, setHoveredJob] = useState(null);

  const stats = [
    {
      label: "Active Job Posts",
      value: "12",
      icon: Briefcase,
      change: "+2 this week",
      trend: "up",
      percentage: "+16.7%",
      color: "from-purple-500 to-purple-700",
      bgGlow: "rgba(168, 85, 247, 0.2)",
    },
    {
      label: "Total Applications",
      value: "156",
      icon: FileText,
      change: "+23 new",
      trend: "up",
      percentage: "+14.7%",
      color: "from-blue-500 to-blue-700",
      bgGlow: "rgba(59, 130, 246, 0.2)",
    },
    {
      label: "Shortlisted",
      value: "34",
      icon: Users,
      change: "12 pending review",
      trend: "up",
      percentage: "+8.2%",
      color: "from-emerald-500 to-emerald-700",
      bgGlow: "rgba(16, 185, 129, 0.2)",
    },
    {
      label: "Hired",
      value: "8",
      icon: TrendingUp,
      change: "This month",
      trend: "up",
      percentage: "+33.3%",
      color: "from-amber-500 to-amber-700",
      bgGlow: "rgba(245, 158, 11, 0.2)",
    },
  ];

  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹8-12 LPA",
      applications: 45,
      views: 234,
      postedDate: "5 days ago",
      status: "Active",
      priority: "High",
      newApps: 5,
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Remote",
      type: "Full-time",
      salary: "₹10-15 LPA",
      applications: 67,
      views: 456,
      postedDate: "2 weeks ago",
      status: "Active",
      priority: "Medium",
      newApps: 8,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Bangalore, Karnataka",
      type: "Contract",
      salary: "₹6-8 LPA",
      applications: 23,
      views: 178,
      postedDate: "1 week ago",
      status: "Active",
      priority: "Low",
      newApps: 2,
    },
  ];

  const recentApplications = [
    {
      id: 1,
      candidateName: "Amit Sharma",
      position: "Senior Frontend Developer",
      appliedDate: "2 hours ago",
      matchScore: 95,
      status: "New",
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      candidateName: "Priya Patel",
      position: "Backend Developer",
      appliedDate: "5 hours ago",
      matchScore: 88,
      status: "Under Review",
      experience: "4 years",
      skills: ["Python", "Django", "AWS"],
    },
    {
      id: 3,
      candidateName: "Rahul Kumar",
      position: "UI/UX Designer",
      appliedDate: "1 day ago",
      matchScore: 92,
      status: "Shortlisted",
      experience: "3 years",
      skills: ["Figma", "Adobe XD", "Prototyping"],
    },
    {
      id: 4,
      candidateName: "Sneha Desai",
      position: "Senior Frontend Developer",
      appliedDate: "2 days ago",
      matchScore: 85,
      status: "New",
      experience: "6 years",
      skills: ["Vue.js", "React", "GraphQL"],
    },
  ];

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Original Decorative background orbs */}
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

      <div className="relative z-10 p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Premium Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-purple-700/90 to-blue-600/90 backdrop-blur-xl" />
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse"
              style={{ mixBlendMode: "overlay" }}
            />
          </div>
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-8 h-8 text-amber-300" />
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl text-white text-sm font-medium border border-white/30">
                    Premium Account
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                  Welcome back, Tech Solutions!
                </h1>
                <p className="text-white/90 text-lg mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  You have{" "}
                  <span className="font-bold text-amber-300">
                    23 new applications
                  </span>{" "}
                  and{" "}
                  <span className="font-bold text-emerald-300">
                    12 active job postings
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="group/btn relative px-6 py-3 bg-white text-purple-700 rounded-xl font-semibold shadow-2xl shadow-white/20 transition-all hover:scale-105 hover:shadow-white/30 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-purple-50 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Plus className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Post New Job</span>
                  </button>
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-semibold border border-white/30 transition-all hover:scale-105 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Browse Candidates
                  </button>
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold border border-white/20 transition-all hover:scale-105 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Analytics
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-xl border border-white/30 shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl backdrop-blur-xl border border-white/40 shadow-2xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
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
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
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
                {/* Animated background glow */}
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
                      {stat.change}
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-2xl transform translate-x-6 -translate-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Jobs - Enhanced */}
          <div className="lg:col-span-2 rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Active Job Postings
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage your live positions
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
                  href="/employer/jobs"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-sm font-medium transition-all hover:scale-105"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {activeJobs.map((job) => (
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
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">
                          {job.title}
                        </h3>
                        {job.newApps > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold animate-pulse">
                            +{job.newApps} New
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 backdrop-blur-xl">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 backdrop-blur-xl">
                          <Briefcase className="w-4 h-4 text-blue-400" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 backdrop-blur-xl">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          job.priority === "High"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : job.priority === "Medium"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
                        }`}
                      >
                        {job.priority}
                      </span>
                      <button className="p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4 text-slate-300" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">
                            Applications
                          </div>
                          <div className="text-sm font-bold text-white">
                            {job.applications}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                          <Eye className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">Views</div>
                          <div className="text-sm font-bold text-white">
                            {job.views}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-4 h-4" />
                      {job.postedDate}
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-purple-500 to-purple-700 rounded-r-full transition-all duration-300 group-hover:h-3/4" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications - Enhanced */}
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Recent Applications
                  </h2>
                  <p className="text-xs text-slate-400">Latest candidates</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {recentApplications.map((application) => (
                <div
                  key={application.id}
                  className="group relative rounded-xl p-4 bg-white/3 hover:bg-white/5 border border-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  style={{
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-lg">
                          {application.candidateName.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center border-2 border-slate-950">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm truncate group-hover:text-purple-300 transition-colors">
                        {application.candidateName}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">
                        {application.position}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-500">
                          {application.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {application.skills.slice(0, 2).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {application.skills.length > 2 && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs">
                        +{application.skills.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000"
                            style={{ width: `${application.matchScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-emerald-400">
                          {application.matchScore}%
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        application.status === "New"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : application.status === "Shortlisted"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-slate-500">
                      {application.appliedDate}
                    </p>
                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 transition-all">
                      <ChevronRight className="w-4 h-4 text-purple-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 text-white font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              View All Applications
              <ArrowRight className="w-4 h-4" />
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
                <Plus className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors">
                Post a New Job
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Create and publish a new job opening to attract top talent
              </p>
              <div className="flex items-center gap-2 text-purple-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                Get Started
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl p-6 bg-gradient-to-br from-blue-600/10 to-blue-800/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Search className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">
                Browse Candidates
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Search through verified candidate profiles and portfolios
              </p>
              <div className="flex items-center gap-2 text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                Explore Now
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl p-6 bg-gradient-to-br from-emerald-600/10 to-emerald-800/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-emerald-300 transition-colors">
                Review Applications
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Manage and review all pending candidate applications
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                View Queue
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Overview - New Premium Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Hiring Performance</h3>
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
                    <div className="text-sm text-slate-400">
                      Application Rate
                    </div>
                    <div className="text-lg font-bold text-white">+24.5%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-purple-400">156</div>
                  <div className="text-xs text-slate-500">Total</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Interview Rate</div>
                    <div className="text-lg font-bold text-white">21.8%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400">34</div>
                  <div className="text-xs text-slate-500">Shortlisted</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Success Rate</div>
                    <div className="text-lg font-bold text-white">23.5%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-400">8</div>
                  <div className="text-xs text-slate-500">Hired</div>
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
                  <h3 className="font-bold text-white">Top Performing Jobs</h3>
                  <p className="text-xs text-slate-400">By applications</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  position: "Backend Developer",
                  apps: 67,
                  growth: "+12",
                  color: "from-blue-500 to-blue-700",
                },
                {
                  position: "Senior Frontend Developer",
                  apps: 45,
                  growth: "+8",
                  color: "from-purple-500 to-purple-700",
                },
                {
                  position: "UI/UX Designer",
                  apps: 23,
                  growth: "+3",
                  color: "from-emerald-500 to-emerald-700",
                },
              ].map((job, idx) => (
                <div
                  key={idx}
                  className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${job.color} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-white text-sm">
                        {job.position}
                      </span>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      {job.growth}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${job.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${(job.apps / 67) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-white">
                      {job.apps}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 text-white font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              View Full Analytics
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
