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
  if (!data || !data.staffPerformance.length) return <div className="text-center py-12"><p className="text-gray-500">No staff performance data available</p></div>;

  // Calculate totals
  const totals = data.staffPerformance.reduce((acc, staff) => ({
    totalLeads: acc.totalLeads + staff.totalLeads,
    converted: acc.converted + staff.converted,
    revenue: acc.revenue + staff.revenue,
  }), { totalLeads: 0, converted: 0, revenue: 0 });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">Total Leads Handled</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(totals.totalLeads)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Total Conversions</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(totals.converted)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totals.revenue)}</p>
        </motion.div>
      </div>

      {/* Top Performers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          Top Performers
        </h3>
        <div className="space-y-3">
          {data.staffPerformance.slice(0, 5).map((staff, index) => (
            <div key={staff.staffId} className="relative group">
              <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl border-2 border-transparent hover:border-purple-200 transition-all duration-300">
                {/* Rank Badge */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                  index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                  'bg-gradient-to-r from-indigo-500 to-purple-500'
                }`}>
                  #{index + 1}
                </div>

                {/* Staff Info */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Staff ID</p>
                    <p className="font-bold text-gray-900">Staff {staff.staffId?.toString().slice(-4) || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Leads Handled</p>
                    <p className="font-bold text-gray-900">{formatNumber(staff.totalLeads)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
                    <p className="font-bold text-purple-600">{formatPercentage(staff.conversionRate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Revenue Generated</p>
                    <p className="font-bold text-emerald-600">{formatCurrency(staff.revenue)}</p>
                  </div>
                </div>

                {/* Trophy for top 3 */}
                {index < 3 && (
                  <div className="absolute -top-2 -right-2">
                    <Award className={`w-6 h-6 ${
                      index === 0 ? 'text-yellow-500' :
                      index === 1 ? 'text-gray-400' :
                      'text-orange-500'
                    }`} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* All Staff Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          All Staff Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Staff ID</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Leads</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Converted</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Lost</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">In Progress</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Conv. Rate</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.staffPerformance.map((staff, index) => (
                <tr key={staff.staffId} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold text-sm">
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">Staff {staff.staffId?.toString().slice(-4) || 'N/A'}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatNumber(staff.totalLeads)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-green-50 text-green-600 font-semibold text-sm">
                      {formatNumber(staff.converted)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-red-50 text-red-600 font-semibold text-sm">
                      {formatNumber(staff.lost)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm">
                      {formatNumber(staff.inProgress)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-purple-50 text-purple-600 font-bold text-sm">
                      {formatPercentage(staff.conversionRate)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-600">{formatCurrency(staff.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
