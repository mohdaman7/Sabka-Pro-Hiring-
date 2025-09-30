"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, Star, Video, FileText } from "lucide-react"

export default function CandidatesManagement() {
  const [activeTab, setActiveTab] = useState("all")

  const candidates = [
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit.sharma@email.com",
      phone: "+91 98765 43210",
      qualification: "B.Tech Computer Science",
      experience: "3 years",
      skills: ["React", "Node.js", "MongoDB"],
      isPro: true,
      hasVideoResume: true,
      status: "Active",
      assignedTo: "Priya Patel",
      appliedJobs: 5,
    },
    {
      id: 2,
      name: "Priya Desai",
      email: "priya.d@email.com",
      phone: "+91 98765 43211",
      qualification: "MBA Marketing",
      experience: "5 years",
      skills: ["Digital Marketing", "SEO", "Content Strategy"],
      isPro: false,
      hasVideoResume: false,
      status: "Active",
      assignedTo: "Rahul Kumar",
      appliedJobs: 2,
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul.v@email.com",
      phone: "+91 98765 43212",
      qualification: "B.Com",
      experience: "2 years",
      skills: ["Accounting", "Tally", "Excel"],
      isPro: true,
      hasVideoResume: true,
      status: "Placed",
      assignedTo: "Priya Patel",
      appliedJobs: 8,
    },
    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha.p@email.com",
      phone: "+91 98765 43213",
      qualification: "BCA",
      experience: "1 year",
      skills: ["Python", "Django", "SQL"],
      isPro: false,
      hasVideoResume: false,
      status: "Active",
      assignedTo: "Rahul Kumar",
      appliedJobs: 3,
    },
  ]

  const tabs = [
    { id: "all", label: "All Candidates", count: candidates.length },
    { id: "free", label: "Free", count: candidates.filter((c) => !c.isPro).length },
    { id: "pro", label: "Pro", count: candidates.filter((c) => c.isPro).length },
    { id: "placed", label: "Placed", count: candidates.filter((c) => c.status === "Placed").length },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Candidates Management</h1>
          <p className="text-muted-foreground">Manage and track all registered candidates</p>
        </div>
        <button className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground hover:bg-surface-hover transition-colors font-medium flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Data
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 bg-surface rounded-full text-xs">{tab.count}</span>
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, skills..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="px-4 py-2.5 bg-surface border border-border rounded-lg text-foreground hover:bg-surface-hover transition-colors flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Candidates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-surface rounded-xl border border-border p-6 hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-lg">{candidate.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidate.qualification}</p>
                </div>
              </div>
              {candidate.isPro && (
                <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-xs font-medium text-accent">Pro</span>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Experience:</span>
                {candidate.experience}
              </div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-background rounded text-xs text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    candidate.status === "Active" ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary"
                  }`}
                >
                  {candidate.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <button className="flex-1 px-3 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View Profile
              </button>
              {candidate.hasVideoResume && (
                <button className="px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">
                  <Video className="w-4 h-4" />
                </button>
              )}
              <button className="px-3 py-2 bg-surface-hover hover:bg-background text-foreground rounded-lg transition-colors">
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
