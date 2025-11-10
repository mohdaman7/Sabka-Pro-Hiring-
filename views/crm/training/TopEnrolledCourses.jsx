"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Award,
  BookOpen,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { getTopEnrolledCourses } from "@/services/enrollmentService";

export default function TopEnrolledCourses({ limit = 10 }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopCourses();
  }, [limit]);

  const fetchTopCourses = async () => {
    try {
      setLoading(true);
      const response = await getTopEnrolledCourses({ limit });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching top enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Top Enrolled Courses</h2>
            <p className="text-white/70 text-sm mt-1">Most popular courses by enrollment</p>
          </div>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/70">No enrollment data available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course, index) => {
            const isTop3 = index < 3;
            const rankColors = [
              { bg: "from-yellow-500/20 to-yellow-600/10", border: "border-yellow-500/30", text: "text-yellow-400", icon: "text-yellow-400" },
              { bg: "from-gray-400/20 to-gray-500/10", border: "border-gray-400/30", text: "text-gray-300", icon: "text-gray-300" },
              { bg: "from-orange-500/20 to-orange-600/10", border: "border-orange-500/30", text: "text-orange-400", icon: "text-orange-400" },
            ];
            const colorScheme = isTop3 ? rankColors[index] : {
              bg: "from-blue-500/20 to-blue-600/10",
              border: "border-blue-500/30",
              text: "text-blue-400",
              icon: "text-blue-400",
            };

            return (
              <motion.div
                key={course.courseId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative bg-gradient-to-br ${colorScheme.bg} rounded-xl p-6 border ${colorScheme.border} hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="flex items-start gap-6">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorScheme.bg} border-2 ${colorScheme.border} flex items-center justify-center relative`}>
                      {isTop3 ? (
                        <Trophy className={`w-8 h-8 ${colorScheme.icon}`} />
                      ) : (
                        <span className={`text-2xl font-bold ${colorScheme.text}`}>#{index + 1}</span>
                      )}
                      {isTop3 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-slate-900 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-white/70">
                          {course.category && (
                            <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20">
                              {course.category}
                            </span>
                          )}
                          {course.instructor && (
                            <span className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              {course.instructor}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Total Enrollments Badge */}
                      <div className="flex-shrink-0 text-right">
                        <div className={`px-4 py-2 rounded-lg bg-gradient-to-br ${colorScheme.bg} border ${colorScheme.border}`}>
                          <p className={`text-2xl font-bold ${colorScheme.text}`}>
                            {course.totalEnrollments}
                          </p>
                          <p className="text-xs text-white/60">enrollments</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {/* Active */}
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-white/60">Active</span>
                        </div>
                        <p className="text-lg font-bold text-white">{course.activeEnrollments}</p>
                      </div>

                      {/* Completed */}
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-white/60">Completed</span>
                        </div>
                        <p className="text-lg font-bold text-white">{course.completedEnrollments}</p>
                      </div>

                      {/* Completion Rate */}
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-white/60">Rate</span>
                        </div>
                        <p className="text-lg font-bold text-white">{course.completionRate.toFixed(1)}%</p>
                      </div>

                      {/* Avg Progress */}
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="w-4 h-4 text-pink-400" />
                          <span className="text-xs text-white/60">Progress</span>
                        </div>
                        <p className="text-lg font-bold text-white">{course.avgProgress.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 self-center">
                    <ChevronRight className="w-6 h-6 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
