"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Download,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  User,
  GraduationCap,
  MapPin,
  Calendar,
  FileText,
  Eye,
  MessageSquare,
  Filter,
  MoreVertical,
  Star,
  Send,
  Plus,
  Users,
  ArrowRight,
  Mail,
  Phone,
  Briefcase,
  ChevronUp,
} from "lucide-react";
import { applicationService } from "@/services/applicationService";

export default function EmployerApplications() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      setLoading(true);
      await applicationService.updateApplicationStatus(
        applicationId,
        newStatus
      );
      // Update the local state to reflect the change
      setApplications(
        applications.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (e) {
      setError(
        e?.response?.data?.message || e?.message || "Failed to update status"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await applicationService.employerMyApplications();
        if (!mounted) return;
        setApplications(res?.data || []);
        setStats(res?.stats || {});
      } catch (e) {
        setError(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to load applications"
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

  const stages = [
    {
      value: "all",
      label: "All Applications",
      color: "slate",
      count: stats.totalApplications || applications.length || 0,
    },
    {
      value: "applied",
      label: "New",
      color: "blue",
      count: stats.applied || 0,
    },
    {
      value: "reviewed",
      label: "Reviewed",
      color: "cyan",
      count: stats.reviewed || 0,
    },
    {
      value: "interview",
      label: "Interview",
      color: "indigo",
      count: stats.interview || 0,
    },
    {
      value: "hired",
      label: "Hired",
      color: "emerald",
      count: stats.hired || 0,
    },
    {
      value: "rejected",
      label: "Rejected",
      color: "rose",
      count: stats.rejected || 0,
    },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sorted = [...applications].sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });
    return sorted.filter((a) => {
      const statusValue = a.status || "applied";
      const candidate = a.studentId || {};
      const job = a.jobId || {};
      const matchesStage = stage === "all" || statusValue === stage;
      const haystack = [
        `${candidate.firstName || ""} ${candidate.lastName || ""}`,
        job.title || "",
        candidate.address?.city || "",
        ...(Array.isArray(candidate.skills) ? candidate.skills : []),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesStage && matchesQuery;
    });
  }, [applications, search, stage, sortBy]);

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Decorative background orbs matching dashboard theme */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
          style={{ background: "rgba(240,194,238,0.03)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Applications</h1>
          <p className="text-white/80">
            Manage and review candidate applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/12">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium">
            <Filter className="w-4 h-4" />
            Advanced Filter
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {stages.map((stat) => (
          <div
            key={stat.value}
            className="rounded-xl p-4 shadow-lg transition-all cursor-pointer hover:-translate-y-1 group"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onClick={() => setStage(stat.value)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  {stat.count}
                </div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  stat.color === "blue"
                    ? "bg-blue-500"
                    : stat.color === "cyan"
                    ? "bg-cyan-500"
                    : stat.color === "indigo"
                    ? "bg-indigo-500"
                    : stat.color === "emerald"
                    ? "bg-emerald-500"
                    : stat.color === "rose"
                    ? "bg-rose-500"
                    : "bg-slate-500"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div
        className="rounded-xl p-6 shadow-xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates, positions, skills..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 text-white placeholder-white/60 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b87bd1] focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="match">Best Match</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Stage Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {stages.map((s) => (
            <button
              key={s.value}
              onClick={() => setStage(s.value)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 border-2 ${
                stage === s.value
                  ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg border-transparent"
                  : "bg-white/6 text-white/80 border-white/10 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {s.label}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  stage === s.value
                    ? "bg-white/20 text-white"
                    : "bg-white/10 text-white/80"
                }`}
              >
                {s.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filtered.map((app) => {
          const isOpen = expandedId === app._id;

          return (
            <div
              key={app._id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 space-y-4"
            >
              {/* Header Section */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {app.studentId?.firstName} {app.studentId?.lastName}
                    </h3>
                    <StageBadge value={app.status} />
                  </div>

                  <p className="text-white/60 mb-2">{app.jobId?.title}</p>

                  {/* Basic Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {app.studentId?.email}
                    </div>
                    {app.studentId?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {app.studentId?.phone}
                      </div>
                    )}
                    {app.studentId?.address?.city && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {app.studentId?.address.city},{" "}
                        {app.studentId?.address.state}
                      </div>
                    )}
                    {app.meta?.yearsExperience && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {app.meta.yearsExperience} Years Experience
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Resume button */}
                  {app.resumeUrl && (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Resume
                    </a>
                  )}

                  {/* Expand/Collapse button */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : app._id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors"
                  >
                    {isOpen ? (
                      <>
                        <ChevronUp className="w-4 h-4" /> Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" /> More
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isOpen && (
                <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
                  {/* Previous Experience */}
                  {(app.meta?.previousCompany ||
                    app.meta?.previousPosition) && (
                    <div>
                      <h4 className="text-sm font-medium text-white/80 mb-2">
                        Previous Experience
                      </h4>
                      <div className="text-white/60">
                        {app.meta.previousPosition && (
                          <p>Position: {app.meta.previousPosition}</p>
                        )}
                        {app.meta.previousCompany && (
                          <p>Company: {app.meta.previousCompany}</p>
                        )}
                        {app.meta.yearsExperience && (
                          <p>Experience: {app.meta.yearsExperience} Years</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {app.studentId?.education?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-white/80 mb-2">
                        Education
                      </h4>
                      <div className="space-y-2">
                        {app.studentId.education.map((edu, index) => (
                          <div key={index} className="text-white/60">
                            <p>
                              {edu.degree} in {edu.fieldOfStudy}
                            </p>
                            <p className="text-sm">
                              {edu.institution} - {edu.graduationYear}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {app.meta?.languages && (
                    <div>
                      <h4 className="text-sm font-medium text-white/80 mb-2">
                        Languages
                      </h4>
                      <p className="text-white/60">{app.meta.languages}</p>
                    </div>
                  )}

                  {/* Application Status Controls */}
                  <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-white/10">
                    <StatusUpdateButtons
                      currentStatus={app.status}
                      onUpdateStatus={(newStatus) =>
                        handleStatusUpdate(app._id, newStatus)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <User className="w-12 h-12 text-white/40" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No applications found
          </h3>
          <p className="text-white/60 mb-6">
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={() => {
              setSearch("");
              setStage("all");
            }}
            className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

function StatusUpdateButtons({ currentStatus, onUpdateStatus }) {
  const statusButtons = [
    { status: "applied", label: "Mark as New", icon: Clock },
    { status: "reviewed", label: "Mark as Reviewed", icon: Eye },
    { status: "interview", label: "Schedule Interview", icon: Calendar },
    { status: "hired", label: "Mark as Hired", icon: CheckCircle },
    { status: "rejected", label: "Reject", icon: XCircle },
  ];

  return (
    <div className="flex items-center gap-2">
      {statusButtons.map(({ status, label, icon: Icon }) => {
        if (status === currentStatus) return null;
        return (
          <button
            key={status}
            onClick={() => onUpdateStatus(status)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function StageBadge({ value }) {
  const stageConfig = {
    new: {
      icon: Clock,
      text: "New",
      class: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    screening: {
      icon: Eye,
      text: "Screening",
      class: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    interview: {
      icon: Calendar,
      text: "Interview",
      class: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    },
    shortlisted: {
      icon: CheckCircle,
      text: "Shortlisted",
      class: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    rejected: {
      icon: XCircle,
      text: "Rejected",
      class: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    },
  };

  const config = stageConfig[value] || {
    icon: Clock,
    text: "New",
    class: "bg-white/10 text-white/80 border-white/10",
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.class}`}
    >
      <Icon className="w-4 h-4" />
      {config.text}
    </span>
  );
}
