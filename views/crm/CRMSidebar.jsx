"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  GraduationCap,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  X,
  Sparkles,
  Crown,
  LogOut,
  Headphones,
  BarChart3,
  Target,
  ListChecks,
  Kanban,
  Menu,
} from "lucide-react";

const navigation = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/crm",
    icon: LayoutDashboard,
    badge: null,
    color: "blue",
  },
  {
    id: "leads",
    name: "Leads",
    icon: TrendingUp,
    badge: "24",
    color: "purple",
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
    color: "emerald",
  },
  {
    id: "employers",
    name: "Employers",
    href: "/crm/employers",
    icon: Briefcase,
    badge: "45",
    color: "orange",
  },
  {
    id: "jobs",
    name: "Job Postings",
    href: "/crm/jobs",
    icon: FileText,
    badge: "12",
    color: "rose",
  },
  {
    id: "ats",
    name: "ATS",
    href: "/crm/ats",
    icon: Target,
    badge: "8",
    color: "indigo",
  },
  {
    id: "courses",
    name: "Training Courses",
    href: "/crm/courses",
    icon: GraduationCap,
    badge: null,
    color: "cyan",
  },
  {
    id: "analytics",
    name: "Analytics",
    href: "/crm/analytics",
    icon: BarChart3,
    badge: null,
    color: "violet",
  },
];

const bottomNavigation = [
  {
    name: "Support",
    href: "/crm/support",
    icon: Headphones,
  },
  {
    name: "Settings",
    href: "/crm/settings",
    icon: Settings,
  },
];

const colorSchemes = {
  blue: { from: "#3b82f6", to: "#06b6d4" },
  purple: { from: "#a855f7", to: "#ec4899" },
  emerald: { from: "#10b981", to: "#14b8a6" },
  orange: { from: "#f97316", to: "#f59e0b" },
  rose: { from: "#f43f5e", to: "#ec4899" },
  indigo: { from: "#6366f1", to: "#8b5cf6" },
  cyan: { from: "#06b6d4", to: "#3b82f6" },
  violet: { from: "#8b5cf6", to: "#a855f7" },
};

