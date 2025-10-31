"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Mail,
  Star,
  Activity,
  Award,
  RefreshCw,
  Filter,
  MessageSquare,
} from "lucide-react";
import { adminService } from "@/services/adminService";
import { customToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export default function CandidateSearch() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minScore: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const params = {
        page: 1,
        limit: 20,
        keywords: searchTerm || undefined,
        minScore: filters.minScore || undefined,
        skills: filters.skills || undefined,
        minExperience: filters.experience || undefined,
        education: filters.education || undefined,
      };
      const data = await adminService.searchCandidates(params);
      if (data.success) {
        setCandidates(data.data || []);
      }
    } catch (error) {
      customToast.error("Error", "Failed to fetch candidates");
      console.error("Failed to fetch candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCandidates().finally(() => {
      setRefreshing(false);
    });
  };

  const handleSearch = () => {
    fetchCandidates();
  };

  const handleShortlist = async (candidateId) => {
    try {
      customToast.loading("Processing", "Shortlisting candidate...");
      const data = await adminService.shortlistCandidate(candidateId, null, "Shortlisted from ATS");
      if (data.success) {
        customToast.success("Success", "Candidate shortlisted successfully");
        fetchCandidates();
      }
    } catch (error) {
      customToast.error("Error", "Failed to shortlist candidate");
    }
  };

  const handleReject = async (candidateId) => {
    try {
      customToast.loading("Processing", "Rejecting candidate...");
      const data = await adminService.rejectCandidate(candidateId, null, "Not suitable");
      if (data.success) {
        customToast.success("Success", "Candidate rejected");
        fetchCandidates();
      }
    } catch (error) {
      customToast.error("Error", "Failed to reject candidate");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Candidate Search</h2>
          <p className="text-sm text-white/60 mt-1">
            Find and filter candidates with advanced search and matching
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:text-white disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing" : "Refresh"}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by keywords, skills, or experience..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/50 shadow-inner focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-gradient-to-r from-[#803791]/50 to-[#b87bd1]/40 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide filters" : "Advanced Filters"}
            </button>
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-white/70">
                  Minimum ATS Score
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g., 70"
                  value={filters.minScore}
                  onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-white/70">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., React, Node.js"
                  value={filters.skills}
                  onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-white/70">
                  Min Experience (years)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g., 3"
                  value={filters.experience}
                  onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-white/70">Education</label>
                <input
                  type="text"
                  placeholder="e.g., Bachelor's"
                  value={filters.education}
                  onChange={(e) => setFilters({ ...filters, education: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b87bd1]"></div>
          </div>
        ) : candidates.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 py-16 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
              <Users className="h-10 w-10 text-white/50" />
            </div>
            <h3 className="text-lg font-semibold text-white/80">No candidates found</h3>
            <p className="mt-2 text-sm text-white/50">
              Try different search criteria or wait for new applications.
            </p>
          </div>
        ) : (
          candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:bg-white/8"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-0 rounded-2xl blur-md"
                    style={{
                      background: "linear-gradient(135deg, #803791, #b87bd1)",
                    }}
                  ></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#803791] via-[#9b55b0] to-[#5d1f73] text-white/90 text-sm font-semibold uppercase">
                    {(candidate.studentId?.firstName?.charAt(0) || "").concat(
                      candidate.studentId?.lastName?.charAt(0) || ""
                    ) || "C"}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-white">
                          {candidate.studentId?.firstName} {candidate.studentId?.lastName}
                        </h3>
                        {candidate.matchScore && (
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1",
                              candidate.matchScore >= 80
                                ? "bg-emerald-500/20 text-emerald-300"
                                : candidate.matchScore >= 60
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-amber-500/20 text-amber-300"
                            )}
                          >
                            <Star className="h-3 w-3" />
                            {candidate.matchScore}% Match
                          </span>
                        )}
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-bold",
                            candidate.atsScore >= 70
                              ? "bg-emerald-500/20 text-emerald-300"
                              : candidate.atsScore >= 40
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-rose-500/20 text-rose-300"
                          )}
                        >
                          {candidate.atsScore}% ATS
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                        <Mail className="h-3 w-3" />
                        <span>{candidate.studentId?.email}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShortlist(candidate._id)}
                        className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-2 text-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                        title="Shortlist"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleReject(candidate._id)}
                        className="rounded-xl border border-rose-400/30 bg-rose-500/15 p-2 text-rose-200 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                        title="Reject"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-xl border border-white/15 bg-white/10 p-2 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                        title="More Options"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Skills */}
                  {candidate.parsedData?.skills && candidate.parsedData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {candidate.parsedData.skills.slice(0, 5).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-lg text-xs bg-white/10 text-white/80 border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.parsedData.skills.length > 5 && (
                        <span className="px-2 py-1 rounded-lg text-xs text-white/60">
                          +{candidate.parsedData.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-white/70">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
                        <Activity className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-medium">{candidate.applicationHistory?.length || 0}</span>
                      <span className="text-white/50">applications</span>
                    </div>
                    {candidate.parsedData?.experience && candidate.parsedData.experience.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-white/70">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10">
                          <Award className="h-3.5 w-3.5 text-blue-400" />
                        </div>
                        <span className="font-medium">{candidate.parsedData.experience.length}</span>
                        <span className="text-white/50">years exp</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
