"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";

export function SuccessStories() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32 text-white"
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
            style={{ backgroundColor: "rgba(128, 55, 145, 0.15)" }}
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-6 mb-20 md:mb-28 max-w-3xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-300 bg-clip-text text-transparent leading-tight text-balance"
          >
            Student Success Stories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg text-gray-300/90 leading-relaxed max-w-2xl font-light"
          >
            Real transformations from students who mastered their skills and
            achieved their goals
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {[
            {
              name: "Sarah Chen",
              role: "Senior Engineer",
              content:
                "This program completely transformed my career. The practical projects and mentorship gave me the confidence to grow from a junior role.",
              image: "/diverse-person-portrait.png",
              initials: "SC",
            },
            {
              name: "Marcus Johnson",
              role: "Product Designer",
              content:
                "The design curriculum is exceptional. I built a portfolio that impressed every company I interviewed with.",
              image: "/thoughtful-artist.png",
              initials: "MJ",
            },
            {
              name: "Elena Rodriguez",
              role: "Data Scientist",
              content:
                "Hands-on projects made the difference. I learned real-world skills, not just theory. Highly recommend!",
              image: "/professional-working-on-laptop-in-modern-office.jpg",
              initials: "ER",
            },
            {
              name: "David Kim",
              role: "Frontend Developer",
              content:
                "Started with zero coding experience. The structured curriculum and support helped me land my first developer job.",
              image: "/diverse-person-portrait.png",
              initials: "DK",
            },
            {
              name: "Priya Patel",
              role: "Full Stack Developer",
              content:
                "The mentors here genuinely care about your success. I got personalized guidance that accelerated my learning.",
              image: "/thoughtful-artist.png",
              initials: "PP",
            },
            {
              name: "James Wilson",
              role: "UX/UI Designer",
              content:
                "Best investment I made for my career. The community and peer learning were as valuable as the curriculum.",
              image: "/professional-working-on-laptop-in-modern-office.jpg",
              initials: "JW",
            },
          ].map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, translateY: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="h-full"
              >
                <Card className="relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-pink-400/40 transition-all duration-500 group overflow-hidden shadow-2xl shadow-purple-900/20 hover:shadow-pink-500/20">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                  <CardHeader className="relative z-10 space-y-5 p-6 md:p-7 h-full flex flex-col">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.15 + star * 0.04,
                            type: "spring",
                          }}
                        >
                          <Star className="w-4 h-4 fill-pink-400 text-pink-400 drop-shadow-sm" />
                        </motion.div>
                      ))}
                    </div>

                    <div className="relative">
                      <Quote className="w-8 h-8 text-pink-400/30 absolute -top-1 -left-1" />
                      <p className="text-white/95 leading-relaxed text-[15px] md:text-base flex-1 pl-6 font-light tracking-wide">
                        {story.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-5 mt-auto border-t border-white/10 group-hover:border-pink-400/20 transition-colors duration-500">
                      <Avatar className="w-12 h-12 border-2 border-pink-500/30 ring-4 ring-pink-500/10 flex-shrink-0 shadow-lg">
                        <AvatarImage
                          src={story.image || "/placeholder.svg"}
                          alt={story.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-pink-500/30 to-purple-500/30 text-pink-100 text-sm font-bold backdrop-blur-sm">
                          {story.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-white tracking-wide">
                          {story.name}
                        </p>
                        <p className="text-sm text-gray-300/70 font-light">
                          {story.role}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
        className="mt-16 md:mt-20 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      />
    </section>
  );
}
