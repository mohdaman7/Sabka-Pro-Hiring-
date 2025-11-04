"use client";
import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, Briefcase, Clock, Download, Calendar, Target, Award, Filter } from "lucide-react";
import { atsManagementService } from "@/services/atsManagementService";
import { customToast } from "@/components/ui/toast";

export default function ReportsModule() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [dateRange, setDateRange] = useState({ dateFrom: "", dateTo: "" });

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await atsManagementService.getATSDashboardStats(dateRange);
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) { console.error("Error:", error); customToast.error("Failed to fetch reports"); } finally { setLoading(false); }
  };

  const handleExport = async () => {
    try {
      await atsManagementService.exportApplications(dateRange, 'csv');
      customToast.success("Report exported successfully");
    } catch (error) { customToast.error("Export failed"); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 md:p-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">ATS Reports & Analytics</h1>
            <p className="text-slate-600">Comprehensive insights into your recruitment process</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleExport} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30">
              <Download className="w-5 h-5" />Export Report
            </button>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">Date Range:</span>
            </div>
            <input type="date" value={dateRange.dateFrom} onChange={(e) => setDateRange({ ...dateRange, dateFrom: e.target.value })}
              className="px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none" />
            <span className="text-slate-500 text-center">to</span>
            <input type="date" value={dateRange.dateTo} onChange={(e) => setDateRange({ ...dateRange, dateTo: e.target.value })}
              className="px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none" />
            <button onClick={fetchStats} className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg">Apply</button>
            <button onClick={() => { setDateRange({ dateFrom: "", dateTo: "" }); fetchStats(); }}
              className="px-6 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">Clear</button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Total Applications", value: stats?.overview?.totalApplications || 0, icon: Users, color: "slate" },
            { label: "Reviewed", value: stats?.overview?.reviewed || 0, icon: BarChart3, color: "purple" },
            { label: "Shortlisted", value: stats?.overview?.shortlisted || 0, icon: Target, color: "amber" },
            { label: "Interviewed", value: stats?.overview?.interviewed || 0, icon: Calendar, color: "indigo" },
            { label: "Hired", value: stats?.overview?.hired || 0, icon: Award, color: "green" },
            { label: "Avg Time to Hire", value: `${stats?.overview?.avgTimeToHire || 0}d`, icon: Clock, color: "blue" },
          ].map((stat, idx) => (
            <div key={idx} className="rounded-2xl bg-white border-2 border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
              <div className="text-sm font-medium text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Conversion Funnel */}
        <div className="rounded-2xl bg-white border-2 border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-indigo-600" />Conversion Funnel
          </h2>
          <div className="space-y-4">
            {stats?.conversionFunnel?.map((stage, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">{stage.stage}</span>
                  <span className="text-sm font-bold text-slate-900">{stage.count} ({stage.percentage}%)</span>
                </div>
                <div className="w-full h-8 bg-slate-100 rounded-xl overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Jobs */}
        <div className="rounded-2xl bg-white border-2 border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Briefcase className="w-7 h-7 text-indigo-600" />Top Performing Jobs
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 px-4 text-left text-sm font-bold text-slate-700 uppercase">Job Title</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-slate-700 uppercase">Applications</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-slate-700 uppercase">Hired</th>
                  <th className="py-3 px-4 text-center text-sm font-bold text-slate-700 uppercase">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {stats?.topJobs?.map((job, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-4 px-4 font-semibold text-slate-900">{job.title}</td>
                    <td className="py-4 px-4 text-center text-slate-700">{job.applications}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold">{job.hired}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: `${job.conversionRate}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{job.conversionRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Status Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border-2 border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Application Status</h3>
            <div className="space-y-3">
              {Object.entries(stats?.applicationStats || {}).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="font-semibold text-slate-700 capitalize">{status}</span>
                  <span className="text-lg font-bold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border-2 border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Interview Status</h3>
            <div className="space-y-3">
              {Object.entries(stats?.interviewStats || {}).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="font-semibold text-slate-700 capitalize">{status}</span>
                  <span className="text-lg font-bold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
