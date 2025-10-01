"use client"

import { Briefcase, GraduationCap, Calendar, TrendingUp, ArrowRight, Clock, MapPin } from "lucide-react"

export default function StudentDashboard() {
  const stats = [
    { label: "Jobs Applied", value: "12", icon: Briefcase, color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Courses Enrolled", value: "3", icon: GraduationCap, color: "text-cyan-600", bgColor: "bg-cyan-50" },
    { label: "Interviews Scheduled", value: "2", icon: Calendar, color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Profile Views", value: "45", icon: TrendingUp, color: "text-purple-600", bgColor: "bg-purple-50" },
  ]

  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹6-8 LPA",
      postedDate: "2 days ago",
      matchScore: 95,
    },
    {
      id: 2,
      title: "React Developer",
      company: "Digital Innovations",
      location: "Bangalore, Karnataka",
      type: "Remote",
      salary: "₹8-12 LPA",
      postedDate: "1 week ago",
      matchScore: 88,
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Global Tech Corp",
      location: "Pune, Maharashtra",
      type: "Full-time",
      salary: "₹10-15 LPA",
      postedDate: "3 days ago",
      matchScore: 82,
    },
  ]

  const upcomingInterviews = [
    {
      id: 1,
      company: "Tech Solutions Pvt Ltd",
      position: "Frontend Developer",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Video Call",
    },
    {
      id: 2,
      company: "Digital Innovations",
      position: "React Developer",
      date: "Jan 20, 2024",
      time: "2:00 PM",
      type: "In-person",
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Amit!</h1>
        <p className="text-white/90 mb-6">You have 2 upcoming interviews and 5 new job matches</p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-slate-900 hover:bg-slate-50 rounded-lg transition-colors font-medium shadow-sm">
            Browse Jobs
          </button>
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium border border-white/20">
            Update Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recommended Jobs */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Recommended Jobs</h2>
            <a href="/student/jobs" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{job.title}</h3>
                    <p className="text-sm text-slate-600">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
                    <span className="text-xs font-medium text-green-700">{job.matchScore}% Match</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.postedDate}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">{job.salary}</span>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Upcoming Interviews</h2>
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{interview.position}</h3>
                    <p className="text-xs text-slate-600 truncate">{interview.company}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Date:</span>
                    <span className="text-slate-900 font-medium">{interview.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Time:</span>
                    <span className="text-slate-900 font-medium">{interview.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Type:</span>
                    <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded text-xs font-medium">
                      {interview.type}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg transition-colors text-sm font-medium border border-slate-200">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Course Progress</h2>
          <a href="/student/courses" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "React Fundamentals", progress: 75, lessons: "12/16 lessons" },
            { title: "Node.js Backend", progress: 45, lessons: "9/20 lessons" },
            { title: "MongoDB Basics", progress: 90, lessons: "18/20 lessons" },
          ].map((course, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
              <p className="text-sm text-slate-600 mb-3">{course.lessons}</p>
              <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-600 font-medium">{course.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
