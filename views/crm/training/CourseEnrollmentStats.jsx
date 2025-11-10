"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
  BarChart3,
  X,
} from "lucide-react";
import { getCourseEnrollmentStats } from "@/services/enrollmentService";

export default function CourseEnrollmentStats({ courseId, courseName, onClose }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [courseId]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getCourseEnrollmentStats(courseId);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching enrollment stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  const statusData = stats?.byStatus || [];
  const totalEnrollments = stats?.totalEnrollments || 0;
  const completionRate = stats?.completionRate || 0;

  const statusConfig = {
    enrolled: { label: "Enrolled", color: "blue", icon: Users },
    in_progress: { label: "In Progress", color: "amber", icon: Clock },
    completed: { label: "Completed", color: "emerald", icon: CheckCircle },
    dropped: { label: "Dropped", color: "red", icon: X },
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10 p-6 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Enrollment Statistics</h2>
              <p className="text-white/70 text-sm mt-1">{courseName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white/70" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Enrollments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-6 border border-blue-500/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <p className="text-4xl font-bold text-white mb-1">{totalEnrollments}</p>
              <p className="text-sm text-white/70">Total Enrollments</p>
            </motion.div>

            {/* Completion Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl p-6 border border-emerald-500/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                  <Award className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <p className="text-4xl font-bold text-white mb-1">{completionRate.toFixed(1)}%</p>
              <p className="text-sm text-white/70">Completion Rate</p>
            </motion.div>

            {/* Average Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-6 border border-purple-500/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <p className="text-4xl font-bold text-white mb-1">
                {statusData.reduce((acc, s) => acc + (s.avgProgress || 0), 0) / (statusData.length || 1).toFixed(1)}%
              </p>
              <p className="text-sm text-white/70">Average Progress</p>
            </motion.div>
          </div>

          {/* Status Breakdown */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Enrollment Status Breakdown
            </h3>
            
            <div className="space-y-4">
              {statusData.map((status, index) => {
                const config = statusConfig[status._id] || {
                  label: status._id,
                  color: "gray",
                  icon: Users,
                };
                const Icon = config.icon;
                const percentage = totalEnrollments > 0 ? (status.count / totalEnrollments) * 100 : 0;

                return (
                  <motion.div
                    key={status._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${config.color}-500/20 border border-${config.color}-500/30`}>
                          <Icon className={`w-4 h-4 text-${config.color}-400`} />
                        </div>
                        <span className="text-white font-medium">{config.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white/70 text-sm">{status.count} students</span>
                        <span className={`text-${config.color}-400 font-bold`}>{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-r from-${config.color}-500 to-${config.color}-600`}
                      />
                    </div>
                    {status.avgProgress !== undefined && (
                      <p className="text-xs text-white/50 ml-11">
                        Average Progress: {status.avgProgress.toFixed(1)}%
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {statusData.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-white/30 mx-auto mb-3" />
                <p className="text-white/50">No enrollment data available</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
