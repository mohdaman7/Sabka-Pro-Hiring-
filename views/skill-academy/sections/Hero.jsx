"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";

export const Hero = () => {
  return (
    <section className="w-full min-h-screen flex items-center relative overflow-hidden">
      {/* Desktop Background */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/hero-background.png)",
        }}
      />

      {/* Mobile Background - Different positioning */}
      <div
        className="md:hidden absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: "url(/hero-background-mobile.png)",
          backgroundPosition: "65% center",
        }}
      />

      {/* Gradient Overlays - Different for mobile and desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20 md:from-black/60 md:via-black/30 md:to-transparent" />

      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-15 md:opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: "rgba(147, 51, 234, 0.3)" }}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-56 h-56 md:w-80 md:h-80 rounded-full blur-3xl opacity-15 md:opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: "rgba(168, 85, 247, 0.3)" }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-0">
        <div className="max-w-full md:max-w-2xl space-y-6 md:space-y-6">
          {/* Main Heading */}
          <div className="space-y-3 md:space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-purple-400 text-xs sm:text-sm font-semibold uppercase tracking-widest"
            >
              Skill Academy
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Master Skills with{" "}
              <span className="block mt-2 md:inline md:mt-0">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="inline-block"
                >
                  <AuroraText
                    colors={["#a855f7", "#ec4899", "#8b5cf6", "#d946ef"]}
                    className="font-extrabold"
                  >
                    Expert Instructors
                  </AuroraText>
                </motion.span>
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-xl"
          >
            Join thousands of students learning from industry professionals.
            Achieve your goals with structured, proven courses.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-purple-400/30 hover:border-purple-400/50 backdrop-blur-sm w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Courses
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
