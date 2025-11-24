"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Quote, Star, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";

const stories = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer at Google",
    content:
      "This program completely transformed my career. The practical projects and mentorship gave me the confidence to grow from a junior role to a senior position in just 2 years.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    initials: "SC",
    company: "Google",
    impact: "+140% Salary Hike",
  },
  {
    name: "Marcus Johnson",
    role: "Product Designer at Airbnb",
    content:
      "The design curriculum is exceptional. I built a portfolio that impressed every company I interviewed with. The focus on real-world problem solving is unmatched.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    initials: "MJ",
    company: "Airbnb",
    impact: "Landed Dream Job",
  },
  {
    name: "Elena Rodriguez",
    role: "Data Scientist at Netflix",
    content:
      "Hands-on projects made the difference. I learned real-world skills, not just theory. The capstone project directly helped me secure my role at Netflix.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    initials: "ER",
    company: "Netflix",
    impact: "Career Switch",
  },
  {
    name: "David Kim",
    role: "Frontend Dev at Vercel",
    content:
      "Started with zero coding experience. The structured curriculum and support helped me land my first developer job. The community here is incredible.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    initials: "DK",
    company: "Vercel",
    impact: "Zero to Hero",
  },
  {
    name: "Priya Patel",
    role: "Full Stack at Amazon",
    content:
      "The mentors here genuinely care about your success. I got personalized guidance that accelerated my learning. Best investment I've ever made.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    initials: "PP",
    company: "Amazon",
    impact: "Top Performer",
  },
];

function StoryCard({ story, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  console.log(window);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[350px] md:w-[400px] flex-shrink-0 h-full mx-4 perspective-1000"
    >
      <div className="relative h-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent border border-white/10 rounded-3xl p-12 backdrop-blur-xl overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
        {/* Glass Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Quote Icon Background */}
        <div className="absolute -top-6 -right-6 text-purple-500/10 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
          <Quote size={120} />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity" />
                <Avatar className="w-12 h-12 border-2 border-white/20">
                  <AvatarImage
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{story.initials}</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  {story.name}
                </h3>
                <p className="text-purple-200/60 text-xs font-medium">
                  {story.role}
                </p>
              </div>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500"
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <p className="text-gray-300 leading-relaxed text-sm mb-6 flex-grow font-light">
            "{story.content}"
          </p>

          {/* Footer */}
          <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                Impact
              </span>
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {story.impact}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-purple-300 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SuccessStories() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-14 text-center">
        <motion.div style={{ opacity, y }}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {[...stories, ...stories].map((story, i) => (
            <StoryCard key={i} story={story} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
