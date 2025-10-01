"use client"

import { useState } from "react"
import { Play, Lock, CheckCircle, Clock, BookOpen, TrendingUp } from "lucide-react"

export default function StudentCourses() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isPro, setIsPro] = useState(false)

  const categories = [
    { id: "all", name: "All Courses", icon: "📚" },
    { id: "it", name: "IT & Software", icon: "💻" },
    { id: "management", name: "Management", icon: "📊" },
    { id: "engineering", name: "Engineering", icon: "⚙️" },
    { id: "marketing", name: "Marketing", icon: "📱" },
  ]

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "it",
      thumbnail: "/web-development-coding.png",
      progress: 45,
      totalVideos: 45,
      completedVideos: 20,
      duration: "40 hours",
      instructor: "John Doe",
      isPro: true,
      isEnrolled: true,
    },
    {
      id: 2,
      title: "Project Management Fundamentals",
      category: "management",
      thumbnail: "/project-management-teamwork.jpg",
      progress: 0,
      totalVideos: 30,
      completedVideos: 0,
      duration: "25 hours",
      instructor: "Jane Smith",
      isPro: true,
      isEnrolled: false,
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      category: "marketing",
      thumbnail: "/digital-marketing-strategy.png",
      progress: 80,
      totalVideos: 35,
      completedVideos: 28,
      duration: "30 hours",
      instructor: "Mike Johnson",
      isPro: true,
      isEnrolled: true,
    },
    {
      id: 4,
      title: "Introduction to Programming",
      category: "it",
      thumbnail: "/programming-basics.png",
      progress: 0,
      totalVideos: 20,
      completedVideos: 0,
      duration: "15 hours",
      instructor: "Sarah Williams",
      isPro: false,
      isEnrolled: false,
    },
  ]

  const filteredCourses =
    selectedCategory === "all" ? courses : courses.filter((course) => course.category === selectedCategory)

  const enrolledCourses = courses.filter((c) => c.isEnrolled)
  const avgProgress =
    enrolledCourses.length > 0
      ? Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)
      : 0

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-1">Continue learning and track your progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{enrolledCourses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg. Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{avgProgress}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {enrolledCourses.filter((c) => c.progress === 100).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Learning Hours</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {enrolledCourses.reduce((sum, c) => sum + Number.parseInt(c.duration), 0)}h
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Plan Status Banner */}
      {!isPro && (
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-6 flex items-center justify-between shadow-md">
          <div>
            <h3 className="text-white font-bold text-lg">Upgrade to Pro</h3>
            <p className="text-white/90 mt-1">Get unlimited access to all courses and premium features</p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            Upgrade Now
          </button>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all shadow-sm ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <div className="relative">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              {course.isPro && !isPro && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-white font-semibold">Pro Only</p>
                  </div>
                </div>
              )}
              {course.isEnrolled && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-medium shadow-sm">
                    Enrolled
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-gray-900 font-semibold text-lg">{course.title}</h3>
                <p className="text-gray-600 text-sm">by {course.instructor}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  {course.totalVideos} videos
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
              </div>
              {course.isEnrolled && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900 font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {course.completedVideos} of {course.totalVideos} videos completed
                  </p>
                </div>
              )}
              <button
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-sm ${
                  course.isPro && !isPro
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                    : course.isEnrolled
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                }`}
                disabled={course.isPro && !isPro}
              >
                {course.isPro && !isPro ? (
                  <>
                    <Lock className="w-4 h-4" />
                    Upgrade to Access
                  </>
                ) : course.isEnrolled ? (
                  <>
                    <Play className="w-4 h-4" />
                    Continue Learning
                  </>
                ) : (
                  "Enroll Now"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
