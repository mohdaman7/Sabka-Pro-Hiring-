"use client";

import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  FileText,
  Clock,
  MapPin,
  DollarSign,
  Eye,
  MousePointer,
  Calendar,
  Download,
  Filter,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Award,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { employerService } from "@/services/employerService";

export default function EmployerAnalytics() {
  const [timeRange, setTimeRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredJob, setHoveredJob] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalApplications: 0,
      conversionRate: 0,
      averageTimeToHireDays: 0,
    },
    monthlyStats: [],
    jobPerformance: [],
    topLocations: [],
    candidateSources: [],
    status: {},
    recentActivity: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const safeArray = (array) => (Array.isArray(array) ? array : []);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    change,
    color = "purple",
    index,
  }) => {
    const isHovered = hoveredCard === index;

    return (
      <div
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
        className="relative rounded-2xl p-6 shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden group"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(128,55,145,0.15), rgba(184,123,209,0.1))"
            : "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
          border: isHovered
            ? "1px solid rgba(184,123,209,0.4)"
            : "1px solid rgba(255,255,255,0.08)",
          transform: isHovered
            ? "translateY(-8px) scale(1.02)"
            : "translateY(0) scale(1)",
          boxShadow: isHovered
            ? "0 20px 60px rgba(128,55,145,0.4), 0 0 40px rgba(184,123,209,0.2)"
            : "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(184,123,209,0.15), transparent 70%)",
          }}
        />

        {/* Shine effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.7s",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center transform transition-all duration-500 shadow-lg"
              style={{
                background: isHovered
                  ? "linear-gradient(135deg, #b87bd1, #803791)"
                  : "linear-gradient(135deg, #803791, #b87bd1)",
                transform: isHovered
                  ? "scale(1.15) rotate(5deg)"
                  : "scale(1) rotate(0deg)",
                boxShadow: isHovered
                  ? "0 10px 30px rgba(128,55,145,0.5)"
                  : "0 5px 15px rgba(128,55,145,0.3)",
              }}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            {change && (
              <div
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  change.startsWith("+")
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                }`}
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
              >
                {change.startsWith("+") ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {change}
              </div>
            )}
          </div>
          <div
            className="text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-300"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            {value}
          </div>
          <div className="text-sm text-white/70 font-medium">{label}</div>
        </div>

        {/* Corner decoration */}
        <div
          className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-20 transition-all duration-500"
          style={{
            background: "linear-gradient(135deg, #b87bd1, #803791)",
            transform: isHovered ? "scale(1.5)" : "scale(1)",
          }}
        />
      </div>
    );
  };

  const ProgressBar = ({ percentage, color = "purple" }) => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
      setTimeout(() => setAnimated(true), 100);
    }, []);

    const colorClasses = {
      blue: { bg: "bg-blue-500", glow: "rgba(59, 130, 246, 0.5)" },
      green: { bg: "bg-emerald-500", glow: "rgba(16, 185, 129, 0.5)" },
      purple: { bg: "bg-[#b87bd1]", glow: "rgba(184, 123, 209, 0.5)" },
      orange: { bg: "bg-orange-500", glow: "rgba(249, 115, 22, 0.5)" },
      red: { bg: "bg-rose-500", glow: "rgba(244, 63, 94, 0.5)" },
      cyan: { bg: "bg-cyan-500", glow: "rgba(6, 182, 212, 0.5)" },
      indigo: { bg: "bg-indigo-500", glow: "rgba(99, 102, 241, 0.5)" },
    };

    const colorConfig = colorClasses[color];

    return (
      <div className="relative w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full ${colorConfig.bg} transition-all duration-1000 ease-out relative`}
          style={{
            width: animated
              ? `${Math.min(100, Math.max(0, percentage))}%`
              : "0%",
            boxShadow: `0 0 20px ${colorConfig.glow}`,
          }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
            style={{
              animation: "shine 2s infinite",
            }}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await employerService.getAnalytics({ range: timeRange });
        if (!mounted) return;
        if (res?.success) {
          setAnalyticsData({
            overview: res.data?.overview || {},
            monthlyStats: Array.isArray(res.data?.monthlyStats)
              ? res.data.monthlyStats
              : [],
            jobPerformance: Array.isArray(res.data?.jobPerformance)
              ? res.data.jobPerformance
              : [],
            topLocations: Array.isArray(res.data?.topLocations)
              ? res.data.topLocations
              : [],
            candidateSources: Array.isArray(res.data?.candidateSources)
              ? res.data.candidateSources
              : [],
            status: res.data?.status || {},
            recentActivity: Array.isArray(res.data?.recentActivity)
              ? res.data.recentActivity
              : [],
          });
        } else {
          throw new Error(res?.message || "Failed to load analytics");
        }
      } catch (e) {
        if (!mounted) return;
        setError(
          e?.response?.data?.message || e?.message || "Failed to load analytics"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [timeRange]);

  if (loading) {
    return (
      <div className="p-4 sm:p-5 md:p-6 flex items-center justify-center min-h-screen">
        <div className="text-white/70 flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#b87bd1] border-t-transparent rounded-full animate-spin" />
          Loading analytics...
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 sm:p-5 md:p-6 text-red-300">{error}</div>;
  }

  return (
    <div className="relative p-6 space-y-4 sm:space-y-4 sm:space-y-5 md:space-y-6 md:space-y-8 min-h-screen overflow-hidden">
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>

      {/* Enhanced background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "rgba(128,55,145,0.15)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "rgba(184,123,209,0.12)",
            animation: "float 10s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
          style={{
            background: "rgba(240,194,238,0.08)",
            animation: "pulse-glow 6s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(128,55,145,0.05),transparent_30%)]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="group">
          <h1 className="text-lg sm:text-xl md:text-2xl sm:text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Activity className="w-10 h-10 text-[#b87bd1] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            Analytics Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Track your hiring performance and candidate engagement
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-5 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b87bd1] focus:border-transparent transition-all hover:bg-white/10 hover:border-[#b87bd1]/30 cursor-pointer backdrop-blur-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#b87bd1]/30 transition-all hover:scale-105 backdrop-blur-sm group">
            <Filter className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl transition-all hover:scale-105 font-medium shadow-lg hover:shadow-[#b87bd1]/50 group">
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            Export
          </button>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div
        className="flex space-x-2 rounded-xl border border-white/10 p-1.5 w-fit backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {["overview", "performance", "candidates", "sources"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-300 ${
              activeTab === tab
                ? "bg-linear-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg scale-105"
                : "text-white/60 hover:text-white hover:bg-white/5 hover:scale-102"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-4 sm:space-y-4 sm:space-y-5 md:space-y-6 md:space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            <StatCard
              icon={FileText}
              label="Total Applications"
              value={String(analyticsData?.overview?.totalApplications || 0)}
              change="+12.5%"
              color="purple"
              index={0}
            />
            <StatCard
              icon={Target}
              label="Conversion Rate"
              value={`${analyticsData?.overview?.conversionRate ?? 0}%`}
              change="+2.3%"
              color="purple"
              index={1}
            />
            <StatCard
              icon={Clock}
              label="Avg. Time to Hire"
              value={`${
                analyticsData?.overview?.averageTimeToHireDays ?? 0
              } days`}
              change="-3 days"
              color="purple"
              index={2}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Application Trends */}
            <div
              className="rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#b87bd1] group-hover:scale-110 transition-transform" />
                  Application Trends
                </h3>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
              </div>
              <div className="space-y-5">
                {safeArray(analyticsData.monthlyStats).map((month, index) => (
                  <div
                    key={month.month || index}
                    className="flex items-center justify-between group/item hover:bg-white/5 p-3 rounded-lg transition-all"
                  >
                    <span className="text-sm font-bold text-white/80 w-12 group-hover/item:text-[#b87bd1] transition-colors">
                      {month.month || `M${index + 1}`}
                    </span>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center justify-between text-xs text-white/60 mb-2 font-medium">
                        <span>{month.applications || 0} applications</span>
                        <span className="text-emerald-400">
                          {month.hires || 0} hires
                        </span>
                      </div>
                      <ProgressBar
                        percentage={(() => {
                          const maxApps = Math.max(
                            1,
                            ...safeArray(analyticsData.monthlyStats).map(
                              (m) => m.applications || 0
                            )
                          );
                          return ((month.applications || 0) / maxApps) * 100;
                        })()}
                        color="purple"
                      />
                    </div>
                    <span className="text-sm font-bold text-white px-3 py-1 bg-white/5 rounded-lg group-hover/item:bg-[#b87bd1]/20 transition-colors">
                      {month.hires || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Funnel */}
            <div
              className="rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-[#b87bd1] group-hover:scale-110 transition-transform" />
                  Application Funnel
                </h3>
              </div>
              <div className="space-y-5">
                {(() => {
                  const s = analyticsData?.status || {};
                  const total = Math.max(1, analyticsData?.overview?.totalApplications || 0);
                  const funnel = [
                    { key: "applied", label: "Applied", color: "purple", icon: FileText },
                    { key: "reviewed", label: "Reviewed", color: "green", icon: Award },
                    { key: "interview", label: "Interviewed", color: "indigo", icon: Users },
                    { key: "hired", label: "Hired", color: "cyan", icon: Briefcase },
                  ];
                  return funnel.map((stage) => {
                    const count = s[stage.key] || 0;
                    const Icon = stage.icon;
                    return (
                      <div
                        key={stage.key}
                        className="flex items-center justify-between group/item hover:bg-white/5 p-3 rounded-lg transition-all"
                      >
                        <div className="flex items-center gap-3 w-32">
                          <Icon className="w-5 h-5 text-[#b87bd1] group-hover/item:scale-110 transition-transform" />
                          <span className="text-sm font-bold text-white/80 group-hover/item:text-white transition-colors">
                            {stage.label}
                          </span>
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="flex justify-between text-xs text-white/60 mb-2 font-medium">
                            <span>{count} candidates</span>
                            <span className="text-[#b87bd1]">{Math.round((count / total) * 100)}%</span>
                          </div>
                          <ProgressBar percentage={(count / total) * 100} color={stage.color} />
                        </div>
                        <span className="text-sm font-bold text-white px-3 py-1 bg-white/5 rounded-lg group-hover/item:bg-[#b87bd1]/20 transition-colors">
                          {count}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Candidate Sources */}
            <div
              className="rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-[#b87bd1]" />
                Candidate Sources
              </h3>
              <div className="space-y-5">
                {safeArray(analyticsData.candidateSources).map((source) => (
                  <div
                    key={source.source}
                    className="flex items-center justify-between group/item hover:bg-white/5 p-3 rounded-lg transition-all"
                  >
                    <span className="text-sm font-bold text-white/80 w-32 group-hover/item:text-white transition-colors">
                      {source.source}
                    </span>
                    <div className="flex items-center gap-4 flex-1 mx-4">
                      <ProgressBar
                        percentage={source.percentage || 0}
                        color={
                          source.source === "LinkedIn"
                            ? "purple"
                            : source.source === "Indeed"
                            ? "green"
                            : source.source === "Company Website"
                            ? "indigo"
                            : source.source === "Referrals"
                            ? "cyan"
                            : "blue"
                        }
                      />
                      <span className="text-sm font-bold text-white w-14 text-right px-2 py-1 bg-white/5 rounded-lg group-hover/item:bg-[#b87bd1]/20 transition-colors">
                        {source.percentage || 0}%
                      </span>
                    </div>
                    <span className="text-sm text-white/60 w-12 text-right font-medium">
                      {source.count || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Locations */}
            <div
              className="rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#b87bd1]" />
                Top Candidate Locations
              </h3>
              <div className="space-y-4">
                {safeArray(analyticsData.topLocations).map(
                  (location, index) => (
                    <div
                      key={location.location || index}
                      className="flex items-center justify-between group/item hover:bg-white/5 p-3 rounded-lg transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6"
                          style={{
                            background:
                              "linear-gradient(135deg, #803791, #b87bd1)",
                            boxShadow: "0 4px 15px rgba(128,55,145,0.4)",
                          }}
                        >
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-white group-hover/item:text-[#b87bd1] transition-colors">
                          {location.location || `Location ${index + 1}`}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-white px-4 py-2 bg-white/5 rounded-lg group-hover/item:bg-[#b87bd1]/20 transition-colors">
                        {location.applicants || 0}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <div
            className="rounded-2xl p-8 backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }}
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#b87bd1]" />
              Job Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-sm font-bold text-white/70">
                      Job Title
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-white/70">
                      Views
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-white/70">
                      Applications
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-white/70">
                      Conversion
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-white/70">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {safeArray(analyticsData.jobPerformance).map((job, idx) => (
                    <tr
                      key={String(job.jobId || idx)}
                      onMouseEnter={() => setHoveredJob(idx)}
                      onMouseLeave={() => setHoveredJob(null)}
                      className="border-b border-white/5 transition-all duration-300"
                      style={{
                        background:
                          hoveredJob === idx
                            ? "linear-gradient(90deg, rgba(184,123,209,0.1), rgba(128,55,145,0.05))"
                            : "transparent",
                      }}
                    >
                      <td className="py-5 px-4">
                        <div
                          className="font-bold text-white transition-colors duration-300"
                          style={{
                            color: hoveredJob === idx ? "#b87bd1" : "white",
                          }}
                        >
                          {job.title || "-"}
                        </div>
                      </td>
                      <td className="py-5 px-4 text-sm text-white/70 font-semibold">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-[#b87bd1]" />
                          {job.views?.toLocaleString?.() || "-"}
                        </div>
                      </td>
                      <td className="py-5 px-4 text-sm text-white/70 font-semibold">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#b87bd1]" />
                          {job.applications || 0}
                        </div>
                      </td>
                      <td className="py-5 px-4 text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-400">
                            {Math.round((job.conversion || 0) * 10) / 10}%
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-2 transition-all duration-300 ${
                            job.status === "active"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-white/10 text-white/60 border border-white/10"
                          }`}
                          style={{
                            transform:
                              hoveredJob === idx ? "scale(1.05)" : "scale(1)",
                          }}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              job.status === "active"
                                ? "bg-emerald-400"
                                : "bg-white/40"
                            }`}
                          />
                          {job.status || "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Premium Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div
          className="relative rounded-2xl p-8 text-white overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #803791, #b87bd1)",
            boxShadow: "0 20px 60px rgba(128,55,145,0.4)",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl sm:text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-bold">124%</div>
                <div className="text-white/90 font-semibold">
                  Growth in Applications
                </div>
              </div>
            </div>
            <div className="text-sm text-white/80 flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Compared to last month
            </div>
          </div>
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, white, transparent)",
            }}
          />
        </div>

        <div
          className="relative rounded-2xl p-8 text-white overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #059669, #10b981)",
            boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4)",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl sm:text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-bold">2.3x</div>
                <div className="text-white/90 font-semibold">
                  More Qualified Candidates
                </div>
              </div>
            </div>
            <div className="text-sm text-white/80 flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Higher quality applications this quarter
            </div>
          </div>
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, white, transparent)",
            }}
          />
        </div>

        <div
          className="relative rounded-2xl p-8 text-white overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
            boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                <DollarSign className="w-8 h-8" />
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl sm:text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-bold">₹1.2L</div>
                <div className="text-white/90 font-semibold">
                  Saved on Hiring
                </div>
              </div>
            </div>
            <div className="text-sm text-white/80 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Through efficient candidate matching
            </div>
          </div>
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, white, transparent)",
            }}
          />
        </div>
      </div>

      {/* Additional Insights Section */}
      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div
          className="rounded-2xl p-6 backdrop-blur-sm group hover:scale-105 transition-all duration-300"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">42</div>
              <div className="text-sm text-white/70">Days Avg. Open</div>
            </div>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
        </div>

        <div
          className="rounded-2xl p-6 backdrop-blur-sm group hover:scale-105 transition-all duration-300"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500 to-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">8.2K</div>
              <div className="text-sm text-white/70">Total Job Views</div>
            </div>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-linear-to-r from-orange-500 to-rose-500 rounded-full" />
          </div>
        </div>

        <div
          className="rounded-2xl p-6 backdrop-blur-sm group hover:scale-105 transition-all duration-300"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">94%</div>
              <div className="text-sm text-white/70">Satisfaction Rate</div>
            </div>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-11/12 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
