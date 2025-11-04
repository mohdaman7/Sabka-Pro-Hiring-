"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  RefreshCw,
  ShieldAlert,
  Building2,
  Target,
  Download,
  Send,
  Award,
  TrendingUp,
  FileText,
  Calendar,
  Users,
  X,
  ChevronRight,
  SendHorizonal,
  AlertCircle,
} from "lucide-react";
import { adminService } from "@/services/adminService";
import { customToast } from "@/components/ui/toast";

export default function JobPostingsManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAutoFlaggedOnly, setShowAutoFlaggedOnly] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // New states for change request modal
  const [showChangeRequestModal, setShowChangeRequestModal] = useState(false);
  const [changeRequestNote, setChangeRequestNote] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await adminService.listJobs();
        if (!mounted) return;
        setJobs(res?.data || []);
      } catch (e) {
        customToast.error(
          e?.response?.data?.message || e?.message || "Failed to load jobs"
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

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const res = await adminService.listJobs();
      setJobs(res?.data || []);
      customToast.success("Jobs refreshed successfully");
    } catch (e) {
      customToast.error(
        e?.response?.data?.message || e?.message || "Failed to refresh jobs"
      );
    } finally {
      setLoading(false);
    }
  }

  const tabs = useMemo(() => {
    const total = jobs.length;
    const active = jobs.filter((j) => j.status === "active").length;
    const closed = jobs.filter((j) => j.status === "closed").length;
    const pending = jobs.filter(
      (j) => (j.moderation?.approvalStatus || "") === "pending"
    ).length;
    const approved = jobs.filter(
      (j) => (j.moderation?.approvalStatus || "") === "approved"
    ).length;
    const rejected = jobs.filter(
      (j) => (j.moderation?.approvalStatus || "") === "rejected"
    ).length;
    const needsChanges = jobs.filter(
      (j) => (j.moderation?.approvalStatus || "") === "needs_changes"
    ).length;
    return [
      { id: "all", label: "All Jobs", count: total, icon: Briefcase },
      { id: "pending", label: "Pending", count: pending, icon: Clock },
      {
        id: "approved",
        label: "Approved",
        count: approved,
        icon: CheckCircle2,
      },
      { id: "rejected", label: "Rejected", count: rejected, icon: XCircle },
      {
        id: "needs_changes",
        label: "Needs Changes",
        count: needsChanges,
        icon: MessageSquare,
      },
      { id: "active", label: "Active", count: active, icon: Target },
      { id: "closed", label: "Closed", count: closed, icon: FileText },
    ];
  }, [jobs]);

  async function handleApprove(jobId) {
    try {
      await adminService.approveJob(jobId);
      customToast.success("Job approved successfully");
      await refresh();
    } catch (e) {
      customToast.error(
        e?.response?.data?.message || e?.message || "Failed to approve job"
      );
    }
  }

  async function handleReject(job) {
    const reason =
      typeof window !== "undefined"
        ? window.prompt("Enter rejection reason:")
        : null;
    if (!reason) {
      customToast.warning("Rejection cancelled");
      return;
    }
    try {
      await adminService.rejectJob(job._id, reason);
      customToast.success("Job rejected");
      await refresh();
    } catch (e) {
      customToast.error(
        e?.response?.data?.message || e?.message || "Failed to reject job"
      );
    }
  }

  // Updated change request handler
  const handleOpenChangeRequest = (job) => {
    setSelectedJob(job);
    setChangeRequestNote("");
    setShowChangeRequestModal(true);
  };

  const handleSendChangeRequest = async () => {
    if (!changeRequestNote.trim()) {
      customToast.warning("Please enter change request notes");
      return;
    }

    setSendingRequest(true);
    try {
      await adminService.requestJobChanges(selectedJob._id, changeRequestNote);
      customToast.success("Change request sent to employer");
      setShowChangeRequestModal(false);
      setChangeRequestNote("");
      await refresh();
    } catch (e) {
      customToast.error(
        e?.response?.data?.message || e?.message || "Failed to request changes"
      );
    } finally {
      setSendingRequest(false);
    }
  };

  async function handleReanalyze(jobId) {
    const toastId = customToast.loading("Reanalyzing job...");
    try {
      await adminService.reanalyzeJob(jobId);
      customToast.success("Job reanalyzed successfully");
      await refresh();
    } catch (e) {
      customToast.error(
        e?.response?.data?.message || e?.message || "Failed to reanalyze job"
      );
    }
  }

  const filteredJobs = useMemo(() => {
    let list = jobs;
    if (activeTab === "active" || activeTab === "closed") {
      list = list.filter((j) => (j.status || "").toLowerCase() === activeTab);
    } else if (activeTab !== "all") {
      list = list.filter(
        (j) => (j.moderation?.approvalStatus || "") === activeTab
      );
    }
    if (showAutoFlaggedOnly) {
      list = list.filter((j) => j.moderation?.autoFlagged);
    }
    if (searchTerm) {
      list = list.filter((job) =>
        [job.title, job.department, job.location, job.employerId?.company?.name]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return list;
  }, [jobs, activeTab, showAutoFlaggedOnly, searchTerm]);

  const openDetails = (job) => {
    setSelectedJob(job);
    setShowDetails(true);
  };

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

      <div className="relative z-10 space-y-4 md:space-y-6 max-w-[1800px] mx-auto">
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
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 md:mb-3 tracking-tight">
                  Job Postings Management
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4 md:mb-6 flex flex-wrap items-center gap-2">
                  <Target className="w-5 h-5" />
                  Managing{" "}
                  <span className="font-bold text-amber-300">
                    {jobs.length} job postings
                  </span>{" "}
                  with{" "}
                  <span className="font-bold text-emerald-300">
                    {
                      jobs.filter(
                        (j) => j.moderation?.approvalStatus === "approved"
                      ).length
                    }{" "}
                    approved
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <button className="group/btn relative px-4 py-2 md:px-6 md:py-3 bg-white text-purple-700 rounded-xl font-semibold text-sm md:text-base shadow-2xl shadow-white/20 transition-all hover:scale-105 hover:shadow-white/30 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-purple-50 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Download className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
                    <span className="relative z-10 hidden sm:inline">Export Data</span>
                  </button>
                  <button
                    onClick={refresh}
                    disabled={loading}
                    className="px-4 py-2 md:px-6 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-semibold text-sm md:text-base border border-white/30 transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-4 h-4 md:w-5 md:h-5 ${loading ? "animate-spin" : ""}`}
                    />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                  <button className="px-4 py-2 md:px-6 md:py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold text-sm md:text-base border border-white/20 transition-all hover:scale-105 flex items-center gap-2">
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Bulk Actions</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 w-full lg:w-auto">
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    {jobs.length}
                  </div>
                  <div className="text-xs md:text-sm text-white/80">Total Jobs</div>
                </div>
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="text-2xl md:text-3xl font-black text-emerald-300 mb-1">
                    {jobs.filter((j) => j.status === "active").length}
                  </div>
                  <div className="text-xs md:text-sm text-white/80">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Filter Tabs */}
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 md:gap-3 whitespace-nowrap ${
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
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/30"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        activeTab === tab.id ? "text-white" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div
                      className={`text-xs md:text-sm font-bold ${
                        activeTab === tab.id ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {tab.label}
                    </div>
                    <div className="text-xs text-slate-400">
                      {tab.count} jobs
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

        {/* Premium Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by job title, company, skills, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 shadow-lg transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>
          <label className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white select-none cursor-pointer hover:bg-white/10 transition-all">
            <input
              type="checkbox"
              checked={showAutoFlaggedOnly}
              onChange={(e) => setShowAutoFlaggedOnly(e.target.checked)}
              className="w-4 h-4"
            />
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span className="font-medium">Auto-flagged only</span>
          </label>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-slate-300">Loading jobs...</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="text-slate-300 text-sm">
            Showing{" "}
            <span className="font-bold text-white">{filteredJobs.length}</span>{" "}
            of <span className="font-bold text-white">{jobs.length}</span> jobs
          </div>
        )}

        {/* Premium Jobs Grid */}
        {!loading && filteredJobs.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                onMouseEnter={() => setHoveredCard(job._id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-500 cursor-pointer"
                style={{
                  transform:
                    hoveredCard === job._id
                      ? "translateY(-8px) scale(1.02)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    hoveredCard === job._id
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
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-400 flex items-center gap-1 mb-2">
                        <Building2 className="w-3 h-3" />
                        {job.employerId?.firstName && job.employerId?.lastName
                          ? `${job.employerId.firstName} ${job.employerId.lastName}`
                          : job.employerId?.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        job.status === "active"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                      }`}
                    >
                      {job.status === "active" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {job.status}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        job.moderation?.approvalStatus === "approved"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : job.moderation?.approvalStatus === "pending"
                          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                          : job.moderation?.approvalStatus === "rejected"
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      }`}
                    >
                      {(job.moderation?.approvalStatus || "pending").replace(
                        "_",
                        " "
                      )}
                    </span>
                    {job.moderation?.autoFlagged && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold">
                        <ShieldAlert className="w-3 h-3" />
                        Flagged
                      </span>
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      <span className="truncate">{job.jobType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300 p-2 rounded-lg bg-white/5">
                      <DollarSign className="w-4 h-4 text-purple-400" />
                      <span className="truncate">{job.salary}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  {Array.isArray(job.skills) && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 text-slate-400 rounded-lg text-xs font-medium border border-white/10">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Moderation Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-black text-purple-400">
                        {(job.moderation?.spamScore ?? 0).toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-400">Spam Score</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-black text-blue-400">
                        {job.vacancies}
                      </div>
                      <div className="text-xs text-slate-400">Vacancies</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <button
                      onClick={() => openDetails(job)}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-purple-500/30 hover:scale-105 flex items-center justify-center gap-2 group/btn"
                    >
                      <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Details
                    </button>
                    <button
                      onClick={() => handleApprove(job._id)}
                      disabled={job.moderation?.approvalStatus === "approved"}
                      className="p-3 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-xl transition-all hover:scale-110 disabled:opacity-50 shadow-lg"
                      title="Approve"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReject(job)}
                      className="p-3 bg-red-600/80 hover:bg-red-600 text-white rounded-xl transition-all hover:scale-110 shadow-lg"
                      title="Reject"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenChangeRequest(job)}
                      className="p-3 bg-amber-600/80 hover:bg-amber-600 text-white rounded-xl transition-all hover:scale-110 shadow-lg"
                      title="Request Changes"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-purple-500 to-purple-700 rounded-r-full transition-all duration-300 group-hover:h-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No jobs found
            </h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
                setShowAutoFlaggedOnly(false);
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-semibold hover:scale-105 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Premium Change Request Modal */}
        {showChangeRequestModal && selectedJob && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end md:items-center md:justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] w-full md:w-[600px] max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 duration-300 hover:shadow-2xl hover:shadow-amber-500/20 transition-all">
              <div className="flex items-center justify-between px-6 py-5 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Request Changes
                    </h3>
                    <p className="text-sm text-amber-300/80">
                      Send change request to employer
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChangeRequestModal(false)}
                  className="p-2 hover:bg-amber-500/10 rounded-xl transition-all duration-200 text-amber-300 hover:text-amber-200 border border-transparent hover:border-amber-500/30 hover:scale-110 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Job Info */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    Job Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-amber-300/70 text-xs">Title</div>
                      <div className="text-white font-medium truncate">
                        {selectedJob.title}
                      </div>
                    </div>
                    <div>
                      <div className="text-amber-300/70 text-xs">Employer</div>
                      <div className="text-white font-medium truncate">
                        {selectedJob.employerId?.firstName &&
                        selectedJob.employerId?.lastName
                          ? `${selectedJob.employerId.firstName} ${selectedJob.employerId.lastName}`
                          : selectedJob.employerId?.email || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Change Request Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      Change Request Notes
                      <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      value={changeRequestNote}
                      onChange={(e) => setChangeRequestNote(e.target.value)}
                      placeholder="Please provide clear and constructive feedback about what changes are needed for this job posting to be approved. Be specific about issues and required improvements..."
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-amber-500/30 rounded-xl text-white placeholder:text-amber-300/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 shadow-lg transition-all resize-none"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-amber-300/60">
                        {changeRequestNote.length}/1000 characters
                      </span>
                      <span className="text-xs text-amber-300/60">
                        Required
                      </span>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <h5 className="font-semibold text-amber-300 text-sm mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Tips for effective feedback:
                    </h5>
                    <ul className="text-amber-300/70 text-xs space-y-1">
                      <li>• Be specific about what needs to be changed</li>
                      <li>• Provide examples of acceptable content</li>
                      <li>• Explain why the changes are necessary</li>
                      <li>• Keep the tone professional and constructive</li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-amber-500/20">
                  <button
                    onClick={() => setShowChangeRequestModal(false)}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 transition-all hover:scale-105 hover:border-white/20 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSendChangeRequest}
                    disabled={!changeRequestNote.trim() || sendingRequest}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <SendHorizonal className="w-4 h-4" />
                    {sendingRequest ? "Sending..." : "Send Request"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Premium Details Modal */}
        {showDetails && selectedJob && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end md:items-center md:justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] w-full md:w-[950px] max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 duration-300 hover:shadow-2xl hover:shadow-[#803791]/20 transition-all">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center hover:shadow-lg hover:shadow-[#803791]/30 transition-all duration-300">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    Job Details
                  </h3>
                  <p className="text-sm text-white/60 mt-1">
                    Complete job information and moderation
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
                {/* Basic Job Info */}
                <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-blue-400" />
                    </div>
                    Job Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">
                        Job Title
                      </div>
                      <div className="font-semibold text-white">
                        {selectedJob.title}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">Employer</div>
                      <div className="font-semibold text-white">
                        {selectedJob.employerId?.firstName &&
                        selectedJob.employerId?.lastName
                          ? `${selectedJob.employerId.firstName} ${selectedJob.employerId.lastName}`
                          : selectedJob.employerId?.email || "N/A"}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">Location</div>
                      <div className="font-semibold text-white">
                        {selectedJob.location}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">Job Type</div>
                      <div className="font-semibold text-white">
                        {selectedJob.jobType}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">
                        Salary Range
                      </div>
                      <div className="font-semibold text-white">
                        {selectedJob.salary}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">
                        Experience
                      </div>
                      <div className="font-semibold text-white">
                        {selectedJob.experience}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">
                        Vacancies
                      </div>
                      <div className="font-semibold text-white">
                        {selectedJob.vacancies}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-lg hover:shadow-white/5 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-1">
                        Department
                      </div>
                      <div className="font-semibold text-white">
                        {selectedJob.department || "N/A"}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Skills */}
                {Array.isArray(selectedJob.skills) &&
                  selectedJob.skills.length > 0 && (
                    <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                      <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                          <Award className="w-4 h-4 text-green-400" />
                        </div>
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-2 bg-blue-500/10 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                {/* Moderation Details */}
                <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                      <ShieldAlert className="w-4 h-4 text-yellow-400" />
                    </div>
                    Moderation Details
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-2">
                        Approval Status
                      </div>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold ${
                          selectedJob.moderation?.approvalStatus === "approved"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : selectedJob.moderation?.approvalStatus ===
                              "pending"
                            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                            : selectedJob.moderation?.approvalStatus ===
                              "rejected"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {(
                          selectedJob.moderation?.approvalStatus || "pending"
                        ).replace("_", " ")}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200">
                      <div className="text-white/50 text-xs mb-2">
                        Spam Score
                      </div>
                      <div className="text-2xl font-black text-purple-400">
                        {(selectedJob.moderation?.spamScore ?? 0).toFixed(2)}
                      </div>
                      {selectedJob.moderation?.autoFlagged && (
                        <div className="mt-2 inline-flex items-center gap-1  bg-amber-50/10 border border-amber-500/30 px-2 py-1 rounded text-xs font-bold text-amber-300">
                          <ShieldAlert className="w-4 h-4" /> Auto-flagged
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Flags */}
                  {Array.isArray(selectedJob.moderation?.flags) &&
                    selectedJob.moderation.flags.length > 0 && (
                      <div className="mb-4">
                        <div className="text-white/50 text-xs mb-2">
                          Detected Flags
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.moderation.flags.map((flag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-red-500/10 text-red-300 rounded-lg text-xs font-medium border border-red-500/20"
                            >
                              {String(flag).replace("_", " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Rejection Reason */}
                  {selectedJob.moderation?.rejectionReason && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300">
                      <div className="font-bold text-sm mb-1">
                        Rejection Reason:
                      </div>
                      <div className="text-sm">
                        {selectedJob.moderation.rejectionReason}
                      </div>
                    </div>
                  )}

                  {/* Change Request */}
                  {selectedJob.moderation?.requestChangesNote && (
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      <div className="font-bold text-sm mb-1">
                        Requested Changes:
                      </div>
                      <div className="text-sm">
                        {selectedJob.moderation.requestChangesNote}
                      </div>
                    </div>
                  )}
                </section>

                {/* Moderation Actions */}
                <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-purple-400" />
                    </div>
                    Moderation Actions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        handleApprove(selectedJob._id);
                        setShowDetails(false);
                      }}
                      disabled={
                        selectedJob.moderation?.approvalStatus === "approved"
                      }
                      className="px-4 py-3 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Approve Job
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedJob);
                        setShowDetails(false);
                      }}
                      className="px-4 py-3 bg-red-600/80 hover:bg-red-600 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject Job
                    </button>
                    <button
                      onClick={() => {
                        handleOpenChangeRequest(selectedJob);
                        setShowDetails(false);
                      }}
                      className="px-4 py-3 bg-amber-600/80 hover:bg-amber-600 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-amber-600/20 hover:shadow-lg hover:shadow-amber-600/40"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Request Changes
                    </button>
                    <button
                      onClick={() => {
                        handleReanalyze(selectedJob._id);
                        setShowDetails(false);
                      }}
                      className="px-4 py-3 bg-blue-600/80 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/40"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Reanalyze Job
                    </button>
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
