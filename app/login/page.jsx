"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import Header from "@/views/login/Header";
import TypeSelector from "@/views/login/TypeSelector";
import LoginForm from "@/views/login/LoginForm";
import FooterLinks from "@/views/login/FooterLinks";
import { authService } from "@/services/authService";
import { useApi } from "@/hooks/useApi";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "candidate";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header />

      {/* Main Content */}
      <div className="max-w-[90%] mx-auto px-4 lg:px-6 py-12 relative">
        <div className="max-w-md mx-auto">
          <TypeSelector currentType={type} />

          <LoginForm
            type={type}
            onSubmit={handleLogin}
            loading={loading}
            serverError={error || serverError}
          />

          <FooterLinks />
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
