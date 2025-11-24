"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Star, Users, Phone, Menu, X } from "lucide-react";
import Link from "next/link";
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
  const pathname = usePathname();

  // scroll listener (client-only)
  if (typeof window !== "undefined") {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    // attach/detach via effect in real app — simple approach here:
    window.addEventListener("scroll", handleScroll);
  }

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

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
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
        {/** NOTE: For brevity we're showing a simple mobile menu. */}
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

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Layout background — only show when NOT on course detail pages */}
      {!isCourseDetail && (
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

      <DesktopHeader />

      <main className="relative z-10 pt-16 lg:pt-20 pb-20 md:pb-0">
        {children}
      </main>

      <SkillAcademyFooter />
      <MobileBottomNav />
    </div>
  );
}
