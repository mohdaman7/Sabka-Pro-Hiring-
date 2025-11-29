"use client";

import { useState } from "react";
import {
  Users,
  Building2,
  GraduationCap,
  Plane,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";

export default function LandingHero() {
  return (
    <div
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0510 0%, #2a0b2a 30%, #4b163f 60%, #120615 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: "rgba(128,55,145,0.08)" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s", background: "rgba(184,123,209,0.06)" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s", background: "rgba(240,194,238,0.03)" }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(184,123,209,0.16)",
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(251, 146, 60, 0.6),
              0 0 40px rgba(251, 146, 60, 0.4), 0 0 60px rgba(251, 146, 60, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(251, 146, 60, 0.8),
              0 0 60px rgba(251, 146, 60, 0.6), 0 0 90px rgba(251, 146, 60, 0.3);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-1 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        .delay-2 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .delay-3 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        .glow-card {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        {/* Main Heading Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="fade-in-up text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Welcome To The
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Professional Recruitment
            </span>
            <br />
            Service of Sabka World
          </h1>

          <p className="fade-in-up delay-2 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed px-4">
            Your gateway to career success and business growth
          </p>
        </div>

        {/* Featured: Sabka Skill Academy - HERO CARD */}
        <div className="fade-in-up delay-3 mb-10 sm:mb-14">
          <a
            href="/skill-academy/register"
            className="glow-card group relative block overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-700 hover:scale-[1.03] cursor-pointer"
          >
            {/* Animated glow border */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 via-pink-500 to-orange-500 opacity-75 blur-xl"></div>

            {/* Main card */}
            <div className="relative bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 rounded-2xl sm:rounded-3xl overflow-hidden">
              {/* Background image */}
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop"
                alt="Sabka Skill Academy"
                className="w-full h-full object-cover absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110"
              />

              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.5s infinite",
                }}
              ></div>

              {/* Content */}
              <div className="relative p-6 sm:p-8 lg:p-10">
                {/* Top Row: Icon and Badge */}
                <div className="flex items-start justify-between mb-5 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center border-3 sm:border-4 border-white/30 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg flex items-center gap-2 animate-pulse">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>NOW LIVE!</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-300">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-300"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Title */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 leading-tight">
                    Sabka Skill Academy
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 font-semibold leading-snug">
                    Transform Your Career with Industry-Leading Courses
                  </p>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button className="group/btn bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-2xl">
                    <span>Start Learning Now</span>
                    <ArrowRight
                      className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-2 transition-transform"
                      style={{ animation: "bounce 1s infinite" }}
                    />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-white/90 text-sm sm:text-base">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white"></div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-white"></div>
                    </div>
                    <span className="font-semibold">2,500+ Enrolled</span>
                  </div>
                </div>
              </div>

              {/* Corner shine effect */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
            </div>
          </a>
        </div>

        {/* Other Services - Minimized */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white/80 mb-4 sm:mb-6 text-center">
            More Services{" "}
            <span className="text-gray-500 text-base sm:text-lg">
              (Coming Soon)
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {/* Jobs Card */}
          <a
            href="/coming-soon"
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer block opacity-50 hover:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 to-indigo-600/70"></div>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop"
              alt="Looking for Jobs"
              className="w-full h-full object-cover absolute inset-0 opacity-30"
            />
            <div className="relative p-5 sm:p-6 min-h-[200px] sm:min-h-[220px] flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-300">
                  SOON
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Job Opportunities
              </h3>
              <p className="text-white/70 text-sm mb-3 flex-grow">
                Access verified job opportunities
              </p>
              <div className="flex items-center gap-2 text-white/80 font-semibold text-sm">
                <span>Notify Me</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* Employees Card */}
          <a
            href="/coming-soon"
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer block opacity-50 hover:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/70 to-teal-600/70"></div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop"
              alt="Looking for Employees"
              className="w-full h-full object-cover absolute inset-0 opacity-30"
            />
            <div className="relative p-5 sm:p-6 min-h-[200px] sm:min-h-[220px] flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-300">
                  SOON
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Hire Talent
              </h3>
              <p className="text-white/70 text-sm mb-3 flex-grow">
                Find skilled professionals
              </p>
              <div className="flex items-center gap-2 text-white/80 font-semibold text-sm">
                <span>Notify Me</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>

        {/* Sabka Visa Banner */}
        <a
          href="/coming-soon"
          className="group block relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-[1.01] cursor-pointer opacity-50 hover:opacity-70"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/70 via-purple-600/70 to-blue-600/70"></div>
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop"
            alt="Sabka Visa"
            className="w-full h-full object-cover absolute inset-0 opacity-20"
          />
          <div className="relative p-5 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
                <Plane className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Sabka Visa
                  </h3>
                  <div className="px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-300">
                    SOON
                  </div>
                </div>
                <p className="text-white/70 text-sm sm:text-base">
                  Visa assistance services
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/80 font-semibold text-sm sm:text-base">
              <span>Notify Me</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
