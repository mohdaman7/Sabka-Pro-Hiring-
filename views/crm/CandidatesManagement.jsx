"use client"

import { useEffect, useState } from "react"
import { adminService } from "@/services/adminService"
import { Search, Filter, Download, Eye, Star, Video, FileText } from "lucide-react"

export default function CandidatesManagement() {
  const [activeTab, setActiveTab] = useState("all")

  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const res = await adminService.getCandidates()
        if (!mounted) return
        const list = (res?.data || []).map((c) => ({
          id: c._id,
          name: `${c?.userId?.firstName || ""} ${c?.userId?.lastName || ""}`.trim() || c?.userId?.email,
          email: c?.userId?.email,
          phone: c?.phone || "",
          qualification: c?.highestQualification || "",
          experience: c?.experiences?.length ? `${c.experiences.length} entries` : "",
          skills: (c?.skills || []).map((s) => s.name),
          isPro: c?.plan === "pro",
          hasVideoResume: Boolean(c?.videoResume?.url),
          status: c?.isActive ? "Active" : "Inactive",
          assignedTo: "",
          appliedJobs: c?.applicationsCount || 0,
        }))
        setCandidates(list)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const tabs = [
    { id: "all", label: "All Candidates", count: candidates.length },
    { id: "free", label: "Free", count: candidates.filter((c) => !c.isPro).length },
    { id: "pro", label: "Pro", count: candidates.filter((c) => c.isPro).length },
    { id: "placed", label: "Placed", count: candidates.filter((c) => c.status === "Placed").length },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidates Management</h1>
          <p className="text-gray-600">Manage and track all registered candidates</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium flex items-center gap-2 shadow-sm">
          <Download className="w-5 h-5" />
          Export Data
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{tab.count}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, skills..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Candidates Grid */}
      {loading && <div className="text-gray-600">Loading...</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">{candidate.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.qualification}</p>
                </div>
              </div>
              {candidate.isPro && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full">
                  <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
                  <span className="text-xs font-medium text-blue-700">Pro</span>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-900">Experience:</span>
                {candidate.experience}
              </div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    candidate.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {candidate.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 shadow-md">
                <Eye className="w-4 h-4" />
                View Profile
              </button>
              {candidate.hasVideoResume && (
                <button className="px-3 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg transition-colors">
                  <Video className="w-4 h-4" />
                </button>
              )}
              <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
