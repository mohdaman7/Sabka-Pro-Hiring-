"use client";

import {
  Check,
  Zap,
  Crown,
  Rocket,
  Star,
  TrendingUp,
  Award,
  Sparkles,
} from "lucide-react";

export default function LandingPlans() {
  const plans = [
    {
      name: "Free Plan",
      icon: Rocket,
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started with your career journey",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      borderGradient: "from-blue-400 to-cyan-400",
      features: [
        "Basic job search access",
        "5 job applications per month",
        "Standard profile visibility",
        "Email support",
        "Job alerts & notifications",
        "Resume templates",
      ],
      popular: false,
      cta: "Get Started Free",
      delay: "0ms",
    },
    {
      name: "Pro Plan",
      icon: Crown,
      price: "₹999",
      period: "per month",
      description:
        "Accelerate your career with premium features and expert guidance",
      gradient: "from-purple-500 via-pink-500 to-orange-500",
      bgGradient: "from-purple-500/10 via-pink-500/10 to-orange-500/10",
      borderGradient: "from-purple-400 via-pink-400 to-orange-400",
      features: [
        "Everything in Free Plan",
        "Unlimited job applications",
        "Priority profile visibility",
        "AI-powered job matching",
        "Advanced resume building tools",
        "Interview preparation guide",
        "Priority support 24/7",
        "Skill assessment tests",
        "Career counseling sessions",
        "Personal brand building",
        "LinkedIn profile optimization",
        "Mock interview sessions",
        "Exclusive job opportunities",
      ],
      popular: true,
      cta: "Start Free Trial",
      badge: "Most Popular",
      delay: "100ms",
    },
  ];

  return (
    <section id="plans" className="relative py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: "rgba(128,55,145,0.06)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s", background: "rgba(184,123,209,0.04)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s", background: "rgba(240,194,238,0.03)" }}
        />
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
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-[#e8cfee]">
              Simple Pricing
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Choose Your Perfect{" "}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500"
              style={{ fontWeight: "900" }}
            >
              Career Plan
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Start free or unlock premium features to accelerate your career
            growth
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 hover:scale-105 ${
                  plan.popular ? "lg:-translate-y-4" : ""
                }`}
                style={{ animationDelay: plan.delay }}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div
                      className={`px-6 py-2 bg-gradient-to-r ${plan.gradient} text-white rounded-full text-sm font-bold shadow-xl flex items-center gap-2`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`relative h-full bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                    plan.popular
                      ? "border-purple-400/50 shadow-2xl shadow-purple-500/20"
                      : "border-slate-700/50 hover:border-blue-400/50"
                  }`}
                >
                  {/* Gradient background overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
                  ></div>

                  {/* Animated gradient border on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${plan.borderGradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                  ></div>

                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:rotate-6`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Plan name */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                        >
                          {plan.price}
                        </span>
                        {plan.period !== "Forever" && (
                          <span className="text-gray-400 text-sm">
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      {plan.period === "Forever" && (
                        <span className="text-gray-400 text-sm">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-4 rounded-xl font-semibold text-white mb-8 transition-all duration-300 relative overflow-hidden group/btn ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} shadow-lg hover:shadow-2xl hover:shadow-purple-500/50`
                          : "bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500"
                      }`}
                    >
                      <span className="relative z-10">{plan.cta}</span>
                      {plan.popular && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      )}
                    </button>

                    {/* Features */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-4">
                        <Award className="w-4 h-4" />
                        <span>What's included:</span>
                      </div>
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-gray-300 group-hover:translate-x-1 transition-transform duration-300"
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mt-0.5`}
                          >
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative corner gradient */}
                  <div
                    className={`absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl ${plan.gradient} opacity-10 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-tl-full`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
