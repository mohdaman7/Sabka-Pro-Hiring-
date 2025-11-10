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

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mb-4">
            <Briefcase className="w-6 h-6 text-rose-600" />
          </div>
          <p className="text-sm text-gray-600">Total Employers</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(data.summary.totalEmployers)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Active Employers</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(data.summary.activeEmployers)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Engagement Rate</p>
          <p className="text-3xl font-bold text-gray-900">{formatPercentage(data.summary.engagementRate)}</p>
        </motion.div>
      </div>

      {/* Top Employers by Jobs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Employers by Job Posts</h3>
        <div className="space-y-3">
          {data.topEmployersByJobs.map((employer, index) => (
            <div key={employer._id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold">#{index + 1}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{employer.name}</p>
                <p className="text-sm text-gray-600">{formatNumber(employer.jobPosts)} total posts • {formatNumber(employer.activeJobs)} active</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Employers by Applications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Employers by Applications</h3>
        <div className="space-y-3">
          {data.topEmployersByApplications.map((employer, index) => (
            <div key={employer._id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">#{index + 1}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{employer.name}</p>
                <p className="text-sm text-gray-600">{formatNumber(employer.applications)} applications • {formatNumber(employer.hired)} hired</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Job Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Job Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.jobStats.map((stat) => (
            <div key={stat._id} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl text-center">
              <p className="text-2xl font-bold text-purple-600">{formatNumber(stat.count)}</p>
              <p className="text-sm text-gray-600 mt-1 capitalize">{stat._id}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
