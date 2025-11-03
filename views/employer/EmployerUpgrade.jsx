"use client";

import { useState } from "react";
import { Check, Sparkles, Crown, ArrowRight, Zap, Shield, BarChart3, Headphones } from "lucide-react";
import { employerService } from "@/services/employerService";

export default function EmployerUpgrade() {
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("free");
  const [message, setMessage] = useState("");

  const plans = [
    {
      name: "Free",
      key: "free",
      price: "₹0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "Post up to 2 active jobs",
        "Basic candidate applications",
        "Standard support",
        "Basic analytics",
      ],
      cta: "Current Plan",
      icon: Sparkles,
    },
    {
      name: "Pro",
      key: "pro",
      price: "₹1499",
      period: "/month",
      description: "For growing teams",
      features: [
        "Unlimited active jobs",
        "Advanced analytics & insights",
        "Priority 24/7 support",
        "Bulk actions on applications",
        "Custom saved views",
        "Team collaboration tools",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
      icon: Crown,
      badge: "Most Popular",
    },
  ];

  async function handleUpgrade(planKey) {
    if (planKey === currentPlan) return;
    try {
      setLoading(true);
      setMessage("");
      const res = await employerService.updatePlan(planKey);
      if (res?.success) {
        setCurrentPlan(planKey);
        setMessage(res?.message || "Plan updated");
      }
    } catch (e) {
      setMessage(e?.response?.data?.message || e?.message || "Failed to update plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen p-3 sm:p-4 md:p-6 space-y-6 sm:space-y-8 md:space-y-10">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: "rgba(128,55,145,0.15)" }} />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: "rgba(184,123,209,0.12)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(240,194,238,0.08)" }} />
      </div>

      {/* Premium Header */}
      <div className="relative text-center space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#803791]/20 to-[#b87bd1]/20 border border-[#b87bd1]/30">
          <Zap className="w-4 h-4 text-[#b87bd1]" />
          <span className="text-xs sm:text-sm font-semibold text-[#b87bd1]">Limited Time Offer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
          Unlock Your Hiring Potential
        </h1>
        <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
          Scale your recruitment with advanced features, unlimited job postings, and priority support
        </p>
      </div>

      {/* Message Alert */}
      {message && (
        <div className="relative max-w-2xl mx-auto rounded-xl p-4 sm:p-5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-sm sm:text-base font-medium">
          {message}
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto w-full">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.key}
              className={`relative group rounded-2xl overflow-hidden transition-all duration-500 ${
                plan.highlighted
                  ? "lg:scale-105 lg:shadow-2xl"
                  : ""
              }`}
            >
              {/* Animated Border Gradient */}
              <div className={`absolute inset-0 rounded-2xl ${
                plan.highlighted
                  ? "bg-gradient-to-r from-[#803791] via-[#b87bd1] to-[#803791] p-[2px]"
                  : "bg-gradient-to-r from-white/20 to-white/5 p-[1px]"
              }`}>
                <div className={`absolute inset-0 rounded-2xl ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-[#803791]/10 to-[#6a2a6f]/10"
                    : "bg-white/5"
                }`} />
              </div>

              {/* Card Content */}
              <div className={`relative rounded-2xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-[#803791]/20 to-[#6a2a6f]/20 border border-[#b87bd1]/30"
                  : "bg-white/5 border border-white/10"
              }`}>
                {/* Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#803791] to-[#b87bd1] shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-xs sm:text-sm font-bold text-white">{plan.badge}</span>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg ${
                        plan.highlighted
                          ? "bg-gradient-to-br from-[#803791] to-[#b87bd1]"
                          : "bg-white/10 border border-white/20"
                      }`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white">{plan.name}</h3>
                        <p className="text-xs sm:text-sm text-white/60 font-medium">{plan.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{plan.price}</span>
                      <span className="text-sm sm:text-base text-white/60">{plan.period}</span>
                    </div>
                    {plan.key === "pro" && (
                      <p className="text-xs sm:text-sm text-white/50">Save ₹3000+ annually</p>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  disabled={loading || currentPlan === plan.key}
                  onClick={() => handleUpgrade(plan.key)}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white hover:shadow-2xl hover:scale-105 disabled:opacity-70 disabled:scale-100"
                      : "bg-white/10 border border-white/20 text-white hover:bg-white/20 disabled:opacity-70"
                  } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {currentPlan === plan.key ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Current Plan</span>
                    </>
                  ) : (
                    <>
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Features List */}
                <div className="space-y-3 pt-4 sm:pt-6 border-t border-white/10">
                  <p className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider">Includes:</p>
                  <ul className="space-y-2.5 sm:space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.highlighted
                            ? "bg-gradient-to-br from-[#803791] to-[#b87bd1]"
                            : "bg-white/10 border border-white/20"
                        }`}>
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <span className="text-sm sm:text-base text-white/80 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Section */}
      <div className="relative max-w-4xl mx-auto mt-8 sm:mt-12 md:mt-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Why Choose Pro?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: BarChart3, title: "Advanced Analytics", desc: "Deep insights into your hiring funnel" },
                { icon: Headphones, title: "Priority Support", desc: "24/7 dedicated support team" },
                { icon: Shield, title: "Team Collaboration", desc: "Work seamlessly with your team" },
                { icon: Zap, title: "Unlimited Jobs", desc: "Post as many jobs as you need" },
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#b87bd1]/30 hover:bg-white/8 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#803791] to-[#b87bd1] flex items-center justify-center flex-shrink-0">
                        <ItemIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-sm sm:text-base">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-white/60">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative text-center space-y-4 max-w-2xl mx-auto">
        <p className="text-sm sm:text-base text-white/70">
          Need help choosing? <span className="text-white/90 font-semibold">Contact our sales team</span>
        </p>
        <p className="text-xs sm:text-sm text-white/50">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
}
