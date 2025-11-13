"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Award, TrendingUp } from "lucide-react";
import { ParallaxSection } from "../components/ParallaxSection";

const statsData = [
  {
    icon: Users,
    label: "Active Students",
    value: "50,000+",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    label: "Courses Available",
    value: "200+",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    label: "Certifications",
    value: "15,000+",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: "95%",
    color: "from-green-500 to-emerald-500",
  },
];

export const Stats = () => {
  return (
    <ParallaxSection speed={0.3}>
      <section className="py-20 lg:py-32">
        <div className="max-w-[95%] mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Trusted by Learners Worldwide
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join a community of ambitious learners and industry professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 border-2 border-gray-700 rounded-2xl p-8 text-center hover:border-purple-500 hover:bg-white/10 transition-all duration-300 shadow-xl"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};
