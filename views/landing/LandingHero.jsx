"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  GraduationCap,
  Plane,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  CheckCircle,
  TrendingUp,
  Shield,
} from "lucide-react";
import LandingNavbar from "./LandingNavbar";
import { AuroraText } from "@/components/ui/aurora-text";

export default function LandingHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      `}</style>

      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        {/* Main Heading Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2"
          >
            Welcome To The
            <br />
            <AuroraText>Professional Recruitment</AuroraText>
            <br />
            Service of Sabka World
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
          >
            Your gateway to career success and business growth
          </motion.p>

          {/* Quick Stats */}
        </div>

        {/* Services Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {/* Are You Looking For Jobs - Coming Soon */}
          <a
            href="/coming-soon"
            className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 cursor-pointer block shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/95 to-indigo-600/95"></div>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop"
              alt="Looking for Jobs"
              className="w-full h-full object-cover absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="relative p-6 sm:p-8 min-h-[320px] sm:min-h-[380px] flex flex-col">
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-300">
                    COMING SOON
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  Are You Looking For Jobs?
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                  Access thousands of verified job opportunities and connect
                  with top employers
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-2 sm:gap-3 text-white font-bold text-base sm:text-lg group-hover:gap-4 transition-all">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
          </a>

          {/* Are You Looking for Employees - Coming Soon */}
          <a
            href="/coming-soon"
            className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 cursor-pointer block shadow-2xl hover:shadow-emerald-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/95 to-teal-600/95"></div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop"
              alt="Looking for Employees"
              className="w-full h-full object-cover absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="relative p-6 sm:p-8 min-h-[320px] sm:min-h-[380px] flex flex-col">
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-300">
                    COMING SOON
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  Are You Looking For Employees?
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                  Hire verified talent from our curated database of skilled
                  professionals
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-2 sm:gap-3 text-white font-bold text-base sm:text-lg group-hover:gap-4 transition-all">
                  <span>Post Jobs</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
          </a>

          {/* Sabka Skill Academy */}
          <a
            href="/skill-academy/register"
            className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 cursor-pointer block shadow-2xl hover:shadow-orange-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/95 to-red-600/95"></div>
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop"
              alt="Sabka Skill Academy"
              className="w-full h-full object-cover absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="relative p-6 sm:p-8 min-h-[320px] sm:min-h-[380px] flex flex-col">
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs font-bold text-green-300">
                    AVAILABLE
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  Sabka Skill Academy
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                  Upskill yourself with industry-leading courses and
                  certifications
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-2 sm:gap-3 text-white font-bold text-base sm:text-lg group-hover:gap-4 transition-all">
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
          </a>
        </div>

        {/* Sabka Visa - Coming Soon Banner */}
        <a
          href="/coming-soon"
          className="group block relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-[1.02] cursor-pointer mb-20 shadow-2xl hover:shadow-pink-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/95 via-purple-600/95 to-blue-600/95"></div>
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop"
            alt="Sabka Visa"
            className="w-full h-full object-cover absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8 text-center sm:text-left">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0">
                <Plane className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-4 mb-2 sm:mb-3">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    Sabka Visa
                  </h3>
                  <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-300">
                    COMING SOON
                  </div>
                </div>
                <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-2xl">
                  Your global mobility partner - Visa assistance and immigration
                  services
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-white font-bold text-lg sm:text-xl group-hover:gap-5 transition-all">
              <span>Learn More</span>
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
