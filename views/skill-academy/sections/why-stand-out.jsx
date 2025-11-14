"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export const WhyStandOut = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-12 md:py-20 lg:py-24"
    >
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: "rgba(128, 55, 145, 0.15)" }}
          />
        </motion.div>
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute bottom-0 right-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: "rgba(184, 123, 209, 0.15)" }}
          />
        </motion.div>
      </div>

      <motion.div
        style={{ scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch mb-16 md:mb-24">
          {/* Left Card - Enhanced with Scroll Effects */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-full h-auto md:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-purple-400/20 group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />

              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2VvfGVufDB8fDB8fHww"
                alt="Professional instructor at Sabka Skill Academy"
                className="w-full h-full object-cover transition-transform duration-700"
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 bg-gradient-to-t from-black via-black/90 to-transparent"
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance">
                  Why Sabka Skill Academy Stands Out?
                </h3>
              </motion.div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-purple-500/20 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Right Card - Enhanced Stats Banner */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              delay: 0.1,
            }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-full h-[450px] md:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-purple-400/20 group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />

              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                alt="Happy students at Sabka Skill Academy"
                className="w-full h-full object-cover transition-transform duration-700"
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-0 left-0 right-0 py-6 md:py-8 px-4 bg-gradient-to-t from-purple-900/95 via-purple-900/80 to-transparent"
              >
                <div className="text-center text-white">
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none mb-2"
                  >
                    600,000+
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-sm md:text-base font-bold tracking-widest text-purple-200"
                  >
                    HAPPY STUDENTS
                  </motion.p>
                </div>
              </motion.div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-purple-500/20 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section - Enhanced Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance"
            >
              Transforming Education
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Through Innovation
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg text-gray-400 leading-relaxed"
            >
              At Sabka Skill Academy, we believe that education should be
              practical, engaging, and directly applicable to real-world
              challenges. Our platform bridges the gap between theoretical
              knowledge and professional practice.
            </motion.p>

            <div className="space-y-4">
              {[
                {
                  title: "Curriculum Excellence",
                  desc: "Regularly updated courses reflecting current industry demands and best practices.",
                },
                {
                  title: "Career Growth Path",
                  desc: "Structured learning paths designed to accelerate your professional advancement.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="p-5 rounded-xl bg-white/5 border border-purple-400/10 hover:border-purple-400/30 hover:bg-white/10 transition-all backdrop-blur-sm group cursor-pointer"
                >
                  <h4 className="font-bold text-white text-base md:text-lg mb-2 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm md:text-base">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Enhanced Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg text-gray-400 leading-relaxed"
            >
              Our comprehensive approach ensures you gain not just knowledge,
              but the confidence and skills needed to excel in your chosen
              field. Join thousands of successful students.
            </motion.p>

            {/* Enhanced Numbered List */}
            <div className="space-y-4">
              {[
                {
                  num: "1",
                  title: "Expert Instructors:",
                  desc: "Learn from industry veterans with real-world experience and proven track records.",
                },
                {
                  num: "2",
                  title: "Practical Learning:",
                  desc: "Hands-on projects that mirror real-world scenarios and challenges you'll face professionally.",
                },
                {
                  num: "3",
                  title: "Career Support:",
                  desc: "Complete support from resume building to interview prep and job placement assistance.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                  whileHover={{ x: -5 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 bg-gradient-to-br from-purple-600 to-purple-800 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all"
                  >
                    {item.num}
                  </motion.span>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-base md:text-lg mb-1 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ x: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 font-medium transition-all group mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:shadow-lg hover:shadow-purple-500/50"
            >
              Explore all benefits
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative Bottom Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
          className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};
