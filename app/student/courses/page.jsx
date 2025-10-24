"use client"

import StudentCourses from "@/views/student/StudentCourses"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BookOpen, Star, Users, Clock, Play, ChevronRight } from "lucide-react"
import courseService from "@/services/courseService"

export default function StudentCoursesPage() {
  const [serverCourses, setServerCourses] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true
    courseService
      .listPublic()
      .then((data) => {
        if (!mounted) return
        setServerCourses(data)
      })
      .catch((e) => setError(e?.response?.data?.message || e.message))
    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <StudentCourses />
      
      {/* Enhanced Browse Section */}
      <div className="p-4 md:p-6 lg:p-8 space-y-8">
        {/* Premium Section Header */}
        <div className="relative">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                <BookOpen className="w-8 h-8 text-purple-300" />
              </div>
              All Courses
            </h2>
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20">
              <span className="text-white/80 font-bold">
                {serverCourses?.length || 0} Available
              </span>
            </div>
          </div>
          <p className="text-white/70 text-lg mt-2 ml-16">
            Discover our comprehensive collection of professional courses
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white px-6 py-4 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              {error}
            </div>
          </div>
        )}
        
        {/* Premium Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serverCourses?.map((course, index) => (
            <Link 
              key={course._id} 
              href={`/student/courses/${course._id}`}
              className="group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-500/30 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl pointer-events-none" />
              
              {/* Course Image */}
              <div className="relative overflow-hidden h-56">
                {course.thumbnail ? (
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                    <div className="text-6xl font-black text-white/40">
                      {course.title.slice(0, 1)}
                    </div>
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Course Level Badge */}
                {course.level && (
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-xl border ${
                      course.level === 'Beginner' ? 'bg-emerald-500/90 text-white border-emerald-400/30' :
                      course.level === 'Intermediate' ? 'bg-amber-500/90 text-white border-amber-400/30' :
                      'bg-rose-500/90 text-white border-rose-400/30'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                )}
                
                {/* Rating Badge */}
                {course.rating > 0 && (
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-2 bg-black/50 backdrop-blur-xl rounded-xl border border-white/20 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-bold text-sm">{course.rating}</span>
                    </div>
                  </div>
                )}
                
                {/* Free Course Badge */}
                {course.bundlePrice === 0 && (
                  <div className="absolute bottom-4 left-4">
                    <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-xl text-white rounded-xl text-sm font-bold shadow-lg border border-emerald-400/30">
                      🎁 Free Course
                    </span>
                  </div>
                )}
              </div>
              
              {/* Course Content */}
              <div className="relative p-6 space-y-4">
                <div>
                  <h3 className="text-white font-black text-xl leading-tight group-hover:text-purple-200 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 font-medium">{course.category}</p>
                </div>
                
                {/* Course Stats */}
                <div className="flex items-center gap-3 text-sm flex-wrap">
                  <span className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/20 text-white/80 font-semibold">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    {course.moduleCount || 0} modules
                  </span>
                  {course.enrolledCount > 0 && (
                    <span className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/20 text-white/80 font-semibold">
                      <Users className="w-4 h-4 text-blue-400" />
                      {course.enrolledCount}
                    </span>
                  )}
                  {course.duration && (
                    <span className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/20 text-white/80 font-semibold">
                      <Clock className="w-4 h-4 text-green-400" />
                      {course.duration}
                    </span>
                  )}
                </div>
                
                {/* Description */}
                {course.description && (
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                )}
                
                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-left">
                    <span className="text-3xl font-black text-white">
                      ₹{course.bundlePrice ?? 0}
                    </span>
                    {course.bundlePrice === 0 && (
                      <div className="text-emerald-400 text-sm font-bold">Free Course</div>
                    )}
                  </div>
                  
                  <button className="group/btn px-6 py-3 rounded-2xl bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white font-black shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3">
                    <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    Explore Course
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Empty State */}
        {!serverCourses?.length && !error && (
          <div className="text-center py-16 space-y-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse" />
              <div className="relative p-8 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 inline-block">
                <BookOpen className="w-16 h-16 text-purple-300" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">No Courses Available</h3>
              <p className="text-white/60 text-lg">We're working on adding amazing courses for you. Check back soon!</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
