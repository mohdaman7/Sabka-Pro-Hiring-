"use client";

import { useEffect, useState } from "react";
import { collabService } from "@/services/collabService";
import { Users, FileText, MessageSquare, Settings, Calendar, ChevronRight, Clock, TrendingUp, Zap } from "lucide-react";

const typeIcon = {
  team_member_added: Users,
  team_member_removed: Users,
  team_member_role_changed: Settings,
  candidate_note_added: MessageSquare,
  candidate_note_updated: MessageSquare,
  application_status_changed: FileText,
  interview_scheduled: Calendar,
  interview_rescheduled: Calendar,
  interview_cancelled: Calendar,
  job_posted: FileText,
  job_updated: FileText,
  job_status_changed: FileText,
  saved_view_created: Settings,
  saved_view_updated: Settings,
  saved_view_deleted: Settings,
};

function formatDate(d) {
  try {
    const date = new Date(d);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch { return ""; }
}

function getActivityColor(type) {
  if (type.includes("team")) return { bg: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/30", icon: "text-blue-400" };
  if (type.includes("candidate")) return { bg: "from-emerald-500/20 to-emerald-600/20", border: "border-emerald-500/30", icon: "text-emerald-400" };
  if (type.includes("application")) return { bg: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30", icon: "text-purple-400" };
  if (type.includes("interview")) return { bg: "from-orange-500/20 to-orange-600/20", border: "border-orange-500/30", icon: "text-orange-400" };
  if (type.includes("job")) return { bg: "from-pink-500/20 to-pink-600/20", border: "border-pink-500/30", icon: "text-pink-400" };
  return { bg: "from-slate-500/20 to-slate-600/20", border: "border-slate-500/30", icon: "text-slate-400" };
}

export default function EmployerActivity() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await collabService.getActivity({ limit: 50 });
        setItems(res.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="relative min-h-screen p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: "rgba(128,55,145,0.12)" }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: "rgba(184,123,209,0.10)" }} />
      </div>

      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#803791] to-[#6a2a6f] border border-[#b87bd1]/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#b87bd1]/5 to-transparent opacity-50" />
        <div className="relative p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg bg-white/10 border border-white/20">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">Activity Timeline</h1>
              <p className="text-white/70 text-sm sm:text-base">Track all team and hiring activities in real-time</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold text-white/80">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        <div className="relative rounded-xl p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1">Total Activities</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{items.length}</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="relative rounded-xl p-4 sm:p-5 md:p-6 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1">This Month</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{items.filter(i => new Date(i.createdAt).getMonth() === new Date().getMonth()).length}</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="relative rounded-xl p-4 sm:p-5 md:p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 shadow-lg sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1">Last 7 Days</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{items.filter(i => new Date() - new Date(i.createdAt) < 7 * 24 * 60 * 60 * 1000).length}</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="relative rounded-xl border border-white/10 bg-white/5 shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/10">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-[#803791] to-[#b87bd1] rounded-full" />
            Recent Activities
          </h2>
        </div>

        <div className="divide-y divide-white/10">
          {loading ? (
            <div className="p-6 sm:p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#b87bd1]"></div>
              <p className="text-white/70 mt-3 text-sm">Loading activities...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="p-6 sm:p-8 text-center">
              <Clock className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/60 text-sm">No activity yet. Start by posting a job or adding team members!</p>
            </div>
          ) : (
            <div>
              {items.map((a) => {
                const Icon = typeIcon[a.type] || ChevronRight;
                const colors = getActivityColor(a.type);
                return (
                  <div key={a._id} className="p-3 sm:p-4 md:p-5 hover:bg-white/5 transition-colors">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${colors.bg} border ${colors.border} shadow-lg`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
                            {a.type.replace(/_/g, " ").charAt(0).toUpperCase() + a.type.replace(/_/g, " ").slice(1)}
                          </span>
                          <span className="text-xs sm:text-sm text-white/50 font-medium">{formatDate(a.createdAt)}</span>
                        </div>
                        <p className="text-white/90 text-sm sm:text-base font-medium mb-1">
                          {a.meta?.message || a.target?.label || "Activity recorded"}
                        </p>
                        <p className="text-white/50 text-xs sm:text-sm">
                          by <span className="font-semibold text-white/70">{a.actorId?.firstName} {a.actorId?.lastName}</span>
                        </p>
                      </div>
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-[#803791] to-[#b87bd1] mt-2 flex-shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
