"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  Video,
  Calendar,
  Settings,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Headphones,    
  History,       
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "My Profile", href: "/student/profile", icon: User },
  { name: "Job Listings", href: "/student/jobs", icon: Briefcase },
  { name: "Training Courses", href: "/student/courses", icon: GraduationCap },
  { name: "Video Resume", href: "/student/video-resume", icon: Video },
  { name: "Interviews", href: "/student/interviews", icon: Calendar },
  { name: "Upgrade to Pro", href: "/student/upgrade", icon: Sparkles, highlight: true },
  { name: "Support", href: "/student/support", icon: Headphones },
  { name: "History", href: "/student/history", icon: History },
  { name: "Settings", href: "/student/settings", icon: Settings },
]

export default function StudentSidebar({ isOpen, onClose }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-slate-900/50 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-slate-900 transition-all duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
          {!isCollapsed && <h1 className="text-2xl font-bold text-white">Student Portal</h1>}

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-white hover:bg-slate-800"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-slate-800" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <nav className="flex flex-col gap-3 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  isCollapsed ? "justify-center" : "gap-3",
                  isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  item.highlight && "bg-blue-600 text-white hover:bg-blue-700",
                )}
                title={isCollapsed ? item.name : ""}
              >
                <Icon className="h-6 w-6 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
