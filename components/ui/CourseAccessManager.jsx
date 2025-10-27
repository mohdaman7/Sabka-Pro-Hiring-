"use client";

import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  Lock,
  Calendar,
  Mail,
  BookOpen,
  Shield,
  Search,
  ChevronRight,
} from "lucide-react";
import courseService from "@/services/courseService";

export default function CourseAccessManager({ onClose }) {
  const [accesses, setAccesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showGrantForm, setShowGrantForm] = useState(false);
  const [grantData, setGrantData] = useState({
    userId: "",
    courseId: "",
    accessType: "admin_grant",
    notes: "",
  });
  const [grantError, setGrantError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    loadAccesses();
  }, []);

  const loadAccesses = async () => {
    setLoading(true);
    try {
      const data = await courseService.adminListAccess();
      setAccesses(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGrant = async (e) => {
    e.preventDefault();
    setGrantError("");
    const isObjectId = (v) => /^[a-fA-F0-9]{24}$/.test(v || "");
    if (!isObjectId(grantData.userId) || !isObjectId(grantData.courseId)) {
      setGrantError("Please enter valid 24-char IDs for user and course");
      return;
    }
    try {
      await courseService.adminGrantAccess(grantData);
      setShowGrantForm(false);
      setGrantData({
        userId: "",
        courseId: "",
        accessType: "admin_grant",
        notes: "",
      });
      loadAccesses();
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  const handleRevoke = async (id) => {
    if (!confirm("Are you sure you want to revoke this access?")) return;
    try {
      await courseService.adminRevokeAccess(id);
      loadAccesses();
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  const getSearchSuggestions = () => {
    if (!searchTerm.trim()) return [];

    const suggestions = new Set();
    accesses.forEach((access) => {
      const studentName =
        `${access.userId?.firstName} ${access.userId?.lastName}`.toLowerCase();
      const email = access.userId?.email?.toLowerCase();
      const courseName = access.courseId?.title?.toLowerCase();

      if (studentName.includes(searchTerm.toLowerCase())) {
        suggestions.add({
          type: "student",
          value: `${access.userId?.firstName} ${access.userId?.lastName}`,
          icon: "👤",
        });
      }
      if (email?.includes(searchTerm.toLowerCase())) {
        suggestions.add({
          type: "email",
          value: email,
          icon: "✉️",
        });
      }
      if (courseName?.includes(searchTerm.toLowerCase())) {
        suggestions.add({
          type: "course",
          value: access.courseId?.title,
          icon: "📚",
        });
      }
    });

    return Array.from(suggestions).slice(0, 5);
  };

  const filteredAccesses = accesses.filter(
    (access) =>
      access.userId?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      access.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      access.courseId?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAccessTypeColor = (type) => {
    const colors = {
      admin_grant: "bg-blue-50 text-blue-700 border border-blue-200",
      sub_course: "bg-purple-50 text-purple-700 border border-purple-200",
      full_course: "bg-green-50 text-green-700 border border-green-200",
      gift: "bg-amber-50 text-amber-700 border border-amber-200",
    };
    return colors[type] || colors.admin_grant;
  };

  const getCourseTypeColor = (type) => {
    return type === "parent"
      ? "bg-blue-50 text-blue-700 border border-blue-200"
      : "bg-indigo-50 text-indigo-700 border border-indigo-200";
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Course Access Manager
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Manage student access to courses and modules
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Action Bar */}
          <div className="mb-6 flex justify-between items-center gap-4">
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by student name, email, or course..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  className="w-full px-4 py-3 pl-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-800 text-white placeholder-slate-500 transition-all"
                />
              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && getSearchSuggestions().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10">
                  {getSearchSuggestions().map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchTerm(suggestion.value);
                        setShowSuggestions(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center justify-between group border-b border-slate-700 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{suggestion.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {suggestion.value}
                          </p>
                          <p className="text-xs text-slate-400 capitalize">
                            {suggestion.type}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowGrantForm(!showGrantForm)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Grant Access
            </button>
          </div>

          {/* Grant Form */}
          {showGrantForm && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 mb-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-400" />
                Grant New Access
              </h3>

              {grantError && (
                <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-red-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-300 font-bold text-sm">!</span>
                  </div>
                  <span className="text-sm font-medium">{grantError}</span>
                </div>
              )}

              <form onSubmit={handleGrant} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* User ID */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      User ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter 24-character user ID"
                      required
                      value={grantData.userId}
                      onChange={(e) =>
                        setGrantData({ ...grantData, userId: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-800 text-white placeholder-slate-500 transition-all"
                    />
                  </div>

                  {/* Course ID */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Course ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter 24-character course ID"
                      required
                      value={grantData.courseId}
                      onChange={(e) =>
                        setGrantData({ ...grantData, courseId: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-800 text-white placeholder-slate-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Access Type */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Access Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={grantData.accessType}
                      onChange={(e) =>
                        setGrantData({
                          ...grantData,
                          accessType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-800 text-white transition-all"
                    >
                      <option value="admin_grant">Admin Grant</option>
                      <option value="sub_course">Sub Course</option>
                      <option value="full_course">Full Course</option>
                      <option value="gift">Gift</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Notes <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Add any notes about this access"
                      value={grantData.notes}
                      onChange={(e) =>
                        setGrantData({ ...grantData, notes: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-800 text-white placeholder-slate-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Grant Access
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGrantForm(false)}
                    className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Access Table */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Access Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Granted Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                          <span className="text-slate-400 font-medium ml-2">
                            Loading access records...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredAccesses.length > 0 ? (
                    filteredAccesses.map((access) => (
                      <tr
                        key={access._id}
                        className="hover:bg-slate-700 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                              {access.userId?.firstName?.[0]}
                              {access.userId?.lastName?.[0]}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {access.userId?.firstName}{" "}
                                {access.userId?.lastName}
                              </p>
                              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                <Mail className="w-3 h-3" />
                                {access.userId?.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-white flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-blue-400" />
                              {access.courseId?.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {access.courseId?._id}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getCourseTypeColor(
                              access.courseId?.type
                            )}`}
                          >
                            {access.courseId?.type === "parent"
                              ? "Parent Course"
                              : "Sub Course"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getAccessTypeColor(
                              access.accessType
                            )}`}
                          >
                            {access.accessType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            {new Date(access.grantedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleRevoke(access._id)}
                            className="p-2.5 text-red-400 hover:bg-red-900/30 rounded-lg transition-all duration-200 hover:scale-110"
                            title="Revoke access"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Lock className="w-12 h-12 text-slate-600" />
                          <p className="text-slate-300 font-medium">
                            No access records found
                          </p>
                          <p className="text-sm text-slate-500">
                            Grant access to students to see them here
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
