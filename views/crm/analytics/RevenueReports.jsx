"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CreditCard, AlertCircle } from "lucide-react";
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
    return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  }

  if (!data) return <div className="text-center py-12"><p className="text-gray-500">No data available</p></div>;

  const statusCards = [
    {
      title: "Completed",
      value: data.paymentStatus.totalCompleted || 0,
      icon: DollarSign,
      gradient: "linear-gradient(135deg, rgba(16,185,129,0.85), rgba(59,130,246,0.55))",
      accent: "#6ee7b7",
    },
    {
      title: "Pending",
      value: data.paymentStatus.totalPending || 0,
      icon: CreditCard,
      gradient: "linear-gradient(135deg, rgba(234,179,8,0.85), rgba(244,114,182,0.55))",
      accent: "#facc15",
    },
    {
      title: "Failed",
      value: data.paymentStatus.totalFailed || 0,
      icon: AlertCircle,
      gradient: "linear-gradient(135deg, rgba(248,113,113,0.85), rgba(139,92,246,0.55))",
      accent: "#fca5a5",
    },
  ];

  return (
    <div className="space-y-6 text-white">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/20 shadow-inner"
                  style={{ background: card.gradient }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/70">{card.title}</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(card.value)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Revenue by Status</h3>
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Revenue by Type</h3>
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Top Revenue Sources</h3>
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
