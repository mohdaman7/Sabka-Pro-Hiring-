"use client";
import { useState } from "react";
import {
  X,
  User,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  Mail,
  Building2,
  Star,
  MessageSquare,
  FileText,
  Send,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Link as LinkIcon,
} from "lucide-react";

const STATUS_BADGES = {
  scheduled: { label: "Scheduled", color: "bg-blue-500", icon: Calendar },
  completed: { label: "Completed", color: "bg-green-500", icon: CheckCircle },
  "no-show": { label: "No Show", color: "bg-gray-500", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-red-500", icon: XCircle },
};

export default function InterviewDetailModal({ interview, onClose, onUpdate, onReschedule, onCancel, onComplete }) {
  const [activeTab, setActiveTab] = useState("details");
  const [feedback, setFeedback] = useState({
    technicalRating: interview?.evaluation?.technicalRating || 0,
    communicationRating: interview?.evaluation?.communicationRating || 0,
    overallRating: interview?.evaluation?.overallRating || 0,
    comments: interview?.evaluation?.comments || "",
    decision: interview?.evaluation?.decision || "",
  });

  const handleSaveFeedback = async () => {
    try {
      await onUpdate(interview._id, { evaluation: feedback });
      // Handle success
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  const handleSendNotification = async (type) => {
    // Send email/SMS/WhatsApp notification
    console.log(`Sending ${type} notification for interview ${interview._id}`);
  };

  if (!interview) return null;

  const StatusBadge = STATUS_BADGES[interview.status] || STATUS_BADGES.scheduled;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a0b2e] to-[#0a0118] rounded-2xl border border-purple-500/30 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#2a0a42]/95 via-[#3b0f63]/95 to-[#2a0a42]/95 backdrop-blur-xl border-b border-purple-500/30 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">Interview Details</h2>
                <span className={`px-4 py-1.5 rounded-full text-white text-sm font-semibold ${StatusBadge.color} flex items-center gap-2`}>
                  <StatusBadge.icon className="w-4 h-4" />
                  {StatusBadge.label}
                </span>
              </div>
              <p className="text-white/60">ID: #{interview._id?.slice(-8).toUpperCase()}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {[
              { id: "details", label: "Details", icon: FileText },
              { id: "feedback", label: "Feedback & Evaluation", icon: Star },
              { id: "notifications", label: "Notifications", icon: Send },
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
        <div className="p-6">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Candidate Info */}
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <User className="w-6 h-6 text-purple-400" />
                  Candidate Information
                </h3>
                <div className="space-y-3">
                  <InfoRow icon={User} label="Name" value={interview.candidateName || "N/A"} />
                  <InfoRow icon={Mail} label="Email" value={interview.candidateEmail || "N/A"} />
                  <InfoRow icon={Phone} label="Phone" value={interview.candidatePhone || "N/A"} />
                  {interview.resumeUrl && (
                    <a
                      href={interview.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Download Resume</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Job & Employer Info */}
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <Briefcase className="w-6 h-6 text-purple-400" />
                  Job & Employer
                </h3>
                <div className="space-y-3">
                  <InfoRow icon={Briefcase} label="Job Title" value={interview.jobTitle || "N/A"} />
                  <InfoRow icon={Building2} label="Employer" value={interview.employerName || "N/A"} />
                  <InfoRow icon={User} label="Interviewer" value={interview.interviewer || interview.interviewers?.join(", ") || "N/A"} />
                </div>
              </div>

              {/* Schedule Info */}
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-6 lg:col-span-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  Schedule Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoRow
                    icon={Calendar}
                    label="Date"
                    value={interview.scheduledDate ? new Date(interview.scheduledDate).toLocaleDateString() : "N/A"}
                  />
                  <InfoRow
                    icon={Clock}
                    label="Time"
                    value={interview.scheduledDate ? new Date(interview.scheduledDate).toLocaleTimeString() : "N/A"}
                  />
                  <InfoRow icon={Clock} label="Duration" value={`${interview.duration || 60} minutes`} />
                  <InfoRow
                    icon={interview.type === "video" ? Video : interview.type === "phone" ? Phone : MapPin}
                    label="Type"
                    value={interview.type?.toUpperCase() || "N/A"}
                  />
                  {interview.meetingLink && (
                    <div className="md:col-span-2">
                      <InfoRow icon={LinkIcon} label="Meeting Link">
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 font-medium hover:underline"
                        >
                          {interview.meetingLink}
                        </a>
                      </InfoRow>
                    </div>
                  )}
                  {interview.location && (
                    <div className="md:col-span-2">
                      <InfoRow icon={MapPin} label="Location" value={interview.location} />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-purple-500/20">
                  {interview.status === "scheduled" && (
                    <>
                      <button
                        onClick={() => onReschedule(interview)}
                        className="px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Reschedule
                      </button>
                      <button
                        onClick={() => onComplete(interview._id)}
                        className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => onCancel(interview._id)}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Cancel Interview
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 text-yellow-400" />
                Interview Evaluation & Feedback
              </h3>

              <div className="space-y-6">
                {/* Rating Sections */}
                <div>
                  <label className="text-white font-semibold mb-3 block">Technical Skills</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFeedback({ ...feedback, technicalRating: rating })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= feedback.technicalRating ? "fill-yellow-400 text-yellow-400" : "text-white/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white font-semibold mb-3 block">Communication Skills</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFeedback({ ...feedback, communicationRating: rating })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= feedback.communicationRating ? "fill-yellow-400 text-yellow-400" : "text-white/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white font-semibold mb-3 block">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFeedback({ ...feedback, overallRating: rating })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= feedback.overallRating ? "fill-yellow-400 text-yellow-400" : "text-white/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="text-white font-semibold mb-3 block">Comments & Notes</label>
                  <textarea
                    value={feedback.comments}
                    onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                    className="w-full h-32 bg-white/5 border border-purple-500/20 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 resize-none"
                    placeholder="Add detailed feedback about the candidate's performance..."
                  />
                </div>

                {/* Decision */}
                <div>
                  <label className="text-white font-semibold mb-3 block">Decision</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "selected", label: "Selected", color: "green" },
                      { value: "next-round", label: "Next Round", color: "amber" },
                      { value: "rejected", label: "Rejected", color: "red" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFeedback({ ...feedback, decision: option.value })}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                          feedback.decision === option.value
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
                  onClick={handleSaveFeedback}
                  className="w-full px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Save Evaluation
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <Send className="w-6 h-6 text-purple-400" />
                  Send Notifications
                </h3>
                <p className="text-white/60 mb-6">Send interview details and reminders to candidate and interviewer</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleSendNotification("email")}
                    className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/20 text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5 text-purple-400" />
                    Send Email
                  </button>
                  <button
                    onClick={() => handleSendNotification("sms")}
                    className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/20 text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    Send SMS
                  </button>
                  <button
                    onClick={() => handleSendNotification("whatsapp")}
                    className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/20 text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5 text-purple-400" />
                    Send WhatsApp
                  </button>
                </div>
              </div>

              {/* Auto Reminder Settings */}
              <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-400" />
                  Automated Reminders
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-white p-3 rounded-xl bg-white/5">
                    <input type="checkbox" className="w-5 h-5 rounded bg-white/10 border-purple-500/50" defaultChecked />
                    <span>Send reminder 1 day before interview</span>
                  </label>
                  <label className="flex items-center gap-3 text-white p-3 rounded-xl bg-white/5">
                    <input type="checkbox" className="w-5 h-5 rounded bg-white/10 border-purple-500/50" defaultChecked />
                    <span>Send reminder 1 hour before interview</span>
                  </label>
                  <label className="flex items-center gap-3 text-white p-3 rounded-xl bg-white/5">
                    <input type="checkbox" className="w-5 h-5 rounded bg-white/10 border-purple-500/50" />
                    <span>Send thank you message after completion</span>
                  </label>
                </div>
              </div>
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
      {Icon && <Icon className="w-5 h-5 text-purple-400 mt-0.5" />}
      <div className="flex-1">
        <p className="text-white/60 text-sm mb-1">{label}</p>
        {children || <p className="text-white font-medium">{value}</p>}
      </div>
    </div>
  );
}
