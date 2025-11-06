"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  Users,
  Filter,
  Search,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Video,
  Phone,
  Building2,
  Target,
  Sparkles,
  ArrowRight,
  FileText,
  Award,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  MoreVertical,
} from "lucide-react";
import { applicationService } from "@/services/applicationService";
import ScheduleInterviewDialog from "@/views/employer/ScheduleInterviewDialog";
import InterviewManagementModal from "@/views/employer/InterviewManagementModal";
import HireCandidateModal from "@/views/employer/HireCandidateModal";
import { customToast } from "@/components/ui/toast";

const STAGE_CONFIG = {
  screening: { label: "Screening", color: "blue", icon: Users },
  technical: { label: "Technical", color: "purple", icon: FileText },
  hr: { label: "HR Round", color: "indigo", icon: MessageSquare },
  final: { label: "Final", color: "amber", icon: Award },
  cultural: { label: "Cultural Fit", color: "emerald", icon: Sparkles },
};

const STATUS_CONFIG = {
  scheduled: { label: "Scheduled", color: "blue", icon: Calendar },
  completed: { label: "Completed", color: "green", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "red", icon: XCircle },
  "no-show": { label: "No Show", color: "orange", icon: AlertCircle },
  rescheduled: { label: "Rescheduled", color: "amber", icon: Clock },
};

const TYPE_CONFIG = {
  video: { label: "Video", icon: Video, color: "blue" },
  phone: { label: "Phone", icon: Phone, color: "purple" },
  onsite: { label: "On-site", icon: Building2, color: "emerald" },
};

