"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Award, Clock } from "lucide-react";
import { getLeadConversionAnalytics, formatPercentage, formatNumber } from "@/services/analyticsService";
import { Funnel } from "react-chartjs-2";

export default function LeadConversionAnalytics({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getLeadConversionAnalytics(filters);
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  }

  if (!data) return <div className="text-center py-12"><p className="text-gray-500">No data available</p></div>;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Conversion Time</p>
              <p className="text-2xl font-bold text-gray-900">{data.avgConversionTime} days</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Funnel Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Conversion Funnel</h3>
        <div className="space-y-3">
          {data.funnelData.map((stage, index) => (
            <div key={stage._id} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 capitalize">{stage._id}</span>
                <span className="text-sm font-bold text-gray-900">{formatNumber(stage.count)}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(stage.count / data.funnelData[0]?.count) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Conversion by Source */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Conversion by Source</h3>
        <div className="space-y-4">
          {data.conversionBySource.map((source) => (
            <div key={source._id} className="flex items-center justify-between p-4 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-xl">
              <div>
                <p className="font-semibold text-indigo-100 capitalize">{source.source || "Unknown"}</p>
                <p className="text-sm text-indigo-300/70">{formatNumber(source.total)} leads</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-400">{formatPercentage(source.conversionRate)}</p>
                <p className="text-xs text-indigo-300/60">{formatNumber(source.converted)} converted</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Staff Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Top Performers</h3>
        <div className="space-y-3">
          {data.staffPerformance.slice(0, 5).map((staff, index) => (
            <div key={staff.staffId} className="flex items-center gap-4 p-4 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                #{index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-indigo-100">Staff {staff.staffId}</p>
                <p className="text-sm text-indigo-300/70">{formatNumber(staff.totalLeads)} leads</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-400">{formatPercentage(staff.conversionRate)}</p>
                <p className="text-xs text-indigo-300/60">{formatNumber(staff.converted)} converted</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
