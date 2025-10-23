"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Edit2, Trash2, Video, Eye, Lock, BookOpen, DollarSign, Users } from "lucide-react"
import courseService from "@/services/courseService"
import CreateParentCourseModal from "@/components/ui/CreateParentCourseModal"
import CreateModuleModal from "@/components/ui/CreateModuleModal"
import EditCourseModal from "@/components/ui/EditCourseModal"
import CourseAccessManager from "@/components/ui/CourseAccessManager"

export default function CourseManagement() {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCreateParentModal, setShowCreateParentModal] = useState(false)
  const [showCreateModuleModal, setShowCreateModuleModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAccessManager, setShowAccessManager] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [adminCourses, setAdminCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const categories = ["IT & Software", "Management", "Engineering", "Marketing", "Design", "Business"]

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = () => {
    setLoading(true)
    courseService
      .adminList()
      .then((data) => {
        setAdminCourses(data)
      })
      .catch((e) => setError(e?.response?.data?.message || e.message))
      .finally(() => setLoading(false))
  }

  const handleDelete = async (courseId) => {
    if (!confirm("Are you sure you want to delete this course?")) return
    try {
      await courseService.adminDelete(courseId)
      loadCourses()
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    }
  }

  const handleEdit = (course) => {
    setSelectedCourse(course)
    setShowEditModal(true)
  }

  const parentCourses = adminCourses.filter((c) => c.type === "parent")
  const filteredCourses = parentCourses
    .filter((c) => (selectedCategory !== "all" ? c.category === selectedCategory : true))
    .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Course Management</h1>
          <p className="text-slate-600">Manage courses, modules, lessons, and student access</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAccessManager(true)}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <Users className="w-4 h-4" />
            Access Control
          </button>
          <button
            onClick={() => setShowCreateModuleModal(true)}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </button>
          <button
            onClick={() => setShowCreateParentModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create Course
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === "courses" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Courses
          {activeTab === "courses" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("modules")}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === "modules" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          All Modules
          {activeTab === "modules" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center py-12 text-slate-600">Loading courses...</div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <span className="px-2 py-1 rounded bg-blue-600 text-white text-xs font-medium">
                      Bundle
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        course.status === "active"
                          ? "bg-green-600 text-white"
                          : course.status === "draft"
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-slate-900 font-semibold text-lg">{course.title}</h3>
                    <p className="text-slate-600 text-sm">{course.category || "Uncategorized"}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.modules?.length || 0} modules
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ₹{course.pricing?.bundlePrice ?? 0}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    {course.enrolledCount || 0} students enrolled
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-slate-600">
              No courses found. Create your first course!
            </div>
          )}
        </div>
      )}

      {activeTab === "modules" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center py-12 text-slate-600">Loading modules...</div>
          ) : (
            adminCourses
              .filter((c) => c.type === "module")
              .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((module) => (
                <div
                  key={module._id}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="relative">
                    <img
                      src={module.thumbnail || "/placeholder.svg"}
                      alt={module.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span className="px-2 py-1 rounded bg-purple-600 text-white text-xs font-medium">
                        Module
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          module.status === "active" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                        }`}
                      >
                        {module.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-slate-900 font-semibold text-lg">{module.title}</h3>
                      <p className="text-slate-600 text-sm">{module.category || "Uncategorized"}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        {module.lessons?.length || 0} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ₹{module.pricing?.individualPrice ?? 0}
                      </span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleEdit(module)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(module._id)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* Modals */}
      {showCreateParentModal && (
        <CreateParentCourseModal onClose={() => setShowCreateParentModal(false)} onSuccess={loadCourses} />
      )}
      {showCreateModuleModal && (
        <CreateModuleModal
          onClose={() => setShowCreateModuleModal(false)}
          onSuccess={loadCourses}
          parentCourses={parentCourses}
        />
      )}
      {showEditModal && selectedCourse && (
        <EditCourseModal course={selectedCourse} onClose={() => setShowEditModal(false)} onSuccess={loadCourses} />
      )}
      {showAccessManager && <CourseAccessManager onClose={() => setShowAccessManager(false)} />}
    </div>
  )
}
