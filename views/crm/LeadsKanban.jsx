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
  const {
    leads,
    loading,
    fetchLeads,
    updateLeadStatus,
    addFollowUp,
  } = useLeadViewModel();

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
      customToast.success("Stage updated", `${lead.firstName} moved to ${targetStatus.replace("_", " ")}`);
    } else {
      customToast.error("Update failed", result.error || "Unable to change stage");
    }
  };

  const handleScheduleFollowUp = async (lead) => {
    const next = window.prompt("Add follow-up note", "Call to discuss next steps");
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
    <div className="min-h-screen bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent px-6 pb-8 pt-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Link
              href="/crm/leads"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to workspace
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white/60">
              <Sparkles className="h-3.5 w-3.5 text-[#ffd6ff]" /> Stage Intelligence
            </div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              Pipeline Kanban
            </h1>
            <p className="max-w-2xl text-sm text-white/70 md:text-base">
              Track movement across every lifecycle stage. Each column reflects momentum so you can unblock prospects quickly and accelerate conversion.
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
                <p className="text-xs uppercase tracking-widest text-white/50">Open pipeline</p>
                <p className="text-2xl font-semibold text-white">{leads.filter((lead) => !["converted", "lost"].includes(lead.status)).length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Clock4 className="h-3.5 w-3.5" />
              {loading ? "Syncing latest interactions..." : "Real-time updates enabled"}
            </div>
            <Link
              href="/crm/leads/insights"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors duration-300 hover:text-white"
            >
              Explore performance insights <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]"></div>
          <div className="relative flex min-h-[60vh] gap-4 overflow-x-auto px-4 py-6">
            {columns.map((column) => {
              const isTerminal = column.id === "converted" || column.id === "lost";

              return (
                <div
                  key={column.id}
                  className="flex min-w-[260px] max-w-[320px] flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <div className="relative border-b border-white/10 p-4">
                    <div className={cn("absolute inset-x-4 top-0 h-1 rounded-b-full bg-gradient-to-r", column.accent)}></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/60">{column.subtitle}</p>
                        <h3 className="text-lg font-semibold text-white">{column.title}</h3>
                      </div>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold text-white/70">
                        {column.leads.length}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {loading && column.leads.length === 0 ? (
                      <div className="flex items-center justify-center py-6 text-sm text-white/60">
                        Loading leads...
                      </div>
                    ) : column.leads.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-center text-xs text-white/50">
                        No leads in this stage yet
                      </div>
                    ) : (
                      column.leads.map((lead) => (
                        <article
                          key={lead.id}
                          className="relative overflow-hidden rounded-xl border border-white/10 bg-white/10 p-4 text-sm text-white/80 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:border-white/20"
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 uppercase text-white/80">
                              <div className={cn("absolute inset-0 rounded-xl blur-md", column.glow)}></div>
                              <span className="relative z-10 text-sm font-semibold">{getInitials(lead)}</span>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-white">{lead.firstName} {lead.lastName}</h4>
                                {lead.assignedTo && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                                    <User className="h-3 w-3" /> {lead.assignedTo.firstName}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                                {lead.email && (
                                  <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
                                )}
                                {lead.phone && (
                                  <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
                                )}
                              </div>
                              <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                                <span className="inline-flex items-center gap-1">
                                  <CalendarClock className="h-3.5 w-3.5" />
                                  {formatDate(lead.nextFollowUpDate)}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <MessageSquare className="h-3.5 w-3.5" />
                                  {lead.followUps?.length || 0} touchpoints
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-transparent px-3 py-1 font-semibold text-white/70 transition-colors duration-300 hover:border-white/25 hover:text-white"
                              onClick={() => handleScheduleFollowUp(lead)}
                              disabled={updatingId === lead.id}
                            >
                              <MessageSquare className="h-3.5 w-3.5" /> Log follow-up
                            </button>
                            <div className="flex items-center gap-2">
                              {!isTerminal && column.next && (
                                <button
                                  type="button"
                                  onClick={() => handleAdvance(lead, column.next)}
                                  disabled={updatingId === lead.id}
                                  className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1 font-semibold text-white transition-colors duration-300 hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  Move to {column.next.replace("_", " ")}
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                              )}
                              {column.id !== "lost" && column.id !== "converted" && (
                                <button
                                  type="button"
                                  onClick={() => handleAdvance(lead, "lost")}
                                  disabled={updatingId === lead.id}
                                  className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-3 py-1 font-semibold text-white/60 transition-colors duration-300 hover:border-rose-400/40 hover:text-rose-200"
                                >
                                  Mark lost
                                </button>
                              )}
                            </div>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                  <div className="border-t border-white/10 bg-white/5 p-3 text-center text-[10px] uppercase tracking-wider text-white/40">
                    Updated multiple times daily
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
