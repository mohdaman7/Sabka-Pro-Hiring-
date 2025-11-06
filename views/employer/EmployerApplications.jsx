"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Award,
  Eye,
  FileText,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  TrendingUp,
  Users,
  Download,
  RefreshCw,
  ChevronDown,
  User,
  Building2,
} from "lucide-react";
import { applicationService } from "@/services/applicationService";
import ScheduleInterviewDialog from "@/views/employer/ScheduleInterviewDialog";
import InterviewManagementModal from "@/views/employer/InterviewManagementModal";
import HireCandidateModal from "@/views/employer/HireCandidateModal";
import InterviewDashboard from "@/views/employer/InterviewDashboard";

const STATUS_CONFIG = {
  applied: {
    label: "New",
    color: "bg-blue-500",
    icon: Sparkles,
    gradient: "from-blue-500 to-cyan-500",
  },
  reviewed: {
    label: "Reviewed",
    color: "bg-cyan-500",
    icon: Eye,
    gradient: "from-cyan-500 to-teal-500",
  },
  interview: {
    label: "Interview",
    color: "bg-purple-500",
    icon: Calendar,
    gradient: "from-purple-500 to-pink-500",
  },
  hired: {
    label: "Hired",
    color: "bg-green-500",
    icon: Award,
    gradient: "from-green-500 to-emerald-500",
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-500",
    icon: XCircle,
    gradient: "from-red-500 to-rose-500",
  },
};

