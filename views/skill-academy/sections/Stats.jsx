"use client";

import { motion } from "framer-motion";
import { Users, Book, Award, TrendingUp } from "lucide-react";

const stats = [
  {
    value: "50K+",
    label: "Active Students",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
    iconBg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    value: "200+",
    label: "Expert Courses",
    icon: Book,
    color: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
    iconBg: "bg-purple-500/10",
    border: "border-purple-500/30",
  },
  {
    value: "15K+",
    label: "Certified Graduates",
    icon: Award,
    color: "from-orange-500 to-red-500",
    bgGlow: "bg-orange-500/20",
    iconBg: "bg-orange-500/10",
    border: "border-orange-500/30",
  },
  {
    value: "95%",
    label: "Success Rate",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    bgGlow: "bg-green-500/20",
    iconBg: "bg-green-500/10",
    border: "border-green-500/30",
  },
];

export const Stats = () => {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Impact in{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Numbers
            </span>
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join thousands of successful learners transforming their careers
          </motion.p>
        </motion.div>

        {/* Stats Grid - 2x2 on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  },
                }}
                className="relative group cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  className={`absolute inset-0 ${stat.bgGlow} rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                {/* Card */}
                <div
                  className={`relative h-full p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl backdrop-blur-xl border ${stat.border} bg-gradient-to-br from-white/5 to-white/[0.02] group-hover:border-opacity-60 transition-all duration-300 overflow-hidden`}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Shimmer Effect on Scroll */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "200%" }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15 + 0.5,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${stat.iconBg} mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300`}
                      initial={{ rotate: -180, scale: 0 }}
                      whileInView={{ rotate: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.15 + 0.3,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        rotate: 15,
                        scale: 1.2,
                      }}
                    >
                      <IconComponent
                        className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                        style={{
                          filter: "drop-shadow(0 0 8px currentColor)",
                        }}
                      />
                    </motion.div>

                    {/* Value with Counter Animation */}
                    <motion.h3
                      className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.15 + 0.4,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {stat.value}
                    </motion.h3>

                    {/* Label */}
                    <motion.p
                      className="text-xs sm:text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.15 + 0.6,
                        duration: 0.5,
                      }}
                    >
                      {stat.label}
                    </motion.p>
                  </div>

                  {/* Decorative Corner Element */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 opacity-20"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15 + 0.5,
                      duration: 0.6,
                    }}
                  >
                    <div
                      className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${stat.color} rounded-bl-full`}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
          className="mt-8 md:mt-12 lg:mt-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent origin-center"
        />
      </div>
    </section>
  );
};
