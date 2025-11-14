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
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="p-6 md:p-8 rounded-2xl backdrop-blur-xl border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-pink-500/5 group hover:border-purple-300/40 transition-all"
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
