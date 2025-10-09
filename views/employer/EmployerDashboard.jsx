"use client";

import {
  Briefcase,
  Users,
  FileText,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function EmployerDashboard() {
  const stats = [
    {
      label: "Active Job Posts",
      value: "12",
      icon: Briefcase,
      change: "+2 this week",
    },
    {
      label: "Total Applications",
      value: "156",
      icon: FileText,
      change: "+23 new",
    },
    {
      label: "Shortlisted",
      value: "34",
      icon: Users,
      change: "12 pending review",
    },
    {
      label: "Hired",
      value: "8",
      icon: TrendingUp,
      change: "This month",
    },
  ];

  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹8-12 LPA",
      applications: 45,
      views: 234,
      postedDate: "5 days ago",
      status: "Active",
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Remote",
      type: "Full-time",
      salary: "₹10-15 LPA",
      applications: 67,
      views: 456,
      postedDate: "2 weeks ago",
      status: "Active",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Bangalore, Karnataka",
      type: "Contract",
      salary: "₹6-8 LPA",
      applications: 23,
      views: 178,
      postedDate: "1 week ago",
      status: "Active",
    },
  ];

  const recentApplications = [
    {
      id: 1,
      candidateName: "Amit Sharma",
      position: "Senior Frontend Developer",
      appliedDate: "2 hours ago",
      matchScore: 95,
      status: "New",
    },
    {
      id: 2,
      candidateName: "Priya Patel",
      position: "Backend Developer",
      appliedDate: "5 hours ago",
      matchScore: 88,
      status: "Under Review",
    },
    {
      id: 3,
      candidateName: "Rahul Kumar",
      position: "UI/UX Designer",
      appliedDate: "1 day ago",
      matchScore: 92,
      status: "Shortlisted",
    },
    {
      id: 4,
      candidateName: "Sneha Desai",
      position: "Senior Frontend Developer",
      appliedDate: "2 days ago",
      matchScore: 85,
      status: "New",
    },
  ];

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Decorative background orbs matching student theme */}
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

      {/* Welcome Section - glass style */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6"
        style={{
          background:
            "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          Welcome back, Tech Solutions!
        </h1>
        <p className="text-white/85 mb-6">
          You have 23 new applications and 12 active job postings
        </p>
        <div className="flex gap-4">
          <Link href="/employer/jobs/new">
            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium shadow-lg hover:shadow-xl">
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
          </Link>
          <Link href="/employer/candidates">
            <button className="flex items-center gap-2 px-6 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors font-medium border border-white/12 hover:scale-105">
              <Users className="w-4 h-4" />
              Browse Candidates
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1 group"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/80 mb-1">{stat.label}</div>
              <div className="text-xs text-[#b87bd1] font-medium">
                {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Jobs */}
        <div
          className="lg:col-span-2 rounded-xl p-6 shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Active Job Postings
            </h2>
            <a
              href="/employer/jobs"
              className="text-sm text-[#b87bd1] hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-lg hover:shadow-2xl transition-all hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-white/80">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-white/80" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-white/80" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-white/80" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(184,123,209,0.08)",
                      color: "#b87bd1",
                    }}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex gap-4 text-sm text-white/80">
                    <span>
                      <span className="font-semibold text-white">
                        {job.applications}
                      </span>{" "}
                      applications
                    </span>
                    <span>
                      <span className="font-semibold text-white">
                        {job.views}
                      </span>{" "}
                      views
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-white/60">
                    <Clock className="w-4 h-4 text-white/80" />
                    {job.postedDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div
          className="rounded-xl p-6 shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Recent Applications
          </h2>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="p-4 rounded-lg hover:shadow-2xl transition-all hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                      style={{
                        background: "linear-gradient(135deg,#803791,#b87bd1)",
                      }}
                    >
                      <span className="text-white font-semibold text-sm">
                        {application.candidateName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {application.candidateName}
                      </h3>
                      <p className="text-xs text-white/80">
                        {application.position}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/80">Match:</span>
                    <span className="text-xs font-semibold text-[#b87bd1]">
                      {application.matchScore}%
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      application.status === "New"
                        ? "bg-blue-500/20 text-blue-400"
                        : application.status === "Shortlisted"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-purple-500/20 text-purple-400"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-2">
                  {application.appliedDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div
          className="rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 group"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md transform group-hover:scale-110 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
            }}
          >
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-white mb-2">Post a New Job</h3>
          <p className="text-sm text-white/80">
            Create and publish a new job opening
          </p>
        </div>
        <div
          className="rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 group"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md transform group-hover:scale-110 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
            }}
          >
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-white mb-2">Browse Candidates</h3>
          <p className="text-sm text-white/80">
            Search verified candidate profiles
          </p>
        </div>
        <div
          className="rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 group"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md transform group-hover:scale-110 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
            }}
          >
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-white mb-2">Review Applications</h3>
          <p className="text-sm text-white/80">Manage pending applications</p>
        </div>
      </div>
    </div>
  );
}
