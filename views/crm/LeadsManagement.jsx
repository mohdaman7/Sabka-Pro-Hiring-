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
  Plus,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Star,
  MessageSquare,
  UserPlus,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Target,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import { customToast, toast } from "@/components/ui/toast";
import { useLeadViewModel } from "@/viewmodels/LeadViewModel";

export default function LeadsManagement() {
  const {
    leads,
    loading,
    error,
    pagination,
    fetchLeads,
    updateLeadStatus,
    assignLead,
    unassignLead,
    addFollowUp,
    convertLead,
    deleteLead,
    fetchLeadStats,
  } = useLeadViewModel();

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    source: "",
    assignedTo: "",
    priority: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    fetchLeadsData();
    fetchStats();
  }, [activeTab, filters]);

  const fetchLeadsData = async () => {
    const queryFilters = { ...filters };
    if (activeTab !== "all") {
      queryFilters.status = activeTab;
    }
    await fetchLeads(queryFilters);
  };

  const fetchStats = async () => {
    try {
      const result = await fetchLeadStats();
      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLeadsData();
    fetchStats();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    const result = await updateLeadStatus(leadId, newStatus);
    if (result.success) {
      customToast.success(
        "Status Updated",
        `Lead status changed to ${newStatus}`
      );
      fetchLeadsData();
    } else {
      customToast.error("Update Failed", result.error);
    }
  };

  const handleAssignLead = async (leadId, assignedTo) => {
    const result = await assignLead(leadId, assignedTo);
    if (result.success) {
      customToast.success(
        "Lead Assigned",
        "Lead has been assigned successfully"
      );
      fetchLeadsData();
    } else {
      customToast.error("Assignment Failed", result.error);
    }
  };

  const handleUnassignLead = async (leadId) => {
    const result = await unassignLead(leadId);
    if (result.success) {
      customToast.success("Lead Unassigned", "Lead has been unassigned");
      fetchLeadsData();
    } else {
      customToast.error("Unassignment Failed", result.error);
    }
  };

  const handleConvertLead = async (leadId, convertedTo = "student") => {
    const result = await convertLead(leadId, convertedTo);
    if (result.success) {
      customToast.success("Lead Converted", `Lead converted to ${convertedTo}`);
      fetchLeadsData();
    } else {
      customToast.error("Conversion Failed", result.error);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      const result = await deleteLead(leadId);
      if (result.success) {
        customToast.success(
          "Lead Deleted",
          "Lead has been deleted successfully"
        );
        fetchLeadsData();
      } else {
        customToast.error("Deletion Failed", result.error);
      }
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedLeads.length === 0) {
      customToast.warning(
        "No Selection",
        "Please select leads to perform bulk action"
      );
      return;
    }

    const toastId = customToast.loading(
      `Processing ${selectedLeads.length} leads...`
    );

    try {
      // Implement bulk actions based on the action type
      switch (action) {
        case "assign":
          // Bulk assign logic
          break;
        case "email":
          // Bulk email logic
          break;
        case "delete":
          // Bulk delete logic
          break;
        default:
          break;
      }

      toast.dismiss(toastId);
      customToast.success(
        "Bulk Action Completed",
        `${action} applied to ${selectedLeads.length} leads`
      );
      setSelectedLeads([]);
      fetchLeadsData();
    } catch (error) {
      toast.dismiss(toastId);
      customToast.error("Bulk Action Failed", "Failed to process bulk action");
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      lead.firstName?.toLowerCase().includes(searchLower) ||
      lead.lastName?.toLowerCase().includes(searchLower) ||
      lead.email?.toLowerCase().includes(searchLower) ||
      lead.phone?.toLowerCase().includes(searchLower)
    );
  });

  const tabs = [
    {
      id: "all",
      label: "All Leads",
      icon: Users,
      count: leads.length,
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    {
      id: "new",
      label: "New",
      icon: Clock,
      count: leads.filter((l) => l.status === "new").length,
      color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    },
    {
      id: "contacted",
      label: "Contacted",
      icon: Phone,
      count: leads.filter((l) => l.status === "contacted").length,
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    {
      id: "follow_up",
      label: "Follow-up",
      icon: MessageSquare,
      count: leads.filter((l) => l.status === "follow_up").length,
      color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    },
    {
      id: "qualified",
      label: "Qualified",
      icon: Target,
      count: leads.filter((l) => l.status === "qualified").length,
      color: "bg-green-500/20 text-green-300 border-green-500/30",
    },
    {
      id: "converted",
      label: "Converted",
      icon: CheckCircle,
      count: leads.filter((l) => l.status === "converted").length,
      color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      id: "lost",
      label: "Lost",
      icon: XCircle,
      count: leads.filter((l) => l.status === "lost").length,
      color: "bg-red-500/20 text-red-300 border-red-500/30",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-300",
        border: "border-yellow-500/30",
        label: "New",
      },
      contacted: {
        bg: "bg-blue-500/20",
        text: "text-blue-300",
        border: "border-blue-500/30",
        label: "Contacted",
      },
      follow_up: {
        bg: "bg-orange-500/20",
        text: "text-orange-300",
        border: "border-orange-500/30",
        label: "Follow-up",
      },
      qualified: {
        bg: "bg-green-500/20",
        text: "text-green-300",
        border: "border-green-500/30",
        label: "Qualified",
      },
      converted: {
        bg: "bg-emerald-500/20",
        text: "text-emerald-300",
        border: "border-emerald-500/30",
        label: "Converted",
      },
      lost: {
        bg: "bg-red-500/20",
        text: "text-red-300",
        border: "border-red-500/30",
        label: "Lost",
      },
      unqualified: {
        bg: "bg-gray-500/20",
        text: "text-gray-300",
        border: "border-gray-500/30",
        label: "Unqualified",
      },
    };

    const config = statusConfig[status] || statusConfig.new;
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: {
        bg: "bg-gray-500/20",
        text: "text-gray-300",
        border: "border-gray-500/30",
        label: "Low",
      },
      medium: {
        bg: "bg-blue-500/20",
        text: "text-blue-300",
        border: "border-blue-500/30",
        label: "Medium",
      },
      high: {
        bg: "bg-orange-500/20",
        text: "text-orange-300",
        border: "border-orange-500/30",
        label: "High",
      },
      urgent: {
        bg: "bg-red-500/20",
        text: "text-red-300",
        border: "border-red-500/30",
        label: "Urgent",
      },
    };

    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.label}
      </span>
    );
  };

  const getSourceBadge = (source) => {
    const sourceConfig = {
      website: {
        label: "Website",
        color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      },
      social_media: {
        label: "Social Media",
        color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      },
      google_ads: {
        label: "Google Ads",
        color: "bg-green-500/20 text-green-300 border-green-500/30",
      },
      facebook_ads: {
        label: "Facebook Ads",
        color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      },
      referral: {
        label: "Referral",
        color: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      },
      walk_in: {
        label: "Walk-in",
        color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      },
      phone_call: {
        label: "Phone Call",
        color: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      },
      email_campaign: {
        label: "Email Campaign",
        color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      },
      event: {
        label: "Event",
        color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      },
      partnership: {
        label: "Partnership",
        color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      },
      other: {
        label: "Other",
        color: "bg-gray-500/20 text-gray-300 border-gray-500/30",
      },
    };

    const config = sourceConfig[source] || sourceConfig.other;
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const exportLeads = () => {
    const toastId = customToast.loading("Exporting leads...", "Preparing data");
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

  // Modal Components
  const CreateLeadModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-[#803791]/30 rounded-xl p-6 max-w-md w-full">
        <h3 className="text-white text-lg font-semibold mb-4">
          Create New Lead
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
          />
          <select className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white">
            <option value="">Select Source</option>
            <option value="website">Website</option>
            <option value="social_media">Social Media</option>
            <option value="referral">Referral</option>
          </select>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowCreateModal(false)}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              customToast.success(
                "Lead Created",
                "New lead has been added successfully"
              );
              setShowCreateModal(false);
            }}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-lg text-white transition-all duration-300"
          >
            Create Lead
          </button>
        </div>
      </div>
    </div>
  );

  const AssignLeadModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-[#803791]/30 rounded-xl p-6 max-w-md w-full">
        <h3 className="text-white text-lg font-semibold mb-4">Assign Lead</h3>
        <p className="text-white/75 mb-4">Assign lead to staff member:</p>
        <select className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white mb-4">
          <option value="">Select Staff Member</option>
          <option value="staff1">John Doe</option>
          <option value="staff2">Jane Smith</option>
          <option value="staff3">Mike Johnson</option>
        </select>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAssignModal(false)}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              customToast.success(
                "Lead Assigned",
                "Lead has been assigned successfully"
              );
              setShowAssignModal(false);
            }}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-lg text-white transition-all duration-300"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );

  const FollowUpModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-[#803791]/30 rounded-xl p-6 max-w-md w-full">
        <h3 className="text-white text-lg font-semibold mb-4">
          Schedule Follow-up
        </h3>
        <div className="space-y-4">
          <input
            type="datetime-local"
            className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white"
          />
          <textarea
            placeholder="Follow-up notes..."
            className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white placeholder-white/50 h-24 resize-none"
          />
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowFollowUpModal(false)}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              customToast.success(
                "Follow-up Scheduled",
                "Follow-up has been scheduled successfully"
              );
              setShowFollowUpModal(false);
            }}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-lg text-white transition-all duration-300"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Leads Management
          </h1>
          <p className="text-white/75">
            Manage leads from multiple sources and track conversions
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:from-[#9a4ba8] hover:to-[#c88dd8] border border-[#803791] rounded-xl text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
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

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/75 text-sm">Total Leads</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalLeads}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/75 text-sm">Converted</p>
                <p className="text-2xl font-bold text-white">
                  {stats.convertedLeads}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/75 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">
                  {stats.conversionRate}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/75 text-sm">New This Week</p>
                <p className="text-2xl font-bold text-white">
                  {
                    leads.filter((l) => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(l.createdAt) > weekAgo;
                    }).length
                  }
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-1">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 font-medium transition-all duration-300 rounded-lg flex-1 justify-center whitespace-nowrap ${
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

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-4">
          <div className="flex items-center justify-between">
            <div className="text-white/75">
              {selectedLeads.length} lead(s) selected
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("assign")}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 transition-all duration-300"
              >
                <UserPlus className="w-4 h-4" />
                Assign
              </button>
              <button
                onClick={() => handleBulkAction("email")}
                className="flex items-center gap-2 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Send Email
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/75 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1]"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="follow_up">Follow-up</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-2">
                Source
              </label>
              <select
                value={filters.source}
                onChange={(e) =>
                  setFilters({ ...filters, source: e.target.value })
                }
                className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1]"
              >
                <option value="">All Sources</option>
                <option value="website">Website</option>
                <option value="social_media">Social Media</option>
                <option value="google_ads">Google Ads</option>
                <option value="facebook_ads">Facebook Ads</option>
                <option value="referral">Referral</option>
                <option value="walk_in">Walk-in</option>
                <option value="phone_call">Phone Call</option>
                <option value="email_campaign">Email Campaign</option>
                <option value="event">Event</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-2">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) =>
                  setFilters({ ...filters, priority: e.target.value })
                }
                className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1]"
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-2">
                Date From
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters({ ...filters, dateFrom: e.target.value })
                }
                className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/75 mb-2">
                Date To
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters({ ...filters, dateTo: e.target.value })
                }
                className="w-full bg-white/5 border border-[#803791]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#b87bd1]"
              />
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
                    <input
                      type="checkbox"
                      className="rounded border-white/20 bg-white/5 text-[#b87bd1] focus:ring-[#b87bd1]"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeads(
                            filteredLeads.map((lead) => lead.id)
                          );
                        } else {
                          setSelectedLeads([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Lead
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Source
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Priority
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Assigned To
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Score
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Created
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/90">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-[#803791]/10 hover:bg-white/5 transition-all duration-300 group"
                  >
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        className="rounded border-white/20 bg-white/5 text-[#b87bd1] focus:ring-[#b87bd1]"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLeads([...selectedLeads, lead.id]);
                          } else {
                            setSelectedLeads(
                              selectedLeads.filter((id) => id !== lead.id)
                            );
                          }
                        }}
                      />
                    </td>
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
                          {lead.phone && (
                            <div className="text-sm text-white/60">
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{getSourceBadge(lead.source)}</td>
                    <td className="py-4 px-6">{getStatusBadge(lead.status)}</td>
                    <td className="py-4 px-6">
                      {getPriorityBadge(lead.priority)}
                    </td>
                    <td className="py-4 px-6">
                      {lead.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-white/60" />
                          <span className="text-sm text-white/75">
                            {lead.assignedTo.firstName}{" "}
                            {lead.assignedTo.lastName}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-white/50">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#803791] to-[#b87bd1] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${lead.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white/75">
                          {lead.score}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-white/75">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 bg-white/10 text-white/75 border border-white/20 rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowAssignModal(true)}
                          className="p-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 hover:scale-110 transition-all duration-300 group"
                          title="Assign Lead"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowFollowUpModal(true)}
                          className="p-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-xl hover:bg-green-500/30 hover:scale-110 transition-all duration-300 group"
                          title="Add Follow-up"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <div className="relative group">
                          <button className="p-2 bg-white/10 text-white/75 border border-white/20 rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-300">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                            <div className="py-2">
                              <button
                                onClick={() =>
                                  handleStatusChange(lead.id, "contacted")
                                }
                                className="w-full px-4 py-2 text-left text-sm text-white/75 hover:bg-white/10 transition-colors duration-200"
                              >
                                Mark as Contacted
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(lead.id, "qualified")
                                }
                                className="w-full px-4 py-2 text-left text-sm text-white/75 hover:bg-white/10 transition-colors duration-200"
                              >
                                Mark as Qualified
                              </button>
                              <button
                                onClick={() => handleConvertLead(lead.id)}
                                className="w-full px-4 py-2 text-left text-sm text-white/75 hover:bg-white/10 transition-colors duration-200"
                              >
                                Convert Lead
                              </button>
                              <hr className="my-1 border-white/10" />
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="w-full px-4 py-2 text-left text-sm text-red-300 hover:bg-red-500/20 transition-colors duration-200"
                              >
                                Delete Lead
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
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
            <button
              disabled={!pagination?.hasPrev}
              className="px-3 py-2 bg-white/5 border border-[#803791]/20 rounded-lg text-white/75 hover:bg-white/10 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button className="px-3 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] border border-[#803791] rounded-lg text-white shadow-lg transition-all duration-300 hover:scale-105">
              {pagination?.currentPage || 1}
            </button>
            <button
              disabled={!pagination?.hasNext}
              className="px-3 py-2 bg-white/5 border border-[#803791]/20 rounded-lg text-white/75 hover:bg-white/10 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <CreateLeadModal />}
      {showAssignModal && <AssignLeadModal />}
      {showFollowUpModal && <FollowUpModal />}
    </div>
  );
}
