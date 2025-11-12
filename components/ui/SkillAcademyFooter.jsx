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
  Heart,
  Star,
  Users,
  BookOpen,
  Award,
  Globe,
  Send,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SkillAcademyFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    courses: [
      { label: "Web Development", href: "/skill-academy/courses/web-development" },
      { label: "Data Science", href: "/skill-academy/courses/data-science" },
      { label: "UI/UX Design", href: "/skill-academy/courses/design" },
      { label: "Digital Marketing", href: "/skill-academy/courses/marketing" },
      { label: "Business Analytics", href: "/skill-academy/courses/analytics" },
    ],
    company: [
      { label: "About Us", href: "/skill-academy/about" },
      { label: "Our Story", href: "/skill-academy/about#story" },
      { label: "Team", href: "/skill-academy/about#team" },
      { label: "Careers", href: "/skill-academy/careers" },
      { label: "Press", href: "/skill-academy/press" },
    ],
    support: [
      { label: "Help Center", href: "/skill-academy/help" },
      { label: "Contact Us", href: "/skill-academy/contact" },
      { label: "Student Reviews", href: "/skill-academy/reviews" },
      { label: "Community", href: "/skill-academy/community" },
      { label: "Blog", href: "/skill-academy/blog" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/skill-academy/privacy" },
      { label: "Terms of Service", href: "/skill-academy/terms" },
      { label: "Cookie Policy", href: "/skill-academy/cookies" },
      { label: "Refund Policy", href: "/skill-academy/refunds" },
      { label: "Accessibility", href: "/skill-academy/accessibility" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { icon: Youtube, href: "#", color: "hover:text-red-500" },
  ];

  const stats = [
    { icon: Users, value: "50,000+", label: "Students" },
    { icon: BookOpen, value: "500+", label: "Courses" },
    { icon: Award, value: "25,000+", label: "Certificates" },
    { icon: Globe, value: "150+", label: "Countries" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-white/10">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/skill-academy">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <GraduationCap className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Sabka Skill Academy
                      </h3>
                      <p className="text-sm text-purple-300">Learn • Grow • Succeed</p>
                    </div>
                  </div>
                </Link>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  Empowering learners worldwide with cutting-edge skills and industry-recognized certifications. 
                  Join our community of successful professionals and transform your career today.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
                      >
                        <Icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span>hello@sabkaskillacademy.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>123 Education St, Learning City, LC 12345</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
              {/* Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="text-lg font-bold text-white mb-6">Popular Courses</h4>
                <ul className="space-y-3">
                  {footerLinks.courses.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-2 group"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </motion.div>
                      </Link>
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
                <h4 className="text-lg font-bold text-white mb-6">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-2 group"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </motion.div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="text-lg font-bold text-white mb-6">Support</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-2 group"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </motion.div>
                      </Link>
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
            className="mt-16 pt-12 border-t border-white/10"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated with Our Newsletter
              </h3>
              <p className="text-gray-400 mb-8">
                Get the latest course updates, learning tips, and exclusive offers delivered to your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </motion.button>
              </form>

              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-green-400 flex items-center justify-center gap-2"
                >
                  <Star className="w-4 h-4 fill-current" />
                  Thank you for subscribing!
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="flex items-center gap-2 text-gray-400">
                <span>© 2024 Sabka Skill Academy. Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>for learners worldwide.</span>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center gap-6">
                {footerLinks.legal.map((link, index) => (
                  <Link key={index} href={link.href}>
                    <span className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:border-white/20`}
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