export default function ApplicationManagementNew() {
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [openMenuId, setOpenMenuId] = useState(null);

  // Modals
  const [scheduleApp, setScheduleApp] = useState(null);
  const [manageInterviewApp, setManageInterviewApp] = useState(null);
  const [hireApp, setHireApp] = useState(null);

  // Handle URL query parameter
  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "interviews") {
      setActiveView("interviews");
    }
  }, [searchParams]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await applicationService.employerMyApplications();
      const apps = res?.data || [];
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const counts = applications.reduce((acc, app) => {
      const key = app.status || "applied";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    counts.total = applications.length;
    return counts;
  }, [applications]);

  const filtered = useMemo(() => {
    let result = [...applications];

    if (statusFilter !== "all") {
      result = result.filter((app) => app.status === statusFilter);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (app) =>
          app.studentId?.firstName?.toLowerCase().includes(searchLower) ||
          app.studentId?.lastName?.toLowerCase().includes(searchLower) ||
          app.studentId?.email?.toLowerCase().includes(searchLower) ||
          app.jobId?.title?.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "name")
        return (a.studentId?.firstName || "").localeCompare(
          b.studentId?.firstName || ""
        );
      return 0;
    });

    return result;
  }, [applications, statusFilter, search, sortBy]);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await applicationService.updateStatus(applicationId, newStatus);
      setApplications(
        applications.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      setOpenMenuId(null);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleHireCandidate = async (applicationId, hireData) => {
    try {
      await applicationService.hireCandidate(applicationId, hireData);
      setApplications(
        applications.map((app) =>
          app._id === applicationId
            ? { ...app, status: "hired", hireData }
            : app
        )
      );
      setHireApp(null);
    } catch (error) {
      console.error("Error hiring candidate:", error);
    }
  };

  if (activeView === "interviews") {
    return <InterviewDashboard />;
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0118 0%, #1a0a2e 50%, #0a0118 100%)",
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                Application Management
              </h1>
              <p className="text-white/60 text-sm md:text-base">
                Track and manage all candidate applications
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveView("applications")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeView === "applications"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="hidden sm:inline">Applications</span>
              </button>
              <button
                onClick={() => setActiveView("interviews")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeView === "interviews"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline">Interviews</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                key: "total",
                label: "Total",
                icon: Users,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                key: "applied",
                label: "New",
                icon: Sparkles,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                key: "reviewed",
                label: "Reviewed",
                icon: Eye,
                gradient: "from-cyan-500 to-teal-500",
              },
              {
                key: "interview",
                label: "Interview",
                icon: Calendar,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                key: "hired",
                label: "Hired",
                icon: Award,
                gradient: "from-green-500 to-emerald-500",
              },
              {
                key: "rejected",
                label: "Rejected",
                icon: XCircle,
                gradient: "from-red-500 to-rose-500",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              const isActive = statusFilter === stat.key;
              return (
                <button
                  key={stat.key}
                  onClick={() =>
                    setStatusFilter(
                      statusFilter === stat.key ? "all" : stat.key
                    )
                  }
                  className={`relative p-5 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isActive ? "shadow-2xl" : "hover:shadow-xl"
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${
                          stat.gradient.split(" ")[1]
                        }, ${stat.gradient.split(" ")[3]})`
                      : "rgba(255,255,255,0.05)",
                    border: isActive
                      ? "2px solid rgba(255,255,255,0.3)"
                      : "2px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? "text-white" : "text-white/60"
                      }`}
                    />
                    <span
                      className={`text-2xl font-black ${
                        isActive ? "text-white" : "text-white/80"
                      }`}
                    >
                      {stats[stat.key] || 0}
                    </span>
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  >
                    {stat.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates, jobs, emails..."
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>

            {/* Refresh */}
            <button
              onClick={fetchApplications}
              className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/60 font-medium">
                Loading applications...
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No Applications Found
            </h3>
            <p className="text-white/60">
              Try adjusting your filters or search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((app) => (
              <ApplicationCard
                key={app._id}
                application={app}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                onScheduleInterview={() => setScheduleApp(app)}
                onManageInterview={() => setManageInterviewApp(app)}
                onHire={() => setHireApp(app)}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {scheduleApp && (
        <ScheduleInterviewDialog
          app={scheduleApp}
          onClose={() => setScheduleApp(null)}
          onScheduled={() => {
            fetchApplications();
            setScheduleApp(null);
          }}
        />
      )}

      {manageInterviewApp && manageInterviewApp.interviewData && (
        <InterviewManagementModal
          interview={manageInterviewApp.interviewData}
          application={manageInterviewApp}
          onClose={() => setManageInterviewApp(null)}
          onUpdate={async (id, data) => {
            console.log("Update interview:", id, data);
          }}
          onReschedule={(interview) => {
            setManageInterviewApp(null);
            setScheduleApp(manageInterviewApp);
          }}
          onCancel={async (id) => {
            console.log("Cancel interview:", id);
          }}
          onComplete={async (id) => {
            console.log("Complete interview:", id);
          }}
        />
      )}

      {hireApp && (
        <HireCandidateModal
          application={hireApp}
          onClose={() => setHireApp(null)}
          onConfirm={handleHireCandidate}
        />
      )}
    </div>
  );
}

function ApplicationCard({
  application,
  openMenuId,
  setOpenMenuId,
  onScheduleInterview,
  onManageInterview,
  onHire,
  onStatusUpdate,
}) {
  const candidate = application.studentId || {};
  const job = application.jobId || {};
  const statusConfig =
    STATUS_CONFIG[application.status] || STATUS_CONFIG.applied;
  const StatusIcon = statusConfig.icon;
  const isMenuOpen = openMenuId === application._id;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all hover:shadow-2xl hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-4">
        {/* Left: Candidate Info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-bold text-lg">
              {candidate.firstName?.charAt(0)}
              {candidate.lastName?.charAt(0)}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-lg font-bold text-white">
                {candidate.firstName} {candidate.lastName}
              </h3>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${statusConfig.color} flex items-center gap-1.5`}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                {statusConfig.label}
              </span>
            </div>

            <p className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {job.title}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{candidate.email}</span>
              </div>
              {candidate.phone && (
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{candidate.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>
                  {new Date(application.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions Menu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setOpenMenuId(isMenuOpen ? null : application._id)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500 transition-all"
          >
            <MoreVertical className="w-5 h-5 text-white" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpenMenuId(null)}
              />
              <div className="absolute right-0 top-12 z-50 w-56 bg-slate-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                {/* View Resume */}
                {application.resumeUrl && (
                  <a
                    href={application.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all"
                  >
                    <FileText className="w-4 h-4 text-teal-400" />
                    <span className="font-medium">View Resume</span>
                  </a>
                )}

                {/* Schedule/Update Interview */}
                {["applied", "reviewed", "interview"].includes(
                  application.status
                ) && (
                  <button
                    onClick={() => {
                      onScheduleInterview();
                      setOpenMenuId(null);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all"
                  >
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">
                      {application.hasInterview
                        ? "Update Interview"
                        : "Schedule Interview"}
                    </span>
                  </button>
                )}

                {/* Manage Interview */}
                {application.hasInterview && application.interviewData && (
                  <button
                    onClick={() => {
                      onManageInterview();
                      setOpenMenuId(null);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="font-medium">Manage Interview</span>
                  </button>
                )}

                {/* Hire Candidate */}
                {application.status === "interview" && (
                  <button
                    onClick={() => {
                      onHire();
                      setOpenMenuId(null);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all"
                  >
                    <Award className="w-4 h-4 text-green-400" />
                    <span className="font-medium">Hire Candidate</span>
                  </button>
                )}

                <div className="border-t border-white/10" />

                {/* Status Updates */}
                <div className="px-2 py-2">
                  <p className="px-2 py-1 text-xs font-semibold text-white/40 uppercase">
                    Change Status
                  </p>
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => {
                    if (status === application.status) return null;
                    const Icon = config.icon;
                    return (
                      <button
                        key={status}
                        onClick={() => {
                          onStatusUpdate(application._id, status);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: config.color.replace("bg-", "#") }}
                        />
                        <span className="font-medium text-sm">
                          {config.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
