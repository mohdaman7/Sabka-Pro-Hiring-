"use client";

import { useState } from "react";
import {
  X,
  CheckCircle,
  XCircle,
  Calendar,
  Star,
  MessageSquare,
  TrendingUp,
  Award,
  Users,
  Clock,
  Target,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { applicationService } from "@/services/applicationService";

const INTERVIEW_STAGES = [
  { value: "screening", label: "Screening", icon: Users, color: "blue" },
  { value: "technical", label: "Technical", icon: Target, color: "purple" },
  { value: "hr", label: "HR Round", icon: MessageSquare, color: "indigo" },
  { value: "final", label: "Final Round", icon: Award, color: "amber" },
  { value: "cultural", label: "Cultural Fit", icon: Star, color: "pink" },
];

const INTERVIEW_RESULTS = [
  { value: "passed", label: "Passed", icon: CheckCircle, color: "green", description: "Candidate performed well" },
  { value: "next-round", label: "Next Round", icon: ArrowRight, color: "blue", description: "Proceed to next interview" },
  { value: "pending", label: "Pending", icon: Clock, color: "amber", description: "Decision pending" },
  { value: "failed", label: "Rejected", icon: XCircle, color: "red", description: "Did not meet requirements" },
  { value: "on-hold", label: "On Hold", icon: AlertCircle, color: "orange", description: "Keep for future consideration" },
];

const RECOMMENDATIONS = [
  { value: "strong-hire", label: "Strong Hire", icon: TrendingUp, color: "green" },
  { value: "hire", label: "Hire", icon: CheckCircle, color: "blue" },
  { value: "maybe", label: "Maybe", icon: AlertCircle, color: "amber" },
  { value: "no-hire", label: "No Hire", icon: XCircle, color: "red" },
];

export default function InterviewManagementDialog({ interview, app, onClose, onUpdated }) {
  const [activeTab, setActiveTab] = useState("complete");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Complete Interview State
  const [result, setResult] = useState("pending");
  const [recommendation, setRecommendation] = useState("pending");
  const [technicalSkills, setTechnicalSkills] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [problemSolving, setProblemSolving] = useState(0);
  const [culturalFit, setCulturalFit] = useState(0);
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [feedback, setFeedback] = useState("");

  // Next Round State
  const [nextStage, setNextStage] = useState("technical");
  const [nextDate, setNextDate] = useState("");
  const [nextTime, setNextTime] = useState("10:00");
  const [nextDuration, setNextDuration] = useState(60);
  const [nextType, setNextType] = useState("video");
  const [nextMeetingLink, setNextMeetingLink] = useState("");
  const [nextNotes, setNextNotes] = useState("");

  const overall = Math.round((technicalSkills + communication + problemSolving + culturalFit) / 4);

  const handleCompleteInterview = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        evaluation: {
          technicalSkills,
          communication,
          problemSolving,
          culturalFit,
          overall,
          strengths: strengths.split(",").map(s => s.trim()).filter(Boolean),
          weaknesses: weaknesses.split(",").map(s => s.trim()).filter(Boolean),
          feedback,
          recommendation,
        },
        result,
        feedback,
        recommendation,
      };

      const res = await applicationService.completeInterviewWithEvaluation(app._id, payload);
      
      if (!res?.success) {
        throw new Error(res?.message || "Failed to complete interview");
      }

      onUpdated?.(res.data);
      onClose();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to complete interview");
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleNextRound = async () => {
    try {
      setLoading(true);
      setError("");

      if (!nextDate || !nextTime) {
        throw new Error("Please select date and time");
      }

      const [hh, mm] = nextTime.split(":").map(s => parseInt(s, 10));
      const scheduledAt = new Date(nextDate);
      scheduledAt.setHours(hh, mm, 0, 0);

      const payload = {
        scheduledAt,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        durationMinutes: nextDuration,
        type: nextType,
        stage: nextStage,
        meetingLink: nextType === "video" ? nextMeetingLink : undefined,
        notes: nextNotes,
        panel: [],
      };

      const res = await applicationService.scheduleNextRound(app._id, payload);
      
      if (!res?.success) {
        throw new Error(res?.message || "Failed to schedule next round");
      }

      onUpdated?.(res.data);
      onClose();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to schedule next round");
    } finally {
      setLoading(false);
    }
  };

  if (!interview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-[#803791]/20 to-[#b87bd1]/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Interview Management</h2>
              <p className="text-white/60 text-sm mt-1">
                {app?.studentId?.firstName} {app?.studentId?.lastName} • {app?.jobId?.title}
              </p>
              <p className="text-white/40 text-xs mt-1">
                Round {interview.round} • {interview.stage}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-white/10 bg-white/5">
          <button
            onClick={() => setActiveTab("complete")}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "complete"
                ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <CheckCircle className="w-4 h-4 inline-block mr-2" />
            Complete Interview
          </button>
          <button
            onClick={() => setActiveTab("next-round")}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "next-round"
                ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <ArrowRight className="w-4 h-4 inline-block mr-2" />
            Schedule Next Round
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {activeTab === "complete" && (
            <div className="space-y-6">
              {/* Result Selection */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Interview Result *</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {INTERVIEW_RESULTS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setResult(r.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        result === r.value
                          ? `border-${r.color}-500 bg-${r.color}-500/10`
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <r.icon className={`w-5 h-5 mx-auto mb-2 ${result === r.value ? `text-${r.color}-400` : "text-white/60"}`} />
                      <div className={`text-sm font-semibold ${result === r.value ? `text-${r.color}-400` : "text-white/60"}`}>
                        {r.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Technical Skills: {technicalSkills}/5
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={technicalSkills}
                    onChange={(e) => setTechnicalSkills(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg bg-white/10 accent-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Communication: {communication}/5
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={communication}
                    onChange={(e) => setCommunication(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg bg-white/10 accent-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Problem Solving: {problemSolving}/5
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={problemSolving}
                    onChange={(e) => setProblemSolving(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg bg-white/10 accent-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Cultural Fit: {culturalFit}/5
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={culturalFit}
                    onChange={(e) => setCulturalFit(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg bg-white/10 accent-purple-500"
                  />
                </div>
              </div>

              {/* Overall Score */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">{overall}/5</div>
                  <div className="text-sm text-white/60">Overall Score</div>
                </div>
              </div>

              {/* Recommendation */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Recommendation *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {RECOMMENDATIONS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setRecommendation(r.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        recommendation === r.value
                          ? `border-${r.color}-500 bg-${r.color}-500/10`
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <r.icon className={`w-5 h-5 mx-auto mb-1 ${recommendation === r.value ? `text-${r.color}-400` : "text-white/60"}`} />
                      <div className={`text-sm font-semibold ${recommendation === r.value ? `text-${r.color}-400` : "text-white/60"}`}>
                        {r.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Strengths (comma separated)</label>
                  <textarea
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    placeholder="e.g., Strong problem solving, Good communication"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Weaknesses (comma separated)</label>
                  <textarea
                    value={weaknesses}
                    onChange={(e) => setWeaknesses(e.target.value)}
                    placeholder="e.g., Needs more experience, Slow response time"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50"
                    rows="3"
                  />
                </div>
              </div>

              {/* Feedback */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Detailed Feedback *</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide detailed feedback about the candidate's performance..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50"
                  rows="4"
                />
              </div>
            </div>
          )}

          {activeTab === "next-round" && (
            <div className="space-y-6">
              {/* Stage Selection */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Interview Stage *</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {INTERVIEW_STAGES.map((stage) => (
                    <button
                      key={stage.value}
                      onClick={() => setNextStage(stage.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        nextStage === stage.value
                          ? `border-${stage.color}-500 bg-${stage.color}-500/10`
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <stage.icon className={`w-5 h-5 mx-auto mb-2 ${nextStage === stage.value ? `text-${stage.color}-400` : "text-white/60"}`} />
                      <div className={`text-xs font-semibold ${nextStage === stage.value ? `text-${stage.color}-400` : "text-white/60"}`}>
                        {stage.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Date *</label>
                  <input
                    type="date"
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Time *</label>
                  <input
                    type="time"
                    value={nextTime}
                    onChange={(e) => setNextTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Duration (min)</label>
                  <input
                    type="number"
                    value={nextDuration}
                    onChange={(e) => setNextDuration(parseInt(e.target.value))}
                    min="15"
                    max="480"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>

              {/* Interview Type */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Interview Type *</label>
                <div className="grid grid-cols-3 gap-3">
                  {["video", "phone", "onsite"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setNextType(t)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        nextType === t
                          ? "border-purple-500 bg-purple-500/10 text-purple-400"
                          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meeting Link */}
              {nextType === "video" && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Meeting Link *</label>
                  <input
                    type="url"
                    value={nextMeetingLink}
                    onChange={(e) => setNextMeetingLink(e.target.value)}
                    placeholder="https://meet.google.com/..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Notes</label>
                <textarea
                  value={nextNotes}
                  onChange={(e) => setNextNotes(e.target.value)}
                  placeholder="Additional instructions or notes..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50"
                  rows="3"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={activeTab === "complete" ? handleCompleteInterview : handleScheduleNextRound}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <>
                  {activeTab === "complete" ? "Complete Interview" : "Schedule Next Round"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
