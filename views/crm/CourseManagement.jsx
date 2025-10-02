"use client"

import { useState } from "react"
import { Search, Plus, Edit2, Trash2, Video, Eye, Lock } from "lucide-react"

export default function CourseManagement() {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalType, setModalType] = useState("course")

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

  const handleAddNew = (type) => {
    setModalType(type)
    setShowAddModal(true)
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
          {filteredCourses.map((course) => (
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
    </div>
  )
}
