"use client";

import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { Zap } from "lucide-react";

/**
 * CourseGrid Component
 * Reusable grid layout for displaying courses
 */
export default function CourseGrid({
  courses,
  onAddToCart,
  onViewDetails,
  cartItems = [],
  isLoading = false,
  emptyMessage = "No courses found",
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-96 bg-white/5 border border-white/10 rounded-3xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <Zap className="w-16 h-16 text-[#a87bcc]/50 mb-4" />
        <p className="text-xl text-gray-400">{emptyMessage}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {courses.map((course, index) => (
        <CourseCard
          key={course.id || index}
          course={course}
          index={index}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isInCart={cartItems.some((item) => item.id === course.id)}
        />
      ))}
    </motion.div>
  );
}
