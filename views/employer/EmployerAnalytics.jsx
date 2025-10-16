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
} from "lucide-react";
import { useEffect, useState } from "react";
import { employerService } from "@/services/employerService";

export default function EmployerAnalytics() {
  const [timeRange, setTimeRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalApplications: 0,
      conversionRate: 0,
      averageTimeToHireDays: 0,
    },
    monthlyStats: [],
    jobPerformance: [],
    topLocations: [],
    candidateSources: [], // Ensure this is always an array
    status: {},
    recentActivity: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await employerService.getAnalytics();
        if (!mounted) return;

        // Safely set analytics data with fallbacks
        setAnalyticsData({
          overview: res?.data?.overview || {
            totalApplications: 0,
            conversionRate: 0,
            averageTimeToHireDays: 0,
          },
          monthlyStats: res?.data?.monthlyStats || [],
          jobPerformance: res?.data?.jobPerformance || [],
          topLocations: res?.data?.topLocations || [],
          candidateSources:
            res?.data?.candidateSources || getDefaultCandidateSources(),
          status: res?.data?.status || {},
          recentActivity: res?.data?.recentActivity || [],
        });
      } catch (e) {
        console.error("Analytics loading error:", e);
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
  }, []);

  // Default candidate sources if API doesn't provide them
  const getDefaultCandidateSources = () => [
    { source: "LinkedIn", percentage: 35, count: 45 },
    { source: "Indeed", percentage: 25, count: 32 },
    { source: "Company Website", percentage: 20, count: 26 },
    { source: "Referrals", percentage: 15, count: 19 },
    { source: "Other", percentage: 5, count: 6 },
  ];

  // Safe array access helper
  const safeArray = (array) => (Array.isArray(array) ? array : []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-white/70">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-300">{error}</div>;
  }

  const StatCard = ({ icon: Icon, label, value, change, color = "purple" }) => {
    return (
      <div
        className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1 group"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #803791, #b87bd1)",
            }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          {change && (
            <span
              className={`text-sm font-medium ${
                change.startsWith("+") ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {change}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-white/80">{label}</div>
      </div>
    );
  };

  const ProgressBar = ({ percentage, color = "purple" }) => {
    const colorClasses = {
      blue: "bg-blue-500",
      green: "bg-emerald-500",
      purple: "bg-[#b87bd1]",
      orange: "bg-orange-500",
      red: "bg-rose-500",
      cyan: "bg-cyan-500",
      indigo: "bg-indigo-500",
    };

    return (
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]}`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Decorative background orbs matching dashboard theme */}
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-white/80">
            Track your hiring performance and candidate engagement
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b87bd1] focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex space-x-1 rounded-lg border border-white/10 p-1 w-fit"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
        }}
      >
        {["overview", "performance", "candidates", "sources"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={FileText}
              label="Total Applications"
              value={String(analyticsData?.overview?.totalApplications || 0)}
              change="+8%"
              color="purple"
            />
            <StatCard
              icon={MousePointer}
              label="Conversion Rate"
              value={`${analyticsData?.overview?.conversionRate ?? 0}%`}
              change="+0.3%"
              color="purple"
            />
            <StatCard
              icon={Clock}
              label="Avg. Time to Hire"
              value={`${
                analyticsData?.overview?.averageTimeToHireDays ?? 0
              } days`}
              change="-2 days"
              color="purple"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Application Trends */}
            <div
              className="rounded-xl p-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Application Trends
              </h3>
              <div className="space-y-4">
                {safeArray(analyticsData.monthlyStats).length > 0 ? (
                  safeArray(analyticsData.monthlyStats).map((month, index) => (
                    <div
                      key={month.month || index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-white/60 w-12">
                        {month.month || `Month ${index + 1}`}
                      </span>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                          <span>{month.applications || 0} applications</span>
                          <span>{month.hires || 0} hires</span>
                        </div>
                        <ProgressBar
                          percentage={Math.min(100, month.applications || 0)}
                          color="purple"
                        />
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {month.hires || 0} hires
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-white/60 py-8">
                    No monthly data available
                  </div>
                )}
              </div>
            </div>

            {/* Application Funnel */}
            <div
              className="rounded-xl p-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Application Funnel
              </h3>
              <div className="space-y-4">
                {[
                  {
                    stage: "Applied",
                    count:
                      (analyticsData.status?.applied || 0) +
                      (analyticsData.status?.reviewed || 0),
                    color: "purple",
                  },
                  {
                    stage: "Shortlisted",
                    count: analyticsData.status?.shortlisted || 0,
                    color: "green",
                  },
                  {
                    stage: "Interviewed",
                    count: analyticsData.status?.interview || 0,
                    color: "indigo",
                  },
                  {
                    stage: "Hired",
                    count: analyticsData.status?.hired || 0,
                    color: "cyan",
                  },
                ].map((stage, index) => (
                  <div
                    key={stage.stage}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-white/60 w-24">
                      {stage.stage}
                    </span>
                    <div className="flex-1 mx-4">
                      <div className="flex justify-between text-xs text-white/50 mb-1">
                        <span>{stage.count} candidates</span>
                        <span>
                          {analyticsData.overview?.totalApplications
                            ? Math.round(
                                (stage.count /
                                  analyticsData.overview.totalApplications) *
                                  100
                              )
                            : 0}
                          %
                        </span>
                      </div>
                      <ProgressBar
                        percentage={
                          analyticsData.overview?.totalApplications
                            ? (stage.count /
                                analyticsData.overview.totalApplications) *
                              100
                            : 0
                        }
                        color={stage.color}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Candidate Sources */}
            <div
              className="rounded-xl p-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Candidate Sources
              </h3>
              <div className="space-y-4">
                {safeArray(analyticsData.candidateSources).length > 0 ? (
                  safeArray(analyticsData.candidateSources).map((source) => (
                    <div
                      key={source.source}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-white/60">
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
                        <span className="text-sm font-semibold text-white w-12 text-right">
                          {source.percentage || 0}%
                        </span>
                      </div>
                      <span className="text-sm text-white/50 w-12 text-right">
                        {source.count || 0}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-white/60 py-8">
                    No candidate source data available
                  </div>
                )}
              </div>
            </div>

            {/* Top Locations */}
            <div
              className="rounded-xl p-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Top Candidate Locations
              </h3>
              <div className="space-y-4">
                {safeArray(analyticsData.topLocations).length > 0 ? (
                  safeArray(analyticsData.topLocations).map(
                    (location, index) => (
                      <div
                        key={location.location || index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{
                              background:
                                "linear-gradient(135deg, #803791, #b87bd1)",
                            }}
                          >
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-white">
                            {location.location || `Location ${index + 1}`}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-white">
                          {location.applicants || 0} applicants
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-center text-white/60 py-8">
                    No location data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="space-y-6">
          <div
            className="rounded-xl p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Job Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-sm font-semibold text-white/60">
                      Job Title
                    </th>
                    <th className="text-left py-3 text-sm font-semibold text-white/60">
                      Views
                    </th>
                    <th className="text-left py-3 text-sm font-semibold text-white/60">
                      Applications
                    </th>
                    <th className="text-left py-3 text-sm font-semibold text-white/60">
                      Conversion
                    </th>
                    <th className="text-left py-3 text-sm font-semibold text-white/60">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {safeArray(analyticsData.jobPerformance).length > 0 ? (
                    safeArray(analyticsData.jobPerformance).map((job) => (
                      <tr
                        key={String(job.jobId || job.title || Math.random())}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="py-4">
                          <div className="font-medium text-white">
                            {job.title || "-"}
                          </div>
                        </td>
                        <td className="py-4 text-sm text-white/60">
                          {job.views?.toLocaleString?.() || "-"}
                        </td>
                        <td className="py-4 text-sm text-white/60">
                          {job.applications || 0}
                        </td>
                        <td className="py-4 text-sm text-white/60">
                          {Math.round((job.conversion || 0) * 10) / 10}%
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              job.status === "active"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-white/10 text-white/60 border border-white/10"
                            }`}
                          >
                            {job.status || "-"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-8 text-center text-white/60"
                      >
                        No job performance data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="rounded-xl p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #803791, #b87bd1)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">124%</div>
              <div className="text-white/90">Growth in Applications</div>
            </div>
          </div>
          <div className="text-sm text-white/80">Compared to last month</div>
        </div>

        <div
          className="rounded-xl p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #059669, #10b981)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">2.3x</div>
              <div className="text-white/90">More Qualified Candidates</div>
            </div>
          </div>
          <div className="text-sm text-white/80">
            Higher quality applications this quarter
          </div>
        </div>

        <div
          className="rounded-xl p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">₹1.2L</div>
              <div className="text-white/90">Saved on Hiring</div>
            </div>
          </div>
          <div className="text-sm text-white/80">
            Through efficient candidate matching
          </div>
        </div>
      </div>
    </div>
  );
}
