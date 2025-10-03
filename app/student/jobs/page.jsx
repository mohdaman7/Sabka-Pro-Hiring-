"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Bookmark,
  ExternalLink,
  Filter,
  X,
  TrendingUp,
  Star,
  Building2,
  ArrowRight,
  Sparkles,
  Code,
  Palette,
  Database,
  Laptop,
} from "lucide-react"
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
    logo: "/company1.png",
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
  const [selectedCategory, setSelectedCategory] = useState(null)

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
    { label: "Total Jobs", value: jobs.length, icon: Briefcase },
    {
      label: "New Today",
      value: jobs.filter((j) => j.posted.includes("day")).length,
      icon: TrendingUp,
    },
    {
      label: "Saved Jobs",
      value: savedJobs.length,
      icon: Star,
      hasButton: true,
    },
  ]

  const categories = [
    { name: "Development", icon: Code, color: "blue" },
    { name: "Design", icon: Palette, color: "purple" },
    { name: "Data Science", icon: Database, color: "green" },
    { name: "Product", icon: Laptop, color: "orange" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-white">
      <div className="border-b border-blue-100 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 shadow-sm backdrop-blur-sm rounded-1xl">
        <div className="max-w-7xl mx-auto py-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Find Your Dream Job</h1>
                  </div>
                </div>
                <p className="text-lg text-gray-600 ml-15">
                  Discover <span className="font-semibold text-blue-600">{jobs.length}+</span> opportunities that match
                  your skills and aspirations
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="md:hidden bg-white border-blue-200 hover:bg-blue-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                Filters
              </Button>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-blue-600 transition-colors z-10" />
                <Input
                  type="text"
                  placeholder="Search by job title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-16 pr-6 py-7 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-2xl shadow-lg shadow-blue-500/5 bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-600">Popular:</span>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border-2",
                    selectedCategory === category.name
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md",
                  )}
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group border-2 border-gray-200 hover:border-blue-400 shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{stat.label}</p>
                    <p className="text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {stat.value}
                    </p>
                  </div>
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                {stat.hasButton && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 border-2 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold bg-transparent transition-all duration-200"
                  >
                    View All Saved
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-8">
          <aside
            className={cn(
              "w-72 flex-shrink-0 space-y-6 self-start sticky top-8",
              showFilters ? "block" : "hidden md:block",
            )}
          >
            <Card className="border-2 border-gray-200 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="h-5 w-5 text-blue-600" />
                    Filters
                  </h3>
                  {showFilters && (
                    <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setShowFilters(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 block">
                      Job Type
                    </label>
                    <div className="space-y-2">
                      {["all", "full-time", "contract", "part-time"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-2",
                            selectedType === type
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 border-blue-600 scale-105"
                              : "bg-white text-gray-700 hover:bg-blue-50 border-gray-200 hover:border-blue-300",
                          )}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 block">
                      Location
                    </label>
                    <div className="space-y-2">
                      {["Remote", "Hybrid", "On-site"].map((location) => (
                        <label
                          key={location}
                          className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-blue-50 transition-colors border-2 border-transparent hover:border-blue-200"
                        >
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                          />
                          <span className="text-sm font-semibold text-gray-700">{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 block">
                      Experience Level
                    </label>
                    <div className="space-y-2">
                      {["Entry Level", "Mid Level", "Senior", "Lead"].map((level) => (
                        <label
                          key={level}
                          className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-blue-50 transition-colors border-2 border-transparent hover:border-blue-200"
                        >
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                          />
                          <span className="text-sm font-semibold text-gray-700">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-900">
                Showing <span className="text-blue-600 font-bold text-xl">{filteredJobs.length}</span> jobs
              </p>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="group border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-8 relative z-10">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 group-hover:scale-110 transition-all duration-300 shadow-md">
                          <img
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-5 w-5 text-gray-400" />
                              <p className="text-lg font-semibold text-gray-700">{job.company}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSaveJob(job.id)}
                            className={cn(
                              "flex-shrink-0 transition-all h-12 w-12 rounded-xl",
                              savedJobs.includes(job.id)
                                ? "text-blue-600 hover:text-blue-700 bg-blue-100 hover:bg-blue-200"
                                : "text-gray-400 hover:text-blue-600 hover:bg-blue-50",
                            )}
                          >
                            <Bookmark className={cn("h-6 w-6", savedJobs.includes(job.id) && "fill-current")} />
                          </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-5 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2 font-medium">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium">
                            <Briefcase className="h-4 w-4 text-gray-400" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-2 font-bold text-green-600 text-base">
                            <DollarSign className="h-5 w-5" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{job.posted}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

                        <div className="flex flex-wrap items-center gap-2 mb-5">
                          {job.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-2 border-blue-200 font-semibold text-xs px-3 py-1.5 rounded-lg"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 hover:scale-105">
                            Apply Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-blue-300 hover:bg-blue-600 hover:border-blue-600 text-gray-900 hover:text-white font-semibold px-6 py-2.5 rounded-xl bg-white transition-all duration-200 hover:scale-105"
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
              <Card className="border-2 border-gray-200 bg-white shadow-md">
                <CardContent className="p-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-base text-gray-600">
                    Try adjusting your search or filters to find more opportunities.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
