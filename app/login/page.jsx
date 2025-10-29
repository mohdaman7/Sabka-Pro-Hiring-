"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import Header from "@/views/login/Header";
import RoleSelectionCards from "@/views/login/RoleSelectionCards";
import LoginForm from "@/views/login/LoginForm";
import FooterLinks from "@/views/login/FooterLinks";
import { authService } from "@/services/authService";
import { useApi } from "@/hooks/useApi";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");

  const { loading, error, callApi } = useApi();
  const [serverError, setServerError] = useState("");

  const handleLogin = async (formData) => {
    try {
      const result = await callApi(
        () => authService.login(formData.email, formData.password, type),
        {
          onSuccess: (data) => {
            // Store token and user data
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));

            if (formData.rememberMe) {
              localStorage.setItem("rememberMe", "true");
            }

            const redirectPath =
              type === "candidate" ? "/student" : "/employer";
            router.push(redirectPath);
          },
          onError: (error) => {
            // Additional error handling if needed
            console.error("Login error:", error);
          },
        }
      );
    } catch (err) {
      // Error is already handled by useApi hook
      // You can add additional error handling here if needed
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

      <Header />

      {/* Main Content */}
      <div className="max-w-[95%] mx-auto px-4 lg:px-6 py-8 relative">
        <div className="max-w-6xl mx-auto">
          {!type ? (
            // Show only role selection cards when no type is selected
            <>
              <RoleSelectionCards currentType={type} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8"
              >
                <p className="text-white/40">
                  Already have an account?{" "}
                  <span className="text-white/60">Select your role above to login</span>
                </p>
              </motion.div>
            </>
          ) : (
            // Show login form when type is selected
            <>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to role selection
                </Link>
              </motion.div>
              
              <LoginForm
                type={type}
                onSubmit={handleLogin}
                loading={loading}
                serverError={error || serverError}
              />

              <FooterLinks />
            </>
          )}
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
