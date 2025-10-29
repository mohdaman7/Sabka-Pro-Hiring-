"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Header() {
  return (
    <header className="z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0">
      <div className="max-w-[95%] mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full overflow-hidden shadow-lg bg-white"
            >
              <img
                src="/sabka-logo.png"
                alt="Sabka Pro"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              Sabka Pro Hiring
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
