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
} from "lucide-react";
import { supportService } from "@/services/supportService";

export default function StudentSupport() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("help");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "other",
    priority: "medium",
  });

  useEffect(() => {
    if (activeTab !== "tickets") return;
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await supportService.listMyTickets();
        if (!mounted) return;
        setTickets(res?.data || []);
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || "Failed to load tickets");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [activeTab]);

  const supportCategories = [
    { id: "all", name: "All Topics", icon: HelpCircle },
    { id: "account", name: "Account Issues", icon: AlertCircle },
    { id: "jobs", name: "Job Applications", icon: Briefcase },
    { id: "courses", name: "Courses", icon: BookOpen },
    { id: "technical", name: "Technical Support", icon: Zap },
  ];

  const faqs = [
    {
      question: "How do I apply for jobs?",
      answer:
        "Go to Job Listings, browse available positions, and click 'Apply Now' on jobs that interest you.",
      category: "jobs",
    },
    {
      question: "How can I upgrade to Pro plan?",
      answer:
        "Navigate to 'Upgrade to Pro' in the sidebar and choose your preferred payment method.",
      category: "account",
    },
    {
      question: "How do I access my enrolled courses?",
      answer:
        "Visit the Training Courses section to view and access all your enrolled courses.",
      category: "courses",
    },
    {
      question: "Can I edit my profile information?",
      answer:
        "Yes, go to My Profile and click the edit button to update your details anytime.",
      category: "account",
    },
    {
      question: "How do I schedule an interview?",
      answer:
        "Check your Interviews section for upcoming schedules and manage your interview slots.",
      category: "jobs",
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "support@sabkapro.com",
      subtitle: "Response within 24 hours",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+91 98765 43210",
      subtitle: "Mon-Sat, 9 AM - 6 PM",
      action: "Call Now",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      subtitle: "Available now",
      action: "Start Chat",
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Schedule a video call",
      subtitle: "Book appointment",
      action: "Schedule",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} /> */}

      <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(128,55,145,0.08)" }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(184,123,209,0.06)" }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
            style={{ background: "rgba(240,194,238,0.03)" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
        </div>

        {/* Header */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6"
          style={{
            background: "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
            boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
          }}
        >
          <div className="flex items-center gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg,#803791,#b87bd1)" }}
            >
              <Headphones className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Support Center</h1>
              <p className="text-white/90 text-lg">We're here to help you succeed in your career journey</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="p-2 rounded-2xl shadow-lg"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex space-x-2">
            {[
              { id: "help", name: "Get Help", icon: HelpCircle },
              { id: "tickets", name: "My Tickets", icon: FileText },
              { id: "resources", name: "Resources", icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/6"
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
                  className="group rounded-2xl p-6 shadow-xl transition-all hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform"
                      style={{ background: "linear-gradient(135deg,#803791,#b87bd1)" }}
                    >
                      <method.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                    <p className="text-lg font-semibold text-white/90 mb-2">{method.description}</p>
                    <p className="text-sm text-white/70 mb-5">{method.subtitle}</p>
                    <button className="w-full px-5 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-semibold text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2">
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
                <div
                  className="rounded-2xl p-6 shadow-xl"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex flex-col gap-5">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                      <input
                        type="text"
                        placeholder="Search for help..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-white/12 bg-white/6 text-white placeholder:text-white/60 rounded-xl focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 text-lg"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {supportCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-3 ${
                            selectedCategory === category.id
                              ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg"
                              : "bg-white/6 text-white/80 hover:bg-white/10 hover:text-white border border-white/12"
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
                <div
                  className="rounded-2xl p-6 shadow-xl"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <HelpCircle className="w-7 h-7 text-[#b87bd1]" />
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-xl transition-all duration-300 group cursor-pointer hover:-translate-y-0.5"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <h4 className="font-semibold text-white text-lg mb-3 flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          {faq.question}
                        </h4>
                        <p className="text-white/70 ml-9">{faq.answer}</p>
                      </div>
                    ))}

                    {filteredFaqs.length === 0 && (
                      <div className="text-center py-12">
                        <HelpCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                        <p className="text-white/70 text-lg">No FAQs found. Try a different search or category.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Recent Tickets & Resources */}
              <div className="space-y-8">
                {/* Recent Tickets */}
                <div
                  className="rounded-2xl p-6 shadow-xl"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#b87bd1]" />
                    Quick Links
                  </h3>
                  <div className="space-y-4">
                    {[{ id: "guide", subject: "User Guide", status: "info", date: "" }].map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-sm font-mono text-white/70 font-semibold">HELP-001</span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            Info
                          </span>
                        </div>
                        <h4 className="font-semibold text-white text-base mb-2 group-hover:text-[#b87bd1] transition-colors">
                          Getting Started
                        </h4>
                        <p className="text-sm text-white/70">Read the user guide to get oriented.</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help Resources */}
                <div
                  className="rounded-2xl p-6 shadow-xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3 relative">
                    <BookOpen className="w-6 h-6" />
                    Help Resources
                  </h3>
                  <div className="space-y-3 relative">
                    {[
                      { name: "User Guide", icon: Download },
                      { name: "Video Tutorials", icon: Video },
                      { name: "Community Forum", icon: Users },
                    ].map((resource, index) => {
                      const IconComponent = resource.icon;
                      return (
                        <button
                          key={index}
                          className="w-full px-5 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl text-left transition-all border border-white/12 hover:border-white/20 flex items-center justify-between group"
                        >
                          <span className="font-semibold text-white">{resource.name}</span>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-white/70" />
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Tip */}
                <div
                  className="rounded-2xl p-6 shadow-xl"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                      style={{ background: "linear-gradient(135deg,#803791,#b87bd1)" }}
                    >
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">Quick Tip</h4>
                      <p className="text-white/80">
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
          <div
            className="rounded-2xl p-6 shadow-xl"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">My Support Tickets</h2>
            {error && <div className="text-red-400">{error}</div>}
            {loading && <div className="text-white/80">Loading...</div>}
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-mono text-white/70 font-semibold">{ticket._id}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === "resolved"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : ticket.status === "in_progress"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{ticket.subject}</h3>
                  <p className="text-sm text-white/70 mb-3">{ticket.category}</p>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Created {new Date(ticket.createdAt).toLocaleString()}
                    </span>
                    <span className="font-semibold text-white/80">{ticket.priority} Priority</span>
                  </div>
                </div>
              ))}

              {tickets.length === 0 && !loading && (
                <div className="text-white/70">No tickets yet. Create your first ticket below.</div>
              )}
            </div>

            {/* Create Ticket */}
            <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Create a Ticket</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
                <select
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="other">Other</option>
                  <option value="account">Account</option>
                  <option value="jobs">Jobs</option>
                  <option value="courses">Courses</option>
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                </select>
                <select
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <textarea
                  rows={4}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 md:col-span-2"
                  placeholder="Describe your issue..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <button
                onClick={async () => {
                  try {
                    if (!form.subject.trim() || !form.description.trim()) return;
                    setLoading(true);
                    setError("");
                    await supportService.createTicket(form);
                    const res = await supportService.listMyTickets();
                    setTickets(res?.data || []);
                    setForm({ subject: "", description: "", category: "other", priority: "medium" });
                  } catch (e) {
                    setError(e?.response?.data?.message || e?.message || "Failed to create ticket");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="mt-4 px-5 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl font-semibold text-sm hover:opacity-95"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
