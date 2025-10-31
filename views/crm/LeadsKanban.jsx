"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  CircleDot,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  User,
  Users,
  TrendingUp,
  Zap,
  Eye,
  MoreVertical,
  Plus,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLeadViewModel } from "@/viewmodels/LeadViewModel";
import { customToast } from "@/components/ui/toast";

const STATUS_PIPELINE = [
  {
    id: "new",
    title: "New Leads",
    subtitle: "Fresh Inbound",
    icon: Sparkles,
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
    borderColor: "border-cyan-500/30",
    glowColor: "shadow-cyan-500/20",
    next: "contacted",
  },
  {
    id: "contacted",
    title: "Contacted",
    subtitle: "Initial Outreach",
    icon: MessageSquare,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
    borderColor: "border-purple-500/30",
    glowColor: "shadow-purple-500/20",
    next: "follow_up",
  },
  {
    id: "follow_up",
    title: "Follow-up",
    subtitle: "In Progress",
    icon: Clock,
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-amber-500/20",
    next: "proposal_sent",
  },
  {
    id: "proposal_sent",
    title: "Proposal Sent",
    subtitle: "Awaiting Response",
    icon: Mail,
    gradient: "from-indigo-500 to-blue-600",
    bgGradient: "from-indigo-500/10 via-blue-500/5 to-transparent",
    borderColor: "border-indigo-500/30",
    glowColor: "shadow-indigo-500/20",
    next: "negotiation",
  },
  {
    id: "negotiation",
    title: "Negotiation",
    subtitle: "Terms Discussion",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-emerald-500/20",
    next: "converted",
  },
  {
    id: "converted",
    title: "Converted",
    subtitle: "Won Deals",
    icon: CheckCircle2,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 via-emerald-500/5 to-transparent",
    borderColor: "border-green-500/30",
    glowColor: "shadow-green-500/20",
    next: null,
  },
  {
    id: "lost",
    title: "Lost",
    subtitle: "Not Converted",
    icon: CircleDot,
    gradient: "from-rose-500 to-red-600",
    bgGradient: "from-rose-500/10 via-red-500/5 to-transparent",
    borderColor: "border-rose-500/30",
    glowColor: "shadow-rose-500/20",
    next: null,
  },
];

function getInitials(lead) {
  const first = lead.firstName?.charAt(0) || "";
  const last = lead.lastName?.charAt(0) || "";
  return (first + last || "SP").toUpperCase();
}

