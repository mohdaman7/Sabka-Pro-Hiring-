"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function EmployerApplications() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scheduleApp, setScheduleApp] = useState(null);

  // Always compute live stats from current applications list so counts update immediately
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
        setApplications(res?.data || []);
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
        ...(Array.isArray(candidate.skills) ? candidate.skills : []),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesStage && matchesQuery;
    });
  }, [applications, search, stage, sortBy]);

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(128,55,145,0.04),transparent_30%)]" />
      </div>

      {/* Premium Header with Animation */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/10 group"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.16), rgba(184,123,209,0.12))",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#803791]/10 to-[#b87bd1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="p-3 rounded-2xl shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Users className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold bg-linear-to-r from-white to-white/80 bg-clip-text text-transparent">
                Applications Dashboard
              </h1>
            </div>
            <p className="text-white/70 text-lg ml-16">
              Manage and review candidate applications with advanced insights
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="group/btn relative px-6 py-3 rounded-xl font-semibold text-white border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="absolute inset-0 bg-white/5 group-hover/btn:bg-white/10 transition-colors duration-300"></div>
              <span className="relative flex items-center gap-2">
                <Download className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                Export CSV
              </span>
            </button>

            <button className="group/btn relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
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
              <span className="relative flex items-center gap-2">
                <Filter className="w-5 h-5 group-hover/btn:rotate-180 transition-transform duration-500" />
                Advanced Filter
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid with Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {stages.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.value}
              className="group relative rounded-2xl p-6 shadow-lg transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.10)",
                animationDelay: `${index * 100}ms`,
              }}
              onClick={() => setStage(stat.value)}
            >
              {/* Animated gradient overlay */}
              <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl shadow-md transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 bg-linear-to-br ${stat.gradient}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {stage === stat.value && (
                    <div className="w-3 h-3 rounded-full bg-linear-to-r from-[#803791] to-[#b87bd1] animate-pulse shadow-lg"></div>
                  )}
                </div>

                <div className="text-3xl font-extrabold text-white mb-1 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text transition-all duration-300">
                  {stat.count}
                </div>

                <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium">
                  {stat.label}
                </div>

                {/* Progress indicator */}
                <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-linear-to-r ${stat.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium Search and Filters Section */}
      <div
        className="rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-500"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-[#b87bd1] transition-colors duration-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates, positions, skills..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 text-white placeholder-white/50 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 hover:bg-white/[0.07]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-4 bg-white/5 text-white border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all duration-300 hover:bg-white/[0.07] cursor-pointer"
            >
              <option value="newest">🕐 Newest First</option>
              <option value="oldest">🕑 Oldest First</option>
              <option value="match">⭐ Best Match</option>
              <option value="name">🔤 Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Enhanced Stage Filter Pills */}
        <div className="flex flex-wrap gap-3 mt-6">
          {stages.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.value}
                onClick={() => setStage(s.value)}
                className={`group relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                  stage === s.value
                    ? "text-white shadow-2xl scale-105"
                    : "text-white/70 hover:text-white hover:scale-105"
                }`}
                style={{
                  background:
                    stage === s.value
                      ? "linear-gradient(135deg,#803791,#b87bd1)"
                      : "rgba(255,255,255,0.05)",
                  border:
                    stage === s.value
                      ? "2px solid rgba(184,123,209,0.5)"
                      : "2px solid rgba(255,255,255,0.1)",
                }}
              >
                {stage === s.value && (
                  <div className="absolute inset-0 bg-linear-to-r from-[#b87bd1] to-[#803791] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                )}

                <Icon
                  className={`w-5 h-5 relative z-10 ${
                    stage === s.value ? "animate-bounce-subtle" : ""
                  }`}
                />
                <span className="relative z-10">{s.label}</span>
                <span
                  className={`relative z-10 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    stage === s.value
                      ? "bg-white/25 text-white"
                      : "bg-white/10 text-white/70 group-hover:bg-white/20"
                  }`}
                >
                  {s.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Premium Applications List */}
      <div className="space-y-5">
        {filtered.map((app, index) => {
          const isOpen = expandedId === app._id;
          const isHovered = hoveredCard === app._id;

          return (
            <div
              key={app._id}
              className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                border: "1px solid rgba(255,255,255,0.1)",
                animationDelay: `${index * 50}ms`,
              }}
              onMouseEnter={() => setHoveredCard(app._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated gradient border effect */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-[#803791] via-[#b87bd1] to-[#803791] rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>

              {/* Card content */}
              <div className="relative backdrop-blur-xl p-6">
                {/* Header Section */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 flex items-start gap-5">
                    {/* Avatar with gradient */}
                    <div className="relative group/avatar">
                      <div className="absolute -inset-1 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-2xl blur-md opacity-50 group-hover/avatar:opacity-75 transition-opacity duration-300"></div>
                      <div
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transform group-hover/avatar:scale-110 group-hover/avatar:rotate-6 transition-all duration-300"
                        style={{
                          background: "linear-gradient(135deg,#803791,#b87bd1)",
                        }}
                      >
                        <span className="text-white font-bold text-xl">
                          {app.studentId?.firstName?.charAt(0)}
                          {app.studentId?.lastName?.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Candidate Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text transition-all duration-300">
                          {app.studentId?.firstName} {app.studentId?.lastName}
                        </h3>
                        <StageBadge value={app.status} />
                      </div>

                      <p className="text-[#b87bd1] font-semibold mb-3 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {app.jobId?.title}
                      </p>

                      {/* Enhanced Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="group/detail flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                          <div className="p-2 rounded-lg bg-white/5 group-hover/detail:bg-white/10 transition-colors duration-300">
                            <Mail className="w-4 h-4" />
                          </div>
                          <span className="text-sm">
                            {app.studentId?.email}
                          </span>
                        </div>

                        {app.studentId?.phone && (
                          <div className="group/detail flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                            <div className="p-2 rounded-lg bg-white/5 group-hover/detail:bg-white/10 transition-colors duration-300">
                              <Phone className="w-4 h-4" />
                            </div>
                            <span className="text-sm">
                              {app.studentId?.phone}
                            </span>
                          </div>
                        )}

                        {app.studentId?.address?.city && (
                          <div className="group/detail flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                            <div className="p-2 rounded-lg bg-white/5 group-hover/detail:bg-white/10 transition-colors duration-300">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <span className="text-sm">
                              {app.studentId?.address.city},{" "}
                              {app.studentId?.address.state}
                            </span>
                          </div>
                        )}

                        {app.meta?.yearsExperience && (
                          <div className="group/detail flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                            <div className="p-2 rounded-lg bg-white/5 group-hover/detail:bg-white/10 transition-colors duration-300">
                              <Award className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold">
                              {app.meta.yearsExperience} Years Exp
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Quick Schedule Button (visible on all cards) */}
                  <div className="absolute right-6 top-6 hidden md:block">
                    {(app.status === "applied" ||
                      app.status === "reviewed" ||
                      app.status === "interview") && (
                      <button
                        onClick={() => setScheduleApp(app)}
                        className="group relative px-4 py-2 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                        title={
                          app.interview?.status
                            ? "Update Interview"
                            : "Schedule Interview"
                        }
                      >
                        <span className="relative flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {app.interview?.status ? "Update" : "Schedule"}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {app.resumeUrl && (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative px-5 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      >
                        <div className="absolute inset-0 bg-white/10 group-hover/btn:bg-linear-to-r group-hover/btn:from-[#803791] group-hover/btn:to-[#b87bd1] transition-all duration-300"></div>
                        <span className="relative flex items-center gap-2">
                          <FileText className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                          Resume
                        </span>
                      </a>
                    )}

                    <button
                      onClick={() => setExpandedId(isOpen ? null : app._id)}
                      className="group/btn relative px-5 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                      style={{
                        background: isOpen
                          ? "linear-gradient(135deg,#803791,#b87bd1)"
                          : "rgba(255,255,255,0.1)",
                      }}
                    >
                      <span className="relative flex items-center gap-2">
                        {isOpen ? (
                          <>
                            <ChevronUp className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-5 h-5 group-hover/btn:translate-y-1 transition-transform duration-300" />
                            More
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Expanded Details with Animation */}
                {isOpen && (
                  <div className="mt-6 space-y-6 border-t border-white/10 pt-6 animate-slide-down">
                    {/* Previous Experience Card */}
                    {(app.meta?.previousCompany ||
                      app.meta?.previousPosition) && (
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
                        <h4 className="text-sm font-bold text-white/90 mb-4 flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-linear-to-r from-[#803791] to-[#b87bd1]">
                            <Briefcase className="w-4 h-4 text-white" />
                          </div>
                          Previous Experience
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/70">
                          {app.meta.previousPosition && (
                            <div className="flex items-start gap-2">
                              <Target className="w-4 h-4 text-[#b87bd1] mt-0.5" />
                              <div>
                                <div className="text-xs text-white/50">
                                  Position
                                </div>
                                <div className="font-semibold text-white">
                                  {app.meta.previousPosition}
                                </div>
                              </div>
                            </div>
                          )}
                          {app.meta.previousCompany && (
                            <div className="flex items-start gap-2">
                              <Building2 className="w-4 h-4 text-[#b87bd1] mt-0.5" />
                              <div>
                                <div className="text-xs text-white/50">
                                  Company
                                </div>
                                <div className="font-semibold text-white">
                                  {app.meta.previousCompany}
                                </div>
                              </div>
                            </div>
                          )}
                          {app.meta.yearsExperience && (
                            <div className="flex items-start gap-2">
                              <Clock className="w-4 h-4 text-[#b87bd1] mt-0.5" />
                              <div>
                                <div className="text-xs text-white/50">
                                  Experience
                                </div>
                                <div className="font-semibold text-white">
                                  {app.meta.yearsExperience} Years
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Education Card */}
                    {app.studentId?.education?.length > 0 && (
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
                        <h4 className="text-sm font-bold text-white/90 mb-4 flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-linear-to-r from-[#803791] to-[#b87bd1]">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                          Education
                        </h4>
                        <div className="space-y-3">
                          {app.studentId.education.map((edu, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 text-white/70"
                            >
                              <div className="p-2 rounded-lg bg-white/5 mt-1">
                                <BookOpen className="w-4 h-4 text-[#b87bd1]" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-white">
                                  {edu.degree} in {edu.fieldOfStudy}
                                </p>
                                <p className="text-sm text-white/60">
                                  {edu.institution} • {edu.graduationYear}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Languages Card */}
                    {app.meta?.languages && (
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
                        <h4 className="text-sm font-bold text-white/90 mb-4 flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-linear-to-r from-[#803791] to-[#b87bd1]">
                            <Globe className="w-4 h-4 text-white" />
                          </div>
                          Languages
                        </h4>
                        <p className="text-white/70 font-medium">
                          {app.meta.languages}
                        </p>
                      </div>
                    )}

                    {/* Status Update Section */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Clock className="w-4 h-4" />
                        Applied {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusUpdateButtons
                          currentStatus={app.status}
                          onUpdateStatus={(newStatus) =>
                            handleStatusUpdate(app._id, newStatus)
                          }
                        />
                        {(app.status === "applied" ||
                          app.status === "reviewed" ||
                          app.status === "interview") && (
                          <button
                            onClick={() => setScheduleApp(app)}
                            className="group relative px-4 py-2 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{
                              background: "rgba(255,255,255,0.08)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            <span className="relative flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {app.interview?.status
                                ? "Update Interview"
                                : "Schedule Interview"}
                            </span>
                          </button>
                        )}
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
        <div className="text-center py-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
            <div
              className="relative w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Users className="w-16 h-16 text-white/40" />
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-3">
            No applications found
          </h3>
          <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
            Try adjusting your search criteria or filters to find what you're
            looking for
          </p>

          <button
            onClick={() => {
              setSearch("");
              setStage("all");
            }}
            className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              className="absolute inset-0 transition-transform group-hover:scale-105 duration-300"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1)",
              }}
            ></div>
            <span className="relative flex items-center gap-2">
              <XCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Clear All Filters
            </span>
          </button>
        </div>
      )}

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

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
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
            transform: translateY(-4px);
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

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>

      {/* Use the imported ScheduleInterviewDialog component */}
      <ScheduleInterviewDialog
        app={scheduleApp}
        onClose={() => setScheduleApp(null)}
        onScheduled={(updated) => {
          setApplications((prev) =>
            prev.map((a) => (a._id === updated._id ? updated : a))
          );
          setScheduleApp(null);
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
    <div className="flex flex-wrap items-center gap-2">
      {statusButtons.map(({ status, label, icon: Icon, gradient }) => {
        if (status === currentStatus) return null;
        return (
          <button
            key={status}
            onClick={() => onUpdateStatus(status)}
            className="group relative px-4 py-2 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              className={`absolute inset-0 bg-linear-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
            <span className="relative flex items-center gap-2">
              <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
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
      borderClass: "border-blue-500/30",
    },
    reviewed: {
      icon: Eye,
      text: "Reviewed",
      gradient: "from-cyan-500 to-teal-500",
      bgClass: "bg-cyan-500/15",
      textClass: "text-cyan-400",
      borderClass: "border-cyan-500/30",
    },
    interview: {
      icon: Calendar,
      text: "Interview",
      gradient: "from-indigo-500 to-purple-500",
      bgClass: "bg-indigo-500/15",
      textClass: "text-indigo-400",
      borderClass: "border-indigo-500/30",
    },
    hired: {
      icon: Award,
      text: "Hired",
      gradient: "from-emerald-500 to-teal-500",
      bgClass: "bg-emerald-500/15",
      textClass: "text-emerald-400",
      borderClass: "border-emerald-500/30",
    },
    rejected: {
      icon: XCircle,
      text: "Rejected",
      gradient: "from-rose-500 to-pink-500",
      bgClass: "bg-rose-500/15",
      textClass: "text-rose-400",
      borderClass: "border-rose-500/30",
    },
  };

  const config = stageConfig[value] || stageConfig.applied;
  const Icon = config.icon;

  return (
    <span
      className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 ${config.bgClass} ${config.textClass} ${config.borderClass} overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg`}
    >
      <div
        className={`absolute inset-0 bg-linear-to-r ${config.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      ></div>
      <Icon className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
      <span className="relative z-10">{config.text}</span>
    </span>
  );
}
