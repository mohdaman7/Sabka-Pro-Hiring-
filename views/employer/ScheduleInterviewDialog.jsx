"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  Building2,
  Users,
  Plus,
  X,
  Globe,
  FileText,
  CheckCircle,
  XCircle,
  Sparkles,
  Mail,
  User,
  Award,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { applicationService } from "@/services/applicationService";

export default function ScheduleInterviewDialog({ app, onClose, onScheduled }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState(60);
  const [type, setType] = useState("video");
  const [meetingLink, setMeetingLink] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  );
  const [panel, setPanel] = useState([{ name: "", email: "", role: "" }]);
  const [notes, setNotes] = useState("");
  const [completionFeedback, setCompletionFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const shouldOpen = !!app;
    setOpen(shouldOpen);
    setError("");
    if (app?.interview?.scheduledAt) {
      const d = new Date(app.interview.scheduledAt);
      setDate(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
      setDuration(app.interview.durationMinutes || 60);
      setType(app.interview.type || "video");
      setMeetingLink(app.interview.meetingLink || "");
      setLocation(app.interview.location || "");
      setTimezone(app.interview.timezone || timezone);
      setPanel(
        app.interview.panel?.length
          ? app.interview.panel
          : [{ name: "", email: "", role: "" }]
      );
      setNotes(app.interview.notes || "");
      setCompletionFeedback(app.interview.feedback || "");
    } else {
      setDate(null);
      setTime("10:00");
      setDuration(60);
      setType("video");
      setMeetingLink("");
      setLocation("");
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
      setPanel([{ name: "", email: "", role: "" }]);
      setNotes("");
      setCompletionFeedback("");
    }
  }, [app]);

  const closeAll = () => {
    setOpen(false);
    onClose?.();
  };

  const handlePanelChange = (idx, field, value) => {
    setPanel((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
    );
  };

  const addPanelMember = () =>
    setPanel((prev) => [...prev, { name: "", email: "", role: "" }]);
  const removePanelMember = (idx) =>
    setPanel((prev) => prev.filter((_, i) => i !== idx));

  const buildDateTime = () => {
    if (!date || !time) return null;
    const [hh, mm] = time.split(":").map((s) => parseInt(s, 10));
    const dt = new Date(date);
    dt.setHours(hh, mm, 0, 0);
    return dt;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      const scheduledAt = buildDateTime();
      if (!scheduledAt) throw new Error("Please select date and time");
      const payload = {
        scheduledAt,
        timezone,
        durationMinutes: Number(duration),
        type,
        meetingLink: type === "video" ? meetingLink : undefined,
        location: type === "onsite" ? location : undefined,
        panel: panel.filter((p) => p.name && p.email),
        notes: notes || undefined,
      };
      const fn = app?.interview?.status
        ? applicationService.rescheduleInterview
        : applicationService.scheduleInterview;
      const res = await fn(app._id, payload);
      if (!res?.success)
        throw new Error(res?.message || "Failed to schedule interview");
      onScheduled?.(res.data);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e.message ||
          "Failed to schedule interview"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelInterview = async () => {
    try {
      setLoading(true);
      const res = await applicationService.cancelInterview(
        app._id,
        "Employer cancelled"
      );
      if (!res?.success) throw new Error(res?.message || "Failed to cancel");
      onScheduled?.(res.data);
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to cancel interview"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await applicationService.completeInterview(
        app._id,
        completionFeedback || "Interview completed"
      );
      if (!res?.success)
        throw new Error(res?.message || "Failed to complete interview");
      onScheduled?.(res.data);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e.message ||
          "Failed to complete interview"
      );
    } finally {
      setLoading(false);
    }
  };

  const interviewTypes = [
    {
      value: "video",
      label: "Video Call",
      icon: Video,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: "phone",
      label: "Phone Call",
      icon: Phone,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      value: "onsite",
      label: "On-site",
      icon: Building2,
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const durationOptions = [
    { value: 15, label: "15 min", icon: "🕐" },
    { value: 30, label: "30 min", icon: "🕑" },
    { value: 45, label: "45 min", icon: "🕒" },
    { value: 60, label: "1 hour", icon: "🕓" },
    { value: 90, label: "1.5 hours", icon: "🕔" },
    { value: 120, label: "2 hours", icon: "🕕" },
  ];

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? closeAll() : setOpen(v))}>
      <DialogContent
        className="max-w-6xl max-h-[90vh] overflow-y-auto bg-liner-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 text-white"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98))",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Premium Header */}
        <DialogHeader className="space-y-4 pb-6 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-2xl blur-md opacity-50"></div>
              <div
                className="relative p-3 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {app?.interview?.status
                  ? "Update Interview Schedule"
                  : "Schedule New Interview"}
              </DialogTitle>
              <p className="text-white/60 text-sm mt-1">
                {app?.studentId?.firstName} {app?.studentId?.lastName} •{" "}
                {app?.jobId?.title}
              </p>
            </div>
            {app?.interview?.status && (
              <div className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#803791] to-[#b87bd1]">
                {app.interview.status}
              </div>
            )}
          </div>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-6 py-6">
          {/* Date & Time Section - FIXED LAYOUT */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
              <Calendar className="w-4 h-4 text-[#b87bd1]" />
              <span>Date & Time</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Calendar - Takes 3 columns */}
              <div className="lg:col-span-3">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <CalendarPicker
                    selected={date || undefined}
                    onSelect={(newDate) => setDate(newDate || null)}
                    mode="single"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Time Details - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                    <Clock className="w-4 h-4 text-[#b87bd1]" />
                    Time
                  </label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus:border-[#b87bd1] focus:ring-[#b87bd1]/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                    <Clock className="w-4 h-4 text-[#b87bd1]" />
                    Duration
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {durationOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDuration(opt.value)}
                        className={`p-3 rounded-xl text-xs font-medium transition-all duration-300 ${
                          duration === opt.value
                            ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg scale-105"
                            : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        <div className="text-base mb-1">{opt.icon}</div>
                        <div className="text-[10px]">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                    <Globe className="w-4 h-4 text-[#b87bd1]" />
                    Timezone
                  </label>
                  <Input
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus:border-[#b87bd1] focus:ring-[#b87bd1]/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interview Type Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
              <Video className="w-4 h-4 text-[#b87bd1]" />
              <span>Interview Type</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {interviewTypes.map((typeOption) => {
                const Icon = typeOption.icon;
                return (
                  <button
                    key={typeOption.value}
                    onClick={() => setType(typeOption.value)}
                    className={`group relative p-6 rounded-2xl transition-all duration-300 overflow-hidden ${
                      type === typeOption.value
                        ? "scale-105 shadow-2xl"
                        : "hover:scale-105"
                    }`}
                    style={{
                      background:
                        type === typeOption.value
                          ? "linear-gradient(135deg, rgba(128,55,145,0.2), rgba(184,123,209,0.2))"
                          : "rgba(255,255,255,0.05)",
                      border: `2px solid ${
                        type === typeOption.value
                          ? "rgba(184,123,209,0.5)"
                          : "rgba(255,255,255,0.1)"
                      }`,
                    }}
                  >
                    {type === typeOption.value && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${typeOption.gradient} opacity-10`}
                      ></div>
                    )}
                    <Icon
                      className={`w-8 h-8 mx-auto mb-3 ${
                        type === typeOption.value
                          ? "text-[#b87bd1]"
                          : "text-white/60"
                      }`}
                    />
                    <div
                      className={`text-sm font-semibold ${
                        type === typeOption.value
                          ? "text-white"
                          : "text-white/70"
                      }`}
                    >
                      {typeOption.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {type === "video" && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <Video className="w-4 h-4 text-[#b87bd1]" />
                  Meeting Link
                </label>
                <Input
                  placeholder="https://meet.google.com/..."
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus:border-[#b87bd1] focus:ring-[#b87bd1]/50"
                />
              </div>
            )}

            {type === "onsite" && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <MapPin className="w-4 h-4 text-[#b87bd1]" />
                  Location Address
                </label>
                <Input
                  placeholder="123 Main Street, City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus:border-[#b87bd1] focus:ring-[#b87bd1]/50"
                />
              </div>
            )}
          </div>

          {/* Interview Panel Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <Users className="w-4 h-4 text-[#b87bd1]" />
                <span>Interview Panel</span>
              </div>
              <button
                type="button"
                onClick={addPanelMember}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>

            <div className="space-y-3">
              {panel.map((member, idx) => (
                <div
                  key={idx}
                  className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-white/50">
                        <User className="w-3 h-3" />
                        Name
                      </label>
                      <Input
                        placeholder="John Doe"
                        value={member.name}
                        onChange={(e) =>
                          handlePanelChange(idx, "name", e.target.value)
                        }
                        className="bg-white/5 border-white/10 text-white focus:border-[#b87bd1] focus:ring-[#b87bd1]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-white/50">
                        <Mail className="w-3 h-3" />
                        Email
                      </label>
                      <Input
                        placeholder="john@company.com"
                        value={member.email}
                        onChange={(e) =>
                          handlePanelChange(idx, "email", e.target.value)
                        }
                        className="bg-white/5 border-white/10 text-white focus:border-[#b87bd1] focus:ring-[#b87bd1]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-white/50">
                        <Award className="w-3 h-3" />
                        Role
                      </label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Senior Engineer"
                          value={member.role}
                          onChange={(e) =>
                            handlePanelChange(idx, "role", e.target.value)
                          }
                          className="bg-white/5 border-white/10 text-white focus:border-[#b87bd1] focus:ring-[#b87bd1]/50"
                        />
                        {panel.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePanelMember(idx)}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all duration-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
              <FileText className="w-4 h-4 text-[#b87bd1]" />
              <span>Additional Notes</span>
            </div>
            <Textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes for this interview..."
              className="bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#b87bd1] focus:ring-[#b87bd1]/50 resize-none"
            />
          </div>

          {/* Feedback Section (if interview exists) */}
          {app?.interview?.status && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <Sparkles className="w-4 h-4 text-[#b87bd1]" />
                <span>Interview Feedback</span>
              </div>
              <Textarea
                rows={4}
                value={completionFeedback}
                onChange={(e) => setCompletionFeedback(e.target.value)}
                placeholder="Add feedback after completing the interview..."
                className="bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#b87bd1] focus:ring-[#b87bd1]/50 resize-none"
              />
            </div>
          )}
        </div>

        {/* Premium Footer */}
        <DialogFooter className="pt-6 border-t border-white/10 gap-3">
          {app?.interview?.status && (
            <button
              disabled={loading}
              onClick={handleCancelInterview}
              className="group relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "2px solid rgba(239,68,68,0.3)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Cancel Interview
              </span>
            </button>
          )}

          {app?.interview?.status && app?.interview?.status !== "completed" && (
            <button
              disabled={loading}
              onClick={handleMarkCompleted}
              className="group relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "2px solid rgba(16,185,129,0.3)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Mark Completed
              </span>
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="group relative px-8 py-3 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div
              className="absolute inset-0 transition-transform group-hover:scale-105 duration-300"
              style={{ background: "linear-gradient(135deg,#803791,#b87bd1)" }}
            ></div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg,#b87bd1,#803791)" }}
            ></div>
            <span className="relative flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  {app?.interview?.status
                    ? "Update Schedule"
                    : "Schedule Interview"}
                </>
              )}
            </span>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
