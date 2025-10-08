"use client";

import {
  Briefcase,
  Users,
  GraduationCap,
  Shield,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";

export default function LandingFeatures() {
  const features = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description:
        "All candidates and employers go through a rigorous verification process to ensure authenticity and quality.",
      bgImage:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop",
      gradient: "from-purple-700/90 to-indigo-900/95",
      accent: "rgba(128,55,145,0.25)",
      iconBg: "bg-purple-700/30",
    },
    {
      icon: Briefcase,
      title: "Smart Job Matching",
      description:
        "Our AI-powered system matches candidates with the most suitable job opportunities based on skills and preferences.",
      bgImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
      gradient: "from-fuchsia-700/90 to-purple-900/95",
      accent: "rgba(171, 0, 157, 0.25)",
      iconBg: "bg-fuchsia-700/30",
    },
    {
      icon: GraduationCap,
      title: "Professional Training",
      description:
        "Access industry-leading courses and training programs to enhance your skills and career prospects.",
      bgImage:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop",
      gradient: "from-indigo-700/90 to-violet-900/95",
      accent: "rgba(75, 0, 130, 0.25)",
      iconBg: "bg-indigo-700/30",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description:
        "Get personalized assistance from our expert team throughout your job search or hiring journey.",
      bgImage:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop",
      gradient: "from-violet-700/90 to-purple-900/95",
      accent: "rgba(94, 50, 143, 0.25)",
      iconBg: "bg-violet-700/30",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Track your progress, get insights, and receive recommendations to accelerate your career growth.",
      bgImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      gradient: "from-purple-700/90 to-fuchsia-900/95",
      accent: "rgba(128,55,145,0.25)",
      iconBg: "bg-purple-700/30",
    },
    {
      icon: Clock,
      title: "Quick Placement",
      description:
        "Our streamlined process ensures faster job placements with an average time of just 2 weeks.",
      bgImage:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
      gradient: "from-pink-700/90 to-purple-900/95",
      accent: "rgba(219, 39, 119, 0.25)",
      iconBg: "bg-pink-700/30",
    },
  ];

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Animated subtle pulse blobs to match background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-[pulse_7s_ease-in-out_infinite]"
          style={{ background: "rgba(128,55,145,0.1)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-[pulse_7s_ease-in-out_1s_infinite]"
          style={{ background: "rgba(184,123,209,0.08)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-[pulse_7s_ease-in-out_2s_infinite]"
          style={{ background: "rgba(240,194,238,0.04)" }}
        />
      </div>

      {/* Floating particles with color matching background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-25"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(184,123,209,${0.1 + Math.random() * 0.15})`,
              animation: `float ${
                6 + Math.random() * 12
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-18px) translateX(8px);
          }
          50% {
            transform: translateY(-36px) translateX(-8px);
          }
          75% {
            transform: translateY(-18px) translateX(4px);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>

      <div className="relative max-w-[95%] mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 select-none">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6 backdrop-blur-sm border-purple-600 bg-gradient-to-r from-purple-700/30 to-indigo-900/30"
            aria-label="Section introduction"
          >
            <span
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ background: "#b87bd1" }}
            />
            <span className="text-sm font-semibold text-purple-200 tracking-wide">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Everything You Need to{" "}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
              style={{ fontWeight: "900" }}
            >
              Succeed
            </span>
          </h2>
          <p className="text-lg md:text-xl text-purple-300 max-w-xl mx-auto select-text">
            Comprehensive features designed to make hiring and job searching
            seamless and effective
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-lg shadow-purple-900/40 transition-transform duration-500 hover:scale-[1.07] hover:-translate-y-3 hover:shadow-xl hover:shadow-purple-700/60 cursor-pointer"
                aria-labelledby={`feature-title-${index}`}
                aria-describedby={`feature-desc-${index}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={feature.bgImage || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-full object-cover brightness-75 transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} transition-opacity duration-500`}
                  />
                  {/* Dark overlay for text contrast */}
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content */}
                <div className="relative p-8 min-h-[320px] flex flex-col text-white">
                  {/* Icon */}
                  <div
                    className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/20 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${feature.iconBg}`}
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>

                  {/* Title */}
                  <h3
                    id={`feature-title-${index}`}
                    className="text-2xl font-extrabold mb-3 tracking-wide transition-transform duration-300 group-hover:translate-x-2"
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    id={`feature-desc-${index}`}
                    className="text-gray-300 leading-relaxed flex-grow select-text"
                  >
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 select-none">
                    <span className="text-sm tracking-wide">Learn more</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 rounded-bl-full pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center select-none">
          <div className="max-w-2xl mx-auto relative">
            {/* Subtle gradient glow */}
            <div
              className="absolute inset-0 blur-3xl -z-10 rounded-xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(128,55,145,0.2), transparent)",
              }}
            />

            <p className="text-purple-300 mb-8 text-lg tracking-wide">
              Ready to experience these features?
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Primary button with brand gradient and subtle shine */}
              <button
                className="group relative px-8 py-4 text-white rounded-xl font-extrabold text-base transition-transform duration-300 hover:shadow-[0_10px_40px_rgba(128,55,145,0.4)] hover:scale-105 min-w-[200px] overflow-hidden"
                style={{
                  background: "linear-gradient(90deg,#803791,#b87bd1)",
                  boxShadow: "0 10px 40px rgba(128,55,145,0.35)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                  Get Started Free
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              {/* Secondary button with subtle border glow */}
              <button
                className="group relative px-8 py-4 bg-slate-900/90 backdrop-blur-md text-white rounded-xl font-semibold text-base transition-transform duration-300 hover:scale-105 min-w-[200px] border-2 border-white/30 hover:border-white/50 shadow-sm"
                aria-label="Schedule a demo"
              >
                <span className="relative z-10 tracking-wide">
                  Schedule Demo
                </span>
              </button>
            </div>

            <p className="text-purple-400 text-sm mt-6 select-text tracking-wide">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
