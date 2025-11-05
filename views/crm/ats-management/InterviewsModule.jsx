"use client";
import { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  List,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Video,
  Phone,
  MapPin,
  User,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { atsManagementService } from "@/services/atsManagementService";
import { customToast } from "@/components/ui/toast";
import InterviewCalendarView from "./InterviewCalendarView";
import InterviewDetailModal from "./InterviewDetailModal";
import CreateInterviewModal from "./CreateInterviewModal";

const STATUS_CONFIG = {
  scheduled: { label: "Scheduled", color: "bg-blue-500", icon: Clock },
  completed: { label: "Completed", color: "bg-green-500", icon: CheckCircle },
  "no-show": { label: "No Show", color: "bg-gray-500", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-red-500", icon: XCircle },
};

const TYPE_ICONS = {
  video: Video,
  phone: Phone,
  onsite: MapPin,
};

export default function InterviewsModuleNew() {
  const [view, setView] = useState("calendar"); // calendar or list
  const [interviews, setInterviews] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
    page: 1,
    limit: 20,
  });
  const [stats, setStats] = useState({
    scheduled: 0,
    completed: 0,
    cancelled: 0,
    todayCount: 0,
    upcomingCount: 0,
  });
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [interviewToEdit, setInterviewToEdit] = useState(null);

  useEffect(() => {
    fetchInterviews();
    fetchApplications();
  }, [filters.page, filters.status, filters.type]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await atsManagementService.getAllInterviews(filters);
      if (response.success) {
        setInterviews(response.data.interviews || []);
        setPagination(response.data.pagination || { total: 0, page: 1, pages: 1 });
        
        // Calculate stats
        const statusCounts = response.data.statusCounts || {};
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        const todayInterviews = (response.data.interviews || []).filter((int) => {
          const intDate = new Date(int.scheduledDate);
          return intDate >= today && intDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
        });

        const upcomingInterviews = (response.data.interviews || []).filter((int) => {
          return new Date(int.scheduledDate) > now && int.status === "scheduled";
        });

        setStats({
          scheduled: statusCounts.scheduled || 0,
          completed: statusCounts.completed || 0,
          cancelled: statusCounts.cancelled || 0,
          todayCount: todayInterviews.length,
          upcomingCount: upcomingInterviews.length,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      customToast.error("Failed to fetch interviews");
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await atsManagementService.getAllApplications({ limit: 1000 });
      if (response.success) {
        setApplications(response.data.applications || []);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleStatusFilter = (status) => {
    setFilters({ ...filters, status: filters.status === status ? "" : status, page: 1 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInterviews();
  };

  const handleCreateInterview = async (data) => {
    try {
      await atsManagementService.createInterview(data);
      customToast.success("Interview scheduled successfully!");
      setShowCreateModal(false);
      fetchInterviews();
    } catch (error) {
      console.error("Error:", error);
      customToast.error("Failed to create interview");
    }
  };

  const handleUpdateInterview = async (id, data) => {
    try {
      await atsManagementService.updateInterview(id, data);
      customToast.success("Interview updated successfully!");
      fetchInterviews();
    } catch (error) {
      console.error("Error:", error);
      customToast.error("Failed to update interview");
    }
  };

  const handleReschedule = (interview) => {
    setInterviewToEdit(interview);
    setShowDetailModal(false);
    setShowCreateModal(true);
  };

  const handleCancel = async (id) => {
    if (confirm("Are you sure you want to cancel this interview?")) {
      try {
        await atsManagementService.cancelInterview(id, "Cancelled by admin");
        customToast.success("Interview cancelled");
        fetchInterviews();
        setShowDetailModal(false);
      } catch (error) {
        customToast.error("Failed to cancel interview");
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      await atsManagementService.completeInterview(id, {}, "pending");
      customToast.success("Interview marked as completed");
      fetchInterviews();
      setShowDetailModal(false);
    } catch (error) {
      customToast.error("Failed to complete interview");
    }
  };

  const handleInterviewClick = (interview) => {
    setSelectedInterview(interview);
    setShowDetailModal(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.12)", animation: "pulse 8s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.08)", animation: "float 15s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(240,194,238,0.05)", animation: "float 12s ease-in-out infinite reverse" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_50%)]" />
      </div>

      <div className="relative p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Interview Management</h1>
              <p className="text-white/70">Schedule, manage, and track all candidate interviews</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchInterviews}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-[#803791]/20 text-white font-semibold hover:bg-white/10 shadow-sm transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={() => {
                  setInterviewToEdit(null);
                  setShowCreateModal(true);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-lg transition-all hover:scale-105"
              >
                + Schedule Interview
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { key: "todayCount", label: "Today's Interviews", icon: CalendarIcon, color: "indigo" },
              { key: "upcomingCount", label: "Upcoming", icon: Clock, color: "blue" },
              { key: "scheduled", label: "Scheduled", icon: Clock, color: "blue" },
              { key: "completed", label: "Completed", icon: CheckCircle, color: "green" },
              { key: "cancelled", label: "Cancelled", icon: AlertCircle, color: "red" },
            ].map((stat) => (
              <div
                key={stat.key}
                onClick={() => stat.key !== "todayCount" && stat.key !== "upcomingCount" && handleStatusFilter(stat.key)}
                className={`rounded-2xl bg-white/5 border p-5 cursor-pointer hover:shadow-lg hover:scale-105 transition-all ${
                  filters.status === stat.key ? "border-purple-500 shadow-lg ring-2 ring-purple-500/50" : "border-[#803791]/10"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats[stat.key] || 0}</div>
                <div className="text-sm font-medium text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* View Toggle & Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-purple-500/20">
              <button
                onClick={() => setView("calendar")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  view === "calendar"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                Calendar
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  view === "list"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Search by candidate, job, or interviewer..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-[#803791]/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70 text-lg">Loading interviews...</p>
            </div>
          </div>
        ) : (
          <>
            {view === "calendar" ? (
              <InterviewCalendarView
                interviews={interviews}
                onInterviewClick={handleInterviewClick}
                onCreateInterview={() => setShowCreateModal(true)}
              />
            ) : (
              <InterviewListView
                interviews={interviews}
                onInterviewClick={handleInterviewClick}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
                pagination={pagination}
                onPageChange={(page) => setFilters({ ...filters, page })}
              />
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showDetailModal && selectedInterview && (
        <InterviewDetailModal
          interview={selectedInterview}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedInterview(null);
          }}
          onUpdate={handleUpdateInterview}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
          onComplete={handleComplete}
        />
      )}

      {showCreateModal && (
        <CreateInterviewModal
          interview={interviewToEdit}
          applications={applications}
          onClose={() => {
            setShowCreateModal(false);
            setInterviewToEdit(null);
          }}
          onSubmit={interviewToEdit ? (data) => handleUpdateInterview(interviewToEdit._id, data) : handleCreateInterview}
        />
      )}
    </div>
  );
}

// List View Component
function InterviewListView({ interviews, onInterviewClick, onReschedule, onCancel, pagination, onPageChange }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-purple-500/20">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/80">Candidate</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/80">Job Title</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/80">Date & Time</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/80">Type</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/80">Interviewer</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white/80">Status</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-white/80">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10">
            {interviews.length > 0 ? (
              interviews.map((interview) => {
                const StatusConfig = STATUS_CONFIG[interview.status] || STATUS_CONFIG.scheduled;
                const TypeIcon = TYPE_ICONS[interview.type] || Video;
                const StatusIcon = StatusConfig.icon;

                return (
                  <tr
                    key={interview._id}
                    className="hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => onInterviewClick(interview)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{interview.candidateName || "N/A"}</p>
                          <p className="text-white/50 text-xs">{interview.candidateEmail || ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-purple-400" />
                        <span className="text-white">{interview.jobTitle || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">
                        <p className="font-medium">
                          {interview.scheduledDate ? new Date(interview.scheduledDate).toLocaleDateString() : "N/A"}
                        </p>
                        <p className="text-white/50 text-xs">
                          {interview.scheduledDate
                            ? new Date(interview.scheduledDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                            : ""}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="w-4 h-4 text-purple-400" />
                        <span className="text-white capitalize">{interview.type || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white">{interview.interviewer || interview.interviewers?.join(", ") || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold ${StatusConfig.color}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {StatusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onInterviewClick(interview)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-purple-500/20 transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                        {interview.status === "scheduled" && (
                          <>
                            <button
                              onClick={() => onReschedule(interview)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-purple-500/20 transition-all"
                              title="Reschedule"
                            >
                              <Edit className="w-4 h-4 text-white" />
                            </button>
                            <button
                              onClick={() => onCancel(interview._id)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-red-500/20 hover:border-red-500 transition-all"
                              title="Cancel"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-white/60">
                  No interviews found. Click "Schedule Interview" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-purple-500/20">
          <p className="text-white/60 text-sm">
            Showing {(pagination.page - 1) * 20 + 1} to {Math.min(pagination.page * 20, pagination.total)} of {pagination.total}{" "}
            interviews
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-medium px-4">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
