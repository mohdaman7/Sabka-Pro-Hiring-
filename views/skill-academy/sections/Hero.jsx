"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.z = Math.random() * 1500;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.z -= this.speed;
        if (this.z <= 0) this.reset();
      }

      draw() {
        const x = (this.x - w / 2) * (1000 / this.z) + w / 2;
        const y = (this.y - h / 2) * (1000 / this.z) + h / 2;
        const s = this.size * (1000 / this.z);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, s);
        gradient.addColorStop(0, `rgba(168, 85, 247, ${0.8 / (this.z / 100)})`);
        gradient.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;
    const animate = () => {
      ctx.fillStyle = "rgba(6, 8, 25, 0.15)";
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const stats = [
    { icon: Users, value: "10K+", label: "Active Students" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: TrendingUp, value: "500+", label: "Companies Hiring" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#060819] via-[#0a0d2c] to-[#0f1235]"
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[90px]"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-200">
                    Trusted by 10,000+ Students
                  </span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-white">Transform Your</span>
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                      Career Path
                    </span>
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl"
              >
                Master cutting-edge skills in{" "}
                <span className="text-purple-400 font-semibold">
                  English Training
                </span>
                ,{" "}
                <span className="text-pink-400 font-semibold">
                  Data Analytics
                </span>
                , and{" "}
                <span className="text-blue-400 font-semibold">
                  Web Development
                </span>
                . Join thousands who've transformed their careers with Sabka
                Skill Academy.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-semibold overflow-hidden shadow-lg shadow-purple-500/30"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Learning Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-8 pt-4"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <stat.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - 3D Card Stack */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative perspective-1000"
            >
              <div className="relative w-full aspect-[4/3]">
                {/* Card 1 - Back */}
                <motion.div
                  animate={{
                    rotateY: [0, 5, 0],
                    rotateX: [0, -3, 0],
                    z: [0, 20, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/30 to-pink-600/20 backdrop-blur-2xl border border-white/10 shadow-2xl transform translate-x-8 translate-y-8 rotate-3"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
                </motion.div>

                {/* Card 2 - Middle */}
                <motion.div
                  animate={{
                    rotateY: [0, -3, 0],
                    rotateX: [0, 2, 0],
                    z: [0, 40, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/30 to-purple-600/20 backdrop-blur-2xl border border-white/10 shadow-2xl transform translate-x-4 translate-y-4 rotate-2"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
                </motion.div>

                {/* Card 3 - Front (Main) */}
                <motion.div
                  animate={{
                    rotateY: [0, 2, 0],
                    rotateX: [0, -2, 0],
                    z: [0, 60, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/40 to-pink-500/30 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  <div className="relative h-full p-8 flex flex-col justify-between">
                    {/* Top Section */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                          <Sparkles className="w-6 h-6 text-yellow-300" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-xl">
                            Premium Learning
                          </h3>
                          <p className="text-purple-200 text-sm">
                            Experience Excellence
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section - Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-3xl font-bold text-white mb-1">
                          50+
                        </div>
                        <div className="text-sm text-purple-200">
                          Expert Courses
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-3xl font-bold text-white mb-1">
                          24/7
                        </div>
                        <div className="text-sm text-purple-200">Support</div>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <span className="text-white font-semibold">
                        Start Your Journey
                      </span>
                      <ArrowRight className="w-5 h-5 text-purple-300" />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -right-6 p-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-500/30 shadow-xl"
                >
                  <Award className="w-8 h-8 text-yellow-300" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 shadow-xl"
                >
                  <TrendingUp className="w-8 h-8 text-green-300" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f1235] to-transparent pointer-events-none" />
    </section>
  );
};
