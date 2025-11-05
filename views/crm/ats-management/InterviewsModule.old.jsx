"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, Video, Phone, MapPin, Users, Plus, Eye, Edit, X, CheckCircle, AlertCircle, Search, Filter } from "lucide-react";
import { atsManagementService } from "@/services/atsManagementService";
import { customToast } from "@/components/ui/toast";

const INTERVIEW_TYPES = {
  video: { label: "Video", icon: Video, color: "indigo" },
  phone: { label: "Phone", icon: Phone, color: "blue" },
  onsite: { label: "On-site", icon: MapPin, color: "purple" },
  technical: { label: "Technical", icon: Users, color: "amber" },
  hr: { label: "HR Round", icon: Users, color: "green" },
  panel: { label: "Panel", icon: Users, color: "red" },
};

const STATUS_CONFIG = {
  scheduled: { label: "Scheduled", color: "bg-blue-500", bgLight: "bg-blue-50", textColor: "text-blue-600" },
  rescheduled: { label: "Rescheduled", color: "bg-amber-500", bgLight: "bg-amber-50", textColor: "text-amber-600" },
  completed: { label: "Completed", color: "bg-green-500", bgLight: "bg-green-50", textColor: "text-green-600" },
  cancelled: { label: "Cancelled", color: "bg-red-500", bgLight: "bg-red-50", textColor: "text-red-600" },
  "no-show": { label: "No Show", color: "bg-gray-500", bgLight: "bg-gray-50", textColor: "text-gray-600" },
};

export default function InterviewsModule() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "", type: "", page: 1, limit: 20 });
  const [stats, setStats] = useState({ scheduled: 0, completed: 0, cancelled: 0, todayCount: 0 });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchInterviews(); }, [filters.page, filters.status, filters.type]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await atsManagementService.getAllInterviews(filters);
      if (response.success) {
        setInterviews(response.data.interviews);
        const statusCounts = response.data.statusCounts;
        setStats({
          scheduled: statusCounts.scheduled || 0,
          completed: statusCounts.completed || 0,
          cancelled: statusCounts.cancelled || 0,
          todayCount: response.data.todayCount || 0,
        });
      }
    } catch (error) { console.error("Error:", error); customToast.error("Failed to fetch interviews"); } finally { setLoading(false); }
  };

  const handleStatusFilter = (status) => { setFilters({ ...filters, status: filters.status === status ? "" : status, page: 1 }); };
  const handleTypeFilter = (type) => { setFilters({ ...filters, type: filters.type === type ? "" : type, page: 1 }); };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(128,55,145,0.12)", animation: "pulse 8s ease-in-out infinite" }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: "rgba(184,123,209,0.08)", animation: "float 15s ease-in-out infinite" }} />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(240,194,238,0.05)", animation: "float 12s ease-in-out infinite reverse" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_50%)]" />
      </div>

      <div className="relative p-4 md:p-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Interview Scheduler</h1>
            <p className="text-white/70">Schedule, manage, and track all candidate interviews</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-lg">
            <Plus className="w-5 h-5" />Schedule Interview
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { key: 'todayCount', label: "Today's Interviews", icon: Calendar, color: 'indigo' },
            { key: 'scheduled', label: 'Scheduled', icon: Clock, color: 'blue' },
            { key: 'completed', label: 'Completed', icon: CheckCircle, color: 'green' },
            { key: 'cancelled', label: 'Cancelled', icon: AlertCircle, color: 'red' },
          ].map((stat) => (
            <div key={stat.key} onClick={() => stat.key !== 'todayCount' && handleStatusFilter(stat.key)}
              className={`rounded-2xl bg-white/5 border p-5 cursor-pointer hover:shadow-lg hover:scale-105 transition-all ${
                filters.status === stat.key ? 'border-purple-500 shadow-lg' : 'border-[#803791]/10'
              }`}>
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats[stat.key] || 0}</div>
              <div className="text-sm font-medium text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-semibold text-white/70">Interview Type:</span>
          {Object.entries(INTERVIEW_TYPES).map(([key, config]) => (
            <button key={key} onClick={() => handleTypeFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                filters.type === key
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 border border-[#803791]/20 text-white hover:bg-white/10'
              }`}>
              <config.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{config.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-[#803791]/10 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : interviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Calendar className="w-16 h-16 text-white/40 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Interviews Scheduled</h3>
            <p className="text-white/60">Schedule your first interview to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {interviews.map((interview) => (
              <div key={interview._id} className="p-5 rounded-xl bg-white/5 border border-[#803791]/10 hover:border-purple-500/30 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                      {interview.candidateId?.firstName?.[0]}{interview.candidateId?.lastName?.[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{interview.candidateId?.firstName} {interview.candidateId?.lastName}</div>
                      <div className="text-sm text-white/60">{interview.jobId?.title}</div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${STATUS_CONFIG[interview.status]?.bgLight} ${STATUS_CONFIG[interview.status]?.textColor}`}>
                    {STATUS_CONFIG[interview.status]?.label}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-white/40" />
                    <span className="text-white/80 font-medium">{new Date(interview.scheduledAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-white/40" />
                    <span className="text-white/80 font-medium">{new Date(interview.scheduledAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} ({interview.durationMinutes}min)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {INTERVIEW_TYPES[interview.type]?.icon && (() => {
                      const IconComponent = INTERVIEW_TYPES[interview.type].icon;
                      return <IconComponent className="w-4 h-4 text-white/40" />;
                    })()}
                    <span className="text-white/80 font-medium">{INTERVIEW_TYPES[interview.type]?.label}</span>
                  </div>
                  {interview.interviewers && interview.interviewers.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-white/40" />
                      <span className="text-white/70">{interview.interviewers.length} Interviewer(s)</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600/20 text-purple-300 font-semibold hover:bg-purple-600/30 transition-colors">
                    <Eye className="w-4 h-4" />View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/70 font-semibold hover:bg-white/10 transition-colors">
                    <Edit className="w-4 h-4" />Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
