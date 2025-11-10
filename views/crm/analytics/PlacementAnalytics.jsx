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
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Total Students</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(data.summary.totalStudents)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Placed Students</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(data.summary.placedStudents)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
            <Briefcase className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Placement Rate</p>
          <p className="text-3xl font-bold text-gray-900">{formatPercentage(data.summary.placementRate)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600">Avg Time</p>
          <p className="text-3xl font-bold text-gray-900">{data.summary.avgPlacementTime}d</p>
        </motion.div>
      </div>

      {/* Top Employers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Hiring Employers</h3>
        <div className="space-y-3">
          {data.topEmployers.map((employer, index) => (
            <div key={employer._id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">#{index + 1}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{employer.name}</p>
                <p className="text-sm text-gray-600">{formatNumber(employer.placements)} placements</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Placements by Role */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Job Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.placementsByRole.map((role) => (
            <div key={role._id} className="p-4 bg-purple-50 rounded-xl">
              <p className="font-semibold text-gray-900">{role._id}</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">{formatNumber(role.count)}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
