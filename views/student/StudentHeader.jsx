"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function StudentHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/50 bg-gradient-to-r from-white via-slate-50/80 to-blue-50/30 px-6 shadow-sm backdrop-blur-sm">
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
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search courses, jobs, resources..."
            className="w-full rounded-xl border border-slate-200/80 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:shadow-md hover:border-slate-300 hover:shadow-md"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-blue-50/80 transition-all hover:scale-105 hover:shadow-md bg-slate-50/50 rounded-xl"
        >
          <Bell className="h-10 w-10 text-slate-700" />
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md shadow-blue-500/60 animate-pulse ring-2 ring-white" />
        </Button>

        <Avatar className="h-9 w-9 ring-2 ring-slate-200/50 ring-offset-2 transition-all hover:ring-blue-400/50 hover:scale-105 cursor-pointer">
          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-xs font-semibold text-white shadow-md">
            AS
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
