"use client"

import { useState, useEffect } from "react"
import { X, Plus, Trash2, Search } from "lucide-react"
import courseService from "@/services/courseService"

export default function CourseAccessManager({ onClose }) {
  const [accesses, setAccesses] = useState([])
  const [loading, setLoading] = useState(false)
  const [showGrantForm, setShowGrantForm] = useState(false)
  const [grantData, setGrantData] = useState({
    userId: "",
    courseId: "",
    accessType: "admin_grant",
    notes: "",
  })
  const [grantError, setGrantError] = useState("")

  useEffect(() => {
    loadAccesses()
  }, [])

  const loadAccesses = async () => {
    setLoading(true)
    try {
      const data = await courseService.adminListAccess()
      setAccesses(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleGrant = async (e) => {
    e.preventDefault()
    setGrantError("")
    // Validate ObjectId-like format to avoid backend 400
    const isObjectId = (v) => /^[a-fA-F0-9]{24}$/.test(v || "")
    if (!isObjectId(grantData.userId) || !isObjectId(grantData.courseId)) {
      setGrantError("Please enter valid 24-char IDs for user and course")
      return
    }
    try {
      await courseService.adminGrantAccess(grantData)
      setShowGrantForm(false)
      setGrantData({ userId: "", courseId: "", accessType: "admin_grant", notes: "" })
      loadAccesses()
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    }
  }

  const handleRevoke = async (id) => {
    if (!confirm("Are you sure you want to revoke this access?")) return
    try {
      await courseService.adminRevokeAccess(id)
      loadAccesses()
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Course Access Manager</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-slate-600">Manage student access to courses and modules</p>
            <button
              onClick={() => setShowGrantForm(!showGrantForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Grant Access
            </button>
          </div>

          {showGrantForm && (
            <form onSubmit={handleGrant} className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 space-y-3">
              {grantError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">{grantError}</div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="User ID"
                  required
                  value={grantData.userId}
                  onChange={(e) => setGrantData({ ...grantData, userId: e.target.value })}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Course ID"
                  required
                  value={grantData.courseId}
                  onChange={(e) => setGrantData({ ...grantData, courseId: e.target.value })}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={grantData.accessType}
                  onChange={(e) => setGrantData({ ...grantData, accessType: e.target.value })}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin_grant">Admin Grant</option>
                  <option value="sub_course">Sub Course</option>
                  <option value="full_course">Full Course</option>
                  <option value="gift">Gift</option>
                </select>
                <input
                  type="text"
                  placeholder="Notes (optional)"
                  value={grantData.notes}
                  onChange={(e) => setGrantData({ ...grantData, notes: e.target.value })}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Grant Access
              </button>
            </form>
          )}

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase">Access Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase">Granted</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-slate-600">
                      Loading...
                    </td>
                  </tr>
                ) : accesses.length > 0 ? (
                  accesses.map((access) => (
                    <tr key={access._id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {access.userId?.firstName} {access.userId?.lastName}
                        <br />
                        <span className="text-xs text-slate-500">{access.userId?.email}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {access.courseId?.title}
                        <br />
                        <span className="text-xs text-slate-500">{access.courseId?._id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            access.courseId?.type === "parent"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {access.courseId?.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">
                          {access.accessType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {new Date(access.grantedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleRevoke(access._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-slate-600">
                      No access records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
