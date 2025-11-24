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
  title: "Full Stack Web Development",
  category: "Development",
  students: "12.5k+",
  rating: 4.9,
  image:
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  badge: "Bestseller",
  description:
    "Master modern web development. Build real-world projects and launch your career.",
  highlights: ["industry experts", "Job Assistance", "Certificate"],
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
      className="relative py-24 md:py-28 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#692c7a]/10 rounded-full blur-[120px]"
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
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl shadow-[#692c7a]/20 group">
              {/* Gradient Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#9463a8]/20 via-transparent to-[#692c7a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <PlayCircle className="w-8 h-8 text-white fill-white/20" />
                    </div>
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
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#b893d1]" />
                          <span className="text-sm text-gray-300">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#9463a8]" />
                        <span className="text-sm text-gray-400">
                          {course.students} Enrolled
                        </span>
                      </div>
                      <button className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-[#d8b4f0] transition-colors duration-300">
                        <span>View Course</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
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
