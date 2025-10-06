"use client"

import { useState } from "react"
import { Plus, Search, MapPin, Briefcase, DollarSign, Users, TrendingUp, Calendar, AlertCircle, Eye, Edit2, Trash2, MoreVertical, ArrowUp } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function EmployerJobs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹8-12 LPA",
      applications: 45,
      views: 234,
      postedDate: "2024-01-15",
      expiryDate: "2024-02-15",
      status: "Active",
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "₹10-15 LPA",
      applications: 67,
      views: 456,
      postedDate: "2024-01-10",
      expiryDate: "2024-02-10",
      status: "Active",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Bangalore, Karnataka",
      type: "Contract",
      salary: "₹6-8 LPA",
      applications: 23,
      views: 178,
      postedDate: "2024-01-20",
      expiryDate: "2024-02-20",
      status: "Active",
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Pune, Maharashtra",
      type: "Full-time",
      salary: "₹15-20 LPA",
      applications: 12,
      views: 89,
      postedDate: "2024-01-05",
      expiryDate: "2024-01-25",
      status: "Expiring Soon",
    },
    {
      id: 5,
      title: "Data Analyst",
      department: "Analytics",
      location: "Hyderabad, Telangana",
      type: "Full-time",
      salary: "₹5-8 LPA",
      applications: 8,
      views: 45,
      postedDate: "2023-12-20",
      expiryDate: "2024-01-05",
      status: "Expired",
    },
  ]

  const stats = [
    { 
      label: "Total Jobs", 
      value: jobs.length, 
      icon: Briefcase, 
      gradient: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+2 this week",
      changePositive: true
    },
    { 
      label: "Active Jobs", 
      value: jobs.filter((j) => j.status === "Active").length, 
      icon: TrendingUp, 
      gradient: "from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      change: "75% of total",
      changePositive: true
    },
    { 
      label: "Total Applications", 
      value: jobs.reduce((sum, j) => sum + j.applications, 0), 
      icon: Users, 
      gradient: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      iconColor: "text-purple-600",
      change: "+23 new",
      changePositive: true
    },
    { 
      label: "Total Views", 
      value: jobs.reduce((sum, j) => sum + j.views, 0), 
      icon: Eye, 
      gradient: "from-cyan-500 to-cyan-600",
      lightBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
      change: "+156 this week",
      changePositive: true
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch = job.title.toLowerCase().includes(q) || job.department.toLowerCase().includes(q)
    const matchesFilter = filterStatus === "all" || job.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const statusBadgeClasses = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700 border-emerald-300"
      case "Expiring Soon":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "Expired":
        return "bg-gray-200 text-gray-700 border-gray-400"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getJobCardStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-gradient-to-br from-white via-emerald-50/30 to-white border-emerald-200"
      case "Expiring Soon":
        return "bg-gradient-to-br from-white via-orange-50/40 to-white border-orange-200"
      case "Expired":
        return "bg-gradient-to-br from-white via-gray-100/40 to-white border-gray-300"
      default:
        return "bg-white border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
            <p className="text-sm text-gray-600">Manage and track all your job postings</p>
          </div>
          <button className="px-6 py-2 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Post New Job
          </button>
        </div>
      </div>

      {/* Stats Grid - Enhanced UI */}
      <div className="p-6 pt-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:border-blue-300 overflow-hidden group"
            >
              {/* Decorative gradient background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  {stat.changePositive && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
                      <ArrowUp className="w-3 h-3" />
                      <span>Live</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-cyan-600 font-medium">{stat.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6 pt-2">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by job title or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border rounded-xl bg-white text-gray-900 border-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expiring soon">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="p-6 pt-2 space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className={`group rounded-xl border p-6 shadow-md hover:shadow-xl transition-all ${getJobCardStyle(job.status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <Badge className={`border ${statusBadgeClasses(job.status)} font-semibold shadow-sm`}>{job.status}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4 font-medium">{job.department}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-emerald-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-purple-200 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-sm">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{job.applications}</p>
                      <p className="text-xs text-gray-600">Applications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-cyan-200 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-sm">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{job.views}</p>
                      <p className="text-xs text-gray-600">Views</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-4">
                <button className="p-2.5 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg transition-all border border-transparent hover:border-blue-200 shadow-sm hover:shadow">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button className="p-2.5 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-all border border-transparent hover:border-red-200 shadow-sm hover:shadow">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button className="p-2.5 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-all border border-transparent hover:border-gray-300 shadow-sm hover:shadow">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {job.status === "Expiring Soon" && (
              <div className="flex items-center gap-2 p-3 bg-orange-100 border border-orange-300 rounded-lg mt-4">
                <AlertCircle className="w-5 h-5 text-orange-700 flex-shrink-0" />
                <p className="text-sm text-orange-700 font-semibold">
                  This job expires on {new Date(job.expiryDate).toLocaleDateString()}. Renew to keep it active.
                </p>
              </div>
            )}
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center shadow-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button className="px-6 py-2 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg hover:scale-105 inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Post Your First Job
            </button>
          </div>
        )}
      </div>
    </div>
  )
}