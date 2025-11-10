"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle,
  PlayCircle,
  Award,
  TrendingUp,
  Calendar,
  BarChart3,
  Target,
} from "lucide-react";
import { getMyEnrollments, updateEnrollmentProgress } from "@/services/enrollmentService";
import customToast from "@/utils/customToast";
import Link from "next/link";

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, enrolled, in_progress, completed

  useEffect(() => {
    fetchEnrollments();
  }, [filter]);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const params = filter !== "all" ? { status: filter } : {};
      const response = await getMyEnrollments(params);
      setEnrollments(response.data.enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      customToast.error("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      enrolled: {
        label: "Enrolled",
        color: "blue",
        bg: "from-blue-500/20 to-blue-600/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        icon: BookOpen,
      },
      in_progress: {
        label: "In Progress",
        color: "amber",
        bg: "from-amber-500/20 to-amber-600/10",
        border: "border-amber-500/30",
        text: "text-amber-400",
        icon: Clock,
      },
      completed: {
        label: "Completed",
        color: "emerald",
        bg: "from-emerald-500/20 to-emerald-600/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        icon: CheckCircle,
      },
      dropped: {
        label: "Dropped",
        color: "red",
        bg: "from-red-500/20 to-red-600/10",
        border: "border-red-500/30",
        text: "text-red-400",
        icon: Clock,
      },
    };
    return configs[status] || configs.enrolled;
  };

  // Calculate stats
  const stats = {
    total: enrollments.length,
    enrolled: enrollments.filter((e) => e.status === "enrolled").length,
    inProgress: enrollments.filter((e) => e.status === "in_progress").length,
    completed: enrollments.filter((e) => e.status === "completed").length,
    avgProgress:
      enrollments.length > 0
        ? (enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length).toFixed(1)
        : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <GraduationCap className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">My Learning Journey</h1>
              <p className="text-white/70 mt-1">Track your progress and continue learning</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Total Courses", value: stats.total, icon: BookOpen, color: "purple" },
              { label: "Enrolled", value: stats.enrolled, icon: Target, color: "blue" },
              { label: "In Progress", value: stats.inProgress, icon: Clock, color: "amber" },
              { label: "Completed", value: stats.completed, icon: CheckCircle, color: "emerald" },
              { label: "Avg Progress", value: `${stats.avgProgress}%`, icon: TrendingUp, color: "pink" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/10 rounded-xl p-4 border border-${stat.color}-500/30`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-3">
            {[
              { id: "all", label: "All Courses" },
              { id: "enrolled", label: "Enrolled" },
              { id: "in_progress", label: "In Progress" },
              { id: "completed", label: "Completed" },
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  filter === filterOption.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border border-white/20"
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Enrollments List */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : enrollments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 text-lg mb-4">No enrollments found</p>
            <Link
              href="/student/courses"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Browse Courses
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {enrollments.map((enrollment, index) => {
                const course = enrollment.courseId;
                const statusConfig = getStatusConfig(enrollment.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={enrollment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      {/* Thumbnail */}
                      <div className="w-full md:w-64 flex-shrink-0">
                        <div className="relative aspect-video rounded-xl overflow-hidden">
                          {course?.thumbnail ? (
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                              <GraduationCap className="w-12 h-12 text-white/50" />
                            </div>
                          )}
                          
                          {/* Status Badge */}
                          <div className="absolute top-3 right-3">
                            <div className={`px-3 py-1 rounded-full bg-gradient-to-br ${statusConfig.bg} backdrop-blur-sm border ${statusConfig.border} flex items-center gap-1.5`}>
                              <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.text}`} />
                              <span className={`text-xs font-bold ${statusConfig.text}`}>
                                {statusConfig.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        {/* Title and Category */}
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {course?.title}
                          </h3>
                          {course?.category && (
                            <span className="inline-block px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-xs font-semibold text-pink-300">
                              {course.category}
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 text-sm text-white/70">
                          {course?.instructor && (
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-purple-400" />
                              <span>{course.instructor}</span>
                            </div>
                          )}
                          {course?.lessons && (
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-purple-400" />
                              <span>{course.lessons.length} lessons</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span>Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                          </div>
                          {enrollment.completedLessons && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              <span>{enrollment.completedLessons.length} lessons completed</span>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-white/80 font-semibold">Progress</span>
                            <span className="text-purple-400 font-bold">{enrollment.progress || 0}%</span>
                          </div>
                          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${enrollment.progress || 0}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            />
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex gap-3">
                          <Link
                            href={`/student/courses/${course?._id}`}
                            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                          >
                            <PlayCircle className="w-5 h-5" />
                            Continue Learning
                          </Link>
                          {enrollment.status === "completed" && (
                            <button className="px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/30 transition-all flex items-center gap-2">
                              <Award className="w-5 h-5" />
                              Certificate
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
