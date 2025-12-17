"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Target,
  Zap,
  Award,
} from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const containerRef = useRef(null);
  const router = useRouter();

  // Scroll Progress for effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-linked transformations
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-fit lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#3d1642] via-[#2a1138] to-[#4a1f52]"
    >
      {/* Ultra Premium Background with multiple layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d1642] via-[#2a1138] to-[#4a1f52]" />

        {/* Primary animated gradient orb - Top Left */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/4 w-[900px] h-[900px] bg-gradient-to-br from-[#692c7a]/40 via-[#9463a8]/20 to-transparent rounded-full blur-[150px]"
        />

        {/* Secondary animated gradient orb - Bottom Right */}
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/3 -right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-[#9463a8]/30 via-[#692c7a]/15 to-transparent rounded-full blur-[140px]"
        />

        {/* Accent orb - Center */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#b893d1]/20 to-transparent rounded-full blur-[120px]"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent 24%, rgba(180, 139, 209, 0.05) 25%, rgba(180, 139, 209, 0.05) 26%, transparent 27%, transparent 74%, rgba(180, 139, 209, 0.05) 75%, rgba(180, 139, 209, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(180, 139, 209, 0.05) 25%, rgba(180, 139, 209, 0.05) 26%, transparent 27%, transparent 74%, rgba(180, 139, 209, 0.05) 75%, rgba(180, 139, 209, 0.05) 76%, transparent 77%, transparent)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ y: contentY }}
            className="hidden lg:block lg:col-span-5 space-y-8"
          >
            {/* Premium Heading */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] text-white"
              >
                STEP Training
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="block bg-gradient-to-r from-[#b893d1] via-[#9463a8] to-[#692c7a] bg-clip-text text-transparent"
                >
                  Program
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-gray-300 leading-relaxed max-w-lg"
              >
                Systematic Training For Employment & Professionalism. Master
                industry-relevant skills with hands-on projects and earn
                globally recognized certifications.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Users, label: "12.5K+", desc: "Active Students" },
                { icon: Target, label: "95%", desc: "Success Rate" },
                { icon: BookOpen, label: "100%", desc: "Job Support" },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                    whileHover={{ scale: 1.08, y: -5 }}
                    className="group p-4 rounded-2xl bg-gradient-to-br from-white/8 to-white/4 border border-white/10 hover:border-[#b893d1]/40 backdrop-blur-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#b893d1]/20 to-[#9463a8]/10">
                        <Icon className="w-5 h-5 text-[#b893d1]" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {feature.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.button
                onClick={() =>
                  router.push("/skill-academy/courses/69259137caedbcfd52805094")
                }
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#b893d1] to-[#9463a8] hover:from-[#9463a8] hover:to-[#692c7a] text-white font-bold rounded-full shadow-2xl shadow-[#692c7a]/50 hover:shadow-3xl hover:shadow-[#692c7a]/70 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              <motion.button
                onClick={() =>
                  router.push("/skill-academy/courses/69259137caedbcfd52805094")
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 backdrop-blur-md transition-all duration-300"
              >
                Explore Courses
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Featured Card - Right / Full Width on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              type: "spring",
              stiffness: 50,
            }}
            style={{ y: cardY }}
            className="lg:col-span-7 flex justify-center w-full"
          >
            <div className="relative w-full max-w-lg">
              {/* Animated Border Glow */}
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-br from-[#b893d1]/40 via-[#9463a8]/30 to-[#692c7a]/20 rounded-[40px] blur-2xl"
              />

              {/* Main Card */}
              <motion.div
                whileHover={{ y: -20, scale: 1.03 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gradient-to-br from-[#1a0f2e]/95 to-[#0a0514]/95 backdrop-blur-2xl rounded-[40px] overflow-hidden border border-[#9463a8]/40 shadow-2xl"
              >
                {/* Animated Shine Effect */}
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                />

                {/* Image Container */}
                <div className="relative h-[420px] lg:h-[585px] overflow-hidden group">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src="./sabka-ceo.jpg"
                    alt="STEP Training Program"
                    className="w-full h-full object-cover"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-[#0a0514]/50 to-transparent" />

                  {/* Badge Top Left */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#692c7a] to-[#9463a8] rounded-full shadow-lg shadow-[#692c7a]/50"
                  >
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                    <span className="text-[11px] font-bold text-white uppercase tracking-wide">
                      Bestseller
                    </span>
                  </motion.div>

                  {/* Content Section */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3 className="text-white text-2xl font-black leading-tight">
                        STEP Training
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mt-1">
                        Transform your career with systematic professional
                        training
                      </p>
                    </motion.div>

                    {/* Premium CTA Button Inside Card */}
                    <motion.button
                      onClick={() => router.push("/skill-academy/courses")}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-white via-gray-50 to-white text-black font-bold text-sm rounded-xl shadow-xl shadow-white/20 hover:shadow-2xl hover:shadow-white/40 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Button shimmer effect */}
                      <motion.div
                        animate={{
                          x: ["-200%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Now
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Floating Accent Elements */}
              <motion.div
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#b893d1]/30 to-[#9463a8]/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  y: [0, 25, 0],
                  rotate: [0, -8, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-[#9463a8]/20 to-[#692c7a]/10 rounded-full blur-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
