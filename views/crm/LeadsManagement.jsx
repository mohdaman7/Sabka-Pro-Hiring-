"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  User,
  Building,
} from "lucide-react";

export default function LeadsManagement() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetchLeads();
  }, [activeTab]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        activeTab === "pending" ? "/api/admin/pending" : "/api/admin/users";
      const params = new URLSearchParams();
      if (activeTab !== "pending") {
        params.append("status", activeTab);
      }

      const response = await fetch(`${API_URL}${endpoint}?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setLeads(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    if (
      !confirm(
        "Are you sure you want to approve this user? They will receive login credentials via email."
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/approve/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sendCredentials: true }),
      });

      const data = await response.json();
      if (data.success) {
        alert(
          "User approved successfully! Login credentials have been sent via email."
        );
        fetchLeads();
      } else {
        alert(data.message || "Failed to approve user");
      }
    } catch (error) {
      console.error("Failed to approve user:", error);
      alert("Failed to approve user");
    }
  };

  const handleReject = async (userId) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (!reason) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/reject/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      });

      const data = await response.json();
      if (data.success) {
        alert("User rejected successfully");
        fetchLeads();
      } else {
        alert(data.message || "Failed to reject user");
      }
    } catch (error) {
      console.error("Failed to reject user:", error);
      alert("Failed to reject user");
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: "pending", label: "Pending Approval", icon: Clock, color: "yellow" },
    { id: "active", label: "Active Users", icon: CheckCircle, color: "green" },
    { id: "rejected", label: "Rejected", icon: XCircle, color: "red" },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Pending",
      },
      active: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
      rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
      inactive: { bg: "bg-gray-100", text: "text-gray-700", label: "Inactive" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      student: { bg: "bg-blue-100", text: "text-blue-700", icon: User },
      employer: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        icon: Building,
      },
    };

    const config = roleConfig[role] || roleConfig.student;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="w-3 h-3" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Leads Management
          </h1>
          <p className="text-slate-600">Review and approve new registrations</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 bg-white rounded-t-xl px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const count = filteredLeads.filter((l) =>
            tab.id === "pending" ? l.status === "pending" : l.status === tab.id
          ).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition-all relative flex items-center gap-2 ${
                activeTab === tab.id
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === tab.id
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No leads found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    User
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Role
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Additional Info
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Registered
                  </th>
                  {activeTab === "pending" && (
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id || lead.id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {lead.firstName?.charAt(0) || "U"}
                          {lead.lastName?.charAt(0) || "N"}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className="text-sm text-slate-500">
                            {lead.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{getRoleBadge(lead.role)}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                        {lead.profile?.phone && (
                          <a
                            href={`tel:${lead.profile.phone}`}
                            className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {lead.profile.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-600 space-y-1">
                        {lead.role === "student" && lead.profile && (
                          <>
                            <div>
                              <span className="font-medium">Experience:</span>{" "}
                              {lead.profile.experienceType || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Location:</span>{" "}
                              {lead.profile.address?.city || "N/A"}
                            </div>
                          </>
                        )}
                        {lead.role === "employer" && lead.profile && (
                          <>
                            <div>
                              <span className="font-medium">Company:</span>{" "}
                              {lead.profile.company?.name || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Position:</span>{" "}
                              {lead.profile.position || "N/A"}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(lead.status)}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    {activeTab === "pending" && (
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(lead._id || lead.id)}
                            className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(lead._id || lead.id)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
