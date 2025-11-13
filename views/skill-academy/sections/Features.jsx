"use client";

import { motion } from "framer-motion";
import { Rocket, Target, Shield, Users } from "lucide-react";
import { ParallaxSection } from "../components/ParallaxSection";

const featuresData = [
  {
    icon: Rocket,
    title: "Fast-Track Learning",
    description: "Accelerated courses designed for quick skill acquisition",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Target,
    title: "Industry-Focused",
    description: "Curriculum aligned with current market demands",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Certified Programs",
    description: "Globally recognized certifications and credentials",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Learn from industry professionals and experts",
    color: "from-purple-500 to-pink-500",
  },
];

export const Features = () => {
  return (
    <ParallaxSection speed={0.2}>
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
              Why Choose Sabka Skill Academy?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience world-class education with industry-leading features
            </p>
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
                  className="group bg-white/5 border-2 border-gray-700 rounded-2xl p-8 hover:border-purple-500 hover:bg-white/10 transition-all duration-300 shadow-xl"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`w-14 h-14 mb-6 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};
