"use client"

import { useState } from "react"
import { Search, Plus, Edit2, Trash2, Video, Eye, Lock } from "lucide-react"

export default function CourseManagement() {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalType, setModalType] = useState("course") // 'course' or 'category'

  // Mock data
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
      thumbnail: "/web-development-concept.png",
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
      thumbnail: "/project-management-teamwork.png",
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
      thumbnail: "/mechanical-engineering.jpg",
      access: "Pro",
      status: "Draft",
    },
  ]

  const handleAddNew = (type) => {
    setModalType(type)
    setShowAddModal(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Training Courses</h1>
          <p className="text-gray-400 mt-1">Manage courses, categories, and video content</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleAddNew("category")}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={() => handleAddNew("course")}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Course
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-700">
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "courses" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "categories" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "videos" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"
          }`}
        >
          Videos
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
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
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-500 transition-colors"
            >
              <div className="relative">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      course.access === "Pro" ? "bg-cyan-600 text-white" : "bg-gray-600 text-white"
                    }`}
                  >
                    {course.access === "Pro" && <Lock className="w-3 h-3 inline mr-1" />}
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
                  <h3 className="text-white font-semibold text-lg">{course.title}</h3>
                  <p className="text-gray-400 text-sm">{course.category}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    {course.videos} videos
                  </span>
                  <span>{course.duration}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Avg. Completion</span>
                    <span className="text-white font-medium">{course.completion}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${course.completion}%` }} />
                  </div>
                </div>
                <div className="text-sm text-gray-400">{course.enrolled} students enrolled</div>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
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
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-500 transition-colors"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{category.courses} courses</p>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
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
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Video Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Access
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
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
                  <tr key={video.id} className="hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Video className="w-5 h-5 text-cyan-400" />
                        <span className="text-white font-medium">{video.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{video.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{video.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{video.views.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-cyan-600 text-white rounded text-xs font-medium flex items-center gap-1 w-fit">
                        <Lock className="w-3 h-3" />
                        {video.access}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition-colors">
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
