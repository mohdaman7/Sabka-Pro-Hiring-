"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TypeSelector({ currentType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 mb-8 bg-card/50 backdrop-blur-sm rounded-2xl p-2 border border-border shadow-lg"
    >
      <Link
        href="/login?type=candidate"
        className={`flex-1 py-4 px-6 rounded-xl text-center font-semibold transition-all duration-200 ${
          currentType === "candidate"
            ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
      >
        <span className="hidden sm:inline">Candidate </span>Login
      </Link>
      <Link
        href="/login?type=employer"
        className={`flex-1 py-4 px-6 rounded-xl text-center font-semibold transition-all duration-200 ${
          currentType === "employer"
            ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
      >
        <span className="hidden sm:inline">Employer </span>Login
      </Link>
    </motion.div>
  );
}
