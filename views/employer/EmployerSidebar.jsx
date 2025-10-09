"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  BarChart3,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/employer", icon: LayoutDashboard },
  { name: "Company Profile", href: "/employer/profile", icon: Building },
  { name: "Job Postings", href: "/employer/jobs", icon: Briefcase },
  { name: "Candidates", href: "/employer/candidates", icon: Users },
  { name: "Applications", href: "/employer/applications", icon: FileText },
  { name: "Analytics", href: "/employer/analytics", icon: BarChart3 },
  {
    name: "Upgrade to Pro",
    href: "/employer/upgrade",
    icon: Sparkles,
    highlight: true,
  },
  { name: "Settings", href: "/employer/settings", icon: Settings },
];

export default function EmployerSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen transition-all duration-300 md:relative md:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-64"
        )}
        style={{
          background:
            "linear-gradient(180deg, rgba(128,55,145,0.12), rgba(184,123,209,0.06))",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex h-16 items-center justify-between border-b border-white/10 px-4">
          {!isCollapsed && (
            <h1 className="text-lg font-bold text-white">Employer Portal</h1>
          )}

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-white hover:bg-white/6 h-8 w-8"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/6 h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Post New Job Button */}
        {!isCollapsed && (
          <div className="p-4 border-b border-white/10">
            <Link
              href="/employer/jobs/new"
              className="w-full px-4 py-2.5 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 text-sm"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1)",
              }}
            >
              <Plus className="h-5 w-5" />
              Post New Job
            </Link>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 flex flex-col p-3 overflow-hidden">
          <div className="space-y-1 h-full overflow-hidden hover:overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-4 transition-all duration-200",
                    isCollapsed ? "justify-center" : "gap-3",
                    isActive
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/80 hover:bg-white/6 hover:text-white",
                    item.highlight &&
                      "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-md"
                  )}
                  title={isCollapsed ? item.name : ""}
                >
                  <Icon className="h-6 w-6 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-base font-medium truncate">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
