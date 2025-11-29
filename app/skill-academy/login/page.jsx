"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SkillAcademyLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      // Call backend API for skill-academy login
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
        }/api/auth/skill-academy/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
        setIsLoading(false);
        return;
      }

      // Store user data in localStorage with complete information
      const userData = {
        id: data.data.user.id,
        email: data.data.user.email,
        name: data.data.user.name,
        phone: data.data.user.phone,
        token: data.data.token,
      };

      localStorage.setItem("skillAcademyUser", JSON.stringify(userData));
      localStorage.setItem("skillAcademyToken", data.data.token);

      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push("/skill-academy");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-[#0f0820] to-[#1a0f2e] text-white flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden relative">
      {/* Ultra Premium Background - Multiple Layers */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Layer 1: Base Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/50 via-pink-500/30 to-transparent rounded-full blur-3xl animate-float opacity-80" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-purple-500/40 via-indigo-500/20 to-transparent rounded-full blur-3xl animate-float-delayed opacity-70" />

        {/* Layer 2: Additional Accent Orbs */}
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-gradient-to-bl from-purple-700/30 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] bg-gradient-to-tr from-pink-700/25 to-transparent rounded-full blur-3xl" />

        {/* Layer 3: Mesh/Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.3) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Layer 4: Fine Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0820]/40 opacity-60" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-md">
        {/* Go Back Button */}
        <div className="mb-8">
          <Link href="/skill-academy">
            <motion.button
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span className="text-sm font-medium">Back to Home</span>
            </motion.button>
          </Link>
        </div>

        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/50 relative"
          >
            <Lock className="w-8 h-8 text-white" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Sign in to continue your learning journey
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative group"
        >
          {/* Card Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/60 via-pink-500/40 to-purple-600/60 rounded-3xl opacity-75 blur-2xl group-hover:opacity-100 transition-all duration-500 -z-10" />

          {/* Card Content */}
          <div className="relative bg-gradient-to-br from-[#2a1a40]/95 via-[#3d2557]/80 to-[#4a2d5f]/70 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3"
              >
                <label className="text-xs sm:text-sm font-bold text-gray-200 flex items-center gap-2 uppercase tracking-widest">
                  <Mail className="w-4 h-4 text-purple-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-6 py-4 bg-white/8 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white placeholder-gray-500/60 focus:outline-none focus:border-purple-400/80 focus:bg-white/12 hover:bg-white/10 transition-all duration-300 text-sm sm:text-base font-medium"
                />
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-3"
              >
                <label className="text-xs sm:text-sm font-bold text-gray-200 flex items-center gap-2 uppercase tracking-widest">
                  <Lock className="w-4 h-4 text-purple-400" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-6 py-4 bg-white/8 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white placeholder-gray-500/60 focus:outline-none focus:border-purple-400/80 focus:bg-white/12 hover:bg-white/10 transition-all duration-300 text-sm sm:text-base font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl"
                >
                  <p className="text-sm text-green-300 font-medium">
                    Login successful! Redirecting...
                  </p>
                </motion.div>
              )}

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || success}
                type="submit"
                className="w-full py-4 sm:py-4.5 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-2xl text-white font-black text-base sm:text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed border border-purple-400/40 hover:border-pink-300/60 relative overflow-hidden group/btn mt-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                    <span className="relative z-10">Logging in...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Sign In</span>
                    <ArrowRight className="w-5 h-5 relative z-10" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Sign Up Link with Better UI */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/skill-academy/register">
                  <span className="text-purple-400 hover:text-pink-300 font-bold transition-colors cursor-pointer">
                    Sign up here
                  </span>
                </Link>
              </p>

              {/* Register Button Alternative */}
              <Link href="/skill-academy/register">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-white/10 via-white/5 to-white/10 border-2 border-white/20 hover:border-purple-400/60 rounded-2xl text-white font-bold text-base sm:text-base transition-all flex items-center justify-center gap-2 group/signup"
                >
                  <span className="relative z-10">Create New Account</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover/signup:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center text-gray-500 text-xs sm:text-sm mt-8 px-4 leading-relaxed"
        >
          By signing in, you agree to our{" "}
          <button className="text-purple-400 hover:text-purple-300 font-semibold">
            Terms of Service
          </button>
        </motion.p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(30px, 45px) rotate(8deg);
          }
        }
        @keyframes floatDelayed {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-30px, -45px) rotate(-8deg);
          }
        }
        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatDelayed 14s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: floatSlow 16s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
