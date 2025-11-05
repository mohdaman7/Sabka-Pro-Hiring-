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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { applicationService } from "@/services/applicationService";

export default function ScheduleInterviewDialog({ app, onClose, onScheduled }) {
  const [open, setOpen] = useState(false);
  const [existingInterview, setExistingInterview] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
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
  const [fetchingInterview, setFetchingInterview] = useState(false);
  const [error, setError] = useState("");

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Fetch existing interview when dialog opens
  useEffect(() => {
    const shouldOpen = !!app;
    setOpen(shouldOpen);
    setError("");
    
    if (app?._id) {
      fetchExistingInterview();
    } else {
      resetForm();
    }
  }, [app]);

  const fetchExistingInterview = async () => {
    try {
      setFetchingInterview(true);
      const response = await applicationService.getInterviewByApplicationId(app._id);
      
      if (response.success && response.data) {
        const interview = response.data;
        setExistingInterview(interview);
        setIsUpdateMode(true);
        
        // Populate form with existing interview data
        const d = new Date(interview.scheduledAt);
        setDate(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        setTime(`${hh}:${mm}`);
        setDuration(interview.durationMinutes || 60);
        setType(interview.type || "video");
        setMeetingLink(interview.meetingLink || "");
        setLocation(interview.location?.address || interview.location || "");
        setTimezone(interview.timezone || timezone);
        setPanel(
          interview.interviewers?.length
            ? interview.interviewers.map(i => ({ name: i.name, email: i.email, role: i.role || "" }))
            : [{ name: "", email: "", role: "" }]
        );
        setNotes(interview.notes || "");
        setCompletionFeedback(interview.evaluation?.feedback || "");
      } else {
        // No existing interview
        setExistingInterview(null);
        setIsUpdateMode(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error fetching interview:", error);
      setExistingInterview(null);
      setIsUpdateMode(false);
      resetForm();
    } finally {
      setFetchingInterview(false);
    }
  };

  const resetForm = () => {
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
  };

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
      if (type === "video" && !meetingLink.trim()) {
        throw new Error("Meeting link is required for video interviews");
      }
      if (type === "onsite" && !location.trim()) {
        throw new Error("Location is required for on-site interviews");
      }

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

      const fn = isUpdateMode
        ? applicationService.rescheduleInterview
        : applicationService.scheduleInterview;

      const res = await fn(app._id, payload);
      if (!res?.success)
        throw new Error(res?.message || `Failed to ${isUpdateMode ? 'update' : 'schedule'} interview`);

      onScheduled?.(res.data);
      closeAll();
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
      setError("");
      const res = await applicationService.cancelInterview(
        app._id,
        "Employer cancelled"
      );
      if (!res?.success) throw new Error(res?.message || "Failed to cancel");
      onScheduled?.(res.data);
      closeAll();
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
      closeAll();
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
    { value: 15, label: "15 min" },
    { value: 30, label: "30 min" },
    { value: 45, label: "45 min" },
    { value: 60, label: "1 hour" },
    { value: 90, label: "1.5 hours" },
    { value: 120, label: "2 hours" },
  ];

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={closeAll}
      />

      <div
        className="relative w-full max-w-6xl h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/10 transform transition-transform duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98))",
        }}
      >
        {/* Premium Header */}
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-slate-900/80 border-b border-white/10 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-2xl blur-md opacity-50" />
                <div
                  className="relative p-3.5 rounded-2xl transform transition-transform duration-300 hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {fetchingInterview ? "Loading..." : isUpdateMode
                    ? "Update Interview Schedule"
                    : "Schedule New Interview"}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  {app?.studentId?.firstName} {app?.studentId?.lastName} •{" "}
                  {app?.jobId?.title}
                </p>
              </div>
            </div>
            <button
              onClick={closeAll}
              className="p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-6 flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <XCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Date & Time Section - Improved Responsive Layout */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
              <Calendar className="w-4 h-4 text-[#b87bd1]" />
              <span>Date & Time</span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              {/* Calendar Section */}
              <div
                className="rounded-2xl overflow-hidden border border-white/10 shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(128,55,145,0.08), rgba(184,123,209,0.05))",
                }}
              >
                <EnhancedCalendar
                  selected={date}
                  onSelect={setDate}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                />
              </div>

              {/* Time & Duration Panel */}
              <div className="space-y-4">
                {/* Time Selector */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-wide font-semibold text-white/60">
                    <Clock className="w-4 h-4 text-[#b87bd1]" />
                    Select Time
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[240px] overflow-y-auto p-1 rounded-xl bg-white/5 border border-white/10">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`p-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          time === slot
                            ? "bg-linear-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg scale-105"
                            : "bg-white/5 text-white/70 hover:bg-white/10 hover:scale-105 border border-white/10"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Selector */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-wide font-semibold text-white/60">
                    <Clock className="w-4 h-4 text-[#b87bd1]" />
                    Duration
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {durationOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDuration(opt.value)}
                        className={`p-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          duration === opt.value
                            ? "bg-linear-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg scale-105"
                            : "bg-white/5 text-white/70 hover:bg-white/10 hover:scale-105 border border-white/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timezone */}
                <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-wide font-semibold text-white/60">
                    <Globe className="w-3 h-3" />
                    Timezone
                  </label>
                  <EnhancedTimezoneSelect
                    value={timezone}
                    onChange={setTimezone}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rest of your existing form sections remain the same */}
          {/* Interview Type Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
              <Video className="w-4 h-4 text-[#b87bd1]" />
              <span>Interview Type</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        className={`absolute inset-0 bg-linear-to-br ${typeOption.gradient} opacity-10`}
                      />
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
                <label className="flex items-center gap-2 text-xs uppercase tracking-wide font-semibold text-white/60">
                  <Video className="w-4 h-4 text-[#b87bd1]" />
                  Meeting Link
                </label>
                <input
                  placeholder="https://meet.google.com/..."
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all"
                />
                <p className="text-xs text-white/50">
                  Paste a Google Meet, Zoom, or Teams link
                </p>
              </div>
            )}

            {type === "onsite" && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="flex items-center gap-2 text-xs uppercase tracking-wide font-semibold text-white/60">
                  <MapPin className="w-4 h-4 text-[#b87bd1]" />
                  Location Address
                </label>
                <input
                  placeholder="123 Main Street, City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all"
                />
                <p className="text-xs text-white/50">
                  Include building, floor, and check-in instructions
                </p>
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>

            <div className="space-y-3">
              {panel.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) =>
                        handlePanelChange(idx, "name", e.target.value)
                      }
                      className="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50"
                    />
                    <input
                      placeholder="Email"
                      value={member.email}
                      onChange={(e) =>
                        handlePanelChange(idx, "email", e.target.value)
                      }
                      className="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50"
                    />
                    <div className="flex gap-2">
                      <input
                        placeholder="Role"
                        value={member.role}
                        onChange={(e) =>
                          handlePanelChange(idx, "role", e.target.value)
                        }
                        className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50"
                      />
                      {panel.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePanelMember(idx)}
                          className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
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
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes for this interview..."
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 resize-none"
            />
          </div>

          {/* Feedback Section (if interview exists) */}
          {app?.interview?.status && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <Sparkles className="w-4 h-4 text-[#b87bd1]" />
                <span>Interview Feedback</span>
              </div>
              <textarea
                rows={4}
                value={completionFeedback}
                onChange={(e) => setCompletionFeedback(e.target.value)}
                placeholder="Add feedback after completing the interview..."
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 resize-none"
              />
            </div>
          )}
        </div>

        {/* Premium Footer */}
        <div className="sticky bottom-0 backdrop-blur-xl bg-slate-900/80 border-t border-white/10 p-6 flex flex-wrap justify-end gap-3">
          {app?.interview?.status && (
            <>
              <button
                disabled={loading}
                onClick={handleCancelInterview}
                className="group relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "2px solid rgba(239,68,68,0.3)",
                }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-rose-500 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Cancel Interview
                </span>
              </button>

              {app?.interview?.status !== "completed" && (
                <button
                  disabled={loading}
                  onClick={handleMarkCompleted}
                  className="group relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    border: "2px solid rgba(16,185,129,0.3)",
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Mark Completed
                  </span>
                </button>
              )}
            </>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="group relative px-8 py-3 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50"
          >
            <div
              className="absolute inset-0 transition-transform group-hover:scale-105 duration-300"
              style={{ background: "linear-gradient(135deg,#803791,#b87bd1)" }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg,#b87bd1,#803791)" }}
            />
            <span className="relative flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  {isUpdateMode
                    ? "Update Interview"
                    : "Schedule Interview"}
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

// Enhanced Calendar Component with Better Responsiveness
function EnhancedCalendar({
  selected,
  onSelect,
  currentMonth,
  setCurrentMonth,
}) {
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const isSelected = (day) => {
    if (!selected) return false;
    const checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return (
      checkDate.getFullYear() === selected.getFullYear() &&
      checkDate.getMonth() === selected.getMonth() &&
      checkDate.getDate() === selected.getDate()
    );
  };

  const isToday = (day) => {
    const checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return (
      checkDate.getFullYear() === today.getFullYear() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getDate() === today.getDate()
    );
  };

  const isPast = (day) => {
    const checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const handleDayClick = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onSelect(newDate);
  };

  const monthYear = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="p-4 sm:p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 min-w-[40px]"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <h3 className="text-base sm:text-lg font-bold text-white text-center truncate px-2">
          {monthYear}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 min-w-[40px]"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-white/50 py-2 truncate"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isDaySelected = isSelected(day);
          const isTodayDate = isToday(day);
          const isPastDate = isPast(day);

          return (
            <button
              key={day}
              onClick={() => !isPastDate && handleDayClick(day)}
              disabled={isPastDate}
              className={`
                aspect-square rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300
                flex items-center justify-center min-w-0
                ${
                  isDaySelected
                    ? "bg-linear-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg scale-110"
                    : isTodayDate
                    ? "bg-white/10 text-white border border-[#b87bd1]/50"
                    : isPastDate
                    ? "text-white/30 cursor-not-allowed"
                    : "text-white/70 hover:bg-white/10 hover:text-white hover:scale-105"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Enhanced Timezone Select with Better Styling
function EnhancedTimezoneSelect({ value, onChange }) {
  const COMMON_TIMEZONES = [
    "UTC",
    "America/Los_Angeles",
    "America/Denver",
    "America/Chicago",
    "America/New_York",
    "Europe/London",
    "Europe/Berlin",
    "Europe/Paris",
    "Europe/Madrid",
    "Europe/Rome",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Asia/Singapore",
    "Asia/Tokyo",
    "Australia/Sydney",
  ];

  const options = Array.from(new Set([value, ...COMMON_TIMEZONES])).filter(
    Boolean
  );

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50 focus:border-[#b87bd1] transition-all appearance-none cursor-pointer"
    >
      {options.map((tz) => (
        <option key={tz} value={tz} className="bg-slate-900 text-white">
          {tz.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}
