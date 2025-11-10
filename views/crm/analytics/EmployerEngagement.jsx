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
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/30 flex items-center justify-center mb-4 border-2 border-indigo-500/40">
                <Icon className="w-6 h-6 text-indigo-300" />
              </div>
              <p className="text-sm text-indigo-300/80 mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-indigo-100">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Top Employers by Jobs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Top Employers by Job Posts</h3>
        <div className="space-y-3">
          {data.topEmployersByJobs.map((employer, index) => (
            <div key={employer._id} className="flex items-center gap-4 p-4 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">#{index + 1}</div>
              <div className="flex-1">
                <p className="font-semibold text-indigo-100">{employer.name}</p>
                <p className="text-sm text-indigo-300/70">{formatNumber(employer.jobPosts)} job posts</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Employers by Applications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Top Employers by Applications</h3>
        <div className="space-y-3">
          {data.topEmployersByApplications.map((employer, index) => (
            <div key={employer._id} className="flex items-center gap-4 p-4 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">#{index + 1}</div>
              <div className="flex-1">
                <p className="font-semibold text-indigo-100">{employer.name}</p>
                <p className="text-sm text-indigo-300/70">{formatNumber(employer.applications)} applications • {formatNumber(employer.hired)} hired</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Job Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Job Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-500/20 border-2 border-blue-500/30 rounded-xl">
            <p className="text-2xl font-bold text-blue-300">{formatNumber(data.jobStats.totalJobs)}</p>
            <p className="text-sm text-blue-300/70 mt-1 font-medium">Total Jobs</p>
          </div>
          <div className="text-center p-4 bg-emerald-500/20 border-2 border-emerald-500/30 rounded-xl">
            <p className="text-2xl font-bold text-emerald-300">{formatNumber(data.jobStats.activeJobs)}</p>
            <p className="text-sm text-emerald-300/70 mt-1 font-medium">Active Jobs</p>
          </div>
          <div className="text-center p-4 bg-purple-500/20 border-2 border-purple-500/30 rounded-xl">
            <p className="text-2xl font-bold text-purple-300">{formatNumber(data.jobStats.totalApplications)}</p>
            <p className="text-sm text-purple-300/70 mt-1 font-medium">Applications</p>
          </div>
          <div className="text-center p-4 bg-orange-500/20 border-2 border-orange-500/30 rounded-xl">
            <p className="text-2xl font-bold text-orange-300">{formatNumber(data.jobStats.totalHired)}</p>
            <p className="text-sm text-orange-300/70 mt-1 font-medium">Hired</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
