"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Award, TrendingUp } from "lucide-react";
import { ParallaxSection } from "../components/ParallaxSection";

const statsData = [
  {
    icon: Users,
    label: "Active Students",
    value: "50,000+",
    color: "from-purple-500 to-indigo-500",
    description: "Learning & growing",
  },
  {
    icon: BookOpen,
    label: "Courses Available",
    value: "200+",
    color: "from-indigo-500 to-purple-500",
    description: "Expert-crafted content",
  },
  {
    icon: Award,
    label: "Certifications Earned",
    value: "15,000+",
    color: "from-purple-600 to-pink-500",
    description: "Industry recognized",
  },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: "95%",
    color: "from-indigo-600 to-purple-600",
    description: "Career advancement",
  },
];

export const Stats = () => {
  return (
    <ParallaxSection speed={0.3}>
      <section className="py-20 lg:py-32 bg-gradient-to-b from-black via-purple-950/20 to-slate-950 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              x: [0, 100, -100, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-[95%] mx-auto px-4 lg:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-purple-300">Success Metrics</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Proven Excellence
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our track record speaks for itself - delivering results that matter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  {/* Glow background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-xl overflow-hidden group-hover:border-purple-500/50 transition-all duration-300 shadow-xl">
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <div className="relative z-10 text-center">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl mb-6 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Value */}
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      >
                        <h3 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mb-2">
                          {stat.value}
                        </h3>
                      </motion.div>

                      {/* Label */}
                      <p className="text-white font-semibold mb-2">{stat.label}</p>
                      <p className="text-sm text-gray-400">{stat.description}</p>

                      {/* Animated line */}
                      <motion.div
                        className="h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-4"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};
