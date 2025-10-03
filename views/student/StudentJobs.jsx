"use client"

import { useState } from "react"
import { Search, MapPin, Briefcase, DollarSign, Clock, Bookmark, ExternalLink, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"


const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    logo: "/company1.png",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    description: "We're looking for an experienced frontend developer to join our growing team.",
    saved: false,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateLabs",
    logo: "/company2.jpg",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130k - $180k",
    posted: "1 week ago",
    skills: ["Node.js", "React", "PostgreSQL", "AWS"],
    description: "Join our team building cutting-edge SaaS products for enterprise clients.",
    saved: true,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignHub",
    logo: "/company3.jpg",
    location: "Hybrid - New York",
    type: "Full-time",
    salary: "$90k - $130k",
    posted: "3 days ago",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    description: "Create beautiful and intuitive user experiences for our mobile and web applications.",
    saved: false,
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "CloudScale Inc",
    logo: "/company4.jpg",
    location: "Remote",
    type: "Contract",
    salary: "$100k - $140k",
    posted: "5 days ago",
    skills: ["Python", "Django", "Docker", "Kubernetes"],
    description: "Build scalable backend systems for our cloud infrastructure platform.",
    saved: false,
  },
  {
    id: 5,
    title: "Product Manager",
    company: "StartupXYZ",
    logo: "/company1.jpg",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $150k",
    posted: "1 day ago",
    skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
    description: "Lead product development and strategy for our B2B SaaS platform.",
    saved: true,
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "SecureCloud",
    logo: "/company3.jpg",
    location: "Remote",
    type: "Full-time",
    salary: "$125k - $165k",
    posted: "4 days ago",
    skills: ["AWS", "Terraform", "CI/CD", "Monitoring"],
    description: "Manage and optimize our cloud infrastructure and deployment pipelines.",
    saved: false,
  },
]

export default function JobListingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [savedJobs, setSavedJobs] = useState(jobs.filter((job) => job.saved).map((job) => job.id))
  const [showFilters, setShowFilters] = useState(false)

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === "all" || job.type.toLowerCase() === selectedType.toLowerCase()

    return matchesSearch && matchesType
  })

  const stats = [
    { label: "Total Jobs", value: jobs.length, gradient: "from-purple-500 to-blue-500" },
    {
      label: "New Today",
      value: jobs.filter((j) => j.posted.includes("day")).length,
      gradient: "from-blue-500 to-cyan-500",
    },
    { label: "Saved Jobs", value: savedJobs.length, gradient: "from-pink-500 to-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 text-balance">Find Your Dream Job</h1>
                <p className="text-slate-600 mt-1">Discover opportunities that match your skills and aspirations</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="md:hidden bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by job title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base border-slate-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity",
                  stat.gradient,
                )}
              />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div
                    className={cn(
                      "h-16 w-16 rounded-2xl bg-gradient-to-br flex items-center justify-center",
                      stat.gradient,
                    )}
                  >
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={cn("w-64 flex-shrink-0 space-y-6", showFilters ? "block" : "hidden md:block")}>
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Filters</h3>
                  {showFilters && (
                    <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setShowFilters(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block">Job Type</label>
                    <div className="space-y-2">
                      {["all", "full-time", "contract", "part-time"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={cn(
                            "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                            selectedType === type
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                              : "bg-slate-50 text-slate-700 hover:bg-slate-100",
                          )}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block">Location</label>
                    <div className="space-y-2">
                      {["Remote", "Hybrid", "On-site"].map((location) => (
                        <label key={location} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-slate-700 group-hover:text-slate-900">{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block">Experience Level</label>
                    <div className="space-y-2">
                      {["Entry Level", "Mid Level", "Senior", "Lead"].map((level) => (
                        <label key={level} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-slate-700 group-hover:text-slate-900">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filteredJobs.length}</span> jobs
              </p>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="group relative overflow-hidden border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300"
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  <div className="absolute inset-[1px] bg-white rounded-lg" />

                  <CardContent className="p-6 relative">
                    <div className="flex gap-6">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center overflow-hidden shadow-sm">
                          <img
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                              {job.title}
                            </h3>
                            <p className="text-base font-medium text-slate-700">{job.company}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSaveJob(job.id)}
                            className={cn(
                              "flex-shrink-0 transition-colors",
                              savedJobs.includes(job.id)
                                ? "text-purple-600 hover:text-purple-700"
                                : "text-slate-400 hover:text-slate-600",
                            )}
                          >
                            <Bookmark className={cn("h-5 w-5", savedJobs.includes(job.id) && "fill-current")} />
                          </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-semibold text-slate-900">{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{job.posted}</span>
                          </div>
                        </div>

                        <p className="text-slate-600 mb-4 line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {job.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 font-medium"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all">
                            Apply Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="border-slate-300 hover:border-purple-500 hover:text-purple-600 bg-transparent"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <Card className="border-slate-200">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
                  <p className="text-slate-600">Try adjusting your search or filters to find more opportunities.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
