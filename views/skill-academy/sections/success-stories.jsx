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
              bgImage:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
              initials: "SC",
            },
            {
              name: "Marcus Johnson",
              role: "Product Designer",
              content:
                "The design curriculum is exceptional. I built a portfolio that impressed every company I interviewed with.",
              image: "/thoughtful-artist.png",
              bgImage:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
              initials: "MJ",
            },
            {
              name: "Elena Rodriguez",
              role: "Data Scientist",
              content:
                "Hands-on projects made the difference. I learned real-world skills, not just theory. Highly recommend!",
              image: "/professional-working-on-laptop-in-modern-office.jpg",
              bgImage:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
              initials: "ER",
            },
            {
              name: "David Kim",
              role: "Frontend Developer",
              content:
                "Started with zero coding experience. The structured curriculum and support helped me land my first developer job.",
              image: "/diverse-person-portrait.png",
              bgImage:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
              initials: "DK",
            },
            {
              name: "Priya Patel",
              role: "Full Stack Developer",
              content:
                "The mentors here genuinely care about your success. I got personalized guidance that accelerated my learning.",
              image: "/thoughtful-artist.png",
              bgImage:
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
              initials: "PP",
            },
            {
              name: "James Wilson",
              role: "UX/UI Designer",
              content:
                "Best investment I made for my career. The community and peer learning were as valuable as the curriculum.",
              image: "/professional-working-on-laptop-in-modern-office.jpg",
              bgImage:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
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
                whileHover={{ scale: 1.03, translateY: -12 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="relative h-full bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] border-2 border-white/20 hover:border-pink-300/60 transition-all duration-700 group overflow-hidden shadow-[0_20px_60px_-15px_rgba(168,85,247,0.4)] hover:shadow-[0_30px_90px_-20px_rgba(236,72,153,0.6)]">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-[0.15] transition-opacity duration-700 z-0"
                    style={{
                      backgroundImage: `url(${story.bgImage})`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-violet-900/60 backdrop-blur-sm z-[1]" />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/10 to-transparent opacity-0 group-hover:opacity-100 z-[2]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[2]" />

                  <div className="absolute inset-[1px] rounded-[calc(0.5rem-1px)] bg-gradient-to-br from-white/5 to-transparent opacity-50 z-[2]" />

                  <CardHeader className="relative z-[3] space-y-6 p-7 md:p-8 h-full flex flex-col">
                    <div className="flex gap-2 items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.15 + star * 0.05,
                            type: "spring",
                            stiffness: 300,
                          }}
                          whileHover={{ scale: 1.3, rotate: 15 }}
                        >
                          <Star className="w-5 h-5 fill-gradient-to-br from-pink-400 to-pink-500 text-pink-400 drop-shadow-[0_2px_8px_rgba(244,114,182,0.5)] filter" />
                        </motion.div>
                      ))}
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm font-semibold text-pink-300/90 ml-2 tracking-wider"
                      >
                        5.0
                      </motion.span>
                    </div>

                    <div className="relative flex-1">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute -top-3 -left-3"
                      >
                        <Quote className="w-12 h-12 text-pink-400/20 drop-shadow-lg" />
                      </motion.div>
                      <p className="text-white/95 leading-[1.75] text-base md:text-[17px] pl-8 font-normal tracking-wide relative">
                        <span className="bg-gradient-to-br from-white via-white to-gray-200 bg-clip-text text-transparent">
                          {story.content}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 mt-auto border-t-2 border-white/10 group-hover:border-gradient-to-r group-hover:from-pink-400/30 group-hover:to-purple-400/30 transition-all duration-700">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Avatar className="w-14 h-14 border-3 border-pink-400/40 ring-4 ring-pink-500/15 flex-shrink-0 shadow-[0_8px_30px_rgba(236,72,153,0.35)] group-hover:shadow-[0_12px_40px_rgba(236,72,153,0.5)] transition-shadow duration-500">
                          <AvatarImage
                            src={story.image || "/placeholder.svg"}
                            alt={story.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-pink-500/40 to-purple-500/40 text-white text-base font-bold backdrop-blur-sm">
                            {story.initials}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[16px] font-bold text-white tracking-wide mb-0.5 bg-gradient-to-r from-white to-gray-100 bg-clip-text">
                          {story.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-200/90 border border-pink-400/30 text-xs font-medium px-2.5 py-0.5 hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300"
                        >
                          {story.role}
                        </Badge>
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
