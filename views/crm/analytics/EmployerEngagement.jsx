"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, BarChart3, Building2, Award, ExternalLink, ArrowUpRight } from "lucide-react";
import { getEmployerEngagement, getTopEmployersByJobPosts, getTopEmployersByApplications, formatPercentage, formatNumber } from "@/services/analyticsService";
import AllEmployersListing from "./AllEmployersListing";

export default function EmployerEngagement({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [viewMode, setViewMode] = useState("summary"); // "summary" or "all"
  const [topEmployersByJobs, setTopEmployersByJobs] = useState([]);
  const [topEmployersByApps, setTopEmployersByApps] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getEmployerEngagement(filters);
      setData(response.data);
      
      // Fetch top employers data
      setLoadingExtra(true);
      const params = {};
      if (filters?.startDate) params.startDate = filters.startDate;
      if (filters?.endDate) params.endDate = filters.endDate;
      params.limit = 5;
      
      const [jobsRes, appsRes] = await Promise.all([
        getTopEmployersByJobPosts(params),
        getTopEmployersByApplications(params),
      ]);
      
      if (jobsRes.success && jobsRes.data.topEmployers) {
        setTopEmployersByJobs(jobsRes.data.topEmployers);
      }
      
      if (appsRes.success && appsRes.data.topEmployers) {
        setTopEmployersByApps(appsRes.data.topEmployers);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setLoadingExtra(false);
    }
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
            <Briefcase className="absolute inset-0 m-auto w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/70 font-semibold text-lg">Loading Employer Analytics...</p>
          <p className="text-white/50 text-sm mt-2">Fetching engagement data</p>
        </motion.div>
      </div>
    );
  }
  if (!data) return <div className="text-center py-12"><p className="text-gray-500">No data available</p></div>;

  const stats = [
    { 
      title: 'Total Employers', 
      value: formatNumber(data.summary.totalEmployers), 
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
      trend: { value: "12.5", isPositive: true }
    },
    { 
      title: 'Active Employers', 
      value: formatNumber(data.summary.activeEmployers), 
      icon: TrendingUp,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      trend: { value: "8.3", isPositive: true }
    },
    { 
      title: 'Engagement Rate', 
      value: formatPercentage(data.summary.engagementRate), 
      icon: Award,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
      trend: { value: "5.7", isPositive: true }
    },
  ];

  return (
    <div className="space-y-6 text-white">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Employer Engagement</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode("summary")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
              viewMode === "summary"
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/50"
                : "text-white/60 hover:text-white bg-white/5 border border-white/10 hover:border-white/20"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Summary
          </button>
          <a
            href="/crm/employers"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white/60 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10"
            title="Go to Employers page"
          >
            <ExternalLink className="w-4 h-4" />
            View All
          </a>
        </div>
      </div>

      {/* Conditional Rendering */}
      {viewMode === "all" ? (
        <AllEmployersListing />
      ) : (
        <>
          {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.title} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative group cursor-pointer rounded-2xl p-5 md:p-6 border transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20 backdrop-blur-sm"
            >
              {/* Gradient Glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 bg-gradient-to-br ${stat.color}`} />

              {/* Content */}
              <div className="relative">
                {/* Icon and Trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  {stat.trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                      stat.trend.isPositive
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}>
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.trend.value}%
                    </div>
                  )}
                </div>

                {/* Value */}
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-white/60">{stat.title}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Top Employers by Job Posts */}
      {!loadingExtra && topEmployersByJobs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            Top Employers by Job Posts
          </h3>
          <div className="space-y-3">
            {topEmployersByJobs.map((employer, index) => {
              const isTop3 = index < 3;
              const rankColors = [
                "from-yellow-400 to-yellow-600",
                "from-gray-300 to-gray-500",
                "from-orange-400 to-orange-600"
              ];
              return (
                <motion.div key={employer._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="group relative">
                  <div className="flex items-center gap-4 p-5 bg-white/6 border border-white/12 rounded-xl hover:bg-white/10 hover:border-white/25 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                      isTop3 ? `bg-gradient-to-br ${rankColors[index]}` : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                    }`}>
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-lg truncate">{employer.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-white/70">{formatNumber(employer.activeJobs)} active</span>
                        {isTop3 && (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold border border-yellow-500/30 ml-auto">
                            Top {index + 1}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                        <p className="text-2xl font-bold text-blue-300">{formatNumber(employer.jobPosts)}</p>
                        <p className="text-xs text-white/60">posts</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Top Employers by Applications */}
      {!loadingExtra && topEmployersByApps.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            Top Employers by Applications
          </h3>
          <div className="space-y-3">
            {topEmployersByApps.map((employer, index) => {
              const isTop3 = index < 3;
              const rankColors = [
                "from-yellow-400 to-yellow-600",
                "from-gray-300 to-gray-500",
                "from-orange-400 to-orange-600"
              ];
              return (
                <motion.div key={employer._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="group relative">
                  <div className="flex items-center gap-4 p-5 bg-white/6 border border-white/12 rounded-xl hover:bg-white/10 hover:border-white/25 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                      isTop3 ? `bg-gradient-to-br ${rankColors[index]}` : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-lg truncate">{employer.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-white/70">{formatNumber(employer.hired)} hired</span>
                        <span className="text-sm text-white/70">•</span>
                        <span className="text-sm text-white/70">{formatPercentage(employer.hireRate)}% hire rate</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                        <p className="text-2xl font-bold text-purple-300">{formatNumber(employer.totalApplications)}</p>
                        <p className="text-xs text-white/60">applications</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

        </>
      )}
    </div>
  );
}
