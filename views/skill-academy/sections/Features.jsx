"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Award, Zap, Sparkles, Star, Rocket, Target, Shield } from "lucide-react";
import { ParallaxSection } from "../components/ParallaxSection";

const featuresData = [
  {
    icon: Rocket,
    title: "Fast-Track Learning",
    description: "Accelerated courses designed for quick skill acquisition",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Target,
    title: "Industry-Focused",
    description: "Curriculum aligned with current market demands",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Certified Programs",
    description: "Globally recognized certifications and credentials",
    color: "from-purple-600 to-pink-500",
  },
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Learn from industry professionals and experts",
    color: "from-pink-500 to-purple-500",
  },
];

export const Features = () => {
  return (
    <ParallaxSection speed={0.2}>
      <section className="py-20 lg:py-32 bg-gradient-to-b from-black via-purple-950/25 to-slate-950 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -80, 80, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-500/6 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -60, 60, 0],
              y: [0, 60, -60, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/4 rounded-full blur-xl"
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
              className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-purple-500/15 border border-purple-400/30 rounded-full backdrop-blur-xl shadow-lg shadow-purple-500/20"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
              </motion.div>
              <span className="text-sm font-bold text-purple-300 tracking-wide">KEY FEATURES</span>
              <Star className="w-4 h-4 text-purple-400" />
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              World-Class Learning
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Advanced features and tools designed to accelerate your success. 
              Experience learning like never before with our cutting-edge platform.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresData.map((feature, index) => {
              const Icon = feature.icon;
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
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/25 to-indigo-600/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-xl group-hover:border-purple-500/50 transition-all duration-500 shadow-2xl shadow-purple-500/10 group-hover:shadow-purple-500/20 h-full">
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/8 to-indigo-500/4 rounded-2xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className={`w-16 h-16 mb-6 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:shadow-purple-500/50 transition-all duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
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
