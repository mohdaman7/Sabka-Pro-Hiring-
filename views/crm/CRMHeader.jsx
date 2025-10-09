"use client";

import { Bell, Search } from "lucide-react";

export default function CRMHeader() {
  return (
    <header className="h-16 bg-white/5 backdrop-blur-sm border-b border-[#803791]/10 flex items-center justify-between px-6 shadow-sm">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
          <input
            type="text"
            placeholder="Search candidates, employers, jobs..."
            className="w-full pl-10 pr-4 py-2 bg-transparent border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/30 transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-white/6 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-white/90" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
