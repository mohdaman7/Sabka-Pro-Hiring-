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
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "rgba(128,55,145,0.12)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "rgba(184,123,209,0.08)",
            animation: "float 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "rgba(240,194,238,0.05)",
            animation: "float 12s ease-in-out infinite reverse",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.05),_transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(184,123,209,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,123,209,0.5) 1px, transparent 1px)`,
          }}
        />
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl border border-white/15"
                style={{
                  background: `linear-gradient(135deg, ${activeTabData.color.split(" ")[1]}, ${activeTabData.color.split(" ")[3]})`,
                }}
              >
                <activeTabData.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4rem] text-white/60">
                  CRM Intelligence Suite
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-white/65 mt-1">
                  {activeTabData.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all duration-300 ${
                showFilters
                  ? "border-white/35 bg-white/20 text-white"
                  : "border-white/15 bg-white/10 text-white/80 hover:border-white/25 hover:bg-white/15"
              }`}
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/10 text-white/80 hover:border-white/25 hover:bg-white/15 transition"
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
            className="mb-6 p-6 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate || ""}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate || ""}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Staff Member
                </label>
                <select
                  value={filters.staffId || ""}
                  onChange={(e) => setFilters({ ...filters, staffId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/10 text-white focus:outline-none focus:border-white/40"
                >
                  <option value="" className="text-gray-900">All Staff</option>
                  {/* TODO: Populate with staff list */}
                </select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-white/60">
                Tip: Combine filters with tab selection to generate precise exports.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/10 text-white/80 hover:border-white/25 hover:bg-white/15 transition"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/25 bg-white/20 text-white hover:bg-white/30 transition"
                >
                  Apply & Hide
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs Navigation - Premium UI */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-3 min-w-max p-2 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
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
                className={`relative group px-5 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 min-w-fit ${
                  isActive
                    ? "bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/40 shadow-2xl scale-105 text-white"
                    : "bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white/70 hover:text-white hover:scale-102"
                }`}
              >
                {/* Active indicator glow */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-xl opacity-50 blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${tab.color.split(" ")[1]}, ${tab.color.split(" ")[3]})`,
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon container */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? "scale-110 shadow-lg" : "group-hover:scale-105"
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${tab.color.split(" ")[1]}, ${tab.color.split(" ")[3]})`
                      : "rgba(255,255,255,0.1)",
                    boxShadow: isActive ? `0 8px 20px ${tab.color.split(" ")[1]}40` : "none",
                  }}
                >
                  <Icon
                    className={`w-5 h-5 transition-all ${
                      isActive ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}
                  />
                </div>

                {/* Text content */}
                <div className="text-left relative z-10">
                  <div
                    className={`text-sm font-bold transition-all ${
                      isActive ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {tab.name}
                  </div>
                  <div className={`text-xs transition-all hidden lg:block ${
                    isActive ? "text-white/80" : "text-white/50 group-hover:text-white/70"
                  }`}>
                    {tab.description}
                  </div>
                </div>

                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabLine"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${tab.color.split(" ")[1]}, ${tab.color.split(" ")[3]})`,
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
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
    </div>
  );
}
