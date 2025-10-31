"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  CircleDot,
  Clock4,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  User,
  Users,
  Users2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLeadViewModel } from "@/viewmodels/LeadViewModel";
import { customToast } from "@/components/ui/toast";

const STATUS_PIPELINE = [
  {
    id: "new",
    title: "New",
    subtitle: "Fresh inbound",
    accent: "from-sky-400/30 to-blue-500/20",
    glow: "bg-sky-400/20",
    next: "contacted",
  },
  {
    id: "contacted",
    title: "Contacted",
    subtitle: "Initial outreach",
    accent: "from-purple-400/30 to-fuchsia-500/20",
    glow: "bg-purple-400/20",
    next: "follow_up",
  },
  {
    id: "follow_up",
    title: "Follow-up",
    subtitle: "Engagement in progress",
    accent: "from-amber-400/30 to-orange-500/20",
    glow: "bg-amber-400/20",
    next: "proposal_sent",
  },
  {
    id: "proposal_sent",
    title: "Proposal sent",
    subtitle: "Awaiting response",
    accent: "from-indigo-400/30 to-slate-500/20",
    glow: "bg-indigo-400/20",
    next: "negotiation",
  },
  {
    id: "negotiation",
    title: "Negotiation",
    subtitle: "Pricing & terms",
    accent: "from-emerald-400/30 to-teal-500/20",
    glow: "bg-emerald-400/20",
    next: "converted",
  },
  {
    id: "converted",
    title: "Converted",
    subtitle: "Won deals",
    accent: "from-lime-400/20 to-emerald-400/20",
    glow: "bg-lime-400/20",
    next: null,
  },
  {
    id: "lost",
    title: "Lost",
    subtitle: "Closed without win",
    accent: "from-rose-400/20 to-red-500/20",
    glow: "bg-rose-400/20",
    next: null,
  },
];

function getInitials(lead) {
  const first = lead.firstName?.charAt(0) || "";
  const last = lead.lastName?.charAt(0) || "";
  return (first + last || "SP").toUpperCase();
}

