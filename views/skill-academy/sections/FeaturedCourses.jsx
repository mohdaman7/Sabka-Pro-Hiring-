"use client";

import { motion } from "framer-motion";
import {
  Code,
  Palette,
  BarChart3,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  Star,
  Brain,
} from "lucide-react";
import { ParallaxSection } from "../components/ParallaxSection";
import { FloatingElement } from "../components/FloatingElement";

const featuredCoursesData = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Development",
    students: "12.5k",
    rating: 4.9,
    duration: "40 hours",
    price: "Free",
    icon: Code,
    gradient: "from-blue-500 to-purple-600",
    description:
      "Master modern web development with React, Node.js, and MongoDB",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "Data Science & AI",
    category: "Data Science",
    students: "8.3k",
    rating: 4.8,
    duration: "35 hours",
    price: "₹24,999",
    icon: Brain,
    gradient: "from-emerald-500 to-teal-600",
    description: "Learn machine learning, data analysis, and AI fundamentals",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "UI/UX Design Mastery",
    category: "Design",
    students: "6.7k",
    rating: 4.9,
    duration: "30 hours",
    price: "₹16,999",
    icon: Palette,
    gradient: "from-pink-500 to-rose-600",
    description: "Create stunning user interfaces and experiences",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
];

export const FeaturedCourses = () => {
  return (
    <ParallaxSection speed={0.4}>
      <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-purple-950/30 to-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -60, 60, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/12 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.25, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 45, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 80, 0],
              y: [0, 80, -80, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/6 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-[95%] mx-auto px-4 lg:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-purple-500/15 border border-purple-400/30 rounded-full backdrop-blur-xl shadow-lg shadow-purple-500/20">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
              </motion.div>
              <span className="text-sm font-bold text-purple-300 tracking-wide">
                PREMIUM COURSES
              </span>
              <Star className="w-4 h-4 text-purple-400" />
            </motion.div>
            <motion.h2
              className="text-4xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Master Your Craft
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Comprehensive learning paths designed by industry leaders and
              experts. Transform your skills with hands-on projects and
              real-world applications.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCoursesData.map((course, index) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -12 }}
                  className="group relative"
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/25 to-indigo-600/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-purple-500/20 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl shadow-purple-500/20 group-hover:border-purple-500/50 group-hover:shadow-purple-500/30 transition-all duration-500">
                    {/* Course Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Floating Icon */}
                      <FloatingElement delay={index * 0.2} duration={3}>
                        <div
                          className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${course.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </FloatingElement>
                    </div>

                    {/* Course Content */}
                    <div className="relative z-10 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full uppercase tracking-wider border border-purple-400/20">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-lg border border-yellow-400/20">
                          <span className="text-sm font-bold text-yellow-300">
                            ★ {course.rating}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-purple-400" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                          {course.price}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 12 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-lg shadow-purple-500/30 transition-all group-hover:shadow-purple-500/50"
                        >
                          <ArrowRight className="w-5 h-5 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};
