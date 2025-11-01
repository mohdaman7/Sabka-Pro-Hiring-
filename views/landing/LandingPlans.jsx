"use client";

import { motion } from "framer-motion";
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
    <section
      id="plans"
      className="relative py-12 sm:py-16 lg:py-24 overflow-hidden"
    >
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

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight tracking-tight px-2">
            Choose Your Perfect{" "}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500"
              style={{ fontWeight: "900" }}
            >
              Career Plan
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 px-4">
            Start free or unlock premium features to accelerate your career
            growth
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className={`relative group ${
                  plan.popular ? "lg:-translate-y-4" : ""
                }`}
                style={{ animationDelay: plan.delay }}
              >
                {/* Popular badge with animation */}
                {plan.badge && (
                  <motion.div 
                    className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-20"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <motion.div
                      className={`px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r ${plan.gradient} text-white rounded-full text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-1.5 sm:gap-2`}
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        boxShadow: [
                          "0 10px 30px -10px rgba(168, 85, 247, 0.5)",
                          "0 10px 40px -10px rgba(168, 85, 247, 0.8)",
                          "0 10px 30px -10px rgba(168, 85, 247, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                      </motion.div>
                      {plan.badge}
                    </motion.div>
                  </motion.div>
                )}

                {/* Card */}
                <div
                  className={`relative h-full bg-slate-900/60 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                    plan.popular
                      ? "border-purple-400/60 shadow-[0_20px_70px_-15px_rgba(168,85,247,0.4)]"
                      : "border-slate-700/50 hover:border-blue-400/60 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.3)]"
                  }`}
                >
                  {/* Gradient background overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
                  ></div>

                  {/* Animated gradient border on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${plan.borderGradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500`}
                  ></div>
                  
                  {/* Premium shine effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Content */}
                  <div className="relative p-6 sm:p-8">
                    {/* Icon with premium animation */}
                    <div className="mb-4 sm:mb-6">
                      <motion.div
                        className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${plan.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20`}
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: 12,
                          boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.5)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                      </motion.div>
                    </div>

                    {/* Plan name */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 min-h-[40px]">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                        >
                          {plan.price}
                        </span>
                        {plan.period !== "Forever" && (
                          <span className="text-gray-400 text-xs sm:text-sm">
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      {plan.period === "Forever" && (
                        <span className="text-gray-400 text-xs sm:text-sm">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* CTA Button with premium effects */}
                    <motion.button
                      className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white mb-6 sm:mb-8 relative overflow-hidden group/btn ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} shadow-xl`
                          : "bg-slate-800 border-2 border-slate-600"
                      }`}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: plan.popular 
                          ? "0 20px 40px -12px rgba(168, 85, 247, 0.6)"
                          : "0 10px 30px -10px rgba(100, 116, 139, 0.5)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="relative z-10">{plan.cta}</span>
                      {plan.popular && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                    </motion.button>

                    {/* Features */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>What's included:</span>
                      </div>
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 sm:gap-3 text-gray-300 group-hover:translate-x-1 transition-transform duration-300"
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div
                            className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mt-0.5`}
                          >
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm leading-relaxed">
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
