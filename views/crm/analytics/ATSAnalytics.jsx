"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  Download,
  Calendar,
  Target,
  Award,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserCheck,
  FileText,
  Activity,
  Zap,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { atsManagementService } from "@/services/atsManagementService";
import { customToast } from "@/components/ui/toast";

export default function ATSAnalytics({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [dateRange, setDateRange] = useState({ dateFrom: "", dateTo: "" });
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    fetchStats();
  }, [filters, isRefreshing]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const mergedFilters = {
        ...dateRange,
        ...filters,
      };
      const response = await atsManagementService.getATSDashboardStats(mergedFilters);
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      customToast.error("Failed to fetch ATS analytics");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format = "csv") => {
    try {
      await atsManagementService.exportApplications(
        { ...dateRange, ...filters },
        format
      );
      customToast.success(`Report exported successfully as ${format.toUpperCase()}`);
      setShowExportMenu(false);
    } catch (error) {
      customToast.error("Export failed");
    }
  };

  const handleApplyDateRange = () => {
    fetchStats();
  };

  const handleClearFilters = () => {
    setDateRange({ dateFrom: "", dateTo: "" });
    setTimeout(() => fetchStats(), 100);
  };

  // Calculate trends and percentages
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return { value: 0, isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin"></div>
            <Target className="absolute inset-0 m-auto w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/70 font-semibold text-lg">Loading ATS Analytics...</p>
          <p className="text-white/50 text-sm mt-2">Fetching recruitment insights</p>
        </motion.div>
      </div>
    );
  }

  const overviewStats = [
    {
      label: "Total Applications",
      value: stats?.overview?.totalApplications || 0,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
      trend: calculateTrend(stats?.overview?.totalApplications || 0, 850),
    },
    {
      label: "Reviewed",
      value: stats?.overview?.reviewed || 0,
      icon: CheckCircle,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
      trend: calculateTrend(stats?.overview?.reviewed || 0, 450),
    },
    {
      label: "Shortlisted",
      value: stats?.overview?.shortlisted || 0,
      icon: Target,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      iconColor: "text-amber-400",
      trend: calculateTrend(stats?.overview?.shortlisted || 0, 200),
    },
    {
      label: "Interviewed",
      value: stats?.overview?.interviewed || 0,
      icon: Calendar,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      iconColor: "text-indigo-400",
      trend: calculateTrend(stats?.overview?.interviewed || 0, 120),
    },
    {
      label: "Hired",
      value: stats?.overview?.hired || 0,
      icon: Award,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      trend: calculateTrend(stats?.overview?.hired || 0, 45),
    },
    {
      label: "Avg Time to Hire",
      value: `${stats?.overview?.avgTimeToHire || 0}d`,
      icon: Clock,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      trend: { value: "12.5", isPositive: false },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-white/80">Date Range:</span>
          </div>

          <input
            type="date"
            value={dateRange.dateFrom}
            onChange={(e) => setDateRange({ ...dateRange, dateFrom: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
          />

          <span className="text-white/50 text-center self-center">to</span>

          <input
            type="date"
            value={dateRange.dateTo}
            onChange={(e) => setDateRange({ ...dateRange, dateTo: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
          />

          <button
            onClick={handleApplyDateRange}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all duration-300"
          >
            Apply
          </button>

          <button
            onClick={handleClearFilters}
            className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Clear
          </button>
        </div>
      </motion.div>

      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {overviewStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => setSelectedMetric(stat.label)}
            className={`relative group cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
              selectedMetric === stat.label
                ? "bg-white/10 border-white/30 shadow-2xl"
                : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
            }`}
          >
            {/* Gradient Glow */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 bg-gradient-to-br ${stat.color}`}
            />

            {/* Icon */}
            <div className="relative flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              {stat.trend && (
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                    stat.trend.isPositive
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {stat.trend.isPositive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.trend.value}%
                </div>
              )}
            </div>

            {/* Value */}
            <div className="relative">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-white/60">{stat.label}</div>
            </div>

            {/* Active Indicator */}
            {selectedMetric === stat.label && (
              <motion.div
                layoutId="activeMetric"
                className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${stat.color}`}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            Conversion Funnel
          </h3>
          <div className="text-sm text-white/60">
            <span className="font-semibold">Conversion Rate:</span>{" "}
            <span className="text-emerald-400 font-bold">
              {stats?.overview?.hired && stats?.overview?.totalApplications
                ? ((stats.overview.hired / stats.overview.totalApplications) * 100).toFixed(1)
                : 0}
              %
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {stats?.conversionFunnel?.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="relative group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{idx + 1}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{stage.stage}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-white/60">{stage.count} candidates</span>
                  <span className="text-sm font-bold text-white">{stage.percentage}%</span>
                </div>
              </div>

              <div className="relative w-full h-10 bg-white/5 rounded-xl overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.percentage}%` }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-xl relative overflow-hidden"
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>

                {/* Percentage label inside bar */}
                {stage.percentage > 15 && (
                  <div className="absolute inset-0 flex items-center px-4">
                    <span className="text-sm font-bold text-white drop-shadow-lg">
                      {stage.percentage}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Two Column Layout: Top Jobs & Status Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Top Performing Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-2 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            Top Performing Jobs
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-left text-xs font-bold text-white/60 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="py-3 px-4 text-center text-xs font-bold text-white/60 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="py-3 px-4 text-center text-xs font-bold text-white/60 uppercase tracking-wider">
                    Hired
                  </th>
                  <th className="py-3 px-4 text-center text-xs font-bold text-white/60 uppercase tracking-wider">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats?.topJobs?.map((job, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {job.title}
                          </p>
                          <p className="text-xs text-white/50">Active position</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 font-bold text-sm">
                        {job.applications}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                        {job.hired}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-32 h-2.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${job.conversionRate}%` }}
                            transition={{ delay: 0.7 + idx * 0.1, duration: 0.6 }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
                          />
                        </div>
                        <span className="text-sm font-bold text-white min-w-[3rem]">
                          {job.conversionRate}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          {/* Application Status */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Application Status
            </h4>
            <div className="space-y-3">
              {Object.entries(stats?.applicationStats || {}).map(([status, count], idx) => (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <span className="font-semibold text-white/80 capitalize group-hover:text-white transition-colors">
                      {status}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-white">{count}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interview Status */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Interview Status
            </h4>
            <div className="space-y-3">
              {Object.entries(stats?.interviewStats || {}).map(([status, count], idx) => (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    <span className="font-semibold text-white/80 capitalize group-hover:text-white transition-colors">
                      {status}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-white">{count}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
