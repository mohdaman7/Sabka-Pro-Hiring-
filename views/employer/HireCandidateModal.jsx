"use client";
import { useState } from "react";
import { X, CheckCircle, Calendar, DollarSign, FileText, Briefcase, User, Mail, Phone, Award, Sparkles } from "lucide-react";
import { customToast } from "@/components/ui/toast";
import { triggerSuccessAnimation } from "@/utils/successAnimations";

export default function HireCandidateModal({ application, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    joiningDate: "",
    salary: "",
    position: application?.jobId?.title || "",
    offerLetter: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        salary: Number(formData.salary),
      };
      await onConfirm(application._id, payload);
      
      // Trigger milestone animation for hiring
      triggerSuccessAnimation({ type: "milestone" });
      
      customToast.success(
        "Candidate Hired Successfully! 🎉",
        `${candidate.firstName} ${candidate.lastName} has been hired for ${formData.position}`
      );
      onClose();
    } catch (error) {
      console.error("Error hiring candidate:", error);
      customToast.error(
        "Failed to Hire Candidate",
        error?.response?.data?.message || error?.message || "An error occurred while hiring the candidate"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!application) return null;

  const candidate = application.studentId || {};
  const job = application.jobId || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-2xl border border-purple-500/30 shadow-2xl">
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
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-green-500/20 border border-green-500/30">
                  <Award className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Hire Candidate</h2>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              <p className="text-white/60 text-sm">Complete the hiring process and send offer letter</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="relative p-6 space-y-6">
          {/* Candidate Info Card */}
          <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Candidate Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <User className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white/60 text-xs">Name</p>
                  <p className="text-white font-medium">
                    {candidate.firstName} {candidate.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <Mail className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white/60 text-xs">Email</p>
                  <p className="text-white font-medium text-sm">{candidate.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <Phone className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white/60 text-xs">Phone</p>
                  <p className="text-white font-medium">{candidate.phone || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <Briefcase className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white/60 text-xs">Applied For</p>
                  <p className="text-white font-medium">{job.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Details */}
          <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Offer Details
            </h3>

            <div className="space-y-4">
              {/* Position */}
              <div>
                <label className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  Position / Job Title *
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                  required
                />
              </div>

              {/* Joining Date */}
              <div>
                <label className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Expected Joining Date *
                </label>
                <input
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500 transition-all"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Salary */}
              <div>
                <label className="text-white font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-purple-400" />
                  Annual Salary (CTC) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">₹</span>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g., 600000"
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                    required
                    min="0"
                  />
                </div>
                <p className="text-white/40 text-xs mt-1">Enter annual salary in INR</p>
              </div>

              {/* Offer Letter URL */}
              <div>
                <label className="text-white font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  Offer Letter URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.offerLetter}
                  onChange={(e) => setFormData({ ...formData, offerLetter: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                />
                <p className="text-white/40 text-xs mt-1">Link to the offer letter document</p>
              </div>

              {/* Notes */}
              <div>
                <label className="text-white font-semibold mb-2 block">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional information or instructions..."
                  className="w-full h-24 p-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 resize-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-700 hover:to-emerald-700 shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Confirm & Hire Candidate
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-4 rounded-xl bg-white/5 border border-purple-500/20 text-white font-semibold hover:bg-white/10 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-300 text-sm flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                Once confirmed, the candidate will be marked as <strong>Hired</strong> and will receive a notification
                with the offer details. The application status will be updated automatically.
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
