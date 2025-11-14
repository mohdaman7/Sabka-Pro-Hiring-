"use client";

import { motion } from "framer-motion";
import {
  Star,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useState, useRef } from "react";

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Development",
    students: "12.5k",
    rating: 4.9,
    duration: "40 hours",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Most Popular",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
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
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "High Demand",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
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
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Trending Now",
    icon: Award,
    color: "from-orange-500 to-red-500",
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG3uKFZMth1X2FJqOTQOth7qPq7iJZ5QIhnQ&s",
    badge: "Best Seller",
    icon: Sparkles,
    color: "from-green-500 to-emerald-500",
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
      "data:image/jpeg;base64,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",
    badge: "Career Boost",
    icon: TrendingUp,
    color: "from-pink-500 to-purple-500",
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
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "New Launch",
    icon: Zap,
    color: "from-cyan-500 to-blue-500",
    highlights: ["iOS & Android", "Real Apps", "Play Store Ready"],
  },
];

const duplicatedCourses = [...courses, ...courses];
const cardWidth = 380 + 32; // card width + gap

export const FeaturedCourses = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [isManuallyDragging, setIsManuallyDragging] = useState(false);
  const containerRef = useRef(null);

  return (
    <section className="relative py-16 md:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 px-4 md:px-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6">
            Premium Courses{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Curated for You
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master in-demand skills with industry experts. Join thousands of
            successful students transforming their careers.
          </p>
        </motion.div>

        <div
          className="relative overflow-hidden py-6 md:py-8 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => !isManuallyDragging && setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => !isManuallyDragging && setIsPaused(false)}
          ref={containerRef}
        >
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 bg-gradient-to-r from-[#060819] via-[#060819] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 bg-gradient-to-l from-[#060819] via-[#060819] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-4 md:gap-6 lg:gap-8"
            animate={{
              x: isPaused ? dragX : dragX - courses.length * cardWidth,
            }}
            transition={{
              x: isManuallyDragging
                ? { type: "spring", stiffness: 400, damping: 60, mass: 0.5 }
                : isPaused
                ? { type: "spring", stiffness: 300, damping: 30 }
                : {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
            }}
            drag="x"
            dragElastic={0.15}
            dragMomentum={true}
            dragTransition={{ power: 0.2, timeConstant: 200 }}
            onDrag={(e, info) => {
              setDragX(info.offset.x);
              setIsManuallyDragging(true);
            }}
            onDragEnd={(e, info) => {
              const swipeThreshold = 50;
              const velocityFactor = 0.05;

              if (Math.abs(info.velocity.x) > swipeThreshold) {
                setDragX(dragX + info.velocity.x * velocityFactor);
              } else {
                setDragX(info.offset.x);
              }

              setIsManuallyDragging(false);
              setTimeout(() => setIsPaused(false), 1500);
            }}
          >
            {duplicatedCourses.map((course, index) => {
              const Icon = course.icon;
              const cardKey = `${course.id}-${index}`;
              const isHovered = hoveredCard === cardKey;

              return (
                <motion.div
                  key={cardKey}
                  className="group relative flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px]"
                  onMouseEnter={() => setHoveredCard(cardKey)}
                  onMouseLeave={() => setHoveredCard(null)}
                  animate={{
                    scale: isHovered ? 1.03 : 1,
                    z: isHovered ? 50 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.5,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-2xl md:rounded-3xl blur-xl"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="relative h-full bg-gradient-to-b from-white/8 to-white/5 border rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl"
                    animate={{
                      borderColor: isHovered
                        ? "rgba(168, 85, 247, 0.5)"
                        : "rgba(255, 255, 255, 0.1)",
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="relative h-40 sm:h-44 md:h-52 lg:h-56 overflow-hidden">
                      <motion.img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        animate={{
                          scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          mass: 0.5,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                      <div
                        className={`absolute top-2 left-2 md:top-3 md:left-3 flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-gradient-to-r ${course.color} shadow-lg`}
                      >
                        <Icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        <span className="text-[10px] md:text-xs font-bold text-white">
                          {course.badge}
                        </span>
                      </div>

                      <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg border border-white/10">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs md:text-sm font-bold text-white">
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                      <div className="mb-2 md:mb-3">
                        <span className="text-[10px] md:text-xs font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border border-purple-500/30">
                          {course.category}
                        </span>
                      </div>

                      <motion.h3
                        className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4 leading-tight line-clamp-2"
                        animate={{
                          color: isHovered ? "#d8b4fe" : "#ffffff",
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                      >
                        {course.title}
                      </motion.h3>

                      <div className="flex items-center gap-3 md:gap-4 lg:gap-6 text-sm text-gray-400 mb-2 md:mb-3 lg:mb-4 pb-2 md:pb-3 lg:pb-4 border-b border-white/10">
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <Users className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-purple-400" />
                          <span className="text-[10px] sm:text-xs md:text-sm font-medium">
                            {course.students}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-purple-400" />
                          <span className="text-[10px] sm:text-xs md:text-sm font-medium">
                            {course.duration}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 md:space-y-1.5 lg:space-y-2 mb-3 md:mb-4 lg:mb-5">
                        {course.highlights.map((highlight, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 md:gap-2"
                          >
                            <div
                              className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gradient-to-r ${course.color}`}
                            />
                            <span className="text-[10px] sm:text-xs md:text-sm text-gray-300">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        className={`w-full py-2 md:py-2.5 lg:py-3 px-3 md:px-4 bg-gradient-to-r ${course.color} text-white font-bold rounded-lg md:rounded-xl flex items-center justify-center gap-1.5 md:gap-2 group/btn shadow-lg text-xs sm:text-sm md:text-base`}
                      >
                        <span>Learn More</span>
                        <motion.div
                          animate={{
                            x: isHovered ? 3 : 0,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                            mass: 0.3,
                          }}
                        >
                          <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
                        </motion.div>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="text-center mt-6 md:mt-8 px-4">
          <span className="text-xs md:text-sm text-purple-300/80 bg-purple-500/5 px-4 py-2 rounded-full border border-purple-500/20">
            {isPaused
              ? "Dragging - Swipe to control"
              : "Hover, tap, or drag to control • Auto-scrolling"}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 text-center px-4 md:px-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-2 border-purple-500/50 hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 text-white font-semibold rounded-xl md:rounded-2xl transition-all duration-300 shadow-xl text-sm md:text-base"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
