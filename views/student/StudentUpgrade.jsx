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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function UpgradePage() {
  const [hoveredPlan, setHoveredPlan] = useState(null);

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
    },
  ];

  const benefits = [
    {
      stat: "3x",
      label: "Higher interview rate",
      description: "Pro members get noticed faster",
      icon: TrendingUp,
    },
    {
      stat: "50+",
      label: "Premium courses",
      description: "Industry-leading training",
      icon: Target,
    },
    {
      stat: "24/7",
      label: "Expert support",
      description: "Get help when you need it",
      icon: Shield,
    },
    {
      stat: "10k+",
      label: "Success stories",
      description: "Students placed in top companies",
      icon: Users,
    },
  ];

  return (
    <div className="relative p-6 space-y-6 min-h-screen overflow-hidden">
      {/* Decorative background orbs matching dashboard theme */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
          style={{ background: "rgba(240,194,238,0.03)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
      </div>

      {/* Hero Section - glass style matching dashboard */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6"
        style={{
          background:
            "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
        }}
      >
        <div className="animate-pulse-slow mb-6">
          <Badge className="bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Zap className="w-4 h-4 mr-2 fill-yellow-400" />
            50% OFF - Limited Time Offer
            <Zap className="w-4 h-4 ml-2 fill-yellow-400" />
          </Badge>
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          Unlock Your
          <span className="bg-gradient-to-r from-[#803791] to-[#b87bd1] bg-clip-text text-transparent">
            {" "}
            Dream Career
          </span>
        </h1>

        <p className="text-xl leading-relaxed text-white/80 mb-8">
          Join thousands of students who landed their dream jobs with Pro
          features. Get priority access to opportunities and expert guidance.
        </p>

        <Button
          size="lg"
          className="relative bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-2xl hover:shadow-purple-500/30 text-lg px-8 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          Start Free Trial
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1 group"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1 transform group-hover:scale-105 transition-transform duration-300">
                {benefit.stat}
              </div>
              <div className="text-base font-semibold text-white mb-1">
                {benefit.label}
              </div>
              <div className="text-sm text-white/80">{benefit.description}</div>
            </div>
          );
        })}
      </div>

      {/* Pricing Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
        <p className="text-lg text-white/80">
          Start free, upgrade when you're ready to accelerate
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 mb-8">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <Card
              key={index}
              className={`relative overflow-hidden flex flex-col p-6 transition-all duration-500 group ${
                plan.highlighted
                  ? "border-2 border-[#803791] bg-gradient-to-br from-[#803791]/8 to-[#b87bd1]/10 shadow-2xl shadow-[#803791]/20 transform hover:scale-105"
                  : "border border-[#803791]/8 bg-white/5 hover:shadow-lg hover:scale-105"
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                transform:
                  hoveredPlan === index
                    ? "scale(1.05)"
                    : hoveredPlan !== null
                    ? "scale(0.98)"
                    : "scale(1)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              {/* Animated background elements */}
              {plan.highlighted && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#803791]/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#b87bd1]/10 rounded-full blur-2xl transform -translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                </>
              )}

              {/* Premium badge with animation */}
              {plan.badge && (
                <div className="absolute -top-3 -right-3 transform rotate-12 animate-bounce-slow">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white text-sm font-bold shadow-2xl">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header section */}
              <div className="relative flex items-start justify-between gap-6 mb-6">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`p-4 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-gradient-to-br from-[#803791] to-[#b87bd1]"
                        : "bg-gradient-to-br from-slate-600 to-slate-700"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price section */}
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-white/60">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-white/40 line-through mt-1">
                      {plan.originalPrice}
                    </div>
                  )}
                </div>
              </div>

              {/* Animated separator */}
              <div className="relative my-6 overflow-hidden">
                <div
                  className={`h-0.5 rounded-full transform transition-all duration-500 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] group-hover:scale-105"
                      : "bg-white/10"
                  }`}
                ></div>
              </div>

              {/* CTA Button */}
              <div className="relative mt-4 mb-6">
                <Button
                  size="lg"
                  className={`w-full text-base font-semibold transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-2xl hover:shadow-purple-500/30"
                      : "bg-white/10 border border-white/10 text-white/90 hover:bg-white/15 hover:border-white/20"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {plan.cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <div className="text-xs text-white/50 text-center mt-3">
                  Billed monthly • Cancel anytime
                </div>
              </div>

              {/* Features grid with staggered animation */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 group/feature transform transition-all duration-300 hover:translate-x-1"
                  >
                    <span
                      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 group-hover/feature:scale-110 ${
                        plan.highlighted
                          ? "bg-[#803791]/20 text-[#b87bd1] group-hover/feature:bg-[#803791]/30"
                          : "bg-white/10 text-white/70 group-hover/feature:bg-white/20"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </span>
                    <span className="text-sm text-white/80 leading-relaxed group-hover/feature:text-white transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {/* FAQ/Support Section */}
      <div
        className="text-center rounded-2xl border border-[#803791]/8 p-12 shadow-md hover:shadow-lg transition-shadow duration-300"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
        }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Still have questions?
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Our team is here to help you choose the right plan for your career
          goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
          >
            Contact Support
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white/10 text-white hover:bg-white/5 bg-transparent hover:scale-105 transition-all duration-300"
          >
            Schedule a Call
          </Button>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
