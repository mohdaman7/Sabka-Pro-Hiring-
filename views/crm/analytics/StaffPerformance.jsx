"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, DollarSign, Award, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
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
            <Users className="absolute inset-0 m-auto w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/70 font-semibold text-lg">Loading Staff Performance...</p>
          <p className="text-white/50 text-sm mt-2">Fetching team metrics</p>
        </motion.div>
      </div>
    );
  }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          {
            label: "Total Staff",
            value: formatNumber(data?.summary?.totalStaff || 0),
            icon: Users,
            color: "from-indigo-500 to-purple-500",
            bgColor: "bg-indigo-500/10",
            iconColor: "text-indigo-400",
            trend: { value: "5.2", isPositive: true },
          },
          {
            label: "Avg Conversion Rate",
            value: formatPercentage(data?.summary?.avgConversionRate || 0),
            icon: TrendingUp,
            color: "from-emerald-500 to-green-500",
            bgColor: "bg-emerald-500/10",
            iconColor: "text-emerald-400",
            trend: { value: "12.8", isPositive: true },
          },
          {
            label: "Total Revenue",
            value: formatCurrency(data?.summary?.totalRevenue || 0),
            icon: DollarSign,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500/10",
            iconColor: "text-purple-400",
            trend: { value: "18.3", isPositive: true },
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
