"use client"

import { useState, useRef } from "react"
import {
  Video,
  Upload,
  Play,
  Trash2,
  Check,
  Clock,
  Camera,
  FileVideo,
  Sparkles,
  AlertCircle,
  Share2,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function VideoResumePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedVideos, setRecordedVideos] = useState([
    {
      id: 1,
      title: "Introduction Video",
      duration: "2:34",
      uploadDate: "2024-01-15",
      status: "active",
      thumbnail: "/videoresume.jpg",
      views: 127,
      size: "24.5 MB",
    },
  ])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop logic here
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleDelete = (id) => {
    setRecordedVideos(recordedVideos.filter((video) => video.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Stand out with video
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">Create Your Video Resume</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            Make a lasting impression on employers with a professional video resume. Showcase your personality, skills,
            and passion in a way that text alone cannot.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upload/Record Section */}
          <Card className="p-8 bg-white shadow-lg border-0 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Record or Upload</h2>
            </div>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? "border-purple-500 bg-purple-50 scale-105"
                  : "border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-50/50"
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900 mb-2">Drag and drop your video here</p>
                  <p className="text-sm text-slate-500 mb-4">or click to browse files</p>
                  <p className="text-xs text-slate-400">Supports MP4, MOV, AVI (Max 100MB)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    // Handle file upload
                  }}
                />
                <Button
                  onClick={handleFileSelect}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>

            {/* Record Button */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <Button
                onClick={() => setIsRecording(!isRecording)}
                variant={isRecording ? "destructive" : "outline"}
                className={`w-full py-6 rounded-xl font-semibold transition-all duration-300 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                    : "border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                {isRecording ? (
                  <>
                    <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Tips Section */}
          <Card className="p-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg border-0 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Pro Tips</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Clock,
                  title: "Keep it concise",
                  description: "Aim for 60-90 seconds. Employers appreciate brevity.",
                },
                {
                  icon: Camera,
                  title: "Good lighting matters",
                  description: "Face a window or use soft lighting for a professional look.",
                },
                {
                  icon: FileVideo,
                  title: "Practice makes perfect",
                  description: "Rehearse your script before recording to sound natural.",
                },
                {
                  icon: Check,
                  title: "Dress professionally",
                  description: "Wear what you'd wear to an interview.",
                },
              ].map((tip, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <tip.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{tip.title}</h3>
                    <p className="text-sm text-white/80">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/90">
                  <strong>Remember:</strong> Your video resume complements your traditional resume. Highlight your
                  unique personality and passion for your field.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* My Video Resumes Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-1">My Video Resumes</h2>
              <p className="text-sm text-slate-500">Manage and share your professional video presentations</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
              <Video className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">
                {recordedVideos.length} {recordedVideos.length === 1 ? "video" : "videos"}
              </span>
            </div>
          </div>

          {recordedVideos.length === 0 ? (
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-purple-50 border-2 border-dashed border-slate-200 rounded-2xl">
              <div className="p-16 text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl">
                    <Video className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-yellow-900" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">No video resumes yet</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                  Start creating your professional video resume to stand out from the crowd and make a memorable
                  impression on employers.
                </p>
                <Button
                  onClick={handleFileSelect}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Your First Video
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordedVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Thumbnail Section */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Play Button */}
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group-hover:bg-purple-600">
                        <Play className="w-10 h-10 text-purple-600 group-hover:text-white ml-1 transition-colors duration-300" />
                      </div>
                    </button>

                    {/* Status Badge */}
                    {video.status === "active" && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Active
                      </div>
                    )}

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {video.duration}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 mb-3 text-xl leading-tight group-hover:text-purple-600 transition-colors duration-300">
                      {video.title}
                    </h3>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{video.views} views</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <FileVideo className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{video.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-5">
                      <span className="font-medium">
                        Uploaded{" "}
                        {new Date(video.uploadDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <Play className="w-4 h-4 mr-1.5" />
                        Watch
                      </Button>
                      <Button
                        size="sm"
                        className="px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 border-2 border-blue-200 hover:border-blue-300 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border-2 border-red-200 hover:border-red-300 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                        onClick={() => handleDelete(video.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-300 transition-colors duration-300 pointer-events-none" />
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* What to Include Section */}
        <Card className="p-8 bg-white shadow-lg border-0 rounded-2xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What to Include in Your Video Resume</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Introduction",
                description: "Start with your name, current role or status, and what you're looking for.",
                color: "purple",
              },
              {
                title: "Key Skills",
                description: "Highlight 3-4 relevant skills with brief examples of how you've used them.",
                color: "blue",
              },
              {
                title: "Call to Action",
                description: "End with enthusiasm and invite employers to connect with you.",
                color: "cyan",
              },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-300">
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
