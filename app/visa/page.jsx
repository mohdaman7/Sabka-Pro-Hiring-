"use client";

import { useState } from "react";
import {
  Plane,
  Globe,
  Clock,
  Mail,
  Sparkles,
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import LandingNavbar from "@/views/landing/LandingNavbar";

export default function VisaComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Here you would typically send the email to your backend
    }
  };

  const features = [
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Visa services for 50+ countries worldwide",
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Quick and efficient visa processing",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Dedicated visa consultants for personalized assistance",
    },
    {
      icon: MapPin,
      title: "Multiple Destinations",
      description: "Study, work, and travel visas available",
    },
  ];

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
        {[...Array(50)].map((_, i) => (
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

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.8),
              0 0 60px rgba(168, 85, 247, 0.4);
          }
        }

        @keyframes slideIn {
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
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
      `}</style>

      {/* Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Header Section */}
        <div className="text-center mb-16 animate-slide-in">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border mb-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 animate-glow"
            style={{
              background:
                "linear-gradient(90deg, rgba(236,72,153,0.15), rgba(168,85,247,0.1))",
              borderColor: "rgba(236,72,153,0.3)",
            }}
          >
            <Sparkles
              className="w-5 h-5 animate-pulse"
              style={{ color: "#ec4899" }}
            />
            <span className="text-sm font-bold" style={{ color: "#f0c2ee" }}>
              Coming Soon
            </span>
          </div>

          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-glow">
              <Plane className="w-16 h-16 text-white animate-bounce-slow" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Star
                className="w-8 h-8 text-yellow-400 animate-spin"
                style={{ animationDuration: "4s" }}
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Sabka Visa
            </span>
            <br />
            Is Coming Soon!
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Your gateway to global opportunities. We're building something
            amazing to make your international dreams come true.
          </p>
        </div>

        {/* Launch Status Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <div
            className="p-8 rounded-3xl backdrop-blur-sm border border-white/10 text-center animate-slide-in"
            style={{
              background:
                "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.05))",
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Something Amazing is Coming
            </h3>
            <p className="text-gray-300 text-lg">
              We're working hard to bring you the best visa and immigration
              services. Stay tuned for the launch announcement!
            </p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Notified When We Launch
            </h2>
            <p className="text-gray-300 text-lg">
              Be the first to know when Sabka Visa goes live and get exclusive
              early access benefits.
            </p>
          </div>

          {isSubscribed ? (
            <div className="text-center p-8 rounded-3xl backdrop-blur-sm border border-emerald-500/30 animate-slide-in">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Thank You for Subscribing!
              </h3>
              <p className="text-gray-300">
                We'll notify you as soon as Sabka Visa is ready. Get ready for
                your global journey!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in"
            >
              <div className="relative flex-1 max-w-md">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 group"
              >
                Notify Me
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 hover:gap-3 group"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-slow"
        >
          <ArrowRight className="w-6 h-6 rotate-90" />
        </button>
      </div>
    </div>
  );
}
