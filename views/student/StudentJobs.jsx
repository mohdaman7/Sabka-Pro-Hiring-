"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Bookmark,
  ExternalLink,
  Filter,
  X,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    logo: "/company1.png",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    description:
      "We're looking for an experienced frontend developer to join our growing team.",
    saved: false,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateLabs",
    logo: "/company2.jpg",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130k - $180k",
    posted: "1 week ago",
    skills: ["Node.js", "React", "PostgreSQL", "AWS"],
    description:
      "Join our team building cutting-edge SaaS products for enterprise clients.",
    saved: true,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignHub",
    logo: "/company3.jpg",
    location: "Hybrid - New York",
    type: "Full-time",
    salary: "$90k - $130k",
    posted: "3 days ago",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    description:
      "Create beautiful and intuitive user experiences for our mobile and web applications.",
    saved: false,
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "CloudScale Inc",
    logo: "/company4.jpg",
    location: "Remote",
    type: "Contract",
    salary: "$100k - $140k",
    posted: "5 days ago",
    skills: ["Python", "Django", "Docker", "Kubernetes"],
    description:
      "Build scalable backend systems for our cloud infrastructure platform.",
    saved: false,
  },
  {
    id: 5,
    title: "Product Manager",
    company: "StartupXYZ",
    logo: "/company1.png",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $150k",
    posted: "1 day ago",
    skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
    description:
      "Lead product development and strategy for our B2B SaaS platform.",
    saved: true,
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "SecureCloud",
    logo: "/company3.jpg",
    location: "Remote",
    type: "Full-time",
    salary: "$125k - $165k",
    posted: "4 days ago",
    skills: ["AWS", "Terraform", "CI/CD", "Monitoring"],
    description:
      "Manage and optimize our cloud infrastructure and deployment pipelines.",
    saved: false,
  },
];

export default function JobListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [savedJobs, setSavedJobs] = useState(
    jobs.filter((job) => job.saved).map((job) => job.id)
  );
  const [showFilters, setShowFilters] = useState(false);

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesType =
      selectedType === "all" ||
      job.type.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesType;
  });

  const stats = [
    { label: "Total Jobs", value: jobs.length },
    {
      label: "New Today",
      value: jobs.filter((j) => j.posted.includes("day")).length,
    },
    { label: "Saved Jobs", value: savedJobs.length },
  ];

  return (
    <div className="relative min-h-screen p-6 overflow-hidden">
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

      {/* Header Section */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6 mb-6"
        style={{
          background:
            "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              Find Your Dream Job
            </h1>
            <p className="text-white/85">
              Discover opportunities that match your skills and aspirations
            </p>
          </div>
          <button
            className="md:hidden px-4 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors font-medium border border-white/12 flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
          <input
            type="text"
            placeholder="Search by job title, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-base border border-white/12 bg-white/6 text-white placeholder:text-white/60 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 rounded-xl"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </div>
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Briefcase className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside
          className={`w-64 flex-shrink-0 space-y-6 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div
            className="p-6 rounded-2xl shadow-xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-white text-lg">Filters</h3>
              {showFilters && (
                <button
                  className="md:hidden text-white/80 hover:text-white"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-white/80 mb-3 block">
                  Job Type
                </label>
                <div className="space-y-2">
                  {["all", "full-time", "contract", "part-time"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        selectedType === type
                          ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-md"
                          : "bg-white/6 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() +
                        type.slice(1).replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white/80 mb-3 block">
                  Location
                </label>
                <div className="space-y-2">
                  {["Remote", "Hybrid", "On-site"].map((location) => (
                    <label
                      key={location}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/12 text-[#803791] focus:ring-[#b87bd1] bg-white/6"
                      />
                      <span className="text-sm text-white/80 group-hover:text-white">
                        {location}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white/80 mb-3 block">
                  Experience Level
                </label>
                <div className="space-y-2">
                  {["Entry Level", "Mid Level", "Senior", "Lead"].map(
                    (level) => (
                      <label
                        key={level}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-white/12 text-[#803791] focus:ring-[#b87bd1] bg-white/6"
                        />
                        <span className="text-sm text-white/80 group-hover:text-white">
                          {level}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-sm text-white/70">
              Showing{" "}
              <span className="font-semibold text-white">
                {filteredJobs.length}
              </span>{" "}
              jobs
            </p>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex gap-6">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden shadow-md"
                      style={{
                        background: "linear-gradient(135deg,#803791,#b87bd1)",
                      }}
                    >
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {job.title}
                        </h3>
                        <p className="text-base font-medium text-white/80">
                          {job.company}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                          savedJobs.includes(job.id)
                            ? "text-[#b87bd1] bg-[#b87bd1]/10"
                            : "text-white/60 hover:text-white/80 hover:bg-white/6"
                        }`}
                      >
                        <Bookmark
                          className={`h-5 w-5 ${
                            savedJobs.includes(job.id) ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/70">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold text-white">
                          {job.salary}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>

                    <p className="text-white/70 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: "rgba(184,123,209,0.08)",
                            color: "#b87bd1",
                            border: "1px solid rgba(184,123,209,0.2)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button className="px-6 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium shadow-lg flex items-center gap-2">
                        Apply Now
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <button className="px-6 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors font-medium border border-white/12">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div
              className="rounded-xl p-12 text-center shadow-xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No jobs found
              </h3>
              <p className="text-white/70">
                Try adjusting your search or filters to find more opportunities.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
