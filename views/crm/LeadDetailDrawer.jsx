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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <aside className="relative ml-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-l-3xl border border-white/10 bg-[#120223] text-white shadow-2xl">
        <header className="relative flex items-center justify-between border-b border-white/10 px-8 py-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
              <Sparkles className="h-4 w-4 text-[#ffd6ff]" /> Lead intelligence
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 rounded-2xl blur-lg opacity-70" style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#803791] via-[#9b55b0] to-[#5d1f73] text-2xl font-semibold">
                  {getInitials(lead)}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {lead.firstName} {lead.lastName}
                </h2>
                <p className="text-sm text-white/60">{lead.email}</p>
                {lead.phone && (
                  <p className="text-sm text-white/60">{lead.phone}</p>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/70 transition-colors duration-300 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col overflow-hidden border-r border-white/10">
            <section className="border-b border-white/10 px-8 py-6">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-white/40">
                <span className="inline-flex items-center gap-1">
                  <Target className="h-3.5 w-3.5" /> {lead.status?.replace("_", " ") || "Status"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Score {lead.score || 0}
                </span>
                {lead.priority && (
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Priority {lead.priority}
                  </span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">Contact</p>
                  <div className="mt-3 space-y-2 text-sm text-white/70">
                    <p className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4 text-white/50" /> {lead.email || "—"}
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4 text-white/50" /> {lead.phone || "—"}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">Assignment</p>
                  <div className="mt-3 space-y-2 text-sm text-white/70">
                    <p className="inline-flex items-center gap-2">
                      <User className="h-4 w-4 text-white/50" />
                      {lead.assignedTo?.firstName
                        ? `${lead.assignedTo.firstName} ${lead.assignedTo.lastName ?? ""}`
                        : "Unassigned"}
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-white/50" />
                      {lead.assignedAt ? formatDate(lead.assignedAt) : "No assignment date"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex-1 overflow-y-auto px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">Activity timeline</p>
                  <h3 className="text-lg font-semibold text-white">Recent touchpoints</h3>
                </div>
                <button
                  type="button"
                  onClick={() => onScheduleFollowUp?.(lead)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                >
                  <MessageSquare className="h-4 w-4" /> Log follow-up
                </button>
              </div>
              <div className="mt-6 space-y-4">
                {timeline.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-sm text-white/50">
                    No timeline activity yet. Start engaging to populate history.
                  </div>
                )}
                {timeline.map((event, idx) => (
                  <div
                    key={`${event.type}-${idx}`}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100" style={{
                      background: "linear-gradient(135deg, rgba(128,55,145,0.25), transparent)",
                    }}></div>
                    <div className="relative flex gap-3">
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                        {event.type === "follow_up" ? (
                          <MessageSquare className="h-4 w-4 text-white/70" />
                        ) : (
                          <Target className="h-4 w-4 text-white/70" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            {event.title}
                          </h4>
                          <span className="text-xs text-white/50">{formatDate(event.at)}</span>
                        </div>
                        {event.description && (
                          <p className="text-sm text-white/60">{event.description}</p>
                        )}
                        {event.meta && (
                          <p className="text-xs text-white/40">Handled by {event.meta}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="flex h-full flex-col overflow-y-auto px-6 py-6">
            <section className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Quick actions</p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onAssign?.(lead)}
                  className="w-full rounded-2xl border border-white/15 bg-gradient-to-r from-[#803791] to-[#b87bd1] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Assign to teammate
                </button>
                <button
                  type="button"
                  onClick={() => onStatusChange?.(lead, "proposal_sent")}
                  className="w-full rounded-2xl border border-indigo-400/30 bg-indigo-500/20 px-4 py-3 text-sm font-semibold text-indigo-100 transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  Move to proposal sent
                </button>
                <button
                  type="button"
                  onClick={() => onConvert?.(lead)}
                  className="w-full rounded-2xl border border-emerald-400/30 bg-emerald-500/20 px-4 py-3 text-sm font-semibold text-emerald-100 transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  Convert lead
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(lead)}
                  className="w-full rounded-2xl border border-rose-400/30 bg-rose-500/15 px-4 py-3 text-sm font-semibold text-rose-100 transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  <span className="inline-flex items-center gap-2">
                    <Trash2 className="h-4 w-4" /> Remove lead
                  </span>
                </button>
              </div>
            </section>

            <section className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">Files & Docs</p>
                {documents.length > 0 && (
                  <a
                    href={documents[0].url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-white/70 hover:text-white"
                  >
                    View latest
                  </a>
                )}
              </div>
              {documents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-sm text-white/50">
                  No files uploaded yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition-colors duration-300 hover:border-white/20 hover:text-white"
                    >
                      <span className="inline-flex items-center gap-2">
                        <FileText className="h-4 w-4 text-white/50" /> {doc.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/40" />
                    </a>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </aside>
    </div>
  );
}
