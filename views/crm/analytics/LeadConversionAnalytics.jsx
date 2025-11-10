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
    <div className="space-y-6 text-white">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/20 shadow-inner"
              style={{ background: "linear-gradient(135deg, rgba(128,55,145,0.85), rgba(184,123,209,0.65))" }}
            >
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/70">Avg Conversion Time</p>
              <p className="text-2xl font-bold text-white">{data.avgConversionTime} days</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Funnel Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Conversion Funnel</h3>
        <div className="space-y-4">
          {data.funnelData.map((stage) => {
            const percentage = Math.min(100, Math.max(0, (stage.count / (data.funnelData[0]?.count || 1)) * 100));
            return (
              <div key={stage._id} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white/70 capitalize">{stage._id}</span>
                  <span className="text-sm font-bold text-white">{formatNumber(stage.count)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      background: "linear-gradient(135deg, rgba(128,55,145,0.85), rgba(236,72,153,0.7))",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Conversion by Source */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Conversion by Source</h3>
        <div className="space-y-4">
          {data.conversionBySource.map((source) => (
            <div key={source._id} className="flex items-center justify-between p-4 bg-white/6 border border-white/12 rounded-xl">
              <div>
                <p className="font-semibold text-white capitalize">{source.source || "Unknown"}</p>
                <p className="text-sm text-white/70">{formatNumber(source.total)} leads</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-300">{formatPercentage(source.conversionRate)}</p>
                <p className="text-xs text-white/60">{formatNumber(source.converted)} converted</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Staff Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Top Performers</h3>
        <div className="space-y-3">
          {data.staffPerformance.slice(0, 5).map((staff, index) => (
            <div key={staff.staffId} className="flex items-center gap-4 p-4 bg-white/6 border border-white/12 rounded-xl">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.85), rgba(244,114,182,0.7))" }}
              >
                #{index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Staff {staff.staffId}</p>
                <p className="text-sm text-white/70">{formatNumber(staff.totalLeads)} leads</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-300">{formatPercentage(staff.conversionRate)}</p>
                <p className="text-xs text-white/60">{formatNumber(staff.converted)} converted</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
