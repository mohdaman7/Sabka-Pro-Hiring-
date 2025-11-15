"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronUp,
} from "lucide-react";

const SkillAcademyFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { label: "Home", href: "/skill-academy" },
    { label: "Courses", href: "/skill-academy/courses" },
    { label: "About", href: "/skill-academy/about" },
    { label: "Contact", href: "/skill-academy/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { icon: Youtube, href: "#", color: "hover:text-red-500" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <a href="/skill-academy" className="inline-block">
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-lg overflow-hidden"
                  >
                    <img
                      src="/sabka-logo.png"
                      alt="Sabka Skill Academy Logo"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white">
                      Sabka Skill Academy
                    </h3>
                    <p className="text-xs text-purple-300 hidden sm:block">
                      Learn • Grow • Succeed
                    </p>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4 md:gap-6"
            >
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-purple-300 transition-colors text-xs md:text-sm"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:border-white/30 hover:bg-white/10`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="text-gray-500 text-xs text-center">
              © 2025 Sabka Skill Academy. All rights reserved.
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 z-40"
        >
          <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      </div>
    </footer>
  );
};

export default SkillAcademyFooter;
