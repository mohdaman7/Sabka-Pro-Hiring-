"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building2,
  AlertCircle,
} from "lucide-react";

export default function LoginForm({ type, onSubmit, loading, serverError }) {
  const [showPassword, setShowPassword] = useState(false);
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 relative overflow-hidden max-w-md mx-auto"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-50" />

      <div className="relative mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          className={`w-20 h-20 bg-gradient-to-br ${
            type === "candidate"
              ? "from-purple-500 to-pink-500"
              : "from-blue-500 to-cyan-500"
          } rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/40 ring-4 ring-white/10`}
        >
          {type === "candidate" ? (
            <User className="w-10 h-10 text-white" />
          ) : (
            <Building2 className="w-10 h-10 text-white" />
          )}
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-3">
          Welcome Back! ✨
        </h1>
        <p className="text-white/60 text-base">
          Sign in to your {type === "candidate" ? "candidate" : "employer"}{" "}
          account
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
            className="text-sm font-semibold text-white mb-2.5 flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-primary" />
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-5 py-3.5 bg-white/5 backdrop-blur-sm border-2 ${
              errors.email
                ? "border-red-500/70 bg-red-500/5"
                : focusedField === "email"
                ? "border-primary shadow-lg shadow-primary/30 bg-white/10"
                : "border-white/20"
            } rounded-xl text-white placeholder:text-white/40 focus:outline-none transition-all duration-300`}
            placeholder="your.email@example.com"
            disabled={loading}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
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
            className="text-sm font-semibold text-white mb-2.5 flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-primary" />
            Password <span className="text-red-400">*</span>
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
              className={`w-full px-5 py-3.5 bg-white/5 backdrop-blur-sm border-2 ${
                errors.password
                  ? "border-red-500/70 bg-red-500/5"
                  : focusedField === "password"
                  ? "border-primary shadow-lg shadow-primary/30 bg-white/10"
                  : "border-white/20"
              } rounded-xl text-white placeholder:text-white/40 focus:outline-none transition-all duration-300 pr-12`}
              placeholder="Enter your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors disabled:opacity-50"
              disabled={loading}
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
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
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
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-primary bg-white/5 border-white/20 rounded focus:ring-primary focus:ring-2 disabled:opacity-50 transition-all"
              disabled={loading}
            />
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors disabled:opacity-50 hover:underline"
          >
            Forgot password?
          </Link>
        </motion.div>

        {/* Server Error */}
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-400 text-center bg-red-500/10 py-3 px-4 rounded-xl border border-red-500/30 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/95 hover:via-primary/90 hover:to-primary/80 text-white rounded-xl transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-2xl shadow-primary/40 ring-2 ring-primary/20 hover:ring-primary/40 hover:shadow-primary/50"
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
          <div className="relative bg-transparent px-4 text-sm text-white/50">
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
          <p className="text-white/60">
            Don't have an account?{" "}
            <Link
              href={`/register?type=${type}`}
              className="text-primary hover:text-primary/80 font-bold transition-colors hover:underline"
            >
              Create account
            </Link>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}
