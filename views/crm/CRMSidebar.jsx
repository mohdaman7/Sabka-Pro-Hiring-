"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

export default function CRMSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

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
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-[#803791]/6 via-[#b87bd1]/4 to-transparent border-r border-[#803791]/10 transition-all duration-300 flex flex-col backdrop-blur-sm`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#803791]/10">
        {!collapsed && (
          <span className="text-lg font-bold text-white">Sabka Pro CRM</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-white/6 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-white/70" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-white/70" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-4 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg shadow-[#803791]/30"
                  : "text-white/70 hover:text-white hover:bg-white/4"
              }`}
              title={collapsed ? item.label : ""}
            >
              <Icon className="w-6 h-6 flex-shrink-0 text-white/90" />
              {!collapsed && (
                <span className="text-base font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[#803791]/10">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#803791] to-[#b87bd1] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold">AD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                Admin User
              </div>
              <div className="text-xs text-white/75 truncate">
                admin@sabkapro.com
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
