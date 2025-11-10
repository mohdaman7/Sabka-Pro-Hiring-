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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/30 flex items-center justify-center mb-4 border-2 border-cyan-500/40">
            <GraduationCap className="w-6 h-6 text-cyan-300" />
          </div>
          <p className="text-sm text-indigo-300/80">Total Courses</p>
          <p className="text-3xl font-bold text-indigo-100">{formatNumber(data.summary.totalCourses)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center mb-4 border-2 border-emerald-500/40">
            <CheckCircle className="w-6 h-6 text-emerald-300" />
          </div>
          <p className="text-sm text-indigo-300/80">Active Courses</p>
          <p className="text-3xl font-bold text-indigo-100">{formatNumber(data.summary.activeCourses)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center mb-4 border-2 border-purple-500/40">
            <TrendingUp className="w-6 h-6 text-purple-300" />
          </div>
          <p className="text-sm text-indigo-300/80">Completion Rate</p>
          <p className="text-3xl font-bold text-indigo-100">{formatPercentage(data.summary.completionRate)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-500/30 flex items-center justify-center mb-4 border-2 border-orange-500/40">
            <TrendingUp className="w-6 h-6 text-orange-300" />
          </div>
          <p className="text-sm text-indigo-300/80">Avg Progress</p>
          <p className="text-3xl font-bold text-indigo-100">{formatPercentage(data.summary.avgProgress)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center mb-4 border-2 border-emerald-500/40">
            <DollarSign className="w-6 h-6 text-emerald-300" />
          </div>
          <p className="text-sm text-indigo-300/80">Revenue</p>
          <p className="text-3xl font-bold text-indigo-100">{formatCurrency(data.summary.revenue)}</p>
        </motion.div>
      </div>

      {/* Top Courses */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Top Performing Courses</h3>
        <div className="space-y-3">
          {data.topCourses.map((course, index) => (
            <div key={course._id} className="flex items-center gap-4 p-4 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">#{index + 1}</div>
              <div className="flex-1">
                <p className="font-semibold text-indigo-100">{course.title}</p>
                <p className="text-sm text-indigo-300/70">{formatNumber(course.enrollments)} enrollments</p>
              </div>
              <p className="text-lg font-bold text-cyan-400">{formatPercentage(course.completionRate)}</p>
              <p className="text-xs text-indigo-300/60">completion rate</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Completion Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Completion Trend</h3>
        <div className="space-y-3">
          {data.completionTrend.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-xl">
              <p className="font-semibold text-indigo-100">{item._id}</p>
              <p className="text-xl font-bold text-purple-400">{formatNumber(item.count)} completions</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
