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
      gradient: "from-purple-600/90 to-indigo-800/95",
    },
    {
      icon: Briefcase,
      title: "Smart Job Matching",
      description:
        "Our AI-powered system matches candidates with the most suitable job opportunities based on skills and preferences.",
      bgImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
      gradient: "from-fuchsia-600/90 to-purple-800/95",
    },
    {
      icon: GraduationCap,
      title: "Professional Training",
      description:
        "Access industry-leading courses and training programs to enhance your skills and career prospects.",
      bgImage:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop",
      gradient: "from-indigo-600/90 to-violet-800/95",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description:
        "Get personalized assistance from our expert team throughout your job search or hiring journey.",
      bgImage:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop",
      gradient: "from-violet-600/90 to-purple-800/95",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Track your progress, get insights, and receive recommendations to accelerate your career growth.",
      bgImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      gradient: "from-purple-600/90 to-fuchsia-800/95",
    },
    {
      icon: Clock,
      title: "Quick Placement",
      description:
        "Our streamlined process ensures faster job placements with an average time of just 2 weeks.",
      bgImage:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
      gradient: "from-pink-600/90 to-purple-800/95",
    },
  ];

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
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
        {[...Array(20)].map((_, i) => (
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

      <div className="relative max-w-[95%] mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(90deg, rgba(128,55,145,0.12), rgba(184,123,209,0.08))",
              borderColor: "rgba(128,55,145,0.18)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#b87bd1" }}
            ></span>
            <span className="text-sm font-semibold text-[#e8cfee]">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Everything You Need to{" "}
            <span className="gradient-text-blue">Succeed</span>
          </h2>
          <p className="text-xl text-gray-400">
            Comprehensive features designed to make hiring and job searching
            seamless and effective
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={feature.bgImage || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay - Purple theme */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} transition-opacity duration-500`}
                  ></div>
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Content */}
                <div className="relative p-8 min-h-[320px] flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-6 shadow-xl">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 transition-all duration-300 group-hover:translate-x-1">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 leading-relaxed text-base flex-grow">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm">Learn more</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto relative">
            {/* Subtle gradient glow */}
            <div
              className="absolute inset-0 blur-3xl -z-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(128,55,145,0.15), transparent)",
              }}
            ></div>

            <p className="text-gray-400 mb-8 text-lg">
              Ready to experience these features?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary button with brand gradient */}
              <button
                className="group relative px-8 py-4 text-white rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:scale-105 min-w-[200px] overflow-hidden"
                style={{
                  background: "linear-gradient(90deg,#803791,#b87bd1)",
                  boxShadow: "0 10px 40px rgba(128,55,145,0.3)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <Sparkles className="w-4 h-4" />
                </span>
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              {/* Secondary button */}
              <button className="group relative px-8 py-4 bg-slate-900/80 backdrop-blur-sm text-white rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 min-w-[200px] border-2 border-white/20 hover:border-white/40">
                <span className="relative z-10">Schedule Demo</span>
              </button>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
