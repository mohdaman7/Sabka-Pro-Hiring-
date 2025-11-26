"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  Star,
  Users,
  ArrowRight,
  CheckCircle2,
  Zap,
  PlayCircle,
} from "lucide-react";
import { useRef } from "react";

const course = {
  id: 1,
  title: "STEP - Systematic Training For Employment & Professionalism",
  category: "Professional Development",
  students: "12.5k+",
  rating: 4.9,
  image: "/step-course.jpg",
  badge: "Bestseller",
  description:
    "Master professional skills through systematic training. Gain practical knowledge and launch your career with confidence.",
  highlights: [
    "Expert Trainers",
    "Industry-Recognized Certification",
    "Professional Certificate",
  ],
};

export const FeaturedCourses = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);

  // Scroll Progress for Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked transformations
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  // Mouse position state for 3D effect
  const mouseXVal = useMotionValue(0);
  const mouseYVal = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseX = useSpring(mouseXVal, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(mouseYVal, { stiffness: 150, damping: 15 });

  // Transform values for 3D rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Parallax transforms for inner elements
  const imageX = useTransform(mouseX, [-0.5, 0.5], ["-10px", "10px"]);
  const imageY = useTransform(mouseY, [-0.5, 0.5], ["-10px", "10px"]);

  const contentX = useTransform(mouseX, [-0.5, 0.5], ["-5px", "5px"]);
  const contentY = useTransform(mouseY, [-0.5, 0.5], ["-5px", "5px"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    mouseXVal.set(mouseXFromCenter / width);
    mouseYVal.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    mouseXVal.set(0);
    mouseYVal.set(0);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-12 md:py-16 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#692c7a]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#9463a8]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{
            opacity,
            y: useTransform(scrollYProgress, [0, 1], [50, -50]),
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Featured <span className="text-[#b893d1]">Masterclass</span>
          </h2>
        </motion.div>

        <div className="perspective-1000">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, rotateX: 20, y: 100 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              y: useTransform(scrollYProgress, [0, 1], [0, -50]), // Subtle lift on scroll
            }}
            className="relative w-full"
          >
            {/* Main Card Container */}
            <div className="relative bg-gradient-to-br from-[#1a0f2e]/90 via-[#0a0a0a]/95 to-[#0f0820]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl shadow-[#692c7a]/30 group hover:shadow-[#692c7a]/50 transition-all duration-500">
              {/* Animated Gradient Border Glow */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-[#9463a8]/30 via-transparent to-[#692c7a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Enhanced Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#692c7a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="grid lg:grid-cols-5 gap-0 min-h-[500px]">
                {/* Image Section (3 cols) */}
                <div className="relative lg:col-span-3 overflow-hidden h-[300px] lg:h-auto">
                  <motion.div
                    style={{ x: imageX, y: imageY, scale: 1.1 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent z-10 lg:bg-gradient-to-l" />
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Floating Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-125 group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <PlayCircle className="w-8 h-8 text-white fill-white/40 group-hover:fill-white/60 transition-all" />
                    </motion.div>
                  </div>

                  {/* Badge */}
                  <motion.div
                    style={{ x: contentX, y: contentY, z: 30 }}
                    className="absolute top-6 left-6 z-20"
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#692c7a] rounded-full shadow-lg">
                      <Zap className="w-3 h-3 text-white fill-white" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {course.badge}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section (2 cols) */}
                <div className="relative lg:col-span-2 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-b from-white/5 to-transparent border-t lg:border-t-0 lg:border-l border-white/5">
                  <motion.div style={{ x: contentX, y: contentY, z: 20 }}>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-bold">
                        {course.rating}
                      </span>
                      <span className="text-gray-500 text-sm">/ 5.0</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                      {course.title}
                    </h3>

                    <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">
                      {course.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {course.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                          className="flex items-center gap-3 group/highlight"
                        >
                          <div className="relative">
                            <CheckCircle2 className="w-5 h-5 text-[#b893d1] group-hover/highlight:scale-110 transition-transform" />
                          </div>
                          <span className="text-sm text-gray-300 group-hover/highlight:text-white transition-colors">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#9463a8]" />
                        <span className="text-sm text-gray-400">
                          {course.students} Enrolled
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-gray-100 text-black rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:shadow-white/20 transition-all duration-300"
                      >
                        <span>View Course</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.div>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
