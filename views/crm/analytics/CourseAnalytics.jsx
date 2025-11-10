"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, CheckCircle, TrendingUp, DollarSign } from "lucide-react";
import { getCourseAnalytics, formatPercentage, formatNumber, formatCurrency } from "@/services/analyticsService";

export default function CourseAnalytics({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getCourseAnalytics(filters);
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
    <div className="space-y-6 text-white">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.85), rgba(6,182,212,0.65))" }}
          >
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Total Courses</p>
          <p className="text-3xl font-bold text-white">{formatNumber(data?.summary?.totalCourses || 0)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.85), rgba(59,130,246,0.55))" }}
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Active Courses</p>
          <p className="text-3xl font-bold text-white">{formatNumber(data?.summary?.activeCourses || 0)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.85), rgba(168,85,247,0.65))" }}
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Completion Rate</p>
          <p className="text-3xl font-bold text-white">{formatPercentage(data?.summary?.completionRate || 0)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(251,146,60,0.85), rgba(244,114,182,0.55))" }}
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Avg Progress</p>
          <p className="text-3xl font-bold text-white">{formatPercentage(data?.summary?.avgProgress || 0)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.85), rgba(59,130,246,0.55))" }}
          >
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Revenue</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(data?.summary?.revenue || 0)}</p>
        </motion.div>
      </div>

      {/* Top Courses */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Top Performing Courses</h3>
        <div className="space-y-3">
          {data.topCourses.map((course, index) => (
            <div key={course._id} className="flex items-center gap-4 p-4 bg-white/6 border border-white/12 rounded-xl">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.85), rgba(59,130,246,0.7))" }}
              >
                #{index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{course.title}</p>
                <p className="text-sm text-white/70">{formatNumber(course.enrollments)} enrollments</p>
              </div>
              <p className="text-lg font-bold text-cyan-300">{formatPercentage(course.completionRate)}</p>
              <p className="text-xs text-white/60">completion rate</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Completion Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Completion Trend</h3>
        <div className="space-y-3">
          {data.completionTrend.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 bg-white/6 border border-white/12 rounded-xl">
              <p className="font-semibold text-white">{item._id}</p>
              <p className="text-xl font-bold text-purple-300">{formatNumber(item.count)} completions</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
