"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Briefcase, Users, Building2, ArrowRight } from "lucide-react"

export default function LandingHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-semibold text-white">Sabka Pro HIRIN</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-sm text-gray-300 hover:text-white transition-colors">
                Testimonials
              </Link>
              <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 bg-white hover:bg-gray-200 text-black rounded-md transition-colors text-sm font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-blue-500/20">
            <div className="px-6 py-6 space-y-4">
              <Link href="#features" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="block text-sm text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="#testimonials" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Testimonials
              </Link>
              <Link href="/login" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="block px-5 py-2 bg-white hover:bg-gray-200 text-black rounded-md transition-colors text-sm font-medium text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/30 mb-8">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
              <span className="text-xs text-blue-200">Trusted by 10,000+ professionals</span>
            </div>

            {/* Main Heading - Vercel style large typography */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6 text-balance">
              The complete platform to build your career.
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed mb-12 text-pretty">
              Your team's toolkit to stop configuring and start innovating. Securely connect verified candidates with
              verified employers through Sabka Pro HIRIN.
            </p>

            {/* Stats Grid - Vercel style */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-blue-500/20">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-xs text-gray-400">Candidates</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-xs text-gray-400">Employers</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-xs text-gray-400">Success</div>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Cards */}
          <div className="space-y-4">
            <div className="text-sm text-gray-300 mb-6">Get started in seconds</div>

            {/* Candidate Card */}
            <Link
              href="/register?type=candidate"
              className="group block p-8 bg-white/5 hover:bg-white/10 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Users className="w-6 h-6 text-blue-300" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">For Candidates</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Find your dream job with verified employers. Access training, build your profile, and get hired faster.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-white font-medium">
                Register as Candidate
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Employer Card */}
            <Link
              href="/register?type=employer"
              className="group block p-8 bg-white/5 hover:bg-white/10 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Building2 className="w-6 h-6 text-blue-300" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">For Employers</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Hire verified talent efficiently. Post jobs, access our ATS, and find the perfect candidates for your
                team.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-white font-medium">
                Register as Employer
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Trust Badge */}
            <div className="pt-4 text-center">
              <p className="text-xs text-gray-400">No credit card required • Free to start</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}