function formatDate(date) {
  if (!date) return "No follow-up set";
  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
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

  const handleAdvance = async (lead, targetStatus) => {
    if (!targetStatus) return;
    setUpdatingId(lead.id);
    const result = await updateLeadStatus(lead.id, targetStatus);
    setUpdatingId(null);
    if (result.success) {
      customToast.success(
        "Stage updated",
        `${lead.firstName} moved to ${targetStatus.replace("_", " ")}`
      );
    } else {
      customToast.error(
        "Update failed",
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
      customToast.success("Follow-up logged", "Timeline updated for this lead");
    } else {
      customToast.error("Failed", result.error || "Could not log follow-up");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(128,55,145,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(184,123,209,0.1),transparent_50%)]" />
      </div>

      {/* Main container with max width and padding */}
      <div className="relative mx-auto h-screen max-w-[1920px] overflow-hidden px-4 py-4 lg:px-8">
        {/* Header section with flex layout */}
        <div className="flex h-full flex-col">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:px-2">
            <div className="space-y-4">
              <Link
                href="/crm/leads"
                className="group inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-lg"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />{" "}
                Back to workspace
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white/60">
                <Sparkles className="h-3.5 w-3.5 text-[#ffd6ff]" /> Stage
                Intelligence
              </div>
              <h1 className="text-3xl font-semibold text-white md:text-4xl">
                Pipeline Kanban
              </h1>
              <p className="max-w-2xl text-sm text-white/70 md:text-base">
                Track movement across every lifecycle stage. Each column
                reflects momentum so you can unblock prospects quickly and
                accelerate conversion.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-white/40">
                <div className="flex items-center gap-1">
                  <CircleDot className="h-3 w-3 text-[#a855f7]" />
                  Active touchpoint
                </div>
                <div className="flex items-center gap-1">
                  <CalendarClock className="h-3 w-3 text-[#38bdf8]" />
                  Next follow-up scheduled
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-[#34d399]" />
                  Converted deals
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffd6ff]/10">
                  <Users2 className="h-6 w-6 text-[#ffd6ff]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">
                    Open pipeline
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {
                      leads.filter(
                        (lead) => !["converted", "lost"].includes(lead.status)
                      ).length
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Clock4 className="h-3.5 w-3.5" />
                {loading
                  ? "Syncing latest interactions..."
                  : "Real-time updates enabled"}
              </div>
              <Link
                href="/crm/leads/insights"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors duration-300 hover:text-white"
              >
                Explore performance insights{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {/* Main Kanban board container */}
            <div className="no-scrollbar mt-6 flex h-[calc(100vh-180px)] items-start gap-5 overflow-x-auto overflow-y-hidden px-2">
              {columns.map((column) => {
                const isTerminal =
                  column.id === "converted" || column.id === "lost";

                return (
                  <div
                    key={column.id}
                    className="flex h-full min-w-[300px] max-w-[350px] flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
                  >
                    <div className="sticky top-0 z-10 border-b border-white/10 bg-white/5 backdrop-blur-md">
                      <div
                        className={cn(
                          "absolute inset-x-0 top-0 h-1 bg-linear-to-r",
                          column.accent
                        )}
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                              {column.subtitle}
                            </p>
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold tracking-tight text-white">
                                {column.title}
                              </h3>
                              <span className="flex min-w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-sm font-medium text-white/70">
                                {column.leads.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-full space-y-2 overflow-y-auto p-3 pb-6 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                      {loading && column.leads.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-8">
                          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white/20" />
                          <p className="text-sm text-white/40">
                            Loading leads...
                          </p>
                        </div>
                      ) : column.leads.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-white/10 bg-white/3 p-6">
                          <div className="rounded-full bg-white/5 p-3">
                            <Users className="h-5 w-5 text-white/40" />
                          </div>
                          <p className="text-center text-sm text-white/40">
                            No leads in this stage
                          </p>
                        </div>
                      ) : (
                        column.leads.map((lead) => (
                          <article
                            key={lead.id}
                            className="group relative space-y-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                          >
                            {/* Card header with avatar and name */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 uppercase text-white/90">
                                  <div
                                    className={cn(
                                      "absolute inset-0 blur-sm transition-opacity duration-300",
                                      column.glow
                                    )}
                                  />
                                  <span className="relative z-10 text-sm font-semibold">
                                    {getInitials(lead)}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <h4 className="text-sm font-semibold text-white">
                                    {lead.firstName} {lead.lastName}
                                  </h4>
                                  {lead.assignedTo && (
                                    <span className="inline-flex items-center gap-1 text-xs text-white/60">
                                      <User className="h-3.5 w-3.5" />{" "}
                                      {lead.assignedTo.firstName}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Contact info */}
                            <div className="space-y-1.5">
                              {lead.email && (
                                <div className="flex items-center gap-2 text-xs text-white/70">
                                  <Mail className="h-3.5 w-3.5 text-white/40" />{" "}
                                  {lead.email}
                                </div>
                              )}
                              {lead.phone && (
                                <div className="flex items-center gap-2 text-xs text-white/70">
                                  <Phone className="h-3.5 w-3.5 text-white/40" />{" "}
                                  {lead.phone}
                                </div>
                              )}
                            </div>

                            {/* Stats and metrics */}
                            <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
                              <span className="inline-flex items-center gap-1.5 text-white/60">
                                <CalendarClock className="h-3.5 w-3.5" />
                                <span>{formatDate(lead.nextFollowUpDate)}</span>
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-white/60">
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>{lead.followUps?.length || 0}</span>
                              </span>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center justify-between gap-2">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                onClick={() => handleScheduleFollowUp(lead)}
                                disabled={updatingId === lead.id}
                              >
                                <MessageSquare className="h-3.5 w-3.5" />{" "}
                                Follow-up
                              </button>
                              <div className="flex items-center gap-2">
                                {!isTerminal && column.next && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleAdvance(lead, column.next)
                                    }
                                    disabled={updatingId === lead.id}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:border-white/20 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    Next stage{" "}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                  </button>
                                )}
                                {column.id !== "lost" &&
                                  column.id !== "converted" && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAdvance(lead, "lost")
                                      }
                                      disabled={updatingId === lead.id}
                                      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-100 transition-colors duration-200 hover:border-rose-500/30 hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      Lost
                                    </button>
                                  )}
                              </div>
                            </div>
                          </article>
                        ))
                      )}
                    </div>

                    <div className="sticky bottom-0 mt-auto border-t border-white/10 bg-white/5 backdrop-blur-sm">
                      <div className="flex items-center justify-between gap-2 p-3 text-[10px] uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1 w-1 rounded-full bg-white/30" />
                          <span className="text-white/40">Auto-sync</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-white/40">
                            Real-time updates
                          </span>
                          <div className="h-1 w-1 rounded-full bg-white/30" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
