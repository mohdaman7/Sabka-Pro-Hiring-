"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Building2,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  Check,
  X,
  FileText,
  Crown,
  BadgeCheck,
  Sparkles,
  TrendingUp,
  Download,
  UserPlus,
  Send,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  RefreshCw,
  Award,
  Target,
  Clock,
  ChevronRight,
} from "lucide-react";
import { adminService } from "@/services/adminService";

export default function EmployersManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [employers, setEmployers] = useState([]);
  const [viewMode, setViewMode] = useState("employers");
  const [pendingLoading, setPendingLoading] = useState(false);
  const [pendingEmployers, setPendingEmployers] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await adminService.getUsers("active");
        if (!mounted) return;
        const data = Array.isArray(res?.data) ? res.data : [];
        const employerUsers = data.filter((u) => u.role === "employer");

        const enriched = await Promise.all(
          employerUsers.map(async (u) => {
            try {
              const details = await adminService.getUserById(u._id);
              const profile = details?.data?.profile || {};
              return {
                ...u,
                isVerified: Boolean(profile.isVerified),
                plan: profile.plan || "free",
                company: profile.company || {},
                contact: profile.contact || {},
                jobs: details?.data?.jobs || [],
              };
            } catch {
              return { ...u };
            }
          })
        );

        setEmployers(enriched);
      } catch (e) {
        setError(
          e?.response?.data?.message || e?.message || "Failed to load employers"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function refreshEmployers() {
    try {
      setLoading(true);
      const res = await adminService.getUsers("active");
      const data = Array.isArray(res?.data) ? res.data : [];
      const employerUsers = data.filter((u) => u.role === "employer");
      const enriched = await Promise.all(
        employerUsers.map(async (u) => {
          try {
            const details = await adminService.getUserById(u._id);
            const profile = details?.data?.profile || {};
            return {
              ...u,
              isVerified: Boolean(profile.isVerified),
              plan: profile.plan || "free",
              company: profile.company || {},
              contact: profile.contact || {},
              jobs: details?.data?.jobs || [],
            };
          } catch {
            return { ...u };
          }
        })
      );
      setEmployers(enriched);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Failed to refresh employers"
      );
    } finally {
      setLoading(false);
      setActionLoadingId("");
    }
  }

  const handleVerifyToggle = async (userId, current) => {
    try {
      setActionLoadingId(userId);
      await adminService.setEmployerVerification(userId, !current);
      await refreshEmployers();
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Failed to update verification"
      );
      setActionLoadingId("");
    }
  };

  const handlePlanChange = async (userId, nextPlan) => {
    try {
      setActionLoadingId(userId);
      await adminService.updateEmployerPlan(userId, nextPlan);
      await refreshEmployers();
    } catch (e) {
      setError(
        e?.response?.data?.message || e?.message || "Failed to update plan"
      );
      setActionLoadingId("");
    }
  };

  const loadPendingEmployers = async () => {
    try {
      setPendingLoading(true);
      setError("");
      const res = await adminService.getPendingUsers();
      const list = Array.isArray(res?.data) ? res.data : [];
      setPendingEmployers(list.filter((u) => u.role === "employer"));
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Failed to load pending employers"
      );
    } finally {
      setPendingLoading(false);
    }
  };

  useEffect(() => {
    if (viewMode === "approvals") {
      loadPendingEmployers();
    }
  }, [viewMode]);

  const openDetails = async (employer) => {
    try {
      setSelectedEmployer(null);
      setShowDetails(true);
      const res = await adminService.getUserById(employer._id);
      setSelectedEmployer(res?.data || { user: employer });
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Failed to load employer details"
      );
    }
  };

  const handleApprove = async (userId) => {
    try {
      setActionLoadingId(userId);
      await adminService.approveUser(userId, true);
      await loadPendingEmployers();
    } catch (e) {
      setError(
        e?.response?.data?.message || e?.message || "Failed to approve employer"
      );
    } finally {
      setActionLoadingId("");
    }
  };

  const handleReject = async (userId) => {
    try {
      const reason =
        typeof window !== "undefined"
          ? window.prompt("Enter rejection reason", "Insufficient information")
          : "Insufficient information";
      setActionLoadingId(userId);
      await adminService.rejectUser(userId, reason);
      await loadPendingEmployers();
    } catch (e) {
      setError(
        e?.response?.data?.message || e?.message || "Failed to reject employer"
      );
    } finally {
      setActionLoadingId("");
    }
  };

  const filteredEmployers = useMemo(() => {
    let filtered = employers;

    if (activeTab === "verified") {
      filtered = filtered.filter((e) => e.isVerified);
    } else if (activeTab === "pending") {
      filtered = filtered.filter((e) => !e.isVerified);
    } else if (activeTab === "premium") {
      filtered = filtered.filter((e) => e.plan === "pro");
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (e) =>
          e.company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.company?.industry
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          e.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [employers, activeTab, searchQuery]);

  const tabs = useMemo(() => {
    const total = employers.length;
    const verified = employers.filter((e) => e.isVerified).length;
    const premium = employers.filter((e) => e.plan === "pro").length;
    const pending = total - verified;
    return [
      { id: "all", label: "All Employers", count: total, icon: Building2 },
      { id: "verified", label: "Verified", count: verified, icon: BadgeCheck },
      { id: "pending", label: "Pending", count: pending, icon: Clock },
      { id: "premium", label: "Premium", count: premium, icon: Crown },
    ];
  }, [employers]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium Animated Background */}
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
                <div className="flex items-center gap-3 mb-3"></div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                  Employers Management
                </h1>
                <p className="text-white/90 text-lg mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Managing{" "}
                  <span className="font-bold text-amber-300">
                    {employers.length} employers
                  </span>{" "}
                  with{" "}
                  <span className="font-bold text-emerald-300">
                    {employers.filter((e) => e.isVerified).length} verified
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="group/btn relative px-6 py-3 bg-white text-purple-700 rounded-xl font-semibold shadow-2xl shadow-white/20 transition-all hover:scale-105 hover:shadow-white/30 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-purple-50 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Download className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Export Data</span>
                  </button>
                  <button
                    onClick={refreshEmployers}
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
                    {employers.length}
                  </div>
                  <div className="text-sm text-white/80">Total</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="text-3xl font-black text-emerald-300 mb-1">
                    {employers.filter((e) => e.isVerified).length}
                  </div>
                  <div className="text-sm text-white/80">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode("employers")}
            className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
              viewMode === "employers"
                ? "bg-white/10 backdrop-blur-xl border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
                : "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30"
            }`}
            style={{
              transform:
                viewMode === "employers" ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                viewMode === "employers"
                  ? "bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/30"
                  : "bg-white/5"
              }`}
            >
              <Building2
                className={`w-5 h-5 ${
                  viewMode === "employers" ? "text-white" : "text-slate-400"
                }`}
              />
            </div>
            <span
              className={`${
                viewMode === "employers" ? "text-white" : "text-slate-300"
              }`}
            >
              Employers
            </span>
            {viewMode === "employers" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-b-2xl" />
            )}
          </button>

          <button
            onClick={() => setViewMode("approvals")}
            className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
              viewMode === "approvals"
                ? "bg-white/10 backdrop-blur-xl border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
                : "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30"
            }`}
            style={{
              transform:
                viewMode === "approvals" ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                viewMode === "approvals"
                  ? "bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/30"
                  : "bg-white/5"
              }`}
            >
              <CheckCircle
                className={`w-5 h-5 ${
                  viewMode === "approvals" ? "text-white" : "text-slate-400"
                }`}
              />
            </div>
            <span
              className={`${
                viewMode === "approvals" ? "text-white" : "text-slate-300"
              }`}
            >
              Pending Approvals
            </span>
            {pendingEmployers.length > 0 && (
              <span className="px-2.5 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-bold border border-yellow-500/30">
                {pendingEmployers.length}
              </span>
            )}
            {viewMode === "approvals" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-b-2xl" />
            )}
          </button>
        </div>

        {/* Premium Filter Tabs */}
        {viewMode === "employers" && (
          <div className="relative">
            <div className="flex gap-2 pb-2 scrollbar-hide">
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
                        {tab.count} employers
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
        )}

        {/* Premium Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by company name, industry, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 shadow-lg transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
            <XCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Loading State */}
        {(loading || pendingLoading) && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-slate-300">Loading employers...</p>
          </div>
        )}

        {/* Results Count */}
        {viewMode === "employers" && !loading && (
          <div className="text-slate-300 text-sm">
            Showing{" "}
            <span className="font-bold text-white">
              {filteredEmployers.length}
            </span>{" "}
            of <span className="font-bold text-white">{employers.length}</span>{" "}
            employers
          </div>
        )}

        {/* Premium Employers Grid */}
        {viewMode === "employers" &&
          !loading &&
          filteredEmployers.length > 0 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEmployers.map((employer) => (
                <div
                  key={employer._id}
                  onMouseEnter={() => setHoveredCard(employer._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-500 cursor-pointer"
                  style={{
                    transform:
                      hoveredCard === employer._id
                        ? "translateY(-8px) scale(1.02)"
                        : "translateY(0) scale(1)",
                    boxShadow:
                      hoveredCard === employer._id
                        ? "0 20px 60px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.2)"
                        : "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                    style={{ background: "rgba(168, 85, 247, 0.2)" }}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <Building2 className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">
                            {employer.company?.name ||
                              `${employer.firstName} ${employer.lastName}`}
                          </h3>
                          <p className="text-sm text-slate-400 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {employer.email}
                          </p>
                        </div>
                      </div>

                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4 text-slate-300" />
                      </button>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      {employer.contact?.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                          <Phone className="w-4 h-4 text-blue-400" />
                          <span className="truncate">
                            {employer.contact.phone}
                          </span>
                        </div>
                      )}
                      {employer.company?.industry && (
                        <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                          <Briefcase className="w-4 h-4 text-emerald-400" />
                          <span className="truncate">
                            {employer.company.industry}
                          </span>
                        </div>
                      )}
                      {employer.company?.location && (
                        <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <span className="truncate">
                            {employer.company.location}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {employer.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/30">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-bold border border-yellow-500/30">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                      {employer.plan === "pro" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg text-xs font-bold text-amber-300">
                          <Crown className="w-3 h-3 fill-amber-400" />
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-2xl font-black text-purple-400">
                          {employer.jobs?.length || 0}
                        </div>
                        <div className="text-xs text-slate-400">Jobs</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-2xl font-black text-blue-400">
                          {employer.company?.size || "-"}
                        </div>
                        <div className="text-xs text-slate-400">Size</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div
                          className={`text-2xl font-black ${
                            employer.isVerified
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }`}
                        >
                          {employer.isVerified ? "✓" : "⏱"}
                        </div>
                        <div className="text-xs text-slate-400">Status</div>
                      </div>
                    </div>

                    {/* Contact Person */}
                    <div className="flex items-center justify-between text-xs mb-4 p-2 rounded-lg bg-white/5">
                      <span className="text-slate-400">Contact Person</span>
                      <span className="text-white font-semibold">
                        {employer.firstName} {employer.lastName}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-white/10">
                      <button
                        onClick={() => openDetails(employer)}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-purple-500/30 hover:scale-105 flex items-center justify-center gap-2 group/btn"
                      >
                        <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        View Details
                      </button>
                      <button
                        onClick={() =>
                          handleVerifyToggle(employer._id, employer.isVerified)
                        }
                        disabled={actionLoadingId === employer._id}
                        className="p-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-all hover:scale-110 disabled:opacity-50"
                        title={employer.isVerified ? "Unverify" : "Verify"}
                      >
                        {employer.isVerified ? (
                          <X className="w-4 h-4 text-red-400" />
                        ) : (
                          <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          handlePlanChange(
                            employer._id,
                            employer.plan === "pro" ? "free" : "pro"
                          )
                        }
                        disabled={actionLoadingId === employer._id}
                        className="p-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-all hover:scale-110 disabled:opacity-50"
                        title={
                          employer.plan === "pro" ? "Downgrade" : "Upgrade"
                        }
                      >
                        <Crown
                          className={`w-4 h-4 ${
                            employer.plan === "pro"
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-400"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-purple-500 to-purple-700 rounded-r-full transition-all duration-300 group-hover:h-3/4" />
                </div>
              ))}
            </div>
          )}

        {/* Empty State for Employers */}
        {viewMode === "employers" &&
          !loading &&
          filteredEmployers.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No employers found
              </h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-semibold hover:scale-105 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}

        {/* Premium Approvals Grid */}
        {viewMode === "approvals" && !pendingLoading && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pendingEmployers.map((user) => (
              <div
                key={user._id}
                onMouseEnter={() => setHoveredCard(user._id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-500 cursor-pointer"
                style={{
                  transform:
                    hoveredCard === user._id
                      ? "translateY(-8px) scale(1.02)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    hoveredCard === user._id
                      ? "0 20px 60px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.2)"
                      : "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                  style={{ background: "rgba(168, 85, 247, 0.2)" }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">
                          {user?.profile?.company?.name ||
                            `${user.firstName} ${user.lastName}`}
                        </h3>
                        <p className="text-sm text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                      <Mail className="w-4 h-4 text-purple-400" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    {user?.profile?.contact?.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span className="truncate">
                          {user.profile.contact.phone}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-bold border border-yellow-500/30">
                      <Clock className="w-3 h-3" />
                      Pending Approval
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-4 p-2 rounded-lg bg-white/5">
                    <span className="text-slate-400">Contact</span>
                    <span className="text-white font-semibold">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <button
                      onClick={() => openDetails(user)}
                      className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all font-medium border border-white/10 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleApprove(user._id)}
                      disabled={actionLoadingId === user._id}
                      className="px-4 py-2.5 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-emerald-600/40 hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(user._id)}
                      disabled={actionLoadingId === user._id}
                      className="px-4 py-2.5 bg-red-600/80 hover:bg-red-600 text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-red-600/40 hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>

                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-r-full transition-all duration-300 group-hover:h-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State for Approvals */}
        {viewMode === "approvals" &&
          !pendingLoading &&
          pendingEmployers.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No pending approvals
              </h3>
              <p className="text-slate-400">
                All employer registrations have been processed
              </p>
            </div>
          )}

        {/* Premium Details Modal */}
        {showDetails && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end md:items-center md:justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] w-full md:w-[950px] max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 duration-300 hover:shadow-2xl hover:shadow-[#803791]/20 transition-all">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center hover:shadow-lg hover:shadow-[#803791]/30 transition-all duration-300">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    Employer Details
                  </h3>
                  <p className="text-sm text-white/60 mt-1">
                    Complete profile information and actions
                  </p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-white/60 hover:text-white border border-transparent hover:border-white/10 hover:scale-110 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] space-y-6">
                {/* Basic Info */}
                <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-blue-400" />
                    </div>
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">Company</div>
                      <div className="font-semibold text-white">
                        {selectedEmployer?.profile?.company?.name || "-"}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">
                        Contact Person
                      </div>
                      <div className="font-semibold text-white">
                        {selectedEmployer?.user?.firstName}{" "}
                        {selectedEmployer?.user?.lastName}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">Email</div>
                      <div className="font-semibold text-white">
                        {selectedEmployer?.user?.email}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">Phone</div>
                      <div className="font-semibold text-white">
                        {selectedEmployer?.profile?.contact?.phone || "-"}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">
                        Registration Date
                      </div>
                      <div className="font-semibold text-white">
                        {selectedEmployer?.user?.createdAt
                          ? new Date(
                              selectedEmployer.user.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">Status</div>
                      <div className="font-semibold text-white capitalize">
                        {selectedEmployer?.user?.status || "-"}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Document Verification */}
                <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-green-400" />
                    </div>
                    Document Verification
                  </h4>
                  <div className="space-y-3">
                    {Array.isArray(
                      selectedEmployer?.profile?.verificationDocuments
                    ) &&
                    selectedEmployer.profile.verificationDocuments.length >
                      0 ? (
                      selectedEmployer.profile.verificationDocuments.map(
                        (doc) => (
                          <div
                            key={doc._id}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 group"
                          >
                            <div className="space-y-1">
                              <div className="font-semibold text-white flex items-center gap-2">
                                <FileText className="w-4 h-4 text-white/60 group-hover:text-[#b87bd1] transition-colors duration-200" />
                                <span className="capitalize">
                                  {(doc.type || "").replace(/_/g, " ")}
                                </span>
                              </div>
                              <div className="text-xs text-white/60">
                                Status:{" "}
                                <span
                                  className={`font-semibold capitalize ${
                                    doc.status === "verified"
                                      ? "text-green-400"
                                      : doc.status === "rejected"
                                      ? "text-red-400"
                                      : "text-yellow-400"
                                  }`}
                                >
                                  {doc.status || "uploaded"}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {doc.url && (
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-4 py-2 text-sm rounded-lg border border-white/10 text-white/75 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/10"
                                >
                                  View
                                </a>
                              )}
                              <button
                                onClick={async () => {
                                  await adminService.updateEmployerDocumentStatus(
                                    selectedEmployer.user._id,
                                    doc._id,
                                    {
                                      status: "verified",
                                    }
                                  );
                                  const res = await adminService.getUserById(
                                    selectedEmployer.user._id
                                  );
                                  setSelectedEmployer(
                                    res?.data || selectedEmployer
                                  );
                                }}
                                className="px-4 py-2 text-sm rounded-lg bg-green-600/80 text-white hover:bg-green-600 transition-all duration-200 flex items-center gap-1 hover:scale-105 active:scale-95 shadow-lg shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/40"
                              >
                                <Check className="w-4 h-4" /> Verify
                              </button>
                              <button
                                onClick={async () => {
                                  await adminService.updateEmployerDocumentStatus(
                                    selectedEmployer.user._id,
                                    doc._id,
                                    {
                                      status: "needs_reupload",
                                    }
                                  );
                                  const res = await adminService.getUserById(
                                    selectedEmployer.user._id
                                  );
                                  setSelectedEmployer(
                                    res?.data || selectedEmployer
                                  );
                                }}
                                className="px-4 py-2 text-sm rounded-lg border border-white/10 text-white/75 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/10"
                              >
                                Re-upload
                              </button>
                              <button
                                onClick={async () => {
                                  await adminService.updateEmployerDocumentStatus(
                                    selectedEmployer.user._id,
                                    doc._id,
                                    {
                                      status: "rejected",
                                    }
                                  );
                                  const res = await adminService.getUserById(
                                    selectedEmployer.user._id
                                  );
                                  setSelectedEmployer(
                                    res?.data || selectedEmployer
                                  );
                                }}
                                className="px-4 py-2 text-sm rounded-lg bg-red-600/80 text-white hover:bg-red-600 transition-all duration-200 flex items-center gap-1 hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40"
                              >
                                <X className="w-4 h-4" /> Reject
                              </button>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="text-sm text-white/60 text-center py-8 bg-white/5 rounded-lg border border-white/10">
                        No documents uploaded yet.
                      </div>
                    )}
                  </div>
                </section>

                {/* Subscription Management */}
                <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                      <Crown className="w-4 h-4 text-yellow-400" />
                    </div>
                    Subscription Management
                  </h4>
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                    <div>
                      <div className="text-sm text-white/50 mb-1">
                        Current Plan
                      </div>
                      <div className="font-bold text-white flex items-center gap-2 text-lg">
                        <Crown
                          className={`w-5 h-5 ${
                            selectedEmployer?.profile?.plan === "pro"
                              ? "text-yellow-400"
                              : "text-white/40"
                          }`}
                        />
                        <span className="capitalize">
                          {selectedEmployer?.profile?.plan || "free"}
                        </span>
                        {selectedEmployer?.profile?.plan === "pro" && (
                          <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-full text-xs font-bold border border-yellow-500/20">
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handlePlanChange(selectedEmployer.user._id, "free")
                        }
                        className="px-4 py-2 text-sm rounded-lg border border-white/10 text-white/75 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/10"
                      >
                        Set Free
                      </button>
                      <button
                        onClick={() =>
                          handlePlanChange(selectedEmployer.user._id, "pro")
                        }
                        className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white hover:shadow-lg hover:shadow-[#803791]/40 transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        Set Pro
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-white/50 bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200">
                    💡 Subscription history tracking coming soon
                  </div>
                </section>

                {/* Job Post Moderation */}
                <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-purple-400" />
                    </div>
                    Job Posts Management
                  </h4>
                  <div className="space-y-3">
                    {Array.isArray(selectedEmployer?.jobs) &&
                    selectedEmployer.jobs.length > 0 ? (
                      selectedEmployer.jobs.map((job) => (
                        <div
                          key={job._id}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-bold text-white mb-1">
                                {job.title}
                              </div>
                              <div className="text-xs text-white/60 mb-2">
                                Status:{" "}
                                <span
                                  className={`font-semibold capitalize ${
                                    job.status === "active"
                                      ? "text-green-400"
                                      : job.status === "closed"
                                      ? "text-red-400"
                                      : "text-yellow-400"
                                  }`}
                                >
                                  {job.status}
                                </span>
                              </div>
                              {job.description && (
                                <p className="text-sm text-white/70 line-clamp-2">
                                  {job.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={async () => {
                                  await adminService.changeJobStatus(
                                    job._id,
                                    "active"
                                  );
                                  const res = await adminService.getUserById(
                                    selectedEmployer.user._id
                                  );
                                  setSelectedEmployer(
                                    res?.data || selectedEmployer
                                  );
                                }}
                                className="px-3 py-1.5 text-sm rounded-lg bg-green-600/80 text-white hover:bg-green-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/40"
                              >
                                Approve
                              </button>
                              <button
                                onClick={async () => {
                                  await adminService.changeJobStatus(
                                    job._id,
                                    "closed"
                                  );
                                  const res = await adminService.getUserById(
                                    selectedEmployer.user._id
                                  );
                                  setSelectedEmployer(
                                    res?.data || selectedEmployer
                                  );
                                }}
                                className="px-3 py-1.5 text-sm rounded-lg bg-red-600/80 text-white hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40"
                              >
                                Reject
                              </button>
                              <button className="px-3 py-1.5 text-sm rounded-lg border border-white/10 text-white/75 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/10">
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-white/60 text-center py-8 bg-white/5 rounded-lg border border-white/10">
                        No job posts available.
                      </div>
                    )}
                  </div>
                </section>

                {/* Billing History */}
                <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-cyan-400" />
                    </div>
                    Billing History
                  </h4>
                  <div className="text-sm text-white/60 mb-3 bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200">
                    📊 Invoice and payment tracking will be available here
                  </div>
                  <div className="border border-white/10 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-4 text-xs text-white/60 font-semibold px-4 py-3 bg-white/5 border-b border-white/10">
                      <div>Invoice</div>
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    <div className="px-4 py-8 text-sm text-white/50 text-center bg-white/5">
                      No billing history available yet.
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
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
