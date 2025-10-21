"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Briefcase,
  Clock,
  ChevronRight,
  MoreVertical,
  UserPlus,
  Send,
  Trash2,
  X,
  AlertCircle,
  Sparkles,
  Target,
  FileText,
  RefreshCw,
} from "lucide-react";
import { adminService } from "@/services/adminService";

export default function CandidatesManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCandidates: 0,
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await adminService.getCandidates({
          status: "active",
          plan:
            plan ||
            (activeTab === "pro"
              ? "pro"
              : activeTab === "free"
              ? "free"
              : undefined),
          search: search || undefined,
          page: pagination.currentPage,
        });
        if (!mounted) return;
        const data = Array.isArray(res?.data) ? res.data : [];
        setUsers(data);
        if (res?.pagination) {
          setPagination(res.pagination);
        }
      } catch (e) {
        if (mounted) {
          setError(
            e?.response?.data?.message ||
              e?.message ||
              "Failed to load candidates"
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [activeTab, search, plan, pagination.currentPage]);

  const tabs = useMemo(() => {
    const total = pagination.totalCandidates;
    const pro = users.filter((u) => u.plan === "pro").length;
    const placed = 0;
    return [
      { id: "all", label: "All Candidates", count: total, icon: UserPlus },
      {
        id: "free",
        label: "Free Plan",
        count: users.filter((u) => u.plan === "free").length,
        icon: Briefcase,
      },
      { id: "pro", label: "Pro Plan", count: pro, icon: Star },
      { id: "placed", label: "Placed", count: placed, icon: Award },
    ];
  }, [users, pagination.totalCandidates]);

  const handleRefresh = () => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium Animated Background - Matching Dashboard */}
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_50%)]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(184,123,209,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(184,123,209,0.5) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 p-6 space-y-6 max-w-[1800px] mx-auto">
        {/* Premium Header Section */}
        <div className="relative overflow-hidden rounded-3xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-purple-700/90 to-blue-600/90 backdrop-blur-xl" />
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400"
              style={{
                mixBlendMode: "overlay",
                animation: "pulse 8s ease-in-out infinite",
              }}
            />
          </div>
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl text-white text-sm font-medium border border-white/30 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    Talent Management
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                  Candidates Management
                </h1>
                <p className="text-white/90 text-lg mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Managing{" "}
                  <span className="font-bold text-amber-300">
                    {pagination.totalCandidates} active candidates
                  </span>{" "}
                  with{" "}
                  <span className="font-bold text-emerald-300">
                    {users.filter((u) => u.plan === "pro").length} pro members
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="group/btn relative px-6 py-3 bg-white text-purple-700 rounded-xl font-semibold shadow-2xl shadow-white/20 transition-all hover:scale-105 hover:shadow-white/30 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-purple-50 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Download className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Export Data</span>
                  </button>
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-semibold border border-white/30 transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                    />
                    Refresh
                  </button>
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold border border-white/20 transition-all hover:scale-105 flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Bulk Actions
                  </button>
                </div>
              </div>

              {/* Stats Cards in Header */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="text-3xl font-black text-white mb-1">
                    {pagination.totalCandidates}
                  </div>
                  <div className="text-sm text-white/80">Total</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="text-3xl font-black text-amber-300 mb-1">
                    {users.filter((u) => u.plan === "pro").length}
                  </div>
                  <div className="text-sm text-white/80">Pro Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Tabs */}
        <div className="relative">
          <div className="flex gap-2  pb-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white/10 backdrop-blur-xl border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30"
                  }`}
                  style={{
                    transform:
                      activeTab === tab.id
                        ? "translateY(-2px)"
                        : "translateY(0)",
                  }}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/30"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        activeTab === tab.id ? "text-white" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="text-left">
                    <div
                      className={`text-sm font-bold ${
                        activeTab === tab.id ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {tab.label}
                    </div>
                    <div className="text-xs text-slate-400">
                      {tab.count} candidates
                    </div>
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-b-2xl" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Premium Filters Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by name, email, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 shadow-lg transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="px-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all shadow-lg cursor-pointer"
            >
              <option value="">All Plans</option>
              <option value="free">Free Plan</option>
              <option value="pro">Pro Plan</option>
            </select>
          </div>
        </div>

        {/* Results Count & Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-slate-300 text-sm">
            Showing <span className="font-bold text-white">{users.length}</span>{" "}
            of{" "}
            <span className="font-bold text-white">
              {pagination.totalCandidates}
            </span>{" "}
            candidates
          </div>
          {pagination.totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: prev.currentPage - 1,
                  }))
                }
                disabled={!pagination.hasPrev}
                className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-white text-sm">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: prev.currentPage + 1,
                  }))
                }
                disabled={!pagination.hasNext}
                className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-slate-300">Loading candidates...</p>
          </div>
        )}

        {/* Premium Candidates Grid */}
        {!loading && users.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((candidate) => (
              <div
                key={candidate._id}
                onMouseEnter={() => setHoveredCard(candidate._id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-500 cursor-pointer"
                style={{
                  transform:
                    hoveredCard === candidate._id
                      ? "translateY(-8px) scale(1.02)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    hoveredCard === candidate._id
                      ? "0 20px 60px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.2)"
                      : "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                  style={{ background: "rgba(168, 85, 247, 0.2)" }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <span className="text-white font-bold text-xl">
                            {(candidate.firstName || "?").charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">
                          {candidate.firstName} {candidate.lastName}
                        </h3>
                        <p className="text-sm text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Joined{" "}
                          {new Date(candidate.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {candidate.plan === "pro" && (
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-full">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-bold text-amber-300">
                            PRO
                          </span>
                        </div>
                      )}
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4 text-slate-300" />
                      </button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                      <Mail className="w-4 h-4 text-purple-400" />
                      <span className="truncate">{candidate.email}</span>
                    </div>
                    {candidate.city && (
                      <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="truncate">{candidate.city}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills - Fixed rendering for objects */}
                  {candidate.skills && candidate.skills.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 3).map((skill, idx) => {
                          // Handle both string and object skills
                          const skillName =
                            typeof skill === "object"
                              ? skill.name || skill.title || "Skill"
                              : skill;

                          return (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-purple-500/20 border border-purple-500/30"
                            >
                              {skillName}
                            </span>
                          );
                        })}
                        {candidate.skills.length > 3 && (
                          <span className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-300 bg-white/5">
                            +{candidate.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-black text-purple-400">
                        {candidate.profileCompletion}%
                      </div>
                      <div className="text-xs text-slate-400">Complete</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-black text-blue-400">
                        {candidate.appliedJobs || 0}
                      </div>
                      <div className="text-xs text-slate-400">Applied</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div
                        className={`text-2xl font-black ${
                          candidate.hasResume
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      >
                        {candidate.hasResume ? "✓" : "✗"}
                      </div>
                      <div className="text-xs text-slate-400">Resume</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">
                        Profile Strength
                      </span>
                      <span className="text-xs font-bold text-white">
                        {candidate.profileCompletion}%
                      </span>
                    </div>
                    <div className="relative w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${candidate.profileCompletion}%`,
                          background:
                            "linear-gradient(90deg, #a855f7, #6366f1)",
                        }}
                      >
                        <div
                          className="h-full w-full rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between text-xs mb-4 p-2 rounded-lg bg-white/5">
                    <span className="text-slate-400">Status</span>
                    <span
                      className={`px-3 py-1 rounded-full font-bold ${
                        candidate.status === "active"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-purple-500/30 hover:scale-105 flex items-center justify-center gap-2 group/btn">
                      <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      View Profile
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-all hover:scale-110">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-all hover:scale-110">
                      {candidate.hasResume ? (
                        <FileText className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Side Accent */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-purple-500 to-purple-700 rounded-r-full transition-all duration-300 group-hover:h-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No candidates found
            </h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearch("");
                setPlan("");
                setActiveTab("all");
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-semibold hover:scale-105 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

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
