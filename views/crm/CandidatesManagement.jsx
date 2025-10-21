"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Filter, Download, Eye, Star, Video, FileText } from "lucide-react"
import { adminService } from "@/services/adminService"

export default function CandidatesManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")
  const [plan, setPlan] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        setError("")
        const res = await adminService.getCandidates({
          status: "active",
          plan: plan || (activeTab === "pro" ? "pro" : activeTab === "free" ? "free" : undefined),
          search: search || undefined,
        })
        if (!mounted) return
        const data = Array.isArray(res?.data) ? res.data : []
        setUsers(data)
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || "Failed to load candidates")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [activeTab, search])

  const tabs = useMemo(() => {
    const total = users.length
    const pro = users.filter((u) => u.plan === "pro").length
    const placed = 0 // Placeholder until placement tracking exists
    return [
      { id: "all", label: "All Candidates", count: total },
      { id: "free", label: "Free", count: total - pro },
      { id: "pro", label: "Pro", count: pro },
      { id: "placed", label: "Placed", count: placed },
    ]
  }, [users])

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <option value="">All plans</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
          </select>
          <button onClick={() => setSearch("")} className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">Clear</button>
        </div>
      </div>

      {/* Candidates Grid */}
      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">{(candidate.firstName||"?").charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{candidate.firstName} {candidate.lastName}</h3>
                  <p className="text-sm text-gray-600">{candidate.email}</p>
                  {candidate.city && (<p className="text-xs text-gray-500">{candidate.city}</p>)}
                </div>
              </div>
              {candidate.plan === "pro" && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full">
                  <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
                  <span className="text-xs font-medium text-blue-700">Pro</span>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    candidate.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {candidate.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div className="px-2 py-1 bg-gray-50 rounded-lg">Completion: {candidate.profileCompletion}%</div>
                <div className="px-2 py-1 bg-gray-50 rounded-lg">Resume: {candidate.hasResume ? "Yes" : "No"}</div>
                <div className="px-2 py-1 bg-gray-50 rounded-lg">Plan: {candidate.plan}</div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 shadow-md">
                <Eye className="w-4 h-4" />
                View Profile
              </button>
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
