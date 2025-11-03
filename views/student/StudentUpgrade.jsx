"use client";

import {
  Check,
  Sparkles,
  Crown,
  ArrowRight,
  TrendingUp,
  Target,
  Shield,
  Users,
  Star,
  Zap,
  Rocket,
  Award,
  Gift,
  ChevronRight,
  CheckCircle2,
  Gem,
  Timer,
  Heart,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";

export default function UpgradePage() {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      description: "Perfect for getting started with your job search",
      features: [
        "Access to basic job listings",
        "Create standard profile",
        "Apply to 5 jobs per month",
        "Basic training courses",
        "Community support",
      ],
      cta: "Current Plan",
      highlighted: false,
      icon: Sparkles,
      color: "from-slate-500 to-slate-700",
    },
    {
      name: "Pro",
      price: "₹499",
      period: "/month",
      originalPrice: "₹999",
      description: "Accelerate your career with premium features",
      features: [
        "Unlimited job applications",
        "Priority application status",
        "Advanced video resume tools",
        "All premium training courses",
        "1-on-1 interview preparation",
        "Resume review by experts",
        "Direct messaging with recruiters",
        "Profile visibility boost",
        "Early access to new jobs",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
      icon: Crown,
      badge: "Most Popular",
      color: "from-[#803791] to-[#b87bd1]",
      savings: "Save 50%",
    },
  ];

  const benefits = [
    {
      stat: "3x",
      label: "Higher interview rate",
      description: "Pro members get noticed faster",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      stat: "50+",
      label: "Premium courses",
      description: "Industry-leading training",
      icon: Target,
      color: "from-purple-500 to-pink-500",
    },
    {
      stat: "24/7",
      label: "Expert support",
      description: "Get help when you need it",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
    },
    {
      stat: "10k+",
      label: "Success stories",
      description: "Students placed in top companies",
      icon: Users,
      color: "from-orange-500 to-red-500",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Google",
      image: "PS",
      text: "Pro membership helped me land my dream job! The expert resume review and interview prep were game-changers.",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Product Manager",
      company: "Amazon",
      image: "RV",
      text: "The priority application status got me noticed by top recruiters. Best investment in my career!",
      rating: 5,
    },
    {
      name: "Anjali Patel",
      role: "Data Analyst",
      company: "Microsoft",
      image: "AP",
      text: "Unlimited applications and premium courses accelerated my job search by months. Highly recommend!",
      rating: 5,
    },
  ];

  const exclusiveFeatures = [
    { icon: Rocket, text: "Priority application processing" },
    { icon: Award, text: "Expert career coaching" },
    { icon: Gem, text: "Premium profile badge" },
    { icon: Timer, text: "Early job access" },
    { icon: Heart, text: "Personalized job matches" },
    { icon: Gift, text: "Exclusive networking events" },
  ];

  return (
    <div className="relative p-6 space-y-4 sm:space-y-6 md:space-y-8 min-h-screen overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{
            background: "rgba(128,55,145,0.15)",
            animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div
          className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl"
          style={{
            background: "rgba(184,123,209,0.12)",
            animation: "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "rgba(240,194,238,0.08)",
            animation: "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.05),_transparent_40%)]" />

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `rgba(${128 + Math.random() * 56}, ${
                55 + Math.random() * 68
              }, ${145 + Math.random() * 64}, ${Math.random() * 0.3})`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
            transform: scale(1.5);
          }
          100% {
            transform: translateY(-100vh)
              translateX(${Math.random() * 100 - 50}px) scale(0.5);
            opacity: 0;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>

      {/* Premium Hero Section */}
      <div
        className="relative overflow-hidden rounded-3xl p-10 text-white shadow-2xl backdrop-blur-md border border-white/10 group transition-all duration-500 hover:shadow-purple-500/30"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.18), rgba(184,123,209,0.14))",
          boxShadow:
            "0 25px 60px rgba(128,55,145,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div className="absolute inset-0 shimmer" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-2xl animate-pulse" />
        <div
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative">
          <div className="flex items-center gap-4 mb-6 animate-slideInLeft">
            <div className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white text-sm font-bold shadow-2xl flex items-center gap-2 animate-pulse">
              <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <span>LIMITED TIME: 50% OFF</span>
              <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            </div>
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold">
              🔥 2,500+ upgraded this week
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 md:gap-8">
            <div className="flex-1">
              <h1 className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Unlock Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient mt-2">
                  Dream Career
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 mb-8 max-w-2xl">
                Join{" "}
                <span className="font-bold text-yellow-300">
                  10,000+ students
                </span>{" "}
                who landed their dream jobs with Pro features. Get priority
                access to opportunities and expert guidance.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group relative px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                    Start Free 7-Day Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
                <button className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-3">
                  {["#803791", "#b87bd1", "#d4a5d6", "#f0c2ee"].map(
                    (color, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white/20 flex items-center justify-center text-white font-bold shadow-lg"
                        style={{ background: color }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    )
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm">
                    Trusted by <span className="font-bold">10,000+</span>{" "}
                    students
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="relative">
              <div
                className="w-80 p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl hover:scale-105 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                }}
              >
                <div className="text-center mb-4">
                  <div className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
                    ₹499
                  </div>
                  <div className="text-white/70 line-through text-lg">
                    ₹999/month
                  </div>
                  <div className="mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-sm inline-block">
                    Save ₹500 Today!
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "Unlimited Applications",
                    "Expert Resume Review",
                    "Priority Support",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-white/90"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredBenefit(index)}
              onMouseLeave={() => setHoveredBenefit(null)}
              className="group relative rounded-2xl p-6 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.1)",
                transform:
                  hoveredBenefit === index
                    ? "translateY(-12px) scale(1.05)"
                    : hoveredBenefit !== null
                    ? "scale(0.95)"
                    : "scale(1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-br ${benefit.color}`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {benefit.stat}
                </div>
                <div className="text-lg font-bold text-white mb-2">
                  {benefit.label}
                </div>
                <div className="text-sm text-white/70 leading-relaxed">
                  {benefit.description}
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          );
        })}
      </div>

      {/* Exclusive Features Showcase */}
      <div
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm border border-white/10 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.12), rgba(184,123,209,0.08))",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent_50%)]" />

        <div className="relative text-center mb-8">
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 font-semibold mb-4">
            ✨ Exclusive Pro Features
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            Everything You Need to Succeed
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get access to premium features designed to accelerate your career
            growth
          </p>
        </div>

        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {exclusiveFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110 cursor-pointer text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-sm font-semibold leading-tight">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing Section Header */}
      <div className="text-center space-y-4">
        <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 font-semibold">
          💎 Simple, Transparent Pricing
        </div>
        <h2 className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">Choose Your Plan</h2>
        <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          Start free, upgrade when you're ready to accelerate your career
        </p>
      </div>

      {/* Premium Pricing Cards */}
      <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-500 group border-2 ${
                plan.highlighted
                  ? "border-purple-500/50 shadow-2xl shadow-purple-500/30"
                  : "border-white/10 shadow-xl"
              }`}
              style={{
                background: plan.highlighted
                  ? "linear-gradient(135deg, rgba(128,55,145,0.15), rgba(184,123,209,0.10))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                transform:
                  hoveredPlan === index
                    ? "scale(1.05)"
                    : hoveredPlan !== null
                    ? "scale(0.97)"
                    : "scale(1)",
              }}
            >
              {/* Animated background effects */}
              {plan.highlighted && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl transform -translate-x-20 translate-y-20 group-hover:scale-150 transition-transform duration-700" />
                </>
              )}

              {/* Premium badge */}
              {plan.badge && (
                <div className="absolute -top-4 -right-4 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg animate-pulse" />
                    <div className="relative px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-sm shadow-2xl flex items-center gap-2 transform rotate-12">
                      <Star className="w-4 h-4 fill-white" />
                      {plan.badge}
                      <Star className="w-4 h-4 fill-white" />
                    </div>
                  </div>
                </div>
              )}

              <div className="relative">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div
                    className={`p-5 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-br ${plan.color}`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white">
                      {plan.price}
                    </span>
                    <span className="text-base sm:text-lg md:text-xl text-white/60">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-white/40 line-through">
                        {plan.originalPrice}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-bold">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full mb-8 px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1 flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white hover:shadow-purple-500/50"
                      : "bg-white/10 border-2 border-white/20 text-white hover:bg-white/15"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {plan.cta}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>

                {/* Features */}
                <div className="space-y-4">
                  <div className="text-white/90 font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Everything includes:
                  </div>
                  <div className="grid gap-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/feature"
                      >
                        <div
                          className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-300 group-hover/feature:scale-110 ${
                            plan.highlighted
                              ? "bg-gradient-to-br from-purple-500 to-pink-500"
                              : "bg-white/10"
                          }`}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white/80 text-sm leading-relaxed group-hover/feature:text-white transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Testimonials */}
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 font-semibold mb-4">
            💬 Success Stories
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            Loved by Thousands
          </h2>
          <p className="text-white/70 text-lg">
            See what our Pro members have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {testimonial.image}
                </div>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-white/60 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <div
        className="relative text-center rounded-3xl p-12 overflow-hidden group hover:shadow-2xl transition-all duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.18), rgba(184,123,209,0.14))",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold mb-6 shadow-2xl animate-bounce-slow">
            <Gift className="w-5 h-5" />
            Limited Time Offer - 50% OFF
            <Gift className="w-5 h-5" />
          </div>

          <h2 className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-white/80 mb-8 text-xl max-w-2xl mx-auto leading-relaxed">
            Our team is here to help you choose the right plan for your career
            goals. Get personalized guidance and support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="group relative px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
                Contact Support
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            <button className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-110 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Schedule a Call
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/70">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold">7-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold">
                Money-Back Guarantee
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold">10,000+ Happy Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        }}
      >
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 font-semibold mb-4">
            ❓ Frequently Asked Questions
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Everything You Need to Know
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes! You can cancel your Pro subscription at any time. No questions asked, no hidden fees.",
            },
            {
              q: "Is there a free trial?",
              a: "Absolutely! Get 7 days of Pro features completely free. No credit card required to start.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, debit cards, UPI, net banking, and popular digital wallets.",
            },
            {
              q: "Will I get a refund if I'm not satisfied?",
              a: "Yes! We offer a 30-day money-back guarantee. If you're not happy, we'll refund you in full.",
            },
            {
              q: "How quickly will I see results?",
              a: "Most Pro members see increased interview calls within the first week. Your results may vary.",
            },
            {
              q: "Can I upgrade from Free to Pro later?",
              a: "Yes! You can upgrade to Pro at any time and keep all your existing data and applications.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Check className="w-5 h-5 text-white" />
                </div>
                {faq.q}
              </h3>
              <p className="text-white/70 leading-relaxed ml-11">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom sticky bar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-[#803791] to-[#b87bd1] backdrop-blur-lg border-t border-white/10 lg:hidden z-50 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold text-lg">₹499/mo</div>
            <div className="text-white/70 text-sm line-through">₹999/mo</div>
          </div>
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2">
            Upgrade Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
