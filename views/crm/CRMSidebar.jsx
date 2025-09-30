"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  GraduationCap,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  TrendingUp,
} from "lucide-react"

export default function CRMSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/crm" },
    { icon: TrendingUp, label: "Leads", href: "/crm/leads" },
    { icon: FileText, label: "Deals & Proposals", href: "/crm/deals" },
    { icon: Users, label: "Candidates", href: "/crm/candidates" },
    { icon: Briefcase, label: "Employers", href: "/crm/employers" },
    { icon: UserCircle, label: "Job Postings", href: "/crm/jobs" },
    { icon: GraduationCap, label: "Training Courses", href: "/crm/courses" },
    { icon: DollarSign, label: "Payments", href: "/crm/payments" },
    { icon: Settings, label: "Settings", href: "/crm/settings" },
  ]

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-surface border-r border-border transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && <span className="text-lg font-bold text-foreground">Sabka Pro CRM</span>}
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

      {/* Navigation */}
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

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">AD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">Admin User</div>
              <div className="text-xs text-muted-foreground truncate">admin@sabkapro.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
