"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Play, ArrowRight, CheckCircle, Award } from "lucide-react";
import { FloatingElement } from "../components/FloatingElement";
import { MagneticButton } from "../components/MagneticButton";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <FloatingElement delay={0} duration={4}>
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
        </FloatingElement>
        <FloatingElement delay={1} duration={5}>
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-xl" />
        </FloatingElement>
        <FloatingElement delay={2} duration={3}>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-xl" />
        </FloatingElement>
      </div>

      <div className="relative z-10 max-w-[95%] mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Master Skills
                </span>
                <br />
                <motion.span
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]"
                >
                  Shape Future
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
              >
                Join the revolution of online learning with cutting-edge
                courses, expert mentors, and industry-recognized
                certifications.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-start gap-6"
              >
                <MagneticButton
                  href="/skill-academy/courses"
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3"
                >
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Start Learning Now
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </MagneticButton>

                <MagneticButton
                  href="/skill-academy/about"
                  className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-lg text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
                >
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 z-10" />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Students Learning"
                className="w-full h-full object-cover"
              />
              {/* Floating Elements */}
              <FloatingElement delay={0} duration={4}>
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">50,000+</p>
                      <p className="text-gray-300 text-sm">Students</p>
                    </div>
                  </div>
                </div>
              </FloatingElement>

              <FloatingElement delay={1} duration={5}>
                <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">95%</p>
                      <p className="text-gray-300 text-sm">Success Rate</p>
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};
