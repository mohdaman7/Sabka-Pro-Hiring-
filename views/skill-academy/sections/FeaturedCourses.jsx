"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Star = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Development",
    students: "12.5k",
    rating: 4.9,
    duration: "40 hours",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=80",
    badge: "Most Popular",
    color: "from-[#692c7a] to-[#9463a8]",
    highlights: ["Build Real Projects", "Industry Ready", "Job Assistance"],
  },
  {
    id: 2,
    title: "Data Science & AI Mastery",
    category: "AI/ML",
    students: "8.3k",
    rating: 4.8,
    duration: "35 hours",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    badge: "High Demand",
    color: "from-[#9463a8] to-[#692c7a]",
    highlights: ["AI & ML Projects", "Expert Mentors", "Certificate"],
  },
  {
    id: 3,
    title: "UI/UX Design Mastery",
    category: "Design",
    students: "6.7k",
    rating: 4.9,
    duration: "30 hours",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80",
    badge: "Trending Now",
    color: "from-[#b893d1] to-[#9463a8]",
    highlights: ["Portfolio Ready", "Live Projects", "Design Tools"],
  },
  {
    id: 4,
    title: "English Communication Pro",
    category: "Language",
    students: "15.2k",
    rating: 5.0,
    duration: "25 hours",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    badge: "Best Seller",
    color: "from-[#692c7a] to-[#b893d1]",
    highlights: ["Fluent Speaking", "Interview Ready", "Personality Dev"],
  },
  {
    id: 5,
    title: "Digital Marketing Excellence",
    category: "Marketing",
    students: "9.8k",
    rating: 4.7,
    duration: "32 hours",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    badge: "Career Boost",
    color: "from-[#9463a8] to-[#b893d1]",
    highlights: ["SEO & Ads", "Social Media", "Analytics"],
  },
  {
    id: 6,
    title: "Mobile App Development",
    category: "Development",
    students: "7.4k",
    rating: 4.8,
    duration: "38 hours",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    badge: "New Launch",
    color: "from-[#692c7a] to-[#9463a8]",
    highlights: ["iOS & Android", "Real Apps", "Play Store Ready"],
  },
];

export const FeaturedCourses = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const duplicatedCourses = [...courses, ...courses, ...courses];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-12 md:py-20 lg:py-32"
    >
      <div className="absolute inset-0">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: "rgba(105, 44, 122, 0.15)" }}
          />
        </motion.div>
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute bottom-0 right-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: "rgba(184, 123, 209, 0.15)" }}
          />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: "rgba(148, 99, 168, 0.1)" }}
          />
        </motion.div>
      </div>

      <div className="relative max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16 px-4 md:px-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-6 text-balance">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#9463a8] to-[#b893d1] bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
        </motion.div>

        {/* Mobile Version */}
        <div className="md:hidden px-4 pb-8">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[280px] snap-start"
              >
                <div className="relative h-full bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl hover:border-[#9463a8]/60 transition-all duration-300 group">
                  <div className="relative h-44 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div
                      className={`absolute top-3 left-3 px-3 py-1.5 rounded-full bg-gradient-to-r ${course.color} shadow-lg text-xs font-bold text-white`}
                    >
                      {course.badge}
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/20">
                      <Star />
                      <span className="text-xs font-bold text-yellow-400">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-xs font-bold text-[#b893d1] bg-[#692c7a]/20 px-2.5 py-1 rounded-full border border-[#9463a8]/30">
                      {course.category}
                    </span>
                    <h3 className="text-lg font-bold my-3 text-white leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 pb-3 border-b border-white/10">
                      <span>👥 {course.students}</span>
                      <span>⏱️ {course.duration}</span>
                    </div>
                    <div className="space-y-1.5 mb-4">
                      {course.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-gray-300"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${course.color}`}
                          />
                          {h}
                        </div>
                      ))}
                    </div>
                    <button
                      className={`w-full py-2.5 bg-gradient-to-r ${course.color} text-white font-bold rounded-xl text-sm hover:shadow-lg transition-shadow`}
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {courses.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#692c7a]/40" />
            ))}
          </div>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative overflow-hidden py-8">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1a0d2e] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1a0d2e] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-8"
            animate={{ x: [0, -courses.length * 412] }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {duplicatedCourses.map((course, idx) => {
              const key = `${course.id}-${idx}`;
              const isHovered = hoveredCard === key;

              return (
                <motion.div
                  key={key}
                  className="flex-shrink-0 w-[380px]"
                  onMouseEnter={() => setHoveredCard(key)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#9463a8]/30 to-[#692c7a]/20 rounded-3xl blur-xl"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                  />

                  <div className="relative h-full bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-[#9463a8]/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300 group">
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div
                        className={`absolute top-3 left-3 px-3 py-1.5 rounded-full bg-gradient-to-r ${course.color} shadow-lg text-xs font-bold text-white`}
                      >
                        {course.badge}
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1.5 rounded-lg">
                        <Star />
                        <span className="text-sm font-bold text-yellow-400">
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-xs font-bold text-[#b893d1] bg-[#692c7a]/20 px-2.5 py-1 rounded-full border border-[#9463a8]/30">
                        {course.category}
                      </span>
                      <h3 className="text-2xl font-bold my-4 text-white hover:text-[#c99ee6] transition-colors">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-6 text-sm text-gray-400 mb-4 pb-4 border-b border-white/10">
                        <span>👥 {course.students}</span>
                        <span>⏱️ {course.duration}</span>
                      </div>
                      <div className="space-y-2 mb-5">
                        {course.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-300"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${course.color}`}
                            />
                            {h}
                          </div>
                        ))}
                      </div>
                      <button
                        className={`w-full py-3 bg-gradient-to-r ${course.color} text-white font-bold rounded-xl hover:shadow-xl transition-shadow`}
                      >
                        Learn More →
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-16 text-center px-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#692c7a]/10 to-[#9463a8]/10 border-2 border-[#692c7a]/50 hover:border-[#9463a8] text-white font-semibold rounded-xl transition-all hover:shadow-lg"
          >
            View All Courses →
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
