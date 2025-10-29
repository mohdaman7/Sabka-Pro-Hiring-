"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Download,
  Target,
  TrendingUp,
  BarChart3,
  FileText,
  Video,
  Crown,
  Calendar,
  Users,
  Award,
} from "lucide-react";
import { resumeService } from "@/services/resumeService";

export default function StudentAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [timeRange, setTimeRange] = useState("7d"); // 7d, 30d, 90d, all

  useEffect(() => {
    fetchAnalytics();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsPro(user?.isPro || false);
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await resumeService.getAnalytics();
      if (response.success) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = analytics
    ? [
        {
          label: "Total Resume Views",
          value: analytics.overview.totalResumeViews || 0,
          icon: Eye,
          color: "blue",
          change: "+12%",
        },
        {
          label: "Resume Downloads",
          value: analytics.overview.totalResumeDownloads || 0,
          icon: Download,
          color: "green",
          change: "+8%",
        },
        {
          label: "Avg. ATS Score",
          value: `${analytics.overview.avgAtsScore || 0}%`,
          icon: Target,
          color: "purple",
          change: "+5%",
        },
        {
          label: "Profile Strength",
          value: `${analytics.overview.profileStrength || 0}%`,
          icon: TrendingUp,
          color: "amber",
          change: "+3%",
        },
      ]
    : [];

  if (!isPro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-32 h-32 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl bg-gradient-to-br from-[#803791] to-[#b87bd1]">
              <Crown className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              Unlock Advanced Analytics
            </h2>

            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Get detailed insights into your resume performance and profile visibility
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                {
                  icon: BarChart3,
                  title: "Detailed Metrics",
                  description: "Track views, downloads, and engagement",
                },
                {
                  icon: TrendingUp,
                  title: "Performance Trends",
                  description: "See how your profile grows over time",
                },
                {
                  icon: Award,
                  title: "Competitive Analysis",
                  description: "Compare with industry standards",
                },
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-6 bg-white/3 rounded-2xl hover:bg-white/5 transition-colors duration-300 border border-white/10"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-[#b87bd1]/20">
                      <IconComponent className="w-6 h-6 text-[#b87bd1]" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <button className="px-12 py-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl text-lg font-bold shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto">
              <Crown className="w-6 h-6" />
              Upgrade to Pro
            </button>

            <p className="text-sm text-white/60 mt-6">
              Start your 7-day free trial · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Analytics Dashboard</h1>
            <p className="text-white/60 text-lg">
              Track your resume performance and profile visibility
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
            {[
              { id: "7d", label: "7 Days" },
              { id: "30d", label: "30 Days" },
              { id: "90d", label: "90 Days" },
              { id: "all", label: "All Time" },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  timeRange === range.id
                    ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#b87bd1]/30 border-t-[#b87bd1] animate-spin mx-auto mb-4" />
            <p className="text-white/60">Loading analytics...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#b87bd1]/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-500/20`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Profile Strength */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Profile Strength</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70">Overall Progress</span>
                  <span className="text-2xl font-black text-[#b87bd1]">
                    {analytics?.overview.profileStrength || 0}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-full transition-all duration-1000"
                    style={{ width: `${analytics?.overview.profileStrength || 0}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">
                      {analytics?.resumes?.length || 0}
                    </div>
                    <div className="text-white/60 text-sm">Resumes</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">
                      {analytics?.videos?.length || 0}
                    </div>
                    <div className="text-white/60 text-sm">Videos</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">
                      {analytics?.overview.avgAtsScore || 0}%
                    </div>
                    <div className="text-white/60 text-sm">ATS Score</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">
                      {(analytics?.overview.totalResumeViews || 0) +
                        (analytics?.overview.totalVideoViews || 0)}
                    </div>
                    <div className="text-white/60 text-sm">Total Views</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resume Performance */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume Performance
                </h3>
                <div className="space-y-3">
                  {analytics?.resumes?.slice(0, 5).map((resume, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white truncate">{resume.name}</div>
                        <div className="text-white/60 text-sm">{resume.views} views</div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-lg font-bold ${
                          resume.score >= 80 ? "text-green-400" : resume.score >= 60 ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {resume.score}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Performance */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Performance
                </h3>
                <div className="space-y-3">
                  {analytics?.videos && analytics.videos.length > 0 ? (
                    analytics.videos.slice(0, 5).map((video, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white truncate">{video.name}</div>
                          <div className="text-white/60 text-sm">{video.views} views · {video.uniqueViewers} unique</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-white/60">
                      No video resumes yet
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Views Over Time Chart Placeholder */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Views Over Time</h3>
              <div className="h-64 flex items-center justify-center text-white/40">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                  <p>Chart visualization coming soon</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
