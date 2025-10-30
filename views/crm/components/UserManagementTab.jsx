"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Eye,
  User,
  Building,
  Filter,
  RefreshCw,
  GraduationCap,
  Crown,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Ban,
  Calendar,
  Shield,
} from "lucide-react";
import { customToast, toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminService } from "@/services/adminService";
import { cn } from "@/lib/utils";

export default function UserManagementTab() {
  const [userTab, setUserTab] = useState("pending");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    fetchUsersData();
    fetchUserStatsData();
  }, [userTab]);

  const fetchUsersData = async () => {
    setUserLoading(true);
    try {
      const response = await adminService.getUsersByStatus(userTab, {
        search: userSearchTerm,
      });
      if (response?.success) {
        setUsers(response.data?.users || []);
      }
    } catch (error) {
      customToast.error("Error", error.message || "Failed to load users");
    } finally {
      setUserLoading(false);
    }
  };

  const fetchUserStatsData = async () => {
    try {
      const response = await adminService.getUserStats();
      if (response?.success) {
        setUserStats(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    }
  };

  const handleApproveUser = async (userId) => {
    const toastId = customToast.loading("Approving user...");
    try {
      await adminService.approveUser(userId, true);
      customToast.success("Approved", "User approved successfully");
      fetchUsersData();
    } catch (error) {
      customToast.error("Failed", error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleRejectUser = async (userId) => {
    const reason = window.prompt("Enter rejection reason:");
    if (!reason) return;
    const toastId = customToast.loading("Rejecting user...");
    try {
      await adminService.rejectUser(userId, reason);
      customToast.success("Rejected", "User rejected successfully");
      fetchUsersData();
    } catch (error) {
      customToast.error("Failed", error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleReactivateUser = async (userId) => {
    const toastId = customToast.loading("Reactivating user...");
    try {
      await adminService.reactivateUser(userId);
      customToast.success("Reactivated", "User reactivated successfully");
      fetchUsersData();
    } catch (error) {
      customToast.error("Failed", error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleUpgradePlan = async (userId) => {
    const toastId = customToast.loading("Upgrading plan...");
    try {
      await adminService.upgradePlan(userId, {
        planType: "pro",
        duration: 365,
      });
      customToast.success("Upgraded", "User plan upgraded to Pro");
      fetchUsersData();
    } catch (error) {
      customToast.error("Failed", error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleDowngradePlan = async (userId) => {
    const reason = window.prompt("Enter downgrade reason:");
    if (!reason) return;
    const toastId = customToast.loading("Downgrading plan...");
    try {
      await adminService.downgradePlan(userId, reason);
      customToast.success("Downgraded", "User plan downgraded to Free");
      fetchUsersData();
    } catch (error) {
      customToast.error("Failed", error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleBulkApproveUsers = async () => {
    if (selectedUsers.length === 0) return;
    const toastId = customToast.loading("Approving users...");
    try {
      await adminService.bulkApproveUsers(selectedUsers);
      customToast.success("Success", `${selectedUsers.length} users approved`);
      setSelectedUsers([]);
      fetchUsersData();
    } catch (error) {
      customToast.error("Failed", error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleBulkRejectUsers = async () => {
    if (selectedUsers.length === 0) return;
    const reason = window.prompt("Enter rejection reason:");
    if (!reason) return;
    const toastId = customToast.loading("Rejecting users...");
    try {
      await adminService.bulkRejectUsers(selectedUsers, reason);
      customToast.success("Success", `${selectedUsers.length} users rejected`);
      setSelectedUsers([]);
      fetchUsersData();
    } catch (error) {
      customToast.error("Failed", error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const getUserTypeBadge = (role) => {
    if (role === "student") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm">
          <GraduationCap className="w-4 h-4 text-blue-300" />
          <span className="text-xs font-bold text-blue-100">Student</span>
        </div>
      );
    } else if (role === "employer") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
          <Building className="w-4 h-4 text-purple-300" />
          <span className="text-xs font-bold text-purple-100">Employer</span>
        </div>
      );
    }
    return null;
  };

  const getPlanBadge = (planType) => {
    if (planType === "pro") {
      return (
        <div className="relative group inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-lg blur-lg opacity-60 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-lg blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
          <div className="relative px-3 py-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-lg shadow-2xl flex items-center gap-1.5 overflow-hidden"
            style={{
              boxShadow: "0 4px 20px rgba(251, 146, 60, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Crown className="w-3.5 h-3.5 relative z-10 text-white" />
            <span className="relative z-10 text-xs font-black text-white tracking-wider">PRO</span>
          </div>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-500/20 border border-gray-500/30">
        <span className="text-xs font-semibold text-gray-300">FREE</span>
      </div>
    );
  };

  const userTabs = [
    { id: "pending", label: "Pending", count: userStats?.byStatus?.find(s => s._id === "pending")?.count || 0 },
    { id: "active", label: "Active", count: userStats?.byStatus?.find(s => s._id === "active")?.count || 0 },
    { id: "rejected", label: "Rejected", count: userStats?.byStatus?.find(s => s._id === "rejected")?.count || 0 },
  ];

  return (
    <div className="space-y-6">
      {/* User Tabs */}
      <div className="flex gap-2">
        {userTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setUserTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300",
              userTab === tab.id
                ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg scale-105"
                : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
            )}
          >
            {tab.label}
            <span className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-bold",
              userTab === tab.id ? "bg-white/20" : "bg-white/10"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input
            placeholder="Search users by name, email..."
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsersData()}
            className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-white/50 rounded-xl"
          />
        </div>
        <Button 
          onClick={fetchUsersData}
          className="px-6 py-6 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && userTab === "pending" && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#803791]/20 to-[#b87bd1]/20 border border-[#803791]/30 backdrop-blur-xl flex items-center justify-between">
          <span className="text-white font-semibold">
            {selectedUsers.length} user(s) selected
          </span>
          <div className="flex gap-2">
            <Button
              onClick={handleBulkApproveUsers}
              className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/30 rounded-lg"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve All
            </Button>
            <Button
              onClick={handleBulkRejectUsers}
              className="px-4 py-2 bg-rose-500/20 border border-rose-400/30 text-rose-100 hover:bg-rose-500/30 rounded-lg"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject All
            </Button>
            <Button
              onClick={() => setSelectedUsers([])}
              className="px-4 py-2 bg-gray-500/20 border border-gray-400/30 text-gray-100 hover:bg-gray-500/30 rounded-lg"
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl"
        style={{ background: "rgba(255, 255, 255, 0.02)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {userTab === "pending" && (
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(users.map(u => u._id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                )}
                <th className="px-6 py-4 text-left text-white/70 font-semibold">User</th>
                <th className="px-6 py-4 text-left text-white/70 font-semibold">Contact</th>
                <th className="px-6 py-4 text-left text-white/70 font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-white/70 font-semibold">Plan</th>
                <th className="px-6 py-4 text-left text-white/70 font-semibold">Registered</th>
                <th className="px-6 py-4 text-left text-white/70 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-white/50">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-white/50">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    {userTab === "pending" && (
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers([...selectedUsers, user._id]);
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user._id));
                            }
                          }}
                          className="rounded"
                        />
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Mail className="w-3.5 h-3.5" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Phone className="w-3.5 h-3.5" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getUserTypeBadge(user.role)}
                    </td>
                    <td className="px-6 py-4">
                      {getPlanBadge(user.planType || "free")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {userTab === "pending" && (
                          <>
                            <Button
                              onClick={() => handleApproveUser(user._id)}
                              className="p-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/30 rounded-lg"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleRejectUser(user._id)}
                              className="p-2 bg-rose-500/20 border border-rose-400/30 text-rose-100 hover:bg-rose-500/30 rounded-lg"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {userTab === "active" && (
                          <>
                            {user.planType === "free" ? (
                              <Button
                                onClick={() => handleUpgradePlan(user._id)}
                                className="p-2 bg-amber-500/20 border border-amber-400/30 text-amber-100 hover:bg-amber-500/30 rounded-lg"
                                title="Upgrade to Pro"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleDowngradePlan(user._id)}
                                className="p-2 bg-gray-500/20 border border-gray-400/30 text-gray-100 hover:bg-gray-500/30 rounded-lg"
                                title="Downgrade to Free"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </Button>
                            )}
                          </>
                        )}
                        {userTab === "rejected" && (
                          <Button
                            onClick={() => handleReactivateUser(user._id)}
                            className="p-2 bg-blue-500/20 border border-blue-400/30 text-blue-100 hover:bg-blue-500/30 rounded-lg"
                            title="Reactivate"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
