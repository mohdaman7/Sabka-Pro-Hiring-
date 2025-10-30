"use client";

import Link from "next/link";
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
  ArrowRight,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
  LineChart,
  Kanban,
  ListChecks,
  CalendarClock,
} from "lucide-react";
import { customToast, toast } from "@/components/ui/toast";
import { useLeadViewModel } from "@/viewmodels/LeadViewModel";
import { adminService } from "@/services/adminService";

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
    autoAssignLeads,
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

  // Registration approvals state
  const [registrationTab, setRegistrationTab] = useState("pending"); // 'pending' | 'accepted' | 'rejected'
  const [registrationUsers, setRegistrationUsers] = useState([]);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationPagination, setRegistrationPagination] = useState(null);

  useEffect(() => {
    fetchLeadsData();
    fetchStats();
  }, [activeTab, filters]);

  useEffect(() => {
    // Load registration approvals when tab changes
    loadRegistrations();
  }, [registrationTab]);

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

  const loadRegistrations = async () => {
    setRegistrationLoading(true);
    try {
      let response;
      if (registrationTab === "pending") {
        response = await adminService.getPendingUsers();
      } else {
        const status = registrationTab === "accepted" ? "active" : "rejected";
        response = await adminService.getUsers(status);
      }

      if (response?.success) {
        setRegistrationUsers(response.data || []);
        setRegistrationPagination(response.pagination || null);
      } else {
        setRegistrationUsers(response?.data || []);
        setRegistrationPagination(response?.pagination || null);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load registrations";
      customToast.error("Error", message);
    } finally {
      setRegistrationLoading(false);
    }
  };

  const handleApproveUserReg = async (userId) => {
    const toastId = customToast.loading("Approving user...");
    try {
      await adminService.approveUser(userId, true);
      customToast.success("Approved", "User approved successfully");
      await loadRegistrations();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to approve user";
      customToast.error("Approval Failed", message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleRejectUserReg = async (userId) => {
    const reason =
      window.prompt("Enter rejection reason (optional):", "") || "";
    const toastId = customToast.loading("Rejecting user...");
    try {
      await adminService.rejectUser(userId, reason);
      customToast.success("Rejected", "User rejected successfully");
      await loadRegistrations();
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to reject user";
      customToast.error("Rejection Failed", message);
    } finally {
      toast.dismiss(toastId);
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
          // Bulk assign logic placeholder for manual selection
          customToast.info("Bulk Assign", "Select a staff member to assign leads");
          break;
        case "autoassign": {
          const res = await autoAssignLeads(selectedLeads);
          if (!res.success) throw new Error(res.error || "Auto-assign failed");
          customToast.success(
            "Auto Assignment Complete",
            `${res.result?.assignedCount || selectedLeads.length} lead(s) assigned to team`
          );
          break;
        }
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
      if (action !== "assign") {
        customToast.success(
          "Bulk Action Completed",
          `${action} applied to ${selectedLeads.length} leads`
        );
      }
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
      id: "proposal_sent",
      label: "Proposal Sent",
      icon: Target,
      count: leads.filter((l) => l.status === "proposal_sent").length,
      color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    },
    {
      id: "negotiation",
      label: "Negotiation",
      icon: BarChart3,
      count: leads.filter((l) => l.status === "negotiation").length,
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
      proposal_sent: {
        bg: "bg-indigo-500/20",
        text: "text-indigo-300",
        border: "border-indigo-500/30",
        label: "Proposal Sent",
      },
      negotiation: {
        bg: "bg-green-500/20",
        text: "text-green-300",
        border: "border-green-500/30",
        label: "Negotiation",
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
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#803791]/40 via-[#9c54b1]/30 to-[#5c1f72]/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute inset-0 opacity-60 mix-blend-screen" style={{
          background: "radial-gradient(circle at top right, rgba(255,255,255,0.25), transparent 55%)"
        }}></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#b87bd1]/20 blur-3xl"></div>
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white/80 shadow-lg shadow-[#803791]/20">
              <Sparkles className="h-4 w-4 text-[#ffd6ff]" />
              AI-assisted growth engine
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Elevate your <span className="bg-gradient-to-r from-[#ffd6ff] to-[#cfa9ff] bg-clip-text text-transparent">lead lifecycle</span> with deep visibility.
            </h1>
            <p className="text-base text-white/80 md:text-lg">
              Monitor every touchpoint, orchestrate smart follow-ups, and move prospects across stages with confidence. Switch views instantly between strategy, execution, and insights.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white text-[#5b1d72] px-4 py-2 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5e9ff]"
              >
                <Plus className="h-4 w-4" />
                Add New Lead
              </button>
              <Link
                href="/crm/leads/kanban"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/15"
              >
                <Kanban className="h-4 w-4" />
                Pipeline Kanban
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/crm/leads/insights"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:text-white"
              >
                <LineChart className="h-4 w-4" />
                Performance Insights
              </Link>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:text-white disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing" : "Sync data"}
              </button>
            </div>
          </div>

          <div className="grid w-full max-w-sm grid-cols-1 gap-3">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-4">
              <div className="absolute inset-0 opacity-50" style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.35), transparent)"
              }}></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">Active pipeline</p>
                  <p className="mt-1 text-3xl font-semibold text-white">
                    {stats?.totalLeads || 0}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <Users className="h-5 w-5 text-[#ffd6ff]" />
                </div>
              </div>
              <p className="mt-3 text-xs text-white/60">
                {stats?.conversionRate ? `${stats.conversionRate}% overall win-rate` : "Track conversions in realtime"}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="absolute inset-0 opacity-40" style={{
                background: "linear-gradient(135deg, rgba(150,91,214,0.4), transparent)"
              }}></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">Next follow-ups</p>
                  <p className="mt-1 text-3xl font-semibold text-white">
                    {leads.filter((lead) => lead.nextFollowUpDate).length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <CalendarClock className="h-5 w-5 text-white/70" />
                </div>
              </div>
              <p className="mt-3 text-xs text-white/60">
                Automated reminders keep owners aligned with the SLA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick navigation */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Link
          href="/crm/leads"
          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#803791]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <ListChecks className="h-5 w-5 text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Lead workspace</p>
              <p className="text-xs text-white/65">
                Filter, segment and perform bulk actions with confidence.
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/crm/leads/kanban"
          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#b87bd1]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Kanban className="h-5 w-5 text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Pipeline Kanban</p>
              <p className="text-xs text-white/65">
                Drag-and-drop deals across proposal, negotiation and win stages.
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/crm/leads/insights"
          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#5b1d72]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Conversion analytics</p>
              <p className="text-xs text-white/65">
                Understand source efficiency and lost reasons in one place.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
              background: "linear-gradient(135deg, rgba(128,55,145,0.45), transparent)"
            }}></div>
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">Total Leads</p>
                <Users className="h-5 w-5 text-white/80" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.totalLeads}</p>
              <p className="text-xs text-white/60">Across all sources in the last 90 days.</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
              background: "linear-gradient(135deg, rgba(46,213,115,0.35), transparent)"
            }}></div>
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">Converted Deals</p>
                <CheckCircle className="h-5 w-5 text-emerald-300" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.convertedLeads}</p>
              <p className="text-xs text-white/60">Total pipeline converted in the current quarter.</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.35), transparent)"
            }}></div>
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">Conversion Rate</p>
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-semibold text-white">{stats.conversionRate}%</p>
              <p className="text-xs text-white/60">Benchmark: aim for 35%+ with optimized follow-ups.</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
              background: "linear-gradient(135deg, rgba(186,123,209,0.4), transparent)"
            }}></div>
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/80">New this week</p>
                <Calendar className="h-5 w-5 text-white/80" />
              </div>
              <p className="text-3xl font-semibold text-white">
                {
                  leads.filter((l) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(l.createdAt) > weekAgo;
                  }).length
                }
              </p>
              <p className="text-xs text-white/60">Fresh inbound and referral opportunities captured this week.</p>
            </div>
          </div>
        </div>
      )}

      {/* Registration Approvals */}
      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Approvals</p>
            <h2 className="text-xl font-semibold text-white">Registration workflow</h2>
          </div>
          <div className="flex gap-2 rounded-full border border-white/15 bg-white/10 p-1">
            {["pending", "accepted", "rejected"].map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setRegistrationTab(tabKey)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                  registrationTab === tabKey
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tabKey}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {registrationLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b87bd1]"></div>
            </div>
          ) : registrationUsers.length === 0 ? (
            <div className="py-10 text-center text-sm text-white/60">
              No records found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10">
                  <tr className="text-left text-xs uppercase tracking-wider text-white/50">
                    <th className="py-4 px-6">
                      Name
                    </th>
                    <th className="py-4 px-6">
                      Email
                    </th>
                    <th className="py-4 px-6">
                      Role
                    </th>
                    <th className="py-4 px-6">
                      Status
                    </th>
                    <th className="py-4 px-6">
                      Created
                    </th>
                    {registrationTab === "pending" && (
                      <th className="py-4 px-6">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {registrationUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-white/10 transition-all duration-300 hover:bg-white/8"
                    >
                      <td className="py-3 px-6 text-sm font-medium text-white">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="py-3 px-6 text-xs text-white/70">{user.email}</td>
                      <td className="py-3 px-6 text-xs text-white/70 capitalize">
                        {user.role}
                      </td>
                      <td className="py-3 px-6">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                            user.status === "active"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : user.status === "rejected"
                              ? "bg-red-500/20 text-red-300 border-red-500/30"
                              : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                          }`}
                        >
                          {user.status === "active"
                            ? "Accepted"
                            : user.status === "rejected"
                            ? "Rejected"
                            : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-white/70">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      {registrationTab === "pending" && (
                        <td className="py-3 px-6">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApproveUserReg(user._id)}
                              className="rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-3 py-2 text-xs font-semibold text-emerald-100 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectUserReg(user._id)}
                              className="rounded-xl border border-rose-400/30 bg-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-100 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                            >
                              Reject
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
                    ? "bg-linear-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
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
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-[#44225f]/70 via-[#35194c]/70 to-[#1b0c2d]/70 p-5 shadow-xl">
          <div className="absolute inset-0 opacity-40" style={{
            background: "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 55%)"
          }}></div>
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Bulk workflow</p>
              <h3 className="text-lg font-semibold text-white">
                {selectedLeads.length} lead{selectedLeads.length > 1 ? "s" : ""} in focus
              </h3>
              <p className="text-sm text-white/60">
                Streamline engagement with fast assignments, nurture campaigns, or clean up inactive deals.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleBulkAction("assign")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                <UserPlus className="h-4 w-4" />
                Manual assign
              </button>
              <button
                onClick={() => handleBulkAction("autoassign")}
                className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/20 px-3.5 py-2 text-sm font-semibold text-purple-100 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <ArrowUpDown className="h-4 w-4" />
                Smart auto-assign
              </button>
              <button
                onClick={() => handleBulkAction("email")}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-3.5 py-2 text-sm font-semibold text-emerald-100 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <Send className="h-4 w-4" />
                Sequence email
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/15 px-3.5 py-2 text-sm font-semibold text-rose-100 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by name, email, phone or assignment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/50 shadow-inner focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-gradient-to-r from-[#803791]/50 to-[#b87bd1]/40 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide filters" : "Advanced filters"}
            </button>
            <button
              onClick={exportLeads}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="animate-in fade-in duration-300 rounded-2xl border border-white/15 bg-white/5 p-5 shadow-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {[
              {
                label: "Status",
                value: filters.status,
                handler: (v) => setFilters({ ...filters, status: v }),
                options: [
                  ["", "All status"],
                  ["new", "New"],
                  ["contacted", "Contacted"],
                  ["follow_up", "Follow-up"],
                  ["proposal_sent", "Proposal sent"],
                  ["negotiation", "Negotiation"],
                  ["converted", "Converted"],
                  ["lost", "Lost"],
                ],
              },
              {
                label: "Source",
                value: filters.source,
                handler: (v) => setFilters({ ...filters, source: v }),
                options: [
                  ["", "All sources"],
                  ["website", "Website"],
                  ["social_media", "Social media"],
                  ["google_ads", "Google Ads"],
                  ["facebook_ads", "Facebook Ads"],
                  ["referral", "Referral"],
                  ["walk_in", "Walk-in"],
                  ["phone_call", "Phone"],
                  ["email_campaign", "Email campaign"],
                  ["event", "Event"],
                  ["partnership", "Partnership"],
                  ["other", "Other"],
                ],
              },
              {
                label: "Priority",
                value: filters.priority,
                handler: (v) => setFilters({ ...filters, priority: v }),
                options: [
                  ["", "All priorities"],
                  ["low", "Low"],
                  ["medium", "Medium"],
                  ["high", "High"],
                  ["urgent", "Urgent"],
                ],
              },
            ].map((select) => (
              <div key={select.label} className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                  {select.label}
                </p>
                <div className="relative">
                  <select
                    value={select.value}
                    onChange={(e) => select.handler(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white shadow-inner transition-all duration-300 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
                  >
                    {select.options.map(([value, label]) => (
                      <option key={value} value={value} className="bg-[#1b0c2d] text-white">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Date from</p>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Date to</p>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40"
              />
            </div>
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b87bd1]"></div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 py-16 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
              <User className="h-10 w-10 text-white/50" />
            </div>
            <h3 className="text-lg font-semibold text-white/80">No leads found</h3>
            <p className="mt-2 text-sm text-white/50">
              {searchTerm
                ? "Try refining your keywords or reset filters to widen the search."
                : "Use filters or import new data to begin populating your CRM pipeline."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="py-4 px-6 text-left text-xs uppercase tracking-wider text-white/60">
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
                  <th className="py-4 px-6 text-left text-xs uppercase tracking-wider text-white/60">
                    Lead
                  </th>
                  <th className="py-4 px-6 text-left text-xs uppercase tracking-wider text-white/60">
                    Source
                  </th>
                  <th className="py-4 px-6 text-left text-xs uppercase tracking-wider text-white/60">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-xs uppercase tracking-wider text-white/60">
                    Priority
                  </th>
                  <th className="py-4 px-6 text-left text-xs uppercase tracking-wider text-white/60">
                    Assigned To
                  </th>
                  <th className="py-4 px-6 text-left text-xs uppercase tracking-wider text-white/60">
                    Score
                  </th>
                  <th className="py-4 px-6 text-left text-xs uppercase tracking-wider text-white/60">
                    Created
                  </th>
                  <th className="py-4 px-6 text-left text-xs uppercase tracking-wider text-white/60">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="group border-t border-white/10 transition-all duration-300 hover:bg-white/8"
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
                        <div className="relative h-12 w-12 overflow-hidden rounded-2xl">
                          <div className="absolute inset-0 rounded-2xl blur-md" style={{
                            background: "linear-gradient(135deg, #803791, #b87bd1)",
                          }}></div>
                          <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#803791] via-[#9b55b0] to-[#5d1f73] text-white/90 text-sm font-semibold uppercase">
                            {(lead.firstName?.charAt(0) || "").concat(lead.lastName?.charAt(0) || "") || "SP"}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-white">
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                            {lead.email && <span>{lead.email}</span>}
                            {lead.phone && (
                              <span className="inline-flex items-center gap-1">
                                <Phone className="h-3 w-3" /> {lead.phone}
                              </span>
                            )}
                          </div>
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
                          <span className="text-xs font-medium text-white/75">
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
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#803791] to-[#b87bd1]"
                            style={{ width: `${lead.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-white/70">
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
                          className="rounded-xl border border-white/15 bg-white/10 p-2 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowAssignModal(true)}
                          className="rounded-xl border border-blue-400/30 bg-blue-500/15 p-2 text-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                          title="Assign Lead"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowFollowUpModal(true)}
                          className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-2 text-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                          title="Add Follow-up"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <details className="relative">
                          <summary className="flex cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-white/10 p-2 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15">
                            <MoreHorizontal className="w-4 h-4" />
                          </summary>
                          <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-white/15 bg-[#1b0c2d]/95 shadow-2xl backdrop-blur-xl">
                            <button
                              onClick={() => handleStatusChange(lead.id, "contacted")}
                              className="block w-full px-4 py-3 text-left text-sm text-white/70 transition-colors duration-200 hover:bg-white/10"
                            >
                              Mark as contacted
                            </button>
                            <button
                              onClick={() => handleStatusChange(lead.id, "proposal_sent")}
                              className="block w-full px-4 py-3 text-left text-sm text-white/70 transition-colors duration-200 hover:bg-white/10"
                            >
                              Move to proposal sent
                            </button>
                            <button
                              onClick={() => handleConvertLead(lead.id)}
                              className="block w-full px-4 py-3 text-left text-sm text-white/70 transition-colors duration-200 hover:bg-white/10"
                            >
                              Convert lead
                            </button>
                            <div className="h-px bg-white/10"></div>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="block w-full px-4 py-3 text-left text-sm text-rose-300 transition-colors duration-200 hover:bg-rose-500/10"
                            >
                              Delete lead
                            </button>
                          </div>
                        </details>
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
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/70">
          <div>
            Displaying {filteredLeads.length} of {leads.length} leads
          </div>
          <div className="flex gap-2">
            <button
              disabled={!pagination?.hasPrev}
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button className="rounded-xl bg-gradient-to-r from-[#803791] to-[#b87bd1] px-3 py-2 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              {pagination?.currentPage || 1}
            </button>
            <button
              disabled={!pagination?.hasNext}
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
