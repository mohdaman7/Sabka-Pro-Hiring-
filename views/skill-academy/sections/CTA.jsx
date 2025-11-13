"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";
import { ParallaxSection } from "../components/ParallaxSection";
import { MagneticButton } from "../components/MagneticButton";

export const CTA = () => {
  return (
    <ParallaxSection speed={0.1}>
      <section className="py-20 lg:py-32">
        <div className="max-w-[95%] mx-auto px-4 lg:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Join thousands of successful learners who have already started their
              journey with Sabka Skill Academy. Your future starts today!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <MagneticButton
                href="/skill-academy/courses"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Explore Courses
              </MagneticButton>

              <MagneticButton
                href="/contact"
                className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-lg text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Talk to Expert
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </ParallaxSection>
  );
};
