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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employers Management</h1>
          <p className="text-gray-600">Manage and verify employer accounts</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{tab.count}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by company name, industry..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Employers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Company</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Contact Person</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Industry</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Size</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Job Posts</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Hires</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employers.map((employer) => (
                <tr key={employer.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{employer.companyName}</div>
                        <div className="text-sm text-gray-600">{employer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{employer.contactPerson}</div>
                    <div className="text-sm text-gray-600">{employer.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{employer.industry}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{employer.companySize}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      {employer.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium w-fit">
                          <XCircle className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                      {employer.isPremium && (
                        <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium w-fit">
                          Premium
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{employer.jobPosts}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{employer.hires}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
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
