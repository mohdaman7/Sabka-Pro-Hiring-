"use client"

import { useState } from "react"
import { Search, Filter, Plus, Phone, Mail, MoreVertical } from "lucide-react"

export default function LeadsManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const tabs = [
    { id: "all", label: "All Leads", count: filteredLeads.length },
    { id: "new", label: "New", count: filteredLeads.filter((l) => l.status === "New").length },
    { id: "followup", label: "Follow-up", count: filteredLeads.filter((l) => l.status === "Follow-up").length },
    { id: "converted", label: "Converted", count: filteredLeads.filter((l) => l.status === "Converted").length },
  ]

  const displayedLeads =
    activeTab === "all"
      ? filteredLeads
      : filteredLeads.filter((lead) => lead.status.toLowerCase().replace("-", "") === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Leads Management</h1>
          <p className="text-slate-600">Track and manage all your leads in one place</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all font-medium flex items-center gap-2 shadow-sm hover:shadow-md">
          <Plus className="w-5 h-5" />
          Add Lead
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 bg-white rounded-full text-xs shadow-sm">{tab.count}</span>
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
            placeholder="Search leads by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Lead</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Contact</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Type</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Source</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Assigned To</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-semibold text-sm">{lead.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{lead.name}</div>
                        <div className="text-sm text-slate-600">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </a>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        lead.type === "Candidate" ? "bg-blue-100 text-blue-700" : "bg-cyan-100 text-cyan-700"
                      }`}
                    >
                      {lead.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{lead.source}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === "New"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "Follow-up"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-900">{lead.assignedTo}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{lead.date}</td>
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-slate-600" />
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
