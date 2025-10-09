"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Download,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  FileText,
  Eye,
  MessageSquare,
  Filter,
  MoreVertical,
  Star,
  Send,
  Plus,
  Users,
  ArrowRight,
} from "lucide-react";

export default function EmployerApplications() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  const stages = [
    { value: "all", label: "All Applications", color: "slate", count: 47 },
    { value: "new", label: "New", color: "blue", count: 12 },
    { value: "screening", label: "Screening", color: "cyan", count: 8 },
    { value: "interview", label: "Interview", color: "indigo", count: 6 },
    { value: "shortlisted", label: "Shortlisted", color: "emerald", count: 15 },
    { value: "rejected", label: "Rejected", color: "rose", count: 6 },
  ];

  // Demo data; replace with real data from your API
  const applications = [
    {
      id: 1,
      candidate: "Amit Sharma",
      initials: "AS",
      email: "amit.sharma@email.com",
      phone: "+91 98765 43210",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-20",
      experience: "5 years",
      location: "Mumbai, Maharashtra",
      education: "B.Tech Computer Science",
      stage: "new",
      skills: ["React", "Next.js", "TypeScript", "Tailwind"],
      matchScore: 95,
      lastActivity: "2 hours ago",
      notes: "Strong portfolio with modern tech stack",
    },
    {
      id: 2,
      candidate: "Neha Verma",
      initials: "NV",
      email: "neha.verma@email.com",
      phone: "+91 99876 54321",
      position: "UI/UX Designer",
      appliedDate: "2024-01-18",
      experience: "3 years",
      location: "Pune, Maharashtra",
      education: "B.Des Design",
      stage: "screening",
      skills: ["Figma", "Prototyping", "User Research", "Accessibility"],
      matchScore: 88,
      lastActivity: "Yesterday",
      notes: "Excellent design portfolio",
    },
    {
      id: 3,
      candidate: "Rahul Gupta",
      initials: "RG",
      email: "rahul.gupta@email.com",
      phone: "+91 91234 56780",
      position: "Backend Engineer",
      appliedDate: "2024-01-15",
      experience: "6 years",
      location: "Remote",
      education: "M.Tech Computer Science",
      stage: "interview",
      skills: ["Node.js", "PostgreSQL", "AWS", "Docker", "Redis"],
      matchScore: 92,
      lastActivity: "Today",
      notes: "Scheduled for technical interview tomorrow",
    },
    {
      id: 4,
      candidate: "Priya Nair",
      initials: "PN",
      email: "priya.nair@email.com",
      phone: "+91 90909 10101",
      position: "Data Analyst",
      appliedDate: "2024-01-12",
      experience: "2 years",
      location: "Bengaluru, Karnataka",
      education: "B.Sc Statistics",
      stage: "shortlisted",
      skills: ["SQL", "Python", "Power BI", "Tableau", "Excel"],
      matchScore: 85,
      lastActivity: "2 days ago",
      notes: "Strong analytical skills",
    },
    {
      id: 5,
      candidate: "Vikram Singh",
      initials: "VS",
      email: "vikram.singh@email.com",
      phone: "+91 90000 22222",
      position: "Recruiter",
      appliedDate: "2024-01-10",
      experience: "4 years",
      location: "Delhi",
      education: "MBA HR",
      stage: "rejected",
      skills: ["Sourcing", "ATS", "Screening", "Interviewing"],
      matchScore: 78,
      lastActivity: "1 week ago",
      notes: "Not enough tech recruitment experience",
    },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications.filter((a) => {
      const matchesStage = stage === "all" || a.stage === stage;
      const matchesQuery =
        !q ||
        a.candidate.toLowerCase().includes(q) ||
        a.position.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.skills.join(" ").toLowerCase().includes(q);
      return matchesStage && matchesQuery;
    });
  }, [applications, search, stage]);

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Decorative background orbs matching dashboard theme */}
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Applications</h1>
          <p className="text-white/80">
            Manage and review candidate applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/12">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium">
            <Filter className="w-4 h-4" />
            Advanced Filter
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {stages.map((stat) => (
          <div
            key={stat.value}
            className="rounded-xl p-4 shadow-lg transition-all cursor-pointer hover:-translate-y-1 group"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onClick={() => setStage(stat.value)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  {stat.count}
                </div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  stat.color === "blue"
                    ? "bg-blue-500"
                    : stat.color === "cyan"
                    ? "bg-cyan-500"
                    : stat.color === "indigo"
                    ? "bg-indigo-500"
                    : stat.color === "emerald"
                    ? "bg-emerald-500"
                    : stat.color === "rose"
                    ? "bg-rose-500"
                    : "bg-slate-500"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div
        className="rounded-xl p-6 shadow-xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates, positions, skills..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 text-white placeholder-white/60 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b87bd1] focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="match">Best Match</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Stage Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {stages.map((s) => (
            <button
              key={s.value}
              onClick={() => setStage(s.value)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 border-2 ${
                stage === s.value
                  ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg border-transparent"
                  : "bg-white/6 text-white/80 border-white/10 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {s.label}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  stage === s.value
                    ? "bg-white/20 text-white"
                    : "bg-white/10 text-white/80"
                }`}
              >
                {s.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filtered.map((app) => {
          const isOpen = expandedId === app.id;
          return (
            <div
              key={app.id}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Application Header */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #803791, #b87bd1)",
                      }}
                    >
                      {app.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {app.candidate}
                        </h3>
                        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                          <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                          <span className="text-xs font-semibold text-emerald-400">
                            {app.matchScore}% Match
                          </span>
                        </div>
                        <StageBadge value={app.stage} />
                      </div>
                      <p className="text-lg text-white/80 mb-3">
                        {app.position}
                      </p>

                      <div className="flex flex-wrap gap-3 text-sm text-white/60 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {app.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {app.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {app.education}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Applied{" "}
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {app.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-sm rounded-lg bg-white/10 text-white/80 border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setExpandedId(isOpen ? null : app.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white rounded-lg transition-colors border border-white/10"
                    >
                      {isOpen ? (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Less
                        </>
                      ) : (
                        <>
                          <ChevronRight className="w-4 h-4" />
                          More
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {isOpen && (
                <div className="border-t border-white/10 bg-white/5">
                  <div className="p-6 grid lg:grid-cols-3 gap-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-[#b87bd1]" />
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div
                          className="flex items-center gap-3 p-3 rounded-xl border border-white/10"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                          }}
                        >
                          <Mail className="w-5 h-5 text-white/60" />
                          <div>
                            <div className="text-sm font-medium text-white">
                              Email
                            </div>
                            <div className="text-sm text-white/60">
                              {app.email}
                            </div>
                          </div>
                        </div>
                        <div
                          className="flex items-center gap-3 p-3 rounded-xl border border-white/10"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                          }}
                        >
                          <Phone className="w-5 h-5 text-white/60" />
                          <div>
                            <div className="text-sm font-medium text-white">
                              Phone
                            </div>
                            <div className="text-sm text-white/60">
                              {app.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents & Actions */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#b87bd1]" />
                        Documents & Actions
                      </h4>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-start px-4 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium">
                          <FileText className="w-5 h-5 mr-3" />
                          View Resume & Cover Letter
                        </button>
                        <button className="w-full flex items-center justify-start px-4 py-3 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white rounded-lg transition-colors border border-white/10">
                          <Eye className="w-5 h-5 mr-3" />
                          View Full Profile
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <Send className="w-5 h-5 text-[#b87bd1]" />
                        Quick Actions
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center px-4 py-3 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors border border-emerald-500/30">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Shortlist
                        </button>
                        <button className="flex items-center justify-center px-4 py-3 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg transition-colors border border-rose-500/30">
                          <XCircle className="w-5 h-5 mr-2" />
                          Reject
                        </button>
                        <button className="flex items-center justify-center px-4 py-3 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white rounded-lg transition-colors border border-white/10 col-span-2">
                          <MessageSquare className="w-5 h-5 mr-2" />
                          Schedule Interview
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="px-6 pb-6">
                    <div
                      className="p-4 rounded-xl border border-white/10"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                      }}
                    >
                      <h4 className="font-semibold text-white mb-2">
                        Internal Notes
                      </h4>
                      <p className="text-white/60 text-sm">{app.notes}</p>
                      <div className="flex items-center justify-between mt-3 text-xs text-white/60">
                        <span>Last activity: {app.lastActivity}</span>
                        <button className="text-[#b87bd1] hover:text-[#803791] font-medium">
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <User className="w-12 h-12 text-white/40" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No applications found
          </h3>
          <p className="text-white/60 mb-6">
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={() => {
              setSearch("");
              setStage("all");
            }}
            className="px-6 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

function StageBadge({ value }) {
  const stageConfig = {
    new: {
      icon: Clock,
      text: "New",
      class: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    screening: {
      icon: Eye,
      text: "Screening",
      class: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    interview: {
      icon: Calendar,
      text: "Interview",
      class: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    },
    shortlisted: {
      icon: CheckCircle,
      text: "Shortlisted",
      class: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    rejected: {
      icon: XCircle,
      text: "Rejected",
      class: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    },
  };

  const config = stageConfig[value] || {
    icon: Clock,
    text: "New",
    class: "bg-white/10 text-white/80 border-white/10",
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.class}`}
    >
      <Icon className="w-4 h-4" />
      {config.text}
    </span>
  );
}
