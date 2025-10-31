"use client";

import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  Target,
  Trash2,
  User,
  X,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react";

function getInitials(lead) {
  const first = lead?.firstName?.charAt(0) ?? "";
  const last = lead?.lastName?.charAt(0) ?? "";
  const combined = `${first}${last}`.toUpperCase();
  return combined || "SP";
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDocuments(documents = []) {
  return documents.map((doc, idx) => {
    if (typeof doc === "string") {
      return { id: idx, name: doc.split("/").pop(), url: doc };
    }
    return {
      id: doc.id || idx,
      name: doc.name || doc.filename || `Document ${idx + 1}`,
      url: doc.url || doc.path || "#",
    };
  });
}

function formatTimeline(lead) {
  const followUps = (lead?.followUps || []).map((item) => ({
    type: "follow_up",
    title: item.title || "Follow-up logged",
    description: item.description || item.notes || "",
    at: item.date || item.createdAt || null,
    meta: item.owner || item.createdBy || null,
  }));

  const statusHistory = (lead?.statusHistory || []).map((item) => ({
    type: "status",
    title: `Status changed to ${item.status?.replace("_", " ")}`,
    description: item.reason || "",
    at: item.date || item.changedAt || null,
    meta: item.changedBy || null,
  }));

  const combined = [...followUps, ...statusHistory];
  return combined
    .filter((event) => event.at)
    .sort((a, b) => new Date(b.at) - new Date(a.at));
}

export default function LeadDetailDrawer({
  lead,
  onClose,
  onAssign,
  onScheduleFollowUp,
  onConvert,
  onDelete,
  onStatusChange,
}) {
  if (!lead) return null;

  const documents = formatDocuments(lead.documents);
  const timeline = formatTimeline(lead);

  return (
    <div className="fixed inset-0 z-[120] flex">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <aside className="relative ml-auto flex h-full w-full max-w-[900px] flex-col overflow-hidden bg-gradient-to-br from-[#0f0721] via-[#1a0f2e] to-[#150a28] text-white shadow-2xl">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{
              background:
                "radial-gradient(circle, #803791 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 -left-40 w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse"
            style={{
              background:
                "radial-gradient(circle, #b87bd1 0%, transparent 70%)",
              animationDelay: "1s",
            }}
          />
        </div>

        {/* Header */}
        <header className="relative border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-8 py-6">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-200">
              <Sparkles className="h-3.5 w-3.5" />
              Lead Intelligence
            </div>

            {/* Profile Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-5">
                {/* Avatar */}
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-2xl blur-2xl opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #803791, #b87bd1)",
                    }}
                  />
                  <div
                    className="relative flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #803791, #b87bd1)",
                    }}
                  >
                    {getInitials(lead)}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                      {lead.firstName} {lead.lastName}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/60">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-4 w-4" />
                        {lead.email}
                      </span>
                      {lead.phone && (
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-4 w-4" />
                          {lead.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                      <Target className="h-3.5 w-3.5 text-purple-400" />
                      <span className="font-semibold text-white/90">
                        {lead.status?.replace("_", " ").toUpperCase() || "NEW"}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                      <Award className="h-3.5 w-3.5 text-amber-400" />
                      <span className="font-semibold text-white/90">
                        Score {lead.score || 40}
                      </span>
                    </div>
                    {lead.priority && (
                      <div className="inline-flex items-center gap-2 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-1.5 text-xs">
                        <TrendingUp className="h-3.5 w-3.5 text-rose-400" />
                        <span className="font-semibold text-rose-200">
                          {lead.priority} Priority
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative flex flex-1 overflow-hidden">
          {/* Left Column - Main Info */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Contact & Assignment Cards */}
            <section className="border-b border-white/10 bg-white/[0.02] px-8 py-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Contact Card */}
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 transition-all duration-300 hover:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="rounded-lg bg-blue-500/10 p-2">
                        <Mail className="h-4 w-4 text-blue-400" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
                        Contact Info
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail className="h-4 w-4 mt-0.5 text-white/40 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-white/50">Email</p>
                          <p className="text-sm font-medium text-white/90 truncate">
                            {lead.email || "—"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-4 w-4 mt-0.5 text-white/40 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-white/50">Phone</p>
                          <p className="text-sm font-medium text-white/90">
                            {lead.phone || "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assignment Card */}
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 transition-all duration-300 hover:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="rounded-lg bg-purple-500/10 p-2">
                        <User className="h-4 w-4 text-purple-400" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
                        Assignment
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="h-4 w-4 mt-0.5 text-white/40 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-white/50">Assigned To</p>
                          <p className="text-sm font-medium text-white/90">
                            {lead.assignedTo?.firstName
                              ? `${lead.assignedTo.firstName} ${
                                  lead.assignedTo.lastName ?? ""
                                }`
                              : "Unassigned"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-4 w-4 mt-0.5 text-white/40 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-white/50">Date</p>
                          <p className="text-sm font-medium text-white/90">
                            {lead.assignedAt
                              ? formatDate(lead.assignedAt)
                              : "Not assigned"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Timeline Section */}
            <section className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Activity Timeline
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    Recent Touchpoints
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onScheduleFollowUp?.(lead)}
                  className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-4 py-2.5 text-sm font-semibold text-purple-200 transition-all duration-300 hover:bg-purple-500/20 hover:scale-105"
                >
                  <MessageSquare className="h-4 w-4" />
                  Log Follow-up
                </button>
              </div>

              <div className="space-y-4">
                {timeline.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                      <MessageSquare className="h-6 w-6 text-white/40" />
                    </div>
                    <p className="text-sm font-medium text-white/70">
                      No Activity Yet
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      Start engaging to populate history
                    </p>
                  </div>
                )}
                {timeline.map((event, idx) => (
                  <div
                    key={`${event.type}-${idx}`}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] p-4 transition-all duration-300 hover:border-white/20 hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex gap-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                        style={{
                          background:
                            event.type === "follow_up"
                              ? "linear-gradient(135deg, #3b82f6, #06b6d4)"
                              : "linear-gradient(135deg, #a855f7, #ec4899)",
                        }}
                      >
                        {event.type === "follow_up" ? (
                          <MessageSquare className="h-4 w-4 text-white" />
                        ) : (
                          <Target className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-sm font-semibold text-white">
                            {event.title}
                          </h4>
                          <span className="shrink-0 text-xs text-white/50">
                            {formatDate(event.at)}
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-sm text-white/60 leading-relaxed">
                            {event.description}
                          </p>
                        )}
                        {event.meta && (
                          <p className="text-xs text-white/40">
                            <span className="text-white/50">Handled by</span>{" "}
                            {event.meta}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar - Actions & Files */}
          <div className="w-80 border-l border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <div className="flex h-full flex-col overflow-y-auto p-6 custom-scrollbar">
              {/* Quick Actions */}
              <section className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                  Quick Actions
                </p>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => onAssign?.(lead)}
                    className="group relative w-full overflow-hidden rounded-xl border border-purple-400/30 p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #803791, #b87bd1)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex items-center gap-3">
                      <div className="rounded-lg bg-white/20 p-2">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Assign to Teammate
                        </p>
                        <p className="text-xs text-white/70">
                          Delegate this lead
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onStatusChange?.(lead, "proposal_sent")}
                    className="group relative w-full overflow-hidden rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-500/20"
                  >
                    <div className="relative flex items-center gap-3">
                      <div className="rounded-lg bg-indigo-500/20 p-2">
                        <FileText className="h-4 w-4 text-indigo-300" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-indigo-100">
                          Move to Proposal
                        </p>
                        <p className="text-xs text-indigo-300/70">
                          Update status
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onConvert?.(lead)}
                    className="group relative w-full overflow-hidden rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-500/20"
                  >
                    <div className="relative flex items-center gap-3">
                      <div className="rounded-lg bg-emerald-500/20 p-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-emerald-100">
                          Convert Lead
                        </p>
                        <p className="text-xs text-emerald-300/70">
                          Mark as won
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete?.(lead)}
                    className="group relative w-full overflow-hidden rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:bg-rose-500/20"
                  >
                    <div className="relative flex items-center gap-3">
                      <div className="rounded-lg bg-rose-500/20 p-2">
                        <Trash2 className="h-4 w-4 text-rose-300" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-rose-100">
                          Remove Lead
                        </p>
                        <p className="text-xs text-rose-300/70">
                          Delete permanently
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </section>

              {/* Files Section */}
              <section className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Files & Documents
                  </p>
                  {documents.length > 0 && (
                    <a
                      href={documents[0].url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-purple-400 hover:text-purple-300"
                    >
                      View All
                    </a>
                  )}
                </div>
                {documents.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                      <FileText className="h-5 w-5 text-white/40" />
                    </div>
                    <p className="text-xs font-medium text-white/50">
                      No Files Yet
                    </p>
                    <p className="mt-1 text-xs text-white/30">
                      Upload documents
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="rounded-lg bg-white/10 p-2 shrink-0">
                            <FileText className="h-4 w-4 text-white/70" />
                          </div>
                          <span className="text-sm text-white/80 truncate group-hover:text-white">
                            {doc.name}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white/70" />
                      </a>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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
