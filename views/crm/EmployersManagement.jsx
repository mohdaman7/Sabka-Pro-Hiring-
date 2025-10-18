"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Search,
  Filter,
  Building2,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  FileText,
  ShieldCheck,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Download,
  CreditCard,
} from "lucide-react"
import { adminService } from "@/services/adminService"

export default function EmployersManagement() {
  const [activeTab, setActiveTab] = useState("pending_reg")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [employers, setEmployers] = useState([])
  const [pendingEmployers, setPendingEmployers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        setError("")
        const [activeRes, pendingRes] = await Promise.all([
          adminService.getUsers("active"),
          adminService.getPendingUsers(),
        ])
        if (!mounted) return
        const activeData = Array.isArray(activeRes?.data) ? activeRes.data : []
        const pendingData = Array.isArray(pendingRes?.data) ? pendingRes.data : []
        setEmployers(activeData.filter((u) => u.role === "employer"))
        setPendingEmployers(pendingData.filter((u) => u.role === "employer"))
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

  const counts = useMemo(() => {
    const total = employers.length
    const verified = employers.filter((e) => e.isVerified).length
    const premium = employers.filter((e) => e.plan === "pro").length
    const pendingVerification = total - verified
    const pendingReg = pendingEmployers.length
    return { total, verified, premium, pendingVerification, pendingReg }
  }, [employers, pendingEmployers])

  const tabs = useMemo(() => {
    return [
      { id: "pending_reg", label: "Pending Approvals", count: counts.pendingReg },
      { id: "all", label: "All Employers", count: counts.total },
      { id: "verified", label: "Verified", count: counts.verified },
      { id: "pending", label: "Pending Verification", count: counts.pendingVerification },
      { id: "premium", label: "Premium", count: counts.premium },
    ]
  }, [counts])

  const filteredActiveEmployers = useMemo(() => {
    const list =
      activeTab === "verified"
        ? employers.filter((e) => e.isVerified)
        : activeTab === "pending"
        ? employers.filter((e) => !e.isVerified)
        : activeTab === "premium"
        ? employers.filter((e) => e.plan === "pro")
        : employers
    const term = searchTerm.toLowerCase()
    return list.filter((e) =>
      [e?.company?.name, e?.firstName, e?.lastName, e?.company?.industry]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    )
  }, [employers, activeTab, searchTerm])

  const filteredPendingEmployers = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return pendingEmployers.filter((e) =>
      [e?.profile?.company?.name, e?.firstName, e?.lastName, e?.email]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    )
  }, [pendingEmployers, searchTerm])

  async function refreshLists() {
    try {
      const [activeRes, pendingRes] = await Promise.all([
        adminService.getUsers("active"),
        adminService.getPendingUsers(),
      ])
      const activeData = Array.isArray(activeRes?.data) ? activeRes.data : []
      const pendingData = Array.isArray(pendingRes?.data) ? pendingRes.data : []
      setEmployers(activeData.filter((u) => u.role === "employer"))
      setPendingEmployers(pendingData.filter((u) => u.role === "employer"))
    } catch (e) {
      // swallow
    }
  }

  async function handleApprove(userId) {
    try {
      setLoading(true)
      await adminService.approveUser(userId, true)
      await refreshLists()
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to approve user")
    } finally {
      setLoading(false)
    }
  }

  async function handleReject(userId) {
    try {
      const reason = window.prompt("Enter rejection reason (optional):") || ""
      setLoading(true)
      await adminService.rejectUser(userId, reason)
      await refreshLists()
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to reject user")
    } finally {
      setLoading(false)
    }
  }

  function openDetails(user) {
    setSelectedUser(user)
    setDetailsOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employers Management</h1>
          <p className="text-gray-600">Manage approvals, verification, subscriptions, jobs, and billing</p>
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
            placeholder="Search by company, email, industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>Loading...</div>}

      {/* Pending Approvals Table */}
      {activeTab === "pending_reg" ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Company</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Contact</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Phone</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Registered</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPendingEmployers.map((user) => (
                  <tr key={user._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user?.profile?.company?.name || `${user.firstName} ${user.lastName}`}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{user.firstName} {user.lastName}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{user.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{user?.profile?.contact?.phone || "-"}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium w-fit">
                        <XCircle className="w-3 h-3" />
                        Pending
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openDetails(user)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                        <button onClick={() => handleApprove(user._id)} className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                          <ThumbsUp className="w-5 h-5 text-green-600" />
                        </button>
                        <button onClick={() => handleReject(user._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                          <ThumbsDown className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Active Employers Table
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
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredActiveEmployers.map((employer) => (
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
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium w-fit">
                            <XCircle className="w-3 h-3" />
                            Pending Verification
                          </span>
                        )}
                        {employer.plan === "pro" && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium w-fit">
                            <CreditCard className="w-3 h-3" />
                            Premium Plan
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openDetails(employer)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
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
      )}

      {detailsOpen && selectedUser && (
        <EmployerDetailsModal
          user={selectedUser}
          onClose={() => {
            setDetailsOpen(false)
            setSelectedUser(null)
          }}
          onAfterChange={refreshLists}
        />
      )}
    </div>
  )
}

function EmployerDetailsModal({ user, onClose, onAfterChange }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [details, setDetails] = useState(null) // { user, profile, jobs, totalApplications }
  const [documents, setDocuments] = useState([])
  const [activeSection, setActiveSection] = useState("info")
  const [planDraft, setPlanDraft] = useState("")

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        setError("")
        const [userRes, docsRes] = await Promise.all([
          adminService.getUserById(user._id),
          adminService.listEmployerDocuments(user._id).catch(() => ({ data: [] })),
        ])
        if (!mounted) return
        const d = userRes?.data || {}
        setDetails(d)
        setPlanDraft(d?.profile?.plan || "free")
        setDocuments(Array.isArray(docsRes?.data) ? docsRes.data : [])
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || "Failed to load details")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [user._id])

  async function handleDocAction(docId, action) {
    try {
      let reason
      if (action === "reject") {
        reason = window.prompt("Enter rejection reason (optional):") || ""
      }
      await adminService.reviewEmployerDocument(user._id, docId, action, reason)
      const res = await adminService.listEmployerDocuments(user._id)
      setDocuments(res?.data || [])
      onAfterChange?.()
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to update document")
    }
  }

  async function handlePlanUpdate() {
    try {
      await adminService.updateEmployerPlan(user._id, planDraft)
      const fresh = await adminService.getUserById(user._id)
      setDetails(fresh?.data || details)
      onAfterChange?.()
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to update plan")
    }
  }

  async function handleModerateJob(jobId, action) {
    try {
      await adminService.moderateJob(jobId, action)
      const fresh = await adminService.getUserById(user._id)
      setDetails(fresh?.data || details)
      onAfterChange?.()
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to update job")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Employer Details</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <button onClick={onClose} className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm">Close</button>
        </div>

        <div className="flex gap-2 px-6 pt-4 border-b border-gray-100">
          {[
            { id: "info", label: "Basic Info", icon: <FileText className="w-4 h-4" /> },
            { id: "documents", label: "Documents", icon: <ShieldCheck className="w-4 h-4" /> },
            { id: "subscription", label: "Subscription", icon: <CreditCard className="w-4 h-4" /> },
            { id: "jobs", label: "Job Posts", icon: <Edit className="w-4 h-4" /> },
            { id: "billing", label: "Billing", icon: <Download className="w-4 h-4" /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveSection(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-lg text-sm font-medium ${
                activeSection === t.id ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-600 mb-3">{error}</div>}

          {!loading && activeSection === "info" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Company</div>
                <div className="text-gray-900 font-medium">{details?.profile?.company?.name || "-"}</div>
                <div className="text-gray-600 text-sm">{details?.profile?.company?.industry || "-"} • {details?.profile?.company?.size || "-"}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Contact</div>
                <div className="text-gray-900 font-medium">{details?.user?.firstName} {details?.user?.lastName}</div>
                <div className="text-gray-600 text-sm">{details?.profile?.contact?.phone || "-"}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Email</div>
                <div className="text-gray-900">{details?.user?.email}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Registered</div>
                <div className="text-gray-900">{details?.user?.createdAt ? new Date(details.user.createdAt).toLocaleString() : "-"}</div>
              </div>
            </div>
          )}

          {!loading && activeSection === "documents" && (
            <div className="space-y-4">
              {Array.isArray(documents) && documents.length > 0 ? (
                documents.map((doc) => (
                  <div key={doc._id} className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900 capitalize">{(doc.type || '').replaceAll('_', ' ')}</div>
                      <div className="text-sm text-gray-600">Status: <span className="capitalize">{doc.status}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.url && (
                        <a href={doc.url} target="_blank" rel="noreferrer" className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50">View</a>
                      )}
                      <button onClick={() => handleDocAction(doc._id, "verify")} className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700">Verify</button>
                      <button onClick={() => handleDocAction(doc._id, "reject")} className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700">Reject</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-600">No documents uploaded.</div>
              )}
            </div>
          )}

          {!loading && activeSection === "subscription" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-xl">
                  <div className="text-sm text-gray-500">Current Plan</div>
                  <div className="text-gray-900 font-semibold capitalize">{details?.profile?.plan || "free"}</div>
                </div>
                <div className="p-4 border rounded-xl">
                  <div className="text-sm text-gray-500">Start Date</div>
                  <div className="text-gray-900">{details?.profile?.createdAt ? new Date(details.profile.createdAt).toLocaleDateString() : "-"}</div>
                </div>
                <div className="p-4 border rounded-xl">
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="text-gray-900">{(details?.user?.status === 'active') ? 'active' : (details?.user?.status || '-')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select value={planDraft} onChange={(e) => setPlanDraft(e.target.value)} className="px-3 py-2 border rounded-lg">
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                </select>
                <button onClick={handlePlanUpdate} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Update Plan</button>
              </div>
              <div className="mt-6">
                <div className="text-sm font-semibold text-gray-900 mb-2">Subscription History</div>
                <div className="text-gray-600 text-sm">UI only placeholder</div>
                <div className="mt-2 space-y-2">
                  {[{ plan: 'free', date: '2024-06-01' }, { plan: 'pro', date: '2024-09-15' }].map((h, idx) => (
                    <div key={idx} className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="capitalize">{h.plan}</div>
                      <div className="text-gray-600 text-sm">{new Date(h.date).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!loading && activeSection === "jobs" && (
            <div className="space-y-4">
              {Array.isArray(details?.jobs) && details.jobs.length > 0 ? (
                details.jobs.map((job) => (
                  <div key={job._id} className="p-4 border rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-600">Posted: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : '-'}</div>
                        <div className="text-sm text-gray-600">Status: {(job.status || '').toUpperCase()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleModerateJob(job._id, 'approve')} className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700">Approve</button>
                        <button onClick={() => handleModerateJob(job._id, 'reject')} className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700">Reject</button>
                        <button className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50" title="Edit (UI only)">Edit</button>
                        <button className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50">View</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-600">No jobs posted.</div>
              )}
            </div>
          )}

          {!loading && activeSection === "billing" && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">UI only placeholder</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="py-2">Invoice</th>
                      <th className="py-2">Date</th>
                      <th className="py-2">Amount</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { no: "INV-1001", date: "2024-09-15", amount: "$99.00", status: "Paid" },
                      { no: "INV-1002", date: "2024-10-15", amount: "$99.00", status: "Paid" },
                      { no: "INV-1003", date: "2024-11-15", amount: "$99.00", status: "Due" },
                    ].map((row) => (
                      <tr key={row.no} className="border-t">
                        <td className="py-2">{row.no}</td>
                        <td className="py-2">{new Date(row.date).toLocaleDateString()}</td>
                        <td className="py-2">{row.amount}</td>
                        <td className="py-2">{row.status}</td>
                        <td className="py-2">
                          <button className="px-2 py-1 border rounded hover:bg-gray-50 inline-flex items-center gap-1">
                            <Download className="w-4 h-4" /> Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
