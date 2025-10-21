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
  Check,
  X,
  FileText,
  Crown,
  BadgeCheck,
} from "lucide-react"
import { adminService } from "@/services/adminService"

export default function EmployersManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [employers, setEmployers] = useState([])
  const [viewMode, setViewMode] = useState("employers") // employers | approvals
  const [pendingLoading, setPendingLoading] = useState(false)
  const [pendingEmployers, setPendingEmployers] = useState([])
  const [actionLoadingId, setActionLoadingId] = useState("")
  const [selectedEmployer, setSelectedEmployer] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

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

        // Enrich with profile details (plan, isVerified, company, contact)
        const enriched = await Promise.all(
          employerUsers.map(async (u) => {
            try {
              const details = await adminService.getUserById(u._id)
              const profile = details?.data?.profile || {}
              return {
                ...u,
                isVerified: Boolean(profile.isVerified),
                plan: profile.plan || "free",
                company: profile.company || {},
                contact: profile.contact || {},
              }
            } catch {
              return { ...u }
            }
          })
        )

        setEmployers(enriched)
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

  async function refreshEmployers() {
    try {
      setLoading(true)
      const res = await adminService.getUsers("active")
      const data = Array.isArray(res?.data) ? res.data : []
      const employerUsers = data.filter((u) => u.role === "employer")
      const enriched = await Promise.all(
        employerUsers.map(async (u) => {
          try {
            const details = await adminService.getUserById(u._id)
            const profile = details?.data?.profile || {}
            return {
              ...u,
              isVerified: Boolean(profile.isVerified),
              plan: profile.plan || "free",
              company: profile.company || {},
              contact: profile.contact || {},
            }
          } catch {
            return { ...u }
          }
        })
      )
      setEmployers(enriched)
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to refresh employers")
    } finally {
      setLoading(false)
      setActionLoadingId("")
    }
  }

  const handleVerifyToggle = async (userId, current) => {
    try {
      setActionLoadingId(userId)
      let isVerified = current
      if (typeof isVerified === "undefined") {
        try {
          const details = await adminService.getUserById(userId)
          isVerified = Boolean(details?.data?.profile?.isVerified)
        } catch {}
      }
      await adminService.setEmployerVerification(userId, !isVerified)
      await refreshEmployers()
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to update verification")
    }
  }

  const handlePlanChange = async (userId, nextPlan) => {
    try {
      setActionLoadingId(userId)
      await adminService.updateEmployerPlan(userId, nextPlan)
      await refreshEmployers()
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to update plan")
    }
  }

  const loadPendingEmployers = async () => {
    try {
      setPendingLoading(true)
      setError("")
      const res = await adminService.getPendingUsers()
      const list = Array.isArray(res?.data) ? res.data : []
      setPendingEmployers(list.filter((u) => u.role === "employer"))
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to load pending employers")
    } finally {
      setPendingLoading(false)
    }
  }

  useEffect(() => {
    if (viewMode === "approvals") {
      loadPendingEmployers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode])

  const openDetails = async (employer) => {
    try {
      setSelectedEmployer(null)
      setShowDetails(true)
      const res = await adminService.getUserById(employer._id)
      setSelectedEmployer(res?.data || { user: employer })
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to load employer details")
    }
  }

  const handleApprove = async (userId) => {
    try {
      setActionLoadingId(userId)
      await adminService.approveUser(userId, true)
      await loadPendingEmployers()
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to approve employer")
    } finally {
      setActionLoadingId("")
    }
  }

  const handleReject = async (userId) => {
    try {
      const reason = typeof window !== "undefined" ? window.prompt("Enter rejection reason", "Insufficient information") : "Insufficient information"
      setActionLoadingId(userId)
      await adminService.rejectUser(userId, reason)
      await loadPendingEmployers()
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to reject employer")
    } finally {
      setActionLoadingId("")
    }
  }

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

      {/* Mode Switch */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("employers")}
          className={`px-4 py-2.5 rounded-lg border ${viewMode === "employers" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
        >
          Employers
        </button>
        <button
          onClick={() => setViewMode("approvals")}
          className={`px-4 py-2.5 rounded-lg border ${viewMode === "approvals" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
        >
          Pending Approvals
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
      {(loading || pendingLoading) && <div>Loading...</div>}
      {viewMode === "employers" && (
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
                      <button
                        onClick={() => openDetails(employer)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleVerifyToggle(employer._id, employer.isVerified)}
                        disabled={actionLoadingId === employer._id}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={employer.isVerified ? "Mark as Unverified" : "Verify Employer"}
                      >
                        {employer.isVerified ? (
                          <X className="w-5 h-5 text-red-600" />
                        ) : (
                          <BadgeCheck className="w-5 h-5 text-green-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handlePlanChange(employer._id, employer.plan === "pro" ? "free" : "pro")}
                        disabled={actionLoadingId === employer._id}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={employer.plan === "pro" ? "Downgrade to Free" : "Upgrade to Pro"}
                      >
                        <Crown className={`w-5 h-5 ${employer.plan === "pro" ? "text-yellow-500" : "text-gray-600"}`} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="More">
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

      {viewMode === "approvals" && (
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
                {pendingEmployers.map((user) => (
                  <tr key={user._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">{user?.profile?.company?.name || "-"}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{user.firstName} {user.lastName}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{user.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{user?.profile?.contact?.phone || "-"}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium w-fit">
                        <XCircle className="w-3 h-3" /> Pending
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetails(user)}
                          className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleApprove(user._id)}
                          disabled={actionLoadingId === user._id}
                          className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(user._id)}
                          disabled={actionLoadingId === user._id}
                          className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>) )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Drawer/Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center md:justify-center z-50">
          <div className="bg-white w-full md:w-[900px] max-h-[90vh] rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Employer Details</h3>
                <p className="text-sm text-gray-600">Basic info, documents, subscription, jobs, billing</p>
              </div>
              <button onClick={() => setShowDetails(false)} className="p-2 hover:bg-gray-50 rounded-lg">✕</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Basic Info */}
              <section>
                <h4 className="text-base font-semibold text-gray-900 mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Company</div>
                    <div className="font-medium">{selectedEmployer?.profile?.company?.name || "-"}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Contact Person</div>
                    <div className="font-medium">{selectedEmployer?.user?.firstName} {selectedEmployer?.user?.lastName}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Email</div>
                    <div className="font-medium">{selectedEmployer?.user?.email}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Phone</div>
                    <div className="font-medium">{selectedEmployer?.profile?.contact?.phone || "-"}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Registration Date</div>
                    <div className="font-medium">{selectedEmployer?.user?.createdAt ? new Date(selectedEmployer.user.createdAt).toLocaleString() : "-"}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Status</div>
                    <div className="font-medium">{selectedEmployer?.user?.status || "-"}</div>
                  </div>
                </div>
              </section>

              {/* Document Verification */}
              <section>
                <h4 className="text-base font-semibold text-gray-900 mb-3">Document Verification</h4>
                <div className="space-y-3">
                  {Array.isArray(selectedEmployer?.profile?.verificationDocuments) && selectedEmployer.profile.verificationDocuments.length > 0 ? (
                    selectedEmployer.profile.verificationDocuments.map((doc) => (
                      <div key={doc._id} className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            {(doc.type || "").replace(/_/g, " ")}
                          </div>
                          <div className="text-xs text-gray-500">Status: <span className="font-medium capitalize">{doc.status || "uploaded"}</span></div>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.url && (
                            <a href={doc.url} target="_blank" rel="noreferrer" className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50">View</a>
                          )}
                          <button
                            onClick={async () => {
                              await adminService.updateEmployerDocumentStatus(selectedEmployer.user._id, doc._id, { status: "verified" })
                              const res = await adminService.getUserById(selectedEmployer.user._id)
                              setSelectedEmployer(res?.data || selectedEmployer)
                            }}
                            className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
                          >
                            <Check className="w-4 h-4" /> Verify
                          </button>
                          <button
                            onClick={async () => {
                              await adminService.updateEmployerDocumentStatus(selectedEmployer.user._id, doc._id, { status: "needs_reupload" })
                              const res = await adminService.getUserById(selectedEmployer.user._id)
                              setSelectedEmployer(res?.data || selectedEmployer)
                            }}
                            className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50 flex items-center gap-1"
                          >
                            Request re-upload
                          </button>
                          <button
                            onClick={async () => {
                              await adminService.updateEmployerDocumentStatus(selectedEmployer.user._id, doc._id, { status: "rejected" })
                              const res = await adminService.getUserById(selectedEmployer.user._id)
                              setSelectedEmployer(res?.data || selectedEmployer)
                            }}
                            className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
                          >
                            <X className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No documents uploaded.</div>
                  )}
                </div>
              </section>

              {/* Subscription Management */}
              <section>
                <h4 className="text-base font-semibold text-gray-900 mb-3">Subscription</h4>
                <div className="flex items-center justify-between border rounded-lg p-4">
                  <div>
                    <div className="text-sm text-gray-500">Current Plan</div>
                    <div className="font-medium flex items-center gap-2">
                      <Crown className="w-4 h-4 text-yellow-500" /> {selectedEmployer?.profile?.plan || "free"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePlanChange(selectedEmployer.user._id, "free")}
                      className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50"
                    >
                      Set Free
                    </button>
                    <button
                      onClick={() => handlePlanChange(selectedEmployer.user._id, "pro")}
                      className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Set Pro
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">Subscription history (UI only): Coming soon</div>
              </section>

              {/* Job Post Moderation */}
              <section>
                <h4 className="text-base font-semibold text-gray-900 mb-3">Job Posts</h4>
                <div className="space-y-3">
                  {Array.isArray(selectedEmployer?.jobs) && selectedEmployer.jobs.length > 0 ? (
                    selectedEmployer.jobs.map((job) => (
                      <div key={job._id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">{job.title}</div>
                            <div className="text-xs text-gray-500">Status: <span className="capitalize">{job.status}</span></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={async () => {
                                await adminService.changeJobStatus(job._id, "active")
                                const res = await adminService.getUserById(selectedEmployer.user._id)
                                setSelectedEmployer(res?.data || selectedEmployer)
                              }}
                              className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={async () => {
                                await adminService.changeJobStatus(job._id, "closed")
                                const res = await adminService.getUserById(selectedEmployer.user._id)
                                setSelectedEmployer(res?.data || selectedEmployer)
                              }}
                              className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                              Reject
                            </button>
                            <button className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50">Edit</button>
                          </div>
                        </div>
                        {job.description && (
                          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{job.description}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No job posts available.</div>
                  )}
                </div>
              </section>

              {/* Billing History (UI only) */}
              <section>
                <h4 className="text-base font-semibold text-gray-900 mb-3">Billing History (UI)</h4>
                <div className="text-sm text-gray-500">Invoices and payments history UI to be integrated. Sample:</div>
                <div className="mt-2 border rounded-lg">
                  <div className="grid grid-cols-4 text-xs text-gray-500 px-4 py-2 border-b">
                    <div>Invoice</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  <div className="px-4 py-3 text-sm text-gray-600">No invoices yet.</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
