"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function StudentHeader({ onMenuClick }) {
  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/6 px-6 shadow-sm"
      style={{
        background:
          "linear-gradient(90deg, rgba(128,55,145,0.06), rgba(184,123,209,0.04))",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-slate-100/80 transition-all hover:scale-105"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </Button>

        <div className="relative hidden md:block flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
          <input
            type="search"
            placeholder="Search courses, jobs, resources..."
            className="w-full rounded-xl border border-white/10 bg-white/6 py-2.5 pl-10 pr-4 text-sm text-white/90 placeholder:text-white/60 shadow-sm backdrop-blur-sm transition-all focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 focus:shadow-md hover:border-white/20 hover:shadow-md"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-white/6 transition-all hover:scale-105 hover:shadow-md bg-white/6 rounded-xl"
        >
          <Bell className="h-10 w-10 text-white" />
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-md animate-pulse ring-2 ring-white/20" />
        </Button>

        <Avatar className="h-9 w-9 ring-2 ring-white/8 ring-offset-2 transition-all hover:ring-[#b87bd1] hover:scale-105 cursor-pointer">
          <AvatarFallback className="bg-gradient-to-br from-[#803791] to-[#b87bd1] text-xs font-semibold text-white shadow-md">
            AS
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
