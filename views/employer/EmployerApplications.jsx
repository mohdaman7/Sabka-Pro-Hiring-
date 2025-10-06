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
  Filter,
  MoreVertical,
  Star,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function EmployerApplications() {
  const [search, setSearch] = useState("")
  const [stage, setStage] = useState("all")
  const [expandedId, setExpandedId] = useState(null)
  const [sortBy, setSortBy] = useState("newest")

  const stages = [
    { value: "all", label: "All Applications", color: "slate", count: 47 },
    { value: "new", label: "New", color: "blue", count: 12 },
    { value: "screening", label: "Screening", color: "cyan", count: 8 },
    { value: "interview", label: "Interview", color: "indigo", count: 6 },
    { value: "shortlisted", label: "Shortlisted", color: "emerald", count: 15 },
    { value: "rejected", label: "Rejected", color: "rose", count: 6 },
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
  ]

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
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Applications</h1>
          <p className="text-slate-600">Manage and review candidate applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {stages.map((stat) => (
          <div
            key={stat.value}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setStage(stat.value)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.count}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                stat.color === 'blue' ? 'bg-blue-500' :
                stat.color === 'cyan' ? 'bg-cyan-500' :
                stat.color === 'indigo' ? 'bg-indigo-500' :
                stat.color === 'emerald' ? 'bg-emerald-500' :
                stat.color === 'rose' ? 'bg-rose-500' :
                'bg-slate-500'
              }`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates, positions, skills..."
                className="pl-10 pr-4 py-3 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900"
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
                  ? `${
                      s.color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg border-transparent' :
                      s.color === 'cyan' ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg border-transparent' :
                      s.color === 'indigo' ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg border-transparent' :
                      s.color === 'emerald' ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg border-transparent' :
                      s.color === 'rose' ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-lg border-transparent' :
                      'bg-gradient-to-r from-slate-600 to-slate-500 text-white shadow-lg border-transparent'
                    }`
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-md hover:bg-slate-50'
              }`}
            >
              {s.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                stage === s.value ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {s.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filtered.map((app) => {
          const isOpen = expandedId === app.id
          return (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Application Header */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {app.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{app.candidate}</h3>
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full border border-green-200">
                          <Star className="w-3 h-3 text-green-600 fill-green-600" />
                          <span className="text-xs font-semibold text-green-700">{app.matchScore}% Match</span>
                        </div>
                        <StageBadge value={app.stage} />
                      </div>
                      <p className="text-lg text-slate-700 mb-3">{app.position}</p>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-4">
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
                          Applied {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {app.skills.map((skill) => (
                          <Badge key={skill} className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={() => setExpandedId(isOpen ? null : app.id)}
                      variant="outline"
                      className="border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2"
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
                    </Button>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {isOpen && (
                <div className="border-t border-slate-200 bg-slate-50/50">
                  <div className="p-6 grid lg:grid-cols-3 gap-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                          <Mail className="w-5 h-5 text-slate-400" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">Email</div>
                            <div className="text-sm text-slate-600">{app.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                          <Phone className="w-5 h-5 text-slate-400" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">Phone</div>
                            <div className="text-sm text-slate-600">{app.phone}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents & Actions */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        Documents & Actions
                      </h4>
                      <div className="space-y-3">
                        <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-12">
                          <FileText className="w-5 h-5 mr-3" />
                          View Resume & Cover Letter
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-slate-300 bg-white text-slate-700 hover:bg-slate-50 h-12">
                          <Eye className="w-5 h-5 mr-3" />
                          View Full Profile
                        </Button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Send className="w-5 h-5 text-green-600" />
                        Quick Actions
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-12">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Shortlist
                        </Button>
                        <Button variant="outline" className="border-rose-300 bg-white text-rose-700 hover:bg-rose-50 h-12">
                          <XCircle className="w-5 h-5 mr-2" />
                          Reject
                        </Button>
                        <Button variant="outline" className="border-blue-300 bg-white text-blue-700 hover:bg-blue-50 h-12 col-span-2">
                          <MessageSquare className="w-5 h-5 mr-2" />
                          Schedule Interview
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="px-6 pb-6">
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Internal Notes</h4>
                      <p className="text-slate-600 text-sm">{app.notes}</p>
                      <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                        <span>Last activity: {app.lastActivity}</span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No applications found</h3>
          <p className="text-slate-600 mb-6">Try adjusting your search criteria or filters</p>
          <Button 
            onClick={() => { setSearch(''); setStage('all') }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

function StageBadge({ value }) {
  const stageConfig = {
    new: { icon: Clock, text: "New", class: "bg-blue-50 text-blue-700 border-blue-200" },
    screening: { icon: Eye, text: "Screening", class: "bg-cyan-50 text-cyan-700 border-cyan-200" },
    interview: { icon: Calendar, text: "Interview", class: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    shortlisted: { icon: CheckCircle, text: "Shortlisted", class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    rejected: { icon: XCircle, text: "Rejected", class: "bg-rose-50 text-rose-700 border-rose-200" },
  }

  const config = stageConfig[value] || { icon: Clock, text: "New", class: "bg-slate-50 text-slate-700 border-slate-200" }
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.class}`}>
      <Icon className="w-4 h-4" />
      {config.text}
    </span>
  )
}