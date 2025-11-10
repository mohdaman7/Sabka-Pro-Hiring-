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
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
      change: "+12.5%",
      trend: "up",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Conversion Rate",
      value: formatPercentage(data.kpis.conversionRate),
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(data.kpis.totalRevenue),
      change: "+18.3%",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Placement Rate",
      value: formatPercentage(data.kpis.placementRate),
      change: "+8.1%",
      trend: "up",
      icon: Users,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Active Jobs",
      value: formatNumber(data.kpis.activeJobs),
      change: "+3",
      trend: "up",
      icon: Briefcase,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
    },
    {
      title: "Total Employers",
      value: formatNumber(data.kpis.totalEmployers),
      change: "+7",
      trend: "up",
      icon: Briefcase,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Scheduled Interviews",
      value: formatNumber(data.kpis.scheduledInterviews),
      change: "+15",
      trend: "up",
      icon: Calendar,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
    },
    {
      title: "Active Courses",
      value: formatNumber(data.kpis.activeCourses),
      change: "+2",
      trend: "up",
      icon: GraduationCap,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
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
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-900/30 p-6 rounded-xl border-2 border-indigo-500/20">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group"
            >
              <div className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 hover:border-indigo-500/50 hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/30 flex items-center justify-center mb-4 border-2 border-indigo-500/40">
                  <Icon className="w-6 h-6 text-indigo-300" />
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold mb-2 w-fit ${
                    card.trend === "up"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  }`}
                >
                  {card.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {card.change}
                </div>
                <h3 className="text-sm font-medium text-indigo-300/80 mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-indigo-100">{card.value}</p>
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
          className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm"
        >
          <h3 className="text-lg font-bold text-indigo-100 mb-4">
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
          className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm"
        >
          <h3 className="text-lg font-bold text-indigo-100 mb-4">
            Revenue Trend (Last 6 Months)
          </h3>
          <div className="h-64">
            <Bar data={revenueChartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-600/20 rounded-2xl p-6 shadow-lg border-2 border-indigo-500/30 backdrop-blur-sm"
      >
        <h3 className="text-lg font-bold text-indigo-100 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-500/20 border-2 border-blue-500/30 rounded-xl">
            <p className="text-2xl font-bold text-blue-300">
              {formatNumber(data.kpis.totalStudents)}
            </p>
            <p className="text-sm text-blue-300/70 mt-1 font-medium">Total Students</p>
          </div>
          <div className="text-center p-4 bg-emerald-500/20 border-2 border-emerald-500/30 rounded-xl">
            <p className="text-2xl font-bold text-emerald-300">
              {formatNumber(data.kpis.placedStudents)}
            </p>
            <p className="text-sm text-emerald-300/70 mt-1 font-medium">Placed Students</p>
          </div>
          <div className="text-center p-4 bg-purple-500/20 border-2 border-purple-500/30 rounded-xl">
            <p className="text-2xl font-bold text-purple-300">
              {formatPercentage(data.kpis.placementRate)}
            </p>
            <p className="text-sm text-purple-300/70 mt-1 font-medium">Placement Rate</p>
          </div>
          <div className="text-center p-4 bg-orange-500/20 border-2 border-orange-500/30 rounded-xl">
            <p className="text-2xl font-bold text-orange-300">
              {formatNumber(data.kpis.activeJobs)}
            </p>
            <p className="text-sm text-orange-300/70 mt-1 font-medium">Active Jobs</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
