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
      let isVerified = current;
      if (typeof isVerified === "undefined") {
        try {
          const details = await adminService.getUserById(userId);
          isVerified = Boolean(details?.data?.profile?.isVerified);
        } catch {}
      }
      await adminService.setEmployerVerification(userId, !isVerified);
      await refreshEmployers();
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Failed to update verification"
      );
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
      { id: "all", label: "All Employers", count: total },
      { id: "verified", label: "Verified", count: verified },
      { id: "pending", label: "Pending Verification", count: pending },
      { id: "premium", label: "Premium", count: premium },
    ];
  }, [employers]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent p-6 space-y-6">
      {/* Header with Premium Stats */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center shadow-lg shadow-[#803791]/30 hover:shadow-[#803791]/50 transition-all duration-300 hover:scale-110">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              Employers Management
            </h1>
            <p className="text-white/75">
              Manage and verify employer accounts with premium control
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:scale-105 cursor-default">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-xs text-white/60">Total Active</div>
                <div className="text-lg font-bold text-white">
                  {employers.length}
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 hover:scale-105 cursor-default">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-xs text-white/60">Premium</div>
                <div className="text-lg font-bold text-white">
                  {employers.filter((e) => e.plan === "pro").length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Switch with Premium Design */}
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode("employers")}
            className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              viewMode === "employers"
                ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg shadow-[#803791]/30 hover:shadow-[#803791]/50 hover:scale-105"
                : "bg-white/5 text-white/75 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 hover:shadow-lg hover:shadow-white/5"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Employers
            </span>
            {viewMode === "employers" && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] blur opacity-50"></div>
            )}
          </button>
          <button
            onClick={() => setViewMode("approvals")}
            className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              viewMode === "approvals"
                ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg shadow-[#803791]/30 hover:shadow-[#803791]/50 hover:scale-105"
                : "bg-white/5 text-white/75 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 hover:shadow-lg hover:shadow-white/5"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Pending Approvals
              {pendingEmployers.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-bold">
                  {pendingEmployers.length}
                </span>
              )}
            </span>
            {viewMode === "approvals" && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] blur opacity-50"></div>
            )}
          </button>
        </div>
      </div>

      {/* Premium Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative px-5 py-3 font-medium transition-all duration-300 rounded-t-xl ${
              activeTab === tab.id
                ? "text-white"
                : "text-white/60 hover:text-white/90 hover:bg-white/5"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-white/10 text-white/60 group-hover:bg-white/15"
                }`}
              >
                {tab.count}
              </span>
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#803791] via-[#b87bd1] to-[#803791] rounded-t-full shadow-lg shadow-[#803791]/50"></div>
            )}
          </button>
        ))}
      </div>

      {/* Premium Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company name, industry, or email..."
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 focus:border-white/20 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-lg hover:shadow-[#b87bd1]/10"
          />
        </div>
        <button className="px-6 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/75 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/5 hover:shadow-lg hover:shadow-white/10 hover:scale-105 active:scale-95">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 text-red-300 flex items-center gap-3 shadow-lg shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Loading State */}
      {(loading || pendingLoading) && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex items-center justify-center shadow-lg">
          <div className="flex items-center gap-3 text-white/75">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Loading employers...
          </div>
        </div>
      )}

      {/* Premium Employers Table */}
      {viewMode === "employers" && !loading && (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/10 hover:shadow-black/20 transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Company
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Contact Person
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Industry
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Size
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployers.map((employer, idx) => (
                  <tr
                    key={employer._id}
                    className="border-t border-white/5 hover:bg-white/10 transition-all duration-200 group"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-[#803791]/20 to-[#b87bd1]/20 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#803791]/30 group-hover:border-white/20 transition-all duration-300">
                          <Building2 className="w-5 h-5 text-[#b87bd1]" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-[#b87bd1] transition-colors duration-200">
                            {employer.company?.name ||
                              `${employer.firstName} ${employer.lastName}`}
                          </div>
                          <div className="text-sm text-white/60">
                            {employer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-white">
                        {employer.firstName} {employer.lastName}
                      </div>
                      <div className="text-sm text-white/60">
                        {employer.contact?.phone || "-"}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-white/75">
                      {employer.company?.industry || "-"}
                    </td>
                    <td className="py-4 px-6 text-sm text-white/75">
                      {employer.company?.size || "-"}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-2">
                        {employer.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs font-semibold w-fit border border-green-500/20 hover:bg-green-500/30 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-semibold w-fit border border-yellow-500/20 hover:bg-yellow-500/30 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-200">
                            <XCircle className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                        {employer.plan === "pro" && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-lg text-xs font-semibold w-fit border border-yellow-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-200">
                            <Crown className="w-3 h-3" />
                            Premium
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetails(employer)}
                          className="p-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 group/btn border border-transparent hover:border-white/10 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-[#b87bd1]/20"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5 text-white/60 group-hover/btn:text-[#b87bd1] transition-colors duration-200" />
                        </button>
                        <button
                          onClick={() =>
                            handleVerifyToggle(
                              employer._id,
                              employer.isVerified
                            )
                          }
                          disabled={actionLoadingId === employer._id}
                          className="p-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 group/btn border border-transparent hover:border-white/10 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-white/10"
                          title={
                            employer.isVerified
                              ? "Mark as Unverified"
                              : "Verify Employer"
                          }
                        >
                          {employer.isVerified ? (
                            <X className="w-5 h-5 text-white/60 group-hover/btn:text-red-400 transition-colors duration-200" />
                          ) : (
                            <BadgeCheck className="w-5 h-5 text-white/60 group-hover/btn:text-green-400 transition-colors duration-200" />
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
                          className="p-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 group/btn border border-transparent hover:border-white/10 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-yellow-500/20"
                          title={
                            employer.plan === "pro"
                              ? "Downgrade to Free"
                              : "Upgrade to Pro"
                          }
                        >
                          <Crown
                            className={`w-5 h-5 transition-all ${
                              employer.plan === "pro"
                                ? "text-yellow-400 group-hover/btn:text-yellow-300"
                                : "text-white/60 group-hover/btn:text-yellow-400"
                            }`}
                          />
                        </button>
                        <button
                          className="p-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 group/btn border border-transparent hover:border-white/10 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-white/10"
                          title="More Options"
                        >
                          <MoreVertical className="w-5 h-5 text-white/60 group-hover/btn:text-white transition-colors duration-200" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Premium Approvals Table */}
      {viewMode === "approvals" && !pendingLoading && (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/10 hover:shadow-black/20 transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Company
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Phone
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Registered
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingEmployers.map((user, idx) => (
                  <tr
                    key={user._id}
                    className="border-t border-white/5 hover:bg-white/10 transition-all duration-200 group"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="py-4 px-6 text-sm text-white font-medium">
                      {user?.profile?.company?.name || "-"}
                    </td>
                    <td className="py-4 px-6 text-sm text-white">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="py-4 px-6 text-sm text-white/75">
                      {user.email}
                    </td>
                    <td className="py-4 px-6 text-sm text-white/75">
                      {user?.profile?.contact?.phone || "-"}
                    </td>
                    <td className="py-4 px-6 text-sm text-white/75">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-semibold border border-yellow-500/20 hover:bg-yellow-500/30 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-200">
                        <XCircle className="w-3 h-3" /> Pending
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetails(user)}
                          className="px-4 py-2 text-sm rounded-lg border border-white/10 text-white/75 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/10"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleApprove(user._id)}
                          disabled={actionLoadingId === user._id}
                          className="px-4 py-2 text-sm rounded-lg bg-green-600/80 text-white hover:bg-green-600 transition-all duration-200 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/40"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(user._id)}
                          disabled={actionLoadingId === user._id}
                          className="px-4 py-2 text-sm rounded-lg bg-red-600/80 text-white hover:bg-red-600 transition-all duration-200 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                  selectedEmployer.profile.verificationDocuments.length > 0 ? (
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
  );
}
