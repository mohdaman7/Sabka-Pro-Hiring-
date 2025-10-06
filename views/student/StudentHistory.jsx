"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  GraduationCap,
  Video,
  CheckCircle,
  XCircle,
  Clock4,
  Download,
  Eye,
  Filter,
  Search,
  TrendingUp,
  Award,
  FileText,
  PlayCircle
} from "lucide-react"

export default function StudentHistory() {
  const [activeTab, setActiveTab] = useState("applications")
  const [dateFilter, setDateFilter] = useState("all")

  const applicationHistory = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "Tech Solutions Pvt Ltd",
      status: "Interview",
      date: "2024-01-15",
      location: "Mumbai, Maharashtra",
      salary: "₹6-8 LPA",
      type: "Full-time",
      matchScore: 95,
      timeline: [
        { action: "Applied", date: "2024-01-10", status: "completed" },
        { action: "Screening", date: "2024-01-12", status: "completed" },
        { action: "Technical Round", date: "2024-01-18", status: "upcoming" },
        { action: "HR Round", date: "2024-01-25", status: "pending" }
      ]
    },
    {
      id: 2,
      jobTitle: "React Developer",
      company: "Digital Innovations",
      status: "Applied",
      date: "2024-01-12",
      location: "Remote",
      salary: "₹8-12 LPA",
      type: "Remote",
      matchScore: 88,
      timeline: [
        { action: "Applied", date: "2024-01-12", status: "completed" },
        { action: "Screening", date: "2024-01-20", status: "upcoming" }
      ]
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "Global Tech Corp",
      status: "Rejected",
      date: "2024-01-08",
      location: "Pune, Maharashtra",
      salary: "₹10-15 LPA",
      type: "Full-time",
      matchScore: 82,
      timeline: [
        { action: "Applied", date: "2024-01-08", status: "completed" },
        { action: "Screening", date: "2024-01-10", status: "completed" },
        { action: "Technical Round", date: "2024-01-12", status: "completed" },
        { action: "Rejected", date: "2024-01-14", status: "completed" }
      ]
    }
  ]

  const courseHistory = [
    {
      id: 1,
      title: "React Fundamentals",
      category: "Web Development",
      progress: 75,
      completedLessons: 12,
      totalLessons: 16,
      lastAccessed: "2024-01-14",
      duration: "8 hours",
      certificate: true
    },
    {
      id: 2,
      title: "Node.js Backend",
      category: "Backend Development",
      progress: 45,
      completedLessons: 9,
      totalLessons: 20,
      lastAccessed: "2024-01-13",
      duration: "12 hours",
      certificate: false
    },
    {
      id: 3,
      title: "MongoDB Basics",
      category: "Database",
      progress: 90,
      completedLessons: 18,
      totalLessons: 20,
      lastAccessed: "2024-01-12",
      duration: "6 hours",
      certificate: true
    }
  ]

  const interviewHistory = [
    {
      id: 1,
      company: "Tech Solutions Pvt Ltd",
      position: "Frontend Developer",
      date: "2024-01-18",
      time: "10:00 AM",
      type: "Video Call",
      status: "Upcoming",
      duration: "45 minutes",
      interviewer: "Sarah Johnson"
    },
    {
      id: 2,
      company: "Digital Innovations",
      position: "React Developer",
      date: "2024-01-10",
      time: "2:00 PM",
      type: "In-person",
      status: "Completed",
      duration: "60 minutes",
      interviewer: "Mike Chen",
      feedback: "Positive - Technical skills were excellent"
    },
    {
      id: 3,
      company: "WebCraft Studios",
      position: "UI Developer",
      date: "2024-01-05",
      time: "11:30 AM",
      type: "Video Call",
      status: "Completed",
      duration: "30 minutes",
      interviewer: "Priya Sharma",
      feedback: "Rejected - Lack of experience in React Native"
    }
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "interview":
      case "upcoming":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "applied":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "completed":
        return "text-green-600 bg-green-50 border-green-200"
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "interview":
      case "upcoming":
        return <Clock4 className="w-4 h-4" />
      case "applied":
        return <FileText className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <Clock className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Activity History
              </h1>
              <p className="text-white/90 text-lg">Track your job applications, course progress, and interviews</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white/90 mb-2">47</div>
            <div className="text-white/70">Total Activities</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Jobs Applied", value: "23", icon: Briefcase, color: "blue", change: "+12%" },
          { label: "Courses Completed", value: "8", icon: GraduationCap, color: "emerald", change: "+5%" },
          { label: "Interviews", value: "15", icon: Calendar, color: "purple", change: "+8%" },
          { label: "Certificates", value: "5", icon: Award, color: "orange", change: "+3%" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex space-x-2 flex-1">
            {[
              { id: "applications", name: "Job Applications", icon: Briefcase },
              { id: "courses", name: "Course Progress", icon: GraduationCap },
              { id: "interviews", name: "Interviews", icon: Calendar },
              { id: "documents", name: "Documents", icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search history..."
                className="pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          {applicationHistory.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{application.jobTitle}</h3>
                    <p className="text-slate-600 text-lg mb-2">{application.company}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {application.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {application.type}
                      </span>
                      <span className="font-semibold text-slate-700">{application.salary}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full border border-green-200">
                    <span className="text-sm font-semibold text-green-700">{application.matchScore}% Match</span>
                  </div>
                  <div className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center gap-2 ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    {application.status}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Application Timeline</h4>
                <div className="flex items-center justify-between relative">
                  {application.timeline.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center flex-1 relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 ${
                        step.status === "completed" 
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/25" 
                          : step.status === "upcoming"
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                          : "bg-slate-300 text-slate-600"
                      }`}>
                        {step.status === "completed" ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : step.status === "upcoming" ? (
                          <Clock4 className="w-5 h-5" />
                        ) : (
                          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        )}
                      </div>
                      <div className="text-sm font-medium text-slate-900 mb-1">{step.action}</div>
                      <div className="text-xs text-slate-500">{step.date}</div>
                      {index < application.timeline.length - 1 && (
                        <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                          step.status === "completed" ? "bg-green-500" : "bg-slate-300"
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "courses" && (
        <div className="grid gap-6">
          {courseHistory.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{course.title}</h3>
                    <p className="text-slate-600 mb-2">{course.category}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{course.duration}</span>
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      <span>Last accessed: {course.lastAccessed}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {course.certificate && (
                    <button className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 border border-orange-200 hover:border-orange-300">
                      <Download className="w-4 h-4" />
                      Certificate
                    </button>
                  )}
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    Continue
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700 font-medium">Course Progress</span>
                  <span className="text-slate-900 font-semibold">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-emerald-500/25"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "interviews" && (
        <div className="grid gap-6">
          {interviewHistory.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{interview.position}</h3>
                    <p className="text-slate-600 text-lg mb-2">{interview.company}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {interview.date} at {interview.time}
                      </span>
                      <span>{interview.duration}</span>
                      <span>With {interview.interviewer}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center gap-2 ${getStatusColor(interview.status)}`}>
                  {getStatusIcon(interview.status)}
                  {interview.status}
                </div>
              </div>

              {interview.feedback && (
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Interview Feedback</h4>
                  <p className="text-slate-600">{interview.feedback}</p>
                </div>
              )}

              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {interview.status === "Upcoming" && (
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Join Interview
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}