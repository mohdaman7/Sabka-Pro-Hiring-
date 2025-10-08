"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import LandingNavbar from "./LandingNavbar";

export default function LandingHero() {
  return (
    <div className="relative bg-background text-foreground">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-blue-radial opacity-30" />

      <LandingNavbar />

      {/* Hero Content */}
      <div className="relative max-w-[95%] mx-auto px-4 lg:px-6 pt-30 pb-12">
        <div className="grid lg:grid-cols-2 gap-4 items-start">
          {/* Left Column - Main Card */}
          <div className="bg-card text-card-foreground rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center border border-border min-h-[420px]">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 right-0 w-64 h-64 gradient-blue rounded-full blur-3xl opacity-30"></div>
            {/* Decorative doodle pattern */}
            <div className="absolute right-0 top-0 w-96 h-96 opacity-20 text-muted-foreground">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full text-muted-foreground"
              >
                <path
                  d="M200,50 Q250,80 280,120 T320,200"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="250" cy="100" r="8" className="fill-current" />
                <path
                  d="M150,150 Q180,120 220,140"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="180" cy="180" r="6" className="fill-current" />
                <path
                  d="M280,250 L290,260 M285,250 L295,260"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="320"
                  cy="280"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M220,300 Q240,320 260,300"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Urgency Badge */}
              <div className="inline-block mb-4">
                <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm font-medium border border-destructive/20">
                  Next group starts in 3 days!
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-5xl lg:text-6xl font-bold text-card-foreground leading-tight mb-4">
                Book Your Seats
                <br />
                NOW
              </h1>

              {/* Compelling Subheading */}
              <p className="text-xl text-muted-foreground mb-3 leading-relaxed font-medium">
                Transform your career with expert guidance
              </p>

              <p className="text-base text-muted-foreground/80 mb-8 leading-relaxed">
                Join our comprehensive program designed to help you land your
                dream job. Get personalized mentorship, industry insights, and
                the skills you need to succeed in today's competitive job
                market.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">
                    Expert mentorship from industry leaders
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">
                    Personalized career roadmap & guidance
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">
                    Interview preparation & resume building
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button className="bg-gradient-blue text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 shadow-xl hover:shadow-2xl relative overflow-hidden group">
                  <span className="relative z-10">Get started →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
                {/* Supporting Text Below CTA */}
                <p className="text-xs text-muted-foreground/70 mt-2">
                  No credit card required • Start your journey today
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Cards Stack */}
          <div className="space-y-4 h-full flex flex-col min-h-[420px]">
            {/* Employee Card */}
            <Link
              href="/register?type=employer"
              className="group block rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 relative border border-white/10 flex-[2]"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(128,55,145,0.06), rgba(128,55,145,0.02))",
                }}
              ></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                alt="Employee collaboration"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-medium">
                  Employee
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  Welcome to the Employee Portal
                </h3>
                <button className="bg-white text-gray-900 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-200">
                  Click Here
                </button>
              </div>
            </Link>

            {/* Candidate Card */}
            <Link
              href="/register?type=candidate"
              className="group bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center border border-purple-400/20 relative overflow-hidden flex-1"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-white">Candidate</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-4 border-purple-600"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-600 border-4 border-purple-600"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-purple-500 border-4 border-purple-600"></div>
                </div>
                <span className="text-white font-medium">+56 mentors</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
