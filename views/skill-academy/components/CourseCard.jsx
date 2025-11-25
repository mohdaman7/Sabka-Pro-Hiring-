"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  Users,
  Clock,
  Sparkles,
  TrendingUp,
  Play,
  ArrowRight,
} from "lucide-react";

/**
 * CourseCard Component
 * Reusable premium course card with hover effects and actions
 */
export default function CourseCard({ course, index, onViewDetails }) {
  const Icon = course.icon;
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(course);
    } else {
      router.push(`/skill-academy/courses/${course.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Premium Glow Effect */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-br from-[#a87bcc]/30 via-[#7e4ba3]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.div
        whileHover={{ y: -12 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative h-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent border border-white/10 group-hover:border-[#a87bcc]/40 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col"
      >
        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ pointerEvents: "none" }}
        />

        {/* Course Image Header */}
        <div className="relative h-44 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#7e4ba3]/30 via-[#a87bcc]/20 to-transparent"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.img
            src={course.image || "/api/placeholder/400/320"}
            alt={course.title}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Premium Floating Icon */}
          <motion.div
            animate={
              isHovered
                ? { y: -8, rotate: 8, scale: 1.1 }
                : { y: [0, -6, 0], rotate: [0, 3, -3, 0] }
            }
            transition={{
              duration: isHovered ? 0.3 : 5,
              repeat: isHovered ? 0 : Infinity,
              delay: index * 0.2,
            }}
            className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-br ${course.gradient} rounded-2xl flex items-center justify-center shadow-2xl border border-white/30 backdrop-blur-sm`}
          >
            <Icon className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>

          {/* Premium Badges */}
          {course.isFree ? (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
              className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm border border-white/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>FREE ACCESS</span>
            </motion.div>
          ) : (
            course.discount && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm border border-white/20"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{course.discount} OFF</span>
              </motion.div>
            )
          )}

          {/* Play Button Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
          </motion.div>
        </div>

        {/* Course Content */}
        <div className="relative p-5 flex flex-col flex-grow">
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between mb-3">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 bg-gradient-to-r from-[#7e4ba3]/20 to-[#a87bcc]/10 text-[#c99ee6] text-xs font-bold rounded-full border border-[#a87bcc]/30 backdrop-blur-sm shadow-sm"
            >
              {course.category}
            </motion.span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-white">
                {course.rating || 4.8}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#d8b4f0] transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-300 mb-4 line-clamp-2 flex-grow">
            {course.description}
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.students || "1.2K"} students</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration || "8 weeks"}</span>
            </div>
          </div>

          {/* Price & Button Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              {course.isFree ? (
                <span className="text-lg font-bold text-emerald-400">FREE</span>
              ) : (
                <>
                  <span className="text-lg font-bold text-white">
                    {course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      {course.originalPrice}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Action Button - View Course */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm
                transition-all duration-300
                bg-gradient-to-r from-[#a87bcc] to-[#7e4ba3] text-white border border-[#d8b4f0]/30 hover:shadow-lg hover:shadow-[#a87bcc]/50
              `}
            >
              <span>View Course</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
