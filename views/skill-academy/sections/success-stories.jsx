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
      className="relative w-full overflow-hidden py-12 md:py-20 lg:py-24 text-white"
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
          className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-24 max-w-3xl mx-auto"
        >
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-sm font-medium rounded-full bg-pink-500/20 text-pink-200 hover:bg-pink-500/30 border-pink-500/30"
          >
            Success Stories
          </Badge>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight text-balance"
          >
            Student Success Stories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl"
          >
            Real transformations from students who mastered their skills and
            achieved their goals
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
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
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.03, translateY: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="relative h-full bg-white/5 backdrop-blur-sm border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 hover:bg-white/10 group overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <CardHeader className="relative z-10 space-y-4 h-full flex flex-col">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + star * 0.05 }}
                        >
                          <Star className="w-4 h-4 fill-pink-400 text-pink-400" />
                        </motion.div>
                      ))}
                    </div>

                    <Quote className="w-5 h-5 text-pink-400/50" />

                    <p className="text-white/90 leading-relaxed text-sm md:text-base flex-1">
                      "{story.content}"
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-purple-400/20">
                      <Avatar className="w-10 h-10 border border-pink-500/30 ring-2 ring-pink-500/20 flex-shrink-0">
                        <AvatarImage
                          src={story.image || "/placeholder.svg"}
                          alt={story.name}
                        />
                        <AvatarFallback className="bg-pink-500/20 text-pink-200 text-xs font-semibold">
                          {story.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">
                          {story.name}
                        </p>
                        <p className="text-xs text-white/60">{story.role}</p>
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
