"use client"

import { Users, Briefcase, TrendingUp, DollarSign, ArrowUp, ArrowDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function CRMDashboard() {
  const stats = [
    {
      label: "Total Candidates",
      value: "10,234",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Active Employers",
      value: "542",
      change: "+8.2%",
      trend: "up",
      icon: Briefcase,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Candidates Placed",
      value: "1,847",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      label: "Monthly Revenue",
      value: "₹4.2L",
      change: "-3.1%",
      trend: "down",
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  const placementData = [
    { month: "Jan", placements: 120 },
    { month: "Feb", placements: 145 },
    { month: "Mar", placements: 165 },
    { month: "Apr", placements: 142 },
    { month: "May", placements: 178 },
    { month: "Jun", placements: 195 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 320 },
    { month: "Feb", revenue: 380 },
    { month: "Mar", revenue: 420 },
    { month: "Apr", revenue: 390 },
    { month: "May", revenue: 450 },
    { month: "Jun", revenue: 420 },
  ]

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
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-accent" : "text-destructive"
                  }`}
                >
                  {stat.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Placements Chart */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Placements</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={placementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="placements" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend (₹ in thousands)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Leads</h3>
          <a href="/crm/leads" className="text-sm text-primary hover:underline">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, index) => (
                <tr key={index} className="border-b border-border hover:bg-surface-hover transition-colors">
                  <td className="py-3 px-4 text-sm text-foreground font-medium">{lead.name}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{lead.email}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        lead.type === "Candidate" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                      }`}
                    >
                      {lead.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === "New"
                          ? "bg-secondary/10 text-secondary"
                          : lead.status === "Follow-up"
                            ? "bg-accent/10 text-accent"
                            : "bg-accent/10 text-accent"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
