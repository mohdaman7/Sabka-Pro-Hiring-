"use client"

import { useState } from "react"
import { 
  Headphones, MessageCircle, Mail, Phone, Clock, Send, 
  Search, FileText, HelpCircle, Zap, CheckCircle, 
  AlertCircle, Video, BookOpen, ArrowRight, Briefcase,
  ExternalLink, Download, Calendar, Users
} from "lucide-react"

export default function StudentSupport() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [messageText, setMessageText] = useState("")
  const [activeTab, setActiveTab] = useState("help")

  const supportCategories = [
    { id: "all", name: "All Topics", icon: HelpCircle, color: "blue", gradient: "from-blue-500 to-cyan-500" },
    { id: "account", name: "Account Issues", icon: AlertCircle, color: "orange", gradient: "from-orange-500 to-amber-500" },
    { id: "jobs", name: "Job Applications", icon: Briefcase, color: "purple", gradient: "from-purple-500 to-pink-500" },
    { id: "courses", name: "Courses", icon: BookOpen, color: "emerald", gradient: "from-emerald-500 to-teal-500" },
    { id: "technical", name: "Technical Support", icon: Zap, color: "cyan", gradient: "from-cyan-500 to-blue-500" },
  ]

  const faqs = [
    {
      question: "How do I apply for jobs?",
      answer: "Go to Job Listings, browse available positions, and click 'Apply Now' on jobs that interest you.",
      category: "jobs"
    },
    {
      question: "How can I upgrade to Pro plan?",
      answer: "Navigate to 'Upgrade to Pro' in the sidebar and choose your preferred payment method.",
      category: "account"
    },
    {
      question: "How do I access my enrolled courses?",
      answer: "Visit the Training Courses section to view and access all your enrolled courses.",
      category: "courses"
    },
    {
      question: "Can I edit my profile information?",
      answer: "Yes, go to My Profile and click the edit button to update your details anytime.",
      category: "account"
    },
    {
      question: "How do I schedule an interview?",
      answer: "Check your Interviews section for upcoming schedules and manage your interview slots.",
      category: "jobs"
    },
  ]

  const recentTickets = [
    {
      id: "TICK-001",
      subject: "Unable to upload video resume",
      status: "In Progress",
      date: "2 hours ago",
      priority: "High",
      category: "Technical Support"
    },
    {
      id: "TICK-002",
      subject: "Payment confirmation pending",
      status: "Resolved",
      date: "Yesterday",
      priority: "Medium",
      category: "Account Issues"
    },
    {
      id: "TICK-003",
      subject: "Course access not working",
      status: "Open",
      date: "3 days ago",
      priority: "High",
      category: "Courses"
    },
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "support@sabkapro.com",
      subtitle: "Response within 24 hours",
      gradient: "from-blue-500 to-cyan-500",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+91 98765 43210",
      subtitle: "Mon-Sat, 9 AM - 6 PM",
      gradient: "from-purple-500 to-pink-500",
      action: "Call Now"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      subtitle: "Available now",
      gradient: "from-emerald-500 to-teal-500",
      action: "Start Chat"
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Schedule a video call",
      subtitle: "Book appointment",
      gradient: "from-orange-500 to-red-500",
      action: "Schedule"
    },
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="relative flex items-center gap-6">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <Headphones className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Support Center
            </h1>
            <p className="text-white/90 text-lg">We're here to help you succeed in your career journey</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-md">
        <div className="flex space-x-2">
          {[
            { id: "help", name: "Get Help", icon: HelpCircle },
            { id: "tickets", name: "My Tickets", icon: FileText },
            { id: "resources", name: "Resources", icon: BookOpen }
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
      </div>

      {activeTab === "help" && (
        <>
          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{method.title}</h3>
                  <p className="text-lg font-semibold text-slate-700 mb-2">{method.description}</p>
                  <p className="text-sm text-slate-500 mb-5">{method.subtitle}</p>
                  <button className={`w-full px-5 py-3 bg-gradient-to-r ${method.gradient} text-white rounded-xl font-semibold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}>
                    {method.action}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - FAQs */}
            <div className="lg:col-span-2 space-y-8">
              {/* Search and Filter */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <div className="flex flex-col gap-5">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search for help..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg shadow-sm"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {supportCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-3 border-2 ${
                          selectedCategory === category.id
                            ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg border-transparent`
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQs List */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <HelpCircle className="w-7 h-7 text-blue-600" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    >
                      <h4 className="font-semibold text-slate-900 text-lg mb-3 flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        {faq.question}
                      </h4>
                      <p className="text-slate-600 ml-9">{faq.answer}</p>
                    </div>
                  ))}

                  {filteredFaqs.length === 0 && (
                    <div className="text-center py-12">
                      <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 text-lg">No FAQs found. Try a different search or category.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Recent Tickets & Resources */}
            <div className="space-y-8">
              {/* Recent Tickets */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-orange-600" />
                  Recent Tickets
                </h3>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 bg-gradient-to-br from-slate-50 to-orange-50/20 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-mono text-slate-500 font-semibold">{ticket.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ticket.status === "Resolved" 
                            ? "bg-green-100 text-green-700 border border-green-200" 
                            : ticket.status === "In Progress"
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "bg-orange-100 text-orange-700 border border-orange-200"
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                        {ticket.subject}
                      </h4>
                      <p className="text-sm text-slate-500 mb-3">{ticket.category}</p>
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {ticket.date}
                        </span>
                        <span className={`font-semibold px-2 py-1 rounded-lg ${
                          ticket.priority === "High" 
                            ? "bg-red-50 text-red-600 border border-red-200" 
                            : "bg-slate-50 text-slate-600 border border-slate-200"
                        }`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300">
                  View All Tickets
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Help Resources */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 relative">
                  <BookOpen className="w-6 h-6" />
                  Help Resources
                </h3>
                <div className="space-y-3 relative">
                  {[
                    { name: "User Guide", icon: Download },
                    { name: "Video Tutorials", icon: Video },
                    { name: "Community Forum", icon: Users }
                  ].map((resource, index) => (
                    <button
                      key={index}
                      className="w-full px-5 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-left transition-all duration-300 border border-white/20 hover:border-white/30 flex items-center justify-between group"
                    >
                      <span className="font-semibold">{resource.name}</span>
                      <div className="flex items-center gap-2">
                        <resource.icon className="w-4 h-4 opacity-70" />
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Tip */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">Quick Tip</h4>
                    <p className="text-slate-700">
                      Pro members get priority support with faster response times and dedicated assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "tickets" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Support Tickets</h2>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/20 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      ticket.status === "Resolved" ? "bg-green-500" :
                      ticket.status === "In Progress" ? "bg-blue-500" : "bg-orange-500"
                    }`}></div>
                    <span className="font-mono text-sm font-semibold text-slate-600">{ticket.id}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    ticket.status === "Resolved" 
                      ? "bg-green-100 text-green-700" 
                      : ticket.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{ticket.subject}</h3>
                <p className="text-slate-600 mb-4">{ticket.category}</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Created {ticket.date}
                  </span>
                  <span className={`font-semibold ${
                    ticket.priority === "High" ? "text-red-600" : "text-slate-600"
                  }`}>
                    {ticket.priority} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}