"use client";

import { useState } from "react";
import { Check, Sparkles, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      features: [
        "Post up to 2 active jobs",
        "Basic candidate applications",
        "Standard support",
      ],
      cta: "Current Plan",
    },
    {
      name: "Pro",
      key: "pro",
      price: "₹1499",
      period: "/month",
      features: [
        "Unlimited active jobs",
        "Advanced analytics",
        "Priority support",
        "Bulk actions on applications",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
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
    <div className="relative p-6 space-y-4 sm:space-y-5 md:space-y-6 min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(128,55,145,0.08)" }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(184,123,209,0.06)" }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl" style={{ background: "rgba(240,194,238,0.03)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl font-bold text-white mb-2">Upgrade Plan</h1>
          <p className="text-white/80">Unlock advanced features to scale your hiring</p>
        </div>
      </div>

      {message && (
        <div className="rounded-lg border border-white/10 bg-white/5 text-white px-4 py-3">
          {message}
        </div>
      )}

      <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.key}
            className={`relative overflow-hidden flex flex-col p-6 ${
              plan.highlighted ? "border-2 border-[#803791] bg-gradient-to-br from-[#803791]/8 to-[#b87bd1]/10" : "border border-white/10 bg-white/5"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 -right-3 rotate-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white text-xs font-bold">
                  <Sparkles className="w-3 h-3" /> Best Value
                </span>
              </div>
            )}

            <div className="flex items-start justify-between gap-6 mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${plan.highlighted ? "bg-gradient-to-br from-[#803791] to-[#b87bd1]" : "bg-white/10"}`}>
                  {plan.highlighted ? <Crown className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-sm text-white/70">{plan.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-sm text-white/60">{plan.period}</span>
                </div>
              </div>
            </div>

            <Button
              disabled={loading || currentPlan === plan.key}
              onClick={() => handleUpgrade(plan.key)}
              className={`w-full mb-6 ${
                plan.highlighted ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white" : "bg-white/10 border border-white/10 text-white"
              }`}
            >
              {currentPlan === plan.key ? "Current Plan" : (
                <span className="inline-flex items-center">
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              )}
            </Button>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="w-6 h-6 flex items-center justify-center rounded-md bg-white/10">
                    <Check className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-sm text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
