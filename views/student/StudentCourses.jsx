"use client"

import { useState } from "react"
import {
  Play,
  Lock,
  CheckCircle,
  Clock,
  BookOpen,
  TrendingUp,
  Code,
  BarChart3,
  Settings,
  Megaphone,
  Award,
  Zap,
} from "lucide-react"

export default function StudentCourses() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isPro, setIsPro] = useState(false)

  const categories = [
    { id: "all", name: "All Courses", icon: BookOpen },
    { id: "it", name: "IT & Software", icon: Code },
    { id: "management", name: "Management", icon: BarChart3 },
    { id: "engineering", name: "Engineering", icon: Settings },
    { id: "marketing", name: "Marketing", icon: Megaphone },
  ]

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "it",
      thumbnail: "/goal.jpg",
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
      thumbnail: "/programming.jpg",
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
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg">
          <BookOpen className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-0.5">Continue learning and track your progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all border border-blue-100 hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Enrolled Courses</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{enrolledCourses.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all border border-green-100 hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Progress</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{avgProgress}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all border border-emerald-100 hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {enrolledCourses.filter((c) => c.progress === 100).length}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle className="w-7 h-7 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all border border-cyan-100 hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Learning Hours</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {enrolledCourses.reduce((sum, c) => sum + Number.parseInt(c.duration), 0)}h
              </p>
            </div>
            <div className="p-3 bg-cyan-100 rounded-lg">
              <Clock className="w-7 h-7 text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      {!isPro && (
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-xl p-6 flex items-center justify-between shadow-xl hover:shadow-2xl transition-all border border-blue-400">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-xl">Upgrade to Pro</h3>
                <Award className="w-5 h-5 text-yellow-300" />
              </div>
              <p className="text-white/90 mt-1">Get unlimited access to all courses and premium features</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-300">
            Upgrade Now
          </button>
        </div>
      )}

      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {category.name}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all shadow-lg hover:scale-105 duration-300 border border-gray-100"
          >
            <div className="relative group overflow-hidden rounded-t-xl isolate">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="relative z-0 w-full h-48 object-cover origin-center will-change-transform transition-transform duration-300 group-hover:scale-110"
              />
              {course.isPro && !isPro && (
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm inline-block mb-2">
                      <Lock className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white font-semibold text-lg">Pro Only</p>
                  </div>
                </div>
              )}
              {course.isEnrolled && (
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Enrolled
                  </span>
                </div>
              )}
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-gray-900 font-bold text-lg leading-tight">{course.title}</h3>
                <p className="text-gray-600 text-sm mt-1">by {course.instructor}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Play className="w-4 h-4" />
                  {course.totalVideos} videos
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
              </div>
              {course.isEnrolled && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Progress</span>
                    <span className="text-gray-900 font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {course.completedVideos} of {course.totalVideos} videos completed
                  </p>
                </div>
              )}
              <button
                className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  course.isPro && !isPro
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-sm"
                    : course.isEnrolled
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-md hover:shadow-lg hover:scale-105"
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
