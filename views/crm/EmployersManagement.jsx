"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Filter, Building2, CheckCircle, XCircle, Eye, MoreVertical } from "lucide-react"
import { adminService } from "@/services/adminService"

export default function EmployersManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [employers, setEmployers] = useState([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        setError("")
        // Load admin users and filter employers
        const res = await adminService.getUsers("active")
        if (!mounted) return
        const data = Array.isArray(res?.data) ? res.data : []
        const employerUsers = data.filter((u) => u.role === "employer")
        setEmployers(employerUsers)
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || "Failed to load employers")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const tabs = useMemo(() => {
    const total = employers.length
    const verified = employers.filter((e) => e.isVerified).length
    const premium = employers.filter((e) => e.plan === "pro").length
    const pending = total - verified
    return [
      { id: "all", label: "All Employers", count: total },
      { id: "verified", label: "Verified", count: verified },
      { id: "pending", label: "Pending Verification", count: pending },
      { id: "premium", label: "Premium", count: premium },
    ]
  }, [employers])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employers Management</h1>
          <p className="text-gray-600">Manage and verify employer accounts</p>
        </div>
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
            placeholder="Search by company name, industry..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Employers Table */}
      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Company</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Contact Person</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Industry</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Size</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Job Posts</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Hires</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employers.map((employer) => (
                <tr key={employer._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{employer.company?.name || `${employer.firstName} ${employer.lastName}`}</div>
                        <div className="text-sm text-gray-600">{employer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{employer.firstName} {employer.lastName}</div>
                    <div className="text-sm text-gray-600">{employer.contact?.phone || "-"}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{employer.company?.industry || "-"}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{employer.company?.size || "-"}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      {employer.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium w-fit">
                          <XCircle className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                      {employer.plan === "pro" && (
                        <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium w-fit">
                          Premium
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">-</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">-</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
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
