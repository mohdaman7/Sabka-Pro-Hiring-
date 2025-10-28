"use client";

import {
  BookOpen,
  FileText,
  ImageIcon,
  Tag,
  User,
  DollarSign,
} from "lucide-react";

export default function CourseOverviewTab({
  courseData,
  setCourseData,
  pricing,
  setPricing,
  isParent,
  isModule,
  editMode,
  modules,
  lessons,
  course,
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <label className="block text-sm font-bold text-white/80 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              Course Title
            </label>
            {editMode ? (
              <input
                type="text"
                value={courseData.title}
                onChange={(e) =>
                  setCourseData({ ...courseData, title: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter course title"
              />
            ) : (
              <h3 className="text-2xl font-black text-white">
                {courseData.title}
              </h3>
            )}
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <label className="block text-sm font-bold text-white/80 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Description
            </label>
            {editMode ? (
              <textarea
                rows={6}
                value={courseData.description}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter course description"
              />
            ) : (
              <p className="text-white/80 leading-relaxed">
                {courseData.description || "No description provided"}
              </p>
            )}
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <label className="block text-sm font-bold text-white/80 mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-pink-400" />
              Thumbnail
            </label>
            {editMode ? (
              <input
                type="url"
                value={courseData.thumbnail}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    thumbnail: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/image.jpg"
              />
            ) : courseData.thumbnail ? (
              <img
                src={courseData.thumbnail}
                alt={courseData.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-64 bg-slate-800/50 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-white/20" />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-400" />
              Course Info
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                  Category
                </label>
                {editMode ? (
                  <select
                    value={courseData.category}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        category: e.target.value,
                      })
                    }
                    className="w-full mt-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Category</option>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Management">Management</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                  </select>
                ) : (
                  <p className="text-white font-semibold mt-1">
                    {courseData.category || "Not set"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                  Level
                </label>
                {editMode ? (
                  <select
                    value={courseData.level}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        level: e.target.value,
                      })
                    }
                    className="w-full mt-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                ) : (
                  <p className="text-white font-semibold mt-1">
                    {courseData.level}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                  Instructor
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={courseData.instructor}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        instructor: e.target.value,
                      })
                    }
                    className="w-full mt-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Instructor name"
                  />
                ) : (
                  <p className="text-white font-semibold mt-1 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" />
                    {courseData.instructor || "Not set"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl p-6 border border-emerald-500/30">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Pricing
            </h4>
            <div className="space-y-4">
              {isParent ? (
                <>
                  <div>
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                      Bundle Price
                    </label>
                    {editMode ? (
                      <input
                        type="number"
                        min="0"
                        value={pricing.bundlePrice}
                        onChange={(e) =>
                          setPricing({
                            ...pricing,
                            bundlePrice: Number(e.target.value),
                          })
                        }
                        className="w-full mt-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <p className="text-2xl font-black text-white mt-1">
                        ₹{pricing.bundlePrice}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                      Discount
                    </label>
                    {editMode ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={pricing.discountPercent}
                        onChange={(e) =>
                          setPricing({
                            ...pricing,
                            discountPercent: Number(e.target.value),
                          })
                        }
                        className="w-full mt-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <p className="text-xl font-bold text-white mt-1">
                        {pricing.discountPercent}%
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                    Price
                  </label>
                  {editMode ? (
                    <input
                      type="number"
                      min="0"
                      value={pricing.individualPrice}
                      onChange={(e) =>
                        setPricing({
                          ...pricing,
                          individualPrice: Number(e.target.value),
                        })
                      }
                      className="w-full mt-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-2xl font-black text-white mt-1">
                      ₹{pricing.individualPrice}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-6 border border-amber-500/30">
            <h4 className="text-lg font-bold text-white mb-4">Stats</h4>
            <div className="space-y-3">
              {isParent && (
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-semibold">Modules</span>
                  <span className="text-white font-bold text-xl">
                    {modules.length}
                  </span>
                </div>
              )}
              {isModule && (
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-semibold">Lessons</span>
                  <span className="text-white font-bold text-xl">
                    {lessons.length}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-semibold">Students</span>
                <span className="text-white font-bold text-xl">
                  {course.enrolledCount || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
