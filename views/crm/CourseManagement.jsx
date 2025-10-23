"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Edit2, Trash2, Video, Eye, Lock } from "lucide-react"
import courseService from "@/services/courseService"

export default function CourseManagement() {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalType, setModalType] = useState("course")
  const [adminCourses, setAdminCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Modal state for creating and editing courses/lessons
  const [createTab, setCreateTab] = useState("parent") // parent | module
  const [submitting, setSubmitting] = useState(false)
  const [parentForm, setParentForm] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    instructor: "",
    level: "Beginner",
    bundlePrice: "",
    discountPercent: "",
    status: "draft",
  })
  const [moduleForm, setModuleForm] = useState({
    parentCourseId: "",
    title: "",
    description: "",
    thumbnail: "",
    instructor: "",
    level: "Beginner",
    individualPrice: "",
    status: "draft",
    lessons: [],
  })
  const emptyLesson = {
    title: "",
    description: "",
    durationSec: "",
    videoProvider: "youtube",
    videoId: "",
    videoUrl: "",
    isFreePreview: false,
    order: "",
  }
  const [lessonDraft, setLessonDraft] = useState({ ...emptyLesson })
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [targetModule, setTargetModule] = useState(null)
  const [lessonForm, setLessonForm] = useState({ ...emptyLesson })
  const [showEditModal, setShowEditModal] = useState(false)
  const [editCourse, setEditCourse] = useState(null)

  const categories = [
    { id: 1, name: "IT & Software", courses: 12, icon: "💻" },
    { id: 2, name: "Management", courses: 8, icon: "📊" },
    { id: 3, name: "Engineering", courses: 15, icon: "⚙️" },
    { id: 4, name: "Marketing", courses: 6, icon: "📱" },
  ]

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "IT & Software",
      duration: "40 hours",
      videos: 45,
      enrolled: 234,
      completion: 78,
      thumbnail: "https://blog.hrflow.ai/content/images/2020/04/Full-Stack-Developer.jpg",
      access: "Pro",
      status: "Active",
    },
    {
      id: 2,
      title: "Project Management Fundamentals",
      category: "Management",
      duration: "25 hours",
      videos: 30,
      enrolled: 156,
      completion: 85,
      thumbnail: "/project-management-teamwork.jpg",
      access: "Pro",
      status: "Active",
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      category: "Marketing",
      duration: "30 hours",
      videos: 35,
      enrolled: 189,
      completion: 72,
      thumbnail: "/digital-marketing-strategy.png",
      access: "Pro",
      status: "Active",
    },
    {
      id: 4,
      title: "Mechanical Engineering Basics",
      category: "Engineering",
      duration: "50 hours",
      videos: 60,
      enrolled: 98,
      completion: 65,
      thumbnail: "/mechanical.jpg",
      access: "Pro",
      status: "Draft",
    },
  ]

  useEffect(() => {
    let mounted = true
    setLoading(true)
    courseService
      .adminList()
      .then((data) => {
        if (!mounted) return
        setAdminCourses(data)
      })
      .catch((e) => setError(e?.response?.data?.message || e.message))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const handleAddNew = (type) => {
    setModalType(type)
    setShowAddModal(true)
  }

  const refreshAdminList = async () => {
    try {
      setLoading(true)
      const data = await courseService.adminList()
      setAdminCourses(data)
    } catch (e) {
      setError(e?.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  const resetCreateForms = () => {
    setCreateTab("parent")
    setParentForm({
      title: "",
      description: "",
      category: "",
      thumbnail: "",
      instructor: "",
      level: "Beginner",
      bundlePrice: "",
      discountPercent: "",
      status: "draft",
    })
    setModuleForm({
      parentCourseId: "",
      title: "",
      description: "",
      thumbnail: "",
      instructor: "",
      level: "Beginner",
      individualPrice: "",
      status: "draft",
      lessons: [],
    })
    setLessonDraft({ ...emptyLesson })
  }

  const submitCreateParent = async () => {
    try {
      setSubmitting(true)
      const payload = {
        title: parentForm.title,
        description: parentForm.description,
        category: parentForm.category,
        thumbnail: parentForm.thumbnail,
        instructor: parentForm.instructor,
        level: parentForm.level,
        bundlePrice: Number(parentForm.bundlePrice || 0),
        discountPercent: Number(parentForm.discountPercent || 0),
        status: parentForm.status,
      }
      await courseService.adminCreateParent(payload)
      await refreshAdminList()
      setShowAddModal(false)
      resetCreateForms()
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Failed to create course")
    } finally {
      setSubmitting(false)
    }
  }

  const addLessonDraftToModule = () => {
    const cleaned = {
      title: lessonDraft.title,
      description: lessonDraft.description,
      durationSec: Number(lessonDraft.durationSec || 0),
      videoProvider: lessonDraft.videoProvider || "youtube",
      videoId: lessonDraft.videoId,
      videoUrl: lessonDraft.videoUrl,
      isFreePreview: Boolean(lessonDraft.isFreePreview),
      order: lessonDraft.order === "" ? moduleForm.lessons.length : Number(lessonDraft.order),
    }
    setModuleForm((prev) => ({ ...prev, lessons: [...prev.lessons, cleaned] }))
    setLessonDraft({ ...emptyLesson })
  }

  const removeDraftLessonAt = (idx) => {
    setModuleForm((prev) => ({ ...prev, lessons: prev.lessons.filter((_, i) => i !== idx) }))
  }

  const submitCreateModule = async () => {
    try {
      if (!moduleForm.parentCourseId) {
        alert("Select a parent course")
        return
      }
      if (!moduleForm.title) {
        alert("Title is required")
        return
      }
      setSubmitting(true)
      const payload = {
        parentCourseId: moduleForm.parentCourseId,
        title: moduleForm.title,
        description: moduleForm.description,
        thumbnail: moduleForm.thumbnail,
        instructor: moduleForm.instructor,
        level: moduleForm.level,
        individualPrice: Number(moduleForm.individualPrice || 0),
        status: moduleForm.status,
        lessons: moduleForm.lessons,
      }
      await courseService.adminCreateModule(payload)
      await refreshAdminList()
      setShowAddModal(false)
      resetCreateForms()
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Failed to create module")
    } finally {
      setSubmitting(false)
    }
  }

  const openLessonModalFor = (course) => {
    setTargetModule(course)
    setLessonForm({ ...emptyLesson })
    setShowLessonModal(true)
  }

  const submitAddLesson = async () => {
    try {
      if (!targetModule?._id) return
      if (!lessonForm.title) {
        alert("Lesson title is required")
        return
      }
      setSubmitting(true)
      const payload = {
        title: lessonForm.title,
        description: lessonForm.description,
        durationSec: Number(lessonForm.durationSec || 0),
        videoProvider: lessonForm.videoProvider || "youtube",
        videoId: lessonForm.videoId,
        videoUrl: lessonForm.videoUrl,
        isFreePreview: Boolean(lessonForm.isFreePreview),
        order: lessonForm.order === "" ? undefined : Number(lessonForm.order),
      }
      await courseService.adminAddLesson(targetModule._id, payload)
      await refreshAdminList()
      setShowLessonModal(false)
      setTargetModule(null)
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Failed to add lesson")
    } finally {
      setSubmitting(false)
    }
  }

  const openEdit = (course) => {
    setEditCourse(course)
    setShowEditModal(true)
  }

  const submitEdit = async () => {
    try {
      if (!editCourse?._id) return
      setSubmitting(true)
      const payload = {
        title: editCourse.title,
        description: editCourse.description,
        category: editCourse.category,
        thumbnail: editCourse.thumbnail,
        instructor: editCourse.instructor,
        level: editCourse.level,
        status: editCourse.status,
      }
      // include pricing fields based on type
      if (editCourse.type === "parent") {
        payload.pricing = { ...(editCourse.pricing || {}), bundlePrice: Number(editCourse?.pricing?.bundlePrice || 0) }
      } else {
        payload.pricing = { ...(editCourse.pricing || {}), individualPrice: Number(editCourse?.pricing?.individualPrice || 0) }
      }
      await courseService.adminUpdate(editCourse._id, payload)
      await refreshAdminList()
      setShowEditModal(false)
      setEditCourse(null)
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Failed to update course")
    } finally {
      setSubmitting(false)
    }
  }

  const confirmDelete = async (id) => {
    if (!window.confirm("Delete this course? This cannot be undone.")) return
    try {
      setSubmitting(true)
      await courseService.adminDelete(id)
      await refreshAdminList()
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Failed to delete course")
    } finally {
      setSubmitting(false)
    }
  }

  const filteredCourses = courses.filter((course) => {
    if (selectedCategory !== "all" && course.category !== selectedCategory) {
      return false
    }
    return course.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Training Courses</h1>
          <p className="text-slate-600">Manage courses, categories, and video content</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleAddNew("category")}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={() => handleAddNew("course")}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Course
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
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === "categories" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Categories
          {activeTab === "categories" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === "videos" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Videos
          {activeTab === "videos" && (
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
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Content based on active tab */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCourses?.length > 0
            ? adminCourses
                .filter((c) => (selectedCategory !== "all" ? c.category === selectedCategory : true))
                .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((course) => (
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
                        <span className="px-2 py-1 rounded bg-blue-600 text-white text-xs font-medium flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          {course.type === "parent" ? "Bundle" : "Module"}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            course.status === "active" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-slate-900 font-semibold text-lg">{course.title}</h3>
                        <p className="text-slate-600 text-sm">{course.category}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        {course.type === "parent" ? (
                          <span className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            {course.modules?.length || 0} modules
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            {course.lessons?.length || 0} lessons
                          </span>
                        )}
                        {course.type === "parent" ? (
                          <span>₹{course.pricing?.bundlePrice ?? 0}</span>
                        ) : (
                          <span>₹{course.pricing?.individualPrice ?? 0}</span>
                        )}
                      </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => openEdit(course)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      {course.type === "module" && (
                        <button
                          onClick={() => openLessonModalFor(course)}
                          className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Video className="w-4 h-4" />
                          Add Lesson
                        </button>
                      )}
                      <button
                        onClick={() => confirmDelete(course._id)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        title="Delete course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    </div>
                  </div>
                ))
            : filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="relative">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <span className="px-2 py-1 rounded bg-blue-600 text-white text-xs font-medium flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    {course.access}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      course.status === "Active" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-slate-900 font-semibold text-lg">{course.title}</h3>
                  <p className="text-slate-600 text-sm">{course.category}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    {course.videos} videos
                  </span>
                  <span>{course.duration}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Avg. Completion</span>
                    <span className="text-slate-900 font-medium">{course.completion}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-slate-600">{course.enrolled} students enrolled</div>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all flex items-center justify-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
            ))}
        </div>
      )}

      {activeTab === "categories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-slate-900 font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-slate-600 text-sm mb-4">{category.courses} courses</p>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "videos" && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Video Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Access
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  {
                    id: 1,
                    title: "Introduction to React",
                    course: "Full Stack Web Development",
                    duration: "15:30",
                    views: 1234,
                    access: "Pro",
                  },
                  {
                    id: 2,
                    title: "Setting up Node.js",
                    course: "Full Stack Web Development",
                    duration: "22:45",
                    views: 1156,
                    access: "Pro",
                  },
                  {
                    id: 3,
                    title: "Agile Methodology Basics",
                    course: "Project Management Fundamentals",
                    duration: "18:20",
                    views: 892,
                    access: "Pro",
                  },
                  {
                    id: 4,
                    title: "SEO Fundamentals",
                    course: "Digital Marketing Mastery",
                    duration: "25:10",
                    views: 1045,
                    access: "Pro",
                  },
                ].map((video) => (
                  <tr key={video.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Video className="w-5 h-5 text-blue-600" />
                        <span className="text-slate-900 font-medium">{video.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">{video.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">{video.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">{video.views.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium flex items-center gap-1 w-fit">
                        <Lock className="w-3 h-3" />
                        {video.access}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {showAddModal && modalType === "course" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCreateTab("parent")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    createTab === "parent" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Create Parent (Bundle)
                </button>
                <button
                  onClick={() => setCreateTab("module")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    createTab === "module" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Create Module
                </button>
              </div>
              <button onClick={() => (setShowAddModal(false), resetCreateForms())} className="text-slate-600 hover:text-slate-900">
                Close
              </button>
            </div>

            {createTab === "parent" ? (
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600">Title</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    value={parentForm.title}
                    onChange={(e) => setParentForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Course title"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Category</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    value={parentForm.category}
                    onChange={(e) => setParentForm((p) => ({ ...p, category: e.target.value }))}
                    placeholder="e.g. IT & Software"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-slate-600">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg"
                    value={parentForm.description}
                    onChange={(e) => setParentForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Short description"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Thumbnail URL</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    value={parentForm.thumbnail}
                    onChange={(e) => setParentForm((p) => ({ ...p, thumbnail: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Instructor</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    value={parentForm.instructor}
                    onChange={(e) => setParentForm((p) => ({ ...p, instructor: e.target.value }))}
                    placeholder="Instructor name"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Level</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={parentForm.level}
                    onChange={(e) => setParentForm((p) => ({ ...p, level: e.target.value }))}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Bundle Price (₹)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={parentForm.bundlePrice}
                    onChange={(e) => setParentForm((p) => ({ ...p, bundlePrice: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Discount %</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={parentForm.discountPercent}
                    onChange={(e) => setParentForm((p) => ({ ...p, discountPercent: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Status</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={parentForm.status}
                    onChange={(e) => setParentForm((p) => ({ ...p, status: e.target.value }))}
                  >
                    <option value="draft">draft</option>
                    <option value="active">active</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button onClick={() => (setShowAddModal(false), resetCreateForms())} className="px-4 py-2 bg-slate-100 rounded-lg">
                    Cancel
                  </button>
                  <button
                    disabled={submitting || !parentForm.title}
                    onClick={submitCreateParent}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                  >
                    {submitting ? "Creating..." : "Create Parent"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-600">Parent Course</label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg"
                      value={moduleForm.parentCourseId}
                      onChange={(e) => setModuleForm((p) => ({ ...p, parentCourseId: e.target.value }))}
                    >
                      <option value="">Select parent</option>
                      {adminCourses.filter((c) => c.type === "parent").map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Title</label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg"
                      value={moduleForm.title}
                      onChange={(e) => setModuleForm((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Module title"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-slate-600">Description</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg"
                      value={moduleForm.description}
                      onChange={(e) => setModuleForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Short description"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Thumbnail URL</label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg"
                      value={moduleForm.thumbnail}
                      onChange={(e) => setModuleForm((p) => ({ ...p, thumbnail: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Instructor</label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg"
                      value={moduleForm.instructor}
                      onChange={(e) => setModuleForm((p) => ({ ...p, instructor: e.target.value }))}
                      placeholder="Instructor name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Level</label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg"
                      value={moduleForm.level}
                      onChange={(e) => setModuleForm((p) => ({ ...p, level: e.target.value }))}
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Module Price (₹)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={moduleForm.individualPrice}
                      onChange={(e) => setModuleForm((p) => ({ ...p, individualPrice: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Status</label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg"
                      value={moduleForm.status}
                      onChange={(e) => setModuleForm((p) => ({ ...p, status: e.target.value }))}
                    >
                      <option value="draft">draft</option>
                      <option value="active">active</option>
                    </select>
                  </div>
                </div>

                {/* Inline Lesson Drafts */}
                <div className="border rounded-xl p-4">
                  <div className="font-medium text-slate-900 mb-3">Lessons (optional)</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-slate-600">Title</label>
                      <input
                        className="w-full px-3 py-2 border rounded-lg"
                        value={lessonDraft.title}
                        onChange={(e) => setLessonDraft((p) => ({ ...p, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600">Duration (sec)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={lessonDraft.durationSec}
                        onChange={(e) => setLessonDraft((p) => ({ ...p, durationSec: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600">Order</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={lessonDraft.order}
                        onChange={(e) => setLessonDraft((p) => ({ ...p, order: e.target.value }))}
                        placeholder={`${moduleForm.lessons.length}`}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="text-sm text-slate-600">Description</label>
                      <input
                        className="w-full px-3 py-2 border rounded-lg"
                        value={lessonDraft.description}
                        onChange={(e) => setLessonDraft((p) => ({ ...p, description: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600">Video Provider</label>
                      <select
                        className="w-full px-3 py-2 border rounded-lg"
                        value={lessonDraft.videoProvider}
                        onChange={(e) => setLessonDraft((p) => ({ ...p, videoProvider: e.target.value }))}
                      >
                        <option value="youtube">youtube</option>
                        <option value="vimeo">vimeo</option>
                        <option value="external">external</option>
                      </select>
                    </div>
                    {lessonDraft.videoProvider === "external" ? (
                      <div className="md:col-span-2">
                        <label className="text-sm text-slate-600">Video URL</label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg"
                          value={lessonDraft.videoUrl}
                          onChange={(e) => setLessonDraft((p) => ({ ...p, videoUrl: e.target.value }))}
                        />
                      </div>
                    ) : (
                      <div className="md:col-span-2">
                        <label className="text-sm text-slate-600">Video ID</label>
                        <input
                          className="w-full px-3 py-2 border rounded-lg"
                          value={lessonDraft.videoId}
                          onChange={(e) => setLessonDraft((p) => ({ ...p, videoId: e.target.value }))}
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <input
                        id="isFreePreview"
                        type="checkbox"
                        className="rounded"
                        checked={lessonDraft.isFreePreview}
                        onChange={(e) => setLessonDraft((p) => ({ ...p, isFreePreview: e.target.checked }))}
                      />
                      <label htmlFor="isFreePreview" className="text-sm text-slate-700">Free preview</label>
                    </div>
                  </div>
                  <div className="pt-3">
                    <button
                      disabled={!lessonDraft.title}
                      onClick={addLessonDraftToModule}
                      className="px-3 py-2 bg-slate-900 text-white rounded-lg disabled:opacity-50"
                    >
                      Add lesson to list
                    </button>
                  </div>
                  {moduleForm.lessons.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {moduleForm.lessons.map((l, idx) => (
                        <div key={idx} className="flex items-center justify-between rounded-lg border p-2">
                          <div className="text-sm text-slate-800">
                            <span className="font-medium">{idx + 1}. {l.title}</span>
                            <span className="ml-2 text-slate-500">{l.durationSec}s</span>
                            {l.isFreePreview && <span className="ml-2 text-emerald-600">Free</span>}
                          </div>
                          <button onClick={() => removeDraftLessonAt(idx)} className="px-2 py-1 text-red-600 hover:underline text-sm">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => (setShowAddModal(false), resetCreateForms())} className="px-4 py-2 bg-slate-100 rounded-lg">
                    Cancel
                  </button>
                  <button
                    disabled={submitting}
                    onClick={submitCreateModule}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                  >
                    {submitting ? "Creating..." : "Create Module"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Lesson Modal for existing module */}
      {showLessonModal && targetModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="font-semibold">Add Lesson to {targetModule.title}</div>
              <button onClick={() => setShowLessonModal(false)} className="text-slate-600 hover:text-slate-900">Close</button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Title</label>
                <input className="w-full px-3 py-2 border rounded-lg" value={lessonForm.title} onChange={(e) => setLessonForm((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Description</label>
                <input className="w-full px-3 py-2 border rounded-lg" value={lessonForm.description} onChange={(e) => setLessonForm((p) => ({ ...p, description: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Duration (sec)</label>
                <input type="number" className="w-full px-3 py-2 border rounded-lg" value={lessonForm.durationSec} onChange={(e) => setLessonForm((p) => ({ ...p, durationSec: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Order</label>
                <input type="number" className="w-full px-3 py-2 border rounded-lg" value={lessonForm.order} onChange={(e) => setLessonForm((p) => ({ ...p, order: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Video Provider</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={lessonForm.videoProvider} onChange={(e) => setLessonForm((p) => ({ ...p, videoProvider: e.target.value }))}>
                  <option value="youtube">youtube</option>
                  <option value="vimeo">vimeo</option>
                  <option value="external">external</option>
                </select>
              </div>
              {lessonForm.videoProvider === "external" ? (
                <div className="md:col-span-1">
                  <label className="text-sm text-slate-600">Video URL</label>
                  <input className="w-full px-3 py-2 border rounded-lg" value={lessonForm.videoUrl} onChange={(e) => setLessonForm((p) => ({ ...p, videoUrl: e.target.value }))} />
                </div>
              ) : (
                <div className="md:col-span-1">
                  <label className="text-sm text-slate-600">Video ID</label>
                  <input className="w-full px-3 py-2 border rounded-lg" value={lessonForm.videoId} onChange={(e) => setLessonForm((p) => ({ ...p, videoId: e.target.value }))} />
                </div>
              )}
              <div className="flex items-center gap-2 md:col-span-2">
                <input id="lessonFree" type="checkbox" className="rounded" checked={lessonForm.isFreePreview} onChange={(e) => setLessonForm((p) => ({ ...p, isFreePreview: e.target.checked }))} />
                <label htmlFor="lessonFree" className="text-sm text-slate-700">Free preview</label>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <button onClick={() => setShowLessonModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg">Cancel</button>
              <button disabled={submitting} onClick={submitAddLesson} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50">{submitting ? "Adding..." : "Add Lesson"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditModal && editCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="font-semibold">Edit Course</div>
              <button onClick={() => setShowEditModal(false)} className="text-slate-600 hover:text-slate-900">Close</button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Title</label>
                <input className="w-full px-3 py-2 border rounded-lg" value={editCourse.title || ""} onChange={(e) => setEditCourse((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Category</label>
                <input className="w-full px-3 py-2 border rounded-lg" value={editCourse.category || ""} onChange={(e) => setEditCourse((p) => ({ ...p, category: e.target.value }))} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Description</label>
                <textarea className="w-full px-3 py-2 border rounded-lg" value={editCourse.description || ""} onChange={(e) => setEditCourse((p) => ({ ...p, description: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Thumbnail URL</label>
                <input className="w-full px-3 py-2 border rounded-lg" value={editCourse.thumbnail || ""} onChange={(e) => setEditCourse((p) => ({ ...p, thumbnail: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Instructor</label>
                <input className="w-full px-3 py-2 border rounded-lg" value={editCourse.instructor || ""} onChange={(e) => setEditCourse((p) => ({ ...p, instructor: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Level</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={editCourse.level || "Beginner"} onChange={(e) => setEditCourse((p) => ({ ...p, level: e.target.value }))}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              {editCourse.type === "parent" ? (
                <div>
                  <label className="text-sm text-slate-600">Bundle Price (₹)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg" value={editCourse?.pricing?.bundlePrice ?? 0} onChange={(e) => setEditCourse((p) => ({ ...p, pricing: { ...(p.pricing || {}), bundlePrice: e.target.value } }))} />
                </div>
              ) : (
                <div>
                  <label className="text-sm text-slate-600">Module Price (₹)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg" value={editCourse?.pricing?.individualPrice ?? 0} onChange={(e) => setEditCourse((p) => ({ ...p, pricing: { ...(p.pricing || {}), individualPrice: e.target.value } }))} />
                </div>
              )}
              <div>
                <label className="text-sm text-slate-600">Status</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={editCourse.status || "draft"} onChange={(e) => setEditCourse((p) => ({ ...p, status: e.target.value }))}>
                  <option value="draft">draft</option>
                  <option value="active">active</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg">Cancel</button>
              <button disabled={submitting} onClick={submitEdit} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50">{submitting ? "Saving..." : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
