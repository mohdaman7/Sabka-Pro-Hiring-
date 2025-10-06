"use client"

import { useState } from "react"
import { Search, MapPin, Briefcase, DollarSign, Clock, Bookmark, ExternalLink, Filter, X, Star, Users, Eye, ChevronDown, Building2, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useSelector, useDispatch } from "react-redux"
import { 
  selectFilteredJobs, 
  selectJobStats, 
  toggleSaveJob, 
  setSearchQuery, 
  setSelectedType,
  clearFilters
} from "@/src/store/slices/studentSlice/jobsSlice"

export default function JobListingsPage() {
  const dispatch = useDispatch()
  
  // Get data from Redux store
  const filteredJobs = useSelector(selectFilteredJobs)
  const stats = useSelector(selectJobStats)
  const jobsState = useSelector(state => state.jobs)
  
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")

  // Use Redux actions instead of local state
  const handleToggleSaveJob = (jobId) => {
    dispatch(toggleSaveJob(jobId))
  }

  const handleSearchChange = (value) => {
    dispatch(setSearchQuery(value))
  }

  const handleTypeChange = (type) => {
    dispatch(setSelectedType(type))
  }

  const quickFilters = [
    { id: "all", label: "All Jobs", count: stats[0]?.value || 0, icon: Briefcase },
    { id: "remote", label: "Remote", count: filteredJobs.filter(job => job.location.toLowerCase().includes("remote")).length, icon: MapPin },
    { id: "full-time", label: "Full Time", count: filteredJobs.filter(job => job.type.toLowerCase() === "full-time").length, icon: Clock },
    { id: "high-salary", label: "High Salary", count: filteredJobs.filter(job => parseInt(job.salary.replace(/[^\d]/g, '')) > 120000).length, icon: DollarSign },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100">
      {/* Enhanced Professional Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            {/* Main Heading */}
            <div className="space-y-4">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-4 py-2 rounded-full text-sm font-medium mb-4">
                🚀 500+ Companies Hiring
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Find Your 
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Dream Job </span>
                Today
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Connect with top companies and discover opportunities that match your skills, passion, and career goals
              </p>
            </div>

            {/* Enhanced Search Bar with Advanced Options */}
            <div className="max-w-4xl mx-auto mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
                    <Input
                      type="text"
                      placeholder="Job title, keywords, or company..."
                      value={jobsState.filters.searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-12 pr-4 py-4 h-14 text-lg border-0 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-white/70 focus:bg-white/10 focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-8 py-4 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Search Jobs
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/30 bg-white/10 hover:bg-white/20 text-white px-6 py-4 h-14 font-medium backdrop-blur-sm"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-5 w-5 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
                
                {/* Quick Search Suggestions */}
                <div className="flex flex-wrap gap-2 mt-3 px-2">
                  <span className="text-white/70 text-sm">Trending:</span>
                  {["React Developer", "Data Scientist", "Product Manager", "UX Designer", "DevOps Engineer"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSearchChange(tag)}
                      className="text-white/90 hover:text-white text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-all duration-200 backdrop-blur-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">500+ Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-400" />
                <span className="text-sm">95% Match Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                <span className="text-sm">Instant Applications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current"></path>
          </svg>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
            <div className="flex items-center gap-6">
              {quickFilters.map((filter) => {
                const Icon = filter.icon
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 border min-w-[140px]",
                      activeFilter === filter.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-transparent transform scale-105"
                        : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-md hover:bg-slate-50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{filter.label}</span>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-semibold min-w-[32px] text-center",
                      activeFilter === filter.id 
                        ? "bg-white/20 text-white" 
                        : "bg-slate-100 text-slate-600"
                    )}>
                      {filter.count}
                    </span>
                  </button>
                )
              })}
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              
              <Button
                variant="outline"
                className="border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium hidden md:flex"
                onClick={() => dispatch(clearFilters())}
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  stat.gradient,
                )}
              />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div
                    className={cn(
                      "h-14 w-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
                      stat.gradient,
                    )}
                  >
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={cn(
                      "h-2 rounded-full transition-all duration-1000",
                      stat.gradient.split(' ')[0] === 'from-purple-500' ? 'bg-purple-500' :
                      stat.gradient.split(' ')[0] === 'from-blue-500' ? 'bg-blue-500' : 'bg-pink-500'
                    )}
                    style={{ width: `${(stat.value / Math.max(...stats.map(s => s.value))) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Enhanced Filters Sidebar */}
          <aside className={cn("w-80 flex-shrink-0 space-y-6 transition-all duration-300", showFilters ? "block" : "hidden md:block")}>
            <Card className="border-slate-200 shadow-lg bg-white sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-slate-900 text-lg">Filters & Preferences</h3>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-slate-500 hover:text-slate-700 md:hidden"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 border-blue-200"
                      onClick={() => dispatch(clearFilters())}
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Job Type Filter */}
                  <div>
                    <label className="text-sm font-semibold text-slate-900 mb-4 block flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                      Job Type
                    </label>
                    <div className="space-y-2">
                      {["all", "full-time", "contract", "part-time", "internship"].map((type) => (
                        <button
                          key={type}
                          onClick={() => handleTypeChange(type)}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border hover:shadow-sm",
                            jobsState.filters.selectedType === type
                              ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="capitalize">
                              {type.replace("-", " ")}
                            </span>
                            {jobsState.filters.selectedType === type && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="text-sm font-semibold text-slate-900 mb-4 block flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      Location Preference
                    </label>
                    <div className="space-y-3">
                      {["Remote", "Hybrid", "On-site", "Mumbai", "Bangalore", "Delhi", "Pune", "Chennai"].map((location) => (
                        <label key={location} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700 group-hover:text-slate-900 flex items-center gap-2">
                            {location}
                            {["Remote", "Hybrid"].includes(location) && (
                              <Badge variant="outline" className="text-xs px-2 py-0">Popular</Badge>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="text-sm font-semibold text-slate-900 mb-4 block flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-600" />
                      Experience Level
                    </label>
                    <div className="space-y-3">
                      {[
                        { level: "Entry Level", desc: "0-2 years" },
                        { level: "Mid Level", desc: "2-5 years" },
                        { level: "Senior", desc: "5-8 years" },
                        { level: "Lead", desc: "8+ years" },
                        { level: "Executive", desc: "Director & above" }
                      ].map(({ level, desc }) => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <span className="text-sm text-slate-700 group-hover:text-slate-900 block">{level}</span>
                            <span className="text-xs text-slate-500">{desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <label className="text-sm font-semibold text-slate-900 mb-4 block flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Salary Range
                    </label>
                    <div className="space-y-3">
                      {[
                        "₹0-6 LPA",
                        "₹6-12 LPA", 
                        "₹12-20 LPA",
                        "₹20-35 LPA",
                        "₹35+ LPA"
                      ].map((range) => (
                        <label key={range} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700 group-hover:text-slate-900">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </aside>

          {/* Enhanced Job Listings */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Showing <span className="font-semibold text-slate-900">{filteredJobs.length}</span> jobs
                  {jobsState.filters.searchQuery && (
                    <span> for "<span className="font-semibold text-blue-600">{jobsState.filters.searchQuery}</span>"</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Eye className="h-4 w-4" />
                <span className="text-sm">Last updated: Just now</span>
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="group relative overflow-hidden border-slate-200 bg-white hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Premium badge for high salary */}
                  {parseInt(job.salary.replace(/[^\d]/g, '')) > 140000 && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg px-3 py-1">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Premium
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Enhanced Company Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                          <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-inner">
                            <img
                              src={job.logo || "/placeholder.svg"}
                              alt={job.company}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {job.title}
                              </h3>
                              {job.posted.includes("day") && parseInt(job.posted) <= 1 && (
                                <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-lg font-semibold text-blue-600 mb-1">{job.company}</p>
                            
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-slate-600">
                              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                <span className="font-medium">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                                <Briefcase className="h-4 w-4 text-slate-500" />
                                <span className="font-medium capitalize">{job.type.replace("-", " ")}</span>
                              </div>
                              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                                <DollarSign className="h-4 w-4 text-slate-500" />
                                <span className="font-semibold text-green-600">{job.salary}</span>
                              </div>
                              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                                <Clock className="h-4 w-4 text-slate-500" />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleSaveJob(job.id)}
                            className={cn(
                              "flex-shrink-0 transition-all duration-300 hover:scale-110 border",
                              job.saved
                                ? "text-amber-500 hover:text-amber-600 bg-amber-50 border-amber-200"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 border-slate-200",
                            )}
                          >
                            <Bookmark className={cn("h-5 w-5", job.saved && "fill-current")} />
                          </Button>
                        </div>

                        <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

                        <div className="flex flex-wrap items-center gap-2 mb-5">
                          {job.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 font-medium hover:scale-105 transition-transform cursor-pointer"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-2 font-semibold">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Apply Now
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 hover:scale-105 transition-all duration-300 font-medium"
                          >
                            Save for Later
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
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
              <Card className="border-slate-200 bg-white shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Search className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">No jobs found</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    We couldn't find any jobs matching your criteria. Try adjusting your search or filters to discover more opportunities.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button 
                      onClick={() => {
                        dispatch(clearFilters())
                        setActiveFilter("all")
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 font-semibold"
                    >
                      Clear Filters
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      Browse All Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}