function formatDate(date) {
  if (!date) return "No follow-up";
  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getScoreColor(score) {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-amber-400";
  return "text-rose-400";
}

export default function LeadsKanban() {
  const { leads, loading, fetchLeads, updateLeadStatus, addFollowUp } =
    useLeadViewModel();

  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchLeads({ sortBy: "updatedAt", sortOrder: "desc" });
  }, [fetchLeads]);

  const columns = useMemo(() => {
    return STATUS_PIPELINE.map((column) => ({
      ...column,
      leads: leads.filter((lead) => lead.status === column.id),
    }));
  }, [leads]);

  const stats = useMemo(() => {
    const active = leads.filter(
      (lead) => !["converted", "lost"].includes(lead.status)
    );
    const converted = leads.filter((lead) => lead.status === "converted");
    const conversionRate =
      leads.length > 0
        ? ((converted.length / leads.length) * 100).toFixed(1)
        : 0;

    return {
      active: active.length,
      converted: converted.length,
      total: leads.length,
      conversionRate,
    };
  }, [leads]);

  const handleAdvance = async (lead, targetStatus) => {
    if (!targetStatus) return;
    setUpdatingId(lead.id);
    const result = await updateLeadStatus(lead.id, targetStatus);
    setUpdatingId(null);
    if (result.success) {
      customToast.success(
        "Stage Updated",
        `${lead.firstName} moved to ${targetStatus.replace("_", " ")}`
      );
    } else {
      customToast.error(
        "Update Failed",
        result.error || "Unable to change stage"
      );
    }
  };

  const handleScheduleFollowUp = async (lead) => {
    const next = window.prompt(
      "Add follow-up note",
      "Call to discuss next steps"
    );
    if (!next) return;
    const date = window.prompt("Set follow-up date (YYYY-MM-DD HH:mm)", "");
    const payload = {
      type: "note",
      description: next,
    };
    if (date) {
      payload.nextAction = "follow_up";
      payload.nextActionDate = new Date(date).toISOString();
    }
    setUpdatingId(lead.id);
    const result = await addFollowUp(lead.id, payload);
    setUpdatingId(null);
    if (result.success) {
      customToast.success("Follow-up Logged", "Timeline updated");
    } else {
      customToast.error("Failed", result.error || "Could not log follow-up");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent">
      {/* Removed the floating effect circle */}

      <div className="relative mx-auto max-w-[1920px] px-6 py-6">
        {/* Header Section */}
        <div className="mb-8 space-y-6">
          {/* Navigation */}
          <Link
            href="/crm/leads"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Workspace
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Title & Description */}
            <div className="space-y-4 flex-1">
              <div className="mt-8">
                <h1 className="text-5xl font-black tracking-tight text-white">
                  Pipeline Kanban
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/60">
                  Visualize your entire sales funnel with real-time updates.
                  Track lead progression, identify bottlenecks, and accelerate
                  conversions across every stage.
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-white/70">Active Pipeline</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
                  <CalendarClock className="h-4 w-4 text-amber-400" />
                  <span className="text-white/70">Follow-up Scheduled</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-white/70">Converted</span>
                </div>
              </div>
            </div>

            {/* Right: Stats Cards */}
            <div className="grid grid-cols-2 gap-4 lg:w-auto">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:scale-105">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <p className="text-sm font-medium text-white/50">
                    Active Pipeline
                  </p>
                  <p className="mt-1 text-3xl font-black text-white">
                    {stats.active}
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:scale-105">
                <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="text-sm font-medium text-white/50">Converted</p>
                  <p className="mt-1 text-3xl font-black text-white">
                    {stats.converted}
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:scale-105 col-span-2">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/50">
                      Conversion Rate
                    </p>
                    <p className="mt-1 text-3xl font-black text-white">
                      {stats.conversionRate}%
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20">
                    <TrendingUp className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl">
          <div
            className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar"
            style={{ height: "calc(100vh - 400px)" }}
          >
            {columns.map((column) => {
              const Icon = column.icon;
              const isTerminal =
                column.id === "converted" || column.id === "lost";

              return (
                <div
                  key={column.id}
                  className="flex min-w-[340px] max-w-[380px] flex-1 flex-col"
                >
                  {/* Column Header */}
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl border backdrop-blur-xl mb-4 transition-all duration-300",
                      column.borderColor
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 bg-linear-to-br opacity-50",
                        column.bgGradient
                      )}
                    />

                    <div className="relative p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br shadow-lg",
                              column.gradient,
                              column.glowColor
                            )}
                          >
                            <Icon
                              className="h-6 w-6 text-white"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                              {column.subtitle}
                            </p>
                            <h3 className="text-xl font-bold text-white">
                              {column.title}
                            </h3>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "flex h-8 min-w-8 items-center justify-center rounded-xl border px-3 font-bold text-white backdrop-blur-xl",
                            column.borderColor
                          )}
                        >
                          {column.leads.length}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cards Container */}
                  <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                    {loading && column.leads.length === 0 ? (
                      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/5 p-8">
                        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-white/30" />
                        <p className="text-sm text-white/50">Loading...</p>
                      </div>
                    ) : column.leads.length === 0 ? (
                      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/5 p-8">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br",
                            column.gradient,
                            "opacity-50"
                          )}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <p className="text-center text-sm font-medium text-white/50">
                          No leads yet
                        </p>
                        <p className="text-center text-xs text-white/30">
                          Leads will appear here
                        </p>
                      </div>
                    ) : (
                      column.leads.map((lead) => (
                        <article
                          key={lead.id}
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:scale-[1.02]"
                        >
                          <div
                            className={cn(
                              "absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100",
                              column.bgGradient
                            )}
                          />

                          <div className="relative space-y-4">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="relative">
                                  <div
                                    className={cn(
                                      "absolute inset-0 rounded-xl blur-lg opacity-60",
                                      column.glowColor
                                    )}
                                  />
                                  <div
                                    className={cn(
                                      "relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br text-sm font-bold text-white shadow-lg",
                                      column.gradient
                                    )}
                                  >
                                    {getInitials(lead)}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-base font-bold text-white truncate">
                                    {lead.firstName} {lead.lastName}
                                  </h4>
                                  {lead.assignedTo && (
                                    <div className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
                                      <User className="h-3 w-3" />
                                      <span className="truncate">
                                        {lead.assignedTo.firstName}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {lead.score && (
                                <div className="flex flex-col items-end shrink-0">
                                  <span
                                    className={cn(
                                      "text-xl font-black",
                                      getScoreColor(lead.score)
                                    )}
                                  >
                                    {lead.score}
                                  </span>
                                  <span className="text-xs text-white/40">
                                    Score
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2">
                              {lead.email && (
                                <div className="flex items-center gap-2 text-sm text-white/70 truncate">
                                  <Mail className="h-4 w-4 text-white/40 shrink-0" />
                                  <span className="truncate">{lead.email}</span>
                                </div>
                              )}
                              {lead.phone && (
                                <div className="flex items-center gap-2 text-sm text-white/70">
                                  <Phone className="h-4 w-4 text-white/40 shrink-0" />
                                  <span>{lead.phone}</span>
                                </div>
                              )}
                            </div>

                            {/* Stats Bar */}
                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                              <div className="flex items-center gap-1.5 text-xs text-white/60">
                                <CalendarClock className="h-3.5 w-3.5 text-amber-400" />
                                <span className="truncate">
                                  {formatDate(lead.nextFollowUpDate)}
                                </span>
                              </div>
                              <div className="h-4 w-px bg-white/10" />
                              <div className="flex items-center gap-1.5 text-xs text-white/60">
                                <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
                                <span>{lead.followUps?.length || 0}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleScheduleFollowUp(lead)}
                                disabled={updatingId === lead.id}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <MessageSquare className="h-4 w-4" />
                                Follow-up
                              </button>
                              {!isTerminal && column.next && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAdvance(lead, column.next)
                                  }
                                  disabled={updatingId === lead.id}
                                  className={cn(
                                    "flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50",
                                    column.borderColor,
                                    `bg-linear-to-r ${column.gradient}`
                                  )}
                                >
                                  Advance
                                  <ArrowRight className="h-4 w-4" />
                                </button>
                              )}
                              {column.id !== "lost" &&
                                column.id !== "converted" && (
                                  <button
                                    type="button"
                                    onClick={() => handleAdvance(lead, "lost")}
                                    disabled={updatingId === lead.id}
                                    className="inline-flex items-center justify-center rounded-xl border border-rose-400/30 bg-rose-500/10 p-2.5 text-white backdrop-blur-xl transition-all duration-300 hover:bg-rose-500/20 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                                    title="Mark as Lost"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                )}
                            </div>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #803791, #b87bd1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #b87bd1, #803791);
        }
      `}</style>
    </div>
  );
}
