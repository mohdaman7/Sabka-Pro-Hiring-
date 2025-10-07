"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building2,
} from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "candidate";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setServerError("");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would make actual API call to your backend
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password,
      //     role: type
      //   }),
      // })

      // For demo purposes, we'll simulate successful login
      console.log("Login attempt:", { ...formData, role: type });

      // Redirect to dashboard or home page
      // window.location.href = type === "candidate" ? "/dashboard" : "/employer/dashboard"
    } catch (err) {
      setServerError(
        err?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-[95%] mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full overflow-hidden shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105 bg-white ring-2 ring-primary/20">
                <img
                  src="/sabka-logo.png"
                  alt="Sabka Pro"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Sabka Pro HIRIN
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[90%] mx-auto px-4 lg:px-6 py-12 relative">
        <div className="max-w-md mx-auto">
          {/* Type Selector */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 mb-8 bg-card/50 backdrop-blur-sm rounded-2xl p-2 border border-border shadow-lg"
          >
            <Link
              href="/login?type=candidate"
              className={`flex-1 py-4 px-6 rounded-xl text-center font-semibold transition-all duration-200 ${
                type === "candidate"
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <span className="hidden sm:inline">Candidate </span>Login
            </Link>
            <Link
              href="/login?type=employer"
              className={`flex-1 py-4 px-6 rounded-xl text-center font-semibold transition-all duration-200 ${
                type === "employer"
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <span className="hidden sm:inline">Employer </span>Login
            </Link>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl border border-border shadow-2xl p-8 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

            <div className="relative mb-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                {type === "candidate" ? (
                  <User className="w-8 h-8 text-white" />
                ) : (
                  <Building2 className="w-8 h-8 text-white" />
                )}
              </motion.div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground">
                Sign in to your{" "}
                {type === "candidate" ? "candidate" : "employer"} account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
                    errors.email
                      ? "border-destructive"
                      : focusedField === "email"
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-border"
                  } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200`}
                  placeholder="your.email@example.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-sm text-destructive"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-primary" />
                  Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3.5 bg-background/50 backdrop-blur-sm border-2 ${
                      errors.password
                        ? "border-destructive"
                        : focusedField === "password"
                        ? "border-primary shadow-lg shadow-primary/20"
                        : "border-border"
                    } rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 pr-12`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-sm text-destructive"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-muted-foreground">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              {serverError && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive text-center bg-destructive/10 py-2 px-4 rounded-lg border border-destructive/20"
                >
                  {serverError}
                </motion.p>
              )}

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl transition-all duration-200 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative flex items-center justify-center my-6"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative bg-card px-4 text-sm text-muted-foreground">
                  New to Sabka Pro?
                </div>
              </motion.div>

              {/* Register Link */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-center"
              >
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href={`/register?type=${type}`}
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </motion.div>
            </form>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 space-y-3"
          >
            <p className="text-sm text-muted-foreground">
              Having trouble?{" "}
              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Contact support
              </Link>
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">
              Loading login page...
            </p>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
