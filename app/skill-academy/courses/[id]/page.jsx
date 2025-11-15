"use client";

import { useState } from "react";
import {
  ChevronDown,
  Play,
  Clock,
  Star,
  Lock,
  Award,
  Users,
  BookOpen,
  Share2,
  Heart,
  TrendingUp,
} from "lucide-react";

// Demo Data
const DEMO_COURSE_DATA = {
  _id: "demo-course-1",
  title: "Complete Web Development Bootcamp 2024",
  description:
    "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career as a full-stack developer.",
  category: "Development",
  thumbnail:
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
  instructor: "Sarah Johnson",
  level: "Beginner to Advanced",
  status: "active",
  enrolledCount: 15420,
  rating: 4.8,
  tags: ["Web Development", "React", "Node.js", "JavaScript", "Full Stack"],
  type: "parent",
  pricing: {
    bundlePrice: 24999,
    discountPercent: 40,
    currency: "₹",
  },
};

const DEMO_MODULES = [
  {
    _id: "module-1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development",
    thumbnail:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&q=80",
    lessons: [
      {
        _id: "lesson-1-1",
        title: "Welcome to the Course",
        description: "Course overview and what you'll learn",
        durationSec: 480,
        videoProvider: "youtube",
        isFreePreview: true,
        order: 1,
      },
      {
        _id: "lesson-1-2",
        title: "Setting Up Development Environment",
        description: "Install VS Code, Node.js, and tools",
        durationSec: 720,
        videoProvider: "youtube",
        isFreePreview: true,
        order: 2,
      },
      {
        _id: "lesson-1-3",
        title: "Your First HTML Page",
        durationSec: 900,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 3,
      },
      {
        _id: "lesson-1-4",
        title: "Understanding HTML Structure",
        durationSec: 1080,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 4,
      },
    ],
  },
  {
    _id: "module-2",
    title: "CSS Fundamentals & Styling",
    thumbnail:
      "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=400&q=80",
    lessons: [
      {
        _id: "lesson-2-1",
        title: "Introduction to CSS",
        durationSec: 600,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 1,
      },
      {
        _id: "lesson-2-2",
        title: "Flexbox Layout",
        durationSec: 1200,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 2,
      },
      {
        _id: "lesson-2-3",
        title: "CSS Grid System",
        durationSec: 1320,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 3,
      },
      {
        _id: "lesson-2-4",
        title: "Responsive Design Principles",
        durationSec: 960,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 4,
      },
      {
        _id: "lesson-2-5",
        title: "CSS Animations & Transitions",
        durationSec: 840,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 5,
      },
    ],
  },
  {
    _id: "module-3",
    title: "JavaScript Essentials",
    thumbnail:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&q=80",
    lessons: [
      {
        _id: "lesson-3-1",
        title: "JavaScript Basics",
        durationSec: 900,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 1,
      },
      {
        _id: "lesson-3-2",
        title: "Functions & Scope",
        durationSec: 1080,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 2,
      },
      {
        _id: "lesson-3-3",
        title: "DOM Manipulation",
        durationSec: 1440,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 3,
      },
      {
        _id: "lesson-3-4",
        title: "Asynchronous JavaScript",
        durationSec: 1560,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 4,
      },
    ],
  },
  {
    _id: "module-4",
    title: "React - Modern Frontend",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    lessons: [
      {
        _id: "lesson-4-1",
        title: "Introduction to React",
        durationSec: 720,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 1,
      },
      {
        _id: "lesson-4-2",
        title: "Components & Props",
        durationSec: 1200,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 2,
      },
      {
        _id: "lesson-4-3",
        title: "State & Hooks",
        durationSec: 1440,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 3,
      },
      {
        _id: "lesson-4-4",
        title: "Building Real Project",
        durationSec: 2400,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 4,
      },
    ],
  },
  {
    _id: "module-5",
    title: "Backend with Node.js",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
    lessons: [
      {
        _id: "lesson-5-1",
        title: "Introduction to Node.js",
        durationSec: 840,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 1,
      },
      {
        _id: "lesson-5-2",
        title: "Express.js Framework",
        durationSec: 1320,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 2,
      },
      {
        _id: "lesson-5-3",
        title: "REST API Development",
        durationSec: 1680,
        videoProvider: "youtube",
        isFreePreview: false,
        order: 3,
      },
    ],
  },
];

