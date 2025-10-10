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
  Globe,
} from "lucide-react";

export default function EmployerLeadSuccess({ userData, onBackToHome }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl border border-border shadow-2xl p-8 md:p-12 text-center relative overflow-hidden max-w-4xl mx-auto"
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50"
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>

      {/* Main Success Message */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
      >
        Registration Successful! 🎉
      </motion.h2>

      {/* HR Specialist Contact Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Dedicated Account Manager
          </h3>
        </div>
        <p className="text-lg text-foreground/80 mb-4">
          <strong>Our Best HR Solutions Specialist</strong> will contact you
          shortly to:
        </p>
        <div className="grid md:grid-cols-2 gap-3 text-left">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Understand your hiring needs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Set up your company profile</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Guide you through the platform</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Help you post your first job</span>
          </div>
        </div>
      </motion.div>

      {/* Company Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-inner max-w-md mx-auto mb-8"
      >
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
          <Building className="w-5 h-5 text-primary" />
          Company Details
        </h4>
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Contact Person</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {userData?.firstName} {userData?.lastName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </div>
            <span className="text-sm font-medium text-foreground truncate ml-2">
              {userData?.email}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>Phone</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {userData?.phone}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="w-4 h-4" />
              <span>Company</span>
            </div>
            <span className="text-sm font-medium text-foreground capitalize">
              {userData?.companyName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span>Position</span>
            </div>
            <span className="text-sm font-medium text-foreground capitalize">
              {userData?.position}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
      >
        <h4 className="text-lg font-semibold text-foreground mb-3">
          What Happens Next?
        </h4>
        <div className="space-y-3 text-sm text-foreground/70">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
              1
            </div>
            <p>
              Account manager will contact you within <strong>2 hours</strong>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
              2
            </div>
            <p>Get your company profile verified and optimized</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
              3
            </div>
            <p>Start posting jobs and finding perfect candidates</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <button
          onClick={() => onBackToHome && onBackToHome()}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          Go to Employer Dashboard
        </button>

        <button
          onClick={() => (window.location.href = "/jobs")}
          className="px-8 py-3 bg-transparent border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors"
        >
          Browse Candidates
        </button>
      </motion.div>

      {/* Support Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xs text-muted-foreground"
      >
        <p>
          Need immediate assistance? Call us at <strong>+91-XXXXX-XXXXX</strong>
        </p>
        <p>
          Or email us at <strong>employers@sabkaprohirin.com</strong>
        </p>
      </motion.div>
    </motion.div>
  );
}
