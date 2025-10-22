"use client";

import { useEffect, useState } from "react";
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
  DollarSign,
  Sparkles,
  Heart,
  Share2,
  MoreVertical,
  Loader,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { applicationService } from "@/services/applicationService";
import { collabService } from "@/services/collabService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function CandidatesPage() {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Candidates");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteContext, setNoteContext] = useState(null); // {candidateUserId, applicationId, jobId}
  const [savedViews, setSavedViews] = useState([]);
  const [activeViewId, setActiveViewId] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await applicationService.employerMyApplications();

        if (res?.success || res?.data) {
          setApplications(res.data || []);
          setFilteredApps(res.data || []);
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
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
    // Load saved candidate views in parallel
    (async () => {
      try {
        const res = await collabService.listViews({ type: "candidates" });
        setSavedViews(res.data || []);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (activeFilter === "New Applications") {
      filtered = filtered.filter((app) => app.status === "applied");
    } else if (activeFilter === "Shortlisted") {
      filtered = filtered.filter((app) => app.status === "interview");
    } else if (activeFilter === "Under Review") {
      filtered = filtered.filter((app) => app.status === "under_review");
    } else if (activeFilter === "Rejected") {
      filtered = filtered.filter((app) => app.status === "rejected");
    }

    if (searchTerm) {
      filtered = filtered.filter((app) => {
        const name =
          `${app.studentId?.firstName} ${app.studentId?.lastName}`.toLowerCase();
        const email = app.studentId?.email?.toLowerCase() || "";
        const company = app.meta?.previousCompany?.toLowerCase() || "";
        return (
          name.includes(searchTerm.toLowerCase()) ||
          email.includes(searchTerm.toLowerCase()) ||
          company.includes(searchTerm.toLowerCase())
        );
      });
    }

    if (selectedJob) {
      filtered = filtered.filter((app) => app.jobId._id === selectedJob);
    }

    setFilteredApps(filtered);
  }, [activeFilter, searchTerm, applications, selectedJob]);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filters = [
    "All Candidates",
    "New Applications",
    "Shortlisted",
    "Under Review",
    "Rejected",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300";
      case "interview":
        return "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300";
      case "under_review":
        return "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300";
      case "rejected":
        return "from-red-500/20 to-red-600/10 border-red-500/30 text-red-300";
      default:
        return "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300";
    }
  };

  const getInitialColor = (index) => {
    const colors = [
      "from-[#803791] to-[#b87bd1]",
      "from-blue-600 to-blue-400",
      "from-emerald-600 to-emerald-400",
      "from-pink-600 to-pink-400",
    ];
    return colors[index % colors.length];
  };

  const downloadResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await applicationService.updateStatus(applicationId, newStatus, "");
      // Refresh the applications
      const res = await applicationService.employerMyApplications();
      setApplications(res.data || []);
      setFilteredApps(res.data || []);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const openNote = (app) => {
    setNoteContext({
      candidateUserId: app?.studentId?._id,
      applicationId: app?._id,
      jobId: app?.jobId?._id,
    });
    setNoteText("");
    setNoteOpen(true);
  };

  const saveNote = async () => {
    if (!noteContext || !noteText.trim()) return;
    try {
      await collabService.addNote({
        candidateUserId: noteContext.candidateUserId,
        applicationId: noteContext.applicationId,
        jobId: noteContext.jobId,
        content: noteText.trim(),
        visibility: "team",
      });
      setNoteOpen(false);
    } catch (e) {
      console.error("Failed to add note", e);
    }
  };

  const applySavedView = (view) => {
    setActiveViewId(view._id);
    const q = view.query || {};
    setSearchTerm(q.searchTerm || "");
    setActiveFilter(q.activeFilter || "All Candidates");
    setSelectedJob(q.selectedJob || null);
  };

  const saveCurrentAsView = async () => {
    const name = window.prompt("Name this view:");
    if (!name) return;
    try {
      const payload = {
        name,
        type: "candidates",
        query: { searchTerm, activeFilter, selectedJob },
        sharedWithTeam: true,
      };
      const res = await collabService.createView(payload);
      setSavedViews([res.data, ...savedViews]);
      setActiveViewId(res.data._id);
    } catch (e) {
      console.error("Failed to create view", e);
    }
  };

  const deleteView = async (id) => {
    try {
      await collabService.deleteView(id);
      setSavedViews(savedViews.filter((v) => v._id !== id));
      if (activeViewId === id) setActiveViewId(null);
    } catch (e) {
      console.error("Failed to delete view", e);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium animated background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ background: "rgba(128,55,145,0.3)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ background: "rgba(184,123,209,0.3)", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-2xl opacity-10 animate-pulse"
          style={{ background: "rgba(240,194,238,0.3)", animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(128,55,145,0.05),transparent_70%)]" />
      </div>

      <div className="relative p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                  Candidates
                </h1>
                <p className="text-white/70 text-sm mt-1">
                  Manage and review {applications.length} applications
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full lg:w-auto flex-col sm:flex-row">
            <button
              className="group relative flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium transition-all duration-300 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Filter className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Filter</span>
            </button>

            <button className="group relative flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-medium transition-all duration-300 hover:shadow-xl hover:shadow-[#803791]/40 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Download className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Export</span>
            </button>
          </div>
        </div>

        {/* Saved Views + Search and Stats */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div
            className="lg:col-span-3 rounded-xl p-1 group transition-all duration-300 hover:shadow-xl hover:shadow-[#803791]/20"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="relative px-5 py-4">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 transition-colors group-hover:text-white/80" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-transparent text-white placeholder-white/50 border-none focus:outline-none text-sm"
              />
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {savedViews.map((v) => (
                  <button
                    key={v._id}
                    onClick={() => applySavedView(v)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all ${
                      activeViewId === v._id
                        ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white border-transparent"
                        : "text-white/80 hover:text-white border-white/10 hover:border-white/20"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
                <button
                  onClick={saveCurrentAsView}
                  className="px-3 py-1 rounded-full text-xs bg-white/10 hover:bg-white/20 text-white border border-white/10"
                >
                  + Save View
                </button>
                {activeViewId && (
                  <button
                    onClick={() => deleteView(activeViewId)}
                    className="px-3 py-1 rounded-full text-xs bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30"
                  >
                    Delete View
                  </button>
                )}
              </div>
            </div>
          </div>

          <div
            className="rounded-xl p-5 text-center group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#803791]/20 transform hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-[#803791] to-[#b87bd1] bg-clip-text text-transparent">
              {filteredApps.length}
            </div>
            <div className="text-xs text-white/70 mt-1 font-medium">
              Total Candidates
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group overflow-hidden ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg shadow-[#803791]/40"
                  : "text-white/80 hover:text-white"
              }`}
              style={
                activeFilter !== filter
                  ? {
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
                  : {}
              }
            >
              {activeFilter !== filter && (
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </div>

        {/* Job Filter */}
        {filterOptions.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedJob(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !selectedJob
                  ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white"
                  : "bg-white/6 text-white/80 hover:bg-white/10"
              }`}
            >
              All Jobs
            </button>
            {filterOptions.map((job) => (
              <button
                key={job._id}
                onClick={() => setSelectedJob(job._id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all truncate max-w-xs ${
                  selectedJob === job._id
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white"
                    : "bg-white/6 text-white/80 hover:bg-white/10"
                }`}
              >
                {job.title}
              </button>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="w-12 h-12 animate-spin text-[#803791] mx-auto mb-4" />
              <p className="text-white/80 font-medium">Loading candidates...</p>
            </div>
          </div>
        )}

        {/* Candidates Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApps.length > 0 ? (
              filteredApps.map((app, index) => {
                const candidate = app?.studentId || {};
                const name =
                  `${candidate.firstName || ""} ${
                    candidate.lastName || ""
                  }`.trim() || "Candidate";
                const isFavorite = favorites.has(app._id);

                return (
                  <div
                    key={app._id}
                    className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    onMouseEnter={() => setHoveredCard(app._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#803791]/20 to-[#b87bd1]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                    {/* Shine effect */}
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-1000 transform -skew-x-12 group-hover:translate-x-full" />

                    <div className="relative p-6 space-y-4">
                      {/* Header with avatar and favorite */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${getInitialColor(
                              index
                            )}`}
                          >
                            <span className="text-white font-bold text-lg">
                              {(name || "?").charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white text-lg group-hover:text-[#b87bd1] transition-colors duration-300">
                              {name}
                            </h3>
                            <p className="text-xs text-white/60 line-clamp-2">
                              {app?.jobId?.title || "Applied role"}
                            </p>
                            <p className="text-xs text-white/40 mt-1">
                              Applied{" "}
                              {new Date(app.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleFavorite(app._id)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
                          >
                            <Heart
                              className={`w-5 h-5 transition-all duration-300 ${
                                isFavorite
                                  ? "fill-red-500 text-red-500"
                                  : "text-white/60 hover:text-red-400"
                              }`}
                            />
                          </button>
                          <div
                            className={`px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${getStatusColor(
                              app.status
                            )} border transition-all duration-300 capitalize text-center`}
                          >
                            {app.status === "applied"
                              ? "New"
                              : app.status === "interview"
                              ? "Shortlist"
                              : app.status}
                          </div>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#803791]/50 transition-all duration-300">
                          <div className="text-xs text-white/60 mb-1">
                            Company
                          </div>
                          <div className="text-sm font-semibold text-white truncate">
                            {app.meta?.previousCompany || "-"}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#803791]/50 transition-all duration-300">
                          <div className="text-xs text-white/60 mb-1">
                            Languages
                          </div>
                          <div className="text-sm font-semibold text-white truncate">
                            {app.meta?.languages?.split(",")[0] || "-"}
                          </div>
                        </div>
                      </div>

                      {/* Candidate Details */}
                      <div className="space-y-3 py-4 border-t border-white/10">
                        <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#803791]/20 transition-colors">
                            <Mail className="w-4 h-4" />
                          </div>
                          <span className="truncate text-xs">
                            {candidate.email || "-"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#803791]/20 transition-colors">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span>{app?.jobId?.location || "-"}</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#803791]/20 transition-colors">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <span>
                            {app.meta?.previousPosition || "-"} (
                            {app.meta?.yearsExperience || "0"} yrs)
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#803791]/20 transition-colors">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <span>{app.meta?.previousCompany || "-"}</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#803791]/20 transition-colors">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <span>
                            {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4 border-t border-white/10">
                        <button
                          onClick={() => downloadResume(app.resumeUrl)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#803791]/20 to-[#b87bd1]/20 hover:from-[#803791]/40 hover:to-[#b87bd1]/40 text-white/80 hover:text-white border border-[#803791]/30 transition-all duration-300 text-sm font-medium group/btn"
                        >
                          <FileText className="w-4 h-4 group-hover/btn:text-[#b87bd1]" />
                          Resume
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all duration-300 text-sm font-medium">
                          <Mail className="w-4 h-4" />
                          Email
                        </button>
                        <button
                          onClick={() => openNote(app)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all duration-300 text-sm font-medium"
                        >
                          <FileText className="w-4 h-4" />
                          Add Note
                        </button>
                        <button className="p-2.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all duration-300">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <Users className="w-16 h-16 mx-auto text-white/40 mb-4" />
                <p className="text-white/60 font-medium">No candidates found</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={noteOpen} onOpenChange={setNoteOpen}>
        <DialogContent className="bg-gray-900 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add Team Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Textarea
              placeholder="Write an internal note for your team..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="bg-transparent text-white border-white/20"
              rows={5}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setNoteOpen(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#803791] to-[#b87bd1]"
              >
                Save Note
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
