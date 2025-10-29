"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle2, AlertCircle, Shield, Eye, EyeOff, Sparkles } from "lucide-react";

export default function ChangePasswordModal({
  isOpen,
  onClose, // not used (mandatory), but kept for API compatibility
  onSubmit,
  submitting,
  error,
}) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [touched, setTouched] = useState({});

  const rules = [
    {
      label: "At least 8 characters",
      test: (s) => s.length >= 8,
    },
    {
      label: "Uppercase letter",
      test: (s) => /[A-Z]/.test(s),
    },
    {
      label: "Lowercase letter",
      test: (s) => /[a-z]/.test(s),
    },
    {
      label: "Number",
      test: (s) => /[0-9]/.test(s),
    },
  ];

  const allValid = rules.every((r) => r.test(form.newPassword));
  const confirmValid = form.newPassword && form.newPassword === form.confirmPassword;
  const currentFilled = form.currentPassword.length >= 6;

  const canSubmit = currentFilled && allValid && confirmValid && !submitting;

  const setField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,18,18,0.98), rgba(8,8,8,0.98))",
        }}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(184,123,209,0.15),_transparent_60%)]" />
          <div className="relative flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#803791,#b87bd1)" }}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Secure Your Account</h3>
              <p className="text-white/70 text-sm">Change your password to continue</p>
            </div>
          </div>
          <span className="absolute top-4 right-4 text-white/40 text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md">Mandatory</span>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-white/80 font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#b87bd1]" /> Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={form.currentPassword}
                onChange={(e) => setField("currentPassword", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, currentPassword: true }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 pr-12"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                aria-label="Toggle current password visibility"
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <AnimatePresence>
              {touched.currentPassword && !currentFilled && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Minimum 6 characters
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/80 font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#b87bd1]" /> New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => setField("newPassword", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, newPassword: true }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 pr-12"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                aria-label="Toggle new password visibility"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Strength rules */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {rules.map((r) => {
                const ok = r.test(form.newPassword);
                return (
                  <div key={r.label} className={`flex items-center gap-2 text-xs px-2 py-1 rounded-md border ${ok ? "text-green-300 border-green-400/30 bg-green-400/10" : "text-white/60 border-white/10 bg-white/5"}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${ok ? "text-green-300" : "text-white/40"}`} />
                    <span>{r.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/80 font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#b87bd1]" /> Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 pr-12"
                placeholder="Re-enter new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <AnimatePresence>
              {touched.confirmPassword && !confirmValid && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Passwords do not match
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Server error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-red-300 bg-red-400/10 border border-red-400/30 rounded-xl px-3 py-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <div className="text-xs text-white/60 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#b87bd1]" /> A strong password keeps your account safe
          </div>
          <button
            onClick={() => onSubmit?.(form)}
            disabled={!canSubmit}
            className={`px-5 py-3 rounded-xl font-semibold text-white transition-all shadow-lg border ${
              canSubmit
                ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:brightness-110 border-white/10"
                : "bg-white/10 text-white/60 border-white/10 cursor-not-allowed"
            }`}
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
