"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  Eye,
  Users,
  CheckCircle,
  Calendar,
  Building,
  MapPin,
  RefreshCw,
  Filter,
  ExternalLink,
  UserPlus,
} from "lucide-react";
import { adminService } from "@/services/adminService";
import { customToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export default function JobManagement() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    department: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {
        page: 1,
        limit: 20,
        search: searchTerm || undefined,
        status: filters.status || undefined,
        department: filters.department || undefined,
      };
      const data = await adminService.getATSJobs(params);
      if (data.success) {
        setJobs(data.data || []);
      }
    } catch (error) {
      customToast.error("Error", "Failed to fetch jobs");
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await adminService.getJobStats();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    Promise.all([fetchJobs(), fetchStats()]).finally(() => {
      setRefreshing(false);
    });
  };

  const handleSearch = () => {
    fetchJobs();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Job Management</h2>
          <p className="text-sm text-white/60 mt-1">
            Track job postings and manage applications efficiently
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
                <p className="text-sm font-medium text-white/80">Total Jobs</p>
                <Briefcase className="h-5 w-5 text-white/80" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.total || 0}</p>
              <p className="text-xs text-white/60">All job postings</p>
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
                <p className="text-sm font-medium text-white/80">Active Jobs</p>
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.active || 0}</p>
              <p className="text-xs text-white/60">Currently hiring</p>
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
                <p className="text-sm font-medium text-white/80">Applications</p>
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.totalApplications || 0}</p>
              <p className="text-xs text-white/60">Total received</p>
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
                <p className="text-sm font-medium text-white/80">Draft</p>
                <Briefcase className="h-5 w-5 text-amber-400" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.draft || 0}</p>
              <p className="text-xs text-white/60">Pending publish</p>
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
              placeholder="Search by title, department, or location..."
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
                <label className="text-xs uppercase tracking-wide text-white/70">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
                >
                  <option value="" className="bg-[#1b0c2d]">All Status</option>
                  <option value="active" className="bg-[#1b0c2d]">Active</option>
                  <option value="draft" className="bg-[#1b0c2d]">Draft</option>
                  <option value="closed" className="bg-[#1b0c2d]">Closed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-white/70">Department</label>
                <input
                  type="text"
                  placeholder="e.g., Engineering, Sales"
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b87bd1]"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 py-16 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
              <Briefcase className="h-10 w-10 text-white/50" />
            </div>
            <h3 className="text-lg font-semibold text-white/80">No jobs found</h3>
            <p className="mt-2 text-sm text-white/50">
              Try adjusting your search or create a new job posting.
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:bg-white/8"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-0 rounded-2xl blur-md"
                    style={{
                      background: "linear-gradient(135deg, #803791, #b87bd1)",
                    }}
                  ></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#803791] via-[#9b55b0] to-[#5d1f73]">
                    <Briefcase className="h-6 w-6 text-white/90" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-white">{job.title}</h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-bold uppercase",
                            job.status === "active"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : job.status === "draft"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-gray-500/20 text-gray-300"
                          )}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-white/60">
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {job.department || "N/A"}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/crm/jobs/${job._id}`}
                        className="rounded-xl border border-white/15 bg-white/10 p-2 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                        title="View Job"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/crm/jobs/${job._id}`}
                        className="rounded-xl border border-blue-400/30 bg-blue-500/15 p-2 text-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                        title="View Details"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-white/70">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
                        <Users className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-medium">{job.applicationCount || 0}</span>
                      <span className="text-white/50">applications</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/70">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <span className="font-medium">{job.statusBreakdown?.reviewed || 0}</span>
                      <span className="text-white/50">reviewed</span>
                    </div>
                    {job.statusBreakdown?.interview > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-white/70">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10">
                          <Calendar className="h-3.5 w-3.5 text-blue-400" />
                        </div>
                        <span className="font-medium">{job.statusBreakdown.interview}</span>
                        <span className="text-white/50">interviews</span>
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
