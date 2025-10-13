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
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
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
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2 disabled:opacity-50"
              disabled={loading}
            />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors disabled:opacity-50"
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
              className="text-sm text-destructive text-center bg-destructive/10 py-3 px-4 rounded-lg border border-destructive/20 flex items-center justify-center gap-2"
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
  );
}
