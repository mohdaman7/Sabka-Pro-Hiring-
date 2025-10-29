"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Building2,
  CheckCircle,
  ArrowRight,
  Briefcase,
  TrendingUp,
  Shield,
  Award,
  Target,
  Star,
} from "lucide-react";

export default function RoleSelectionCards({ currentType }) {
  return (
    <div className="w-full mb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Sabka Pro Hiring
          </span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Sign in to your account to continue your professional journey
        </p>
      </motion.div>

      {/* Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {/* Candidate Card */}
        <Link href="/login?type=candidate" className="group relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-2xl blur-xl transition-all duration-500 ${
                currentType === "candidate"
                  ? "opacity-100 blur-2xl"
                  : "opacity-0 group-hover:opacity-70"
              }`}
            />

            {/* Card */}
            <div
              className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 ${
                currentType === "candidate"
                  ? "border-purple-500/70 bg-white/10 scale-[1.02] shadow-2xl shadow-purple-500/20"
                  : "border-white/10 hover:bg-white/10 hover:border-purple-500/30 hover:scale-[1.01]"
              }`}
            >
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transition-transform duration-300 shadow-lg ${
                    currentType === "candidate" ? "scale-110" : "group-hover:scale-105"
                  }`}
                >
                  <Users className="w-8 h-8 text-white" />
                </div>
                {currentType === "candidate" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-purple-500/20 border border-purple-400/50 rounded-full px-3 py-1 text-xs font-semibold text-purple-300"
                  >
                    Selected
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-2">
                Candidate Login
              </h3>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Access your profile, apply to jobs, and track applications
              </p>

              {/* Features */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Target className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>10,000+ Active Jobs</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Skill Development Courses</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Star className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Career Growth Support</span>
                </div>
              </div>

              {/* Button */}
              <div className="flex items-center justify-between text-white font-semibold text-sm group-hover:text-purple-300 transition-colors pt-2 border-t border-white/10">
                <span>
                  {currentType === "candidate" ? "Continue" : "Select Role"}
                </span>
                <ArrowRight
                  className={`w-5 h-5 transition-transform ${
                    currentType === "candidate" ? "translate-x-1" : "group-hover:translate-x-1"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Employer Card */}
        <Link href="/login?type=employer" className="group relative">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-blue-600/50 to-cyan-600/50 rounded-2xl blur-xl transition-all duration-500 ${
                currentType === "employer"
                  ? "opacity-100 blur-2xl"
                  : "opacity-0 group-hover:opacity-70"
              }`}
            />

            {/* Card */}
            <div
              className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 ${
                currentType === "employer"
                  ? "border-blue-500/70 bg-white/10 scale-[1.02] shadow-2xl shadow-blue-500/20"
                  : "border-white/10 hover:bg-white/10 hover:border-blue-500/30 hover:scale-[1.01]"
              }`}
            >
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center transition-transform duration-300 shadow-lg ${
                    currentType === "employer" ? "scale-110" : "group-hover:scale-105"
                  }`}
                >
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                {currentType === "employer" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-blue-500/20 border border-blue-400/50 rounded-full px-3 py-1 text-xs font-semibold text-blue-300"
                  >
                    Selected
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-2">
                Employer Login
              </h3>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Post jobs, manage candidates, and build your team
              </p>

              {/* Features */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Briefcase className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Unlimited Job Postings</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Shield className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Verified Candidate Pool</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Advanced Hiring Tools</span>
                </div>
              </div>

              {/* Button */}
              <div className="flex items-center justify-between text-white font-semibold text-sm group-hover:text-blue-300 transition-colors pt-2 border-t border-white/10">
                <span>
                  {currentType === "employer" ? "Continue" : "Select Role"}
                </span>
                <ArrowRight
                  className={`w-5 h-5 transition-transform ${
                    currentType === "employer" ? "translate-x-1" : "group-hover:translate-x-1"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Contact & Support Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50 mb-8"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>100% Secure Login</span>
        </div>
        <div className="w-1 h-1 bg-white/30 rounded-full" />
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Trusted by 10,000+ Users</span>
        </div>
        <div className="w-1 h-1 bg-white/30 rounded-full" />
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4" />
          <span>ISO Certified Platform</span>
        </div>
      </motion.div>
    </div>
  );
}
