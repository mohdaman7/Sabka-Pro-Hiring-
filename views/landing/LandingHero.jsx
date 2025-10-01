"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, CheckCircle2 } from "lucide-react"

export default function LandingHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative bg-[#0f172a] text-white">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a] border-b border-blue-400/10 shadow-lg shadow-blue-900/5">
        <div className="max-w-[95%] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105 bg-white">
                <img src="/sabka-logo.png" alt="Sabka Pro" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight">Sabka Pro HIRING</span>
                <span className="text-[10px] text-blue-300/70 -mt-1">Your Career Partner</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="#features"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                Testimonials
              </Link>

              <div className="ml-4 h-6 w-px bg-blue-400/20"></div>

              <Link
                href="/login"
                className="ml-2 px-5 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-slate-900/98 to-blue-900/95 backdrop-blur-2xl border-t border-blue-400/10">
            <div className="px-6 py-6 space-y-2">
              <Link
                href="#features"
                className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                Testimonials
              </Link>

              <div className="h-px bg-blue-400/20 my-4"></div>

              <Link
                href="/login"
                className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-semibold text-center shadow-lg shadow-blue-500/30"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative max-w-[95%] mx-auto px-4 lg:px-6 pt-36 pb-12">
        <div className="grid lg:grid-cols-2 gap-4 items-start">
          {/* Left Column - Main Card */}
          <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center border border-blue-100/50 min-h-[420px]">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
            {/* Decorative doodle pattern */}
            <div className="absolute right-0 top-0 w-96 h-96 opacity-20">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <path d="M200,50 Q250,80 280,120 T320,200" stroke="#000" strokeWidth="2" fill="none" />
                <circle cx="250" cy="100" r="8" fill="#000" />
                <path d="M150,150 Q180,120 220,140" stroke="#000" strokeWidth="2" fill="none" />
                <circle cx="180" cy="180" r="6" fill="#000" />
                <path d="M280,250 L290,260 M285,250 L295,260" stroke="#000" strokeWidth="2" />
                <circle cx="320" cy="280" r="10" stroke="#000" strokeWidth="2" fill="none" />
                <path d="M220,300 Q240,320 260,300" stroke="#000" strokeWidth="2" fill="none" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Urgency Badge */}
              <div className="inline-block mb-4">
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium border border-red-200">
                  Next group starts in 3 days!
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Book Your Seats
                <br />
                NOW
              </h1>

              {/* Compelling Subheading */}
              <p className="text-xl text-gray-600 mb-3 leading-relaxed font-medium">
                Transform your career with expert guidance
              </p>

              <p className="text-base text-gray-500 mb-8 leading-relaxed">
                Join our comprehensive program designed to help you land your dream job. Get personalized mentorship,
                industry insights, and the skills you need to succeed in today's competitive job market.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Expert mentorship from industry leaders</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Personalized career roadmap & guidance</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Interview preparation & resume building</span>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-black hover:via-gray-900 hover:to-black transition-all duration-200 shadow-xl hover:shadow-2xl relative overflow-hidden group">
                  <span className="relative z-10">Get started →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Cards Stack */}
          <div className="space-y-5 h-full flex flex-col min-h-[420px]">
            {/* Employee Card */}
            <Link
              href="/register?type=employer"
              className="group block rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 relative border border-white/10 flex-[2]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-orange-800/85 to-amber-800/90"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                alt="Employee collaboration"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-medium">
                  Employee
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-2">Welcome to the Employee Portal</h3>
                <button className="bg-white text-gray-900 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-200">
                  Click Here
                </button>
              </div>
            </Link>

            {/* Candidate Card */}
            <Link
              href="/register?type=candidate"
              className="group block bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center border border-purple-400/20 relative overflow-hidden flex-1"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-white">Candidate</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-4 border-purple-600"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-purple-600"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-4 border-purple-600"></div>
                </div>
                <span className="text-white font-medium">+56 mentors</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
