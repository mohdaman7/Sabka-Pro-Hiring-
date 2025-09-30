"use client"

import { useState } from "react"
import { Search, Filter, Building2, CheckCircle, XCircle, Eye, MoreVertical } from "lucide-react"

export default function EmployersManagement() {
  const [activeTab, setActiveTab] = useState("all")

  const employers = [
    {
      id: 1,
      companyName: "Tech Solutions Pvt Ltd",
      contactPerson: "Rajesh Kumar",
      email: "hr@techsolutions.com",
      phone: "+91 98765 43210",
      industry: "Information Technology",
      companySize: "51-200",
      isVerified: true,
      isPremium: true,
      jobPosts: 12,
      hires: 8,
      assignedTo: "Priya Sharma",
    },
    {
      id: 2,
      companyName: "Global Innovations",
      contactPerson: "Sneha Patel",
      email: "contact@globalinnovations.com",
      phone: "+91 98765 43211",
      industry: "Manufacturing",
      companySize: "201-500",
      isVerified: true,
      isPremium: false,
      jobPosts: 3,
      hires: 2,
      assignedTo: "Amit Patel",
    },
    {
      id: 3,
      companyName: "Digital Marketing Pro",
      contactPerson: "Rahul Verma",
      email: "hr@digitalmarketingpro.com",
      phone: "+91 98765 43212",
      industry: "Marketing & Advertising",
      companySize: "11-50",
      isVerified: false,
      isPremium: false,
      jobPosts: 0,
      hires: 0,
      assignedTo: "Priya Sharma",
    },
    {
      id: 4,
      companyName: "Finance Corp Ltd",
      contactPerson: "Anita Desai",
      email: "careers@financecorp.com",
      phone: "+91 98765 43213",
      industry: "Finance & Banking",
      companySize: "501-1000",
      isVerified: true,
      isPremium: true,
      jobPosts: 25,
      hires: 15,
      assignedTo: "Amit Patel",
    },
  ]

  const tabs = [
    { id: "all", label: "All Employers", count: employers.length },
    { id: "verified", label: "Verified", count: employers.filter((e) => e.isVerified).length },
    { id: "pending", label: "Pending Verification", count: employers.filter((e) => !e.isVerified).length },
    { id: "premium", label: "Premium", count: employers.filter((e) => e.isPremium).length },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Employers Management</h1>
          <p className="text-muted-foreground">Manage and verify employer accounts</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 bg-surface rounded-full text-xs">{tab.count}</span>
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by company name, industry..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="px-4 py-2.5 bg-surface border border-border rounded-lg text-foreground hover:bg-surface-hover transition-colors flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Employers Table */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Company</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Contact Person</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Industry</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Size</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Job Posts</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Hires</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employers.map((employer) => (
                <tr key={employer.id} className="border-t border-border hover:bg-surface-hover transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{employer.companyName}</div>
                        <div className="text-sm text-muted-foreground">{employer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-foreground">{employer.contactPerson}</div>
                    <div className="text-sm text-muted-foreground">{employer.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{employer.industry}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{employer.companySize}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      {employer.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium w-fit">
                          <XCircle className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                      {employer.isPremium && (
                        <span className="inline-flex px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium w-fit">
                          Premium
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-foreground font-medium">{employer.jobPosts}</td>
                  <td className="py-4 px-6 text-sm text-foreground font-medium">{employer.hires}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-background rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-background rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
