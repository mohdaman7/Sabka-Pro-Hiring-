"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Download,
  Eye,
  Edit,
  Save,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Send,
  Star,
  TrendingUp,
  Building2,
  Users,
  Video,
} from "lucide-react";
import { atsManagementService } from "@/services/atsManagementService";
import {
  OverviewTab,
  TimelineTab,
  DocumentsTab,
  CommunicationTab,
  AssignmentTab,
} from "./ApplicationDetailTabs";

const STATUS_STAGES = [
  { value: "applied", label: "Applied", color: "blue", icon: FileText },
  { value: "reviewed", label: "Reviewed", color: "purple", icon: Eye },
  { value: "shortlisted", label: "Shortlisted", color: "indigo", icon: Star },
  { value: "interview", label: "Interview", color: "amber", icon: Users },
  { value: "selected", label: "Selected", color: "emerald", icon: CheckCircle },
  { value: "hired", label: "Hired", color: "green", icon: Award },
  { value: "rejected", label: "Rejected", color: "red", icon: XCircle },
];

export default function ApplicationDetailView({ applicationId, onClose }) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (applicationId) {
      loadApplicationDetails();
    }
  }, [applicationId]);

  const loadApplicationDetails = async () => {
    try {
      setLoading(true);
      const data = await atsManagementService.getApplicationById(applicationId);
      setApplication(data);
      setNotes(data.notes || "");
    } catch (error) {
      console.error("Error loading application:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await atsManagementService.updateApplicationStatus(applicationId, newStatus);
      loadApplicationDetails();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSaveNotes = async () => {
    try {
      await atsManagementService.addNote(applicationId, notes);
      setIsEditingNotes(false);
      loadApplicationDetails();
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await atsManagementService.addComment(applicationId, {
        text: newComment,
        rating,
      });
      setNewComment("");
      setRating(0);
      loadApplicationDetails();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70 text-lg">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-white text-xl">Application not found</p>
        </div>
      </div>
    );
  };

  const currentStageIndex = STATUS_STAGES.findIndex(
    (s) => s.value === application.status
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header - See next file for full implementation */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-indigo-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <User className="w-7 h-7 text-indigo-400" />
                  {application.candidateName}
                </h1>
                <p className="text-white/60 text-sm mt-1">
                  Application ID: #{application._id?.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3">
              {STATUS_STAGES.map((stage) => {
                if (stage.value === application.status) {
                  const Icon = stage.icon;
                  return (
                    <div
                      key={stage.value}
                      className={`px-6 py-3 rounded-2xl font-bold text-white shadow-2xl border-2 bg-gradient-to-r ${
                        stage.color === "blue"
                          ? "from-blue-600 to-blue-700 border-blue-400"
                          : stage.color === "purple"
                          ? "from-purple-600 to-purple-700 border-purple-400"
                          : stage.color === "indigo"
                          ? "from-indigo-600 to-indigo-700 border-indigo-400"
                          : stage.color === "amber"
                          ? "from-amber-600 to-amber-700 border-amber-400"
                          : stage.color === "emerald"
                          ? "from-emerald-600 to-emerald-700 border-emerald-400"
                          : stage.color === "green"
                          ? "from-green-600 to-green-700 border-green-400"
                          : "from-red-600 to-red-700 border-red-400"
                      }`}
                    >
                      <Icon className="w-5 h-5 inline-block mr-2" />
                      {stage.label}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Overview", icon: Eye },
              { id: "timeline", label: "Timeline", icon: Clock },
              { id: "documents", label: "Documents", icon: FileText },
              { id: "communication", label: "Communication", icon: MessageSquare },
              { id: "assignment", label: "Assignment", icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border-2 border-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <OverviewTab
            application={application}
            notes={notes}
            setNotes={setNotes}
            isEditingNotes={isEditingNotes}
            setIsEditingNotes={setIsEditingNotes}
            handleSaveNotes={handleSaveNotes}
            newComment={newComment}
            setNewComment={setNewComment}
            rating={rating}
            setRating={setRating}
            handleAddComment={handleAddComment}
            handleStatusUpdate={handleStatusUpdate}
            currentStageIndex={currentStageIndex}
          />
        )}

        {activeTab === "timeline" && <TimelineTab application={application} />}

        {activeTab === "documents" && <DocumentsTab application={application} />}

        {activeTab === "communication" && <CommunicationTab application={application} />}

        {activeTab === "assignment" && (
          <AssignmentTab
            application={application}
            applicationId={applicationId}
            onUpdate={loadApplicationDetails}
          />
        )}
      </div>
    </div>
  );
}
