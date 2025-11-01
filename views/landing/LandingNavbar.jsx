"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-sm border-b border-border/30 shadow-lg overflow-hidden">
      <div className="w-full max-w-full lg:max-w-[95%] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20 min-w-0">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-1 min-w-0 items-center gap-2 sm:gap-3 group overflow-hidden"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105 bg-white flex-shrink-0">
              <img
                src="/sabka-logo.png"
                alt="Sabka Pro"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 max-w-[60vw] sm:max-w-none">
              <span className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                Sabka Pro Hiring
              </span>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground -mt-1 hidden sm:block truncate">
                Your Career Partner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="#"
              onClick={() => setActive("home")}
              className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                active === "home"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              <span className="relative inline-block">
                Home
                {active === "home" && (
                  <span className="block h-0.5 w-6 bg-[#b87bd1] rounded-full mt-1" />
                )}
              </span>
            </Link>

            <Link
              href="#features"
              onClick={() => setActive("features")}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                active === "features"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              Features
            </Link>

            <Link
              href="#about"
              onClick={() => setActive("about")}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                active === "about"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              About Us
            </Link>

            <Link
              href="#plans"
              onClick={() => setActive("how")}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                active === "how"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              Plans
            </Link>

            <Link
              href="#testimonials"
              onClick={() => setActive("testimonials")}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                active === "testimonials"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              Testimonials
            </Link>

            <div className="ml-4 h-6 w-px bg-border/20"></div>

            <Link
              href="/login"
              onClick={() => setActive("login")}
              className={`ml-2 px-5 py-2 text-sm rounded-lg transition-all duration-200 ${
                active === "login"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setActive("register")}
              className="px-6 py-2.5 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:from-[#8f4aa0] hover:to-[#c78be0] text-white rounded-lg transition-all duration-200 text-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/30"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-gray-300 hover:text-white hover:bg-white/6 rounded-lg transition-all duration-200 shrink-0 ml-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/20 overflow-x-hidden">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="#"
              onClick={() => {
                setActive("home");
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                active === "home"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              Home
            </Link>

            <Link
              href="#features"
              onClick={() => {
                setActive("features");
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                active === "features"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              Features
            </Link>

            <Link
              href="#about"
              onClick={() => {
                setActive("about");
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                active === "about"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              About Us
            </Link>

            <Link
              href="#plans"
              onClick={() => {
                setActive("how");
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                active === "how"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              Plans
            </Link>

            <Link
              href="#testimonials"
              onClick={() => {
                setActive("testimonials");
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                active === "testimonials"
                  ? "text-white font-semibold bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/6"
              }`}
            >
              Testimonials
            </Link>

            <div className="h-px bg-border/20 my-4"></div>

            <Link
              href="/login"
              onClick={() => {
                setActive("login");
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-3 text-sm rounded-lg text-gray-300 hover:text-white hover:bg-white/6 transition-all duration-200"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => {
                setActive("register");
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-all duration-200 text-sm font-semibold text-center shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
