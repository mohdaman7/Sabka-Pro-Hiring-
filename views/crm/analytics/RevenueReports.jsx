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
    { title: "Completed", value: data.paymentStatus.totalCompleted || 0, color: "green", icon: DollarSign },
    { title: "Pending", value: data.paymentStatus.totalPending || 0, color: "yellow", icon: CreditCard },
    { title: "Failed", value: data.paymentStatus.totalFailed || 0, color: "red", icon: AlertCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-${card.color}-50 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${card.color}-600`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(card.value)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h3>
        <div className="space-y-4">
          {data.revenueTrend.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">{item._id}</p>
                <p className="text-sm text-gray-600">{formatNumber(item.transactions)} transactions</p>
              </div>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(item.revenue)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Revenue by Type */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.revenueByType.map((type) => (
            <div key={type._id} className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 capitalize">{type._id || "Other"}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(type.total)}</p>
              <p className="text-xs text-gray-500 mt-1">{formatNumber(type.count)} transactions</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Sources */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Revenue Sources</h3>
        <div className="space-y-3">
          {data.topSources.map((source, index) => (
            <div key={source._id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                #{index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 capitalize">{source._id || "Direct"}</p>
                <p className="text-sm text-gray-600">{formatNumber(source.count)} transactions</p>
              </div>
              <p className="text-lg font-bold text-purple-600">{formatCurrency(source.revenue)}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
