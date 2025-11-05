"use client";

import { useState, useEffect, useRef } from "react";
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
  Printer,
  RefreshCw,
  Maximize2,
} from "lucide-react";
import { atsManagementService } from "@/services/atsManagementService";
import {
  OverviewTab,
  TimelineTab,
  DocumentsTab,
  CommunicationTab,
  AssignmentTab,
} from "./ApplicationDetailTabs";
import PDFViewerModal from "./PDFViewerModal";
import SendMessageModal from "./SendMessageModal";

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
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const detailViewRef = useRef(null);

  // Keyboard shortcuts (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Real-time updates (refresh every 30 seconds)
  useEffect(() => {
    if (applicationId) {
      loadApplicationDetails();

      const interval = setInterval(() => {
        loadApplicationDetails(true); // Silent refresh
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [applicationId]);

  const loadApplicationDetails = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const response = await atsManagementService.getApplicationById(
        applicationId
      );
      // Handle nested response structure
      const data =
        response.application ||
        response.data?.application ||
        response.data ||
        response;
      console.log("Application data:", data); // Debug log
      setApplication(data);
      setNotes(data.notes || "");
    } catch (error) {
      console.error("Error loading application:", error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadApplicationDetails();
    setIsRefreshing(false);
  };

  const handleViewPDF = (url) => {
    setPdfUrl(url);
    setShowPDFViewer(true);
  };

  const handleExportToPDF = async () => {
    try {
      const element = detailViewRef.current;
      if (!element) return;

      // Dynamic imports to avoid SSR issues
      const { jsPDF } = await import("jspdf");
      const html2canvas = (await import("html2canvas")).default;

      // Create canvas from element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#0f172a",
      });

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add image to PDF (handle multiple pages if needed)
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297; // A4 height in mm

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      // Save PDF
      const filename = `application-${
        application.candidateName || application._id
      }.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      alert(
        "Failed to export PDF. Please ensure jspdf and html2canvas are installed."
      );
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await atsManagementService.updateApplicationStatus(
        applicationId,
        newStatus
      );
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70 text-lg">
            Loading application details...
          </p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-white text-xl">Application not found</p>
        </div>
      </div>
    );
  }

  const currentStageIndex = STATUS_STAGES.findIndex(
    (s) => s.value === application.status
  );

  return (
    <div ref={detailViewRef} className="relative min-h-screen overflow-hidden">
      {/* Premium Animated Background - Matching ApplicationsModule */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "rgba(128,55,145,0.12)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "rgba(184,123,209,0.08)",
            animation: "float 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "rgba(240,194,238,0.05)",
            animation: "float 12s ease-in-out infinite reverse",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_50%)]" />
      </div>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#2a0a42]/90 via-[#3b0f63]/90 to-[#2a0a42]/90 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:scale-110"
                title="Close (ESC)"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <User className="w-7 h-7 text-indigo-400" />
                  {application.studentId?.firstName &&
                  application.studentId?.lastName
                    ? `${application.studentId.firstName} ${application.studentId.lastName}`
                    : application.candidateName || "Candidate"}
                </h1>
                <p className="text-white/60 text-sm mt-1">
                  Application ID: #{application._id?.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-green-500/50 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                title="Refresh Data"
              >
                <RefreshCw
                  className={`w-5 h-5 text-white ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
              </button>

              <button
                onClick={() => setShowMessageModal(true)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
                title="Send Message"
              >
                <Send className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handleExportToPDF}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
                title="Export to PDF"
              >
                <Printer className="w-5 h-5 text-white" />
              </button>

              {/* Status Badge */}
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
              {
                id: "communication",
                label: "Communication",
                icon: MessageSquare,
              },
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
            handleViewPDF={handleViewPDF}
          />
        )}

        {activeTab === "timeline" && <TimelineTab application={application} />}

        {activeTab === "documents" && (
          <DocumentsTab application={application} />
        )}

        {activeTab === "communication" && (
          <CommunicationTab application={application} />
        )}

        {activeTab === "assignment" && (
          <AssignmentTab
            application={application}
            applicationId={applicationId}
            onUpdate={loadApplicationDetails}
          />
        )}
      </div>

      {/* PDF Viewer Modal */}
      {showPDFViewer && (
        <PDFViewerModal
          pdfUrl={pdfUrl}
          onClose={() => setShowPDFViewer(false)}
        />
      )}

      {/* Send Message Modal */}
      {showMessageModal && (
        <SendMessageModal
          application={application}
          onClose={() => setShowMessageModal(false)}
          onSent={() => {
            setShowMessageModal(false);
            loadApplicationDetails();
          }}
        />
      )}
    </div>
  );
}
