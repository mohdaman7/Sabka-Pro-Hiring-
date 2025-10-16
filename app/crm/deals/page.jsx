"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  User,
  GraduationCap,
  Send,
} from "lucide-react";

export default function DealsPage() {
  const [view, setView] = useState("pipeline");
  const [deals, setDeals] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      course: "Full Stack Development",
      value: 15000,
      stage: "proposal_sent",
      probability: 70,
      assignedTo: "Sales Agent 1",
      createdDate: "2024-01-10",
      followUpDate: "2024-01-17",
      education: "B.Tech Computer Science",
      source: "Website Lead",
    },
    {
      id: 2,
      studentName: "Priya Patel",
      email: "priya@example.com",
      phone: "+91 9876543211",
      course: "Data Science Pro",
      value: 20000,
      stage: "new",
      probability: 30,
      assignedTo: "Sales Agent 2",
      createdDate: "2024-01-12",
      followUpDate: "2024-01-15",
      education: "M.Sc Statistics",
      source: "Reference",
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      email: "amit@example.com",
      phone: "+91 9876543212",
      course: "Digital Marketing",
      value: 12000,
      stage: "payment_pending",
      probability: 90,
      assignedTo: "Sales Agent 1",
      createdDate: "2024-01-08",
      followUpDate: "2024-01-16",
      education: "MBA Marketing",
      source: "Social Media",
    },
  ]);

  const stages = {
    new: {
      name: "New Lead",
      color: "bg-gray-500",
      deals: deals.filter((d) => d.stage === "new"),
    },
    contacted: {
      name: "Contacted",
      color: "bg-blue-500",
      deals: deals.filter((d) => d.stage === "contacted"),
    },
    proposal_sent: {
      name: "Proposal Sent",
      color: "bg-purple-500",
      deals: deals.filter((d) => d.stage === "proposal_sent"),
    },
    negotiation: {
      name: "Negotiation",
      color: "bg-orange-500",
      deals: deals.filter((d) => d.stage === "negotiation"),
    },
    payment_pending: {
      name: "Payment Pending",
      color: "bg-yellow-500",
      deals: deals.filter((d) => d.stage === "payment_pending"),
    },
    converted: {
      name: "Converted",
      color: "bg-green-500",
      deals: deals.filter((d) => d.stage === "converted"),
    },
    lost: {
      name: "Lost",
      color: "bg-red-500",
      deals: deals.filter((d) => d.stage === "lost"),
    },
  };

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const convertedDeals = deals.filter((d) => d.stage === "converted").length;
  const conversionRate = Math.round((convertedDeals / deals.length) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Student Deals & Proposals
          </h1>
          <p className="text-white/70">Convert student leads into Pro users</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/crm/deals/proposals/create"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Send className="w-4 h-4" />
            Send Proposal
          </Link>
          <Link
            href="/crm/deals/create"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Deal
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Total Pipeline</p>
              <p className="text-2xl font-bold text-white">
                ₹{totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Active Deals</p>
              <p className="text-2xl font-bold text-white">{deals.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Conversion Rate</p>
              <p className="text-2xl font-bold text-white">{conversionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <GraduationCap className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Pro Students</p>
              <p className="text-2xl font-bold text-white">{convertedDeals}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={() => setView("pipeline")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === "pipeline"
                ? "bg-[#803791] text-white"
                : "bg-white/10 text-white/70 hover:text-white"
            }`}
          >
            Pipeline View
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === "list"
                ? "bg-[#803791] text-white"
                : "bg-white/10 text-white/70 hover:text-white"
            }`}
          >
            List View
          </button>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#b87bd1]"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Pipeline View */}
      {view === "pipeline" && (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 overflow-x-auto">
          {Object.entries(stages).map(([key, stage]) => (
            <div
              key={key}
              className="min-w-[250px] bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-sm">
                  {stage.name}
                </h3>
                <span className="px-2 py-1 text-xs bg-white/20 rounded text-white">
                  {stage.deals.length}
                </span>
              </div>
              <div className="space-y-3">
                {stage.deals.map((deal) => (
                  <Link
                    key={deal.id}
                    href={`/crm/deals/${deal.id}`}
                    className="block p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#b87bd1]/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white text-sm">
                        {deal.studentName}
                      </h4>
                      <MoreHorizontal className="w-4 h-4 text-white/50" />
                    </div>
                    <p className="text-white/70 text-xs mb-1">{deal.course}</p>
                    <p className="text-white/50 text-xs mb-2">
                      {deal.education}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 text-sm font-semibold">
                        ₹{deal.value.toLocaleString()}
                      </span>
                      <span className="text-white/50 text-xs">
                        {deal.probability}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white/50 text-xs">
                        {deal.assignedTo}
                      </span>
                      <span className="text-white/50 text-xs">
                        {new Date(deal.followUpDate).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
                <button className="w-full p-2 text-white/50 hover:text-white border border-dashed border-white/20 rounded-lg hover:border-[#b87bd1] transition-colors text-sm">
                  + Add Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/70 font-medium">
                  Student
                </th>
                <th className="text-left p-4 text-white/70 font-medium">
                  Course
                </th>
                <th className="text-left p-4 text-white/70 font-medium">
                  Value
                </th>
                <th className="text-left p-4 text-white/70 font-medium">
                  Stage
                </th>
                <th className="text-left p-4 text-white/70 font-medium">
                  Probability
                </th>
                <th className="text-left p-4 text-white/70 font-medium">
                  Assigned To
                </th>
                <th className="text-left p-4 text-white/70 font-medium">
                  Follow-up
                </th>
                <th className="text-left p-4 text-white/70 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <tr
                  key={deal.id}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="p-4">
                    <div>
                      <Link
                        href={`/crm/deals/${deal.id}`}
                        className="text-white hover:text-[#b87bd1] font-medium"
                      >
                        {deal.studentName}
                      </Link>
                      <p className="text-white/70 text-sm">{deal.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-white/70">{deal.course}</td>
                  <td className="p-4 text-green-400 font-semibold">
                    ₹{deal.value.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        stages[deal.stage].color
                      } text-white`}
                    >
                      {stages[deal.stage].name}
                    </span>
                  </td>
                  <td className="p-4 text-white/70">{deal.probability}%</td>
                  <td className="p-4 text-white/70 text-sm">
                    {deal.assignedTo}
                  </td>
                  <td className="p-4 text-white/70 text-sm">
                    {new Date(deal.followUpDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/crm/deals/${deal.id}/proposal`}
                        className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                        title="Send Proposal"
                      >
                        <Send className="w-4 h-4 text-purple-400" />
                      </Link>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-white/50" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
