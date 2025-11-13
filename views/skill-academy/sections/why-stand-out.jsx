"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export const WhyStandOut = () => {
  const reasons = [
    "Expert instructors with 10+ years industry experience",
    "Live projects and real-world case studies",
    "Job guarantee and career support",
    "Lifetime access to course materials",
  ];

  return (
    <section className="relative w-full overflow-hidden py-12 lg:py-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 -left-96 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            delay: 2,
          }}
          className="absolute bottom-1/4 -right-96 w-96 h-96 bg-pink-900/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Image with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-96 sm:h-[500px] lg:h-[550px]">
              {/* 3D layered effect */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 rounded-3xl overflow-hidden"
              >
                <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-2xl rounded-3xl overflow-hidden">
                  <img
                    src="/teamabout.jpg"
                    alt="Why Sabka Skill Academy stands out"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Floating stat card */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1,
                }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl border border-white/20 max-w-xs"
              >
                <div className="text-white">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2">50K+</h3>
                  <p className="text-sm sm:text-base font-semibold text-white/90">
                    Happy Students Learning Daily
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full"
            ></motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
            >
              Why Sabka Skill{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Academy Stands Out
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              At Sabka Skill Academy, we've revolutionized education through
              cutting-edge technology and expert mentorship. Our innovative
              approach combines code-based learning with real-world projects,
              ensuring you don't just learn—you master.
            </motion.p>

            {/* Reasons List */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4 mb-10"
            >
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-200 font-medium group-hover:text-white transition-colors">
                    {reason}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold flex items-center gap-3 shadow-lg hover:shadow-2xl transition-all group"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
