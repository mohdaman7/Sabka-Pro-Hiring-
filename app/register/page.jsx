"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import CandidateLeadForm from "@/views/forms/CandidateLeadForm";
import EmployerLeadForm from "@/views/forms/EmployerLeadForm";
import CandidateLeadSuccess from "@/views/success-pages/CandidateLeadSuccess";
import EmployerLeadSuccess from "@/views/success-pages/EmployerLeadSuccess";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Users,
  Building2,
  ArrowRight,
  CheckCircle,
  Shield,
  TrendingUp,
  Sparkles,
} from "lucide-react";

function RegisterContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // State for success pages
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleRegistrationSuccess = (data) => {
    setUserData(data);
    setRegistrationComplete(true);
  };

  const handleBackToHome = () => {
    if (type === "candidate") {
      window.location.href = "/student/dashboard";
    } else {
      window.location.href = "/employer/dashboard";
    }
  };

  // If registration is complete, show success page
  if (registrationComplete) {
    return type === "candidate" ? (
      <CandidateLeadSuccess
        userData={userData}
        onBackToHome={handleBackToHome}
      />
    ) : (
      <EmployerLeadSuccess
        userData={userData}
        onBackToHome={handleBackToHome}
      />
    );
  }

  // If type is selected, show the form directly without wrapper
  if (type) {
    return type === "candidate" ? (
      <CandidateLeadForm onSuccess={handleRegistrationSuccess} />
    ) : (
      <EmployerLeadForm onSuccess={handleRegistrationSuccess} />
    );
  }

  // Show selection UI if no type is selected
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
        .animate-pulse-custom {
          animation: pulse 3s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-custom" />
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-custom delay-1000"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-custom delay-500"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0">
        <div className="max-w-[95%] mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full overflow-hidden shadow-lg bg-white">
                <img
                  src="/sabka-logo.png"
                  alt="Sabka Pro"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                Sabka Pro Hiring
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-12">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slideUp delay-200">
              Join as a{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Candidate
              </span>{" "}
              or{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Employer
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto animate-slideUp delay-300">
              Start your career journey or find the perfect talent with India's
              most trusted professional recruitment platform
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Candidate Card */}
            <Link
              href="/register?type=candidate"
              className="group relative cursor-pointer animate-slideInLeft delay-400"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 h-full group-hover:scale-[1.02] group-hover:border-purple-500/50">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Users className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold text-white mb-3">
                  I'm a Candidate
                </h3>
                <p className="text-white/60 text-lg mb-6 leading-relaxed">
                  I'm looking for job opportunities and want to grow my career
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span>Browse and apply to thousands of jobs</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span>Access Sabka Skill Academy courses</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span>Get matched with top employers</span>
                  </div>
                </div>

                {/* Button */}
                <div className="flex items-center justify-between text-white font-semibold group-hover:text-purple-300 transition-colors">
                  <span>Get Started</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>

            {/* Employer Card */}
            <Link
              href="/register?type=employer"
              className="group relative cursor-pointer animate-slideInRight delay-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-cyan-600/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 h-full group-hover:scale-[1.02] group-hover:border-blue-500/50">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Building2 className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold text-white mb-3">
                  I'm an Employer
                </h3>
                <p className="text-white/60 text-lg mb-6 leading-relaxed">
                  I want to hire talented professionals and post job openings
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span>Post unlimited job openings</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span>Access verified candidate database</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span>Streamlined recruitment process</span>
                  </div>
                </div>

                {/* Button */}
                <div className="flex items-center justify-between text-white font-semibold group-hover:text-blue-300 transition-colors">
                  <span>Get Started</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-12 animate-slideUp delay-600">
            <p className="text-white/40">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-12 border-t border-white/10 animate-slideUp delay-700">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/60">Secure & Verified</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-white/60">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">1M+</div>
              <div className="text-sm text-white/60">Professionals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            <p className="text-white/60 font-medium">
              Loading registration form...
            </p>
          </div>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
