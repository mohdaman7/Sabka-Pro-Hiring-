"use client";
import { useState, useEffect } from "react";
import { Search, Filter, Download, Users, CheckCircle, XCircle, Clock, Eye, Calendar, Star, FileText, ChevronLeft, ChevronRight, X, AlertCircle, Building2, ArrowRight, Sparkles } from "lucide-react";
import { atsManagementService } from "@/services/atsManagementService";
import { customToast } from "@/components/ui/toast";
import ApplicationDetailView from "./ApplicationDetailView";

const STATUS_CONFIG = {
  applied: { label: "Applied", color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-50" },
  reviewed: { label: "Reviewed", color: "bg-purple-500", textColor: "text-purple-600", bgLight: "bg-purple-50" },
  shortlisted: { label: "Shortlisted", color: "bg-amber-500", textColor: "text-amber-600", bgLight: "bg-amber-50" },
  interview: { label: "Interview", color: "bg-indigo-500", textColor: "text-indigo-600", bgLight: "bg-indigo-50" },
  hired: { label: "Hired", color: "bg-green-500", textColor: "text-green-600", bgLight: "bg-green-50" },
  rejected: { label: "Rejected", color: "bg-red-500", textColor: "text-red-600", bgLight: "bg-red-50" },
  withdrawn: { label: "Withdrawn", color: "bg-gray-500", textColor: "text-gray-600", bgLight: "bg-gray-50" },
};

export default function ApplicationsModule() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ search: "", status: "", page: 1, limit: 20 });
  const [stats, setStats] = useState({ total: 0, applied: 0, reviewed: 0, shortlisted: 0, interview: 0, hired: 0, rejected: 0 });
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [selectedAppId, setSelectedAppId] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchApplications(); }, [filters.page, filters.status]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await atsManagementService.getAllApplications(filters);
      if (response.success) {
        setApplications(response.data.applications);
        setPagination(response.data.pagination);
        const statusCounts = response.data.statusCounts;
        setStats({
          total: response.data.pagination.total, applied: statusCounts.applied || 0, reviewed: statusCounts.reviewed || 0,
          shortlisted: statusCounts.shortlisted || 0, interview: statusCounts.interview || 0, hired: statusCounts.hired || 0, rejected: statusCounts.rejected || 0,
        });
      }
    } catch (error) { console.error("Error:", error); customToast.error("Failed to fetch applications"); } finally { setLoading(false); }
  };

  const handleSearch = (e) => { e.preventDefault(); fetchApplications(); };
  const handleStatusFilter = (status) => { setFilters({ ...filters, status: filters.status === status ? "" : status, page: 1 }); };

  const handleBulkAction = async (action) => {
    if (selectedApplications.length === 0) { customToast.warning("Please select applications first"); return; }
    try {
      let data = {};
      if (action === 'shortlist') data = { status: 'shortlisted' };
      else if (action === 'reject') data = { status: 'rejected' };
      await atsManagementService.bulkUpdateApplications(selectedApplications, 'updateStatus', data);
      customToast.success(`${selectedApplications.length} applications updated`);
      setSelectedApplications([]);
      fetchApplications();
    } catch (error) { customToast.error("Bulk action failed"); }
  };

  const handleExport = async () => {
    try { await atsManagementService.exportApplications(filters, 'csv'); customToast.success("Exported successfully"); }
    catch (error) { customToast.error("Export failed"); }
  };

  const handleViewDetails = (appId) => {
    setSelectedAppId(appId);
  };

  // If detail view is open, show it
  if (selectedAppId) {
    return (
      <ApplicationDetailView
        applicationId={selectedAppId}
        onClose={() => setSelectedAppId(null)}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(128,55,145,0.12)", animation: "pulse 8s ease-in-out infinite" }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: "rgba(184,123,209,0.08)", animation: "float 15s ease-in-out infinite" }} />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(240,194,238,0.05)", animation: "float 12s ease-in-out infinite reverse" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_50%)]" />
      </div>

      <div className="relative p-4 md:p-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Applications Management</h1>
            <p className="text-white/70">Track and manage all job applications from candidates</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-[#803791]/20 text-white font-semibold hover:bg-white/10 shadow-sm">
              <Filter className="w-4 h-4" /><span className="hidden sm:inline">Filters</span>
            </button>
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-[#803791]/20 text-white font-semibold hover:bg-white/10 shadow-sm">
              <Download className="w-4 h-4" /><span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {[
            { key: 'total', label: 'Total', icon: Users, color: 'slate' },
            { key: 'applied', label: 'Applied', icon: FileText, color: 'blue' },
            { key: 'reviewed', label: 'Reviewed', icon: Eye, color: 'purple' },
            { key: 'shortlisted', label: 'Shortlisted', icon: Star, color: 'amber' },
            { key: 'interview', label: 'Interview', icon: Calendar, color: 'indigo' },
            { key: 'hired', label: 'Hired', icon: CheckCircle, color: 'green' },
            { key: 'rejected', label: 'Rejected', icon: XCircle, color: 'red' },
          ].map((stat) => (
            <div key={stat.key} onClick={() => stat.key !== 'total' && handleStatusFilter(stat.key)}
              className={`rounded-2xl bg-white/5 border p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all ${filters.status === stat.key ? 'border-purple-500 shadow-lg' : 'border-[#803791]/10'}`}>
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats[stat.key] || 0}</div>
              <div className="text-xs font-medium text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-6 rounded-2xl bg-white/5 border border-[#803791]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Filters</h3>
            <button onClick={() => setShowFilters(false)} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5 text-white" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="date" value={filters.dateFrom || ''} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-[#803791]/20 text-white focus:border-purple-500 focus:outline-none" />
            <input type="date" value={filters.dateTo || ''} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-[#803791]/20 text-white focus:border-purple-500 focus:outline-none" />
            <button onClick={fetchApplications} className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-lg">Apply</button>
            <button onClick={() => { setFilters({ search: "", status: "", page: 1, limit: 20 }); fetchApplications(); }}
              className="px-6 py-2.5 rounded-xl bg-white/5 border border-[#803791]/20 text-white font-semibold hover:bg-white/10">Clear</button>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input type="text" placeholder="Search by name, email, job..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-[#803791]/20 text-white placeholder:text-white/40 focus:border-purple-500 focus:outline-none" />
        </form>
        {selectedApplications.length > 0 && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-purple-500/20 border border-purple-500/30">
            <span className="px-3 text-sm font-semibold text-white">{selectedApplications.length} selected</span>
            <button onClick={() => handleBulkAction('shortlist')} className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700">Shortlist</button>
            <button onClick={() => handleBulkAction('reject')} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700">Reject</button>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white/5 border border-[#803791]/10 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white/70 font-medium">Loading...</p>
            </div>
          </div>
        ) : applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="w-16 h-16 text-white/40 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Applications Found</h3>
            <p className="text-white/60">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-[#803791]/10">
                    <th className="py-4 px-4 text-left">
                      <input type="checkbox" className="w-5 h-5 rounded border-2 border-purple-500/30 bg-white/5 text-purple-600 cursor-pointer"
                        onChange={(e) => e.target.checked ? setSelectedApplications(applications.map(a => a._id)) : setSelectedApplications([])} />
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-bold text-white/70 uppercase">Candidate</th>
                    <th className="py-4 px-4 text-left text-sm font-bold text-white/70 uppercase">Job Title</th>
                    <th className="py-4 px-4 text-left text-sm font-bold text-white/70 uppercase">Company</th>
                    <th className="py-4 px-4 text-left text-sm font-bold text-white/70 uppercase">Status</th>
                    <th className="py-4 px-4 text-left text-sm font-bold text-white/70 uppercase">Applied Date</th>
                    <th className="py-4 px-4 text-left text-sm font-bold text-white/70 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-white/5">
                      <td className="py-4 px-4">
                        <input type="checkbox" checked={selectedApplications.includes(app._id)}
                          onChange={() => setSelectedApplications(prev => prev.includes(app._id) ? prev.filter(id => id !== app._id) : [...prev, app._id])}
                          className="w-5 h-5 rounded border-2 border-purple-500/30 bg-white/5 text-purple-600 cursor-pointer" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                            {app.studentId?.firstName?.[0]}{app.studentId?.lastName?.[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{app.studentId?.firstName} {app.studentId?.lastName}</div>
                            <div className="text-sm text-white/60">{app.studentId?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{app.jobId?.title}</div>
                        <div className="text-sm text-white/60">{app.jobId?.department}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-white/40" />
                          <span className="font-medium text-white/80">{app.employerId?.companyName || `${app.employerId?.firstName} ${app.employerId?.lastName}`}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${STATUS_CONFIG[app.status]?.bgLight} ${STATUS_CONFIG[app.status]?.textColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[app.status]?.color}`}></span>
                          {STATUS_CONFIG[app.status]?.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-white/70">{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleViewDetails(app._id)}
                          className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.pages > 1 && (
              <div className="flex items-center justify-between px-4 py-4 border-t border-[#803791]/10">
                <div className="text-sm text-white/60">Showing {((pagination.page - 1) * filters.limit) + 1} to {Math.min(pagination.page * filters.limit, pagination.total)} of {pagination.total}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setFilters({ ...filters, page: filters.page - 1 })} disabled={pagination.page === 1}
                    className="p-2 rounded-lg bg-white/5 border border-[#803791]/20 hover:bg-white/10 disabled:opacity-50 text-white"><ChevronLeft className="w-5 h-5" /></button>
                  <button onClick={() => setFilters({ ...filters, page: filters.page + 1 })} disabled={pagination.page === pagination.pages}
                    className="p-2 rounded-lg bg-white/5 border border-[#803791]/20 hover:bg-white/10 disabled:opacity-50 text-white"><ChevronRight className="w-5 h-5" /></button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      </div>
    </div>
  );
}
