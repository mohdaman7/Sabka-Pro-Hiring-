"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  ArrowUp,
  Zap,
  Target,
} from "lucide-react";

export default function EmployerJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹8-12 LPA",
      applications: 45,
      views: 234,
      postedDate: "2024-01-15",
      expiryDate: "2024-02-15",
      status: "Active",
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "₹10-15 LPA",
      applications: 67,
      views: 456,
      postedDate: "2024-01-10",
      expiryDate: "2024-02-10",
      status: "Active",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Bangalore, Karnataka",
      type: "Contract",
      salary: "₹6-8 LPA",
      applications: 23,
      views: 178,
      postedDate: "2024-01-20",
      expiryDate: "2024-02-20",
      status: "Active",
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Pune, Maharashtra",
      type: "Full-time",
      salary: "₹15-20 LPA",
      applications: 12,
      views: 89,
      postedDate: "2024-01-05",
      expiryDate: "2024-01-25",
      status: "Expiring Soon",
    },
    {
      id: 5,
      title: "Data Analyst",
      department: "Analytics",
      location: "Hyderabad, Telangana",
      type: "Full-time",
      salary: "₹5-8 LPA",
      applications: 8,
      views: 45,
      postedDate: "2023-12-20",
      expiryDate: "2024-01-05",
      status: "Expired",
    },
  ];

  const stats = [
    {
      label: "Total Jobs",
      value: jobs.length,
      icon: Briefcase,
      change: "+2 this week",
      changePositive: true,
    },
    {
      label: "Active Jobs",
      value: jobs.filter((j) => j.status === "Active").length,
      icon: TrendingUp,
      change: "75% of total",
      changePositive: true,
    },
    {
      label: "Total Applications",
      value: jobs.reduce((sum, j) => sum + j.applications, 0),
      icon: Users,
      change: "+23 new",
      changePositive: true,
    },
    {
      label: "Total Views",
      value: jobs.reduce((sum, j) => sum + j.views, 0),
      icon: Eye,
      change: "+156 this week",
      changePositive: true,
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q);
    const matchesFilter =
      filterStatus === "all" ||
      job.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const statusBadgeClasses = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Expiring Soon":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Expired":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getJobCardStyle = (status) => {
    switch (status) {
      case "Active":
        return "border-emerald-500/20 hover:border-emerald-500/40";
      case "Expiring Soon":
        return "border-orange-500/20 hover:border-orange-500/40";
      case "Expired":
        return "border-gray-500/20 hover:border-gray-500/40";
      default:
        return "border-white/10 hover:border-white/20";
    }
  };

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Decorative background orbs matching theme */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
          style={{ background: "rgba(240,194,238,0.03)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
      </div>

      {/* Header */}
      <div
        className="rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6"
        style={{
          background:
            "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Job Postings</h1>
            <p className="text-white/80">
              Manage and track all your job postings
            </p>
          </div>
          <button
            className="px-6 py-3 text-white rounded-lg transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
            }}
          >
            <Plus className="w-5 h-5" />
            Post New Job
          </button>
        </div>
      </div>

      {/* Stats Grid - Enhanced UI */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl p-6 shadow-xl transition-all hover:-translate-y-1 group"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.changePositive && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ArrowUp className="w-3 h-3" />
                  <span>Live</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-4xl font-bold text-white">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-sm text-[#b87bd1] font-medium">
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div
        className="rounded-xl p-6 shadow-xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 z-10" />
            <input
              placeholder="Search by job title or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-lg transition-all text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] focus:shadow-xl backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3.5 rounded-lg transition-all text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1] focus:shadow-xl backdrop-blur-sm appearance-none cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <option value="all" className="bg-slate-800">
                All Status
              </option>
              <option value="active" className="bg-slate-800">
                Active
              </option>
              <option value="expiring soon" className="bg-slate-800">
                Expiring Soon
              </option>
              <option value="expired" className="bg-slate-800">
                Expired
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className={`group rounded-xl p-6 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 ${getJobCardStyle(
              job.status
            )}`}
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#b87bd1] transition-colors">
                    {job.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusBadgeClasses(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </div>
                <p className="text-white/80 mb-4 font-medium">
                  {job.department}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/60" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-white/60" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-[#b87bd1]">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/60" />
                    <span>
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div
                    className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        background: "linear-gradient(135deg,#803791,#b87bd1)",
                      }}
                    >
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {job.applications}
                      </p>
                      <p className="text-xs text-white/70">Applications</p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        background: "linear-gradient(135deg,#803791,#b87bd1)",
                      }}
                    >
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {job.views}
                      </p>
                      <p className="text-xs text-white/70">Views</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-4">
                <button
                  className="p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg"
                  style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                  }}
                >
                  <Edit2 className="w-5 h-5 text-blue-400" />
                </button>
                <button
                  className="p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg"
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>
                <button
                  className="p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <MoreVertical className="w-5 h-5 text-white/80" />
                </button>
              </div>
            </div>

            {job.status === "Expiring Soon" && (
              <div
                className="flex items-center gap-3 p-4 rounded-xl mt-4 border border-orange-500/30"
                style={{
                  background: "rgba(249, 115, 22, 0.1)",
                }}
              >
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <p className="text-sm text-orange-400 font-semibold">
                  This job expires on{" "}
                  {new Date(job.expiryDate).toLocaleDateString()}. Renew to keep
                  it active.
                </p>
              </div>
            )}
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div
            className="rounded-xl p-16 text-center shadow-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1)",
              }}
            >
              <Target className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              No jobs found
            </h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or create a new job posting to
              attract top talent
            </p>
            <button
              className="px-8 py-3 text-white rounded-xl transition-all font-semibold shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1)",
              }}
            >
              <Plus className="w-5 h-5" />
              Post Your First Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
