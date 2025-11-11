"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Award, Clock, Target, CheckCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
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
            <TrendingUp className="absolute inset-0 m-auto w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/70 font-semibold text-lg">Loading Lead Conversion...</p>
          <p className="text-white/50 text-sm mt-2">Analyzing funnel data</p>
        </motion.div>
      </div>
    );
  }

  if (!data) return <div className="text-center py-12"><p className="text-gray-500">No data available</p></div>;

  const stats = [
    {
      label: "Total Leads",
      value: formatNumber(data.funnelData[0]?.count || 0),
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
      trend: { value: "15.3", isPositive: true },
    },
    {
      label: "Converted Leads",
      value: formatNumber(data.funnelData[data.funnelData.length - 1]?.count || 0),
      icon: CheckCircle,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      trend: { value: "12.8", isPositive: true },
    },
    {
      label: "Conversion Rate",
      value: formatPercentage(
        data.funnelData.length > 0
          ? (data.funnelData[data.funnelData.length - 1]?.count / data.funnelData[0]?.count) * 100
          : 0
      ),
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
      trend: { value: "8.5", isPositive: true },
    },
    {
      label: "Avg Conversion Time",
      value: `${data.avgConversionTime} days`,
      icon: Clock,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
      trend: { value: "5.2", isPositive: false },
    },
  ];

  return (
    <div className="space-y-6 text-white">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
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

      {/* Funnel Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            Conversion Funnel
          </h3>
          <div className="text-sm text-white/60">
            <span className="font-semibold">Overall Rate:</span>{" "}
            <span className="text-emerald-400 font-bold">
              {formatPercentage(
                data.funnelData.length > 0
                  ? (data.funnelData[data.funnelData.length - 1]?.count / data.funnelData[0]?.count) * 100
                  : 0
              )}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          {data.funnelData.map((stage, idx) => {
            const percentage = Math.min(100, Math.max(0, (stage.count / (data.funnelData[0]?.count || 1)) * 100));
            return (
              <motion.div
                key={stage._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="relative group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{idx + 1}</span>
                    </div>
                    <span className="text-sm font-semibold text-white capitalize">{stage._id}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-white/60">{formatNumber(stage.count)} leads</span>
                    <span className="text-sm font-bold text-white">{percentage.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="relative w-full h-10 bg-white/5 rounded-xl overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-xl relative overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </motion.div>

                  {/* Percentage label inside bar */}
                  {percentage > 15 && (
                    <div className="absolute inset-0 flex items-center px-4">
                      <span className="text-sm font-bold text-white drop-shadow-lg">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Conversion by Source */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          Conversion by Source
        </h3>
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          Top Performers
        </h3>
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

// Add shimmer animation styles
const styles = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;
