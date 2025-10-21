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
} from "lucide-react";
import { adminService } from "@/services/adminService";

export default function JobPostingsManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAutoFlaggedOnly, setShowAutoFlaggedOnly] = useState(false);

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
        setError(e?.response?.data?.message || e?.message || "Failed to load jobs");
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
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to refresh jobs");
    } finally {
      setLoading(false);
    }
  }

  const tabs = useMemo(() => {
    const total = jobs.length;
    const active = jobs.filter((j) => j.status === "active").length;
    const closed = jobs.filter((j) => j.status === "closed").length;
    const pending = jobs.filter((j) => (j.moderation?.approvalStatus || "") === "pending").length;
    const approved = jobs.filter((j) => (j.moderation?.approvalStatus || "") === "approved").length;
    const rejected = jobs.filter((j) => (j.moderation?.approvalStatus || "") === "rejected").length;
    const needsChanges = jobs.filter((j) => (j.moderation?.approvalStatus || "") === "needs_changes").length;
    return [
      { id: "all", label: "All Jobs", count: total },
      { id: "pending", label: "Pending", count: pending },
      { id: "approved", label: "Approved", count: approved },
      { id: "rejected", label: "Rejected", count: rejected },
      { id: "needs_changes", label: "Needs Changes", count: needsChanges },
      { id: "active", label: "Active", count: active },
      { id: "closed", label: "Closed", count: closed },
    ];
  }, [jobs]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  async function handleApprove(jobId) {
    if (!confirm("Approve this job?")) return;
    try {
      await adminService.approveJob(jobId);
      await refresh();
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Failed to approve job");
    }
  }

  async function handleReject(job) {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    try {
      await adminService.rejectJob(job._id, reason);
      await refresh();
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Failed to reject job");
    }
  }

  async function handleRequestChanges(job) {
    const note = prompt("Enter change request notes for employer:");
    if (!note) return;
    try {
      await adminService.requestJobChanges(job._id, note);
      await refresh();
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Failed to request changes");
    }
  }

  async function handleReanalyze(jobId) {
    try {
      await adminService.reanalyzeJob(jobId);
      await refresh();
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Failed to reanalyze job");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Job Postings Management
          </h1>
          <p className="text-slate-600">
            Manage all job postings across the platform
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 bg-white rounded-full text-xs shadow-sm">
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title, company, skills..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 select-none">
          <input
            type="checkbox"
            checked={showAutoFlaggedOnly}
            onChange={(e) => setShowAutoFlaggedOnly(e.target.checked)}
          />
          <ShieldAlert className="w-4 h-4 text-amber-600" /> Auto-flagged only
        </label>
        <button onClick={refresh} className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
          <Filter className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {error && <div className="text-red-600">{error}</div>}
        {loading && <div>Loading...</div>}
        {(function () {
          let list = jobs;
          if (activeTab === "active" || activeTab === "closed") {
            list = list.filter((j) => (j.status || "").toLowerCase() === activeTab);
          } else if (activeTab !== "all") {
            list = list.filter((j) => (j.moderation?.approvalStatus || "") === activeTab);
          }
          if (showAutoFlaggedOnly) {
            list = list.filter((j) => j.moderation?.autoFlagged);
          }
          return list;
        })()
          .filter((job) =>
            [job.title, job.department, job.location]
              .filter(Boolean)
              .some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          .map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                    {(job.status || "").charAt(0).toUpperCase() + (job.status || "").slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    (job.moderation?.approvalStatus || "") === "approved"
                      ? "bg-emerald-100 text-emerald-700"
                      : (job.moderation?.approvalStatus || "") === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : (job.moderation?.approvalStatus || "") === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}>
                    {(job.moderation?.approvalStatus || "pending").replace("_", " ")}
                  </span>
                </div>
                <p className="text-slate-600 mb-3">{job?.employerId?.company?.name || "-"}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {job.jobType}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.experience}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button title="Approve" onClick={() => handleApprove(job._id)} className="p-2 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50" disabled={(job.moderation?.approvalStatus || "") === "approved"}>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </button>
                <button title="Reject" onClick={() => handleReject(job)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <XCircle className="w-5 h-5 text-red-600" />
                </button>
                <button title="Request changes" onClick={() => handleRequestChanges(job)} className="p-2 hover:bg-amber-50 rounded-lg transition-colors">
                  <MessageSquare className="w-5 h-5 text-amber-600" />
                </button>
                <button title="Reanalyze" onClick={() => handleReanalyze(job._id)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>

            {Array.isArray(job.skills) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Moderation insight */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-slate-500">Spam score</div>
                <div className="font-semibold text-slate-900">{(job.moderation?.spamScore ?? 0).toFixed(2)}</div>
                {job.moderation?.autoFlagged && (
                  <div className="mt-1 inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    <ShieldAlert className="w-4 h-4" /> Auto-flagged
                  </div>
                )}
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 md:col-span-2">
                <div className="text-slate-500 mb-1">Flags</div>
                <div className="flex flex-wrap gap-2">
                  {(job.moderation?.flags || []).length === 0 && (
                    <span className="text-slate-500">No flags</span>
                  )}
                  {(job.moderation?.flags || []).map((f, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-medium">
                      {String(f).replace("_", " ")}
                    </span>
                  ))}
                </div>
                {job.moderation?.rejectionReason && (
                  <div className="mt-2 text-red-700 bg-red-50 border border-red-200 rounded p-2">
                    <span className="font-medium">Rejection reason:</span> {job.moderation.rejectionReason}
                  </div>
                )}
                {job.moderation?.requestChangesNote && (
                  <div className="mt-2 text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
                    <span className="font-medium">Requested changes:</span> {job.moderation.requestChangesNote}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex gap-6 text-sm">
                {/* Placeholder counts; admin jobs endpoint returns jobs only */}
                <span className="text-slate-600">Applications: -</span>
                <span className="text-slate-600">
                  <span className="font-semibold text-slate-900">{job.vacancies}</span> vacancies
                </span>
                <span className="text-slate-600">
                  Assigned to:{" "}
                  <span className="text-slate-900">-</span>
                </span>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm hover:shadow-md">
                View Applications
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
