"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  ChevronDown,
  ChevronUp,
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
  ListChecks,
  Kanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/crm",
    icon: LayoutDashboard,
    badge: null,
    gradientClass: "from-blue-500/70 to-cyan-500/70",
    accent: ["#3b82f6", "#22d3ee"],
  },
  {
    id: "leads",
    name: "Leads",
    icon: TrendingUp,
    badge: "24",
    gradientClass: "from-purple-500/70 to-pink-500/70",
    accent: ["#a855f7", "#ec4899"],
    children: [
      {
        id: "leads-workspace",
        name: "Lead Workspace",
        href: "/crm/leads",
        icon: ListChecks,
        description: "Advanced table & filters",
      },
      {
        id: "leads-kanban",
        name: "Pipeline Kanban",
        href: "/crm/leads/kanban",
        icon: Kanban,
        description: "Visual stage tracking",
      },
      {
        id: "leads-insights",
        name: "Performance Insights",
        href: "/crm/leads/insights",
        icon: BarChart3,
        description: "Conversion analytics",
      },
    ],
  },
  {
    id: "candidates",
    name: "Candidates",
    href: "/crm/candidates",
    icon: Users,
    badge: "156",
    gradientClass: "from-emerald-500/70 to-teal-500/70",
    accent: ["#10b981", "#14b8a6"],
  },
  {
    id: "employers",
    name: "Employers",
    href: "/crm/employers",
    icon: Briefcase,
    badge: "45",
    gradientClass: "from-orange-500/70 to-amber-500/70",
    accent: ["#f97316", "#f59e0b"],
  },
  {
    id: "jobs",
    name: "Job Postings",
    href: "/crm/jobs",
    icon: UserCircle,
    badge: "12",
    gradientClass: "from-rose-500/70 to-pink-500/70",
    accent: ["#f43f5e", "#ec4899"],
  },
  {
    id: "ats",
    name: "ATS",
    href: "/crm/ats",
    icon: Target,
    badge: "8",
    gradientClass: "from-indigo-500/70 to-purple-500/70",
    accent: ["#6366f1", "#8b5cf6"],
  },
  {
    id: "courses",
    name: "Training Courses",
    href: "/crm/courses",
    icon: GraduationCap,
    badge: null,
    gradientClass: "from-cyan-500/70 to-blue-500/70",
    accent: ["#06b6d4", "#3b82f6"],
  },
  {
    id: "analytics",
    name: "Analytics",
    href: "/crm/analytics",
    icon: BarChart3,
    badge: null,
    gradientClass: "from-violet-500/70 to-purple-500/70",
    accent: ["#8b5cf6", "#a855f7"],
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
  const [expandedMenus, setExpandedMenus] = useState({
    leads: pathname.startsWith("/crm/leads"),
  });

  useEffect(() => {
    if (pathname.startsWith("/crm/leads")) {
      setExpandedMenus((prev) => ({ ...prev, leads: true }));
    }
  }, [pathname]);

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

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
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;
              const Icon = item.icon;
              const isChildActive = hasChildren
                ? item.children.some((child) => pathname.startsWith(child.href))
                : false;
              const isActive = hasChildren
                ? isChildActive
                : pathname === item.href;
              const isHovered = hoveredItem === item.id;

              const accentStart = item.accent?.[0] || "#803791";
              const accentEnd = item.accent?.[1] || "#b87bd1";

              const containerClasses = cn(
                "group relative flex rounded-xl transition-all duration-300 overflow-hidden border",
                isCollapsed ? "justify-center" : "items-center",
                isActive ? "shadow-md scale-[1.02] border-white/15" : "hover:scale-[1.02] hover:shadow-md border-white/5"
              );

              const baseContentClasses = cn(
                "relative w-full flex items-center transition-all duration-300",
                isCollapsed ? "justify-center px-4 py-5" : "gap-4 px-5 py-5"
              );

              if (!hasChildren) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={containerClasses}
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))"
                        : "rgba(255,255,255,0.04)",
                    }}
                    title={isCollapsed ? item.name : ""}
                  >
                    <div className={`absolute inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${item.gradientClass}`}></div>

                    <div className={baseContentClasses}>
                      <div
                        className={cn(
                          "relative flex items-center justify-center transition-all duration-300",
                          isActive ? "scale-110" : "group-hover:scale-105"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 blur-lg opacity-0 transition-opacity duration-300",
                            isActive || isHovered ? "opacity-60" : ""
                          )}
                          style={{
                            background: `linear-gradient(135deg, ${accentStart}, ${accentEnd})`,
                          }}
                        ></div>
                        <Icon
                          className={cn(
                            "relative z-10 h-5 w-5 transition-colors duration-300",
                            isActive ? "text-white" : "text-white/70 group-hover:text-white"
                          )}
                        />
                      </div>

                      {!isCollapsed && (
                        <>
                          <div className="flex flex-col">
                            <span
                              className={cn(
                                "text-sm font-semibold tracking-wide",
                                isActive ? "text-white" : "text-white/75"
                              )}
                            >
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="text-xs font-medium text-white/60">
                                {item.badge} active
                              </span>
                            )}
                          </div>

                          {item.badge && (
                            <div className="ml-auto relative">
                              <div
                                className={`absolute inset-0 blur-md rounded-full opacity-60 bg-gradient-to-r ${item.gradientClass}`}
                              ></div>
                              <span className="relative z-10 rounded-full bg-white/10 px-2 py-1 text-xs font-semibold text-white">
                                {item.badge}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                );
              }

              const menuExpanded = expandedMenus[item.id];

              return (
                <div key={item.id} className="relative">
                  <div
                    className={containerClasses}
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))"
                        : "rgba(255,255,255,0.04)",
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      type="button"
                      className={baseContentClasses}
                      onClick={() => (isCollapsed ? null : toggleMenu(item.id))}
                    >
                      <div
                        className={cn(
                          "relative flex items-center justify-center transition-all duration-300",
                          isActive ? "scale-110" : "group-hover:scale-105"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 blur-lg opacity-0 transition-opacity duration-300",
                            isActive || isHovered ? "opacity-60" : ""
                          )}
                          style={{
                            background: `linear-gradient(135deg, ${accentStart}, ${accentEnd})`,
                          }}
                        ></div>
                        <Icon
                          className={cn(
                            "relative z-10 h-5 w-5 transition-colors duration-300",
                            isActive ? "text-white" : "text-white/70 group-hover:text-white"
                          )}
                        />
                      </div>

                      {!isCollapsed && (
                        <>
                          <div className="flex flex-col">
                            <span
                              className={cn(
                                "text-sm font-semibold tracking-wide",
                                isActive ? "text-white" : "text-white/75"
                              )}
                            >
                              {item.name}
                            </span>
                            <span className="text-xs text-white/60">
                              {menuExpanded ? "Collapse" : "Expand"} menu
                            </span>
                          </div>

                          <div className="ml-auto flex items-center gap-2">
                            {item.badge && (
                              <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold text-white/80">
                                {item.badge}
                              </span>
                            )}
                            {menuExpanded ? (
                              <ChevronUp className="h-4 w-4 text-white/60" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-white/60" />
                            )}
                          </div>
                        </>
                      )}
                    </button>
                  </div>

                  {hasChildren && menuExpanded && !isCollapsed && (
                    <div className="mt-2 space-y-2 pl-14">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const childActive = pathname.startsWith(child.href);

                        return (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={cn(
                              "group relative flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-4 transition-all duration-300",
                              childActive
                                ? "border-white/20 bg-gradient-to-r from-white/10 to-transparent"
                                : "hover:border-white/15 hover:bg-white/10"
                            )}
                          >
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                              <div
                                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                                style={{
                                  background: `linear-gradient(135deg, ${accentStart}, ${accentEnd})`,
                                }}
                              ></div>
                              <ChildIcon className="relative z-10 h-4 w-4 text-white/80" />
                            </div>

                            <div className="flex-1">
                              <p className={cn(
                                "text-sm font-semibold",
                                childActive ? "text-white" : "text-white/80"
                              )}>
                                {child.name}
                              </p>
                              {child.description && (
                                <p className="text-xs text-white/60">
                                  {child.description}
                                </p>
                              )}
                            </div>

                            <span className="text-xs uppercase tracking-wide text-white/40">
                              Explore
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
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
