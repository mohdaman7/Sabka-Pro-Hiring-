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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center mb-4 border-2 border-blue-500/40">
            <Users className="w-6 h-6 text-blue-300" />
          </div>
          <p className="text-sm text-indigo-300/80">Total Students</p>
          <p className="text-3xl font-bold text-indigo-100">{formatNumber(data.summary.totalStudents)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center mb-4 border-2 border-emerald-500/40">
            <Award className="w-6 h-6 text-emerald-300" />
          </div>
          <p className="text-sm text-indigo-300/80">Placed Students</p>
          <p className="text-3xl font-bold text-indigo-100">{formatNumber(data.summary.placedStudents)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center mb-4 border-2 border-purple-500/40">
            <Briefcase className="w-6 h-6 text-purple-300" />
          </div>
          <p className="text-sm text-indigo-300/80">Placement Rate</p>
          <p className="text-3xl font-bold text-indigo-100">{formatPercentage(data.summary.placementRate)}</p>
        </motion.div>
      </div>

      {/* Top Employers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Top Hiring Employers</h3>
        <div className="space-y-3">
          {data.topEmployers.map((employer, index) => (
            <div key={employer._id} className="flex items-center gap-4 p-4 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg">#{index + 1}</div>
              <div className="flex-1">
                <p className="font-semibold text-indigo-100">{employer.name}</p>
                <p className="text-sm text-indigo-300/70">{formatNumber(employer.placements)} placements</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Placements by Role */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Top Job Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.placementsByRole.map((role) => (
            <div key={role._id} className="p-4 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-xl">
              <p className="font-semibold text-indigo-100 capitalize">{role._id}</p>
              <p className="text-2xl font-bold text-orange-400 mt-1">{formatNumber(role.count)}</p>
              <p className="text-xs text-indigo-300/60 mt-1">{formatPercentage((role.count / data.summary.placedStudents) * 100)} of placements</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
