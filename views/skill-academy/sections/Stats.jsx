"use client";

import { motion } from "framer-motion";
import { Users, Book, Award, Zap } from "lucide-react";

const stats = [
  { value: "50K+", label: "Students", icon: Users },
  { value: "200+", label: "Courses", icon: Book },
  { value: "15K+", label: "Certifications", icon: Award },
  { value: "95%", label: "Success Rate", icon: Zap },
];

export const Stats = () => {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-premium p-8 rounded-2xl text-center glow-accent group"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="mb-4 inline-flex"
                >
                  <IconComponent className="w-12 h-12 text-purple-400" />
                </motion.div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
