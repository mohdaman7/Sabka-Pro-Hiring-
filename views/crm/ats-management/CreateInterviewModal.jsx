"use client";
import { useState, useEffect } from "react";
import { X, Calendar, Clock, Video, Phone, MapPin, User, Briefcase, Mail, Link as LinkIcon, Users } from "lucide-react";

const INTERVIEW_TYPES = [
  { value: "video", label: "Video Call", icon: Video, color: "indigo" },
  { value: "phone", label: "Phone Call", icon: Phone, color: "blue" },
  { value: "onsite", label: "On-site", icon: MapPin, color: "purple" },
];

export default function CreateInterviewModal({ onClose, onSubmit, interview = null, applications = [], jobs = [] }) {
  const [formData, setFormData] = useState({
    applicationId: interview?.applicationId || "",
    jobId: interview?.jobId || "",
    candidateName: interview?.candidateName || "",
    candidateEmail: interview?.candidateEmail || "",
    candidatePhone: interview?.candidatePhone || "",
    jobTitle: interview?.jobTitle || "",
    scheduledDate: interview?.scheduledDate ? new Date(interview.scheduledDate).toISOString().slice(0, 16) : "",
    duration: interview?.duration || 60,
    type: interview?.type || "video",
    interviewer: interview?.interviewer || "",
    interviewers: interview?.interviewers || [],
    meetingLink: interview?.meetingLink || "",
    location: interview?.location || "",
    notes: interview?.notes || "",
  });

  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    if (formData.applicationId && applications.length > 0) {
      const app = applications.find((a) => a._id === formData.applicationId);
      if (app) {
        setSelectedApplication(app);
        setFormData((prev) => ({
          ...prev,
          candidateName: app.studentId?.firstName + " " + app.studentId?.lastName || "",
          candidateEmail: app.studentId?.email || "",
          candidatePhone: app.studentId?.phone || "",
          jobTitle: app.jobId?.title || "",
          jobId: app.jobId?._id || "",
        }));
      }
    }
  }, [formData.applicationId, applications]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isUpdate = !!interview;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a0b2e] to-[#0a0118] rounded-2xl border border-purple-500/30 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#2a0a42]/95 via-[#3b0f63]/95 to-[#2a0a42]/95 backdrop-blur-xl border-b border-purple-500/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isUpdate ? "Update Interview" : "Schedule New Interview"}
              </h2>
              <p className="text-white/60 text-sm mt-1">Fill in the interview details below</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Select Application */}
          {!isUpdate && applications.length > 0 && (
            <div>
              <label className="text-white font-semibold mb-2 block">Select Application</label>
              <select
                value={formData.applicationId}
                onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
                className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500"
                required={!isUpdate}
              >
                <option value="">Choose an application...</option>
                {applications.map((app) => (
                  <option key={app._id} value={app._id}>
                    {app.studentId?.firstName} {app.studentId?.lastName} - {app.jobId?.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Candidate Information */}
          <div className="bg-white/5 rounded-xl border border-purple-500/20 p-4">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Candidate Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/70 text-sm mb-2 block">Candidate Name</label>
                <input
                  type="text"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500"
                  required
                  readOnly={!!selectedApplication}
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.candidateEmail}
                  onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500"
                  required
                  readOnly={!!selectedApplication}
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Phone</label>
                <input
                  type="tel"
                  value={formData.candidatePhone}
                  onChange={(e) => setFormData({ ...formData, candidatePhone: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500"
                  readOnly={!!selectedApplication}
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500"
                  required
                  readOnly={!!selectedApplication}
                />
              </div>
            </div>
          </div>

          {/* Schedule Details */}
          <div className="bg-white/5 rounded-xl border border-purple-500/20 p-4">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Schedule Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/70 text-sm mb-2 block">Date & Time *</label>
                <input
                  type="datetime-local"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500"
                  min="15"
                  step="15"
                />
              </div>
            </div>
          </div>

          {/* Interview Type */}
          <div>
            <label className="text-white font-semibold mb-3 block">Interview Type *</label>
            <div className="grid grid-cols-3 gap-3">
              {INTERVIEW_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.type === type.value
                        ? "bg-purple-600 border-purple-500 text-white shadow-lg ring-2 ring-purple-500/50"
                        : "bg-white/5 border-purple-500/20 text-white/60 hover:bg-white/10 hover:border-purple-500/40"
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-semibold">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interviewer */}
          <div>
            <label className="text-white font-semibold mb-2 block">Interviewer(s)</label>
            <input
              type="text"
              value={formData.interviewer}
              onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
              placeholder="Enter interviewer name(s)"
              className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* Meeting Link / Location */}
          {formData.type === "video" && (
            <div>
              <label className="text-white font-semibold mb-2 block flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-purple-400" />
                Meeting Link
              </label>
              <input
                type="url"
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                placeholder="https://zoom.us/j/..."
                className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {formData.type === "onsite" && (
            <div>
              <label className="text-white font-semibold mb-2 block flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Office address"
                className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-white font-semibold mb-2 block">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full h-24 p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 resize-none"
              placeholder="Any special instructions or notes..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-lg transition-all hover:scale-105"
            >
              {isUpdate ? "Update Interview" : "Schedule Interview"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
