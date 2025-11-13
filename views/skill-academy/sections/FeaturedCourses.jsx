"use client";

import { motion } from "framer-motion";
import { Star, Users, Clock, Code, Brain, Palette, ArrowRight } from "lucide-react";
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
      <section className="py-20 lg:py-32">
        <div className="max-w-[95%] mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start your learning journey with our most popular courses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCoursesData.map((course, index) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white/5 border-2 border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500 hover:bg-white/10 transition-all duration-300 shadow-xl"
                >
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
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      <span className="text-sm font-bold text-yellow-400">
                        ★ {course.rating}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{course.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">
                        {course.price}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg transition-all"
                      >
                        <ArrowRight className="w-5 h-5 text-white" />
                      </motion.button>
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
