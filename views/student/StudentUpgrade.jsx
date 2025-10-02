"use client"

import { Check, Sparkles, Crown, ArrowRight, TrendingUp, Target, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UpgradePage() {
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
  ]

  const benefits = [
    {
      stat: "3x",
      label: "Higher interview rate",
      description: "Pro members get noticed faster",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20 hover:shadow-blue-500/40",
    },
    {
      stat: "50+",
      label: "Premium courses",
      description: "Industry-leading training",
      icon: Target,
      gradient: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20 hover:shadow-purple-500/40",
    },
    {
      stat: "24/7",
      label: "Expert support",
      description: "Get help when you need it",
      icon: Shield,
      gradient: "from-green-500 to-emerald-500",
      shadow: "shadow-green-500/20 hover:shadow-green-500/40",
    },
    {
      stat: "10k+",
      label: "Success stories",
      description: "Students placed in top companies",
      icon: Users,
      gradient: "from-cyan-500 to-blue-500",
      shadow: "shadow-cyan-500/20 hover:shadow-cyan-500/40",
    },
  ]

  return (
    <div className="-m-6 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              50% OFF - Limited Time Offer
            </Badge>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl text-balance mb-6">
              Unlock Your
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Dream Career
              </span>
            </h1>

            <p className="text-xl leading-relaxed text-white/90 text-pretty mb-8">
              Join thousands of students who landed their dream jobs with Pro features. Get priority access to
              opportunities and expert guidance.
            </p>

            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-50 shadow-xl hover:shadow-2xl text-lg px-8 hover:scale-105 transition-all duration-300 hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={index}
                  className={`text-center p-6 border border-slate-200 shadow-lg ${benefit.shadow} transition-all duration-300 hover:scale-105 hover:-translate-y-2 bg-white group`}
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {benefit.stat}
                  </div>
                  <div className="text-base font-semibold text-slate-900 mb-1">{benefit.label}</div>
                  <div className="text-sm text-slate-600">{benefit.description}</div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h2>
          <p className="text-lg text-slate-600">Start free, upgrade when you're ready to accelerate</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card
                key={index}
                className={`relative flex flex-col p-8 transition-all duration-500 group ${
                  plan.highlighted
                    ? "border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-2xl shadow-blue-600/20 hover:shadow-blue-600/40 scale-105 hover:scale-110"
                    : "border border-slate-200 bg-white hover:shadow-2xl hover:scale-105 hover:border-blue-300 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30"
                }`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 px-4 py-1 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    {plan.badge}
                  </Badge>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 ${plan.highlighted ? "bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg group-hover:shadow-xl group-hover:scale-110" : "bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-cyan-100"}`}
                  >
                    <Icon
                      className={`w-7 h-7 ${plan.highlighted ? "text-white" : "text-slate-600 group-hover:text-blue-600"} transition-colors duration-300`}
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600 text-lg">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-slate-400 line-through text-lg">{plan.originalPrice}</span>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-md">
                        Save 50%
                      </Badge>
                    </div>
                  )}
                  <p className="text-base text-slate-600 text-pretty">{plan.description}</p>
                </div>

                <Button
                  size="lg"
                  className={`w-full mb-8 text-base font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 hover:-translate-y-1"
                      : "bg-slate-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 text-slate-900 hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <ul className="space-y-4 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 group/item">
                      <div
                        className={`p-0.5 rounded-full transition-all duration-300 ${plan.highlighted ? "bg-blue-100 group-hover/item:bg-blue-200" : "bg-slate-100 group-hover/item:bg-blue-100"}`}
                      >
                        <Check
                          className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${plan.highlighted ? "text-blue-600 group-hover/item:text-cyan-600" : "text-slate-400 group-hover/item:text-blue-600"}`}
                        />
                      </div>
                      <span className="text-sm text-slate-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>

        <div className="text-center bg-white rounded-2xl border border-slate-200 p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Still have questions?</h2>
          <p className="text-slate-600 mb-8 text-lg">
            Our team is here to help you choose the right plan for your career goals.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-slate-300 text-slate-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 bg-white hover:border-blue-400 hover:scale-105 transition-all duration-300 hover:shadow-lg"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
