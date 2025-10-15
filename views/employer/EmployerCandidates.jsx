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
} from "lucide-react";
import Link from "next/link";
import { applicationService } from "@/services/applicationService";

export default function CandidatesPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await applicationService.employerMyApplications();
        if (!mounted) return;
        setApplications(res?.data || []);
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || "Failed to load applications");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filters = [
    "All Candidates",
    "New Applications",
    "Shortlisted",
    "Under Review",
    "Rejected",
  ];

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

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Candidates</h1>
          <p className="text-white/80">
            Browse and manage candidate applications
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/12">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div
          className="lg:col-span-3 rounded-xl p-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search candidates by name, skills, or position..."
              className="w-full pl-10 pr-4 py-2 bg-transparent text-white placeholder-white/60 border-none focus:outline-none"
            />
          </div>
        </div>
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="text-2xl font-bold text-white">{applications.length}</div>
          <div className="text-sm text-white/80">Total Candidates</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              index === 0
                ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white"
                : "bg-white/6 hover:bg-white/10 text-white/80"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Candidates Grid */}
      {error && <div className="text-red-300">{error}</div>}
      {loading && <div className="text-white/80">Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {applications.map((app) => {
          const candidate = app?.studentId || {};
          const name = `${candidate.firstName || ""} ${candidate.lastName || ""}`.trim() || "Candidate";
          return (
          <div
            key={app._id}
            className="rounded-xl p-6 hover:shadow-2xl transition-all hover:-translate-y-1 group cursor-pointer"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Candidate Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <span className="text-white font-semibold text-sm">{(name || "?").charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg group-hover:text-[#b87bd1] transition-colors">{name}</h3>
                  <p className="text-sm text-white/80">{app?.jobId?.title || "Applied role"}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/6">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-semibold text-white">{""}</span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    app.status === "applied"
                      ? "bg-blue-500/20 text-blue-400"
                      : app.status === "interview"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {app.status}
                </span>
              </div>
            </div>

            {/* Candidate Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <MapPin className="w-4 h-4 text-white/80" />
                {candidate.address?.city || "-"}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Briefcase className="w-4 h-4 text-white/80" />
                {candidate.experience || "-"}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Calendar className="w-4 h-4 text-white/80" />
                Applied {new Date(app.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {(candidate.skills || []).slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-md bg-white/6 text-white/80"
                  >
                    {skill}
                  </span>
                ))}
                {Array.isArray(candidate.skills) && candidate.skills.length > 3 && (
                  <span className="px-2 py-1 text-xs rounded-md bg-white/6 text-white/80">+{candidate.skills.length - 3}</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="text-xs text-white/60">
                Applied {new Date(app.createdAt).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Mail className="w-4 h-4 text-white/80" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Phone className="w-4 h-4 text-white/80" />
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-sm bg-white/6 hover:bg-white/10 text-white/80 rounded-lg transition-colors">
                  View
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )})}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <button
          className="px-6 py-3 rounded-lg border border-white/12 hover:bg-white/10 text-white/80 transition-colors"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          }}
        >
          Load More Candidates
        </button>
      </div>
    </div>
  );
}
