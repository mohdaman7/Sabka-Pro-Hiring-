"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

export const Hero = () => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = isMobile ? 500 : 700;

    let animationId;
    let time = 0;

    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(
        0,
        `rgba(15, 8, 32, ${0.5 + Math.sin(time * 0.0001) * 0.1})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(40, 10, 80, ${0.3 + Math.cos(time * 0.00015) * 0.08})`
      );
      gradient.addColorStop(
        1,
        `rgba(20, 5, 60, ${0.4 + Math.sin(time * 0.0001) * 0.1})`
      );
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = `rgba(147, 51, 234, ${
        0.04 + Math.sin(time * 0.0002) * 0.02
      })`;
      ctx.lineWidth = 1;
      const gridSize = 200;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const wave = Math.sin(time * 0.0002 + (x + y) * 0.005) * 8;
          ctx.beginPath();
          ctx.rect(
            x + wave,
            y + wave,
            gridSize - wave * 2,
            gridSize - wave * 2
          );
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(168, 85, 247, ${
        0.25 + Math.sin(time * 0.004) * 0.15
      })`;
      for (let i = 0; i < 20; i++) {
        const x =
          (Math.sin(time * 0.0003 + i * 0.5) + 1) * (canvas.width / 2) +
          Math.cos(time * 0.0005 + i) * 100;
        const y =
          (Math.cos(time * 0.0002 + i * 0.3) + 1) * (canvas.height / 2) +
          Math.sin(time * 0.0004 + i) * 80;
        const size = 0.8 + Math.sin(time * 0.007 + i) * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <section className="relative w-full overflow-hidden pt-8 md:pt-16 lg:pt-20 pb-16 md:pb-24 lg:pb-32">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full opacity-100"
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-600/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-1/4 right-0 w-56 md:w-80 h-56 md:h-80 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center min-h-96">
            {/* Left Content */}
            <div className="text-left flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 lg:mb-10 leading-tight text-white text-balance"
                >
                  Transforming Skills,
                  <br />
                  <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Building Futures
                  </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 md:mb-8 lg:mb-10 leading-relaxed max-w-lg text-balance"
                >
                  Sabka Skill Academy is your gateway to professional
                  excellence. Master in-demand skills across English Training,
                  Data Analytics, Web Development, and more. Learn from industry
                  experts and transform your career.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 md:gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg md:rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-sm md:text-base"
                  >
                    Explore Courses
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 md:px-8 py-2.5 md:py-4 border border-purple-400/40 rounded-lg md:rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 hover:border-purple-300/60 transition-all text-sm md:text-base backdrop-blur-md"
                  >
                    <Play className="w-4 h-4 md:w-5 md:h-5" /> View Demo
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Stats Banner */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative w-full flex flex-col gap-4 md:gap-6"
            >
              {/* Top image placeholder */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-purple-400/30 bg-gradient-to-br from-purple-600/20 to-pink-600/10 backdrop-blur-xl shadow-2xl shadow-purple-500/20 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/8 via-transparent to-transparent" />
                <div className="relative z-10 text-center">
                  <div className="text-5xl md:text-6xl mb-2">🎓</div>
                  <p className="text-white font-semibold text-sm md:text-base">
                    Student Success Gallery
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
