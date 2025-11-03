"use client";

import { useEffect, useState } from "react";
import {
  Headphones,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Send,
  Search,
  FileText,
  HelpCircle,
  Zap,
  CheckCircle,
  AlertCircle,
  Video,
  BookOpen,
  ArrowRight,
  Briefcase,
  ExternalLink,
  Download,
  Calendar,
  Users,
  Sparkles,
  TrendingUp,
  Award,
  Star,
  ChevronDown,
  X,
} from "lucide-react";

export default function StudentSupport() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("help");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "account",
    priority: "medium",
  });

  async function loadTickets() {
    try {
      setLoading(true);
      setError("");
      const { supportService } = await import("@/services/supportService");
      const res = await supportService.listMyTickets();
      setTickets(res?.data || []);
    } catch (e) {
      setError(
        e?.response?.data?.message || e?.message || "Failed to load tickets"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  const supportCategories = [
    { id: "all", name: "All Topics", icon: HelpCircle, count: 15 },
    { id: "account", name: "Account Issues", icon: AlertCircle, count: 5 },
    { id: "jobs", name: "Job Applications", icon: Briefcase, count: 4 },
    { id: "courses", name: "Courses", icon: BookOpen, count: 3 },
    { id: "technical", name: "Technical Support", icon: Zap, count: 3 },
  ];

  const faqs = [
    {
      question: "How do I apply for jobs?",
      answer:
        "Go to Job Listings, browse available positions, and click 'Apply Now' on jobs that interest you. You can filter by location, salary, and experience level to find the perfect match.",
      category: "jobs",
      helpful: 245,
    },
    {
      question: "How can I upgrade to Pro plan?",
      answer:
        "Navigate to 'Upgrade to Pro' in the sidebar and choose your preferred payment method. Pro members enjoy priority support, advanced features, and exclusive job opportunities.",
      category: "account",
      helpful: 189,
    },
    {
      question: "How do I access my enrolled courses?",
      answer:
        "Visit the Training Courses section to view and access all your enrolled courses. Track your progress, download certificates, and access course materials anytime.",
      category: "courses",
      helpful: 156,
    },
    {
      question: "Can I edit my profile information?",
      answer:
        "Yes, go to My Profile and click the edit button to update your details anytime. Keep your skills, experience, and contact information up to date for better job matches.",
      category: "account",
      helpful: 134,
    },
    {
      question: "How do I schedule an interview?",
      answer:
        "Check your Interviews section for upcoming schedules and manage your interview slots. You'll receive notifications and reminders before each interview.",
      category: "jobs",
      helpful: 98,
    },
  ];

  const recentTickets = tickets.slice(0, 5);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "support@sabkapro.com",
      subtitle: "Response within 24 hours",
      action: "Send Email",
      color: "from-purple-500 to-pink-500",
      badge: "Popular",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+91 98765 43210",
      subtitle: "Mon-Sat, 9 AM - 6 PM",
      action: "Call Now",
      color: "from-blue-500 to-cyan-500",
      badge: "Fast",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      subtitle: "Available now",
      action: "Start Chat",
      color: "from-green-500 to-emerald-500",
      badge: "Online",
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Schedule a video call",
      subtitle: "Book appointment",
      action: "Schedule",
      color: "from-orange-500 to-red-500",
      badge: "Pro",
    },
  ];

  const stats = [
    {
      label: "Avg Response Time",
      value: "2.5 hrs",
      icon: Clock,
      trend: "+12%",
    },
    { label: "Resolution Rate", value: "94%", icon: CheckCircle, trend: "+8%" },
    { label: "Happy Customers", value: "12.5K", icon: Star, trend: "+25%" },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 min-h-screen overflow-hidden">
      {/* Enhanced Decorative Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{
            background: "rgba(128,55,145,0.12)",
            animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div
          className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl"
          style={{
            background: "rgba(184,123,209,0.08)",
            animation: "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-36 h-36 md:w-72 md:h-72 rounded-full blur-xl md:blur-2xl"
          style={{
            background: "rgba(240,194,238,0.05)",
            animation: "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_40%)]" />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh)
              translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>

      {/* Premium Header with Stats */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-md border border-white/10 group transition-all duration-500 hover:shadow-purple-500/20"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.16), rgba(184,123,209,0.12))",
          boxShadow:
            "0 20px 60px rgba(128,55,145,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <div className="absolute inset-0 shimmer" />
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-6">
              <div
                className="relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                <Headphones className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white/20 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
                    Support Center
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    24/7
                  </span>
                </div>
                <p className="text-white/90 text-lg">
                  We're here to help you succeed in your career journey
                </p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="relative group/stat p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">{stat.label}</p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    {stat.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div
        className="p-2 rounded-2xl shadow-xl backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex space-x-2">
          {[
            { id: "help", name: "Get Help", icon: HelpCircle },
            {
              id: "tickets",
              name: "My Tickets",
              icon: FileText,
              badge: tickets.length,
            },
            { id: "resources", name: "Resources", icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all flex-1 justify-center group ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-xl scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/8 hover:scale-102"
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-50" />
              )}
              <tab.icon
                className={`w-5 h-5 ${
                  activeTab === tab.id ? "animate-pulse" : ""
                }`}
              />
              <span className="relative">{tab.name}</span>
              {tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold shadow-lg">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "help" && (
        <>
          {/* Premium Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-6 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-500/20 cursor-pointer overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className={`px-3 py-1 rounded-full bg-gradient-to-r ${method.color} text-white text-xs font-bold shadow-lg`}
                  >
                    {method.badge}
                  </span>
                </div>

                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-br ${method.color}`}
                  >
                    <method.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                    {method.title}
                  </h3>
                  <p className="text-lg font-semibold text-white/90 mb-2">
                    {method.description}
                  </p>
                  <p className="text-sm text-white/70 mb-5 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {method.subtitle}
                  </p>
                  <button className="w-full px-5 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-semibold text-sm hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group-hover:from-[#b87bd1] group-hover:to-[#803791]">
                    {method.action}
                    <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Enhanced FAQs Section */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
              {/* Search and Filter */}
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl backdrop-blur-sm border border-white/8 hover:border-white/12 transition-all"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                }}
              >
                <div className="flex flex-col gap-5">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search for help..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 border border-white/12 bg-white/6 text-white placeholder:text-white/60 rounded-xl focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/30 text-lg transition-all hover:bg-white/8"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {supportCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`relative px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-3 hover:scale-105 ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-xl scale-105"
                            : "bg-white/6 text-white/80 hover:bg-white/10 hover:text-white border border-white/12"
                        }`}
                      >
                        {selectedCategory === category.id && (
                          <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
                        )}
                        <category.icon className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">{category.name}</span>
                        <span
                          className={`relative z-10 px-2 py-0.5 rounded-full text-xs font-bold ${
                            selectedCategory === category.id
                              ? "bg-white/20"
                              : "bg-white/10"
                          }`}
                        >
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced FAQs List */}
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl backdrop-blur-sm border border-white/8"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`relative p-6 rounded-2xl transition-all duration-500 group cursor-pointer border ${
                        expandedFaq === index
                          ? "bg-white/8 border-purple-500/30 shadow-lg shadow-purple-500/10"
                          : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"
                      }`}
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-lg mb-3 flex items-start gap-3 group-hover:text-purple-300 transition-colors">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                                expandedFaq === index
                                  ? "bg-gradient-to-br from-green-400 to-emerald-500 scale-110"
                                  : "bg-white/10 group-hover:bg-gradient-to-br group-hover:from-green-400 group-hover:to-emerald-500"
                              }`}
                            >
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <span className="flex-1">{faq.question}</span>
                          </h4>
                          <div
                            className={`overflow-hidden transition-all duration-500 ${
                              expandedFaq === index
                                ? "max-h-96 opacity-100 mt-3"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <p className="text-white/80 ml-11 leading-relaxed">
                              {faq.answer}
                            </p>
                            <div className="flex items-center gap-4 ml-11 mt-4 pt-4 border-t border-white/10">
                              <button className="flex items-center gap-2 text-sm text-white/70 hover:text-green-400 transition-colors">
                                <CheckCircle className="w-4 h-4" />
                                Helpful ({faq.helpful})
                              </button>
                              <button className="flex items-center gap-2 text-sm text-white/70 hover:text-purple-400 transition-colors">
                                <ExternalLink className="w-4 h-4" />
                                Learn More
                              </button>
                            </div>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-white/70 flex-shrink-0 transition-transform duration-500 ${
                            expandedFaq === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  ))}

                  {filteredFaqs.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-10 h-10 text-white/30" />
                      </div>
                      <p className="text-white/70 text-lg">
                        No FAQs found. Try a different search or category.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Right Column */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Recent Tickets */}
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl backdrop-blur-sm border border-white/8 hover:border-white/12 transition-all"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  Recent Tickets
                </h3>
                <div className="space-y-3">
                  {recentTickets.length > 0 ? (
                    recentTickets.map((ticket) => (
                      <div
                        key={ticket._id}
                        className="group p-4 rounded-xl transition-all duration-300 cursor-pointer hover:scale-102 hover:shadow-lg"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono text-white/70 font-semibold bg-white/5 px-2 py-1 rounded">
                            #{ticket._id.slice(-6)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                              ticket.status === "resolved"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : ticket.status === "in_progress"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                          {ticket.subject}
                        </h4>
                        <p className="text-xs text-white/60 mb-3 capitalize">
                          {ticket.category}
                        </p>
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </span>
                          <span
                            className={`font-semibold px-2 py-1 rounded ${
                              ticket.priority === "high"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-white/10 text-white/70"
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white/20 mx-auto mb-2" />
                      <p className="text-white/60 text-sm">No tickets yet</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowTicketForm(!showTicketForm)}
                  className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:from-[#b87bd1] hover:to-[#803791] text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  Create New Ticket
                </button>
              </div>

              {/* Help Resources */}
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl relative overflow-hidden backdrop-blur-sm border border-white/12"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(128,55,145,0.18), rgba(184,123,209,0.12))",
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-5 flex items-center gap-3 relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  Help Resources
                </h3>
                <div className="space-y-3 relative">
                  {[
                    {
                      name: "User Guide",
                      icon: Download,
                      desc: "Complete platform guide",
                    },
                    {
                      name: "Video Tutorials",
                      icon: Video,
                      desc: "Step-by-step videos",
                    },
                    {
                      name: "Community Forum",
                      icon: Users,
                      desc: "Connect with others",
                    },
                  ].map((resource, index) => {
                    const IconComponent = resource.icon;
                    return (
                      <button
                        key={index}
                        className="w-full p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-left transition-all duration-300 border border-white/15 hover:border-white/30 flex items-center justify-between group hover:scale-105 hover:shadow-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="font-semibold text-white block">
                              {resource.name}
                            </span>
                            <span className="text-xs text-white/60">
                              {resource.desc}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-2 group-hover:text-white transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Premium Tip Card */}
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl relative overflow-hidden group hover:scale-105 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.1))",
                  border: "1px solid rgba(255,215,0,0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4 relative">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:rotate-12 transition-transform duration-500"
                    style={{
                      background: "linear-gradient(135deg,#FFD700,#FFA500)",
                    }}
                  >
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-white text-lg">
                        Pro Member Benefits
                      </h4>
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </div>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      Upgrade to Pro for priority support with faster response
                      times, dedicated assistance, and exclusive features.
                    </p>
                    <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold text-sm hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105">
                      Upgrade Now
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "tickets" && (
        <div
          className="rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-white/8"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              My Support Tickets
            </h2>
            <button
              onClick={() => setShowTicketForm(!showTicketForm)}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105"
            >
              <Send className="w-5 h-5" />
              New Ticket
            </button>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/70">Loading tickets...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white/30" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">
                No tickets yet
              </h3>
              <p className="text-white/70 mb-6">
                Create your first support ticket to get help
              </p>
              <button
                onClick={() => setShowTicketForm(true)}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Create Ticket
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="group p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer border border-white/8 hover:border-white/15"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-4 h-4 rounded-full shadow-lg ${
                          ticket.status === "resolved"
                            ? "bg-green-400 animate-pulse"
                            : ticket.status === "in_progress"
                            ? "bg-blue-400 animate-pulse"
                            : "bg-orange-400 animate-pulse"
                        }`}
                      />
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-white/90 bg-white/10 px-3 py-1 rounded-lg">
                          #{ticket._id.slice(-8)}
                        </span>
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-lg ${
                            ticket.status === "resolved"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                              : ticket.status === "in_progress"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                              : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          }`}
                        >
                          {ticket.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${
                        ticket.priority === "high"
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : ticket.priority === "medium"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {ticket.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                    {ticket.subject}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-lg bg-white/10 text-white/80 text-sm font-semibold capitalize">
                      {ticket.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                    <span className="flex items-center gap-2 font-semibold">
                      <Calendar className="w-4 h-4" />
                      Created:{" "}
                      {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                      <Clock className="w-4 h-4" />
                      {new Date(ticket.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "resources" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Getting Started Guide",
              desc: "Complete guide to using the platform",
              icon: BookOpen,
              color: "from-blue-500 to-cyan-500",
              items: ["Platform Overview", "Account Setup", "First Steps"],
            },
            {
              title: "Video Library",
              desc: "Watch step-by-step tutorials",
              icon: Video,
              color: "from-purple-500 to-pink-500",
              items: ["Job Applications", "Profile Setup", "Interview Tips"],
            },
            {
              title: "Community Forum",
              desc: "Connect with other students",
              icon: Users,
              color: "from-green-500 to-emerald-500",
              items: ["Ask Questions", "Share Tips", "Success Stories"],
            },
            {
              title: "Knowledge Base",
              desc: "Searchable help articles",
              icon: HelpCircle,
              color: "from-orange-500 to-red-500",
              items: ["FAQs", "Troubleshooting", "Best Practices"],
            },
            {
              title: "API Documentation",
              desc: "For developers and integrations",
              icon: FileText,
              color: "from-indigo-500 to-purple-500",
              items: ["API Reference", "Code Examples", "Integration Guide"],
            },
            {
              title: "Webinars & Events",
              desc: "Live sessions and recordings",
              icon: Calendar,
              color: "from-pink-500 to-rose-500",
              items: ["Upcoming Events", "Past Recordings", "Register Now"],
            },
          ].map((resource, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/8 hover:border-white/15"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div
                className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center shadow-xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                <resource.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                {resource.title}
              </h3>
              <p className="text-white/70 mb-4">{resource.desc}</p>

              <ul className="space-y-2 mb-5">
                {resource.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-white/70"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="w-full px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#803791] group-hover:to-[#b87bd1]">
                Explore
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Premium Ticket Creation Form Modal */}
      {showTicketForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div
            className="relative w-full max-w-2xl rounded-3xl shadow-2xl border border-white/10 animate-slideUp"
            style={{
              background:
                "linear-gradient(135deg, rgba(128,55,145,0.95), rgba(184,123,209,0.9))",
            }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />

            {/* Header */}
            <div className="relative p-8 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                    <Send className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      Create Support Ticket
                    </h3>
                    <p className="text-white/80 text-sm">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTicketForm(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setLoading(true);
                  const { supportService } = await import(
                    "@/services/supportService"
                  );
                  await supportService.createTicket(form);
                  setForm({
                    subject: "",
                    description: "",
                    category: "account",
                    priority: "medium",
                  });
                  await loadTickets();
                  setShowTicketForm(false);
                  setActiveTab("tickets");
                } catch (e) {
                  setError(
                    e?.response?.data?.message ||
                      e?.message ||
                      "Failed to create ticket"
                  );
                } finally {
                  setLoading(false);
                }
              }}
              className="relative p-8 space-y-6"
            >
              {error && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Subject
                  </label>
                  <input
                    value={form.subject}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subject: e.target.value }))
                    }
                    placeholder="Brief description of your issue"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  >
                    <option value="account" className="bg-gray-800">
                      Account Issues
                    </option>
                    <option value="jobs" className="bg-gray-800">
                      Job Applications
                    </option>
                    <option value="courses" className="bg-gray-800">
                      Courses
                    </option>
                    <option value="technical" className="bg-gray-800">
                      Technical Support
                    </option>
                    <option value="billing" className="bg-gray-800">
                      Billing
                    </option>
                    <option value="other" className="bg-gray-800">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, priority: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  >
                    <option value="low" className="bg-gray-800">
                      Low Priority
                    </option>
                    <option value="medium" className="bg-gray-800">
                      Medium Priority
                    </option>
                    <option value="high" className="bg-gray-800">
                      High Priority
                    </option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Provide detailed information about your issue..."
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                    rows={5}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowTicketForm(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-purple-600/30 border-t-purple-600 rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Ticket
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
