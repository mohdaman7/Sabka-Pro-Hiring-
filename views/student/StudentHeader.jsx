"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfilePopup from "@/components/ui/ProfilePopup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function StudentHeader({ onMenuClick }) {
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
      className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-white/6 px-3 sm:px-4 md:px-6 shadow-sm"
      style={{
        background:
          "linear-gradient(90deg, rgba(128,55,145,0.06), rgba(184,123,209,0.04))",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-slate-100/80 transition-all hover:scale-105 h-9 w-9 sm:h-10 sm:w-10"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </Button>

        {/* Desktop Search */}
        <div className="relative hidden md:block flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
          <input
            type="search"
            placeholder="Search courses, jobs, resources..."
            className="w-full rounded-xl border border-white/10 bg-white/6 py-2.5 pl-10 pr-4 text-sm text-white/90 placeholder:text-white/60 shadow-sm backdrop-blur-sm transition-all focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 focus:shadow-md hover:border-white/20 hover:shadow-md"
          />
        </div>

        {/* Mobile Search Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-white/6 transition-all hover:scale-105 h-9 w-9 rounded-xl"
        >
          <Search className="h-4 w-4 text-white/70" />
        </Button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-white/6 transition-all hover:scale-105 hover:shadow-md bg-white/6 rounded-xl h-9 w-9 sm:h-10 sm:w-10"
        >
          <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          <span className="absolute right-0.5 top-0.5 sm:right-1 sm:top-1 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-md animate-pulse ring-2 ring-white/20" />
        </Button>

        <ProfilePopup user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
}
