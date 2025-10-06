"use client"

import { useMemo, useState } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function EmployerApplications() {
  const [search, setSearch] = useState("")
  const [stage, setStage] = useState("all")
  const [expandedId, setExpandedId] = useState(null)

  const stages = [
    { value: "all", label: "All", color: "slate" },
    { value: "new", label: "New", color: "blue" },
    { value: "screening", label: "Screening", color: "cyan" },
    { value: "interview", label: "Interview", color: "indigo" },
    { value: "shortlisted", label: "Shortlisted", color: "emerald" },
    { value: "rejected", label: "Rejected", color: "rose" },
  ]

  // Demo data; replace with real data from your API
  const applications = [
    {
      id: 1,
      candidate: "Amit Sharma",
      initials: "AS",
      email: "amit.sharma@email.com",
      phone: "+91 98765 43210",
      position: "Senior Frontend Developer",
      appliedDate: "2024-09-20",
      experience: "5 years",
      location: "Mumbai",
      education: "B.Tech, CS",
      stage: "new",
      skills: ["React", "Next.js", "TypeScript"],
    },
    {
      id: 2,
      candidate: "Neha Verma",
      initials: "NV",
      email: "neha.verma@email.com",
      phone: "+91 99876 54321",
      position: "UI/UX Designer",
      appliedDate: "2024-09-18",
      experience: "3 years",
      location: "Pune",
      education: "B.Des, Design",
      stage: "screening",
      skills: ["Figma", "Prototyping", "Accessibility"],
    },
    {
      id: 3,
      candidate: "Rahul Gupta",
      initials: "RG",
      email: "rahul.gupta@email.com",
      phone: "+91 91234 56780",
      position: "Backend Engineer",
      appliedDate: "2024-09-15",
      experience: "6 years",
      location: "Remote",
      education: "M.Tech, CS",
      stage: "interview",
      skills: ["Node.js", "Postgres", "AWS"],
    },
    {
      id: 4,
      candidate: "Priya Nair",
      initials: "PN",
      email: "priya.nair@email.com",
      phone: "+91 90909 10101",
      position: "Data Analyst",
      appliedDate: "2024-09-12",
      experience: "2 years",
      location: "Bengaluru",
      education: "B.Sc, Stats",
      stage: "shortlisted",
      skills: ["SQL", "Python", "Power BI"],
    },
    {
      id: 5,
      candidate: "Vikram Singh",
      initials: "VS",
      email: "vikram.singh@email.com",
      phone: "+91 90000 22222",
      position: "Recruiter",
      appliedDate: "2024-09-10",
      experience: "4 years",
      location: "Delhi",
      education: "MBA, HR",
      stage: "rejected",
      skills: ["Sourcing", "ATS", "Screening"],
    },
  ]

  const counts = useMemo(() => {
    const base = { all: applications.length }
    for (const s of stages.slice(1)) {
      base[s.value] = applications.filter((a) => a.stage === s.value).length
    }
    return base
  }, [applications])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return applications.filter((a) => {
      const matchesStage = stage === "all" || a.stage === stage
      const matchesQuery =
        !q ||
        a.candidate.toLowerCase().includes(q) ||
        a.position.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.skills.join(" ").toLowerCase().includes(q)
      return matchesStage && matchesQuery
    })
  }, [applications, search, stage])

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-pretty text-2xl font-semibold tracking-tight">Applications</h1>
            <p className="text-sm text-slate-600">Review and manage candidates across all job posts</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-100 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </header>

        {/* Controls */}
        <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, skills, location..."
              className="pl-9 bg-white"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {stages.map((s) => (
              <StagePill
                key={s.value}
                active={stage === s.value}
                onClick={() => setStage(s.value)}
                label={s.label}
                count={counts[s.value] ?? 0}
              />
            ))}
          </div>
        </div>

        {/* List */}
        <ul role="list" className="space-y-3">
          {filtered.map((app) => {
            const isOpen = expandedId === app.id
            return (
              <li key={app.id}>
                {/* gradient border wrapper */}
                <div className="group rounded-lg bg-gradient-to-r from-blue-100/50 via-blue-50 to-transparent p-[1px] transition-[background] duration-300 hover:from-blue-200/60 hover:via-blue-100">
                  {/* card */}
                  <article className="rounded-lg border border-slate-200 bg-white/90 p-4 shadow-sm transition-colors duration-300 motion-safe:transition-transform motion-safe:duration-300 group-hover:shadow md:p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                          <span className="text-sm font-medium">{app.initials}</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-medium tracking-tight group-hover:underline">
                            {app.candidate}
                          </h3>
                          <p className="truncate text-sm text-slate-600">{app.position}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                              <Briefcase className="mr-1 h-3.5 w-3.5" /> {app.experience}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                              <MapPin className="mr-1 h-3.5 w-3.5" /> {app.location}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                              <GraduationCap className="mr-1 h-3.5 w-3.5" /> {app.education}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4 flex items-center gap-2">
                        <StageBadge value={app.stage} />
                        <Button
                          variant="ghost"
                          className="h-8 gap-1 px-2 text-blue-700 hover:bg-blue-50 hover:text-blue-800 focus-visible:ring-blue-600"
                          onClick={() => setExpandedId(isOpen ? null : app.id)}
                          aria-expanded={isOpen}
                          aria-controls={`app-details-${app.id}`}
                        >
                          {isOpen ? (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              Collapse
                            </>
                          ) : (
                            <>
                              <ChevronRight className="h-4 w-4" />
                              Details
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {app.skills.map((s) => (
                        <Badge key={s} className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {s}
                        </Badge>
                      ))}
                      <span className="ml-auto flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="h-3.5 w-3.5" />
                        Applied {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Expandable */}
                    {isOpen && (
                      <div
                        id={`app-details-${app.id}`}
                        className="mt-4 grid gap-4 rounded-md border border-slate-200 bg-slate-50/60 p-4 md:grid-cols-3"
                      >
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-slate-700">Contact</h4>
                          <p className="flex items-center gap-2 text-sm text-slate-700">
                            <Mail className="h-4 w-4 text-slate-500" /> {app.email}
                          </p>
                          <p className="flex items-center gap-2 text-sm text-slate-700">
                            <Phone className="h-4 w-4 text-slate-500" /> {app.phone}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-slate-700">Documents</h4>
                          <div className="flex flex-wrap gap-2">
                            <Button className="h-8 gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow hover:from-blue-700 hover:to-blue-600 focus-visible:ring-blue-600">
                              <FileText className="h-4 w-4" />
                              Resume
                            </Button>
                            <Button
                              variant="outline"
                              className="h-8 gap-2 border-slate-300 text-slate-700 hover:bg-slate-100 bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                              Profile
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-slate-700">Actions</h4>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="secondary"
                              className="h-8 gap-2 bg-emerald-600/90 text-white hover:bg-emerald-700 focus-visible:ring-emerald-600"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Shortlist
                            </Button>
                            <Button
                              variant="secondary"
                              className="h-8 gap-2 bg-rose-600/90 text-white hover:bg-rose-700 focus-visible:ring-rose-600"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                            <Button
                              variant="ghost"
                              className="h-8 gap-2 text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-600"
                            >
                              <MessageSquare className="h-4 w-4" />
                              Note
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                </div>
              </li>
            )
          })}
        </ul>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <User className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-2 font-medium text-slate-700">No applications found</p>
            <p className="text-sm text-slate-600">Try adjusting your search or stage filter.</p>
          </div>
        )}
      </section>
    </main>
  )
}

function StagePill({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        active
          ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-600",
      ].join(" ")}
    >
      <span>{label}</span>
      <span
        className={
          active ? "rounded-full bg-white/20 px-2 text-white" : "rounded-full bg-slate-100 px-2 text-slate-700"
        }
      >
        {count}
      </span>
    </button>
  )
}

function StageBadge({ value }) {
  const map = {
    new: { icon: Clock, text: "New", cls: "bg-blue-50 text-blue-700" },
    screening: { icon: Eye, text: "Screening", cls: "bg-cyan-50 text-cyan-700" },
    interview: { icon: Calendar, text: "Interview", cls: "bg-indigo-50 text-indigo-700" },
    shortlisted: { icon: CheckCircle, text: "Shortlisted", cls: "bg-emerald-50 text-emerald-700" },
    rejected: { icon: XCircle, text: "Rejected", cls: "bg-rose-50 text-rose-700" },
  }
  const item = map[value] || { icon: Clock, text: "All", cls: "bg-slate-100 text-slate-700" }
  const Icon = item.icon
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${item.cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {item.text}
    </span>
  )
}
