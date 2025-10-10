"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-sm border-b border-border/30 shadow-lg">
      <div className="max-w-[95%] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105 bg-white">
              <img
                src="/sabka-logo.png"
                alt="Sabka Pro"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight">
                Sabka Pro Hiring
              </span>
              <span className="text-[10px] text-muted-foreground -mt-1">
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
            className="md:hidden p-2.5 text-gray-300 hover:text-white hover:bg-white/6 rounded-lg transition-all duration-200"
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
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/20">
          <div className="px-6 py-6 space-y-2">
            <Link href="#">
              <a
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
              </a>
            </Link>

            <Link href="#features">
              <a
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
              </a>
            </Link>

            <Link href="#about">
              <a
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
              </a>
            </Link>

            <Link href="#how-it-works">
              <a
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
                How It Works
              </a>
            </Link>

            <Link href="#testimonials">
              <a
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
              </a>
            </Link>

            <div className="h-px bg-border/20 my-4"></div>

            <Link href="/login">
              <a
                onClick={() => {
                  setActive("login");
                  setMobileMenuOpen(false);
                }}
                className="block px-4 py-3 text-sm rounded-lg text-gray-300 hover:text-white hover:bg-white/6 transition-all duration-200"
              >
                Login
              </a>
            </Link>

            <Link href="/register">
              <a
                onClick={() => {
                  setActive("register");
                  setMobileMenuOpen(false);
                }}
                className="block px-4 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-all duration-200 text-sm font-semibold text-center shadow-lg"
              >
                Get Started
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
