"use client"

import { useState } from "react"
import { Search, Filter, Plus, Phone, Mail, MoreVertical } from "lucide-react"

export default function LeadsManagement() {
  const [activeTab, setActiveTab] = useState("all")

  const leads = [
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul.k@email.com",
      phone: "+91 98765 43210",
      type: "Candidate",
      source: "Website",
      status: "New",
      assignedTo: "Priya Sharma",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Tech Innovations Ltd",
      email: "hr@techinnovations.com",
      phone: "+91 98765 43211",
      type: "Employer",
      source: "Google",
      status: "Follow-up",
      assignedTo: "Amit Patel",
      date: "2024-01-14",
    },
    {
      id: 3,
      name: "Sneha Desai",
      email: "sneha.d@email.com",
      phone: "+91 98765 43212",
      type: "Candidate",
      source: "Social Media",
      status: "Converted",
      assignedTo: "Priya Sharma",
      date: "2024-01-13",
    },
    {
      id: 4,
      name: "Global Solutions",
      email: "contact@globalsolutions.com",
      phone: "+91 98765 43213",
      type: "Employer",
      source: "Direct",
      status: "New",
      assignedTo: "Amit Patel",
      date: "2024-01-12",
    },
  ]

  const tabs = [
    { id: "all", label: "All Leads", count: leads.length },
    { id: "new", label: "New", count: leads.filter((l) => l.status === "New").length },
    { id: "followup", label: "Follow-up", count: leads.filter((l) => l.status === "Follow-up").length },
    { id: "converted", label: "Converted", count: leads.filter((l) => l.status === "Converted").length },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Leads Management</h1>
          <p className="text-muted-foreground">Track and manage all your leads in one place</p>
        </div>
        <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-medium flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Lead
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
            placeholder="Search leads by name, email, or phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="px-4 py-2.5 bg-surface border border-border rounded-lg text-foreground hover:bg-surface-hover transition-colors flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Lead</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Contact</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Source</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Assigned To</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-border hover:bg-surface-hover transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">{lead.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </a>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        lead.type === "Candidate" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                      }`}
                    >
                      {lead.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{lead.source}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === "New"
                          ? "bg-secondary/10 text-secondary"
                          : lead.status === "Follow-up"
                            ? "bg-accent/10 text-accent"
                            : "bg-accent/10 text-accent"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-foreground">{lead.assignedTo}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{lead.date}</td>
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-background rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
