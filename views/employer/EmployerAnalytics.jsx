"use client";

import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  FileText,
  Clock,
  MapPin,
  DollarSign,
  Eye,
  MousePointer,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import { useState } from "react";

// Mock data for analytics
const analyticsData = {
  overview: {
    totalViews: 12457,
    totalApplications: 342,
    conversionRate: 2.74,
    averageTimeToHire: 18,
  },
  monthlyStats: [
    { month: "Jan", applications: 45, views: 1200, hires: 3 },
    { month: "Feb", applications: 67, views: 1450, hires: 5 },
    { month: "Mar", applications: 89, views: 1670, hires: 7 },
    { month: "Apr", applications: 56, views: 1320, hires: 4 },
    { month: "May", applications: 78, views: 1890, hires: 6 },
    { month: "Jun", applications: 94, views: 2100, hires: 8 },
  ],
  jobPerformance: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      views: 2340,
      applications: 67,
      conversion: 2.86,
      status: "Active",
    },
    {
      id: 2,
      title: "Backend Developer",
      views: 1890,
      applications: 45,
      conversion: 2.38,
      status: "Active",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      views: 1560,
      applications: 34,
      conversion: 2.18,
      status: "Active",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      views: 980,
      applications: 23,
      conversion: 2.35,
      status: "Closed",
    },
  ],
  candidateSources: [
    { source: "LinkedIn", count: 124, percentage: 36 },
    { source: "Indeed", count: 89, percentage: 26 },
    { source: "Company Website", count: 67, percentage: 20 },
    { source: "Referrals", count: 45, percentage: 13 },
    { source: "Other", count: 17, percentage: 5 },
  ],
  applicationStatus: {
    new: 45,
    reviewed: 89,
    shortlisted: 34,
    interviewed: 23,
    rejected: 123,
    hired: 8,
  },
  topLocations: [
    { location: "Mumbai", applicants: 67 },
    { location: "Bangalore", applicants: 89 },
    { location: "Delhi", applicants: 56 },
    { location: "Hyderabad", applicants: 34 },
    { location: "Pune", applicants: 45 },
  ],
};

export default function EmployerAnalytics() {
  const [timeRange, setTimeRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  const StatCard = ({ icon: Icon, label, value, change, color = "blue" }) => {
    const colorClasses = {
      blue: "text-blue-600 bg-blue-50",
      green: "text-green-600 bg-green-50",
      purple: "text-purple-600 bg-purple-50",
      orange: "text-orange-600 bg-orange-50",
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 ${
              colorClasses[color].split(" ")[1]
            } rounded-lg flex items-center justify-center`}
          >
            <Icon className={`w-6 h-6 ${colorClasses[color].split(" ")[0]}`} />
          </div>
          {change && (
            <span
              className={`text-sm font-medium ${
                change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    );
  };

  const ProgressBar = ({ percentage, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
    };

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Track your hiring performance and candidate engagement
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0 text-emerald-900">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg border border-gray-200 p-1 w-fit">
        {["overview", "performance", "candidates", "sources"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Eye}
              label="Total Job Views"
              value="12,457"
              change="+12%"
              color="blue"
            />
            <StatCard
              icon={FileText}
              label="Total Applications"
              value="342"
              change="+8%"
              color="green"
            />
            <StatCard
              icon={MousePointer}
              label="Conversion Rate"
              value="2.74%"
              change="+0.3%"
              color="purple"
            />
            <StatCard
              icon={Clock}
              label="Avg. Time to Hire"
              value="18 days"
              change="-2 days"
              color="orange"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Application Trends */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Application Trends
              </h3>
              <div className="space-y-4">
                {analyticsData.monthlyStats.map((month, index) => (
                  <div
                    key={month.month}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600 w-12">
                      {month.month}
                    </span>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>{month.applications} applications</span>
                        <span>{month.views} views</span>
                      </div>
                      <ProgressBar
                        percentage={(month.applications / 100) * 100}
                        color="blue"
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {month.hires} hires
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Funnel */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Application Funnel
              </h3>
              <div className="space-y-4">
                {[
                  {
                    stage: "Applied",
                    count:
                      analyticsData.applicationStatus.new +
                      analyticsData.applicationStatus.reviewed,
                    color: "blue",
                  },
                  {
                    stage: "Shortlisted",
                    count: analyticsData.applicationStatus.shortlisted,
                    color: "green",
                  },
                  {
                    stage: "Interviewed",
                    count: analyticsData.applicationStatus.interviewed,
                    color: "purple",
                  },
                  {
                    stage: "Hired",
                    count: analyticsData.applicationStatus.hired,
                    color: "orange",
                  },
                ].map((stage, index) => (
                  <div
                    key={stage.stage}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600 w-24">
                      {stage.stage}
                    </span>
                    <div className="flex-1 mx-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{stage.count} candidates</span>
                        <span>{Math.round((stage.count / 342) * 100)}%</span>
                      </div>
                      <ProgressBar
                        percentage={(stage.count / 342) * 100}
                        color={stage.color}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Candidate Sources */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Candidate Sources
              </h3>
              <div className="space-y-4">
                {analyticsData.candidateSources.map((source) => (
                  <div
                    key={source.source}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {source.source}
                    </span>
                    <div className="flex items-center gap-4 flex-1 mx-4">
                      <ProgressBar
                        percentage={source.percentage}
                        color={
                          source.source === "LinkedIn"
                            ? "blue"
                            : source.source === "Indeed"
                            ? "green"
                            : source.source === "Company Website"
                            ? "purple"
                            : source.source === "Referrals"
                            ? "orange"
                            : "red"
                        }
                      />
                      <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                        {source.percentage}%
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">
                      {source.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Locations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Top Candidate Locations
              </h3>
              <div className="space-y-4">
                {analyticsData.topLocations.map((location, index) => (
                  <div
                    key={location.location}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {location.location}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {location.applicants} applicants
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Job Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">
                      Job Title
                    </th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">
                      Views
                    </th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">
                      Applications
                    </th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">
                      Conversion
                    </th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.jobPerformance.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4">
                        <div className="font-medium text-gray-900">
                          {job.title}
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        {job.views.toLocaleString()}
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        {job.applications}
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        {job.conversion}%
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === "Active"
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">124%</div>
              <div className="text-blue-100">Growth in Applications</div>
            </div>
          </div>
          <div className="text-sm text-blue-200">Compared to last month</div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">2.3x</div>
              <div className="text-green-100">More Qualified Candidates</div>
            </div>
          </div>
          <div className="text-sm text-green-200">
            Higher quality applications this quarter
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">₹1.2L</div>
              <div className="text-purple-100">Saved on Hiring</div>
            </div>
          </div>
          <div className="text-sm text-purple-200">
            Through efficient candidate matching
          </div>
        </div>
      </div>
    </div>
  );
}
