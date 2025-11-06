"use client";
import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  Briefcase,
  Mail,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  MessageSquare,
  Send,
  AlertCircle,
  Award,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { customToast } from "@/components/ui/toast";

const STATUS_BADGES = {
  scheduled: { label: "Scheduled", color: "bg-blue-500", icon: Clock },
  completed: { label: "Completed", color: "bg-green-500", icon: CheckCircle },
  "no-show": { label: "No Show", color: "bg-gray-500", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-red-500", icon: XCircle },
};

export default function InterviewManagementModal({ interview, application, onClose, onUpdate, onReschedule, onCancel, onComplete }) {
  const [activeTab, setActiveTab] = useState("details");
  const [evaluation, setEvaluation] = useState({
    technicalSkills: interview?.evaluation?.technicalSkills || 0,
    communication: interview?.evaluation?.communication || 0,
    problemSolving: interview?.evaluation?.problemSolving || 0,
    culturalFit: interview?.evaluation?.culturalFit || 0,
    overallRating: interview?.evaluation?.overallRating || 0,
    strengths: interview?.evaluation?.strengths || [],
    weaknesses: interview?.evaluation?.weaknesses || [],
    comments: interview?.evaluation?.comments || "",
    recommendation: interview?.result || "pending",
  });
  const [newStrength, setNewStrength] = useState("");
  const [newWeakness, setNewWeakness] = useState("");

  const StatusBadge = STATUS_BADGES[interview?.status] || STATUS_BADGES.scheduled;
  const TypeIcon = interview?.type === "video" ? Video : interview?.type === "phone" ? Phone : MapPin;

  const handleSaveEvaluation = async () => {
    try {
      await onUpdate(interview._id, { evaluation, result: evaluation.recommendation });
      customToast.success(
        "Evaluation Saved! ⭐",
        "Interview evaluation has been saved successfully"
      );
    } catch (error) {
      console.error("Error saving evaluation:", error);
      customToast.error(
        "Save Failed",
        error?.response?.data?.message || "Failed to save evaluation"
      );
    }
  };

  const addStrength = () => {
    if (newStrength.trim()) {
      setEvaluation({
        ...evaluation,
        strengths: [...evaluation.strengths, newStrength.trim()],
      });
      setNewStrength("");
    }
  };

  const addWeakness = () => {
    if (newWeakness.trim()) {
      setEvaluation({
        ...evaluation,
        weaknesses: [...evaluation.weaknesses, newWeakness.trim()],
      });
      setNewWeakness("");
    }
  };

  const removeStrength = (index) => {
    setEvaluation({
      ...evaluation,
      strengths: evaluation.strengths.filter((_, i) => i !== index),
    });
  };

  const removeWeakness = (index) => {
    setEvaluation({
      ...evaluation,
      weaknesses: evaluation.weaknesses.filter((_, i) => i !== index),
    });
  };

  if (!interview) return null;

  const candidate = application?.studentId || interview?.candidateId || {};
  const job = application?.jobId || interview?.jobId || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-2xl border border-purple-500/30 shadow-2xl">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: "linear-gradient(135deg, #803791, #b87bd1)" }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: "linear-gradient(135deg, #b87bd1, #803791)" }}
          />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-900/95 via-purple-800/95 to-purple-900/95 backdrop-blur-xl border-b border-purple-500/30 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">Interview Management</h2>
                <span className={`px-4 py-1.5 rounded-full text-white text-sm font-semibold ${StatusBadge.color} flex items-center gap-2`}>
                  <StatusBadge.icon className="w-4 h-4" />
                  {StatusBadge.label}
                </span>
              </div>
              <p className="text-white/60 text-sm">Round {interview.round} - {interview.stage}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: "details", label: "Details", icon: Calendar },
              { id: "evaluation", label: "Evaluation", icon: Star },
              { id: "actions", label: "Actions", icon: Edit },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Candidate Info */}
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <User className="w-6 h-6 text-purple-400" />
                  Candidate Information
                </h3>
                <div className="space-y-3">
                  <InfoRow icon={User} label="Name" value={`${candidate.firstName} ${candidate.lastName}`} />
                  <InfoRow icon={Mail} label="Email" value={candidate.email} />
                  <InfoRow icon={Phone} label="Phone" value={candidate.phone || "N/A"} />
                  <InfoRow icon={Briefcase} label="Applied For" value={job.title} />
                </div>
              </div>

              {/* Interview Details */}
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  Interview Details
                </h3>
                <div className="space-y-3">
                  <InfoRow
                    icon={Calendar}
                    label="Date"
                    value={interview.scheduledAt ? new Date(interview.scheduledAt).toLocaleDateString() : "N/A"}
                  />
                  <InfoRow
                    icon={Clock}
                    label="Time"
                    value={interview.scheduledAt ? new Date(interview.scheduledAt).toLocaleTimeString() : "N/A"}
                  />
                  <InfoRow icon={Clock} label="Duration" value={`${interview.durationMinutes || 60} minutes`} />
                  <InfoRow icon={TypeIcon} label="Type" value={interview.type?.toUpperCase() || "N/A"} />
                  {interview.meetingLink && (
                    <InfoRow icon={Video} label="Meeting Link">
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 font-medium hover:underline text-sm"
                      >
                        {interview.meetingLink}
                      </a>
                    </InfoRow>
                  )}
                  {interview.location?.address && (
                    <InfoRow icon={MapPin} label="Location" value={interview.location.address} />
                  )}
                </div>
              </div>

              {/* Interviewers */}
              {interview.interviewers && interview.interviewers.length > 0 && (
                <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5 lg:col-span-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                    <User className="w-6 h-6 text-purple-400" />
                    Interviewers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {interview.interviewers.map((interviewer, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{interviewer.name}</p>
                          <p className="text-white/60 text-xs">{interviewer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "evaluation" && (
            <div className="space-y-6">
              {/* Rating Sections */}
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-yellow-400" />
                  Performance Ratings
                </h3>

                <div className="space-y-5">
                  {[
                    { key: "technicalSkills", label: "Technical Skills" },
                    { key: "communication", label: "Communication" },
                    { key: "problemSolving", label: "Problem Solving" },
                    { key: "culturalFit", label: "Cultural Fit" },
                    { key: "overallRating", label: "Overall Rating" },
                  ].map((rating) => (
                    <div key={rating.key}>
                      <label className="text-white font-semibold mb-3 block">{rating.label}</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setEvaluation({ ...evaluation, [rating.key]: star })}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= evaluation[rating.key] ? "fill-yellow-400 text-yellow-400" : "text-white/30"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <ThumbsUp className="w-5 h-5 text-green-400" />
                    Strengths
                  </h3>
                  <div className="space-y-2 mb-4">
                    {evaluation.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/30">
                        <span className="flex-1 text-white text-sm">{strength}</span>
                        <button
                          onClick={() => removeStrength(index)}
                          className="p-1 rounded hover:bg-red-500/20 transition-colors"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newStrength}
                      onChange={(e) => setNewStrength(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addStrength()}
                      placeholder="Add a strength..."
                      className="flex-1 p-2 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 text-sm"
                    />
                    <button
                      onClick={addStrength}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <ThumbsDown className="w-5 h-5 text-red-400" />
                    Areas for Improvement
                  </h3>
                  <div className="space-y-2 mb-4">
                    {evaluation.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                        <span className="flex-1 text-white text-sm">{weakness}</span>
                        <button
                          onClick={() => removeWeakness(index)}
                          className="p-1 rounded hover:bg-red-500/20 transition-colors"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newWeakness}
                      onChange={(e) => setNewWeakness(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addWeakness()}
                      placeholder="Add an area to improve..."
                      className="flex-1 p-2 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 text-sm"
                    />
                    <button
                      onClick={addWeakness}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  Detailed Comments
                </h3>
                <textarea
                  value={evaluation.comments}
                  onChange={(e) => setEvaluation({ ...evaluation, comments: e.target.value })}
                  className="w-full h-32 p-4 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="Add detailed feedback about the candidate's performance..."
                />
              </div>

              {/* Recommendation */}
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-purple-400" />
                  Final Recommendation
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "selected", label: "Selected", color: "green" },
                    { value: "pending", label: "Pending", color: "amber" },
                    { value: "rejected", label: "Rejected", color: "red" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setEvaluation({ ...evaluation, recommendation: option.value })}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                        evaluation.recommendation === option.value
                          ? `bg-${option.color}-600 text-white shadow-lg ring-2 ring-${option.color}-500`
                          : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveEvaluation}
                className="w-full px-6 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Save Evaluation
              </button>
            </div>
          )}

          {activeTab === "actions" && (
            <div className="space-y-4">
              {interview.status === "scheduled" && (
                <>
                  <button
                    onClick={() => onReschedule(interview)}
                    className="w-full px-6 py-4 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Edit className="w-5 h-5" />
                    Reschedule Interview
                  </button>
                  <button
                    onClick={() => onComplete(interview._id)}
                    className="w-full px-6 py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => onCancel(interview._id)}
                    className="w-full px-6 py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Cancel Interview
                  </button>
                </>
              )}
              {interview.status !== "scheduled" && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-white font-semibold mb-2">Interview {interview.status}</p>
                  <p className="text-white/60 text-sm">
                    No actions available for {interview.status} interviews.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, children }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
      {Icon && <Icon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-white/60 text-sm mb-1">{label}</p>
        {children || <p className="text-white font-medium break-words">{value}</p>}
      </div>
    </div>
  );
}
