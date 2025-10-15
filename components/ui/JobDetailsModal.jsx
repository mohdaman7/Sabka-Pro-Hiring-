import { useState } from "react";
import {
  X,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Calendar,
  Users,
  Building2,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Bookmark,
  CheckCircle,
  Award,
  Target,
  TrendingUp,
  FileText,
} from "lucide-react";

export default function JobDetailsModal({
  job,
  isOpen,
  onClose,
  onApply,
  isSaved,
  onToggleSave,
}) {
  const [activeTab, setActiveTab] = useState("description");

  if (!isOpen || !job) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getJobTypeColor = (jobType) => {
    const colors = {
      "Full-time": "bg-green-500/20 text-green-300 border-green-500/30",
      "Part-time": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      Contract: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      Internship: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      Freelance: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    };
    return colors[jobType] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "CO";
  };

  // Safe array access functions
  const getSkills = () => {
    if (!job.skills) return [];
    if (Array.isArray(job.skills)) return job.skills;
    if (typeof job.skills === "string")
      return job.skills.split(",").map((s) => s.trim());
    return [];
  };

  const getResponsibilities = () => {
    if (!job.responsibilities) return [];
    if (Array.isArray(job.responsibilities)) return job.responsibilities;
    if (typeof job.responsibilities === "string") {
      // Handle string responsibilities - split by newlines or commas
      return job.responsibilities
        .split(/[\n,]/)
        .map((r) => r.trim())
        .filter((r) => r);
    }
    return [];
  };

  const getRequirements = () => {
    if (!job.requirements) return [];
    if (Array.isArray(job.requirements)) return job.requirements;
    if (typeof job.requirements === "string") {
      return job.requirements
        .split(/[\n,]/)
        .map((r) => r.trim())
        .filter((r) => r);
    }
    return [];
  };

  const tabs = [
    { id: "description", label: "Description", icon: FileText },
    { id: "requirements", label: "Requirements", icon: CheckCircle },
    { id: "company", label: "Company", icon: Building2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl animate-slideUp"
        style={{
          background:
            "linear-gradient(180deg, rgba(30,30,30,0.98), rgba(20,20,20,0.98))",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Header with gradient */}
        <div
          className="relative p-8 border-b overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(128,55,145,0.2), rgba(184,123,209,0.15))",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(184,123,209,0.15),_transparent_50%)]" />

          <div className="relative flex items-start gap-6">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #803791, #b87bd1)",
              }}
            >
              {job.employerId?.company ? (
                <span className="text-white font-bold text-2xl">
                  {getInitials(job.employerId.company)}
                </span>
              ) : (
                <Building2 className="w-12 h-12 text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {job.title}
                  </h2>
                  <p className="text-xl font-medium text-white/80">
                    {job.employerId?.company || "Company Not Specified"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onToggleSave}
                    className={`p-3 rounded-xl transition-all ${
                      isSaved
                        ? "text-[#b87bd1] bg-[#b87bd1]/20 shadow-lg"
                        : "text-white/60 hover:text-white/80 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Bookmark
                      className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getJobTypeColor(
                      job.jobType
                    )}`}
                  >
                    {job.jobType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-bold text-white">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatDate(job.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 p-2 border-b"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-320px)] p-8">
          {activeTab === "description" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#b87bd1]" />
                  Job Description
                </h3>
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {job.description || "No description provided."}
                </p>
              </div>

              {getSkills().length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#b87bd1]" />
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getSkills().map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                        style={{
                          background: "rgba(184,123,209,0.12)",
                          color: "#b87bd1",
                          border: "1px solid rgba(184,123,209,0.3)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {getResponsibilities().length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#b87bd1]" />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {getResponsibilities().map((resp, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-white/80"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#b87bd1] mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "requirements" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#b87bd1]" />
                  Requirements
                </h3>
                {getRequirements().length > 0 ? (
                  <ul className="space-y-3">
                    {getRequirements().map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 leading-relaxed">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/60">
                    No specific requirements listed.
                  </p>
                )}
              </div>

              <div
                className="p-6 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(128,55,145,0.1), rgba(184,123,209,0.05))",
                  border: "1px solid rgba(184,123,209,0.2)",
                }}
              >
                <h4 className="text-lg font-semibold text-white mb-3">
                  What We Offer
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Competitive Salary",
                    "Health Insurance",
                    "Remote Work",
                    "Professional Development",
                    "Flexible Hours",
                    "Team Events",
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-white/80"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#b87bd1]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "company" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#b87bd1]" />
                  About the Company
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  {job.employerId?.company || "Company Name"} is a leading
                  organization committed to innovation and excellence. We foster
                  a collaborative environment where talent thrives and ideas
                  flourish.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-[#b87bd1]" />
                      <span className="font-semibold text-white">
                        Company Size
                      </span>
                    </div>
                    <p className="text-white/70">500-1000 employees</p>
                  </div>

                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="w-5 h-5 text-[#b87bd1]" />
                      <span className="font-semibold text-white">Industry</span>
                    </div>
                    <p className="text-white/70">Technology & Innovation</p>
                  </div>

                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-[#b87bd1]" />
                      <span className="font-semibold text-white">Founded</span>
                    </div>
                    <p className="text-white/70">2010</p>
                  </div>

                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-[#b87bd1]" />
                      <span className="font-semibold text-white">
                        Headquarters
                      </span>
                    </div>
                    <p className="text-white/70">{job.location}</p>
                  </div>
                </div>
              </div>

              {job.employerId?.email && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(128,55,145,0.1), rgba(184,123,209,0.05))",
                    border: "1px solid rgba(184,123,209,0.2)",
                  }}
                >
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white/80">
                      <Mail className="w-5 h-5 text-[#b87bd1]" />
                      <span>{job.employerId.email}</span>
                    </div>
                    {job.employerId.phone && (
                      <div className="flex items-center gap-3 text-white/80">
                        <Phone className="w-5 h-5 text-[#b87bd1]" />
                        <span>{job.employerId.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className="sticky bottom-0 p-6 border-t flex gap-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04))",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <button
            onClick={() => {
              onClose();
              router.push(`/student/jobs/apply/${job._id}`);
            }}
            className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Apply Now
          </button>
          <button
            onClick={onClose}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 transition-all"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
