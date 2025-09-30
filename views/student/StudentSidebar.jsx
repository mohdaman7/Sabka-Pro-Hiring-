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
      } bg-surface border-r border-border transition-all duration-300 flex flex-col`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && <span className="text-lg font-bold text-foreground">Student Portal</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
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
