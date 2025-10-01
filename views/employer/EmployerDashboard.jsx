"use client"

import { Briefcase, Users, FileText, TrendingUp, MapPin, Clock, DollarSign } from "lucide-react"

export default function EmployerDashboard() {
  const stats = [
    {
      label: "Active Job Posts",
      value: "12",
      icon: Briefcase,
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "+2 this week",
    },
    {
      label: "Total Applications",
      value: "156",
      icon: FileText,
      color: "text-accent",
      bgColor: "bg-accent/10",
      change: "+23 new",
    },
    {
      label: "Shortlisted",
      value: "34",
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      change: "12 pending review",
    },
    {
      label: "Hired",
      value: "8",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
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
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-[#0f172a] rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Tech Solutions!</h1>
        <p className="text-white/90 mb-6">You have 23 new applications and 12 active job postings</p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-primary hover:bg-white/90 rounded-lg transition-colors font-medium">
            Post New Job
          </button>
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium border border-white/20">
            Browse Candidates
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
              <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-accent">{stat.change}</div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Jobs */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Active Job Postings</h2>
            <a href="/employer/jobs" className="text-sm text-primary hover:underline">
              View All
            </a>
          </div>
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>
                      <span className="font-semibold text-foreground">{job.applications}</span> applications
                    </span>
                    <span>
                      <span className="font-semibold text-foreground">{job.views}</span> views
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {job.postedDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Recent Applications</h2>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">{application.candidateName.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{application.candidateName}</h3>
                      <p className="text-xs text-muted-foreground">{application.position}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Match:</span>
                    <span className="text-xs font-semibold text-accent">{application.matchScore}%</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      application.status === "New"
                        ? "bg-secondary/10 text-secondary"
                        : application.status === "Shortlisted"
                          ? "bg-accent/10 text-accent"
                          : "bg-primary/10 text-primary"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{application.appliedDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-xl border border-border p-6 hover:border-primary/50 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Post a New Job</h3>
          <p className="text-sm text-muted-foreground">Create and publish a new job opening</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6 hover:border-primary/50 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Browse Candidates</h3>
          <p className="text-sm text-muted-foreground">Search verified candidate profiles</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6 hover:border-primary/50 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Review Applications</h3>
          <p className="text-sm text-muted-foreground">Manage pending applications</p>
        </div>
      </div>
    </div>
  )
}
