"use client";

import { useState } from "react";
import {
  X,
  Sparkles,
  Image,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  BookOpen,
  Tag,
  Monitor,
  BarChart3,
  Cog,
  Megaphone,
  Palette,
  Briefcase,
  FileText,
  CheckCircle2,
  Archive,
} from "lucide-react";

export default function CreateParentCourseModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    instructor: "",
    level: "Beginner",
    bundlePrice: 0,
    discountPercent: 0,
    status: "draft",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validation, setValidation] = useState({ title: "", bundlePrice: "" });
  const [activeSection, setActiveSection] = useState("basic");

  const handleSubmit = async () => {
    const v = { title: "", bundlePrice: "" };
    if (!formData.title.trim()) v.title = "Title is required";
    if (formData.bundlePrice < 0) v.bundlePrice = "Price cannot be negative";
    setValidation(v);
    if (v.title || v.bundlePrice) return;
    setLoading(true);
    setError("");
    try {
      // Replace with: await courseService.adminCreateParent(formData)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.();
      onClose();
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const finalPrice =
    formData.bundlePrice * (1 - formData.discountPercent / 100);

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Premium Header */}
        <div
          className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 px-8 py-6"
          style={{
            background:
              "linear-gradient(135deg, #803791 0%, #9d4ead 50%, #b857c9 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 40px), repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 40px)",
              }}
            ></div>
          </div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Create New Course
                </h2>
                <p className="text-purple-100 text-sm">
                  Build your next educational masterpiece
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="border-b border-slate-200 bg-slate-50/50 px-8">
          <div className="flex gap-1">
            {[
              { id: "basic", label: "Basic Info", icon: BookOpen },
              { id: "details", label: "Details", icon: Award },
              { id: "pricing", label: "Pricing", icon: DollarSign },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeSection === section.id
                    ? "border-b-2 bg-white"
                    : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-100/50"
                }`}
                style={
                  activeSection === section.id
                    ? { color: "#803791", borderColor: "#803791" }
                    : {}
                }
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
              <div className="bg-red-100 rounded-full p-1">
                <X className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-800">Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Basic Info Section */}
          {activeSection === "basic" && (
            <div className="space-y-6">
              <div
                className="border rounded-xl p-6"
                style={{
                  background:
                    "linear-gradient(135deg, #f8f4fa 0%, #f3eef7 100%)",
                  borderColor: "#e5d4ed",
                }}
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <BookOpen className="w-4 h-4" style={{ color: "#803791" }} />
                  Course Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 bg-white"
                  style={{ focusBorderColor: "#803791" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#803791";
                    e.target.style.boxShadow =
                      "0 0 0 4px rgba(128, 55, 145, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="e.g., Full Stack Development Bootcamp"
                />
                {validation.title && (
                  <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                    <span className="font-medium">⚠</span> {validation.title}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Users className="w-4 h-4 text-slate-600" />
                  Course Description
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none transition-all duration-200 resize-none"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#803791";
                    e.target.style.boxShadow =
                      "0 0 0 4px rgba(128, 55, 145, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Describe what students will learn and achieve..."
                />
                <p className="text-xs text-slate-500 mt-2">
                  {formData.description.length} characters
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Image className="w-4 h-4 text-slate-600" />
                  Course Thumbnail
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none transition-all duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#803791";
                    e.target.style.boxShadow =
                      "0 0 0 4px rgba(128, 55, 145, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.thumbnail && (
                  <div className="mt-4 relative group">
                    <img
                      src={formData.thumbnail}
                      alt="preview"
                      className="w-full h-48 object-cover rounded-xl border-2 border-slate-200 shadow-lg group-hover:shadow-xl transition-all duration-200"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                      <p className="text-white text-sm font-medium">Preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Details Section */}
          {activeSection === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <div className="p-1 rounded-lg bg-purple-50">
                      <Tag className="w-4 h-4" style={{ color: "#803791" }} />
                    </div>
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none transition-all duration-200 bg-white cursor-pointer appearance-none font-medium text-slate-700 shadow-sm hover:shadow-md"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23803791'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.25em 1.25em",
                        paddingRight: "3rem",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#803791";
                        e.target.style.boxShadow =
                          "0 0 0 4px rgba(128, 55, 145, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow =
                          "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
                      }}
                    >
                      <option value="" disabled style={{ color: "#94a3b8" }}>
                        Select a category...
                      </option>
                      <option
                        value="IT & Software"
                        style={{ color: "#1e293b", padding: "8px" }}
                      >
                        IT & Software
                      </option>
                      <option
                        value="Management"
                        style={{ color: "#1e293b", padding: "8px" }}
                      >
                        Management
                      </option>
                      <option
                        value="Engineering"
                        style={{ color: "#1e293b", padding: "8px" }}
                      >
                        Engineering
                      </option>
                      <option
                        value="Marketing"
                        style={{ color: "#1e293b", padding: "8px" }}
                      >
                        Marketing
                      </option>
                      <option
                        value="Design"
                        style={{ color: "#1e293b", padding: "8px" }}
                      >
                        Design
                      </option>
                      <option
                        value="Business"
                        style={{ color: "#1e293b", padding: "8px" }}
                      >
                        Business
                      </option>
                    </select>
                    {formData.category && (
                      <div
                        className="absolute right-12 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ background: "#803791" }}
                      ></div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <div className="p-1 rounded-lg bg-purple-50">
                      <Award className="w-4 h-4" style={{ color: "#803791" }} />
                    </div>
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Beginner", "Intermediate", "Advanced"].map(
                      (level, idx) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({ ...formData, level })}
                          className={`py-3 px-3 rounded-xl font-semibold text-sm transition-all duration-200 relative overflow-hidden ${
                            formData.level === level
                              ? "text-white shadow-lg transform scale-105"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-102 shadow-sm"
                          }`}
                          style={
                            formData.level === level
                              ? {
                                  background:
                                    "linear-gradient(135deg, #803791 0%, #9d4ead 100%)",
                                  boxShadow:
                                    "0 4px 12px rgba(128, 55, 145, 0.4)",
                                }
                              : {}
                          }
                        >
                          {formData.level === level && (
                            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                          )}
                          <span className="relative">{level}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <div className="p-1 rounded-lg bg-purple-50">
                    <Users className="w-4 h-4" style={{ color: "#803791" }} />
                  </div>
                  Instructor Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) =>
                      setFormData({ ...formData, instructor: e.target.value })
                    }
                    className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md font-medium text-slate-700"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#803791";
                      e.target.style.boxShadow =
                        "0 0 0 4px rgba(128, 55, 145, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow =
                        "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
                    }}
                    placeholder="e.g., Dr. Sarah Johnson"
                  />
                  {formData.instructor && (
                    <div
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-pulse"
                      style={{ background: "#803791" }}
                    ></div>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <div className="p-1 rounded-lg bg-purple-50">
                    <TrendingUp
                      className="w-4 h-4"
                      style={{ color: "#803791" }}
                    />
                  </div>
                  Publication Status
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      value: "draft",
                      label: "Draft",
                      icon: FileText,
                      desc: "Work in progress",
                      bgGradient: "from-slate-50 to-slate-100",
                      borderColor: "border-slate-300",
                      textColor: "text-slate-700",
                      activeBg: "bg-slate-200",
                      activeBorder: "border-slate-500",
                      iconColor: "#64748b",
                    },
                    {
                      value: "active",
                      label: "Active",
                      icon: CheckCircle2,
                      desc: "Live & published",
                      bgGradient: "from-green-50 to-emerald-100",
                      borderColor: "border-green-300",
                      textColor: "text-green-700",
                      activeBg: "bg-green-200",
                      activeBorder: "border-green-600",
                      iconColor: "#059669",
                    },
                    {
                      value: "archived",
                      label: "Archived",
                      icon: Archive,
                      desc: "Hidden from view",
                      bgGradient: "from-amber-50 to-yellow-100",
                      borderColor: "border-amber-300",
                      textColor: "text-amber-700",
                      activeBg: "bg-amber-200",
                      activeBorder: "border-amber-600",
                      iconColor: "#d97706",
                    },
                  ].map((status) => {
                    const IconComponent = status.icon;
                    return (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, status: status.value })
                        }
                        className={`relative py-4 px-4 rounded-xl font-semibold text-sm transition-all duration-200 border-2 bg-gradient-to-br ${
                          formData.status === status.value
                            ? `${status.activeBorder} ${status.activeBg} shadow-lg transform scale-105`
                            : `${status.borderColor} ${status.bgGradient} ${status.textColor} hover:shadow-md hover:scale-102`
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`p-2 rounded-lg ${
                              formData.status === status.value
                                ? "bg-white/50"
                                : "bg-white/70"
                            }`}
                          >
                            <IconComponent
                              className="w-6 h-6"
                              style={{ color: status.iconColor }}
                            />
                          </div>
                          <span className="font-bold">{status.label}</span>
                          <span className="text-xs opacity-75">
                            {status.desc}
                          </span>
                        </div>
                        {formData.status === status.value && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-current animate-pulse"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Pricing Section */}
          {activeSection === "pricing" && (
            <div className="space-y-6">
              <div
                className="border rounded-xl p-6"
                style={{
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                  borderColor: "#bbf7d0",
                }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      Bundle Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={formData.bundlePrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bundlePrice: Number(e.target.value),
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none transition-all duration-200 bg-white"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#10b981";
                          e.target.style.boxShadow =
                            "0 0 0 4px rgba(16, 185, 129, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e2e8f0";
                          e.target.style.boxShadow = "none";
                        }}
                        placeholder="0"
                      />
                    </div>
                    {validation.bundlePrice && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <span className="font-medium">⚠</span>{" "}
                        {validation.bundlePrice}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                      <Tag className="w-4 h-4 text-orange-600" />
                      Discount (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.discountPercent}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            discountPercent: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none transition-all duration-200 bg-white"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#f97316";
                          e.target.style.boxShadow =
                            "0 0 0 4px rgba(249, 115, 22, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e2e8f0";
                          e.target.style.boxShadow = "none";
                        }}
                        placeholder="0"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {formData.bundlePrice > 0 && (
                <div
                  className="rounded-xl p-6 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #803791 0%, #9d4ead 50%, #b857c9 100%)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Price Summary</h3>
                    <Sparkles className="w-5 h-5" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-100">Original Price</span>
                      <span className="text-xl font-bold">
                        ₹{formData.bundlePrice.toLocaleString()}
                      </span>
                    </div>

                    {formData.discountPercent > 0 && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-purple-100">
                            Discount ({formData.discountPercent}%)
                          </span>
                          <span className="text-lg font-semibold text-pink-200">
                            -₹
                            {(
                              (formData.bundlePrice *
                                formData.discountPercent) /
                              100
                            ).toLocaleString()}
                          </span>
                        </div>

                        <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                          <span className="text-lg font-semibold">
                            Final Price
                          </span>
                          <span className="text-3xl font-bold">
                            ₹{finalPrice.toLocaleString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {formData.discountPercent > 0 && (
                    <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-sm text-purple-50">
                        🎉 Students save ₹
                        {(
                          (formData.bundlePrice * formData.discountPercent) /
                          100
                        ).toLocaleString()}{" "}
                        with this offer!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Premium Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-8 py-5 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-medium">
              Step{" "}
              {activeSection === "basic"
                ? "1"
                : activeSection === "details"
                ? "2"
                : "3"}
            </span>{" "}
            of 3
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 font-medium"
            >
              Cancel
            </button>

            {activeSection !== "pricing" ? (
              <button
                type="button"
                onClick={() => {
                  if (activeSection === "basic") setActiveSection("details");
                  else if (activeSection === "details")
                    setActiveSection("pricing");
                }}
                className="px-6 py-2.5 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #803791 0%, #9d4ead 100%)",
                  boxShadow: "0 4px 12px rgba(128, 55, 145, 0.3)",
                }}
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-2.5 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Create Course
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
