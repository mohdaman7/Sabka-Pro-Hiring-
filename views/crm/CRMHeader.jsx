"use client";

import { Bell, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function CRMHeader({ onMenuClick }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="h-16 bg-white/5 backdrop-blur-sm border-b border-[#803791]/10 flex items-center justify-between px-4 md:px-6 shadow-sm shrink-0">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6 text-white/90" />
      </button>

      {/* Search - Desktop */}
      <div className="hidden md:flex flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
          <input
            type="text"
            placeholder="Search candidates, employers, jobs..."
            className="w-full pl-10 pr-4 py-2 bg-transparent border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/30 transition-all"
          />
        </div>
      </div>

      {/* Mobile Search Toggle */}
      <div className="flex-1 md:hidden flex justify-center">
        {!showSearch ? (
          <h1 className="text-lg font-bold text-white">Sabka Pro CRM</h1>
        ) : (
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-9 py-2 bg-white/10 border border-white/10 rounded-lg text-white text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#803791]/30 focus:border-[#803791]/30 transition-all"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle search"
        >
          <Search className="w-5 h-5 text-white/90" />
        </button>
        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-white/90" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
