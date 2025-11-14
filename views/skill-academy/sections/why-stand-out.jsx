"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Zap } from "lucide-react";

export const WhyStandOut = () => {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-20 lg:py-24">
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(128, 55, 145, 0.12)" }}
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            delay: 2,
          }}
          className="absolute bottom-0 right-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(184, 123, 209, 0.12)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch mb-16 md:mb-24">
          {/* Left - Card with Person Image and Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-auto md:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-purple-400/20">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
                alt="Professional instructor at Sabka Skill Academy"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance">
                  Why Sabka Skill Academy Stands Out?
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right - Card with Stats Banner */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative w-full h-[450px] md:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-purple-400/20">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                alt="Happy students at Sabka Skill Academy"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 py-6 md:py-8 px-4 bg-gradient-to-t from-purple-900/95 via-purple-900/80 to-transparent">
                <div className="text-center text-white">
                  <p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none mb-2">
                    600,000+
                  </p>
                  <p className="text-sm md:text-base font-bold tracking-widest text-purple-200">
                    HAPPY STUDENTS
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Content Grid with Detailed Benefits */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
              Transforming Education
              <br />
              Through Innovation
            </h3>

            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              At Sabka Skill Academy, we believe that education should be
              practical, engaging, and directly applicable to real-world
              challenges. Our platform bridges the gap between theoretical
              knowledge and professional practice.
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-white/5 border border-purple-400/10 hover:border-purple-400/30 transition-all backdrop-blur-sm">
                <h4 className="font-bold text-white text-base md:text-lg mb-2">
                  Curriculum Excellence
                </h4>
                <p className="text-gray-400 text-sm md:text-base">
                  Regularly updated courses reflecting current industry demands
                  and best practices.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-purple-400/10 hover:border-purple-400/30 transition-all backdrop-blur-sm">
                <h4 className="font-bold text-white text-base md:text-lg mb-2">
                  Career Growth Path
                </h4>
                <p className="text-gray-400 text-sm md:text-base">
                  Structured learning paths designed to accelerate your
                  professional advancement.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Key Points and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Our comprehensive approach ensures you gain not just knowledge,
              but the confidence and skills needed to excel in your chosen
              field. Join thousands of successful students.
            </p>

            {/* Key Benefits - Numbered List */}
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
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 group">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 bg-gradient-to-br from-purple-600 to-purple-800 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-base md:text-lg mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Read More Button */}
            <motion.button
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 font-medium transition-colors group mt-4 text-purple-400 hover:text-purple-300"
            >
              Explore all benefits
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
