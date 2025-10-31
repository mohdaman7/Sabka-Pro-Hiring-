"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ResumeCollection from "./ats/ResumeCollection";
import JobManagement from "./ats/JobManagement";
import CandidateSearch from "./ats/CandidateSearch";
import {
  FileText,
  Briefcase,
  Users,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp,
  RefreshCw,
  Sparkles,
  BarChart3,
  Target,
  Clock,
  Download,
  Upload,
  Filter,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  GraduationCap,
  Building,
  Calendar,
  Star,
  Zap,
  Activity,
  TrendingDown,
  AlertCircle,
  Plus,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import { customToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { adminService } from "@/services/adminService";

export default function ATSManagement() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams?.get("section");
  
  const [mainSection, setMainSection] = useState(sectionParam || "dashboard");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Update section when URL parameter changes
  useEffect(() => {
    if (sectionParam) {
      setMainSection(sectionParam);
    }
  }, [sectionParam]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await adminService.getATSDashboardStats();
      if (data.success) setStats(data.stats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardStats().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent p-6 space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-[#803791]/20 bg-gradient-to-r from-[#803791]/40 via-[#9c54b1]/30 to-[#5c1f72]/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute inset-0 opacity-60 mix-blend-screen" style={{
          background: "radial-gradient(circle at top right, rgba(255,255,255,0.25), transparent 55%)"
        }}></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#b87bd1]/20 blur-3xl"></div>
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white/80 shadow-lg shadow-[#803791]/20">
              <Sparkles className="h-4 w-4 text-[#ffd6ff]" />
              Applicant Tracking System
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Streamline your <span className="bg-gradient-to-r from-[#ffd6ff] to-[#cfa9ff] bg-clip-text text-transparent">recruitment process</span> with AI.
            </h1>
            <p className="text-base text-white/80 md:text-lg">
              Parse resumes, manage job postings, filter candidates, and track applications all in one place.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:text-white disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing" : "Sync data"}
              </button>
            </div>
          </div>

          <div className="grid w-full max-w-sm grid-cols-1 gap-3">
            <div className="relative overflow-hidden rounded-2xl border border-[#803791]/20 bg-white/10 p-4">
              <div className="absolute inset-0 opacity-50" style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.35), transparent)"
              }}></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">Total Applications</p>
                  <p className="mt-1 text-3xl font-semibold text-white">{stats?.applications?.total || 0}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <FileText className="h-5 w-5 text-[#ffd6ff]" />
                </div>
              </div>
              <p className="mt-3 text-xs text-white/60">{stats?.applications?.pending || 0} pending review</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#803791]/20 bg-white/5 p-4">
              <div className="absolute inset-0 opacity-40" style={{
                background: "linear-gradient(135deg, rgba(150,91,214,0.4), transparent)"
              }}></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">Active Jobs</p>
                  <p className="mt-1 text-3xl font-semibold text-white">{stats?.jobs?.active || 0}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Briefcase className="h-5 w-5 text-white/70" />
                </div>
              </div>
              <p className="mt-3 text-xs text-white/60">{stats?.jobs?.total || 0} total job postings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section Toggle */}
      <div className="relative">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-[#803791]/20 backdrop-blur-sm overflow-x-auto">
          {[
            { id: "dashboard", icon: BarChart3, label: "Dashboard" },
            { id: "resumes", icon: FileText, label: "Resumes", count: stats?.resumes?.total },
            { id: "jobs", icon: Briefcase, label: "Jobs", count: stats?.jobs?.active },
            { id: "candidates", icon: Users, label: "Candidates" },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setMainSection(section.id)}
              className={cn(
                "flex-shrink-0 relative px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2",
                mainSection === section.id ? "text-white" : "text-white/60 hover:text-white/80"
              )}
            >
              {mainSection === section.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-lg shadow-lg" />
              )}
              <section.icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{section.label}</span>
              {mainSection === section.id && section.count !== undefined && (
                <span className="relative z-10 ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-white/20">
                  {section.count || 0}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {mainSection === "dashboard" && (
        <DashboardContent stats={stats} />
      )}

      {mainSection === "resumes" && <ResumeCollection />}

      {mainSection === "jobs" && <JobManagement />}

      {mainSection === "candidates" && <CandidateSearch />}
    </div>
  );
}

// Dashboard Content
function DashboardContent({ stats }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Resumes" value={stats?.resumes?.total || 0} subtitle={`Avg Score: ${Math.round(stats?.resumes?.avgScore || 0)}%`} icon={FileText} />
        <StatCard title="Active Jobs" value={stats?.jobs?.active || 0} subtitle={`${stats?.jobs?.total || 0} total jobs`} icon={Briefcase} />
        <StatCard title="Pending Review" value={stats?.applications?.pending || 0} subtitle="Applications to review" icon={Clock} />
        <StatCard title="Interviews" value={stats?.applications?.interview || 0} subtitle="Scheduled interviews" icon={CheckCircle} />
      </div>

      <div className="rounded-2xl border border-[#803791]/20 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Applications</h3>
        <div className="space-y-3">
          {stats?.recentActivity?.slice(0, 5).map((app) => (
            <div key={app._id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#803791]/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{app.studentId?.firstName} {app.studentId?.lastName}</p>
                  <p className="text-xs text-white/60">{app.jobId?.title}</p>
                </div>
              </div>
              <span className="text-xs text-white/60">{new Date(app.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stat Card
function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5">
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, rgba(128,55,145,0.45), transparent)",
        }}
      ></div>
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/80">{title}</p>
          <Icon className="h-5 w-5 text-white/80" />
        </div>
        <p className="text-3xl font-semibold text-white">{value}</p>
        <p className="text-xs text-white/60">{subtitle}</p>
      </div>
    </div>
  );
}

