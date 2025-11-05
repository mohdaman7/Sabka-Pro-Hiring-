"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Download,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  User,
  GraduationCap,
  MapPin,
  Calendar,
  FileText,
  Eye,
  MessageSquare,
  Filter,
  MoreVertical,
  Star,
  Send,
  Plus,
  Users,
  ArrowRight,
  Mail,
  Phone,
  Briefcase,
  ChevronUp,
  TrendingUp,
  Award,
  Target,
  Zap,
  Sparkles,
  BookOpen,
  Globe,
  Heart,
  ThumbsUp,
  Building2,
} from "lucide-react";
import { applicationService } from "@/services/applicationService";
import ScheduleInterviewDialog from "@/views/employer/ScheduleInterviewDialog";
import InterviewManagementDialog from "@/views/employer/InterviewManagementDialog";
import InterviewDashboard from "@/views/employer/InterviewDashboard";

export default function EmployerApplications() {
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState("applications"); // applications or interviews
  const [search, setSearch] = useState("");

  // Handle URL query parameter for view switching
  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "interviews") {
      setActiveView("interviews");
    }
  }, [searchParams]);
  const [stage, setStage] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scheduleApp, setScheduleApp] = useState(null);
  const [manageInterviewApp, setManageInterviewApp] = useState(null);

  const computedStats = useMemo(() => {
    const counts = applications.reduce((acc, app) => {
      const key = app.status || "applied";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    counts.totalApplications = applications.length;
    return counts;
  }, [applications]);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      setLoading(true);
      await applicationService.updateStatus(applicationId, newStatus);
      setApplications(
        applications.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (e) {
      setError(
        e?.response?.data?.message || e?.message || "Failed to update status"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await applicationService.employerMyApplications();
        if (!mounted) return;
        
        const apps = res?.data || [];
        
        // Fetch interview status for each application
        const appsWithInterviews = await Promise.all(
          apps.map(async (app) => {
            try {
              const interviewRes = await applicationService.getInterviewByApplicationId(app._id);
              return {
                ...app,
                hasInterview: !!interviewRes?.data,
                interviewData: interviewRes?.data || null
              };
            } catch (error) {
              return { ...app, hasInterview: false, interviewData: null };
            }
          })
        );
        
        if (!mounted) return;
        setApplications(appsWithInterviews);
        setStats(res?.stats || {});
      } catch (e) {
        setError(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to load applications"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const stages = [
    {
      value: "all",
      label: "All Applications",
      icon: Users,
      color: "slate",
      gradient: "from-slate-500 to-slate-600",
      count: computedStats.totalApplications || 0,
    },
    {
      value: "applied",
      label: "New",
      icon: Sparkles,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      count: computedStats.applied || 0,
    },
    {
      value: "reviewed",
      label: "Reviewed",
      icon: Eye,
      color: "cyan",
      gradient: "from-cyan-500 to-teal-500",
      count: computedStats.reviewed || 0,
    },
    {
      value: "interview",
      label: "Interview",
      icon: Calendar,
      color: "indigo",
      gradient: "from-indigo-500 to-purple-500",
      count: computedStats.interview || 0,
    },
    {
      value: "hired",
      label: "Hired",
      icon: Award,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      count: computedStats.hired || 0,
    },
    {
      value: "rejected",
      label: "Rejected",
      icon: XCircle,
      color: "rose",
      gradient: "from-rose-500 to-pink-500",
      count: computedStats.rejected || 0,
    },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sorted = [...applications].sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });
    return sorted.filter((a) => {
      const statusValue = a.status || "applied";
      const candidate = a.studentId || {};
      const job = a.jobId || {};
      const matchesStage = stage === "all" || statusValue === stage;
      const haystack = [
        `${candidate.firstName || ""} ${candidate.lastName || ""}`,
        job.title || "",
        candidate.address?.city || "",
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesStage && matchesQuery;
    });
  }, [applications, search, stage, sortBy]);

  return (
    <div className="relative p-4 sm:p-6 md:p-8 space-y-6 min-h-screen bg-[#0a0118]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`
        }} />
      </div>

      {/* View Toggle Tabs - Premium Design */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveView("applications")}
          className={`flex-1 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
            activeView === "applications"
              ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-2xl shadow-purple-500/50 scale-105"
              : "bg-[#1a1a2e] text-white/70 hover:text-white border-2 border-white/10 hover:border-purple-500/50 hover:scale-105"
          }`}
        >
          <Users className="w-5 h-5 inline-block mr-2" />
          Applications
        </button>
        <button
          onClick={() => setActiveView("interviews")}
          className={`flex-1 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
            activeView === "interviews"
              ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-2xl shadow-purple-500/50 scale-105"
              : "bg-[#1a1a2e] text-white/70 hover:text-white border-2 border-white/10 hover:border-purple-500/50 hover:scale-105"
          }`}
        >
          <Calendar className="w-5 h-5 inline-block mr-2" />
          Interview Dashboard
        </button>
      </div>

      {/* Render based on active view */}
      {activeView === "interviews" ? (
        <InterviewDashboard
          onManageInterview={(app) => setManageInterviewApp(app)}
          onScheduleInterview={(app) => setScheduleApp(app)}
        />
      ) : (
        <>
          {/* Premium Solid Header */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-purple-500/30" style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
          }}>

        <div className="relative p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4 flex-1">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Clean icon container */}
                <div className="relative">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shadow-lg bg-white/10 border border-white/20"
                  >
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-1 sm:mb-2">
                    <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                      Applications Dashboard
                    </span>
                  </h1>
                  <p className="text-white/60 text-sm sm:text-base md:text-lg font-medium">
                    Advanced candidate management with real-time insights
                  </p>
                </div>
              </div>

              {/* Live stats ticker */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 pl-0 sm:pl-16 md:pl-20 lg:pl-24">
                <div className="flex items-center gap-2 text-white/70">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-semibold">
                    {applications.length} Active
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-semibold">Live Updates</span>
                </div>
              </div>
            </div>

            {/* Clean action buttons */}
            <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
              <button className="group/btn px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex-1 lg:flex-initial">
                <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  <span className="hidden sm:inline">Export</span>
                </span>
              </button>

              <button className="group/btn px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg text-sm sm:text-base font-semibold text-white bg-white/20 hover:bg-white/30 border border-white/30 transition-all flex-1 lg:flex-initial">
                <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  <span className="hidden sm:inline">Filters</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {stages.map((stat, index) => {
          const Icon = stat.icon;
          const isActive = stage === stat.value;

          return (
            <div
              key={stat.value}
              onClick={() => setStage(stat.value)}
              className={`group relative rounded-2xl p-5 md:p-6 shadow-2xl transition-all duration-300 cursor-pointer border-2 ${
                isActive
                  ? "bg-gradient-to-br from-[#803791] to-[#b87bd1] border-purple-400 scale-105 shadow-purple-500/50"
                  : "bg-[#1a1a2e] border-white/10 hover:border-purple-500/50 hover:scale-105"
              }`}
            >

              <div className="relative space-y-5">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-4 rounded-xl sm:rounded-2xl shadow-lg transform ${
                      isActive
                        ? "scale-110 rotate-6"
                        : "group-hover:scale-110 group-hover:rotate-6"
                    } transition-all duration-700 bg-gradient-to-br ${
                      stat.gradient
                    }`}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>

                  {isActive && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-full blur-md animate-pulse" />
                      <div className="relative w-3 h-3 rounded-full bg-gradient-to-r from-[#803791] to-[#b87bd1]" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white/70 uppercase tracking-wider mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-white/50 text-xs font-medium">
                    Click to filter
                  </p>
                </div>

                {/* Animated progress bar */}
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${
                      stat.gradient
                    } transform origin-left transition-all duration-1000 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium Search and Filters */}
      <div
        className="rounded-2xl p-6 md:p-8 shadow-2xl border-2 border-purple-500/30"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 md:gap-6">
          {/* Premium search input */}
          <div className="flex-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-[20px] opacity-0 group-focus-within:opacity-25 blur-lg transition-opacity duration-500" />
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-[#b87bd1] group-focus-within:scale-110 transition-all duration-500"
                strokeWidth={2.5}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates, positions, skills..."
                className="w-full pl-14 pr-14 py-5 bg-white/5 text-white placeholder-white/40 rounded-[20px] border-2 border-white/10 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <XCircle className="w-5 h-5" strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>

          {/* Premium sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-5 bg-white/5 text-white border-2 border-white/10 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] cursor-pointer font-semibold appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.6)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_1rem]"
            style={{ paddingRight: "3rem" }}
          >
            <option value="newest">⏰ Newest First</option>
            <option value="oldest">🕐 Oldest First</option>
            <option value="match">⭐ Best Match</option>
            <option value="name">🔤 Name A-Z</option>
          </select>
        </div>

        {/* Premium stage pills */}
        <div className="flex flex-wrap gap-3 mt-8">
          {stages.map((s) => {
            const Icon = s.icon;
            const isActive = stage === s.value;

            return (
              <button
                key={s.value}
                onClick={() => setStage(s.value)}
                className={`group relative px-6 py-3.5 rounded-xl sm:rounded-2xl font-bold text-sm transition-all duration-500 flex items-center gap-3 overflow-hidden ${
                  isActive
                    ? "text-white shadow-2xl scale-105"
                    : "text-white/60 hover:text-white hover:scale-105"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg,#803791,#b87bd1)"
                    : "rgba(255,255,255,0.06)",
                  border: isActive
                    ? "2px solid rgba(184,123,209,0.5)"
                    : "2px solid rgba(255,255,255,0.1)",
                }}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#b87bd1] to-[#803791] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                <Icon
                  className={`w-5 h-5 relative z-10 ${
                    isActive ? "animate-bounce-subtle" : "group-hover:scale-110"
                  } transition-transform duration-500`}
                  strokeWidth={2.5}
                />
                <span className="relative z-10">{s.label}</span>
                <span
                  className={`relative z-10 px-3 py-1 rounded-xl text-xs font-black transition-all duration-500 ${
                    isActive
                      ? "bg-white/30 text-white"
                      : "bg-white/10 text-white/60 group-hover:bg-white/25"
                  }`}
                >
                  {s.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ultra Premium Applications List */}
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {filtered.map((app, index) => {
          const isOpen = expandedId === app._id;
          const isHovered = hoveredCard === app._id;

          return (
            <div
              key={app._id}
              onMouseEnter={() => setHoveredCard(app._id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border-2 shadow-2xl ${
                isHovered
                  ? "border-purple-500 shadow-purple-500/50 scale-[1.02]"
                  : "border-white/10 hover:border-purple-500/50"
              }`}
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                animationDelay: `${index * 60}ms`,
              }}
            >

              <div className="relative p-4 sm:p-5 md:p-6">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-5">
                  {/* Candidate Info */}
                  <div className="flex-1 flex items-start gap-3 sm:gap-4">
                    {/* Clean Avatar */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-[#803791] to-[#b87bd1] border-2 border-white/20"
                      >
                        <span className="text-white font-black text-base sm:text-lg md:text-xl">
                          {app.studentId?.firstName?.charAt(0)}
                          {app.studentId?.lastName?.charAt(0)}
                        </span>
                      </div>
                      {/* Status indicator */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-400 rounded-full border-2 sm:border-4 border-[#0a0118]" />
                    </div>

                    {/* Candidate Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                          {app.studentId?.firstName} {app.studentId?.lastName}
                        </h3>
                        <StageBadge value={app.status} />
                      </div>

                      <p className="text-[#b87bd1] font-semibold text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-[#803791]/20 border border-[#b87bd1]/30">
                          <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                        </div>
                        <span className="truncate">{app.jobId?.title}</span>
                      </p>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div className="group/detail flex items-center gap-3 text-white/70 hover:text-white transition-all duration-500">
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover/detail:bg-gradient-to-br group-hover/detail:from-[#803791]/20 group-hover/detail:to-[#b87bd1]/20 group-hover/detail:border-[#b87bd1]/30 transition-all duration-500">
                            <Mail className="w-4 h-4" strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-semibold truncate">
                            {app.studentId?.email}
                          </span>
                        </div>

                        {app.studentId?.phone && (
                          <div className="group/detail flex items-center gap-3 text-white/70 hover:text-white transition-all duration-500">
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover/detail:bg-gradient-to-br group-hover/detail:from-[#803791]/20 group-hover/detail:to-[#b87bd1]/20 group-hover/detail:border-[#b87bd1]/30 transition-all duration-500">
                              <Phone className="w-4 h-4" strokeWidth={2.5} />
                            </div>
                            <span className="text-sm font-semibold">
                              {app.studentId?.phone}
                            </span>
                          </div>
                        )}

                        {app.studentId?.address?.city && (
                          <div className="group/detail flex items-center gap-3 text-white/70 hover:text-white transition-all duration-500">
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover/detail:bg-gradient-to-br group-hover/detail:from-[#803791]/20 group-hover/detail:to-[#b87bd1]/20 group-hover/detail:border-[#b87bd1]/30 transition-all duration-500">
                              <MapPin className="w-4 h-4" strokeWidth={2.5} />
                            </div>
                            <span className="text-sm font-semibold">
                              {app.studentId?.address.city},{" "}
                              {app.studentId?.address.state}
                            </span>
                          </div>
                        )}

                        {app.meta?.yearsExperience && (
                          <div className="group/detail flex items-center gap-3 text-white/70 hover:text-white transition-all duration-500">
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover/detail:bg-gradient-to-br group-hover/detail:from-[#803791]/20 group-hover/detail:to-[#b87bd1]/20 group-hover/detail:border-[#b87bd1]/30 transition-all duration-500">
                              <Award className="w-4 h-4" strokeWidth={2.5} />
                            </div>
                            <span className="text-sm font-black">
                              {app.meta.yearsExperience} Years Experience
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Premium Action Buttons */}
                  <div className="flex flex-row lg:flex-col gap-3 justify-end items-stretch lg:items-end flex-wrap sm:flex-nowrap">
                    {/* Schedule Button */}
                    {(app.status === "applied" ||
                      app.status === "reviewed" ||
                      app.status === "interview") && (
                      <button
                        onClick={() => setScheduleApp(app)}
                        className="group/btn relative px-6 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex-1 sm:flex-initial bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border-2 border-blue-400/50"
                      >
                        <span className="relative flex items-center gap-2 justify-center">
                          <Calendar
                            className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300"
                            strokeWidth={2.5}
                          />
                          {app.hasInterview ? "Update Interview" : "Schedule Interview"}
                        </span>
                      </button>
                    )}

                    {/* Manage Interview Button - Shows when interview exists */}
                    {app.hasInterview && app.interviewData && (
                      <button
                        onClick={() => setManageInterviewApp(app)}
                        className="group/btn relative px-6 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex-1 sm:flex-initial bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:from-[#9147a1] hover:to-[#c88be1] border-2 border-purple-400/50"
                      >
                        <span className="relative flex items-center gap-2 justify-center">
                          <Sparkles
                            className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300"
                            strokeWidth={2.5}
                          />
                          Manage Interview
                        </span>
                      </button>
                    )}

                    {/* Resume Button */}
                    {app.resumeUrl && (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative px-6 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex-1 sm:flex-initial text-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-2 border-emerald-400/50"
                      >
                        <span className="relative flex items-center gap-2 justify-center">
                          <FileText
                            className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-500"
                            strokeWidth={2.5}
                          />
                          Resume
                        </span>
                      </a>
                    )}

                    {/* Expand Button */}
                    <button
                      onClick={() => setExpandedId(isOpen ? null : app._id)}
                      className="group/btn relative px-6 py-3.5 rounded-xl sm:rounded-2xl font-bold text-sm text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl flex-1 sm:flex-initial"
                      style={{
                        background: isOpen
                          ? "linear-gradient(135deg,#803791,#b87bd1)"
                          : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                        border: isOpen
                          ? "2px solid rgba(184,123,209,0.5)"
                          : "2px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      <span className="relative flex items-center gap-2 justify-center">
                        {isOpen ? (
                          <>
                            <ChevronUp
                              className="w-4 h-4 group-hover/btn:-translate-y-1 transition-transform duration-500"
                              strokeWidth={2.5}
                            />
                            Less
                          </>
                        ) : (
                          <>
                            <ChevronDown
                              className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform duration-500"
                              strokeWidth={2.5}
                            />
                            Details
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Expanded Details with Premium Animations */}
                {isOpen && (
                  <div className="mt-8 space-y-4 sm:space-y-5 md:space-y-6 border-t border-white/10 pt-8 animate-slide-down">
                    {/* Previous Experience Card */}
                    {(app.meta?.previousCompany ||
                      app.meta?.previousPosition) && (
                      <div
                        className="group/card relative p-6 rounded-[20px] overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#803791]/10 to-[#b87bd1]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                          <h4 className="text-sm font-black text-white mb-6 flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                              <Briefcase
                                className="w-5 h-5 text-white"
                                strokeWidth={2.5}
                              />
                            </div>
                            <span className="text-lg">Previous Experience</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            {app.meta.previousPosition && (
                              <div className="group/item flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#b87bd1]/30 transition-all duration-500">
                                <Target
                                  className="w-5 h-5 text-[#b87bd1] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-500"
                                  strokeWidth={2.5}
                                />
                                <div className="min-w-0">
                                  <div className="text-xs text-white/50 font-bold mb-1">
                                    Position
                                  </div>
                                  <div className="font-bold text-white text-sm">
                                    {app.meta.previousPosition}
                                  </div>
                                </div>
                              </div>
                            )}
                            {app.meta.previousCompany && (
                              <div className="group/item flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#b87bd1]/30 transition-all duration-500">
                                <Building2
                                  className="w-5 h-5 text-[#b87bd1] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-500"
                                  strokeWidth={2.5}
                                />
                                <div className="min-w-0">
                                  <div className="text-xs text-white/50 font-bold mb-1">
                                    Company
                                  </div>
                                  <div className="font-bold text-white text-sm">
                                    {app.meta.previousCompany}
                                  </div>
                                </div>
                              </div>
                            )}
                            {app.meta.yearsExperience && (
                              <div className="group/item flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#b87bd1]/30 transition-all duration-500">
                                <Clock
                                  className="w-5 h-5 text-[#b87bd1] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-500"
                                  strokeWidth={2.5}
                                />
                                <div className="min-w-0">
                                  <div className="text-xs text-white/50 font-bold mb-1">
                                    Experience
                                  </div>
                                  <div className="font-bold text-white text-sm">
                                    {app.meta.yearsExperience} Years
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Education Card */}
                    {app.studentId?.education?.length > 0 && (
                      <div
                        className="group/card relative p-6 rounded-[20px] overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#803791]/10 to-[#b87bd1]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                          <h4 className="text-sm font-black text-white mb-6 flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                              <GraduationCap
                                className="w-5 h-5 text-white"
                                strokeWidth={2.5}
                              />
                            </div>
                            <span className="text-lg">Education</span>
                          </h4>
                          <div className="space-y-4">
                            {app.studentId.education.map((edu, index) => (
                              <div
                                key={index}
                                className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#b87bd1]/30 transition-all duration-500"
                              >
                                <div className="p-3 rounded-xl bg-gradient-to-br from-[#803791]/20 to-[#b87bd1]/20 border border-[#b87bd1]/30 flex-shrink-0">
                                  <BookOpen
                                    className="w-5 h-5 text-[#b87bd1]"
                                    strokeWidth={2.5}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-black text-white text-base mb-1">
                                    {edu.degree} in {edu.fieldOfStudy}
                                  </p>
                                  <p className="text-sm text-white/60 font-semibold">
                                    {edu.institution} • {edu.graduationYear}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Languages Card */}
                    {app.meta?.languages && (
                      <div
                        className="group/card relative p-6 rounded-[20px] overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#803791]/10 to-[#b87bd1]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                          <h4 className="text-sm font-black text-white mb-4 flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-lg">
                              <Globe
                                className="w-5 h-5 text-white"
                                strokeWidth={2.5}
                              />
                            </div>
                            <span className="text-lg">Languages</span>
                          </h4>
                          <p className="text-white font-bold text-base">
                            {app.meta.languages}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Status Update Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/10 gap-3 sm:gap-4 md:gap-6">
                      <div className="flex items-center gap-3 text-white/60 font-semibold">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                          <Clock className="w-4 h-4" strokeWidth={2.5} />
                        </div>
                        Applied {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end">
                        <StatusUpdateButtons
                          currentStatus={app.status}
                          onUpdateStatus={(newStatus) =>
                            handleStatusUpdate(app._id, newStatus)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-24">
          <div className="relative inline-block mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-[32px] blur-3xl opacity-30 animate-pulse" />
            <div
              className="relative w-40 h-40 rounded-[32px] flex items-center justify-center shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              <Users className="w-20 h-20 text-white/30" strokeWidth={2} />
            </div>
          </div>

          <h3 className="text-4xl font-black text-white mb-4">
            No applications found
          </h3>
          <p className="text-white/60 text-lg font-medium mb-10 max-w-md mx-auto">
            Try adjusting your search criteria or filters to find what you're
            looking for
          </p>

          <button
            onClick={() => {
              setSearch("");
              setStage("all");
            }}
            className="group relative px-10 py-5 rounded-xl sm:rounded-2xl font-black text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_-10px_rgba(184,123,209,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] transition-transform group-hover:scale-110 duration-500" />
            <span className="relative flex items-center gap-3">
              <XCircle
                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500"
                strokeWidth={2.5}
              />
              Clear All Filters
            </span>
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.08);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(40px, -40px) rotate(8deg);
          }
          66% {
            transform: translate(-30px, 30px) rotate(-8deg);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(100px) translateY(50px);
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

        @keyframes orbit-1 {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(40px) rotate(-360deg);
          }
        }

        @keyframes orbit-2 {
          0% {
            transform: rotate(120deg) translateX(40px) rotate(-120deg);
          }
          100% {
            transform: rotate(480deg) translateX(40px) rotate(-480deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2.5s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-orbit-1 {
          animation: orbit-1 4s linear infinite;
        }

        .animate-orbit-2 {
          animation: orbit-2 6s linear infinite;
        }
      `}</style>
        </>
      )}

      {/* Dialogs - Always available */}
      <ScheduleInterviewDialog
        app={scheduleApp}
        onClose={() => setScheduleApp(null)}
        onScheduled={(updated) => {
          setApplications((prev) =>
            prev.map((a) => (a._id === scheduleApp._id ? { ...a, hasInterview: true, interviewData: updated.interview || updated } : a))
          );
          setScheduleApp(null);
        }}
      />

      <InterviewManagementDialog
        interview={manageInterviewApp?.interviewData}
        app={manageInterviewApp}
        onClose={() => setManageInterviewApp(null)}
        onUpdated={(updated) => {
          setApplications((prev) =>
            prev.map((a) => (a._id === manageInterviewApp._id ? { ...a, interviewData: updated } : a))
          );
          setManageInterviewApp(null);
        }}
      />
    </div>
  );
}

function StatusUpdateButtons({ currentStatus, onUpdateStatus }) {
  const statusButtons = [
    {
      status: "applied",
      label: "New",
      icon: Sparkles,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      status: "reviewed",
      label: "Reviewed",
      icon: Eye,
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      status: "interview",
      label: "Interview",
      icon: Calendar,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      status: "hired",
      label: "Hired",
      icon: Award,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      status: "rejected",
      label: "Reject",
      icon: XCircle,
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {statusButtons.map(({ status, label, icon: Icon, gradient }) => {
        if (status === currentStatus) return null;
        return (
          <button
            key={status}
            onClick={() => onUpdateStatus(status)}
            className="group relative px-5 py-3 rounded-xl sm:rounded-2xl font-bold text-sm text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
              border: "2px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <span className="relative flex items-center gap-2">
              <Icon
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-500"
                strokeWidth={2.5}
              />
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StageBadge({ value }) {
  const stageConfig = {
    applied: {
      icon: Sparkles,
      text: "New",
      gradient: "from-blue-500 to-cyan-500",
      bgClass: "bg-blue-500/15",
      textClass: "text-blue-400",
      borderClass: "border-blue-500/40",
    },
    reviewed: {
      icon: Eye,
      text: "Reviewed",
      gradient: "from-cyan-500 to-teal-500",
      bgClass: "bg-cyan-500/15",
      textClass: "text-cyan-400",
      borderClass: "border-cyan-500/40",
    },
    interview: {
      icon: Calendar,
      text: "Interview",
      gradient: "from-indigo-500 to-purple-500",
      bgClass: "bg-indigo-500/15",
      textClass: "text-indigo-400",
      borderClass: "border-indigo-500/40",
    },
    hired: {
      icon: Award,
      text: "Hired",
      gradient: "from-emerald-500 to-teal-500",
      bgClass: "bg-emerald-500/15",
      textClass: "text-emerald-400",
      borderClass: "border-emerald-500/40",
    },
    rejected: {
      icon: XCircle,
      text: "Rejected",
      gradient: "from-rose-500 to-pink-500",
      bgClass: "bg-rose-500/15",
      textClass: "text-rose-400",
      borderClass: "border-rose-500/40",
    },
  };

  const config = stageConfig[value] || stageConfig.applied;
  const Icon = config.icon;

  return (
    <span
      className={`group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl sm:rounded-2xl text-sm font-black border-2 ${config.bgClass} ${config.textClass} ${config.borderClass} overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-25 transition-opacity duration-500`}
      />
      <Icon
        className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-500"
        strokeWidth={2.5}
      />
      <span className="relative z-10">{config.text}</span>
    </span>
  );
}
