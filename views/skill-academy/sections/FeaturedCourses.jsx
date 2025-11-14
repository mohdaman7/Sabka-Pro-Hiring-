"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Users, Clock, ArrowRight, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "Full Stack Development",
    category: "Development",
    students: "12.5k",
    rating: 4.9,
    duration: "40 hours",
    price: "Free",
    originalPrice: null,
    discount: null,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Popular",
    isFree: true,
  },
  {
    id: 2,
    title: "Data Science & AI",
    category: "AI/ML",
    students: "8.3k",
    rating: 4.8,
    duration: "35 hours",
    price: "₹24,999",
    originalPrice: "₹34,999",
    discount: "28%",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Best Seller",
    isFree: false,
  },
  {
    id: 3,
    title: "UI/UX Design",
    category: "Design",
    students: "6.7k",
    rating: 4.9,
    duration: "30 hours",
    price: "₹16,999",
    originalPrice: null,
    discount: null,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Trending",
    isFree: false,
  },
];

const PricingSection = ({ course }) => {
  if (course.isFree) {
    return (
      <div className="flex items-center justify-between pt-6 border-t border-purple-500/30">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-green-400" />
          <span className="text-2xl font-bold text-green-400">
            {course.price}
          </span>
        </div>
        <span className="text-xs font-bold text-green-300 bg-green-500/20 px-3 py-1 rounded-full">
          COMPLIMENTARY
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between pt-6 border-t border-purple-500/30">
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-bold text-white">{course.price}</span>
        {course.originalPrice && (
          <span className="text-sm text-gray-400 line-through">
            {course.originalPrice}
          </span>
        )}
      </div>
      {course.discount && (
        <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1.5 rounded-lg">
          <TrendingUp className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-orange-400">
            Save {course.discount}
          </span>
        </div>
      )}
    </div>
  );
};

export const FeaturedCourses = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">
              FEATURED COLLECTION
            </span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Premium Courses{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Curated for You
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master in-demand skills with industry experts. Start for free or
            unlock premium courses with lifetime access.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -16, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              <div className="relative h-full bg-gradient-to-b from-white/8 to-white/5 border border-white/10 group-hover:border-purple-500/50 rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-xl shadow-2xl">
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-600/30 to-purple-500/20">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2 rounded-full shadow-lg"
                  >
                    {course.isFree ? (
                      <>
                        <Zap className="w-4 h-4" />
                        <span className="text-xs font-bold text-white">
                          {course.badge}
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-bold text-white">
                          {course.badge}
                        </span>
                      </>
                    )}
                  </motion.div>

                  <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur px-3 py-2 rounded-lg border border-white/10">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-white">
                      {course.rating}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-full border border-purple-500/30">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-8 pb-8 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="font-medium">{course.students}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="font-medium">{course.duration}</span>
                    </div>
                  </div>

                  <PricingSection course={course} />

                  <Link
                    href={`/skill-academy/courses/${course.id}`}
                    className="mt-6 block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-purple-500/20"
                    >
                      <span>Explore Course</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <Link href="/skill-academy/courses">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-2 border-purple-500/50 hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
