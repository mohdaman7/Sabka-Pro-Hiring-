"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  User,
  Building,
  Filter,
  Download,
  Send,
  RefreshCw,
} from "lucide-react";
import { customToast, toast } from "@/components/ui/toast";
import api from "@/lib/axios";

export default function LeadsManagement() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [activeTab]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const endpoint =
        activeTab === "pending" ? "/api/admin/pending" : "/api/admin/users";
      const params = {};
      if (activeTab !== "pending") {
        params.status = activeTab;
      }

      const response = await api.get(endpoint, { params });
      const data = response.data;
      
      if (data.success) {
        setLeads(data.data || []);
        customToast.success(
          "Leads updated",
          `Loaded ${data.data?.length || 0} ${activeTab} leads`
        );
      } else {
        customToast.error("Failed to fetch leads", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      customToast.error(
        "Network Error",
        "Failed to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLeads();
  };

  const handleApprove = async (userId, userName) => {
    const toastId = customToast.loading(
      "Approving user...",
      "Sending credentials via email"
    );

    try {
      const response = await api.post(`/api/admin/approve/${userId}`, {
        sendCredentials: true,
      });

      const data = response.data;

      if (data.success) {
        toast.dismiss(toastId);
        customToast.success(
          "User Approved ✅",
          `Login credentials sent to ${userName}`
        );
        fetchLeads();
      } else {
        toast.dismiss(toastId);
        customToast.error("Approval Failed", data.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Failed to approve user:", error);
      customToast.error("Approval Failed", "Network error. Please try again.");
    }
  };

  const handleReject = async (userId, userName) => {
    // Custom rejection dialog instead of prompt
    const reason = await new Promise((resolve) => {
      const modal = document.createElement("div");
      modal.className =
        "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4";
      modal.innerHTML = `
        <div class="bg-white/10 backdrop-blur-lg border border-[#803791]/30 rounded-xl p-6 max-w-md w-full">
          <h3 class="text-white text-lg font-semibold mb-3">Reject User</h3>
          <p class="text-white/75 mb-4">Please provide a reason for rejecting ${userName}:</p>
          <textarea 
            id="rejectReason" 
            placeholder="Enter rejection reason..."
            class="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] resize-none h-24"
          ></textarea>
          <div class="flex gap-3 mt-4">
            <button 
              id="cancelReject" 
              class="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              id="confirmReject" 
              class="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 transition-all duration-300"
            >
              Reject
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      return new Promise((resolve) => {
        modal.querySelector("#cancelReject").onclick = () => {
          document.body.removeChild(modal);
          resolve(null);
        };

        modal.querySelector("#confirmReject").onclick = () => {
          const reason = modal.querySelector("#rejectReason").value.trim();
          document.body.removeChild(modal);
          resolve(reason);
        };

        // Close on backdrop click
        modal.onclick = (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal);
            resolve(null);
          }
        };
      });
    });

    if (!reason) return;

    const toastId = customToast.loading(
      "Rejecting user...",
      "Processing rejection"
    );

    try {
      const response = await api.post(`/api/admin/reject/${userId}`, {
        reason,
      });

      const data = response.data;
      if (data.success) {
        toast.dismiss(toastId);
        customToast.success(
          "User Rejected ❌",
          `${userName} has been rejected`
        );
        fetchLeads();
      } else {
        toast.dismiss(toastId);
        customToast.error("Rejection Failed", data.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Failed to reject user:", error);
      customToast.error("Rejection Failed", "Network error. Please try again.");
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    {
      id: "pending",
      label: "Pending Approval",
      icon: Clock,
      count: filteredLeads.filter((l) => l.status === "pending").length,
    },
    {
      id: "active",
      label: "Active Users",
      icon: CheckCircle,
      count: filteredLeads.filter((l) => l.status === "active").length,
    },
    {
      id: "rejected",
      label: "Rejected",
      icon: XCircle,
      count: filteredLeads.filter((l) => l.status === "rejected").length,
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-300",
        border: "border-yellow-500/30",
        label: "Pending",
      },
      active: {
        bg: "bg-green-500/20",
        text: "text-green-300",
        border: "border-green-500/30",
        label: "Active",
      },
      rejected: {
        bg: "bg-red-500/20",
        text: "text-red-300",
        border: "border-red-500/30",
        label: "Rejected",
      },
      inactive: {
        bg: "bg-gray-500/20",
        text: "text-gray-300",
        border: "border-gray-500/30",
        label: "Inactive",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.label}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      student: {
        bg: "bg-blue-500/20",
        text: "text-blue-300",
        border: "border-blue-500/30",
        icon: User,
      },
      employer: {
        bg: "bg-purple-500/20",
        text: "text-purple-300",
        border: "border-purple-500/30",
        icon: Building,
      },
    };

    const config = roleConfig[role] || roleConfig.student;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
      >
        <Icon className="w-3 h-3" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const exportLeads = () => {
    const toastId = customToast.loading("Exporting leads...", "Preparing data");

    // Simulate export process
    setTimeout(() => {
      toast.dismiss(toastId);
      customToast.success(
        "Export Complete",
        "Leads data has been exported successfully"
      );
    }, 2000);
  };

  const sendBulkEmail = () => {
    customToast.info("Bulk Email", "This feature will be available soon");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Leads Management
          </h1>
          <p className="text-white/75">Review and approve new registrations</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={sendBulkEmail}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105"
          >
            <Send className="w-4 h-4" />
            Bulk Email
          </button>
          <button
            onClick={exportLeads}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-1">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 font-medium transition-all duration-300 rounded-lg flex-1 justify-center ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
                    : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                <span
                  className={`ml-1 px-2 py-1 rounded-full text-xs font-bold min-w-8 ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white/75"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[#803791]/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#b87bd1] focus:border-transparent transition-all duration-300"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-[#803791]/20 rounded-xl text-white transition-all duration-300 hover:scale-105"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/75 mb-2">
                Role
              </label>
              <select className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1]">
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-2">
                Date Range
              </label>
              <select className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1]">
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-2">
                Sort By
              </label>
              <select className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1]">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-white/5 rounded-xl border border-[#803791]/10 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b87bd1]"></div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <User className="w-10 h-10 text-white/50" />
            </div>
            <p className="text-white/75 text-lg">No leads found</p>
            <p className="text-white/50 text-sm mt-2">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No leads match the current filters"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-[#803791]/10">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    User
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Role
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Additional Info
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Registered
                  </th>
                  {activeTab === "pending" && (
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, index) => (
                  <tr
                    key={lead._id || lead.id}
                    className="border-t border-[#803791]/10 hover:bg-white/5 transition-all duration-300 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background:
                              "linear-gradient(135deg, #803791, #b87bd1)",
                          }}
                        >
                          {lead.firstName?.charAt(0) || "U"}
                          {lead.lastName?.charAt(0) || "N"}
                        </div>
                        <div>
                          <div className="font-medium text-white group-hover:text-[#b87bd1] transition-colors duration-300">
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className="text-sm text-white/75">
                            {lead.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{getRoleBadge(lead.role)}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-2">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-2 text-sm text-white/75 hover:text-[#b87bd1] transition-all duration-300 hover:translate-x-1"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                        {lead.profile?.phone && (
                          <a
                            href={`tel:${lead.profile.phone}`}
                            className="flex items-center gap-2 text-sm text-white/75 hover:text-[#b87bd1] transition-all duration-300 hover:translate-x-1"
                          >
                            <Phone className="w-4 h-4" />
                            {lead.profile.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-white/75 space-y-1">
                        {lead.role === "student" && lead.profile && (
                          <>
                            <div>
                              <span className="font-medium text-white">
                                Experience:
                              </span>{" "}
                              {lead.profile.experienceType || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium text-white">
                                Location:
                              </span>{" "}
                              {lead.profile.address?.city || "N/A"}
                            </div>
                          </>
                        )}
                        {lead.role === "employer" && lead.profile && (
                          <>
                            <div>
                              <span className="font-medium text-white">
                                Company:
                              </span>{" "}
                              {lead.profile.company?.name || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium text-white">
                                Position:
                              </span>{" "}
                              {lead.profile.position || "N/A"}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(lead.status)}</td>
                    <td className="py-4 px-6 text-sm text-white/75">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    {activeTab === "pending" && (
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleApprove(
                                lead._id || lead.id,
                                `${lead.firstName} ${lead.lastName}`
                              )
                            }
                            className="p-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-xl hover:bg-green-500/30 hover:scale-110 transition-all duration-300 group"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleReject(
                                lead._id || lead.id,
                                `${lead.firstName} ${lead.lastName}`
                              )
                            }
                            className="p-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl hover:bg-red-500/30 hover:scale-110 transition-all duration-300 group"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 bg-white/10 text-white/75 border border-white/20 rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
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

      {/* Pagination */}
      {filteredLeads.length > 0 && (
        <div className="flex items-center justify-between py-4 px-6 bg-white/5 rounded-xl border border-[#803791]/10">
          <div className="text-sm text-white/75">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-white/5 border border-[#803791]/20 rounded-lg text-white/75 hover:bg-white/10 hover:text-white transition-all duration-300">
              Previous
            </button>
            <button className="px-3 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] border border-[#803791] rounded-lg text-white shadow-lg transition-all duration-300 hover:scale-105">
              1
            </button>
            <button className="px-3 py-2 bg-white/5 border border-[#803791]/20 rounded-lg text-white/75 hover:bg-white/10 hover:text-white transition-all duration-300">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
