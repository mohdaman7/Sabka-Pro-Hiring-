"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FooterLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="text-center mt-6 space-y-3"
    >
      <p className="text-sm text-muted-foreground">
        Having trouble?{" "}
        <Link
          href="/contact"
          className="text-primary hover:text-primary/80 font-medium"
        >
          Contact support
        </Link>
      </p>
      <div className="flex justify-center gap-4 text-xs text-muted-foreground">
        <Link
          href="/privacy"
          className="hover:text-foreground transition-colors"
        >
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-foreground transition-colors">
          Terms of Service
        </Link>
      </div>
    </motion.div>
  );
}
