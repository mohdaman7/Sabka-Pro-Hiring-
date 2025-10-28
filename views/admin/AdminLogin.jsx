"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { authService } from "@/services/authService";

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.adminLogin(formData.email, formData.password);
      
      if (response.success) {
        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Redirect to CRM dashboard
        router.push("/crm");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow opacity-20"
          style={{
            background: "radial-gradient(circle, #803791 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-[140px] animate-pulse-slower opacity-15"
          style={{
            background: "radial-gradient(circle, #b87bd1 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] animate-float opacity-10"
          style={{
            background: "radial-gradient(circle, #f0c2ee 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md mx-4">
        <div
          className="relative overflow-hidden rounded-[32px] p-8 shadow-2xl backdrop-blur-xl border"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
            borderColor: "rgba(255,255,255,0.12)",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-[#803791]/10 via-transparent to-[#b87bd1]/10 animate-gradient-shift" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-3xl blur-xl opacity-50" />
                <div
                  className="relative w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg,#803791 0%,#b87bd1 100%)",
                  }}
                >
                  <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-4xl font-black text-white mb-2">
                Admin Login
              </h1>
              <p className="text-white/60 font-medium">
                Access the CRM Dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500/50 rounded-2xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" strokeWidth={2.5} />
                <p className="text-red-200 font-semibold text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-3">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-[20px] opacity-0 group-focus-within:opacity-25 blur-lg transition-opacity duration-500" />
                  <div className="relative">
                    <Mail
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-[#b87bd1] transition-all duration-500"
                      strokeWidth={2.5}
                    />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-14 pr-5 py-5 bg-white/5 text-white placeholder-white/40 rounded-[20px] border-2 border-white/10 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-3">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-[20px] opacity-0 group-focus-within:opacity-25 blur-lg transition-opacity duration-500" />
                  <div className="relative">
                    <Lock
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-[#b87bd1] transition-all duration-500"
                      strokeWidth={2.5}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-14 pr-14 py-5 bg-white/5 text-white placeholder-white/40 rounded-[20px] border-2 border-white/10 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" strokeWidth={2.5} />
                      ) : (
                        <Eye className="w-5 h-5" strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group relative px-8 py-5 rounded-[20px] font-black text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_-10px_rgba(184,123,209,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] transition-transform group-hover:scale-110 duration-500" />
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" strokeWidth={2.5} />
                      Sign In as Admin
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white/40 text-sm font-medium">
                Protected Admin Area
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.08);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(40px, -40px) rotate(8deg);
          }
          66% {
            transform: translate(-30px, 30px) rotate(-8deg);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(100px) translateY(50px);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
