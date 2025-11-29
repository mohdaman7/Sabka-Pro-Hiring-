"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Star,
  Users,
  Phone,
  Menu,
  X,
  LogOut,
  Settings,
  User,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SkillAcademyFooter from "@/components/ui/SkillAcademyFooter";

/**
 * SkillAcademyLayout
 * - Conditionally renders the site-wide animated background only for non-course-detail pages.
 * - Keeps header, mobile bottom nav, footer.
 */

const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/skill-academy" },
    { icon: BookOpen, label: "Courses", href: "/skill-academy/courses" },
    { icon: Star, label: "Reviews", href: "/skill-academy/reviews" },
    { icon: Users, label: "About", href: "/skill-academy/about" },
    { icon: Phone, label: "Contact", href: "/skill-academy/contact" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={index} href={item.href}>
              <div
                className={`relative flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                  isActive
                    ? "text-[#d8b4f0] bg-[#692c7a]/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 w-1 h-1 bg-[#d8b4f0] rounded-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const DesktopHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Load user from localStorage and setup scroll listener
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("skillAcademyUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("skillAcademyUser");
    localStorage.removeItem("skillAcademyToken");
    setUser(null);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    router.push("/skill-academy/login");
  };

  // Generate avatar initials from user name
  const getInitials = () => {
    if (!user) return "";
    const name = user.name || user.email;
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { label: "Home", href: "/skill-academy" },
    { label: "Courses", href: "/skill-academy/courses" },
    { label: "Reviews", href: "/skill-academy/reviews" },
    { label: "About", href: "/skill-academy/about" },
    { label: "Contact", href: "/skill-academy/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-[#692c7a]/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[95%] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/skill-academy">
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg shadow-[#692c7a]/20">
                  <img
                    src="/sabka-logo2.png"
                    alt="Sabka Skill Academy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="block">
                <h1 className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                  Sabka Skill Academy
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-400 hidden xs:block">
                  Learn • Grow • Succeed
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link key={index} href={item.href}>
                  <div
                    className={`relative py-2 px-4 rounded-lg transition-all text-sm font-medium ${
                      isActive
                        ? "text-[#d8b4f0] bg-[#692c7a]/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeDesktopTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#692c7a] to-[#d8b4f0] rounded-full"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button / Profile Dropdown */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0 relative">
            {user ? (
              <div className="relative">
                {/* Profile Button */}
                <motion.button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group cursor-pointer"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#692c7a] to-[#9463a8] flex items-center justify-center text-white font-semibold text-xs shadow-lg shadow-[#692c7a]/30">
                    {getInitials()}
                  </div>

                  {/* Name Only - Professional */}
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white leading-none">
                      {user.name
                        ? user.name.split(" ")[0]
                        : user.email.split("@")[0]}
                    </p>
                  </div>

                  {/* Dropdown Indicator */}
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-3 w-72 bg-gradient-to-br from-[#2a1a40]/95 via-[#3d2557]/90 to-[#2a1a40]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-[#692c7a]/30 overflow-hidden z-50"
                    >
                      {/* Profile Header */}
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#692c7a] to-[#9463a8] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#692c7a]/30">
                            {getInitials()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {user.name || user.email}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {/* Profile Option */}
                        <motion.button
                          whileHover={{
                            backgroundColor: "rgba(105, 44, 122, 0.15)",
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white transition-colors group/item"
                        >
                          <User className="w-4 h-4 text-[#692c7a] group-hover/item:text-[#d8b4f0] transition-colors" />
                          <span className="text-sm font-medium">
                            My Profile
                          </span>
                        </motion.button>

                        {/* Settings Option */}
                        <motion.button
                          whileHover={{
                            backgroundColor: "rgba(105, 44, 122, 0.15)",
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white transition-colors group/item"
                        >
                          <Settings className="w-4 h-4 text-[#692c7a] group-hover/item:text-[#d8b4f0] transition-colors" />
                          <span className="text-sm font-medium">Settings</span>
                        </motion.button>

                        {/* Divider */}
                        <div className="my-2 h-px bg-white/10" />

                        {/* Logout Option */}
                        <motion.button
                          onClick={handleLogout}
                          whileHover={{
                            backgroundColor: "rgba(239, 68, 68, 0.15)",
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 transition-colors group/item"
                        >
                          <LogOut className="w-4 h-4 group-hover/item:text-red-400 transition-colors" />
                          <span className="text-sm font-medium">Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/skill-academy/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border-2 border-white/30 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/skill-academy/register">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(105, 44, 122, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-[#692c7a] to-[#9463a8] rounded-xl font-semibold text-white shadow-lg shadow-[#692c7a]/25 hover:shadow-[#692c7a]/40 transition-all text-sm"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <nav className="max-w-[95%] mx-auto px-4 py-4 space-y-2">
              {/* Navigation Items */}
              {[
                { label: "Home", href: "/skill-academy" },
                { label: "Courses", href: "/skill-academy/courses" },
                { label: "Reviews", href: "/skill-academy/reviews" },
                { label: "About", href: "/skill-academy/about" },
                { label: "Contact", href: "/skill-academy/contact" },
              ].map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={index} href={item.href}>
                    <motion.div
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-3 px-4 rounded-lg transition-all font-medium text-sm ${
                        isActive
                          ? "text-[#d8b4f0] bg-[#692c7a]/20"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="my-2 h-px bg-white/10" />

              {/* Auth Actions */}
              {user ? (
                <>
                  {/* Mobile Profile Card */}
                  <div className="bg-gradient-to-r from-[#692c7a]/20 to-transparent p-4 rounded-lg border border-white/10 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#692c7a] to-[#9463a8] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {getInitials()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {user.name
                            ? user.name.split(" ")[0]
                            : user.email.split("@")[0]}
                        </p>
                        <p className="text-xs text-gray-400">Student</p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Menu Items for Mobile */}
                  <motion.div className="py-3 px-4 rounded-lg flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                    <User className="w-4 h-4 text-[#692c7a]" />
                    <span className="text-sm font-medium">My Profile</span>
                  </motion.div>

                  <motion.div className="py-3 px-4 rounded-lg flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                    <Settings className="w-4 h-4 text-[#692c7a]" />
                    <span className="text-sm font-medium">Settings</span>
                  </motion.div>

                  <div className="my-2 h-px bg-white/10" />

                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}
                    className="w-full py-3 px-4 text-red-400 hover:text-red-300 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link href="/skill-academy/login">
                    <motion.div
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-4 rounded-lg font-medium text-sm text-white hover:bg-white/5 transition-all"
                    >
                      Sign In
                    </motion.div>
                  </Link>
                  <Link href="/skill-academy/register">
                    <motion.div
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-4 rounded-lg font-medium text-sm bg-gradient-to-r from-[#692c7a] to-[#9463a8] text-white hover:shadow-lg transition-all"
                    >
                      Get Started
                    </motion.div>
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default function SkillAcademyLayout({ children }) {
  const pathname = usePathname();

  // Detect course detail pages: /skill-academy/courses/<id>
  const isCourseDetail =
    pathname?.startsWith("/skill-academy/courses/") &&
    pathname.split("/").filter(Boolean).length >= 3;

  // Hide navbar and footer on register page
  const isRegisterPage = pathname === "/skill-academy/register";

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Layout background — only show when NOT on course detail pages or register page */}
      {!isCourseDetail && !isRegisterPage && (
        <div className="fixed inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3d1642] via-[#2a1138] to-[#4a1f52]" />

          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/15 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />

          <motion.div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-[#8b4fa8]/30 to-[#692c7a]/10 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          />
        </div>
      )}

      {!isRegisterPage && <DesktopHeader />}

      <main
        className={`relative z-10 ${
          !isRegisterPage ? "pt-16 lg:pt-20 pb-20 md:pb-0" : ""
        }`}
      >
        {children}
      </main>

      {!isRegisterPage && <SkillAcademyFooter />}
      {!isRegisterPage && <MobileBottomNav />}
    </div>
  );
}
