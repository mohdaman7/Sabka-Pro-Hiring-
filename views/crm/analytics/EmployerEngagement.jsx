"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, FileText, Users, TrendingUp, List, BarChart3, Building2, Award, CheckCircle, Send, ExternalLink } from "lucide-react";
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

  if (loading) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  if (!data) return <div className="text-center py-12"><p className="text-gray-500">No data available</p></div>;

  const stats = [
    { title: 'Total Employers', value: formatNumber(data.summary.totalEmployers), icon: Briefcase },
    { title: 'Active Employers', value: formatNumber(data.summary.activeEmployers), icon: TrendingUp },
    { title: 'Engagement Rate', value: formatPercentage(data.summary.engagementRate), icon: FileText },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
                style={{ background: "linear-gradient(135deg, rgba(128,55,145,0.85), rgba(184,123,209,0.65))" }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white/70 mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
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

      {/* Job Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>
            Job Statistics
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Jobs */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0 }} className="group relative p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <Briefcase className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">Total</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{formatNumber(data.jobStats.totalJobs)}</p>
            <p className="text-sm text-white/70 font-medium">Total Jobs</p>
          </motion.div>

          {/* Active Jobs */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="group relative p-6 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{formatNumber(data.jobStats.activeJobs)}</p>
            <p className="text-sm text-white/70 font-medium">Active Jobs</p>
          </motion.div>

          {/* Applications */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="group relative p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                <Send className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">Received</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{formatNumber(data.jobStats.totalApplications)}</p>
            <p className="text-sm text-white/70 font-medium">Applications</p>
          </motion.div>

          {/* Hired */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="group relative p-6 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/30 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/30">
                <Users className="w-5 h-5 text-rose-400" />
              </div>
              <span className="text-xs font-bold text-rose-300 bg-rose-500/20 px-2 py-1 rounded-full">Success</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{formatNumber(data.jobStats.totalHired)}</p>
            <p className="text-sm text-white/70 font-medium">Hired</p>
          </motion.div>
        </div>
      </motion.div>
        </>
      )}
    </div>
  );
}
