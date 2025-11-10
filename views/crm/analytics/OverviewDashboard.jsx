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
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${card.color.split(" ")[1]}, ${card.color.split(" ")[3]})`,
                }}
              />
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bgColor}`}
                  >
                    <Icon className="w-6 h-6"
                      style={{
                        color: card.color.split(" ")[1].replace("from-", "").replace("-500", ""),
                      }}
                    />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                      card.trend === "up"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {card.trend === "up" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {card.change}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
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
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
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
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">
              {formatNumber(data.kpis.totalStudents)}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total Students</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-2xl font-bold text-green-600">
              {formatNumber(data.kpis.placedStudents)}
            </p>
            <p className="text-sm text-gray-600 mt-1">Placed Students</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-2xl font-bold text-purple-600">
              {formatNumber(data.kpis.totalApplications)}
            </p>
            <p className="text-sm text-gray-600 mt-1">Applications</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <p className="text-2xl font-bold text-orange-600">
              {formatNumber(data.kpis.completedInterviews)}
            </p>
            <p className="text-sm text-gray-600 mt-1">Completed Interviews</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
