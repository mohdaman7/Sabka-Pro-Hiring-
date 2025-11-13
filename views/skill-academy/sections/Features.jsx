"use client";

import { motion } from "framer-motion";
import { Zap, Target, Award, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Industry-Focused",
    description:
      "Learn skills employers actually need with real-world projects",
  },
  {
    icon: Target,
    title: "Career Acceleration",
    description: "Fast-track your growth with personalized learning paths",
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Earn globally recognized credentials that matter",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with peers and mentors who share your goals",
  },
];

export const Features = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Why Choose Sabka Skill
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium education platform designed for ambitious learners
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group glass-premium p-8 rounded-2xl glow-accent"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center mb-6 glow-purple"
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
