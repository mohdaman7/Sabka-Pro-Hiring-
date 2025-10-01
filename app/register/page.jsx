"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import CandidateLeadForm from "@/views/forms/CandidateLeadForm"
import EmployerLeadForm from "@/views/forms/EmployerLeadForm"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"

function RegisterContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "candidate"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full overflow-hidden shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105 bg-white ring-2 ring-primary/20">
                <img src="/sabka-logo.png" alt="Sabka Pro" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Sabka Pro HIRIN
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mb-10 bg-card/50 backdrop-blur-sm rounded-2xl p-2 border border-border shadow-lg"
        >
          <Link
            href="/register?type=candidate"
            className={`flex-1 py-4 px-6 rounded-xl text-center font-semibold transition-all duration-200 ${
              type === "candidate"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <span className="hidden sm:inline">Register as </span>Candidate
          </Link>
          <Link
            href="/register?type=employer"
            className={`flex-1 py-4 px-6 rounded-xl text-center font-semibold transition-all duration-200 ${
              type === "employer"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <span className="hidden sm:inline">Register as </span>Employer
          </Link>
        </motion.div>

        {/* Form */}
        <motion.div
          key={type}
          initial={{ opacity: 0, x: type === "candidate" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {type === "candidate" ? <CandidateLeadForm /> : <EmployerLeadForm />}
        </motion.div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Loading registration form...</p>
          </div>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  )
}
