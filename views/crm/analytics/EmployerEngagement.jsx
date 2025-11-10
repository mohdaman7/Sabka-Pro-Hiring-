"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, FileText, Users, TrendingUp } from "lucide-react";
import { getEmployerEngagement, formatPercentage, formatNumber } from "@/services/analyticsService";

export default function EmployerEngagement({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getEmployerEngagement(filters);
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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

      {/* Top Employers by Jobs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Top Employers by Job Posts</h3>
        <div className="space-y-3">
          {data.topEmployersByJobs.map((employer, index) => (
            <div key={employer._id} className="flex items-center gap-4 p-4 bg-white/6 border border-white/12 rounded-xl">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg, rgba(244,114,182,0.85), rgba(236,72,153,0.7))" }}
              >
                #{index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{employer.name}</p>
                <p className="text-sm text-white/70">{formatNumber(employer.jobPosts)} job posts</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Employers by Applications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Top Employers by Applications</h3>
        <div className="space-y-3">
          {data.topEmployersByApplications.map((employer, index) => (
            <div key={employer._id} className="flex items-center gap-4 p-4 bg-white/6 border border-white/12 rounded-xl">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.85), rgba(168,85,247,0.65))" }}
              >
                #{index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{employer.name}</p>
                <p className="text-sm text-white/70">{formatNumber(employer.applications)} applications • {formatNumber(employer.hired)} hired</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Job Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Job Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl border border-white/12 bg-white/6">
            <p className="text-2xl font-bold text-white">{formatNumber(data.jobStats.totalJobs)}</p>
            <p className="text-sm text-white/70 mt-1 font-medium">Total Jobs</p>
          </div>
          <div className="text-center p-4 rounded-xl border border-white/12 bg-white/6">
            <p className="text-2xl font-bold text-white">{formatNumber(data.jobStats.activeJobs)}</p>
            <p className="text-sm text-white/70 mt-1 font-medium">Active Jobs</p>
          </div>
          <div className="text-center p-4 rounded-xl border border-white/12 bg-white/6">
            <p className="text-2xl font-bold text-white">{formatNumber(data.jobStats.totalApplications)}</p>
            <p className="text-sm text-white/70 mt-1 font-medium">Applications</p>
          </div>
          <div className="text-center p-4 rounded-xl border border-white/12 bg-white/6">
            <p className="text-2xl font-bold text-white">{formatNumber(data.jobStats.totalHired)}</p>
            <p className="text-sm text-white/70 mt-1 font-medium">Hired</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
