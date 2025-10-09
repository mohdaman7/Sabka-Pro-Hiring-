"use client";

import { Bell, Search, Menu } from "lucide-react";

export default function EmployerHeader({ onMenuClick }) {
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

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-2 transition-all hover:shadow-xl hover:scale-105 cursor-pointer"
            style={{
              background: "linear-gradient(135deg,#803791,#b87bd1)",
              ringColor: "rgba(255,255,255,0.2)",
            }}
          >
            <span className="text-white font-semibold text-sm">TS</span>
          </div>
        </div>
      </div>
    </header>
  );
}
