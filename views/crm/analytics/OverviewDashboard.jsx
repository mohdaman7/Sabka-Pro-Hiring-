"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Briefcase,
  Target,
  Calendar,
  CheckCircle,
  GraduationCap,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from "lucide-react";
import { getOverviewStats, formatCurrency, formatNumber, formatPercentage } from "@/services/analyticsService";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function OverviewDashboard({ filters, isRefreshing }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filters, isRefreshing]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getOverviewStats(filters);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching overview stats:", error);
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
            <BarChart3 className="absolute inset-0 m-auto w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/70 font-semibold text-lg">Loading Overview Dashboard...</p>
          <p className="text-white/50 text-sm mt-2">Fetching key metrics</p>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const kpiCards = [
    {
      title: "Total Leads",
      value: formatNumber(data.kpis.totalLeads),
      change: "12.5",
      trend: "up",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Conversion Rate",
      value: formatPercentage(data.kpis.conversionRate),
      change: "5.2",
      trend: "up",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(data.kpis.totalRevenue),
      change: "18.3",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Placement Rate",
      value: formatPercentage(data.kpis.placementRate),
      change: "8.1",
      trend: "up",
      icon: Users,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      title: "Active Jobs",
      value: formatNumber(data.kpis.activeJobs),
      change: "15.2",
      trend: "up",
      icon: Briefcase,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-500/10",
      iconColor: "text-rose-400",
    },
    {
      title: "Total Employers",
      value: formatNumber(data.kpis.totalEmployers),
      change: "9.7",
      trend: "up",
      icon: Briefcase,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      iconColor: "text-indigo-400",
    },
    {
      title: "Scheduled Interviews",
      value: formatNumber(data.kpis.scheduledInterviews),
      change: "22.4",
      trend: "up",
      icon: Calendar,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      title: "Active Courses",
      value: formatNumber(data.kpis.activeCourses),
      change: "6.8",
      trend: "up",
      icon: GraduationCap,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
  ];

  // Chart data
  const leadsChartData = {
    labels: data.trends.monthlyLeads.map((item) => item._id),
    datasets: [
      {
        label: "Leads",
        data: data.trends.monthlyLeads.map((item) => item.count),
        borderColor: "rgb(147, 51, 234)",
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const revenueChartData = {
    labels: data.trends.monthlyRevenue.map((item) => item._id),
    datasets: [
      {
        label: "Revenue",
        data: data.trends.monthlyRevenue.map((item) => item.total),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        borderRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-6 text-white">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative group cursor-pointer"
            >
              {/* Gradient Glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 bg-gradient-to-br ${card.color}`} />
              
              <div className="relative bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300">
                {/* Icon and Trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                      card.trend === "up"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {card.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {card.change}%
                  </div>
                </div>
                
                {/* Value */}
                <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                <div className="text-sm font-medium text-white/60">{card.title}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md"
        >
          <h3 className="text-lg font-bold text-white mb-4">
            Leads Trend (Last 6 Months)
          </h3>
          <div className="h-64">
            <Line data={leadsChartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md"
        >
          <h3 className="text-lg font-bold text-white mb-4">
            Revenue Trend (Last 6 Months)
          </h3>
          <div className="h-64">
            <Bar data={revenueChartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Quick Stats with Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/8 rounded-2xl p-6 border border-white/15 shadow-xl backdrop-blur-md"
      >
        <h3 className="text-lg font-bold text-white mb-6">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Students */}
          <div className="p-5 rounded-xl border border-white/15 bg-white/6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-white/70">Total Students</p>
              <p className="text-2xl font-bold text-white">
                {formatNumber(data.kpis.totalStudents)}
              </p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full transition-all duration-1000"
                style={{
                  width: "100%",
                  background: "linear-gradient(90deg, rgba(59,130,246,0.8), rgba(147,51,234,0.8))"
                }}
              />
            </div>
            <p className="text-xs text-white/60 mt-2">Total enrolled students</p>
          </div>

          {/* Placed Students */}
          <div className="p-5 rounded-xl border border-white/15 bg-white/6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-white/70">Placed Students</p>
              <p className="text-2xl font-bold text-emerald-300">
                {formatNumber(data.kpis.placedStudents)}
              </p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(100, (data.kpis.placedStudents / data.kpis.totalStudents) * 100)}%`,
                  background: "linear-gradient(90deg, rgba(16,185,129,0.8), rgba(6,182,212,0.8))"
                }}
              />
            </div>
            <p className="text-xs text-white/60 mt-2">
              {formatPercentage((data.kpis.placedStudents / data.kpis.totalStudents) * 100)} of total
            </p>
          </div>

          {/* Placement Rate */}
          <div className="p-5 rounded-xl border border-white/15 bg-white/6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-white/70">Placement Rate</p>
              <p className="text-2xl font-bold text-purple-300">
                {formatPercentage(data.kpis.placementRate)}
              </p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full transition-all duration-1000"
                style={{
                  width: `${data.kpis.placementRate}%`,
                  background: "linear-gradient(90deg, rgba(168,85,247,0.8), rgba(236,72,153,0.8))"
                }}
              />
            </div>
            <p className="text-xs text-white/60 mt-2">Success rate target: 80%</p>
          </div>

          {/* Active Jobs */}
          <div className="p-5 rounded-xl border border-white/15 bg-white/6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-white/70">Active Jobs</p>
              <p className="text-2xl font-bold text-cyan-300">
                {formatNumber(data.kpis.activeJobs)}
              </p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(100, (data.kpis.activeJobs / 50) * 100)}%`,
                  background: "linear-gradient(90deg, rgba(6,182,212,0.8), rgba(59,130,246,0.8))"
                }}
              />
            </div>
            <p className="text-xs text-white/60 mt-2">Available opportunities</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
