"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Video,
  Calendar,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react"

export default function StudentSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/student" },
    { icon: User, label: "My Profile", href: "/student/profile" },
    { icon: Briefcase, label: "Job Listings", href: "/student/jobs" },
    { icon: GraduationCap, label: "Training Courses", href: "/student/courses" },
    { icon: Video, label: "Video Resume", href: "/student/video-resume" },
    { icon: Calendar, label: "Interviews", href: "/student/interviews" },
    { icon: Star, label: "Upgrade to Pro", href: "/student/upgrade" },
    { icon: Settings, label: "Settings", href: "/student/settings" },
  ]

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col shadow-xl`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        {!collapsed && <span className="text-lg font-bold text-white">Student Portal</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              title={collapsed ? item.label : ""}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