export default function CRMSidebar({ isOpen = true, onClose }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({ leads: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Auto-expand menu if child is active
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
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen flex flex-col transition-all duration-500 ease-in-out z-50 md:relative md:translate-x-0 ${
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""
        }`}
        style={{
          width: isCollapsed ? "90px" : "280px",
          background: "linear-gradient(135deg, rgba(128, 55, 145, 0.08), rgba(184, 123, 209, 0.05))",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(184, 123, 209, 0.15)",
          boxShadow: "0 8px 32px rgba(128, 55, 145, 0.1)",
        }}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#803791]/5 via-transparent to-[#b87bd1]/3 pointer-events-none" />

        {/* Header */}
        <div className="relative h-20 flex items-center justify-between px-5 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-3">
            {!isCollapsed ? (
              <>
                <div className="relative group">
                  <div
                    className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, #803791, #b87bd1)",
                    }}
                  />
                  <div
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #803791, #b87bd1)",
                    }}
                  >
                    <BarChart3
                      className="w-5 h-5 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-base font-bold text-white tracking-tight">
                    Sabka Pro CRM
                  </h1>
                  <p className="text-xs text-white/50 font-medium">
                    Management Hub
                  </p>
                </div>
              </>
            ) : (
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #803791, #b87bd1)",
                  }}
                />
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #803791, #b87bd1)",
                  }}
                >
                  <BarChart3 className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex relative group w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 items-center justify-center transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-white/70 relative z-10" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-white/70 relative z-10" />
              )}
            </button>
            {isMobile && (
              <button
                onClick={onClose}
                className="md:hidden w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Search */}
        {!isCollapsed && (
          <div className="relative px-4 py-3 border-b border-white/8 shrink-0">
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-purple-500/30 focus:bg-white/8 transition-all"
            />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-hidden hover:overflow-y-auto px-3 py-3 space-y-1 custom-scrollbar">
          {navigation.map((item) => {
            const hasChildren =
              Array.isArray(item.children) && item.children.length > 0;
            const Icon = item.icon;
            const isActive = hasChildren
              ? item.children.some((child) => pathname === child.href)
              : pathname === item.href;
            const isHovered = hoveredItem === item.id;
            const isExpanded = expandedMenus[item.id];
            const colors = colorSchemes[item.color] || colorSchemes.blue;

            if (!hasChildren) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    if (isMobile && onClose) {
                      onClose();
                    }
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative w-full group block"
                  title={isCollapsed ? item.name : ""}
                >
                  {(isActive || isHovered) && (
                    <div
                      className="absolute inset-0 rounded-xl blur-xl opacity-40 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                      }}
                    />
                  )}

                  <div
                    className={`relative flex items-center gap-3 px-3 rounded-xl transition-all duration-300 ${
                      isCollapsed ? "justify-center py-3" : "py-2.5"
                    } ${
                      isActive
                        ? "bg-white/10 shadow-lg"
                        : "bg-white/0 hover:bg-white/8"
                    }`}
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: isActive
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="relative flex items-center justify-center shrink-0">
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-lg blur-md opacity-60"
                          style={{
                            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                          }}
                        />
                      )}
                      <div
                        className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive ? "scale-105" : "group-hover:scale-105"
                        }`}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                            : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <Icon
                          className="w-4 h-4 text-white"
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </div>
                    </div>

                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left min-w-0">
                          <span
                            className={`text-sm font-semibold truncate block ${
                              isActive ? "text-white" : "text-white/80"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>

                        {item.badge && (
                          <div
                            className="px-2 py-0.5 rounded-md text-xs font-bold shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${colors.from}25, ${colors.to}25)`,
                              color: colors.from,
                              border: `1px solid ${colors.from}30`,
                            }}
                          >
                            {item.badge}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Link>
              );
            }

            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => !isCollapsed && toggleMenu(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative w-full group"
                  title={isCollapsed ? item.name : ""}
                >
                  {(isActive || isHovered) && (
                    <div
                      className="absolute inset-0 rounded-xl blur-xl opacity-40 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                      }}
                    />
                  )}

                  <div
                    className={`relative flex items-center gap-3 px-3 rounded-xl transition-all duration-300 ${
                      isCollapsed ? "justify-center py-3" : "py-2.5"
                    } ${
                      isActive
                        ? "bg-white/10 shadow-lg"
                        : "bg-white/0 hover:bg-white/8"
                    }`}
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: isActive
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="relative flex items-center justify-center shrink-0">
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-lg blur-md opacity-60"
                          style={{
                            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                          }}
                        />
                      )}
                      <div
                        className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive ? "scale-105" : "group-hover:scale-105"
                        }`}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                            : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <Icon
                          className="w-4 h-4 text-white"
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </div>
                    </div>

                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left min-w-0">
                          <span
                            className={`text-sm font-semibold truncate block ${
                              isActive ? "text-white" : "text-white/80"
                            }`}
                          >
                            {item.name}
                          </span>
                          <span className="text-xs text-white/40">
                            {item.children.length} modules
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {item.badge && (
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                              style={{
                                background: `${colors.from}30`,
                                color: colors.from,
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                          <div
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          >
                            <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </button>

                {hasChildren && isExpanded && !isCollapsed && (
                  <div className="ml-5 pl-3 border-l border-white/10 space-y-1 py-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = pathname === child.href;

                      return (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={() => {
                            if (isMobile && onClose) {
                              onClose();
                            }
                          }}
                          className={`relative w-full group flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                            childActive
                              ? "bg-white/8"
                              : "bg-white/0 hover:bg-white/5"
                          }`}
                        >
                          <div
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full transition-all duration-300 ${
                              childActive ? "h-6" : "h-0 group-hover:h-5"
                            }`}
                            style={{
                              background: `linear-gradient(to bottom, ${colors.from}, ${colors.to})`,
                            }}
                          />

                          <div
                            className={`relative w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                              childActive ? "scale-105" : ""
                            }`}
                            style={{
                              background: childActive
                                ? `linear-gradient(135deg, ${colors.from}30, ${colors.to}30)`
                                : "rgba(255,255,255,0.05)",
                            }}
                          >
                            <ChildIcon
                              className={`w-3.5 h-3.5 ${
                                childActive ? "text-white" : "text-white/60"
                              }`}
                            />
                          </div>

                          <div className="flex-1 text-left min-w-0">
                            <p
                              className={`text-xs font-medium truncate ${
                                childActive ? "text-white" : "text-white/70"
                              }`}
                            >
                              {child.name}
                            </p>
                            <p className="text-[10px] text-white/40 truncate">
                              {child.description}
                            </p>
                          </div>

                          {childActive && (
                            <div
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                                boxShadow: `0 0 8px ${colors.from}50`,
                              }}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        {!isCollapsed && (
          <div className="px-3 py-2 space-y-1 border-t border-white/8 shrink-0">
            {bottomNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (isMobile && onClose) {
                      onClose();
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group ${
                    isActive ? "bg-white/8" : "bg-white/0 hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-white/10"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? "text-white/80"
                          : "text-white/60 group-hover:text-white/80"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-white/90"
                        : "text-white/70 group-hover:text-white/90"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Premium Banner */}
        {!isCollapsed && (
          <div className="relative mx-3 mb-3 p-3 rounded-xl overflow-hidden group cursor-pointer border border-orange-500/20 shrink-0">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-2 right-2">
              <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <Crown className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">
                  Premium Plan
                </span>
              </div>
              <p className="text-[10px] text-white/90 leading-relaxed mb-2">
                Unlock advanced analytics
              </p>
              <button className="w-full py-1.5 px-3 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-[10px] font-semibold transition-all duration-300">
                Upgrade Now →
              </button>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="relative px-3 pb-3 border-t border-white/8 pt-3 shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/8 transition-all duration-300 cursor-pointer group border border-white/10">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #803791, #b87bd1)",
                  }}
                />
                <div
                  className="relative w-9 h-9 rounded-lg flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #803791, #b87bd1)",
                  }}
                >
                  <span className="text-white font-bold text-xs">AD</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  Admin User
                </p>
                <p className="text-[10px] text-white/50 truncate">
                  admin@sabkapro.com
                </p>
              </div>
              <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300">
                <LogOut className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>
          ) : (
            <div className="relative group cursor-pointer mx-auto w-fit">
              <div
                className="absolute inset-0 rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #803791, #b87bd1)",
                }}
              />
              <div
                className="relative w-10 h-10 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, #803791, #b87bd1)",
                }}
              >
                <span className="text-white font-bold text-xs">AD</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
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
