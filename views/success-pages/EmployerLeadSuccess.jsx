"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Users,
  Clock,
  Sparkles,
  Award,
  Zap,
} from "lucide-react";

export default function EmployerLeadSuccess({ userData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-5xl"
      >
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-indigo-100 shadow-2xl overflow-hidden">
          {/* Header Section with Success Icon */}
          <div className="relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-12 text-center border-b border-indigo-100">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 150,
                damping: 15,
              }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle
                  className="w-16 h-16 text-white"
                  strokeWidth={2.5}
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3"
            >
              Registration Successful!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-indigo-600 font-medium"
            >
              Welcome to Sabka ProHirin – Your Hiring Solution Awaits
            </motion.p>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 space-y-8">
            {/* Pending Approval Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Clock className="w-7 h-7 text-white" />
                </motion.div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    Awaiting CRM Approval
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-amber-500" />
                    </motion.span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your company profile is under review
                  </p>
                </div>
              </div>

              <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-amber-100">
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  Our CRM team is verifying your company details and setting up
                  your premium employer account. Dashboard access will be
                  granted upon approval.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Account Manager Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Dedicated Account Manager
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  <strong className="text-gray-800">
                    Our HR solutions expert
                  </strong>{" "}
                  will provide you with:
                </p>

                <div className="space-y-2.5">
                  {[
                    "Personalized hiring strategy consultation",
                    "Complete platform onboarding & setup",
                    "Advanced candidate matching assistance",
                    "Ongoing recruitment optimization support",
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Company Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white/60 border border-indigo-200 rounded-2xl p-6 shadow-lg backdrop-blur-sm"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-500" />
                  Company Information
                </h4>

                <div className="space-y-4">
                  {[
                    {
                      icon: User,
                      label: "Contact Person",
                      value: `${userData?.firstName} ${userData?.lastName}`,
                    },
                    { icon: Mail, label: "Email", value: userData?.email },
                    { icon: Phone, label: "Phone", value: userData?.phone },
                    {
                      icon: Building,
                      label: "Company",
                      value: userData?.companyName,
                    },
                    {
                      icon: Briefcase,
                      label: "Position",
                      value: userData?.position,
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + idx * 0.1 }}
                      className="flex items-center justify-between py-2 border-b border-indigo-100 last:border-0"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800 capitalize truncate ml-2 max-w-[200px]">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Premium Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Award className="w-6 h-6 text-amber-500" />
                <h4 className="text-xl font-bold text-gray-800">
                  Premium Employer Benefits
                </h4>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Priority Listings",
                    desc: "Your jobs appear first",
                  },
                  {
                    icon: Users,
                    title: "Advanced Matching",
                    desc: "AI-powered candidate search",
                  },
                  {
                    icon: Award,
                    title: "Verified Badge",
                    desc: "Build trust with candidates",
                  },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + idx * 0.1 }}
                    className="bg-white/60 rounded-xl p-4 text-center border border-indigo-100 shadow-sm"
                  >
                    <feature.icon className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <h5 className="font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h5>
                    <p className="text-xs text-gray-600">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-2xl p-8 shadow-lg"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">
                What Happens Next?
              </h4>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    time: "Within 2 Hours",
                    desc: "Dedicated account manager reaches out for consultation",
                  },
                  {
                    step: "2",
                    time: "CRM Verification",
                    desc: "Company profile and documents are verified by our team",
                  },
                  {
                    step: "3",
                    time: "Post Approval",
                    desc: "Full employer dashboard access and job posting capabilities unlocked",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + idx * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 mb-1">
                        {item.time}
                      </div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center space-y-2"
            >
              <p className="text-sm text-gray-600">
                Need immediate assistance?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="text-indigo-600 font-semibold hover:text-purple-600 transition-colors"
                >
                  📞 +91-XXXXX-XXXXX
                </a>
                <span className="hidden sm:inline text-gray-300">|</span>
                <a
                  href="mailto:employers@sabkaprohirin.com"
                  className="text-indigo-600 font-semibold hover:text-purple-600 transition-colors"
                >
                  ✉️ employers@sabkaprohirin.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center mt-6 text-sm text-indigo-400"
        >
          Transform your hiring process with Sabka ProHirin. Excellence in
          recruitment starts here.
        </motion.p>
      </motion.div>
    </div>
  );
}