export default function InterviewDashboard({ onManageInterview, onScheduleInterview }) {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");
  const [expandedId, setExpandedId] = useState(null);
  const [viewMode, setViewMode] = useState("upcoming"); // upcoming, all, pending
  
  // Modals
  const [scheduleApp, setScheduleApp] = useState(null);
  const [manageInterviewApp, setManageInterviewApp] = useState(null);
  const [hireApp, setHireApp] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch all applications with interviews
      const res = await applicationService.employerMyApplications();
      const apps = res?.data || [];
      
      // Fetch interview data for each application
      const interviewPromises = apps.map(async (app) => {
        try {
          const interviewRes = await applicationService.getInterviewByApplicationId(app._id);
          if (interviewRes?.data) {
            return {
              ...interviewRes.data,
              application: app,
              candidate: app.studentId,
              job: app.jobId,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      });
      
      const interviewsData = await Promise.all(interviewPromises);
      const validInterviews = interviewsData.filter(Boolean);
      
      setInterviews(validInterviews);
    } catch (e) {
      console.error("Error fetching interviews:", e);
      setError("Failed to load interviews");
    } finally {
      setLoading(false);
    }
  };

  const handleHireCandidate = async (applicationId, hireData) => {
    try {
      await applicationService.hireCandidate(applicationId, hireData);
      fetchInterviews();
      setHireApp(null);
    } catch (error) {
      console.error("Error hiring candidate:", error);
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const now = new Date();
    
    return {
      total: interviews.length,
      upcoming: interviews.filter(i => 
        i.status === 'scheduled' && new Date(i.scheduledAt) > now
      ).length,
      completed: interviews.filter(i => i.status === 'completed').length,
      pending: interviews.filter(i => 
        i.status === 'scheduled' && new Date(i.scheduledAt) <= now
      ).length,
      cancelled: interviews.filter(i => i.status === 'cancelled').length,
      today: interviews.filter(i => {
        const interviewDate = new Date(i.scheduledAt);
        return interviewDate.toDateString() === now.toDateString();
      }).length,
    };
  }, [interviews]);

  // Filter and sort interviews
  const filteredInterviews = useMemo(() => {
    let filtered = [...interviews];
    const now = new Date();

    // View mode filter
    if (viewMode === "upcoming") {
      filtered = filtered.filter(i => 
        i.status === 'scheduled' && new Date(i.scheduledAt) > now
      );
    } else if (viewMode === "pending") {
      filtered = filtered.filter(i => 
        i.status === 'scheduled' && new Date(i.scheduledAt) <= now
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(i =>
        i.candidate?.firstName?.toLowerCase().includes(query) ||
        i.candidate?.lastName?.toLowerCase().includes(query) ||
        i.candidate?.email?.toLowerCase().includes(query) ||
        i.job?.title?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(i => i.status === statusFilter);
    }

    // Stage filter
    if (stageFilter !== "all") {
      filtered = filtered.filter(i => i.stage === stageFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(i => i.type === typeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.scheduledAt) - new Date(b.scheduledAt);
        case "date-desc":
          return new Date(b.scheduledAt) - new Date(a.scheduledAt);
        case "round-asc":
          return a.round - b.round;
        case "round-desc":
          return b.round - a.round;
        case "candidate":
          return `${a.candidate?.firstName} ${a.candidate?.lastName}`.localeCompare(
            `${b.candidate?.firstName} ${b.candidate?.lastName}`
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [interviews, searchQuery, statusFilter, stageFilter, typeFilter, sortBy, viewMode]);

  const getTimeUntil = (date) => {
    const now = new Date();
    const target = new Date(date);
    const diff = target - now;

    if (diff < 0) return "Overdue";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading interviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 space-y-6">
        {/* Header with View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              Interview Dashboard
            </h1>
            <p className="text-white/60 text-sm md:text-base">Track and manage all your interviews in one place</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => window.location.href = '/employer/applications'}
              className="px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/5"
            >
              <Users className="w-5 h-5" />
              <span className="hidden sm:inline">Applications</span>
            </button>
            <button
              className="px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden sm:inline">Interviews</span>
            </button>
          </div>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="Total"
          value={stats.total}
          icon={Users}
          color="slate"
          onClick={() => setViewMode("all")}
          active={viewMode === "all"}
        />
        <StatCard
          label="Upcoming"
          value={stats.upcoming}
          icon={Calendar}
          color="blue"
          onClick={() => setViewMode("upcoming")}
          active={viewMode === "upcoming"}
        />
        <StatCard
          label="Today"
          value={stats.today}
          icon={Clock}
          color="purple"
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          icon={AlertCircle}
          color="amber"
          onClick={() => setViewMode("pending")}
          active={viewMode === "pending"}
        />
        <StatCard
          label="Completed"
          value={stats.completed}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          label="Cancelled"
          value={stats.cancelled}
          icon={XCircle}
          color="red"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate or job..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-white/20 text-white focus:outline-none focus:border-purple-500 shadow-lg hover:border-purple-500/50 transition-all cursor-pointer"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(128,55,145,0.1), rgba(184,123,209,0.05))"
          }}
        >
          <option value="all" className="bg-[#1a1a2e] text-white">All Status</option>
          <option value="scheduled" className="bg-[#1a1a2e] text-white">Scheduled</option>
          <option value="completed" className="bg-[#1a1a2e] text-white">Completed</option>
          <option value="cancelled" className="bg-[#1a1a2e] text-white">Cancelled</option>
          <option value="no-show" className="bg-[#1a1a2e] text-white">No Show</option>
        </select>

        {/* Stage Filter */}
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-white/20 text-white focus:outline-none focus:border-purple-500 shadow-lg hover:border-purple-500/50 transition-all cursor-pointer"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(128,55,145,0.1), rgba(184,123,209,0.05))"
          }}
        >
          <option value="all" className="bg-[#1a1a2e] text-white">All Stages</option>
          <option value="screening" className="bg-[#1a1a2e] text-white">Screening</option>
          <option value="technical" className="bg-[#1a1a2e] text-white">Technical</option>
          <option value="hr" className="bg-[#1a1a2e] text-white">HR Round</option>
          <option value="final" className="bg-[#1a1a2e] text-white">Final</option>
          <option value="cultural" className="bg-[#1a1a2e] text-white">Cultural Fit</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-white/20 text-white focus:outline-none focus:border-purple-500 shadow-lg hover:border-purple-500/50 transition-all cursor-pointer"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(128,55,145,0.1), rgba(184,123,209,0.05))"
          }}
        >
          <option value="date-asc" className="bg-[#1a1a2e] text-white">Date: Earliest First</option>
          <option value="date-desc" className="bg-[#1a1a2e] text-white">Date: Latest First</option>
          <option value="round-asc" className="bg-[#1a1a2e] text-white">Round: Low to High</option>
          <option value="round-desc" className="bg-[#1a1a2e] text-white">Round: High to Low</option>
          <option value="candidate" className="bg-[#1a1a2e] text-white">Candidate: A-Z</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-white/60">
        <span>
          Showing {filteredInterviews.length} of {interviews.length} interviews
        </span>
        {(searchQuery || statusFilter !== "all" || stageFilter !== "all" || typeFilter !== "all") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setStageFilter("all");
              setTypeFilter("all");
            }}
            className="text-purple-400 hover:text-purple-300"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Interview Cards */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}

      {filteredInterviews.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white/60 mb-2">No interviews found</h3>
          <p className="text-white/40">
            {searchQuery || statusFilter !== "all" || stageFilter !== "all"
              ? "Try adjusting your filters"
              : "Schedule your first interview to get started"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <InterviewCard
              key={interview._id}
              interview={interview}
              expanded={expandedId === interview._id}
              onToggle={() => setExpandedId(expandedId === interview._id ? null : interview._id)}
              onManage={() => setManageInterviewApp(interview)}
              onSchedule={() => setScheduleApp(interview.application)}
              onHire={() => setHireApp(interview.application)}
              getTimeUntil={getTimeUntil}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {scheduleApp && (
        <ScheduleInterviewDialog
          app={scheduleApp}
          onClose={() => setScheduleApp(null)}
          onScheduled={() => {
            fetchInterviews();
            setScheduleApp(null);
          }}
        />
      )}

      {manageInterviewApp && (
        <InterviewManagementModal
          interview={manageInterviewApp}
          application={manageInterviewApp.application}
          onClose={() => setManageInterviewApp(null)}
          onUpdate={async (id, data) => {
            console.log("Update interview:", id, data);
            fetchInterviews();
          }}
          onReschedule={(interview) => {
            setManageInterviewApp(null);
            setScheduleApp(interview.application);
          }}
          onCancel={async (id) => {
            console.log("Cancel interview:", id);
            fetchInterviews();
          }}
          onComplete={async (id) => {
            console.log("Complete interview:", id);
            fetchInterviews();
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

function StatCard({ label, value, icon: Icon, color, onClick, active }) {
  const colorClasses = {
    slate: "from-slate-500 to-slate-600",
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    amber: "from-amber-500 to-orange-500",
    green: "from-green-500 to-emerald-500",
    red: "from-red-500 to-rose-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`p-4 rounded-xl border-2 transition-all ${
        active
          ? "border-purple-500 bg-purple-500/10 scale-105"
          : "border-white/10 bg-white/5 hover:border-white/20"
      } ${onClick ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="text-left">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-white/60">{label}</div>
        </div>
      </div>
    </button>
  );
}

function InterviewCard({ interview, expanded, onToggle, onManage, onSchedule, onHire, getTimeUntil, formatDate }) {
  const stageConfig = STAGE_CONFIG[interview.stage] || {};
  const statusConfig = STATUS_CONFIG[interview.status] || {};
  const typeConfig = TYPE_CONFIG[interview.type] || {};
  const StageIcon = stageConfig.icon || Target;
  const StatusIcon = statusConfig.icon || Calendar;
  const TypeIcon = typeConfig.icon || Video;

  const isUpcoming = interview.status === 'scheduled' && new Date(interview.scheduledAt) > new Date();
  const isPending = interview.status === 'scheduled' && new Date(interview.scheduledAt) <= new Date();

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Left: Candidate Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                {interview.candidate?.firstName?.[0]}{interview.candidate?.lastName?.[0]}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {interview.candidate?.firstName} {interview.candidate?.lastName}
                </h3>
                <p className="text-sm text-white/60">{interview.candidate?.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              {/* Job */}
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80">
                {interview.job?.title}
              </span>

              {/* Round */}
              <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400">
                Round {interview.round}
              </span>

              {/* Stage */}
              <span className={`px-3 py-1 rounded-lg bg-${stageConfig.color}-500/10 border border-${stageConfig.color}-500/20 text-sm text-${stageConfig.color}-400 flex items-center gap-1`}>
                <StageIcon className="w-3 h-3" />
                {stageConfig.label}
              </span>

              {/* Type */}
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60 flex items-center gap-1">
                <TypeIcon className="w-3 h-3" />
                {typeConfig.label}
              </span>

              {/* Status */}
              <span className={`px-3 py-1 rounded-lg bg-${statusConfig.color}-500/10 border border-${statusConfig.color}-500/20 text-sm text-${statusConfig.color}-400 flex items-center gap-1`}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
            </div>
          </div>

          {/* Right: Date & Actions */}
          <div className="text-right">
            <div className="text-sm text-white/60 mb-1">
              {formatDate(interview.scheduledAt)}
            </div>
            {isUpcoming && (
              <div className="text-lg font-semibold text-blue-400 mb-3">
                In {getTimeUntil(interview.scheduledAt)}
              </div>
            )}
            {isPending && (
              <div className="text-lg font-semibold text-amber-400 mb-3">
                {getTimeUntil(interview.scheduledAt)}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={onToggle}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                {expanded ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
              </button>
              <button
                onClick={onManage}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Manage
              </button>
              {interview.status === 'scheduled' && interview.application?.status === 'interview' && (
                <button
                  onClick={onHire}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  Hire
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-white/10 p-6 bg-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interview Details */}
            <div>
              <h4 className="text-sm font-semibold text-white/80 mb-3">Interview Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Duration:</span>
                  <span className="text-white">{interview.durationMinutes} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Timezone:</span>
                  <span className="text-white">{interview.timezone}</span>
                </div>
                {interview.meetingLink && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Meeting Link:</span>
                    <a
                      href={interview.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}
                {interview.location?.address && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Location:</span>
                    <span className="text-white">{interview.location.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Interviewers */}
            {interview.interviewers && interview.interviewers.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white/80 mb-3">Interviewers</h4>
                <div className="space-y-2">
                  {interview.interviewers.map((interviewer, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs">
                        {interviewer.name?.[0]}
                      </div>
                      <div>
                        <div className="text-white">{interviewer.name}</div>
                        <div className="text-white/60 text-xs">{interviewer.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {interview.notes && (
              <div className="md:col-span-2">
                <h4 className="text-sm font-semibold text-white/80 mb-2">Notes</h4>
                <p className="text-sm text-white/60">{interview.notes}</p>
              </div>
            )}

            {/* Evaluation (if completed) */}
            {interview.status === 'completed' && interview.evaluation && (
              <div className="md:col-span-2">
                <h4 className="text-sm font-semibold text-white/80 mb-3">Evaluation</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs text-white/60 mb-1">Technical</div>
                    <div className="text-xl font-bold text-white">{interview.evaluation.technicalSkills}/5</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs text-white/60 mb-1">Communication</div>
                    <div className="text-xl font-bold text-white">{interview.evaluation.communication}/5</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs text-white/60 mb-1">Problem Solving</div>
                    <div className="text-xl font-bold text-white">{interview.evaluation.problemSolving}/5</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs text-white/60 mb-1">Overall</div>
                    <div className="text-xl font-bold text-purple-400">{interview.evaluation.overall}/5</div>
                  </div>
                </div>
                {interview.evaluation.feedback && (
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs text-white/60 mb-2">Feedback</div>
                    <p className="text-sm text-white/80">{interview.evaluation.feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
