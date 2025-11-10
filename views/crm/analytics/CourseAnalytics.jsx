"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, CheckCircle, TrendingUp, DollarSign, Zap } from "lucide-react";
import { getCourseAnalytics, getTopCoursesByPerformance, formatPercentage, formatNumber, formatCurrency } from "@/services/analyticsService";

export default function CourseAnalytics({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [topCoursesByPerformance, setTopCoursesByPerformance] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getCourseAnalytics(filters);
      setData(response.data);
      
      // Fetch top courses by performance
      setLoadingExtra(true);
      const params = {};
      if (filters?.startDate) params.startDate = filters.startDate;
      if (filters?.endDate) params.endDate = filters.endDate;
      params.limit = 5;
      
      console.log("📚 Fetching top courses with params:", params);
      
      const perfRes = await getTopCoursesByPerformance(params);
      
      console.log("✅ Top Courses Response:", perfRes);
      
      if (perfRes.success && perfRes.data.topCourses) {
        console.log("📈 Setting top courses:", perfRes.data.topCourses.length);
        setTopCoursesByPerformance(perfRes.data.topCourses);
      } else {
        console.warn("⚠️ No top courses data");
      }
    } catch (error) {
      console.error("❌ Error fetching course analytics:", error);
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
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-cyan-400" />
          Top Performing Courses
        </h3>
        <div className="space-y-3">
          {data.topCourses.map((course, index) => {
            const isTop3 = index < 3;
            const rankColors = [
              "from-yellow-400 to-yellow-600",
              "from-gray-300 to-gray-500",
              "from-orange-400 to-orange-600"
            ];
            return (
              <div key={course._id} className="group relative">
                <div className="flex items-center gap-4 p-5 bg-white/6 border border-white/12 rounded-xl hover:bg-white/10 hover:border-white/25 transition-all duration-300">
                  {/* Rank Badge */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                    isTop3 ? `bg-gradient-to-br ${rankColors[index]}` : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                  }`}>
                    #{index + 1}
                  </div>
                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-lg truncate">{course.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-white/70">{formatNumber(course.enrollments)} enrollments</span>
                      {isTop3 && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold border border-yellow-500/30">
                          Top {index + 1}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Completion Rate Badge */}
                  <div className="text-right">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                      <p className="text-2xl font-bold text-cyan-300">{formatPercentage(course.completionRate)}</p>
                      <p className="text-xs text-white/60">completion</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Completion Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Completion Trend
        </h3>
        <div className="space-y-3">
          {data.completionTrend.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 bg-white/6 border border-white/12 rounded-xl hover:bg-white/10 transition-all duration-300">
              <p className="font-semibold text-white">{item._id}</p>
              <p className="text-xl font-bold text-purple-300">{formatNumber(item.count)} completions</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Courses by Performance */}
      {!loadingExtra && topCoursesByPerformance.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Top Courses by Performance
          </h3>
          <div className="space-y-3">
            {topCoursesByPerformance.map((course, index) => {
              const isTop3 = index < 3;
              const rankColors = [
                "from-yellow-400 to-yellow-600",
                "from-gray-300 to-gray-500",
                "from-orange-400 to-orange-600"
              ];
              return (
                <motion.div key={course._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="group relative">
                  <div className="flex items-center gap-4 p-5 bg-white/6 border border-white/12 rounded-xl hover:bg-white/10 hover:border-white/25 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                      isTop3 ? `bg-gradient-to-br ${rankColors[index]}` : 'bg-gradient-to-br from-yellow-500 to-orange-500'
                    }`}>
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-lg truncate">{course.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-white/70">{formatNumber(course.totalEnrolled)} enrolled</span>
                        <span className="text-sm text-white/70">•</span>
                        <span className="text-sm text-white/70">{formatNumber(course.completed)} completed</span>
                        {isTop3 && (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold border border-yellow-500/30 ml-auto">
                            Top {index + 1}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                        <p className="text-2xl font-bold text-yellow-300">{formatPercentage(course.completionRate)}</p>
                        <p className="text-xs text-white/60">completion</p>
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
