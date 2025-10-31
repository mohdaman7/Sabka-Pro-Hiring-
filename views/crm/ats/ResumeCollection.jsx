"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Eye,
  Download,
  Mail,
  Sparkles,
  RefreshCw,
  Filter,
  Upload,
} from "lucide-react";
import { adminService } from "@/services/adminService";
import { customToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export default function ResumeCollection() {
  const [resumes, setResumes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minScore: "",
    skills: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchResumes();
    fetchStats();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const params = {
        page: 1,
        limit: 20,
        search: searchTerm || undefined,
        minScore: filters.minScore || undefined,
        skills: filters.skills || undefined,
      };
      const data = await adminService.getResumes(params);
      if (data.success) {
        setResumes(data.data || []);
      }
    } catch (error) {
      customToast.error("Error", "Failed to fetch resumes");
      console.error("Failed to fetch resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await adminService.getResumeStats();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    Promise.all([fetchResumes(), fetchStats()]).finally(() => {
      setRefreshing(false);
    });
  };

  const handleParseResume = async (resumeId) => {
    try {
      customToast.loading("Parsing", "Analyzing resume...");
      const data = await adminService.parseResume(resumeId);
      if (data.success) {
        customToast.success("Success", "Resume parsed successfully");
        fetchResumes();
      }
    } catch (error) {
      customToast.error("Error", "Failed to parse resume");
    }
  };

  const handleSearch = () => {
    fetchResumes();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Resume Collection</h2>
          <p className="text-sm text-white/60 mt-1">
            Parse and manage candidate resumes with AI-powered analysis
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

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "linear-gradient(135deg, rgba(128,55,145,0.45), transparent)",
              }}
            ></div>
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">Total Resumes</p>
                <FileText className="h-5 w-5 text-white/80" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.total || 0}</p>
              <p className="text-xs text-white/60">All uploaded resumes</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "linear-gradient(135deg, rgba(46,213,115,0.35), transparent)",
              }}
            ></div>
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">High Score</p>
                <Sparkles className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.highScore || 0}</p>
              <p className="text-xs text-white/60">70%+ ATS score</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "linear-gradient(135deg, rgba(245,158,11,0.35), transparent)",
              }}
            ></div>
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">Avg Score</p>
                <FileText className="h-5 w-5 text-amber-400" />
              </div>
              <p className="text-3xl font-semibold text-white">{Math.round(stats.avgScore || 0)}%</p>
              <p className="text-xs text-white/60">Average ATS score</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.35), transparent)",
              }}
            ></div>
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">Parsed</p>
                <Sparkles className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.parsed || 0}</p>
              <p className="text-xs text-white/60">AI-analyzed resumes</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by name, email, or skills..."
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
              {showFilters ? "Hide filters" : "Filters"}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="e.g., React, Node.js, Python"
                  value={filters.skills}
                  onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resumes List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b87bd1]"></div>
          </div>
        ) : resumes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 py-16 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
              <FileText className="h-10 w-10 text-white/50" />
            </div>
            <h3 className="text-lg font-semibold text-white/80">No resumes found</h3>
            <p className="mt-2 text-sm text-white/50">
              Try adjusting your search criteria or upload new resumes.
            </p>
          </div>
        ) : (
          resumes.map((resume) => (
            <div
              key={resume._id}
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
                    {(resume.studentId?.firstName?.charAt(0) || "").concat(
                      resume.studentId?.lastName?.charAt(0) || ""
                    ) || "R"}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-white">
                          {resume.studentId?.firstName} {resume.studentId?.lastName}
                        </h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-bold",
                            resume.atsScore >= 70
                              ? "bg-emerald-500/20 text-emerald-300"
                              : resume.atsScore >= 40
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-rose-500/20 text-rose-300"
                          )}
                        >
                          {resume.atsScore}% Match
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                        <Mail className="h-3 w-3" />
                        <span>{resume.studentId?.email}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(resume.fileUrl, "_blank")}
                        className="rounded-xl border border-white/15 bg-white/10 p-2 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                        title="View Resume"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => window.open(resume.fileUrl, "_blank")}
                        className="rounded-xl border border-blue-400/30 bg-blue-500/15 p-2 text-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleParseResume(resume._id)}
                        className="rounded-xl border border-purple-400/30 bg-purple-500/15 p-2 text-purple-200 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                        title="Parse Resume"
                      >
                        <Sparkles className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Skills */}
                  {resume.parsedData?.skills && resume.parsedData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {resume.parsedData.skills.slice(0, 6).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-lg text-xs bg-white/10 text-white/80 border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                      {resume.parsedData.skills.length > 6 && (
                        <span className="px-2 py-1 rounded-lg text-xs text-white/60">
                          +{resume.parsedData.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Experience */}
                  {resume.parsedData?.experience && resume.parsedData.experience.length > 0 && (
                    <div className="mt-3 text-xs text-white/60">
                      <span className="font-medium">{resume.parsedData.experience.length}</span> years
                      experience
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
