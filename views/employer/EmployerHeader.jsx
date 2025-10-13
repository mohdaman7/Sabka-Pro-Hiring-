"use client";

import { Bell, Search, Menu } from "lucide-react";
import ProfilePopup from "@/components/ui/ProfilePopup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function EmployerHeader({ onMenuClick }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Use Axios through authService
      await authService.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Always clear local storage and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
      router.push("/login");
    }
  };

  return (
    <header
      className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 shadow-lg backdrop-blur-md border-b border-white/6"
      style={{
        background:
          "linear-gradient(90deg, rgba(128,55,145,0.12), rgba(184,123,209,0.06))",
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/6 rounded-lg transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1 max-w-xl md:ml-0 ml-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            placeholder="Search candidates, applications, jobs..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white placeholder:text-white/60 shadow-lg transition-all focus:outline-none focus:ring-2 focus:shadow-xl backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative p-2.5 rounded-xl transition-all hover:scale-105 hover:shadow-lg group"
          style={{
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <Bell className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
          <span
            className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full shadow-md animate-pulse ring-2"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
              ringColor: "rgba(128,55,145,0.3)",
            }}
          ></span>
        </button>

        <ProfilePopup user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
}
