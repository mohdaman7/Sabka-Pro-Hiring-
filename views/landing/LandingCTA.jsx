"use client";

import { ArrowRight, CheckCircle2, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Gradient orbs (subtle) */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "rgba(128,55,145,0.06)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "rgba(184,123,209,0.04)" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{
              background: "rgba(255,255,255,0.06)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <Zap className="w-4 h-4" style={{ color: "#b87bd1" }} />
            <span className="text-sm font-medium text-white">
              Start Your Journey Today
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance leading-tight"
          >
            Ready to Transform Your Career?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-12 text-pretty max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of professionals and employers who trust Sabka Pro
            HIRING for their recruitment needs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href="/register?type=candidate"
              className="group relative px-8 py-4 rounded-lg transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 min-w-[260px] overflow-hidden"
              style={{
                background: "linear-gradient(90deg,#803791,#b87bd1)",
                color: "white",
              }}
            >
              <span className="relative z-10">Get Started as Candidate</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/register?type=employer"
              className="group relative px-8 py-4 bg-transparent border-2 text-white rounded-lg transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/10 hover:-translate-y-0.5 min-w-[260px] backdrop-blur-sm"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
            >
              <span>Post Jobs as Employer</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Trust indicators - Professional stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">10,000+</div>
              <div className="text-sm text-white/70">Success Stories</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">Verified</div>
              <div className="text-sm text-white/70">Trusted Platform</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">Fast</div>
              <div className="text-sm text-white/70">Quick Placements</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
