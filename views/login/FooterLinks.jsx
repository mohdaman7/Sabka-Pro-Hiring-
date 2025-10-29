"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FooterLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="text-center mt-8 space-y-4"
    >
      <p className="text-sm text-white/50">
        Having trouble?{" "}
        <Link
          href="/contact"
          className="text-primary hover:text-primary/80 font-semibold hover:underline"
        >
          Contact support
        </Link>
      </p>
      <div className="flex justify-center gap-6 text-xs text-white/40">
        <Link
          href="/privacy"
          className="hover:text-white/70 transition-colors hover:underline"
        >
          Privacy Policy
        </Link>
        <span className="text-white/20">•</span>
        <Link href="/terms" className="hover:text-white/70 transition-colors hover:underline">
          Terms of Service
        </Link>
      </div>
      
      <p className="text-xs text-white/30 pt-2">
        © 2024 Sabka Pro Hiring. All rights reserved.
      </p>
    </motion.div>
  );
}
