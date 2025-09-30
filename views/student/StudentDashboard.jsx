"use client"

import { Briefcase, GraduationCap, Calendar, TrendingUp, ArrowRight, Clock, MapPin } from "lucide-react"

export default function StudentDashboard() {
  const stats = [
    { label: "Jobs Applied", value: "12", icon: Briefcase, color: "text-primary", bgColor: "bg-primary/10" },
    { label: "Courses Enrolled", value: "3", icon: GraduationCap, color: "text-accent", bgColor: "bg-accent/10" },
    { label: "Interviews Scheduled", value: "2", icon: Calendar, color: "text-secondary", bgColor: "bg-secondary/10" },
    { label: "Profile Views", value: "45", icon: TrendingUp, color: "text-accent", bgColor: "bg-accent/10" },
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
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Amit!</h1>
        <p className="text-white/90 mb-6">You have 2 upcoming interviews and 5 new job matches</p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-primary hover:bg-white/90 rounded-lg transition-colors font-medium">
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
            <div key={index} className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recommended Jobs */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Recommended Jobs</h2>
            <a href="/student/jobs" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
                    <span className="text-xs font-medium text-accent">{job.matchScore}% Match</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
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
                  <span className="text-sm font-semibold text-foreground">{job.salary}</span>
                  <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors text-sm font-medium">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Upcoming Interviews</h2>
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{interview.position}</h3>
                    <p className="text-xs text-muted-foreground truncate">{interview.company}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="text-foreground font-medium">{interview.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="text-foreground font-medium">{interview.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs font-medium">
                      {interview.type}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-surface-hover hover:bg-background text-foreground rounded-lg transition-colors text-sm font-medium">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Course Progress</h2>
          <a href="/student/courses" className="text-sm text-primary hover:underline flex items-center gap-1">
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
            <div key={index} className="p-4 bg-background rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{course.lessons}</p>
              <div className="w-full bg-surface-hover rounded-full h-2 mb-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-accent font-medium">{course.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
