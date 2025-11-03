"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  ArrowUp,
  Target,
  Clock,
  Star,
  Share2,
  Sparkles,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  Activity,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function EmployerJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹8-12 LPA",
      applications: 45,
      views: 234,
      postedDate: "2024-01-15",
      expiryDate: "2024-02-15",
      status: "Active",
      priority: "High",
      featured: true,
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "₹10-15 LPA",
      applications: 67,
      views: 456,
      postedDate: "2024-01-10",
      expiryDate: "2024-02-10",
      status: "Active",
      priority: "Medium",
      featured: false,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Bangalore, Karnataka",
      type: "Contract",
      salary: "₹6-8 LPA",
      applications: 23,
      views: 178,
      postedDate: "2024-01-20",
      expiryDate: "2024-02-20",
      status: "Active",
      priority: "Low",
      featured: true,
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Pune, Maharashtra",
      type: "Full-time",
      salary: "₹15-20 LPA",
      applications: 12,
      views: 89,
      postedDate: "2024-01-05",
      expiryDate: "2024-01-25",
      status: "Expiring Soon",
      priority: "High",
      featured: false,
    },
    {
      id: 5,
      title: "Data Analyst",
      department: "Analytics",
      location: "Hyderabad, Telangana",
      type: "Full-time",
      salary: "₹5-8 LPA",
      applications: 8,
      views: 45,
      postedDate: "2023-12-20",
      expiryDate: "2024-01-05",
      status: "Expired",
      priority: "Low",
      featured: false,
    },
  ];

  const stats = [
    {
      label: "Total Jobs",
      value: jobs.length,
      icon: Briefcase,
      change: "+2 this week",
      changePercent: "+15%",
      changePositive: true,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Active Jobs",
      value: jobs.filter((j) => j.status === "Active").length,
      icon: TrendingUp,
      change: "75% of total",
      changePercent: "+8%",
      changePositive: true,
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Total Applications",
      value: jobs.reduce((sum, j) => sum + j.applications, 0),
      icon: Users,
      change: "+23 new",
      changePercent: "+12%",
      changePositive: true,
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Total Views",
      value: jobs.reduce((sum, j) => sum + j.views, 0),
      icon: Eye,
      change: "+156 this week",
      changePercent: "+18%",
      changePositive: true,
      gradient: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q);
    const matchesFilter =
      filterStatus === "all" ||
      job.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const statusBadgeConfig = (status) => {
    switch (status) {
      case "Active":
        return {
          class: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
          gradient: "from-emerald-500 to-teal-500",
          icon: CheckCircle2,
        };
      case "Expiring Soon":
        return {
          class: "bg-orange-500/15 text-orange-400 border-orange-500/30",
          gradient: "from-orange-500 to-amber-500",
          icon: Clock,
        };
      case "Expired":
        return {
          class: "bg-gray-500/15 text-gray-400 border-gray-500/30",
          gradient: "from-gray-500 to-slate-500",
          icon: AlertCircle,
        };
      default:
        return {
          class: "bg-gray-500/15 text-gray-400 border-gray-500/30",
          gradient: "from-gray-500 to-slate-500",
          icon: AlertCircle,
        };
    }
  };

  const priorityBadgeConfig = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500/15 text-red-400 border-red-500/30";
      case "Medium":
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
      case "Low":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/15 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="relative p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 min-h-screen overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
          style={{ background: "rgba(128,55,145,0.12)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse-slower"
          style={{ background: "rgba(184,123,209,0.10)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl animate-float"
          style={{ background: "rgba(240,194,238,0.06)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_30%)]" />
      </div>

      {/* Premium Header */}
      <div
        className="group relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl backdrop-blur-md border border-white/10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(128,55,145,0.3)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.16), rgba(184,123,209,0.12))",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#803791]/10 to-[#b87bd1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-5 md:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-1">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div
                className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-1 sm:mb-2">
                Job Postings
              </h1>
              <p className="text-white/70 text-sm sm:text-base md:text-lg">
                Manage and track all your job postings with advanced analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <button className="group/btn relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold text-white border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl flex-1 lg:flex-initial">
              <div className="absolute inset-0 bg-white/5 group-hover/btn:bg-white/10 transition-colors duration-300"></div>
              <span className="relative flex items-center justify-center gap-1.5 sm:gap-2">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-y-1 transition-transform duration-300" />
                <span className="hidden sm:inline">Export</span>
              </span>
            </button>

            <button className="group/btn relative px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-1 lg:flex-initial">
              <div
                className="absolute inset-0 transition-transform group-hover/btn:scale-105 duration-300"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              ></div>
              <div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg,#b87bd1,#803791)",
                }}
              ></div>
              <span className="relative flex items-center justify-center gap-1.5 sm:gap-2">
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
                <span className="hidden sm:inline">Post New Job</span>
                <span className="sm:hidden">Post Job</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              border: "1px solid rgba(255,255,255,0.12)",
              animationDelay: `${index * 100}ms`,
            }}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div
              className={`absolute inset-0 rounded-xl sm:rounded-2xl sm:rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            ></div>

            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-xl sm:rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

            <div className="relative">
              <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
                <div
                  className={`p-3 sm:p-4 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-br ${stat.gradient}`}
                >
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>

                <div
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold ${stat.bgColor} border border-white/10 group-hover:scale-110 transition-transform duration-300`}
                >
                  <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{stat.changePercent}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-bold text-white/70 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text transition-all duration-300">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-[#b87bd1] font-semibold flex items-center gap-1.5 sm:gap-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  {stat.change}
                </p>
              </div>

              <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${
                    stat.gradient
                  } transform origin-left transition-transform duration-1000 ${
                    hoveredStat === index ? "scale-x-100" : "scale-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Search Section */}
      <div
        className="rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl backdrop-blur-md border border-white/10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:items-center">
          <div className="relative flex-1 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-lg sm:rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-500"></div>
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-focus-within:text-[#b87bd1] transition-colors duration-300 z-10" />
              <input
                placeholder="Search by job title, department, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] hover:bg-white/[0.1] bg-white/5 border border-white/10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] hover:bg-white/[0.1] cursor-pointer bg-white/5 border border-white/10"
            >
              <option value="all" className="bg-slate-800">
                📋 All Status
              </option>
              <option value="active" className="bg-slate-800">
                ✅ Active
              </option>
              <option value="expiring soon" className="bg-slate-800">
                ⏰ Expiring Soon
              </option>
              <option value="expired" className="bg-slate-800">
                ❌ Expired
              </option>
            </select>

            <button className="p-3 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:rotate-180">
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 sm:gap-3 text-white/70">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#b87bd1]" />
            <span className="text-xs sm:text-sm font-semibold">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-white/70">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold">
              {jobs.filter((j) => j.status === "Active").length} Active
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-white/70">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            <span className="text-xs sm:text-sm font-semibold">
              {jobs.filter((j) => j.status === "Expiring Soon").length} Expiring
            </span>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {filteredJobs.map((job, index) => {
          const statusConfig = statusBadgeConfig(job.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={job.id}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
                border: "1px solid rgba(255,255,255,0.12)",
                animationDelay: `${index * 50}ms`,
              }}
              onMouseEnter={() => setHoveredCard(job.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#803791] via-[#b87bd1] to-[#803791] rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>

              {job.featured && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg sm:rounded-xl blur-md opacity-50 animate-pulse"></div>
                    <div className="relative px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center gap-1 sm:gap-1.5 md:gap-2 shadow-lg">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
                      <span className="text-xs font-bold text-white">
                        FEATURED
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative backdrop-blur-xl p-4 sm:p-5 md:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="relative group/icon flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-lg sm:rounded-xl blur-md opacity-50 group-hover/icon:opacity-75 transition-opacity duration-300"></div>
                        <div
                          className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl transform group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-all duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg,#803791,#b87bd1)",
                          }}
                        >
                          <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text transition-all duration-300">
                            {job.title}
                          </h3>
                          <div
                            className={`flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border-2 ${statusConfig.class} group-hover:scale-105 transition-transform duration-300`}
                          >
                            <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                            {job.status}
                          </div>
                          <div
                            className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-xs font-bold border ${priorityBadgeConfig(
                              job.priority
                            )}`}
                          >
                            {job.priority}
                          </div>
                        </div>

                        <p className="text-[#b87bd1] font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                          {job.department}
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
                          <div className="group/detail flex items-center gap-2 sm:gap-2.5 md:gap-3 text-white/70 hover:text-white transition-colors duration-300">
                            <div className="p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl bg-white/5 group-hover/detail:bg-white/10 group-hover/detail:scale-110 transition-all duration-300 flex-shrink-0">
                              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#b87bd1]" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold truncate">
                              {job.location}
                            </span>
                          </div>

                          <div className="group/detail flex items-center gap-2 sm:gap-2.5 md:gap-3 text-white/70 hover:text-white transition-colors duration-300">
                            <div className="p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl bg-white/5 group-hover/detail:bg-white/10 group-hover/detail:scale-110 transition-all duration-300 flex-shrink-0">
                              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold truncate">
                              {job.type}
                            </span>
                          </div>

                          <div className="group/detail flex items-center gap-2 sm:gap-2.5 md:gap-3 text-white/70 hover:text-white transition-colors duration-300">
                            <div className="p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl bg-white/5 group-hover/detail:bg-white/10 group-hover/detail:scale-110 transition-all duration-300 flex-shrink-0">
                              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-[#b87bd1] truncate">
                              {job.salary}
                            </span>
                          </div>

                          <div className="group/detail flex items-center gap-2 sm:gap-2.5 md:gap-3 text-white/70 hover:text-white transition-colors duration-300">
                            <div className="p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl bg-white/5 group-hover/detail:bg-white/10 group-hover/detail:scale-110 transition-all duration-300 flex-shrink-0">
                              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold truncate">
                              {new Date(job.postedDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div className="group/stat flex items-center gap-2 sm:gap-3 md:gap-4 px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-xl">
                            <div
                              className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl shadow-lg group-hover/stat:scale-110 group-hover/stat:rotate-12 transition-all duration-300 flex-shrink-0"
                              style={{
                                background:
                                  "linear-gradient(135deg, #10b981, #06b6d4)",
                              }}
                            >
                              <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover/stat:text-transparent group-hover/stat:bg-gradient-to-r group-hover/stat:from-white group-hover/stat:to-white/70 group-hover/stat:bg-clip-text transition-all">
                                {job.applications}
                              </p>
                              <p className="text-xs text-white/60 font-semibold truncate">
                                Applications
                              </p>
                            </div>
                          </div>

                          <div className="group/stat flex items-center gap-2 sm:gap-3 md:gap-4 px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-xl">
                            <div
                              className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl shadow-lg group-hover/stat:scale-110 group-hover/stat:rotate-12 transition-all duration-300 flex-shrink-0"
                              style={{
                                background:
                                  "linear-gradient(135deg, #f59e0b, #ef4444)",
                              }}
                            >
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover/stat:text-transparent group-hover/stat:bg-gradient-to-r group-hover/stat:from-white group-hover/stat:to-white/70 group-hover/stat:bg-clip-text transition-all">
                                {job.views}
                              </p>
                              <p className="text-xs text-white/60 font-semibold truncate">
                                Views
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex flex-col gap-2 sm:gap-3">
                    <button className="group/btn relative p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-xl">
                      <div className="absolute inset-0 bg-blue-500/10 group-hover/btn:bg-blue-500/20 transition-colors duration-300"></div>
                      <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
                    </button>

                    <button className="group/btn relative p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-xl">
                      <div className="absolute inset-0 bg-emerald-500/10 group-hover/btn:bg-emerald-500/20 transition-colors duration-300"></div>
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
                    </button>

                    <button className="group/btn relative p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-xl">
                      <div className="absolute inset-0 bg-red-500/10 group-hover/btn:bg-red-500/20 transition-colors duration-300"></div>
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
                    </button>

                    <button className="group/btn relative p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-xl">
                      <div className="absolute inset-0 bg-white/5 group-hover/btn:bg-white/10 transition-colors duration-300"></div>
                      <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 relative z-10 group-hover/btn:scale-125 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Mobile Action Buttons */}
                <div className="lg:hidden flex items-center gap-2 pt-3 sm:pt-4 border-t border-white/10 mt-3 sm:mt-4">
                  <button className="flex-1 group/btn relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30">
                    <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 text-blue-400 font-semibold text-xs sm:text-sm">
                      <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </span>
                  </button>
                  <button className="flex-1 group/btn relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30">
                    <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 text-emerald-400 font-semibold text-xs sm:text-sm">
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </span>
                  </button>
                  <button className="group/btn relative p-2 sm:p-2.5 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30">
                    <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-400 relative z-10" />
                  </button>
                  <button className="group/btn relative p-2 sm:p-2.5 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 bg-white/5 hover:bg-white/10 border border-white/10">
                    <MoreVertical className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white/80 relative z-10" />
                  </button>
                </div>

                {job.status === "Expiring Soon" && (
                  <div className="mt-4 sm:mt-5 md:mt-6 relative overflow-hidden rounded-lg sm:rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 animate-pulse"></div>
                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 border-2 border-orange-500/30 bg-orange-500/10 backdrop-blur-sm">
                      <div className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg flex-shrink-0">
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce-subtle" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-orange-300 mb-1">
                          ⚠️ Expiring Soon
                        </p>
                        <p className="text-xs sm:text-sm text-orange-400/90">
                          This job expires on{" "}
                          <span className="font-bold">
                            {new Date(job.expiryDate).toLocaleDateString()}
                          </span>
                          . Renew now to keep it active and visible.
                        </p>
                      </div>
                      <button className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 transition-transform duration-300 shadow-lg flex-shrink-0">
                        Renew Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl sm:rounded-3xl shadow-2xl">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              }}
            ></div>

            <div className="relative p-20 text-center backdrop-blur-xl border border-white/10">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-xl sm:rounded-2xl sm:rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <div
                  className="relative w-32 h-32 rounded-xl sm:rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <Target className="w-16 h-16 text-white" />
                </div>
              </div>

              <h3 className="text-base sm:text-lg md:text-xl sm:text-lg sm:text-base sm:text-lg md:text-xl md:text-2xl md:text-3xl font-extrabold text-white mb-4">
                No jobs found
              </h3>
              <p className="text-white/60 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                Try adjusting your search criteria or create a new job posting
                to attract top talent to your organization
              </p>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                  className="px-8 py-4 rounded-xl font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  Clear Filters
                </button>

                <button className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div
                    className="absolute inset-0 transition-transform group-hover:scale-105 duration-300"
                    style={{
                      background: "linear-gradient(135deg,#803791,#b87bd1)",
                    }}
                  ></div>
                  <span className="relative flex items-center gap-2">
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Post Your First Job
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.12;
          }
          50% {
            opacity: 0.18;
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.16;
          }
        }

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

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 5s ease-in-out infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #803791, #b87bd1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #b87bd1, #803791);
        }
      `}</style>
    </div>
  );
}
