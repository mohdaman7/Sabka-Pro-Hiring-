// Tab Components for Application Detail View
import {
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
  MessageSquare,
  Send,
  Star,
  TrendingUp,
  Building2,
  Users,
  Video,
} from "lucide-react";
import { atsManagementService } from "@/services/atsManagementService";
import { useState } from "react";

const STATUS_STAGES = [
  { value: "applied", label: "Applied", color: "blue", icon: FileText },
  { value: "reviewed", label: "Reviewed", color: "purple", icon: Eye },
  { value: "shortlisted", label: "Shortlisted", color: "indigo", icon: Star },
  { value: "interview", label: "Interview", color: "amber", icon: Users },
  { value: "selected", label: "Selected", color: "emerald", icon: CheckCircle },
  { value: "hired", label: "Hired", color: "green", icon: Award },
];

export function OverviewTab({
  application,
  notes,
  setNotes,
  isEditingNotes,
  setIsEditingNotes,
  handleSaveNotes,
  newComment,
  setNewComment,
  rating,
  setRating,
  handleAddComment,
  handleStatusUpdate,
  currentStageIndex,
  handleViewPDF,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Candidate Info Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-indigo-500/30 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-6 h-6 text-indigo-400" />
              Candidate Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard 
              icon={Mail} 
              label="Email" 
              value={application.studentId?.email || application.email || "N/A"} 
            />
            <InfoCard 
              icon={Phone} 
              label="Phone" 
              value={application.studentId?.phone || application.phone || "N/A"} 
            />
            <InfoCard 
              icon={MapPin} 
              label="Location" 
              value={application.studentId?.location || application.location || "N/A"} 
            />
            <InfoCard
              icon={Calendar}
              label="Applied On"
              value={application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "N/A"}
            />
          </div>

          {application.skills && application.skills.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-indigo-400" />
                <h3 className="text-white font-semibold">Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Job Info */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-purple-500/30 shadow-2xl p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Briefcase className="w-6 h-6 text-purple-400" />
            Job Information
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/60 text-sm mb-1">Job Title</p>
              <p className="text-white font-bold text-lg">
                {application.jobId?.title || application.jobTitle || "N/A"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm mb-1">Company</p>
                <p className="text-white font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  {application.employerId?.companyName || 
                   (application.employerId?.firstName && application.employerId?.lastName 
                     ? `${application.employerId.firstName} ${application.employerId.lastName}`
                     : "N/A")}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm mb-1">Department</p>
                <p className="text-white font-medium">{application.jobId?.department || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        {application.resumeUrl && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-emerald-500/30 shadow-2xl p-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-emerald-400" />
              Documents
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-2 border-emerald-400 transition-all duration-300 hover:scale-105 shadow-lg text-center"
              >
                <Eye className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold">View Resume</p>
              </a>
              <a
                href={application.resumeUrl}
                download
                className="p-6 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border-2 border-blue-400 transition-all duration-300 hover:scale-105 shadow-lg text-center"
              >
                <Download className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold">Download</p>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Status Update */}
        <StatusUpdateCard
          application={application}
          handleStatusUpdate={handleStatusUpdate}
          currentStageIndex={currentStageIndex}
        />

        {/* Notes */}
        <NotesCard
          notes={notes}
          setNotes={setNotes}
          isEditingNotes={isEditingNotes}
          setIsEditingNotes={setIsEditingNotes}
          handleSaveNotes={handleSaveNotes}
          application={application}
        />

        {/* Rating */}
        <RatingCard
          rating={rating}
          setRating={setRating}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          application={application}
        />
      </div>
    </div>
  );
}

export function TimelineTab({ application }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-indigo-500/30 shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">
        <Clock className="w-7 h-7 text-indigo-400" />
        Application Timeline
      </h2>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
        <div className="space-y-6">
          {application.statusHistory && application.statusHistory.length > 0 ? (
            application.statusHistory.map((item, index) => {
              const stage = STATUS_STAGES.find((s) => s.value === item.status);
              const Icon = stage?.icon || Clock;
              return (
                <div key={index} className="relative pl-16">
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 border-4 border-slate-900 flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white/5 border-2 border-white/10 rounded-xl p-6">
                    <h3 className="text-white font-bold text-lg">{stage?.label || item.status}</h3>
                    <span className="text-white/60 text-sm">
                      {new Date(item.timestamp || item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-white/60 text-center py-12">No timeline history</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function DocumentsTab({ application }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-emerald-500/30 shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">
        <FileText className="w-7 h-7 text-emerald-400" />
        Documents
      </h2>
      {application.resumeUrl ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DocumentCard
            name="Resume"
            url={application.resumeUrl}
            icon={FileText}
            color="emerald"
          />
        </div>
      ) : (
        <p className="text-white/60 text-center py-12">No documents available</p>
      )}
    </div>
  );
}

export function CommunicationTab({ application }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-green-500/30 shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">
        <MessageSquare className="w-7 h-7 text-green-400" />
        Communication Logs
      </h2>
      <p className="text-white/60 text-center py-12">No communication logs available</p>
    </div>
  );
}

export function AssignmentTab({ application, applicationId, onUpdate }) {
  const [selectedHR, setSelectedHR] = useState(application.assignedTo || "");
  const handleAssign = async () => {
    try {
      await atsManagementService.assignHR(applicationId, selectedHR);
      onUpdate();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-blue-500/30 shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">
        <Users className="w-7 h-7 text-blue-400" />
        HR Assignment
      </h2>
      <div>
        <label className="text-white font-semibold mb-3 block">Assign HR Staff</label>
        <select
          value={selectedHR}
          onChange={(e) => setSelectedHR(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-blue-500 text-white mb-4"
        >
          <option value="">Select HR Staff</option>
          <option value="hr1">John Doe</option>
          <option value="hr2">Jane Smith</option>
        </select>
        <button
          onClick={handleAssign}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold"
        >
          Assign
        </button>
      </div>
    </div>
  );
}

// Helper Components
function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
      <Icon className="w-5 h-5 text-indigo-400 mt-0.5" />
      <div>
        <p className="text-white/60 text-sm">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

function StatusUpdateCard({ application, handleStatusUpdate, currentStageIndex }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-amber-500/30 shadow-2xl p-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-amber-400" />
        Update Status
      </h2>
      <div className="space-y-3">
        {STATUS_STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = stage.value === application.status;
          return (
            <button
              key={stage.value}
              onClick={() => handleStatusUpdate(stage.value)}
              disabled={isActive}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400"
                  : "bg-white/5 border-white/10 hover:border-indigo-500/50"
              }`}
            >
              <Icon className="w-5 h-5 text-white" />
              <span className="font-semibold text-white">{stage.label}</span>
              {isActive && <CheckCircle className="w-5 h-5 text-white ml-auto" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NotesCard({
  notes,
  setNotes,
  isEditingNotes,
  setIsEditingNotes,
  handleSaveNotes,
  application,
}) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-indigo-500/30 shadow-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-indigo-400" />
          Notes
        </h2>
        {!isEditingNotes ? (
          <button
            onClick={() => setIsEditingNotes(true)}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSaveNotes} className="p-2 rounded-lg bg-green-600">
              <Save className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => {
                setIsEditingNotes(false);
                setNotes(application.notes || "");
              }}
              className="p-2 rounded-lg bg-red-600"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
      </div>
      {isEditingNotes ? (
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-40 p-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-indigo-500 text-white resize-none"
          placeholder="Add notes..."
        />
      ) : (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 min-h-[160px]">
          <p className="text-white/80">{notes || "No notes"}</p>
        </div>
      )}
    </div>
  );
}

function RatingCard({
  rating,
  setRating,
  newComment,
  setNewComment,
  handleAddComment,
  application,
}) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-yellow-500/30 shadow-2xl p-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
        <Star className="w-6 h-6 text-yellow-400" />
        Rating
      </h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)}>
              <Star
                className={`w-8 h-8 ${
                  star <= rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"
                }`}
              />
            </button>
          ))}
        </div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full h-24 p-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-yellow-500 text-white resize-none"
          placeholder="Add comment..."
        />
        <button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Add Comment
        </button>
      </div>
    </div>
  );
}

function DocumentCard({ name, url, icon: Icon, color }) {
  return (
    <div className="bg-white/5 border-2 border-white/10 rounded-xl p-6">
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${color}-600 to-${color}-700 flex items-center justify-center mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-white font-bold text-lg mb-4">{name}</h3>
      <div className="flex gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold text-center"
        >
          View
        </a>
        <a
          href={url}
          download
          className="flex-1 py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold text-center"
        >
          Download
        </a>
      </div>
    </div>
  );
}
