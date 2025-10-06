"use client"

import { useState } from "react"
import { 
  Search, Filter, Download, Mail, Phone, MapPin, Briefcase, 
  GraduationCap, Star, CheckCircle, XCircle, Eye, Award,
  TrendingUp, Users, Target, Calendar, ArrowUp, Sparkles , DollarSign
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function EmployerCandidates() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const candidates = [
    {
      id: 1,
      name: "Amit Sharma",
      avatar: "AS",
      email: "amit.sharma@email.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      experience: "5 years",
      currentRole: "Senior Frontend Developer",
      qualification: "B.Tech in Computer Science",
      skills: ["React", "TypeScript", "Next.js", "Node.js", "AWS"],
      matchScore: 95,
      availability: "Immediate",
      expectedSalary: "₹15-18 LPA",
      isPro: true,
      rating: 4.8,
      appliedJobs: 3,
      status: "Available"
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "PP",
      email: "priya.patel@email.com",
      phone: "+91 98765 43211",
      location: "Bangalore, Karnataka",
      experience: "3 years",
      currentRole: "UI/UX Designer",
      qualification: "B.Des in Design",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      matchScore: 88,
      availability: "2 weeks",
      expectedSalary: "₹10-12 LPA",
      isPro: true,
      rating: 4.6,
      appliedJobs: 2,
      status: "Available"
    },
    {
      id: 3,
      name: "Rahul Kumar",
      avatar: "RK",
      email: "rahul.kumar@email.com",
      phone: "+91 98765 43212",
      location: "Pune, Maharashtra",
      experience: "4 years",
      currentRole: "Backend Developer",
      qualification: "B.Tech in IT",
      skills: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes"],
      matchScore: 92,
      availability: "1 month",
      expectedSalary: "₹12-15 LPA",
      isPro: false,
      rating: 4.7,
      appliedJobs: 1,
      status: "Available"
    },
    {
      id: 4,
      name: "Sneha Desai",
      avatar: "SD",
      email: "sneha.desai@email.com",
      phone: "+91 98765 43213",
      location: "Hyderabad, Telangana",
      experience: "6 years",
      currentRole: "Product Manager",
      qualification: "MBA + B.Tech",
      skills: ["Product Strategy", "Agile", "Data Analysis", "Roadmapping"],
      matchScore: 90,
      availability: "Immediate",
      expectedSalary: "₹18-22 LPA",
      isPro: true,
      rating: 4.9,
      appliedJobs: 4,
      status: "Available"
    },

  ]

  const stats = [
    { 
      label: "Total Candidates", 
      value: candidates.length, 
      icon: Users, 
      gradient: "from-blue-500 to-blue-600",
      change: "+12 this week",
      changePositive: true
    },
    { 
      label: "Pro Members", 
      value: candidates.filter(c => c.isPro).length, 
      icon: Award, 
      gradient: "from-purple-500 to-purple-600",
      change: "Premium verified",
      changePositive: true
    },
    { 
      label: "Avg Match Score", 
      value: "91%", 
      icon: Target, 
      gradient: "from-emerald-500 to-emerald-600",
      change: "High compatibility",
      changePositive: true
    },
    { 
      label: "Active Applicants", 
      value: candidates.reduce((sum, c) => sum + c.appliedJobs, 0), 
      icon: TrendingUp, 
      gradient: "from-cyan-500 to-cyan-600",
      change: "Last 30 days",
      changePositive: true
    },
  ]

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Database</h1>
          <p className="text-gray-600">Browse and connect with verified professionals</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all font-medium flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export List
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
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
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
                <p className="text-xs text-cyan-600 font-medium">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name, role, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </button>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all group overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-5 rounded-full -mr-20 -mt-20 group-hover:opacity-10 transition-opacity"></div>
            
            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                      {candidate.avatar}
                    </div>
            
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {candidate.name}
                      </h3>
                      {candidate.isPro && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 font-semibold shadow-md">
                          <Award className="w-3 h-3 mr-1" />
                          PRO
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700 font-medium mb-2">{candidate.currentRole}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span>{candidate.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{candidate.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-lg font-bold text-gray-900">{candidate.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
              </div>

              {/* Match Score */}
              <div className="mb-4 p-4 bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50 rounded-xl border border-emerald-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Match Score</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">{candidate.matchScore}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 h-3 rounded-full transition-all shadow-md"
                    style={{ width: `${candidate.matchScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Key Skills</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 5).map((skill, idx) => (
                    <Badge key={idx} className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200 font-medium hover:from-blue-100 hover:to-cyan-100 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    Qualification
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{candidate.qualification}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Availability
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{candidate.availability}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Expected Salary
                  </p>
                  <p className="text-sm font-semibold text-emerald-600">{candidate.expectedSalary}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    Applied Jobs
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{candidate.appliedJobs} positions</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all font-medium flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Profile
                </button>
                <button className="px-4 py-3 bg-gradient-to-br from-emerald-50 to-cyan-50 hover:from-emerald-100 hover:to-cyan-100 border border-emerald-200 hover:border-emerald-300 text-emerald-700 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="px-4 py-3 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 hover:border-blue-300 text-blue-700 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center shadow-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}