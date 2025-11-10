"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  GraduationCap,
  Target,
  FileText,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

// Import all analytics modules
import OverviewDashboard from "./OverviewDashboard";
import LeadConversionAnalytics from "./LeadConversionAnalytics";
import RevenueReports from "./RevenueReports";
import PlacementAnalytics from "./PlacementAnalytics";
import EmployerEngagement from "./EmployerEngagement";
import CourseAnalytics from "./CourseAnalytics";
import StaffPerformance from "./StaffPerformance";
import ReportsExport from "./ReportsExport";

const tabs = [
  {
    id: "overview",
    name: "Overview",
    icon: BarChart3,
    description: "KPIs & Key Metrics",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "leads",
    name: "Lead Conversion",
    icon: TrendingUp,
    description: "Funnel & Performance",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "revenue",
    name: "Revenue Reports",
    icon: DollarSign,
    description: "Income & Payments",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "placements",
    name: "Placements",
    icon: Users,
    description: "Student Success",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "employers",
    name: "Employer Engagement",
    icon: Briefcase,
    description: "Activity & Jobs",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "courses",
    name: "Training Analytics",
    icon: GraduationCap,
    description: "Course Performance",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "staff",
    name: "Staff Performance",
    icon: Target,
    description: "Team Metrics",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "reports",
    name: "Export Reports",
    icon: FileText,
    description: "Download Data",
    color: "from-violet-500 to-purple-500",
  },
];

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("last30Days");
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Global filters
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    staffId: null,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Trigger refresh in child components
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const renderActiveModule = () => {
    const commonProps = { filters, isRefreshing };

    switch (activeTab) {
      case "overview":
        return <OverviewDashboard {...commonProps} />;
      case "leads":
        return <LeadConversionAnalytics {...commonProps} />;
      case "revenue":
        return <RevenueReports {...commonProps} />;
      case "placements":
        return <PlacementAnalytics {...commonProps} />;
      case "employers":
        return <EmployerEngagement {...commonProps} />;
      case "courses":
        return <CourseAnalytics {...commonProps} />;
      case "staff":
        return <StaffPerformance {...commonProps} />;
      case "reports":
        return <ReportsExport {...commonProps} />;
      default:
        return <OverviewDashboard {...commonProps} />;
    }
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${activeTabData.color.split(" ")[1]}, ${activeTabData.color.split(" ")[3]})`,
                }}
              >
                <activeTabData.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {activeTabData.description}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 font-medium transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 font-medium transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-white rounded-xl border-2 border-gray-200 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.startDate || ""}
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.endDate || ""}
                    onChange={(e) =>
                      setFilters({ ...filters, endDate: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Staff Member
                  </label>
                  <select
                    value={filters.staffId || ""}
                    onChange={(e) =>
                      setFilters({ ...filters, staffId: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="">All Staff</option>
                    {/* Add staff options dynamically */}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 min-w-fit ${
                  isActive
                    ? "bg-white shadow-lg scale-105"
                    : "bg-white/50 hover:bg-white hover:shadow-md"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl border-2"
                    style={{
                      borderImage: `linear-gradient(135deg, ${tab.color.split(" ")[1]}, ${tab.color.split(" ")[3]}) 1`,
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div
                  className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "scale-110" : ""
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${tab.color.split(" ")[1]}, ${tab.color.split(" ")[3]})`
                      : "rgba(156, 163, 175, 0.1)",
                  }}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-gray-500"
                    }`}
                  />
                </div>

                <div className="text-left">
                  <div
                    className={`text-sm ${
                      isActive ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    {tab.name}
                  </div>
                  <div className="text-xs text-gray-400 hidden lg:block">
                    {tab.description}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active Module Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveModule()}
        </motion.div>
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