export default function CourseDetailPage() {
  const [expandedModule, setExpandedModule] = useState(null);
  const courseData = DEMO_COURSE_DATA;
  const modules = DEMO_MODULES;

  const calculateTotals = () => {
    const totalLessons = modules.reduce(
      (sum, mod) => sum + (mod?.lessons?.length || 0),
      0
    );
    const totalDurationSec = modules.reduce(
      (sum, mod) =>
        sum +
        (mod?.lessons?.reduce((ls, l) => ls + (l?.durationSec || 0), 0) || 0),
      0
    );
    const hours = Math.floor(totalDurationSec / 3600);
    const minutes = Math.floor((totalDurationSec % 3600) / 60);
    return {
      totalLessons,
      totalDuration: `${hours}h ${minutes}m`,
      totalDurationSec,
    };
  };

  const totals = calculateTotals();
  const originalPrice = courseData.pricing.bundlePrice;
  const discountPercent = courseData.pricing.discountPercent;
  const finalPrice = originalPrice - (originalPrice * discountPercent) / 100;
  const currency = courseData.pricing.currency;

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60);
    return m > 0 ? `${m}min` : `${sec}sec`;
  };

  const toggleModule = (id) =>
    setExpandedModule(expandedModule === id ? null : id);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-10" />
          <img
            src={courseData.thumbnail}
            alt={courseData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <button className="p-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all">
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button className="p-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="px-4 -mt-8 relative z-20">
          <div className="bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-2xl rounded-3xl p-5 md:p-6 border-2 border-purple-500/30 shadow-[0_20px_60px_rgba(168,85,247,0.3)]">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50 rounded-full text-xs font-bold text-purple-200 shadow-lg">
                {courseData.level}
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-400/50 rounded-full text-xs font-bold text-green-200 flex items-center gap-1 shadow-lg animate-pulse">
                <TrendingUp className="w-3 h-3" />
                TRENDING
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-2 border-blue-400/50 rounded-full text-xs font-bold text-blue-200 shadow-lg">
                {courseData.category}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              {courseData.title}
            </h1>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
              {courseData.description}
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-5 pb-5 border-b border-white/10">
              <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-2 rounded-xl border border-yellow-500/30">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(courseData.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-700 text-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-yellow-400">
                  {courseData.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/10 px-3 py-2 rounded-xl border border-purple-500/30">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-purple-300">
                  {courseData.enrolledCount.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400">students</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                <div className="flex items-center justify-center mb-2 bg-purple-500/20 w-10 h-10 rounded-lg mx-auto">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-xs text-gray-400 mb-1">Duration</p>
                <p className="text-sm font-bold text-white">
                  {totals.totalDuration}
                </p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                <div className="flex items-center justify-center mb-2 bg-blue-500/20 w-10 h-10 rounded-lg mx-auto">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-xs text-gray-400 mb-1">Lessons</p>
                <p className="text-sm font-bold text-white">
                  {totals.totalLessons}
                </p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                <div className="flex items-center justify-center mb-2 bg-green-500/20 w-10 h-10 rounded-lg mx-auto">
                  <Award className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-xs text-gray-400 mb-1">Certificate</p>
                <p className="text-sm font-bold text-white">Yes</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {courseData.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-lg text-xs font-medium text-gray-300 transition-all cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 pb-32">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white mb-1">Course Content</h2>
          <p className="text-sm text-gray-400">
            {modules.length} modules • {totals.totalLessons} lessons •{" "}
            {totals.totalDuration}
          </p>
        </div>

        <div className="space-y-3">
          {modules.map((mod, idx) => {
            const dur =
              mod.lessons?.reduce((s, l) => s + (l.durationSec || 0), 0) || 0;
            const h = Math.floor(dur / 3600);
            const m = Math.floor((dur % 3600) / 60);
            const fmt = h > 0 ? `${h}h ${m}m` : `${m}m`;
            const exp = expandedModule === mod._id;

            return (
              <div
                key={mod._id}
                className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-xl"
              >
                <button
                  onClick={() => toggleModule(mod._id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 flex-shrink-0">
                      <span className="text-lg font-bold text-purple-300">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">
                        {mod.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          {mod.lessons?.length || 0} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {fmt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-400 transition-transform duration-300 flex-shrink-0 ${
                      exp ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {exp && mod.lessons && (
                  <div className="px-4 pb-4 space-y-2">
                    {mod.lessons
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((l) => {
                        const locked = !l.isFreePreview;
                        return (
                          <div
                            key={l._id}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                              locked
                                ? "bg-slate-800/50 border-white/5"
                                : "bg-gradient-to-r from-purple-500/10 to-transparent border-purple-500/20 hover:border-purple-500/40 cursor-pointer"
                            }`}
                          >
                            <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg flex-shrink-0 overflow-hidden border border-purple-500/30">
                              <img
                                src={mod.thumbnail || courseData.thumbnail}
                                alt=""
                                className="w-full h-full object-cover opacity-60"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                {locked ? (
                                  <Lock className="w-5 h-5 text-gray-500" />
                                ) : (
                                  <div className="relative">
                                    <Play className="w-5 h-5 text-white" />
                                    <span className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full border border-slate-900" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 mb-1">
                                <h4
                                  className={`text-sm font-semibold leading-tight line-clamp-2 flex-1 ${
                                    locked ? "text-gray-500" : "text-white"
                                  }`}
                                >
                                  {l.title}
                                </h4>
                                {l.isFreePreview && (
                                  <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs font-bold text-green-300 flex-shrink-0">
                                    FREE
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs">
                                <span
                                  className={`px-2 py-0.5 rounded-full ${
                                    locked
                                      ? "bg-gray-700/50 text-gray-500"
                                      : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                  }`}
                                >
                                  {l.videoProvider}
                                </span>
                                <span
                                  className={
                                    locked ? "text-gray-600" : "text-gray-400"
                                  }
                                >
                                  {formatDuration(l.durationSec)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4">Your Instructor</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {courseData.instructor.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {courseData.instructor}
              </h3>
              <p className="text-sm text-gray-400">
                Expert Web Developer & Instructor
              </p>
              <p className="text-xs text-gray-500 mt-1">
                10+ years experience • 50k+ students
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-t-2 border-purple-500/30 shadow-[0_-10px_40px_rgba(168,85,247,0.4)] z-50">
        <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {currency}
                  {finalPrice.toLocaleString()}
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  {currency}
                  {originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-lg text-xs font-bold text-green-300 animate-pulse">
                  SAVE {discountPercent}%
                </span>
                <span className="text-xs text-gray-400">Limited offer</span>
              </div>
            </div>
            <button className="relative px-6 md:px-10 py-3.5 md:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 rounded-2xl font-bold text-white text-sm md:text-base shadow-2xl shadow-purple-500/50 transition-all active:scale-95 group flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                BUY NOW
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
