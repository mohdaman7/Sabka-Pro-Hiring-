"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Users,
  MapPin,
  Briefcase,
  Star,
  Mail,
  Phone,
  Calendar,
  Download,
  Filter,
  Search,
  ChevronRight,
  FileText,
  Sparkles,
  Heart,
  MoreVertical,
  Loader,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Eye,
  TrendingUp,
  Building2,
  GraduationCap,
  Code,
  Zap,
} from "lucide-react";
import { applicationService } from "@/services/applicationService";
import { collabService } from "@/services/collabService";
import PremiumPagination from "@/components/ui/PremiumPagination";
import { customToast } from "@/components/ui/toast";

const STATUS_CONFIG = {
  applied: {
    label: "New",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    icon: Sparkles,
  },
  reviewed: {
    label: "Reviewed",
    color: "bg-cyan-500",
    gradient: "from-cyan-500 to-teal-500",
    icon: Eye,
  },
  interview: {
    label: "Interview",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-pink-500",
    icon: Calendar,
  },
  hired: {
    label: "Hired",
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500",
    icon: Award,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-500",
    gradient: "from-red-500 to-rose-500",
    icon: XCircle,
  },
};

export default function EmployerCandidatesNew() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState(new Set());
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await applicationService.employerMyApplications();

      if (res?.success || res?.data) {
        setApplications(res.data || []);
        setFilterOptions(res.filterOptions?.jobs || []);
      } else {
        setError("Failed to load applications");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load applications"
      );
      customToast.error("Error", "Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort logic
  const filteredAndSorted = useMemo(() => {
    let result = [...applications];

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((app) => app.status === statusFilter);
    }

    // Job filter
    if (selectedJob) {
      result = result.filter((app) => app.jobId?._id === selectedJob);
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((app) => {
        const name = `${app.studentId?.firstName} ${app.studentId?.lastName}`.toLowerCase();
        const email = app.studentId?.email?.toLowerCase() || "";
        const company = app.meta?.previousCompany?.toLowerCase() || "";
        const position = app.meta?.previousPosition?.toLowerCase() || "";
        return (
          name.includes(searchLower) ||
          email.includes(searchLower) ||
          company.includes(searchLower) ||
          position.includes(searchLower)
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "name") {
        const nameA = `${a.studentId?.firstName} ${a.studentId?.lastName}`;
        const nameB = `${b.studentId?.firstName} ${b.studentId?.lastName}`;
        return nameA.localeCompare(nameB);
      }
      return 0;
    });

    return result;
  }, [applications, statusFilter, selectedJob, searchTerm, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSorted, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, selectedJob, searchTerm, sortBy]);

  const stats = useMemo(() => {
    const counts = applications.reduce((acc, app) => {
      const key = app.status || "applied";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    counts.total = applications.length;
    return counts;
  }, [applications]);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const downloadResume = (resumeUrl) => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else {
      customToast.error("No Resume", "Resume not available for this candidate");
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await applicationService.updateStatus(applicationId, newStatus, "");
      setApplications(
        applications.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      customToast.success("Status Updated", `Changed to ${newStatus}`);
    } catch (err) {
      customToast.error("Update Failed", "Failed to update status");
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0118 0%, #1a0a2e 50%, #0a0118 100%)",
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                Candidates
              </h1>
              <p className="text-white/60 text-sm md:text-base">
                Manage and review {applications.length} candidate applications
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500 text-white font-semibold transition-all flex items-center gap-2">
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { key: "total", label: "Total", icon: Users, gradient: "from-purple-500 to-pink-500" },
              { key: "applied", label: "New", icon: Sparkles, gradient: "from-blue-500 to-cyan-500" },
              { key: "reviewed", label: "Reviewed", icon: Eye, gradient: "from-cyan-500 to-teal-500" },
              { key: "interview", label: "Interview", icon: Calendar, gradient: "from-purple-500 to-pink-500" },
              { key: "hired", label: "Hired", icon: Award, gradient: "from-green-500 to-emerald-500" },
              { key: "rejected", label: "Rejected", icon: XCircle, gradient: "from-red-500 to-rose-500" },
            ].map((stat) => {
              const Icon = stat.icon;
              const isActive = statusFilter === stat.key;
              return (
                <button
                  key={stat.key}
                  onClick={() => setStatusFilter(statusFilter === stat.key ? "all" : stat.key)}
                  className={`relative p-5 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isActive ? "shadow-2xl" : "hover:shadow-xl"
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${stat.gradient.split(" ")[1]}, ${stat.gradient.split(" ")[3]})`
                      : "rgba(255,255,255,0.05)",
                    border: isActive ? "2px solid rgba(255,255,255,0.3)" : "2px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-white/60"}`} />
                    <span className={`text-2xl font-black ${isActive ? "text-white" : "text-white/80"}`}>
                      {stats[stat.key] || 0}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold ${isActive ? "text-white" : "text-white/60"}`}>
                    {stat.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, company, position..."
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Job Filter */}
          {filterOptions.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-4">
              <button
                onClick={() => setSelectedJob(null)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  !selectedJob
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                }`}
              >
                All Jobs
              </button>
              {filterOptions.map((job) => (
                <button
                  key={job._id}
                  onClick={() => setSelectedJob(job._id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all truncate max-w-xs ${
                    selectedJob === job._id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {job.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/60 font-medium">Loading candidates...</p>
            </div>
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Candidates Found</h3>
            <p className="text-white/60">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <>
            {/* Candidates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedData.map((app, index) => (
                <CandidateCard
                  key={app._id}
                  application={app}
                  index={index}
                  isFavorite={favorites.has(app._id)}
                  onToggleFavorite={() => toggleFavorite(app._id)}
                  onDownloadResume={() => downloadResume(app.resumeUrl)}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>

            {/* Pagination */}
            <PremiumPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAndSorted.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
              itemsPerPageOptions={[6, 12, 24, 48]}
            />
          </>
        )}
      </div>
    </div>
  );
}

function CandidateCard({
  application,
  index,
  isFavorite,
  onToggleFavorite,
  onDownloadResume,
  onStatusUpdate,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const candidate = application.studentId || {};
  const job = application.jobId || {};
  const name = `${candidate.firstName || ""} ${candidate.lastName || ""}`.trim() || "Candidate";
  const statusConfig = STATUS_CONFIG[application.status] || STATUS_CONFIG.applied;
  const StatusIcon = statusConfig.icon;

  const avatarColors = [
    "from-purple-600 to-pink-600",
    "from-blue-600 to-cyan-600",
    "from-emerald-600 to-teal-600",
    "from-orange-600 to-red-600",
  ];

  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all hover:shadow-2xl hover:scale-[1.02] overflow-hidden">
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br ${
                avatarColors[index % avatarColors.length]
              } flex-shrink-0`}
            >
              <span className="text-white font-bold text-lg">{name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors truncate">
                {name}
              </h3>
              <p className="text-sm text-white/60 truncate">{job.title || "Applied role"}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end flex-shrink-0">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${statusConfig.color} flex items-center gap-1.5`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {statusConfig.label}
            </span>
            <button
              onClick={onToggleFavorite}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-all"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-white/60 hover:text-red-400"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-white/60 mb-1">Experience</div>
            <div className="text-sm font-bold text-white">{application.meta?.yearsExperience || "0"} years</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-white/60 mb-1">Applied</div>
            <div className="text-sm font-bold text-white">
              {new Date(application.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2.5 py-3 border-t border-white/10">
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="truncate">{candidate.email || "-"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Building2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="truncate">{application.meta?.previousCompany || "-"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Briefcase className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="truncate">{application.meta?.previousPosition || "-"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="truncate">{job.location || "-"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-white/10">
          <button
            onClick={onDownloadResume}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 text-white border border-purple-500/30 transition-all font-medium"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Resume</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all font-medium">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <MoreVertical className="w-5 h-5 text-white" />
            </button>

            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute right-0 top-12 z-50 w-48 bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden">
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => {
                    if (status === application.status) return null;
                    const Icon = config.icon;
                    return (
                      <button
                        key={status}
                        onClick={() => {
                          onStatusUpdate(application._id, status);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all"
                      >
                        <Icon className="w-4 h-4" style={{ color: config.color.replace("bg-", "#") }} />
                        <span className="font-medium text-sm">{config.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
