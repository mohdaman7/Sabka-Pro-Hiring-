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
    <div className="min-h-screen bg-[#0f0820]">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-[#8b4fa8]/30 to-[#692c7a]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <div className="bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Thumbnail */}
              <div className="relative h-64 md:h-80 overflow-hidden bg-[#1a0d2e]">
                <img
                  src={courseData.thumbnail}
                  alt={courseData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d2e] via-[#1a0d2e]/50 to-transparent" />

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button className="p-2.5 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2.5 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 hover:bg-white/20 transition-all group">
                    <Heart className="w-5 h-5 text-white group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-[#7e4ba3]/20 border border-[#a87bcc]/30 rounded-lg text-xs font-semibold text-[#c99ee6]">
                    {courseData.level}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-semibold text-blue-300">
                    {courseData.category}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  {courseData.title}
                </h1>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                  {courseData.description}
                </p>

                <div className="flex items-center gap-4 flex-wrap mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
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
                    <span className="text-sm font-semibold text-white">
                      {courseData.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>
                      {courseData.enrolledCount.toLocaleString()} students
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {courseData.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 hover:border-[#a87bcc]/30 hover:text-[#c99ee6] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4">
                Course Includes
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#7e4ba3]/10 rounded-lg flex items-center justify-center border border-[#a87bcc]/20">
                    <Clock className="w-5 h-5 text-[#c99ee6]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {totals.totalDuration}
                    </p>
                    <p className="text-xs text-gray-400">Total duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-400/20">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {totals.totalLessons} Lessons
                    </p>
                    <p className="text-xs text-gray-400">Video content</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-400/20">
                    <Award className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Certificate
                    </p>
                    <p className="text-xs text-gray-400">On completion</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center border border-pink-400/20">
                    <TrendingUp className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Lifetime Access
                    </p>
                    <p className="text-xs text-gray-400">Learn at your pace</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-1">
                  Course Content
                </h2>
                <p className="text-sm text-gray-400">
                  {modules.length} modules • {totals.totalLessons} lessons •{" "}
                  {totals.totalDuration}
                </p>
              </div>

              <div className="space-y-3">
                {modules.map((mod, idx) => {
                  const dur =
                    mod.lessons?.reduce(
                      (s, l) => s + (l.durationSec || 0),
                      0
                    ) || 0;
                  const h = Math.floor(dur / 3600);
                  const m = Math.floor((dur % 3600) / 60);
                  const fmt = h > 0 ? `${h}h ${m}m` : `${m}m`;
                  const exp = expandedModule === mod._id;

                  return (
                    <div
                      key={mod._id}
                      className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
                    >
                      <button
                        onClick={() => toggleModule(mod._id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 text-left">
                          <div className="w-10 h-10 bg-[#7e4ba3]/20 rounded-lg flex items-center justify-center border border-[#a87bcc]/30 flex-shrink-0">
                            <span className="text-sm font-bold text-[#c99ee6]">
                              {idx + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white mb-1">
                              {mod.title}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span>{mod.lessons?.length || 0} lessons</span>
                              <span>•</span>
                              <span>{fmt}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                            exp ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {exp && mod.lessons && (
                        <div className="px-4 pb-4 space-y-2 border-t border-white/5">
                          {mod.lessons
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((l) => {
                              const locked = !l.isFreePreview;
                              return (
                                <div
                                  key={l._id}
                                  className={`flex items-center gap-3 p-3 rounded-lg transition-all mt-2 ${
                                    locked
                                      ? "bg-white/[0.02]"
                                      : "bg-[#7e4ba3]/5 border border-[#a87bcc]/20 cursor-pointer hover:bg-[#7e4ba3]/10"
                                  }`}
                                >
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                      locked
                                        ? "bg-white/[0.05]"
                                        : "bg-[#7e4ba3]/20"
                                    }`}
                                  >
                                    {locked ? (
                                      <Lock className="w-4 h-4 text-gray-500" />
                                    ) : (
                                      <Play className="w-4 h-4 text-[#c99ee6]" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4
                                        className={`text-sm font-medium flex-1 ${
                                          locked
                                            ? "text-gray-500"
                                            : "text-white"
                                        }`}
                                      >
                                        {l.title}
                                      </h4>
                                      {l.isFreePreview && (
                                        <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs font-semibold text-green-300">
                                          Preview
                                        </span>
                                      )}
                                    </div>
                                    <span
                                      className={`text-xs ${
                                        locked
                                          ? "text-gray-600"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      {formatDuration(l.durationSec)}
                                    </span>
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
            </div>

            {/* Instructor */}
            <div className="bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4">
                Your Instructor
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7e4ba3] to-[#a87bcc] rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 shadow-lg shadow-[#7e4ba3]/30">
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

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-white">
                        {currency}
                        {finalPrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {currency}
                        {originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-xs font-semibold text-green-300">
                        {discountPercent}% OFF
                      </span>
                      <span className="text-xs text-gray-400">
                        Limited time offer
                      </span>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3.5 bg-gradient-to-r from-[#7e4ba3] to-[#a87bcc] hover:from-[#692c7a] hover:to-[#9463a8] rounded-xl font-semibold text-white transition-all shadow-lg shadow-[#7e4ba3]/50 hover:shadow-xl hover:shadow-[#7e4ba3]/60">
                    Enroll Now
                  </button>

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Access</span>
                      <span className="text-white font-semibold">Lifetime</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Certificate</span>
                      <span className="text-white font-semibold">Included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
