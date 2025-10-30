"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  LineChart,
  PieChart,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useLeadViewModel } from "@/viewmodels/LeadViewModel";
import { leadService } from "@/services/leadService";
import { cn } from "@/lib/utils";
import { customToast } from "@/components/ui/toast";

function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "0%";
  return `${Math.round(value)}%`;
}

function formatCurrency(value) {
  if (!value) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LeadsInsights() {
  const { fetchLeadStats } = useLeadViewModel();
  const [stats, setStats] = useState(null);
  const [sourceStats, setSourceStats] = useState([]);
  const [staffPerformance, setStaffPerformance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [{ success, stats: leadStats }, sourceRes, staffRes] = await Promise.all([
          fetchLeadStats(),
          leadService.getLeadsBySource(),
          leadService.getStaffPerformance(),
        ]);

        if (success) {
          setStats(leadStats);
        }

        if (sourceRes?.success) {
          setSourceStats(sourceRes.data || []);
        }

        if (staffRes?.success) {
          setStaffPerformance(staffRes.data || []);
        }
      } catch (err) {
        customToast.error("Insights", err.message || "Unable to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fetchLeadStats]);

  const funnel = useMemo(() => {
    const total = stats?.statusBreakdown?.reduce((sum, item) => sum + item.count, 0) || 0;
    return (stats?.statusBreakdown || []).map((item) => ({
      ...item,
      percent: total ? (item.count / total) * 100 : 0,
    }));
  }, [stats]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent px-6 pb-10 pt-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <Link
              href="/crm/leads"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to workspace
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white/60">
              <Sparkles className="h-3.5 w-3.5 text-[#ffd6ff]" /> Predictive intelligence
            </div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">Performance insights</h1>
            <p className="max-w-2xl text-sm text-white/70 md:text-base">
              Measure pipeline efficiency, double down on the channels that work, and reward high-performing advisors. Updated in real time as your team engages with leads.
            </p>
          </div>

          <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
              <p className="text-xs uppercase tracking-widest text-white/50">Total leads</p>
              <p className="mt-2 text-3xl font-semibold text-white">{stats?.totalLeads ?? "--"}</p>
              <p className="mt-3 text-xs text-white/50">Captured across all sources in the current quarter.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 p-4 text-white">
              <p className="text-xs uppercase tracking-widest text-white/80">Conversion rate</p>
              <p className="mt-2 text-3xl font-semibold">{formatPercent(stats?.conversionRate)}</p>
              <p className="mt-3 text-xs text-white/80">Maintain 35%+ by optimising follow-up cadences.</p>
            </div>
          </div>
        </div>

        {/* Funnel cards */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          {funnel.map((stage) => (
            <div
              key={stage._id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.12), transparent)",
              }}></div>
              <div className="relative space-y-3 text-white">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/60">
                  <span>{stage._id.replace("_", " ")}</span>
                  <span>{formatPercent(stage.percent)}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#b87bd1] to-[#803791]"
                    style={{ width: `${stage.percent}%` }}
                  ></div>
                </div>
                <p className="text-2xl font-semibold">{stage.count}</p>
                <p className="text-xs text-white/50">Leads currently in this stage.</p>
              </div>
            </div>
          ))}
        </section>

        {/* Source analytics */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Source performance</p>
                <h2 className="text-xl font-semibold">Conversion by acquisition channel</h2>
              </div>
              <PieChart className="h-5 w-5 text-white/60" />
            </div>
            <div className="space-y-3">
              {(sourceStats || []).map((source) => {
                const conversion = source.count ? (source.converted / source.count) * 100 : 0;
                return (
                  <div
                    key={source._id}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.04] p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold uppercase text-white/80">
                      {source._id?.slice(0, 2) || "--"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span className="text-white/80">{source._id?.replace("_", " ")}</span>
                        <span className="text-white/60">{source.count} leads</span>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-white/60">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#ffd6ff] to-[#b87bd1]"
                            style={{ width: `${conversion}%` }}
                          ></div>
                        </div>
                        <span className="min-w-[64px] text-right">{formatPercent(conversion)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {sourceStats?.length === 0 && !loading && (
                <p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.04] p-4 text-center text-sm text-white/50">
                  No channel analytics yet. Start capturing leads to view insights.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-b from-[#21153a] to-[#120223] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Revenue projection</p>
                <h2 className="text-xl font-semibold">Forecast overview</h2>
              </div>
              <LineChart className="h-5 w-5 text-white/60" />
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-white/50">Projected revenue</p>
                <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(stats?.totalValue)}</p>
                <p className="mt-2 text-xs text-white/60">Includes expected conversion value from open deals.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-white/50">Momentum score</p>
                <div className="mt-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-300" />
                  <span className="text-lg font-semibold text-white">On track</span>
                </div>
                <p className="mt-2 text-xs text-white/60">Keep proposal follow-ups within 48 hours to maximise the win rate.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Staff leaderboard */}
        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">Advisor performance</p>
              <h2 className="text-xl font-semibold">Leaderboard & incentives</h2>
            </div>
            <BarChart3 className="h-5 w-5 text-white/60" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5 text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-white/50">
                  <th className="py-3">Advisor</th>
                  <th className="py-3">Leads</th>
                  <th className="py-3">Converted</th>
                  <th className="py-3">Conversion rate</th>
                  <th className="py-3">Total value</th>
                  <th className="py-3">Avg. score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {(staffPerformance || []).map((row) => (
                  <tr key={row.staffEmail} className="hover:bg-white/5">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 uppercase text-xs font-semibold text-white/80">
                          {row.staffName?.split(" ")
                            .map((part) => part.charAt(0))
                            .join("") || "--"}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{row.staffName}</p>
                          <p className="text-xs text-white/50">{row.staffEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">{row.totalLeads}</td>
                    <td className="py-3">{row.convertedLeads}</td>
                    <td className="py-3">{formatPercent(row.conversionRate)}</td>
                    <td className="py-3">{formatCurrency(row.totalValue)}</td>
                    <td className="py-3">{row.avgScore ?? "--"}</td>
                  </tr>
                ))}
                {staffPerformance?.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-sm text-white/50">
                      Staff leaderboard will appear once leads are assigned.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
          <p>Need deeper segmented reports? Export CSV to collaborate with finance or marketing teams.</p>
          <Link
            href="/crm/leads"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
          >
            Go to lead workspace <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
