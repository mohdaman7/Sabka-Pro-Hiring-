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
import { useState } from "react";

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
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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

// Double the array for seamless loop
const duplicatedCourses = [...courses, ...courses];

export const FeaturedCourses = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative py-16 md:py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-full mx-auto">
        {/* Header */}
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

        {/* Infinite Scrolling Container */}
        <div
          className="relative overflow-hidden py-6 md:py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 bg-gradient-to-r from-[#060819] via-[#060819] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 bg-gradient-to-l from-[#060819] via-[#060819] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Animation using Framer Motion */}
          <motion.div
            className="flex gap-4 md:gap-6 lg:gap-8"
            animate={{
              x: isPaused ? undefined : [0, -1 * (courses.length * (380 + 32))],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
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
                  {/* Hover Glow */}
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

                  {/* Card */}
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
                    {/* Image Section */}
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

                      {/* Badge */}
                      <div
                        className={`absolute top-2 left-2 md:top-3 md:left-3 flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-gradient-to-r ${course.color} shadow-lg`}
                      >
                        <Icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        <span className="text-[10px] md:text-xs font-bold text-white">
                          {course.badge}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg border border-white/10">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs md:text-sm font-bold text-white">
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
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

                      {/* Stats */}
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

                      {/* Highlights */}
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

                      {/* CTA Button */}
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

        {/* Hint Text */}
        <div className="text-center mt-6 md:mt-8 px-4">
          <span className="text-xs md:text-sm text-purple-300/80 bg-purple-500/5 px-4 py-2 rounded-full border border-purple-500/20">
            {isPaused
              ? "Paused - Keep exploring"
              : "Hover or tap to pause • Auto-scrolling"}
          </span>
        </div>

        {/* Bottom CTA */}
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
