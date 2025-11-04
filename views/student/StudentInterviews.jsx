"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Search,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Bell,
  TrendingUp,
  Award,
  AlertCircle,
  XCircle,
  CalendarX,
  Filter,
  Download,
  Share2,
  ChevronRight,
  Users,
  Timer,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { applicationService } from "@/services/applicationService";

export default function InterviewsPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await applicationService.studentMyApplications({ status: "interview", limit: 100 });
        if (!mounted) return;
        const apps = res?.data || [];
        setApplications(apps);
        setStats(res?.stats || {});
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || "Failed to load interviews");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Helper function to check if interview is expired
  const isInterviewExpired = (scheduledAt) => {
    if (!scheduledAt) return false;
    const interviewDate = new Date(scheduledAt);
    const now = new Date();
    return interviewDate < now;
  };

  // Helper function to get time until interview
  const getTimeUntilInterview = (scheduledAt) => {
    if (!scheduledAt) return null;
    const interviewDate = new Date(scheduledAt);
    const now = new Date();
    const diff = interviewDate - now;
    
    if (diff < 0) return "Expired";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const interviews = useMemo(() => {
    return (applications || [])
      .filter((a) => a.interview)
      .map((a) => {
        const when = a.interview?.scheduledAt ? new Date(a.interview.scheduledAt) : null;
        const company = a.jobId?.employerId?.employerProfile?.company?.name || a.jobId?.employerId?.company?.name || a.jobId?.company?.name || "Company";
        const position = a.jobId?.title || "Position";
        const type = a.interview?.type || "video";
        const isExpired = when && isInterviewExpired(a.interview.scheduledAt);
        
        // Determine status with expired check
        let status = "upcoming";
        if (a.interview?.status === "completed") {
          status = "completed";
        } else if (a.interview?.status === "cancelled") {
          status = "cancelled";
        } else if (isExpired) {
          status = "expired";
        }
        
        return {
          id: a._id,
          company,
          position,
          type,
          date: when ? when.toDateString() : "",
          time: when ? when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + (a.interview?.durationMinutes ? ` (${a.interview.durationMinutes} min)` : "") : "",
          scheduledAt: a.interview?.scheduledAt,
          status,
          interviewer: a.interview?.panel?.[0]?.name || "Interviewer",
          panel: a.interview?.panel || [],
          round: a.interview?.round || "Interview",
          logo: "/placeholder.svg",
          meetingLink: a.interview?.meetingLink,
          notes: a.interview?.notes,
          location: a.interview?.location,
          timezone: a.interview?.timezone,
          durationMinutes: a.interview?.durationMinutes,
          result: a.interview?.status === "completed" ? a.interview?.feedback ? "Completed" : "Completed" : undefined,
          feedback: a.interview?.feedback,
          timeUntil: when ? getTimeUntilInterview(a.interview.scheduledAt) : null,
          isExpired,
        };
      })
      .sort((a, b) => {
        // Sort: upcoming first, then by date
        if (a.status === "upcoming" && b.status !== "upcoming") return -1;
        if (a.status !== "upcoming" && b.status === "upcoming") return 1;
        if (a.scheduledAt && b.scheduledAt) {
          return new Date(a.scheduledAt) - new Date(b.scheduledAt);
        }
        return 0;
      });
  }, [applications]);

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "phone":
        return <Phone className="w-4 h-4" />;
      case "onsite":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "upcoming":
        return {
          color: "from-green-500/20 to-emerald-500/20",
          border: "border-green-500/30",
          text: "text-green-400",
          bg: "bg-green-500/10",
          icon: Bell,
          label: "Upcoming"
        };
      case "completed":
        return {
          color: "from-blue-500/20 to-cyan-500/20",
          border: "border-blue-500/30",
          text: "text-blue-400",
          bg: "bg-blue-500/10",
          icon: CheckCircle2,
          label: "Completed"
        };
      case "cancelled":
        return {
          color: "from-amber-500/20 to-orange-500/20",
          border: "border-amber-500/30",
          text: "text-amber-400",
          bg: "bg-amber-500/10",
          icon: XCircle,
          label: "Cancelled"
        };
      case "expired":
        return {
          color: "from-red-500/20 to-rose-500/20",
          border: "border-red-500/30",
          text: "text-red-400",
          bg: "bg-red-500/10",
          icon: CalendarX,
          label: "Expired"
        };
      default:
        return {
          color: "from-slate-500/20 to-gray-500/20",
          border: "border-slate-500/30",
          text: "text-slate-400",
          bg: "bg-slate-500/10",
          icon: AlertCircle,
          label: "Pending"
        };
    }
  };

  const filteredInterviews = interviews.filter((interview) => {
    const matchesFilter = filter === "all" || interview.status === filter;
    const matchesSearch =
      interview.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate stats
  const statsData = {
    total: interviews.length,
    upcoming: interviews.filter(i => i.status === "upcoming").length,
    completed: interviews.filter(i => i.status === "completed").length,
    expired: interviews.filter(i => i.status === "expired").length,
    cancelled: interviews.filter(i => i.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 bg-gradient-to-r from-[#803791]/20 to-[#b87bd1]/20 border border-[#b87bd1]/30">
            <Calendar className="w-4 h-4 text-[#b87bd1]" />
            <span className="text-white">Interview Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            Your Interview Dashboard
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Stay organized and prepared with all your interview schedules, reminders, and important dates
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total", value: statsData.total, icon: Calendar, color: "from-purple-500 to-blue-500" },
            { label: "Upcoming", value: statsData.upcoming, icon: Bell, color: "from-green-500 to-emerald-500" },
            { label: "Completed", value: statsData.completed, icon: Award, color: "from-blue-500 to-cyan-500" },
            { label: "Expired", value: statsData.expired, icon: CalendarX, color: "from-red-500 to-rose-500" },
            { label: "Cancelled", value: statsData.cancelled, icon: XCircle, color: "from-amber-500 to-orange-500" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative group rounded-2xl p-4 sm:p-6 overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-[#b87bd1]/30 transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-white/60 font-medium">{stat.label}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8"
        >
          <div className="flex gap-2 flex-wrap">
            {["all", "upcoming", "completed", "expired", "cancelled"].map((status) => (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                size="sm"
                className={
                  filter === status
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg hover:shadow-[#b87bd1]/50 rounded-xl font-semibold"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white rounded-xl font-medium"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <Input
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-[#b87bd1] rounded-xl"
            />
          </div>
        </motion.div>

        {/* Interviews List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredInterviews.map((interview, index) => {
              const statusConfig = getStatusConfig(interview.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card className="relative group rounded-2xl p-6 overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-[#b87bd1]/30 transition-all">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                    <div className="relative z-10 flex flex-col lg:flex-row gap-6">
                      {/* Company Logo with Status Badge */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                            <img
                              src={interview.logo || "/placeholder.svg"}
                              alt={interview.company}
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                          {/* Status Badge */}
                          <div className={`absolute -bottom-2 -right-2 ${statusConfig.bg} border-2 ${statusConfig.border} rounded-lg px-2 py-1 flex items-center gap-1`}>
                            <StatusIcon className={`w-3 h-3 ${statusConfig.text}`} />
                          </div>
                        </div>
                      </div>

                      {/* Interview Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#b87bd1] transition-colors">
                              {interview.position}
                            </h3>
                            <p className="text-white/70 font-medium flex items-center gap-2">
                              {interview.company}
                              {interview.panel.length > 1 && (
                                <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {interview.panel.length} interviewers
                                </span>
                              )}
                            </p>
                          </div>
                          <Badge className={`${statusConfig.border} ${statusConfig.bg} ${statusConfig.text} border-2 font-bold px-4 py-1.5 rounded-xl flex items-center gap-2`}>
                            <StatusIcon className="w-4 h-4" />
                            {statusConfig.label}
                          </Badge>
                        </div>

                        {/* Date, Time, and Countdown */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#803791] to-[#b87bd1]">
                              <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs text-white/60 font-medium">Date</p>
                              <p className="text-sm font-bold text-white">{interview.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
                              <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs text-white/60 font-medium">Time</p>
                              <p className="text-sm font-bold text-white">{interview.time}</p>
                            </div>
                          </div>
                          {interview.timeUntil && interview.status === "upcoming" && (
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500">
                                <Timer className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-green-400 font-medium">Starts in</p>
                                <p className="text-sm font-bold text-white">{interview.timeUntil}</p>
                              </div>
                            </div>
                          )}
                          {interview.status === "expired" && (
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-red-500 to-rose-500">
                                <AlertTriangle className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-red-400 font-medium">Status</p>
                                <p className="text-sm font-bold text-white">Time Passed</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Additional Details */}
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                            {getTypeIcon(interview.type)}
                            <span className="capitalize text-sm font-medium text-white/85">{interview.type}</span>
                          </div>
                          {interview.timezone && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                              <Clock className="w-4 h-4 text-white/60" />
                              <span className="text-sm font-medium text-white/85">{interview.timezone}</span>
                            </div>
                          )}
                          {interview.interviewer && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                              <span className="text-sm text-white/60">with</span>
                              <span className="text-sm font-semibold text-white">{interview.interviewer}</span>
                            </div>
                          )}
                        </div>

                        {/* Notes/Reminders */}
                        {interview.notes && (
                          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#b87bd1]/10 border border-[#b87bd1]/20">
                            <MessageSquare className="w-5 h-5 text-[#b87bd1] mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-[#b87bd1] font-semibold mb-1">Interview Notes</p>
                              <p className="text-sm text-white/85">{interview.notes}</p>
                            </div>
                          </div>
                        )}

                        {/* Location */}
                        {interview.location && (
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <MapPin className="w-4 h-4 text-white/50" />
                            <span className="font-medium">{interview.location}</span>
                          </div>
                        )}

                        {/* Feedback */}
                        {interview.feedback && (
                          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-sm font-semibold text-white">Feedback Received</span>
                          </div>
                        )}

                        {/* Expired Warning */}
                        {interview.status === "expired" && (
                          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-red-400 mb-1">Interview Time Passed</p>
                              <p className="text-xs text-white/70">This interview was scheduled for {interview.date} at {interview.time}. Please contact the employer if you need to reschedule.</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2 flex-shrink-0">
                        {interview.status === "upcoming" && interview.meetingLink && (
                          <a
                            href={interview.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:from-[#6d2d7a] hover:to-[#a066b8] text-white rounded-xl font-semibold shadow-lg hover:shadow-[#b87bd1]/50 transition-all px-6 py-3 text-sm gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Join Now
                          </a>
                        )}
                        <Button
                          onClick={() => setSelectedInterview(interview)}
                          variant="outline"
                          size="sm"
                          className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredInterviews.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-dashed border-white/20 rounded-2xl">
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#803791]/20 to-[#b87bd1]/20 border-2 border-[#b87bd1]/30 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-[#b87bd1]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No interviews found</h3>
                <p className="text-white/60">
                  {filter !== "all" 
                    ? `No ${filter} interviews at the moment`
                    : "Try adjusting your filters or search query"}
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#b87bd1]/30 border-t-[#b87bd1] rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
