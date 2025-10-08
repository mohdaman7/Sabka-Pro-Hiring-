"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Search,
  CheckCircle2,
  MoreVertical,
  ExternalLink,
  MessageSquare,
  Bell,
  TrendingUp,
  Award,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function InterviewsPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      label: "Total Interviews",
      value: "24",
      change: "+3 this month",
      color: "from-purple-500 to-blue-500",
      icon: Calendar,
    },
    {
      label: "Upcoming",
      value: "5",
      change: "Next in 2 days",
      color: "from-green-500 to-emerald-500",
      icon: Bell,
    },
    {
      label: "Completed",
      value: "18",
      change: "85% success rate",
      color: "from-blue-500 to-cyan-500",
      icon: Award,
    },
    {
      label: "Pending Response",
      value: "1",
      change: "Awaiting confirmation",
      color: "from-amber-500 to-orange-500",
      icon: AlertCircle,
    },
  ];

  const interviews = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer Intern",
      type: "video",
      date: "Oct 15, 2025",
      time: "2:00 PM - 3:00 PM",
      status: "upcoming",
      interviewer: "Sarah Chen",
      round: "Technical Round 2",
      logo: "https://logo.clearbit.com/google.com",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      notes: "Prepare system design questions",
    },
    {
      id: 2,
      company: "Meta",
      position: "Frontend Developer",
      type: "video",
      date: "Oct 18, 2025",
      time: "10:00 AM - 11:00 AM",
      status: "upcoming",
      interviewer: "Michael Rodriguez",
      round: "Behavioral Interview",
      logo: "https://logo.clearbit.com/meta.com",
      meetingLink: "https://zoom.us/j/123456789",
      notes: "Review STAR method examples",
    },
    {
      id: 3,
      company: "Amazon",
      position: "SDE Intern",
      type: "phone",
      date: "Oct 20, 2025",
      time: "3:30 PM - 4:30 PM",
      status: "upcoming",
      interviewer: "David Kim",
      round: "Phone Screen",
      logo: "https://logo.clearbit.com/amazon.com",
      notes: "Focus on leadership principles",
    },
    {
      id: 4,
      company: "Microsoft",
      position: "Cloud Engineer",
      type: "onsite",
      date: "Oct 25, 2025",
      time: "9:00 AM - 12:00 PM",
      status: "upcoming",
      interviewer: "Emily Watson",
      round: "Final Round",
      logo: "https://logo.clearbit.com/microsoft.com",
      location: "Microsoft Campus, Building 92",
      notes: "Bring ID and portfolio",
    },
    {
      id: 5,
      company: "Apple",
      position: "iOS Developer Intern",
      type: "video",
      date: "Oct 8, 2025",
      time: "1:00 PM - 2:00 PM",
      status: "completed",
      interviewer: "James Park",
      round: "Technical Round 1",
      logo: "https://logo.clearbit.com/apple.com",
      result: "Passed",
    },
    {
      id: 6,
      company: "Netflix",
      position: "Data Analyst",
      type: "video",
      date: "Oct 5, 2025",
      time: "11:00 AM - 12:00 PM",
      status: "completed",
      interviewer: "Lisa Anderson",
      round: "Case Study",
      logo: "https://logo.clearbit.com/netflix.com",
      result: "Passed",
    },
    {
      id: 7,
      company: "Stripe",
      position: "Backend Engineer",
      type: "phone",
      date: "Oct 22, 2025",
      time: "4:00 PM - 5:00 PM",
      status: "pending",
      interviewer: "TBD",
      round: "Initial Screen",
      logo: "https://logo.clearbit.com/stripe.com",
      notes: "Awaiting interviewer assignment",
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "phone":
        return <Phone className="w-4 h-4" />;
      case "onsite":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const filteredInterviews = interviews.filter((interview) => {
    const matchesFilter = filter === "all" || interview.status === filter;
    const matchesSearch =
      interview.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background:
                "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
              color: "#fff",
            }}
          >
            <Calendar className="w-4 h-4" />
            Interview Scheduler
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Your Interview Dashboard
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Stay organized and prepared with all your interview schedules,
            reminders, and important dates in one place.
          </p>
        </div>

        {/* Stats Grid - Focus on reminders and dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative group rounded-2xl p-6 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-2xl`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}
                    style={{
                      background: `linear-gradient(135deg,#803791,#b87bd1)`,
                    }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-white/70" />
                </div>
                <p className="text-white/80 text-sm font-medium mb-2">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-white/60 font-medium">
                  {stat.change}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex gap-2 flex-wrap">
            {["all", "upcoming", "completed", "pending"].map((status) => (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                size="sm"
                className={
                  filter === status
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-md rounded-xl font-semibold"
                    : "bg-white/6 border border-white/6 text-white/80 hover:bg-white/10 rounded-xl font-medium"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
            <Input
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/6 border border-white/8 text-white placeholder:text-white/60 focus:border-[#b87bd1] rounded-xl"
            />
          </div>
        </div>

        {/* Interviews List - Reminder/Calendar Style */}
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <Card
              key={interview.id}
              className="relative group rounded-2xl p-6 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-[#b87bd1]/10 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-6">
                {/* Company Logo with Date Badge */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden shadow-md"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <img
                        src={interview.logo || "/placeholder.svg"}
                        alt={interview.company}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    {/* Date Badge */}
                    {interview.status === "upcoming" && (
                      <div
                        className="absolute -bottom-2 -right-2 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg"
                        style={{
                          background: "linear-gradient(90deg,#803791,#b87bd1)",
                        }}
                      >
                        {new Date(interview.date).getDate()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Interview Details - Focus on dates and reminders */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 transition-colors duration-300">
                        {interview.position}
                      </h3>
                      <p className="text-white/80 font-medium">
                        {interview.company}
                      </p>
                    </div>
                    <Badge
                      className={`${getStatusColor(
                        interview.status
                      )} border font-semibold px-3 py-1 rounded-lg`}
                    >
                      {interview.status}
                    </Badge>
                  </div>

                  {/* Date and Time - Prominent Display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                        style={{
                          background: "linear-gradient(135deg,#803791,#b87bd1)",
                        }}
                      >
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/70 font-medium">
                          Date
                        </p>
                        <p className="text-sm font-bold text-white">
                          {interview.date}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                        style={{
                          background: "linear-gradient(135deg,#6fb1ff,#00d4ff)",
                        }}
                      >
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/70 font-medium">
                          Time
                        </p>
                        <p className="text-sm font-bold text-white">
                          {interview.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      {getTypeIcon(interview.type)}
                      <span className="capitalize font-medium text-white/85">
                        {interview.type}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <span className="font-semibold text-white">
                        {interview.round}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <span className="text-white/70">with</span>
                      <span className="font-semibold text-white">
                        {interview.interviewer}
                      </span>
                    </div>
                  </div>

                  {/* Notes/Reminders */}
                  {interview.notes && (
                    <div
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{
                        background: "rgba(184,123,209,0.05)",
                        border: "1px solid rgba(184,123,209,0.06)",
                      }}
                    >
                      <MessageSquare className="w-5 h-5 text-[#b87bd1] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#b87bd1] font-semibold mb-1">
                          Reminder
                        </p>
                        <p className="text-sm text-white/85 font-medium">
                          {interview.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {interview.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{interview.location}</span>
                    </div>
                  )}

                  {interview.result && (
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-lg w-fit"
                      style={{
                        background: "rgba(34,197,94,0.06)",
                        border: "1px solid rgba(34,197,94,0.06)",
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-300" />
                      <span className="text-sm font-semibold text-white">
                        Result: {interview.result}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2 flex-shrink-0">
                  {interview.status === "upcoming" && interview.meetingLink && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Join Now
                    </Button>
                  )}
                  {interview.status === "upcoming" && (
                    <Button
                      size="sm"
                      className="bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-purple-300 rounded-xl font-medium"
                    >
                      Reschedule
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredInterviews.length === 0 && (
          <Card className="bg-white rounded-2xl border-2 border-dashed border-slate-300">
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-slate-200 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No interviews found
              </h3>
              <p className="text-slate-600">
                Try adjusting your filters or search query
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
