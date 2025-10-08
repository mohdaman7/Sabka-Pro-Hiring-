"use client";

import { useState } from "react";
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
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-34 pb-24">
        {/* Main Heading Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Welcome To The
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Professional Recruitment
            </span>
            <br />
            Service of Sabka World
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Your gateway to career success and business growth
          </p>

          {/* Quick Stats */}
        </div>

        {/* Services Grid - 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Are You Looking For Jobs */}
          <a
            href="/register?type=candidate"
            className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 cursor-pointer block shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/95 to-indigo-600/95"></div>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop"
              alt="Looking for Jobs"
              className="w-full h-full object-cover absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="relative p-8 min-h-[380px] flex flex-col">
              <div className="mb-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  Are You Looking For Jobs?
                </h3>
                <p className="text-white/90 text-base leading-relaxed mb-4">
                  Access thousands of verified job opportunities and connect
                  with top employers
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-3 text-white font-bold text-lg group-hover:gap-4 transition-all">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
          </a>

          {/* Are You Looking for Employees */}
          <a
            href="/register?type=employer"
            className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 cursor-pointer block shadow-2xl hover:shadow-emerald-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/95 to-teal-600/95"></div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop"
              alt="Looking for Employees"
              className="w-full h-full object-cover absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="relative p-8 min-h-[380px] flex flex-col">
              <div className="mb-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  Are You Looking For Employees?
                </h3>
                <p className="text-white/90 text-base leading-relaxed mb-4">
                  Hire verified talent from our curated database of skilled
                  professionals
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-3 text-white font-bold text-lg group-hover:gap-4 transition-all">
                  <span>Post Jobs</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
          </a>

          {/* Sabka Skill Academy */}
          <a
            href="/register?type=candidate"
            className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 cursor-pointer block shadow-2xl hover:shadow-orange-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/95 to-red-600/95"></div>
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop"
              alt="Sabka Skill Academy"
              className="w-full h-full object-cover absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="relative p-8 min-h-[380px] flex flex-col">
              <div className="mb-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  Sabka Skill Academy
                </h3>
                <p className="text-white/90 text-base leading-relaxed mb-4">
                  Upskill yourself with industry-leading courses and
                  certifications
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-3 text-white font-bold text-lg group-hover:gap-4 transition-all">
                  <span>Explore Courses</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
          </a>
        </div>

        {/* Sabka Visa - Featured Banner */}
        <a
          href="/visa"
          className="group block relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-[1.02] cursor-pointer mb-20 shadow-2xl hover:shadow-pink-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/95 via-purple-600/95 to-blue-600/95"></div>
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop"
            alt="Sabka Visa"
            className="w-full h-full object-cover absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="relative p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Plane className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                  Sabka Visa
                </h3>
                <p className="text-white/90 text-lg lg:text-xl max-w-2xl">
                  Your global mobility partner - Visa assistance and immigration
                  services
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white font-bold text-xl group-hover:gap-5 transition-all">
              <span>Learn More</span>
              <ArrowRight className="w-8 h-8" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
