"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MouseFollower = ({ mousePosition }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 35,
        mass: 0.5,
      }}
    >
      <motion.div
        className="relative w-8 h-8"
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Outer ring with glow effect */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 rounded-full border border-blue-400/40"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(147, 197, 253, 0.4)",
              "0 0 0 8px rgba(147, 197, 253, 0)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />

        {/* Middle ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-blue-300/60 shadow-lg shadow-blue-500/20" />

        {/* Inner gradient circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-400/60" />

        {/* Premium accent dots */}
        <motion.div
          className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-300"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-300"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.div>
  );
};
