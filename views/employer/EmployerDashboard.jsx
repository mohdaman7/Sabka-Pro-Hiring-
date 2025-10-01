"use client"

import { Briefcase, Users, FileText, TrendingUp, MapPin, Clock, DollarSign } from "lucide-react"

export default function EmployerDashboard() {
  const stats = [
    {
      label: "Active Job Posts",
      value: "12",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+2 this week",
    },
    {
      label: "Total Applications",
      value: "156",
      icon: FileText,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      change: "+23 new",
    },
    {
      label: "Shortlisted",
      value: "34",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "12 pending review",
    },
    {
      label: "Hired",
      value: "8",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      change: "This month",
    },
  ]

  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹8-12 LPA",
      applications: 45,
      views: 234,
      postedDate: "5 days ago",
      status: "Active",
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Remote",
      type: "Full-time",
      salary: "₹10-15 LPA",
      applications: 67,
      views: 456,
      postedDate: "2 weeks ago",
      status: "Active",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Bangalore, Karnataka",
      type: "Contract",
      salary: "₹6-8 LPA",
      applications: 23,
      views: 178,
      postedDate: "1 week ago",
      status: "Active",
    },
  ]

  const recentApplications = [
    {
      id: 1,
      candidateName: "Amit Sharma",
      position: "Senior Frontend Developer",
      appliedDate: "2 hours ago",
      matchScore: 95,
      status: "New",
    },
    {
      id: 2,
      candidateName: "Priya Patel",
      position: "Backend Developer",
      appliedDate: "5 hours ago",
      matchScore: 88,
      status: "Under Review",
    },
    {
      id: 3,
      candidateName: "Rahul Kumar",
      position: "UI/UX Designer",
      appliedDate: "1 day ago",
      matchScore: 92,
      status: "Shortlisted",
    },
    {
      id: 4,
      candidateName: "Sneha Desai",
      position: "Senior Frontend Developer",
      appliedDate: "2 days ago",
      matchScore: 85,
      status: "New",
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Tech Solutions!</h1>
        <p className="text-white/90 mb-6">You have 23 new applications and 12 active job postings</p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-blue-600 hover:bg-gray-50 rounded-lg transition-all font-medium shadow-md hover:shadow-lg hover:scale-105">
            Post New Job
          </button>
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-medium border border-white/20 backdrop-blur-sm hover:scale-105">
            Browse Candidates
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 hover:border-blue-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center shadow-sm`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className="text-xs text-cyan-600 font-medium">{stat.change}</div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Jobs */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Job Postings</h2>
            <a href="/employer/jobs" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
              View All
            </a>
          </div>
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>
                      <span className="font-semibold text-gray-900">{job.applications}</span> applications
                    </span>
                    <span>
                      <span className="font-semibold text-gray-900">{job.views}</span> views
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {job.postedDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Applications</h2>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white font-semibold text-sm">{application.candidateName.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{application.candidateName}</h3>
                      <p className="text-xs text-gray-600">{application.position}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Match:</span>
                    <span className="text-xs font-semibold text-cyan-600">{application.matchScore}%</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      application.status === "New"
                        ? "bg-blue-50 text-blue-600"
                        : application.status === "Shortlisted"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-purple-50 text-purple-600"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{application.appliedDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Post a New Job</h3>
          <p className="text-sm text-gray-600">Create and publish a new job opening</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Browse Candidates</h3>
          <p className="text-sm text-gray-600">Search verified candidate profiles</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-400 hover:shadow-xl transition-all cursor-pointer hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Review Applications</h3>
          <p className="text-sm text-gray-600">Manage pending applications</p>
        </div>
      </div>
    </div>
  )
}
