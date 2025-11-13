"use client";

import { motion } from "framer-motion";

export const MouseFollower = ({ mousePosition }) => (
  <motion.div
    className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference"
    animate={{
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
    }}
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 28,
    }}
  />
);
