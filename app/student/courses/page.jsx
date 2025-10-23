"use client"

import StudentCourses from "@/views/student/StudentCourses"
import Link from "next/link"
import { useEffect, useState } from "react"
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
      <div className="p-4 md:p-6 lg:p-8 space-y-4">
        <div className="text-white font-black text-xl">Browse Courses</div>
        {error && <div className="text-red-400">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serverCourses?.map((c) => (
            <Link key={c._id} href={`/student/courses/${c._id}`} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20">
              <div className="aspect-video bg-black/30">
                {c.thumbnail ? (
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/60">{c.title.slice(0, 1)}</div>
                )}
              </div>
              <div className="p-4">
                <div className="text-white font-bold">{c.title}</div>
                <div className="text-white/70 text-sm">{c.category}</div>
                <div className="text-white/80 text-sm mt-2">{c.moduleCount || 0} modules</div>
                <div className="text-white font-black mt-2">₹{c.bundlePrice ?? 0}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
