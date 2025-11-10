"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Award, Briefcase, Clock, TrendingUp, Building2 } from "lucide-react";
import { getPlacementAnalytics, formatPercentage, formatNumber } from "@/services/analyticsService";

export default function PlacementAnalytics({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [topEmployersByJobs, setTopEmployersByJobs] = useState([]);
  const [topEmployersByApps, setTopEmployersByApps] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getPlacementAnalytics(filters);
      setData(response.data);
      
      // Fetch additional data
      setLoadingExtra(true);
      const [jobsRes, appsRes] = await Promise.all([
        fetch(`/api/analytics/employers/top-by-jobs?limit=5${filters?.startDate ? `&startDate=${filters.startDate}` : ''}${filters?.endDate ? `&endDate=${filters.endDate}` : ''}`).then(r => r.json()),
        fetch(`/api/analytics/employers/top-by-applications?limit=5${filters?.startDate ? `&startDate=${filters.startDate}` : ''}${filters?.endDate ? `&endDate=${filters.endDate}` : ''}`).then(r => r.json()),
      ]);
      
      if (jobsRes.success) setTopEmployersByJobs(jobsRes.data.topEmployers);
      if (appsRes.success) setTopEmployersByApps(appsRes.data.topEmployers);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setLoadingExtra(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  if (!data) return <div className="text-center py-12"><p className="text-gray-500">No data available</p></div>;

  return (
    <div className="space-y-6 text-white">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.8), rgba(168,85,247,0.6))" }}
          >
            <Users className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Total Students</p>
          <p className="text-3xl font-bold text-white">{formatNumber(data.summary.totalStudents)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.75), rgba(59,130,246,0.55))" }}
          >
            <Award className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Placed Students</p>
          <p className="text-3xl font-bold text-white">{formatNumber(data.summary.placedStudents)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.8), rgba(244,114,182,0.6))" }}
          >
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Placement Rate</p>
          <p className="text-3xl font-bold text-white">{formatPercentage(data.summary.placementRate)}</p>
        </motion.div>
      </div>

      {/* Top Employers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-orange-400" />
          Top Hiring Employers
        </h3>
        <div className="space-y-3">
          {data.topEmployers.map((employer, index) => {
            const isTop3 = index < 3;
            const rankColors = [
              "from-yellow-400 to-yellow-600",
              "from-gray-300 to-gray-500",
              "from-orange-400 to-orange-600"
            ];
            return (
              <div key={employer._id} className="group relative">
                <div className="flex items-center gap-4 p-5 bg-white/6 border border-white/12 rounded-xl hover:bg-white/10 hover:border-white/25 transition-all duration-300">
                  {/* Rank Badge */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                    isTop3 ? `bg-gradient-to-br ${rankColors[index]}` : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    #{index + 1}
                  </div>
                  {/* Employer Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-lg truncate">{employer.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-white/70">{formatNumber(employer.placements)} placements</span>
                      {isTop3 && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold border border-yellow-500/30">
                          Top {index + 1}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Placement Count Badge */}
                  <div className="text-right">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                      <p className="text-2xl font-bold text-emerald-300">{formatNumber(employer.placements)}</p>
                      <p className="text-xs text-white/60">hires</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Placements by Role */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          Top Job Roles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.placementsByRole.map((role) => (
            <div key={role._id} className="p-4 bg-white/6 border border-white/12 rounded-xl hover:bg-white/10 transition-all duration-300">
              <p className="font-semibold text-white capitalize">{role._id}</p>
              <p className="text-2xl font-bold text-white mt-1">{formatNumber(role.count)}</p>
              <p className="text-xs text-white/60 mt-1">{formatPercentage((role.count / data.summary.placedStudents) * 100)} of placements</p>
            </div>
          ))}
        </div>
      </motion.div>

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
                        <span className="text-sm text-white/70">{employer.industry || 'N/A'}</span>
                        {isTop3 && (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold border border-yellow-500/30">
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
    </div>
  );
}
