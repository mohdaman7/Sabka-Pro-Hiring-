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
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 30,
      }}
    >
      {/* Professional premium mouse follower - elegant cross with gradient */}
      <motion.div
        className="relative w-6 h-6"
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 w-0.5 h-6 -translate-x-1/2 bg-gradient-to-b from-purple-400 to-purple-600" />
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 w-6 h-0.5 -translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-400" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg shadow-purple-400/50" />
      </motion.div>
    </motion.div>
  );
};
