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
  XCircle,
  CheckCircle,
} from "lucide-react";

// Import all analytics modules
import OverviewDashboard from "./OverviewDashboard";
import LeadConversionAnalytics from "./LeadConversionAnalytics";
import RevenueReports from "./RevenueReports";
import PlacementAnalytics from "./PlacementAnalytics";
import EmployerEngagement from "./EmployerEngagement";
import CourseAnalytics from "./CourseAnalytics";
import StaffPerformance from "./StaffPerformance";
import ATSAnalytics from "./ATSAnalytics";
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
    id: "ats",
    name: "ATS Analytics",
    icon: Target,
    description: "Recruitment Insights",
    color: "from-fuchsia-500 to-purple-500",
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
      case "ats":
        return <ATSAnalytics {...commonProps} />;
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
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20"
                style={{
                  background: `linear-gradient(135deg, ${activeTabData.color.split(" ")[1]}, ${activeTabData.color.split(" ")[3]})`,
                }}
              >
                <activeTabData.icon className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <p className="text-xs uppercase tracking-[0.3rem] text-white/50 font-semibold mb-1">
                  CRM Intelligence Suite
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white bg-gradient-to-r from-white to-white/80 bg-clip-text">
                  {activeTabData.name}
                </h1>
                <p className="text-sm text-white/60 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {activeTabData.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 text-white hover:from-white/15 hover:to-white/10 hover:border-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="font-semibold">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                showFilters
                  ? "border-purple-400/50 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-white"
                  : "border-white/20 bg-gradient-to-br from-white/10 to-white/5 text-white/80 hover:from-white/15 hover:to-white/10 hover:border-white/30"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="font-semibold">{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-6 md:p-8 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Advanced Filters</h3>
                <p className="text-xs text-white/60">Refine your analytics data</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-white/90 mb-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate || ""}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300 font-medium"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-white/90 mb-2">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate || ""}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:border-pink-400/50 focus:bg-white/15 transition-all duration-300 font-medium"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-white/90 mb-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Staff Member
                </label>
                <select
                  value={filters.staffId || ""}
                  onChange={(e) => setFilters({ ...filters, staffId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300 font-medium appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.25rem',
                  }}
                >
                  <option value="" className="bg-slate-900 text-white">All Staff Members</option>
                  {/* TODO: Populate with staff list */}
                </select>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-medium">Tip: Combine filters for precise data analysis</span>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/20 bg-white/10 text-white/90 hover:border-white/30 hover:bg-white/15 transition-all duration-300 font-semibold shadow-lg"
                >
                  <XCircle className="w-4 h-4" />
                  Clear All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-purple-400/50 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300 font-semibold shadow-lg"
                >
                  <CheckCircle className="w-4 h-4" />
                  Apply Filters
                </motion.button>
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
