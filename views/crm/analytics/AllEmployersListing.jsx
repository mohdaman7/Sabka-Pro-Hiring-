"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  TrendingUp, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Mail,
  MoreVertical,
  FileText,
  Users,
  CheckCircle
} from "lucide-react";
import { getAllEmployers, formatNumber, formatPercentage } from "@/services/analyticsService";

export default function AllEmployersListing() {
  const [loading, setLoading] = useState(true);
  const [employers, setEmployers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    fetchEmployers();
  }, [pagination.page, search]);

  const fetchEmployers = async () => {
    try {
      setLoading(true);
      const response = await getAllEmployers({
        page: pagination.page,
        limit: pagination.limit,
        search,
      });
      
      // Handle both paginated and non-paginated responses
      const employerData = Array.isArray(response) ? response : response.data || [];
      setEmployers(employerData);
      
      // Set pagination if available
      if (response.pagination) {
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error("Error fetching employers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const getHireRateColor = (rate) => {
    if (rate >= 50) return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30";
    if (rate >= 25) return "text-blue-400 bg-blue-500/20 border-blue-500/30";
    if (rate >= 10) return "text-amber-400 bg-amber-500/20 border-amber-500/30";
    return "text-rose-400 bg-rose-500/20 border-rose-500/30";
  };

  if (loading && employers.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">All Employers</h2>
          <p className="text-white/60 text-sm mt-1">
            Showing {employers.length} of {pagination.total} employers
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search employers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
      </div>

      {/* Employers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employers.map((employer, index) => (
          <motion.div
            key={employer._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            {/* Employer Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors">
                  {employer.firstName} {employer.lastName}
                </h3>
                <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{employer.email}</span>
                </div>
                {employer.company && (
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30">
                    {employer.company}
                  </span>
                )}
              </div>

              {/* Actions Menu */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === employer._id ? null : employer._id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-white/60" />
                </button>
                
                {activeMenu === employer._id && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-white/20 rounded-xl shadow-2xl z-10 overflow-hidden">
                    <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                      <Eye className="w-4 h-4" />
                      View Profile
                    </button>
                    <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                      <Mail className="w-4 h-4" />
                      Send Email
                    </button>
                    <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                      <FileText className="w-4 h-4" />
                      View Jobs
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-white/60">Total Jobs</span>
                </div>
                <p className="text-xl font-bold text-white">
                  {formatNumber(employer.totalJobs || 0)}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-white/60">Active Jobs</span>
                </div>
                <p className="text-xl font-bold text-white">
                  {formatNumber(employer.activeJobs || 0)}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-white/60">Applications</span>
                </div>
                <p className="text-xl font-bold text-white">
                  {formatNumber(employer.totalApplications || 0)}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-white/60">Hired</span>
                </div>
                <p className="text-xl font-bold text-white">
                  {formatNumber(employer.hired || 0)}
                </p>
              </div>
            </div>

            {/* Hire Rate */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Hire Rate</span>
                <span className={`text-sm font-bold px-3 py-1 rounded-lg border ${getHireRateColor(employer.hireRate || 0)}`}>
                  {formatPercentage(employer.hireRate || 0)}
                </span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                  style={{ width: `${Math.min(employer.hireRate || 0, 100)}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {employers.length === 0 && !loading && (
        <div className="text-center py-20">
          <Briefcase className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No employers found</h3>
          <p className="text-white/60">Try adjusting your search filters</p>
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <p className="text-sm text-white/60">
            Page {pagination.page} of {pagination.pages}
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            {[...Array(pagination.pages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === pagination.pages ||
                (page >= pagination.page - 1 && page <= pagination.page + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      page === pagination.page
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === pagination.page - 2 || page === pagination.page + 2) {
                return <span key={page} className="text-white/40">...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
