"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import CandidateLeadForm from "@/views/forms/CandidateLeadForm"
import EmployerLeadForm from "@/views/forms/EmployerLeadForm"
import Link from "next/link"
import { ArrowLeft, Briefcase } from "lucide-react"

function RegisterContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "candidate"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Sabka Pro HIRIN</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Type Selector */}
        <div className="flex gap-4 mb-8 bg-surface rounded-lg p-2 border border-border">
          <Link
            href="/register?type=candidate"
            className={`flex-1 py-3 px-6 rounded-md text-center font-medium transition-colors ${
              type === "candidate"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
            }`}
          >
            Register as Candidate
          </Link>
          <Link
            href="/register?type=employer"
            className={`flex-1 py-3 px-6 rounded-md text-center font-medium transition-colors ${
              type === "employer"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
            }`}
          >
            Register as Employer
          </Link>
        </div>

        {/* Form */}
        {type === "candidate" ? <CandidateLeadForm /> : <EmployerLeadForm />}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  )
}
