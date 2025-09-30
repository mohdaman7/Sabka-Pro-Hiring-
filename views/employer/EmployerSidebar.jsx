"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"

export default function EmployerSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/employer" },
    { icon: Briefcase, label: "Job Postings", href: "/employer/jobs" },
    { icon: Users, label: "Candidates", href: "/employer/candidates" },
    { icon: FileText, label: "Applications", href: "/employer/applications" },
    { icon: BarChart3, label: "Analytics", href: "/employer/analytics" },
    { icon: Settings, label: "Settings", href: "/employer/settings" },
  ]

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-surface border-r border-border transition-all duration-300 flex flex-col`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && <span className="text-lg font-bold text-foreground">Employer Portal</span>}
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

      {!collapsed && (
        <div className="p-4">
          <Link
            href="/employer/jobs/new"
            className="w-full px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Post New Job
          </Link>
        </div>
      )}

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
