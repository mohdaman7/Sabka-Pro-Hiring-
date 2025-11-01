"use client";

import { ArrowRight, CheckCircle2, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LandingCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
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
        <div className="text-center mb-12 sm:mb-16">
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance leading-tight px-2"
          >
            Ready to Transform Your Career?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 text-pretty max-w-2xl mx-auto leading-relaxed px-4"
          >
            Join thousands of professionals and employers who trust Sabka Pro
            HIRING for their recruitment needs.
          </motion.p>

          {/* CTA Buttons with Premium Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {/* Primary Button with Magnetic Effect */}
            <motion.a
              href="/register?type=candidate"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[260px] overflow-hidden text-sm sm:text-base"
              style={{
                background: "linear-gradient(135deg,#803791,#b87bd1,#803791)",
                backgroundSize: "200% 200%",
                color: "white",
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 60px -15px rgba(168, 85, 247, 0.6)",
                backgroundPosition: "right center"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Magnetic glow effect */}
              {isHovering && (
                <motion.div
                  className="absolute rounded-full bg-white/30 blur-xl"
                  style={{
                    width: 100,
                    height: 100,
                    left: mousePosition.x - 50,
                    top: mousePosition.y - 50,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                />
              )}
              
              <span className="relative z-10">Get Started as Candidate</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </motion.a>
            
            {/* Secondary Button */}
            <motion.a
              href="/register?type=employer"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border-2 border-white/20 text-white rounded-xl font-semibold inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[260px] text-sm sm:text-base"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(168, 85, 247, 0.5)",
                backgroundColor: "rgba(168, 85, 247, 0.1)",
                boxShadow: "0 10px 40px -15px rgba(168, 85, 247, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <span>Post Jobs as Employer</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>

        {/* Trust indicators - Premium stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {[
            { icon: Users, count: "10,000+", label: "Success Stories", color: "cyan", delay: 0.4 },
            { icon: CheckCircle2, count: "Verified", label: "Trusted Platform", color: "green", delay: 0.5 },
            { icon: Zap, count: "Fast", label: "Quick Placements", color: "blue", delay: 0.6 }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ 
                  y: -8,
                  boxShadow: `0 20px 40px -15px rgba(${stat.color === 'cyan' ? '6, 182, 212' : stat.color === 'green' ? '34, 197, 94' : '59, 130, 246'}, 0.4)`
                }}
                className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 cursor-default group"
              >
                <motion.div 
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-${stat.color}-500/20 flex items-center justify-center group-hover:bg-${stat.color}-500/30 transition-colors`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-400`} />
                </motion.div>
                <div className="text-center">
                  <motion.div 
                    className="text-xl sm:text-2xl font-bold text-white mb-1"
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                  >
                    {stat.count}
                  </motion.div>
                  <div className="text-xs sm:text-sm text-white/70 group-hover:text-white/90 transition-colors">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
