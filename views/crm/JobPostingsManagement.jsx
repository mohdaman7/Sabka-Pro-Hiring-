"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
} from "lucide-react";

export default function JobPostingsManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹8-12 LPA",
      experience: "3-5 years",
      skills: ["React", "TypeScript", "Next.js"],
      applications: 45,
      views: 234,
      status: "Active",
      postedDate: "2024-01-10",
      assignedTo: "Priya Sharma",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Digital Innovations",
      location: "Remote",
      type: "Full-time",
      salary: "₹10-15 LPA",
      experience: "4-6 years",
      skills: ["Node.js", "MongoDB", "AWS"],
      applications: 67,
      views: 456,
      status: "Active",
      postedDate: "2024-01-05",
      assignedTo: "Amit Patel",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Agency",
      location: "Bangalore, Karnataka",
      type: "Contract",
      salary: "₹6-8 LPA",
      experience: "2-4 years",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      applications: 23,
      views: 178,
      status: "Closed",
      postedDate: "2023-12-20",
      assignedTo: "Priya Sharma",
    },
  ];

  const tabs = [
    { id: "all", label: "All Jobs", count: jobs.length },
    {
      id: "active",
      label: "Active",
      count: jobs.filter((j) => j.status === "Active").length,
    },
    {
      id: "closed",
      label: "Closed",
      count: jobs.filter((j) => j.status === "Closed").length,
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Job Postings Management
          </h1>
          <p className="text-slate-600">
            Manage all job postings across the platform
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 bg-white rounded-full text-xs shadow-sm">
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title, company, skills..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {(activeTab === "all"
          ? jobs
          : jobs.filter((j) => j.status.toLowerCase() === activeTab)
        ).map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {job.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <p className="text-slate-600 mb-3">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.experience}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Eye className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Edit className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex gap-6 text-sm">
                <span className="text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {job.applications}
                  </span>{" "}
                  applications
                </span>
                <span className="text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {job.views}
                  </span>{" "}
                  views
                </span>
                <span className="text-slate-600">
                  Assigned to:{" "}
                  <span className="text-slate-900">{job.assignedTo}</span>
                </span>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm hover:shadow-md">
                View Applications
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
