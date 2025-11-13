"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Send,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const SkillAcademyFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    courses: [
      {
        label: "Web Development",
        href: "/skill-academy/courses/web-development",
      },
      { label: "Data Science", href: "/skill-academy/courses/data-science" },
      { label: "UI/UX Design", href: "/skill-academy/courses/design" },
      { label: "Digital Marketing", href: "/skill-academy/courses/marketing" },
    ],
    company: [
      { label: "About Us", href: "/skill-academy/about" },
      { label: "Our Team", href: "/skill-academy/team" },
      { label: "Careers", href: "/skill-academy/careers" },
      { label: "Contact", href: "/skill-academy/contact" },
    ],
    resources: [
      { label: "Help Center", href: "/skill-academy/help" },
      { label: "Blog", href: "/skill-academy/blog" },
      { label: "Community", href: "/skill-academy/community" },
      { label: "Reviews", href: "/skill-academy/reviews" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/skill-academy/privacy" },
      { label: "Terms of Service", href: "/skill-academy/terms" },
      { label: "Refund Policy", href: "/skill-academy/refunds" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { icon: Youtube, href: "#", color: "hover:text-red-500" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-white/10">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-6 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <a href="/skill-academy" className="inline-block mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <GraduationCap className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Sabka Skill Academy
                      </h3>
                      <p className="text-sm text-purple-300">
                        Learn • Grow • Succeed
                      </p>
                    </div>
                  </div>
                </a>

                <p className="text-gray-400 mb-8 leading-relaxed">
                  Empowering learners worldwide with cutting-edge skills and
                  industry-recognized certifications.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <a
                    href="mailto:hello@sabkaskillacademy.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span>hello@sabkaskillacademy.com</span>
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-purple-400" />
                    <span>+1 (555) 123-4567</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>123 Education St, Learning City</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  Courses
                </h4>
                <ul className="space-y-3">
                  {footerLinks.courses.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-2 group text-sm"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </motion.div>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-2 group text-sm"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </motion.div>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  Resources
                </h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-2 group text-sm"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </motion.div>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-2 group text-sm"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </motion.div>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-12 border-t border-white/10"
          >
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400 mb-6">
                Get the latest course updates and exclusive offers.
              </p>

              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                <motion.button
                  onClick={handleNewsletterSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </motion.button>
              </div>

              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-green-400 text-sm"
                >
                  ✓ Thank you for subscribing!
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                © 2025 Sabka Skill Academy. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:border-white/20`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      </div>
    </footer>
  );
};

export default SkillAcademyFooter;
