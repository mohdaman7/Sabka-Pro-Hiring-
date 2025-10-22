"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  X,
  Sparkles,
  Crown,
  Star,
  LogOut,
  Headphones,
  BarChart3,
  Calendar,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/crm",
    icon: LayoutDashboard,
    badge: null,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Leads",
    href: "/crm/leads",
    icon: TrendingUp,
    badge: "24",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Candidates",
    href: "/crm/candidates",
    icon: Users,
    badge: "156",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Employers",
    href: "/crm/employers",
    icon: Briefcase,
    badge: "45",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "Job Postings",
    href: "/crm/jobs",
    icon: UserCircle,
    badge: "12",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    name: "ATS",
    href: "/crm/ats",
    icon: Target,
    badge: "8",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Training Courses",
    href: "/crm/courses",
    icon: GraduationCap,
    badge: null,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Analytics",
    href: "/crm/analytics",
    icon: BarChart3,
    badge: null,
    gradient: "from-violet-500 to-purple-500",
  },
];

const bottomNavigation = [
  {
    name: "Support",
    href: "/crm/support",
    icon: Headphones,
    highlight: false,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Premium Plan",
    href: "/crm/upgrade",
    icon: Crown,
    highlight: true,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    name: "Settings",
    href: "/crm/settings",
    icon: Settings,
    highlight: false,
    gradient: "from-slate-500 to-gray-500",
  },
];

export default function CRMSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen transition-all duration-500 md:relative md:translate-x-0 flex flex-col shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-72"
        )}
        style={{
          background:
            "linear-gradient(180deg, rgba(128,55,145,0.16), rgba(184,123,209,0.10))",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#803791]/5 via-transparent to-[#b87bd1]/5 pointer-events-none"></div>

        {/* Header */}
        <div className="relative shrink-0 flex h-20 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            {!isCollapsed && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-xl blur-lg opacity-50 animate-pulse"></div>
                  <div
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(135deg,#803791,#b87bd1)",
                    }}
                  >
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-extrabold text-white leading-tight">
                    Sabka Pro CRM
                  </h1>
                  <p className="text-xs text-white/60 font-medium">
                    Management Hub
                  </p>
                </div>
              </>
            )}
            {isCollapsed && (
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-xl blur-lg opacity-50 animate-pulse"></div>
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-white hover:bg-white/10 h-9 w-9 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-180"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/10 h-9 w-9 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 flex flex-col p-3 overflow-hidden">
          <div className="space-y-2 h-full overflow-hidden hover:overflow-y-auto custom-scrollbar">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              const isHovered = hoveredItem === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "group relative flex items-center rounded-xl px-5 py-5 transition-all duration-300 overflow-hidden",
                    isCollapsed ? "justify-center" : "gap-3",
                    isActive
                      ? "shadow-md scale-[1.02]"
                      : "hover:scale-[1.02] hover:shadow-md"
                  )}
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))"
                      : "rgba(255,255,255,0.02)",
                    border: isActive
                      ? "1px solid rgba(255,255,255,0.12)"
                      : "1px solid rgba(255,255,255,0.04)",
                    animationDelay: `${index * 50}ms`,
                  }}
                  title={isCollapsed ? item.name : ""}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-1 bg-linear-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}
                  ></div>

                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-linear-to-b"
                      style={{
                        background: `linear-gradient(to bottom, ${
                          item.gradient.split(" ")[1]
                        }, ${item.gradient.split(" ")[3]})`,
                      }}
                    ></div>
                  )}

                  {/* Icon with animation */}
                  <div
                    className={cn(
                      "relative flex items-center justify-center transition-all duration-300",
                      isActive
                        ? "scale-105 rotate-3"
                        : "group-hover:scale-105 group-hover:rotate-3"
                    )}
                  >
                    <div
                      className={`absolute inset-0 blur-md opacity-0 transition-opacity duration-300 ${
                        isActive || isHovered ? "opacity-40" : ""
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${
                          item.gradient.split(" ")[1]
                        }, ${item.gradient.split(" ")[3]})`,
                      }}
                    ></div>
                    <Icon
                      className={cn(
                        "h-5 w-5 shrink-0 relative z-10 transition-colors duration-300",
                        isActive
                          ? "text-white"
                          : "text-white/70 group-hover:text-white"
                      )}
                    />
                  </div>

                  {!isCollapsed && (
                    <>
                      <span
                        className={cn(
                          "text-sm font-medium truncate transition-all duration-300 relative z-10",
                          isActive
                            ? "text-white"
                            : "text-white/70 group-hover:text-white"
                        )}
                      >
                        {item.name}
                      </span>

                      {/* Badge */}
                      {item.badge && (
                        <div className="ml-auto relative">
                          <div
                            className={`absolute inset-0 blur-sm opacity-40 rounded-full bg-linear-to-r ${item.gradient}`}
                          ></div>
                          <div
                            className={`relative px-2 py-1 rounded-full text-xs font-semibold text-white shadow-md bg-linear-to-r ${item.gradient}`}
                          >
                            {item.badge}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Indicator dot for collapsed state */}
                  {isCollapsed && item.badge && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-linear-to-r from-red-500 to-pink-500 border border-gray-900 animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="shrink-0 border-t border-white/10 p-3 space-y-2">
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const isHovered = hoveredItem === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  "group relative flex items-center rounded-xl px-3 py-3 transition-all duration-300 overflow-hidden",
                  isCollapsed ? "justify-center" : "gap-3",
                  item.highlight
                    ? "shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    : "hover:scale-[1.02] hover:shadow-md",
                  isActive && !item.highlight ? "scale-[1.02] shadow-md" : ""
                )}
                style={{
                  background: item.highlight
                    ? "linear-gradient(135deg, #f59e0b, #f97316)"
                    : isActive
                    ? "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))"
                    : "rgba(255,255,255,0.02)",
                  border: item.highlight
                    ? "1px solid rgba(251, 191, 36, 0.25)"
                    : isActive
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid rgba(255,255,255,0.04)",
                }}
                title={isCollapsed ? item.name : ""}
              >
                {!item.highlight && (
                  <div
                    className={`absolute inset-1 bg-linear-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}
                  ></div>
                )}

                {item.highlight && (
                  <>
                    <div className="absolute inset-1 bg-linear-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    <div className="absolute -top-1 -right-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 animate-pulse" />
                    </div>
                  </>
                )}

                <div
                  className={cn(
                    "relative flex items-center justify-center transition-all duration-300",
                    isActive || item.highlight
                      ? "scale-105 rotate-3"
                      : "group-hover:scale-105 group-hover:rotate-3"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0 relative z-10 transition-colors duration-300",
                      item.highlight || isActive
                        ? "text-white"
                        : "text-white/70 group-hover:text-white"
                    )}
                  />
                </div>

                {!isCollapsed && (
                  <span
                    className={cn(
                      "text-sm font-medium truncate transition-all duration-300 relative z-10",
                      item.highlight || isActive
                        ? "text-white"
                        : "text-white/70 group-hover:text-white"
                    )}
                  >
                    {item.name}
                  </span>
                )}

                {item.highlight && !isCollapsed && (
                  <div className="ml-auto relative z-10">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="shrink-0 border-t border-white/10 p-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                  }}
                >
                  <span className="text-white font-bold text-sm">AD</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-white/60 truncate">
                  admin@sabkapro.com
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="shrink-0 border-t border-white/10 p-3">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-r from-[#803791] to-[#b87bd1] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <span className="text-white font-bold">AD</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #803791, #b87bd1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #b87bd1, #803791);
        }
      `}</style>
    </>
  );
}
