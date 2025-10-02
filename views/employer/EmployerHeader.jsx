"use client"

import { Bell, Search } from "lucide-react"

export default function EmployerHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-gradient-to-r from-white via-slate-50/80 to-blue-50/30 border-b border-slate-200/50 flex items-center justify-between px-6 shadow-sm backdrop-blur-sm">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates, applications, jobs..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-slate-200/80 rounded-xl text-slate-700 placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 focus:shadow-md hover:border-slate-300 hover:shadow-md"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2.5 bg-slate-50/50 hover:bg-blue-50/80 rounded-xl transition-all hover:scale-105 hover:shadow-md group">
          <Bell className="w-5 h-5 text-slate-700 group-hover:text-slate-800 transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full shadow-md shadow-cyan-500/60 animate-pulse ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-slate-200/50 ring-offset-2 transition-all hover:shadow-lg hover:scale-105 hover:ring-blue-400/50 cursor-pointer">
            <span className="text-white font-semibold text-sm">TS</span>
          </div>
        </div>
      </div>
    </header>
  )
}
