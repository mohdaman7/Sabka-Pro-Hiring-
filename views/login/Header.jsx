"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-[95%] mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full overflow-hidden shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300 bg-white ring-2 ring-primary/20"
            >
              <img
                src="/sabka-logo.png"
                alt="Sabka Pro"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Sabka Pro HIRIN
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
