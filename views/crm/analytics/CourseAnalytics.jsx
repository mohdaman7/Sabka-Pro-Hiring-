"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, CheckCircle, TrendingUp, DollarSign, Zap, List, BarChart3, ExternalLink, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getCourseAnalytics, getTopCoursesByPerformance, formatPercentage, formatNumber, formatCurrency } from "@/services/analyticsService";
import AllCoursesListing from "./AllCoursesListing";

export default function CourseAnalytics({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [topCoursesByPerformance, setTopCoursesByPerformance] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(false);
  const [viewMode, setViewMode] = useState("summary"); // "summary" or "all"

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin"></div>
            <GraduationCap className="absolute inset-0 m-auto w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/70 font-semibold text-lg">Loading Course Analytics...</p>
          <p className="text-white/50 text-sm mt-2">Fetching training data</p>
        </motion.div>
      </div>
    );
  }
  if (!data) return <div className="text-center py-12"><p className="text-gray-500">No data available</p></div>;

  return (
    <div className="space-y-6 text-white">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Course Analytics</h2>
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
            href="/crm/training-courses"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white/60 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10"
            title="Go to Training Courses page"
          >
            <ExternalLink className="w-4 h-4" />
            View All
          </a>
        </div>
      </div>

      {/* Conditional Rendering */}
      {viewMode === "all" ? (
        <AllCoursesListing />
      ) : (
        <>
          {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
        {[
          {
            label: "Total Courses",
            value: formatNumber(data?.summary?.totalCourses || 0),
            icon: GraduationCap,
            color: "from-cyan-500 to-blue-500",
            bgColor: "bg-cyan-500/10",
            iconColor: "text-cyan-400",
            trend: { value: "10.5", isPositive: true },
          },
          {
            label: "Active Courses",
            value: formatNumber(data?.summary?.activeCourses || 0),
            icon: CheckCircle,
            color: "from-emerald-500 to-green-500",
            bgColor: "bg-emerald-500/10",
            iconColor: "text-emerald-400",
            trend: { value: "8.2", isPositive: true },
          },
          {
            label: "Completion Rate",
            value: formatPercentage(data?.summary?.completionRate || 0),
            icon: TrendingUp,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500/10",
            iconColor: "text-purple-400",
            trend: { value: "12.3", isPositive: true },
          },
          {
            label: "Avg Progress",
            value: formatPercentage(data?.summary?.avgProgress || 0),
            icon: Zap,
            color: "from-orange-500 to-amber-500",
            bgColor: "bg-orange-500/10",
            iconColor: "text-orange-400",
            trend: { value: "6.8", isPositive: true },
          },
          {
            label: "Revenue",
            value: formatCurrency(data?.summary?.revenue || 0),
            icon: DollarSign,
            color: "from-emerald-500 to-teal-500",
            bgColor: "bg-emerald-500/10",
            iconColor: "text-emerald-400",
            trend: { value: "15.7", isPositive: true },
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative group cursor-pointer rounded-2xl p-5 md:p-6 border transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20 backdrop-blur-sm"
            >
              {/* Gradient Glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 bg-gradient-to-br ${stat.color}`} />

              {/* Content */}
              <div className="relative">
                {/* Icon and Trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  {stat.trend && (
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                        stat.trend.isPositive
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {stat.trend.isPositive ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.trend.value}%
                    </div>
                  )}
                </div>

                {/* Value */}
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-white/60">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
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
        </>
      )}
    </div>
  );
}
