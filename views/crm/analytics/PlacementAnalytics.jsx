"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Award, Briefcase, Clock, TrendingUp, Building2 } from "lucide-react";
import { getPlacementAnalytics, getTopEmployersByJobPosts, getTopEmployersByApplications, formatPercentage, formatNumber } from "@/services/analyticsService";

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
      const params = {};
      if (filters?.startDate) params.startDate = filters.startDate;
      if (filters?.endDate) params.endDate = filters.endDate;
      params.limit = 5;
      
      console.log("📊 Fetching top employers with params:", params);
      
      const [jobsRes, appsRes] = await Promise.all([
        getTopEmployersByJobPosts(params),
        getTopEmployersByApplications(params),
      ]);
      
      console.log("✅ Top Employers by Jobs Response:", jobsRes);
      console.log("✅ Top Employers by Apps Response:", appsRes);
      
      if (jobsRes.success && jobsRes.data.topEmployers) {
        console.log("📈 Setting top employers by jobs:", jobsRes.data.topEmployers.length);
        setTopEmployersByJobs(jobsRes.data.topEmployers);
      } else {
        console.warn("⚠️ No top employers by jobs data");
      }
      
      if (appsRes.success && appsRes.data.topEmployers) {
        console.log("📈 Setting top employers by apps:", appsRes.data.topEmployers.length);
        setTopEmployersByApps(appsRes.data.topEmployers);
      } else {
        console.warn("⚠️ No top employers by apps data");
      }
    } catch (error) {
      console.error("❌ Error fetching placement analytics:", error);
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

      {/* Top Hiring Employers */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 shadow-2xl backdrop-blur-md relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 animate-pulse" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/30">
                <Briefcase className="w-6 h-6 text-orange-400" />
              </div>
              Top Hiring Employers
            </h3>
            <div className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
              <span className="text-sm font-semibold text-orange-300">{data.topEmployers.length} Companies</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {data.topEmployers.map((employer, index) => {
              const isTop3 = index < 3;
              const rankColors = [
                { from: "from-yellow-400", to: "to-yellow-600", glow: "shadow-yellow-500/50" },
                { from: "from-gray-300", to: "to-gray-500", glow: "shadow-gray-400/50" },
                { from: "from-orange-400", to: "to-orange-600", glow: "shadow-orange-500/50" }
              ];
              const colors = isTop3 ? rankColors[index] : { from: "from-purple-500", to: "to-pink-500", glow: "shadow-purple-500/50" };
              
              return (
                <motion.div 
                  key={employer._id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-white/8 to-white/4 border border-white/15 rounded-xl hover:bg-white/12 hover:border-white/30 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
                    {/* Rank Badge with Glow */}
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${colors.glow} bg-gradient-to-br ${colors.from} ${colors.to}`}>
                      <span className="relative z-10">#{index + 1}</span>
                      {isTop3 && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent animate-pulse" />
                      )}
                    </div>
                    
                    {/* Employer Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-lg truncate group-hover:text-orange-300 transition-colors">{employer.name}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-sm text-white/70 font-medium">{formatNumber(employer.placements)} placements</span>
                        </div>
                        {isTop3 && (
                          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 text-xs font-bold border border-yellow-500/40 shadow-lg">
                            🏆 Top {index + 1}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Placement Count Badge */}
                    <div className="text-right">
                      <div className="px-5 py-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 shadow-lg group-hover:shadow-emerald-500/30 transition-shadow">
                        <p className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">{formatNumber(employer.placements)}</p>
                        <p className="text-xs text-white/60 font-semibold uppercase tracking-wide">hires</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Top Job Roles */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 shadow-2xl backdrop-blur-md relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 animate-pulse" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
              Top Job Roles
            </h3>
            <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
              <span className="text-sm font-semibold text-cyan-300">{data.placementsByRole.length} Roles</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.placementsByRole.map((role, index) => {
              const percentage = (role.count / data.summary.placedStudents) * 100;
              return (
                <motion.div 
                  key={role._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-5 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-xl hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
                >
                  {/* Role Icon/Number */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <span className="text-lg font-bold text-cyan-300">#{index + 1}</span>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                      <span className="text-xs font-bold text-cyan-300">{formatPercentage(percentage)}</span>
                    </div>
                  </div>
                  
                  {/* Role Name */}
                  <p className="font-bold text-white text-base capitalize mb-2 group-hover:text-cyan-300 transition-colors">{role._id}</p>
                  
                  {/* Count */}
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{formatNumber(role.count)}</p>
                    <span className="text-sm text-white/60 font-medium">placements</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
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
