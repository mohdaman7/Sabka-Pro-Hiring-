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

  const resetFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      staffId: null,
    });
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
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl border border-indigo-400/40"
              style={{
                background: `linear-gradient(135deg, ${activeTabData.color.split(" ")[1]}, ${activeTabData.color.split(" ")[3]})`,
              }}
            >
              <activeTabData.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-indigo-300/70">
                CRM Intelligence Suite
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-indigo-100">
                Analytics Dashboard
              </h1>
              <p className="text-sm text-indigo-300/70 mt-1">
                {activeTabData.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-indigo-500/40 bg-indigo-500/20 text-indigo-100 hover:bg-indigo-500/30 hover:border-indigo-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-300 ${
                showFilters
                  ? "border-indigo-400 bg-indigo-500/40 text-indigo-100"
                  : "border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:border-indigo-400 hover:bg-indigo-500/20"
              }`}
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:border-indigo-400 hover:bg-indigo-500/20 transition"
            >
              <Download className="w-4 h-4" />
              Export Center
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-6 p-6 rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-indigo-200 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate || ""}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-indigo-500/30 bg-indigo-500/10 text-indigo-100 placeholder-indigo-300/40 focus:outline-none focus:border-indigo-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-indigo-200 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate || ""}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-indigo-500/30 bg-indigo-500/10 text-indigo-100 placeholder-indigo-300/40 focus:outline-none focus:border-indigo-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-indigo-200 mb-2">
                  Staff Member
                </label>
                <select
                  value={filters.staffId || ""}
                  onChange={(e) => setFilters({ ...filters, staffId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-indigo-500/30 bg-indigo-500/10 text-indigo-100 focus:outline-none focus:border-indigo-300"
                >
                  <option value="" className="text-gray-900">All Staff</option>
                  {/* TODO: Populate with staff list */}
                </select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-indigo-300/70">
                Tip: Combine filters with tab selection to generate precise exports.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:border-indigo-400 hover:bg-indigo-500/20 transition"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-indigo-400 bg-indigo-500/40 text-indigo-100 hover:bg-indigo-500/50 transition"
                >
                  Apply & Hide
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    ? "bg-indigo-600/40 border-2 border-indigo-500/50 shadow-lg scale-105 text-indigo-100"
                    : "bg-indigo-500/10 border-2 border-indigo-500/20 hover:border-indigo-500/40 text-indigo-200"
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
                      : "rgba(99, 102, 241, 0.1)",
                  }}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-indigo-300"
                    }`}
                  />
                </div>

                <div className="text-left">
                  <div
                    className={`text-sm ${
                      isActive ? "text-indigo-100" : "text-indigo-200"
                    }`}
                  >
                    {tab.name}
                  </div>
                  <div className="text-xs text-indigo-300/60 hidden lg:block">
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
