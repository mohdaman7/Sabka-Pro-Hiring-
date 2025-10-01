import Link from "next/link"
import { Briefcase, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export default function LandingFooter() {
  return (
    <footer className="relative bg-[#0f172a] overflow-hidden">
      {/* Decorative background elements */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div> */}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105 bg-white">
                <img 
                  src="/sabka-logo.png" 
                  alt="Sabka Pro" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white">Sabka Pro</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner in career growth and talent acquisition.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800/50 border border-blue-500/10 hover:border-blue-400/30 flex items-center justify-center transition-all duration-200 hover:bg-blue-500/10 group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800/50 border border-blue-500/10 hover:border-blue-400/30 flex items-center justify-center transition-all duration-200 hover:bg-blue-500/10 group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800/50 border border-blue-500/10 hover:border-blue-400/30 flex items-center justify-center transition-all duration-200 hover:bg-blue-500/10 group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Candidates</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Training Courses
                </Link>
              </li>
              <li>
                <Link href="/register?type=candidate" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Register
                </Link>
              </li>
              <li>
                <Link href="/candidate-login" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400 group hover:text-blue-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 border border-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:border-blue-400/30 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="mt-1">info@sabkapro.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 group hover:text-blue-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 border border-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:border-blue-400/30 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="mt-1">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 group hover:text-blue-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 border border-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:border-blue-400/30 transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="mt-1">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2025 Sabka Pro HIRIN. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}