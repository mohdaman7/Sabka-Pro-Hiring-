"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Star,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react"

export default function ATSInterface() {
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  const stages = [
    { id: "all", label: "All Applications", count: 156 },
    { id: "new", label: "New", count: 45 },
    { id: "screening", label: "Screening", count: 32 },
    { id: "interview", label: "Interview", count: 28 },
    { id: "offer", label: "Offer", count: 12 },
    { id: "hired", label: "Hired", count: 8 },
    { id: "rejected", label: "Rejected", count: 31 },
  ]

  const applications = [
    {
      id: 1,
      candidateName: "Amit Sharma",
      email: "amit.sharma@email.com",
      phone: "+91 98765 43210",
      position: "Senior Frontend Developer",
      experience: "5 years",
      skills: ["React", "TypeScript", "Next.js", "Node.js"],
      education: "B.Tech Computer Science",
      matchScore: 95,
      stage: "interview",
      appliedDate: "2024-01-15",
      rating: 4.5,
      notes: 3,
      resumeUrl: "#",
    },
    {
      id: 2,
      candidateName: "Priya Patel",
      email: "priya.p@email.com",
      phone: "+91 98765 43211",
      position: "Backend Developer",
      experience: "4 years",
      skills: ["Node.js", "MongoDB", "AWS", "Docker"],
      education: "MCA",
      matchScore: 88,
      stage: "screening",
      appliedDate: "2024-01-14",
      rating: 4,
      notes: 2,
      resumeUrl: "#",
    },
    {
      id: 3,
      candidateName: "Rahul Kumar",
      email: "rahul.k@email.com",
      phone: "+91 98765 43212",
      position: "UI/UX Designer",
      experience: "3 years",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      education: "B.Des",
      matchScore: 92,
      stage: "offer",
      appliedDate: "2024-01-13",
      rating: 5,
      notes: 5,
      resumeUrl: "#",
    },
    {
      id: 4,
      candidateName: "Sneha Desai",
      email: "sneha.d@email.com",
      phone: "+91 98765 43213",
      position: "Senior Frontend Developer",
      experience: "6 years",
      skills: ["React", "Vue.js", "Angular", "TypeScript"],
      education: "B.Tech IT",
      matchScore: 85,
      stage: "new",
      appliedDate: "2024-01-12",
      rating: 0,
      notes: 0,
      resumeUrl: "#",
    },
  ]

  const getStageColor = (stage) => {
    const colors = {
      new: "bg-secondary/10 text-secondary",
      screening: "bg-primary/10 text-primary",
      interview: "bg-accent/10 text-accent",
      offer: "bg-accent/10 text-accent",
      hired: "bg-accent/10 text-accent",
      rejected: "bg-destructive/10 text-destructive",
    }
    return colors[stage] || "bg-secondary/10 text-secondary"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Applicant Tracking System</h1>
          <p className="text-muted-foreground">Manage applications from screening to hiring</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground hover:bg-surface-hover transition-colors font-medium flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Application Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedStage === stage.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-border-light"
              }`}
            >
              <div className="text-2xl font-bold text-foreground mb-1">{stage.count}</div>
              <div className="text-sm text-muted-foreground">{stage.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, skills, position..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="px-4 py-2.5 bg-surface border border-border rounded-lg text-foreground hover:bg-surface-hover transition-colors flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Advanced Filters
        </button>
      </div>

      {/* Applications List */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications Cards */}
        <div className="lg:col-span-2 space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              onClick={() => setSelectedCandidate(application)}
              className={`bg-surface rounded-xl border-2 p-6 cursor-pointer transition-all ${
                selectedCandidate?.id === application.id ? "border-primary" : "border-border hover:border-border-light"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">{application.candidateName.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{application.candidateName}</h3>
                    <p className="text-sm text-muted-foreground">{application.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1 bg-accent/10 rounded-full">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-semibold text-accent">{application.matchScore}%</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(application.stage)}`}>
                    {application.stage.charAt(0).toUpperCase() + application.stage.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  {application.experience}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  {application.education}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {application.skills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-background rounded text-xs text-foreground">
                    {skill}
                  </span>
                ))}
                {application.skills.length > 4 && (
                  <span className="px-2 py-1 bg-background rounded text-xs text-muted-foreground">
                    +{application.skills.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {application.rating > 0 ? application.rating : "Not rated"}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {application.notes} notes
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {application.appliedDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Candidate Details Panel */}
        <div className="bg-surface rounded-xl border border-border p-6 h-fit sticky top-6">
          {selectedCandidate ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-semibold text-2xl">
                    {selectedCandidate.candidateName.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{selectedCandidate.candidateName}</h3>
                <p className="text-sm text-muted-foreground mb-4">{selectedCandidate.position}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="flex items-center gap-1 px-3 py-1 bg-accent/10 rounded-full">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-semibold text-accent">{selectedCandidate.matchScore}% Match</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedCandidate.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedCandidate.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedCandidate.experience} experience</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedCandidate.education}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-background rounded-full text-xs text-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <button className="w-full px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Move to Next Stage
                </button>
                <button className="w-full px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Interview
                </button>
                <button className="w-full px-4 py-2 bg-surface-hover hover:bg-background text-foreground rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </button>
                <button className="w-full px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Reject Application
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
