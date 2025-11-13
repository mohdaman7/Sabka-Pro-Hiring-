"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

export const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-20">
      {/* Full-width background gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full">
        {/* Main hero content - Full width responsive grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen lg:min-h-auto lg:h-auto">
            {/* Left Content */}
            <div className="text-left flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 mb-6 sm:mb-8 glass-effect px-4 py-2 rounded-full"
                >
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm text-gray-300">
                    Trusted by 50,000+ learners
                  </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight text-white text-balance"
                >
                  Master Your{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                    Future Skills
                  </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-lg text-balance"
                >
                  Learn from industry experts and earn globally recognized
                  certifications. Transform your career with cutting-edge
                  courses designed for success.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 glow-purple hover:shadow-2xl transition-all text-sm sm:text-base"
                  >
                    Start Learning{" "}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 glass-effect rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sm sm:text-base"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" /> Watch Demo
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Premium Images Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative w-full h-full min-h-96 sm:min-h-auto"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">
                {/* Large featured image - top left */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="col-span-1 row-span-2 relative overflow-hidden rounded-2xl glass-premium glow-accent"
                >
                  <Image
                    src="/professional-developer-coding-at-desk.jpg"
                    alt="Professional learning environment"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 150px, 250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>

                {/* Top right image */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: 0.2 }}
                  className="relative overflow-hidden rounded-2xl glass-premium glow-accent"
                >
                  <Image
                    src="/online-course-learning-platform.jpg"
                    alt="Online learning interface"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 150px, 250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>

                {/* Bottom right image */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: 0.4 }}
                  className="relative overflow-hidden rounded-2xl glass-premium glow-accent"
                >
                  <Image
                    src="/team-collaboration-workspace.jpg"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 150px, 250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              </div>

              {/* Floating stat cards overlay */}
              <div className="absolute -bottom-8 sm:-bottom-12 left-4 sm:left-8 right-4 sm:right-auto z-10 max-w-xs">
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="glass-premium p-4 sm:p-6 rounded-xl glow-accent border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">⭐</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">4.9/5</p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Highly Rated
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
