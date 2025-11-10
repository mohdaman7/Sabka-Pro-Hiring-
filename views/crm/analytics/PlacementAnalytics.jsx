"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Award, Briefcase, Clock } from "lucide-react";
import { getPlacementAnalytics, formatPercentage, formatNumber } from "@/services/analyticsService";

export default function PlacementAnalytics({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getPlacementAnalytics(filters);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.8), rgba(168,85,247,0.6))" }}
          >
            <Users className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Total Students</p>
          <p className="text-3xl font-bold text-white">{formatNumber(data.summary.totalStudents)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.75), rgba(59,130,246,0.55))" }}
          >
            <Award className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Placed Students</p>
          <p className="text-3xl font-bold text-white">{formatNumber(data.summary.placedStudents)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner"
            style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.8), rgba(244,114,182,0.6))" }}
          >
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-white/70">Placement Rate</p>
          <p className="text-3xl font-bold text-white">{formatPercentage(data.summary.placementRate)}</p>
        </motion.div>
      </div>

      {/* Top Employers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Top Hiring Employers</h3>
        <div className="space-y-3">
          {data.topEmployers.map((employer, index) => (
            <div key={employer._id} className="flex items-center gap-4 p-4 bg-white/6 border border-white/12 rounded-xl">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg, #fb923c, #f97316)" }}
              >
                #{index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{employer.name}</p>
                <p className="text-sm text-white/70">{formatNumber(employer.placements)} placements</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Placements by Role */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Top Job Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.placementsByRole.map((role) => (
            <div key={role._id} className="p-4 bg-white/6 border border-white/12 rounded-xl">
              <p className="font-semibold text-white capitalize">{role._id}</p>
              <p className="text-2xl font-bold text-white mt-1">{formatNumber(role.count)}</p>
              <p className="text-xs text-white/60 mt-1">{formatPercentage((role.count / data.summary.placedStudents) * 100)} of placements</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
