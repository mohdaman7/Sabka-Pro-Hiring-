"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, DollarSign, Award, Users } from "lucide-react";
import { getStaffPerformance, formatPercentage, formatNumber, formatCurrency } from "@/services/analyticsService";

export default function StaffPerformance({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getStaffPerformance(filters);
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  if (!data || !data.staffPerformance || !data.staffPerformance.length) return <div className="text-center py-12"><p className="text-white/70">No staff performance data available</p></div>;

  // Calculate totals
  const totals = data.staffPerformance.reduce((acc, staff) => ({
    totalLeads: acc.totalLeads + staff.totalLeads,
    converted: acc.converted + staff.converted,
    revenue: acc.revenue + staff.revenue,
  }), { totalLeads: 0, converted: 0, revenue: 0 });

  return (
    <div className="space-y-6 text-white">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/30 flex items-center justify-center mb-4 border-2 border-indigo-500/40">
            <Users className="w-6 h-6 text-indigo-300" />
          </div>
          <p className="text-sm text-white/70">Total Staff</p>
          <p className="text-3xl font-bold text-white">{formatNumber(data?.summary?.totalStaff || 0)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center mb-4 border-2 border-emerald-500/40">
            <TrendingUp className="w-6 h-6 text-emerald-300" />
          </div>
          <p className="text-sm text-white/70">Avg Conversion Rate</p>
          <p className="text-3xl font-bold text-white">{formatPercentage(data?.summary?.avgConversionRate || 0)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center mb-4 border-2 border-purple-500/40">
            <DollarSign className="w-6 h-6 text-purple-300" />
          </div>
          <p className="text-sm text-white/70">Total Revenue</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(data?.summary?.totalRevenue || 0)}</p>
        </motion.div>
      </div>

      {/* Top Performers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" />
          Top Performers
        </h3>
        <div className="space-y-3">
          {data.staffPerformance.slice(0, 5).map((staff, index) => {
            const isTop3 = index < 3;
            const rankColors = [
              "from-yellow-400 to-yellow-600",
              "from-gray-300 to-gray-500",
              "from-orange-400 to-orange-600"
            ];
            return (
              <div key={staff.staffId} className="relative group">
                <div className="flex items-center gap-4 p-5 bg-white/6 border border-white/12 rounded-xl hover:bg-white/10 hover:border-white/25 transition-all duration-300">
                  {/* Rank Badge */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                    isTop3 ? `bg-gradient-to-br ${rankColors[index]}` : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    #{index + 1}
                  </div>

                  {/* Staff Info */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-white/60 mb-1">Staff ID</p>
                      <p className="font-bold text-white">Staff {staff.staffId?.toString().slice(-4) || 'N/A'}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white text-lg">{staff.name}</p>
                      <p className="text-sm text-white/70">{formatNumber(staff.totalLeads)} leads</p>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 inline-block">
                        <p className="text-lg font-bold text-purple-300">{formatPercentage(staff.conversionRate)}</p>
                        <p className="text-xs text-white/60">{formatNumber(staff.converted)} converted</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 inline-block">
                        <p className="text-xs text-white/60 mb-1">Revenue</p>
                        <p className="font-bold text-emerald-300">{formatCurrency(staff.revenue)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Trophy for top 3 */}
                  {isTop3 && (
                    <div className="absolute -top-2 -right-2">
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold border border-yellow-500/30">
                        Top {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* All Staff Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-300" />
          All Staff Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-white/20">
                <th className="text-left py-3 px-4 text-sm font-semibold text-white/80">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-white/80">Staff ID</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-white/80">Leads</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-white/80">Converted</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-white/80">Lost</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-white/80">In Progress</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-white/80">Conv. Rate</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-white/80">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.staffPerformance.map((staff, index) => (
                <tr key={staff.staffId} className="border-b border-white/10 hover:bg-white/8 transition-colors">
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 text-white font-bold text-sm border border-purple-500/30">
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-white">Staff {staff.staffId?.toString().slice(-4) || 'N/A'}</td>
                  <td className="py-3 px-4 text-right font-semibold text-white">{formatNumber(staff.totalLeads)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold text-sm border border-emerald-500/30">
                      {formatNumber(staff.converted)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-red-500/20 text-red-300 font-semibold text-sm border border-red-500/30">
                      {formatNumber(staff.lost)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-semibold text-sm border border-blue-500/30">
                      {formatNumber(staff.inProgress)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-sm border border-purple-500/30">
                      {formatPercentage(staff.conversionRate)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-300">{formatCurrency(staff.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
