"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { ParallaxSection } from "../components/ParallaxSection";
import { MagneticButton } from "../components/MagneticButton";

export const CTA = () => {
  return (
    <ParallaxSection speed={0.1}>
      <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-purple-950/30 to-black relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -60, 60, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 80, 0],
              y: [0, 80, -80, 0],
              scale: [1, 0.8, 1.3, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-600/12 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 60, -60, 0],
              y: [0, -40, 40, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/8 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-[95%] mx-auto px-4 lg:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-8 shadow-2xl shadow-purple-500/50"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>

            {/* Heading */}
            <motion.h2 
              className="text-4xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Start Your Success Journey
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join thousands of professionals who have transformed their careers with expert guidance. 
              Your future starts with the right skills today! Take the leap and unlock your potential.
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <MagneticButton
                href="/skill-academy/courses"
                className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/75 transition-all duration-300 flex items-center gap-4 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <Sparkles className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Explore Courses</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </MagneticButton>

              <MagneticButton
                href="/contact"
                className="group px-12 py-5 bg-white/5 border-2 border-purple-500/30 rounded-2xl font-semibold text-lg text-white hover:bg-purple-500/10 hover:border-purple-500/60 transition-all duration-300 flex items-center gap-4 backdrop-blur-xl"
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Talk to Expert
              </MagneticButton>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 pt-12 border-t border-purple-500/20 flex justify-center gap-12"
            >
              {[
                { label: "Students", value: "50K+" },
                { label: "Success Rate", value: "95%" },
                { label: "Courses", value: "200+" },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </ParallaxSection>
  );
};
