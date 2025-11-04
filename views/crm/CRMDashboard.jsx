"use client";

import {
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function CRMDashboard() {
  const stats = [
    {
      label: "Total Candidates",
      value: "10,234",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      label: "Active Employers",
      value: "542",
      change: "+8.2%",
      trend: "up",
      icon: Briefcase,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
    },
    {
      label: "Candidates Placed",
      value: "1,847",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      label: "Monthly Revenue",
      value: "₹4.2L",
      change: "-3.1%",
      trend: "down",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  const placementData = [
    { month: "Jan", placements: 120 },
    { month: "Feb", placements: 145 },
    { month: "Mar", placements: 165 },
    { month: "Apr", placements: 142 },
    { month: "May", placements: 178 },
    { month: "Jun", placements: 195 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 320 },
    { month: "Feb", revenue: 380 },
    { month: "Mar", revenue: 420 },
    { month: "Apr", revenue: 390 },
    { month: "May", revenue: 450 },
    { month: "Jun", revenue: 420 },
  ];

  const recentLeads = [
    {
      name: "Amit Sharma",
      email: "amit.sharma@email.com",
      type: "Candidate",
      status: "New",
      date: "2 hours ago",
    },
    {
      name: "Tech Solutions Pvt Ltd",
      email: "hr@techsolutions.com",
      type: "Employer",
      status: "Follow-up",
      date: "5 hours ago",
    },
    {
      name: "Priya Patel",
      email: "priya.p@email.com",
      type: "Candidate",
      status: "Converted",
      date: "1 day ago",
    },
    {
      name: "Global Corp",
      email: "hiring@globalcorp.com",
      type: "Employer",
      status: "New",
      date: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent space-y-4 md:space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Dashboard</h1>
        <p className="text-sm md:text-base text-white/75">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white/5 rounded-xl border border-[#803791]/10 p-4 md:p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center`}
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 text-white`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs md:text-sm font-medium ${
                    stat.trend === "up" ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-white/75">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
        {/* Placements Chart */}
        <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">
            Monthly Placements
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={placementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="placements"
                fill="url(#blueGradient)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">
            Revenue Trend (₹ in thousands)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: "#06b6d4", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white/5 rounded-xl border border-[#803791]/10 p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="text-base md:text-lg font-semibold text-white">Recent Leads</h3>
          <a
            href="/crm/leads"
            className="text-xs md:text-sm text-[#b87bd1] hover:text-[#a36bc2] font-medium hover:underline"
          >
            View All
          </a>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left py-3 px-4 text-sm font-medium text-white/90">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/90">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/90">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/90">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/90">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, index) => (
                <tr
                  key={index}
                  className="border-b border-white/6 hover:bg-white/4 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-white font-medium">
                    {lead.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-white/75">
                    {lead.email}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        lead.type === "Candidate"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-cyan-100 text-cyan-700"
                      }`}
                    >
                      {lead.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === "New"
                          ? "bg-yellow-100 text-yellow-700"
                          : lead.status === "Follow-up"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-white/75">
                    {lead.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {recentLeads.map((lead, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/8 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-white">{lead.name}</h4>
                  <p className="text-xs text-white/60 mt-0.5">{lead.email}</p>
                </div>
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-[10px] font-medium shrink-0 ${
                    lead.type === "Candidate"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-cyan-100 text-cyan-700"
                  }`}
                >
                  {lead.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-[10px] font-medium ${
                    lead.status === "New"
                      ? "bg-yellow-100 text-yellow-700"
                      : lead.status === "Follow-up"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {lead.status}
                </span>
                <span className="text-xs text-white/50">{lead.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
