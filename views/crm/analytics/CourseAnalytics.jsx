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
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-4">
            <GraduationCap className="w-6 h-6 text-cyan-600" />
          </div>
          <p className="text-sm text-gray-600">Total Courses</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(data.summary.totalCourses)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Active Courses</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(data.summary.activeCourses)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Enrollments</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(data.summary.totalEnrollments)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600">Avg Progress</p>
          <p className="text-3xl font-bold text-gray-900">{formatPercentage(data.summary.avgProgress)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(data.summary.revenue)}</p>
        </motion.div>
      </div>

      {/* Top Courses */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Courses</h3>
        <div className="space-y-3">
          {data.topCourses.map((course, index) => (
            <div key={course._id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">#{index + 1}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{course.title}</p>
                <p className="text-sm text-gray-600">{formatNumber(course.enrollments)} enrollments • {formatNumber(course.completed)} completed</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-cyan-600">{formatPercentage(course.completionRate)}</p>
                <p className="text-xs text-gray-500">completion rate</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Completion Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Completion Trend</h3>
        <div className="space-y-3">
          {data.completionTrend.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <p className="font-semibold text-gray-900">{item._id}</p>
              <p className="text-xl font-bold text-purple-600">{formatNumber(item.count)} completions</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
