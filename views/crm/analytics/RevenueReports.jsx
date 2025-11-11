"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CreditCard, AlertCircle, ArrowUpRight, ArrowDownRight, BarChart3, Wallet, CheckCircle } from "lucide-react";
import { getRevenueReports, formatCurrency, formatNumber } from "@/services/analyticsService";
import { Line, Doughnut } from "react-chartjs-2";

export default function RevenueReports({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getRevenueReports(filters);
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
            <DollarSign className="absolute inset-0 m-auto w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/70 font-semibold text-lg">Loading Revenue Reports...</p>
          <p className="text-white/50 text-sm mt-2">Fetching financial data</p>
        </motion.div>
      </div>
    );
  }

  if (!data) return <div className="text-center py-12"><p className="text-gray-500">No data available</p></div>;

  const totalRevenue = (data.paymentStatus.totalCompleted || 0) + (data.paymentStatus.totalPending || 0);
  
  const statusCards = [
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      trend: { value: "18.3", isPositive: true },
    },
    {
      label: "Completed",
      value: formatCurrency(data.paymentStatus.totalCompleted || 0),
      icon: CheckCircle,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
      trend: { value: "12.5", isPositive: true },
    },
    {
      label: "Pending",
      value: formatCurrency(data.paymentStatus.totalPending || 0),
      icon: CreditCard,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      iconColor: "text-amber-400",
      trend: { value: "8.7", isPositive: false },
    },
    {
      label: "Failed",
      value: formatCurrency(data.paymentStatus.totalFailed || 0),
      icon: AlertCircle,
      color: "from-rose-500 to-red-500",
      bgColor: "bg-rose-500/10",
      iconColor: "text-rose-400",
      trend: { value: "3.2", isPositive: false },
    },
  ];

  return (
    <div className="space-y-6 text-white">
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statusCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative group cursor-pointer rounded-2xl p-5 md:p-6 border transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20 backdrop-blur-sm"
            >
              {/* Gradient Glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 bg-gradient-to-br ${card.color}`} />

              {/* Content */}
              <div className="relative">
                {/* Icon and Trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  {card.trend && (
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                        card.trend.isPositive
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {card.trend.isPositive ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {card.trend.value}%
                    </div>
                  )}
                </div>

                {/* Value */}
                <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                <div className="text-sm font-medium text-white/60">{card.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Trend */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          Revenue by Status
        </h3>
        <div className="space-y-4">
          {data.revenueByStatus.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 bg-white/6 border border-white/12 rounded-xl">
              <div>
                <p className="font-semibold text-white capitalize">{item._id}</p>
                <p className="text-sm text-white/70">{formatNumber(item.transactions)} transactions</p>
              </div>
              <p className="text-xl font-bold text-emerald-300">{formatCurrency(item.revenue)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Revenue by Type */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          Revenue by Type
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.revenueByType.map((type) => (
            <div key={type._id} className="p-4 bg-white/6 border border-white/12 rounded-xl">
              <p className="text-sm text-white/70 capitalize">{type._id || "Other"}</p>
              <p className="text-2xl font-bold text-white mt-1">{formatCurrency(type.total)}</p>
              <p className="text-xs text-white/60 mt-1">{formatNumber(type.count)} transactions</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Sources */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          Top Revenue Sources
        </h3>
        <div className="space-y-3">
          {data.topSources.map((source, index) => (
            <div key={source._id} className="flex items-center gap-4 p-4 bg-white/6 border border-white/12 rounded-xl">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.85), rgba(59,130,246,0.55))" }}
              >
                #{index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white capitalize">{source._id}</p>
                <p className="text-sm text-white/70">{formatNumber(source.count)} transactions</p>
              </div>
              <p className="text-lg font-bold text-emerald-300">{formatCurrency(source.total)}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
