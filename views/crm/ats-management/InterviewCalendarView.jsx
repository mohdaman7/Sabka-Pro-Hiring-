"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Video, MapPin, User, Briefcase } from "lucide-react";

const STATUS_COLORS = {
  scheduled: "bg-blue-500 border-blue-400",
  completed: "bg-green-500 border-green-400",
  "no-show": "bg-gray-500 border-gray-400",
  cancelled: "bg-red-500 border-red-400",
};

export default function InterviewCalendarView({ interviews, onInterviewClick, onCreateInterview }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // month, week, day

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, isCurrentMonth: true });
    }
    return days;
  };

  const getInterviewsForDate = (date) => {
    if (!date) return [];
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), date).toDateString();
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.scheduledDate).toDateString();
      return interviewDate === dateStr;
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-7 h-7 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Interview Calendar</h2>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-purple-500/20">
            {["month", "week", "day"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  view === v
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={() => onCreateInterview()}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-lg transition-all hover:scale-105"
          >
            + New Interview
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/20 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <h3 className="text-xl font-bold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/20 transition-all hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold text-white/70 text-sm py-2">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((day, index) => {
          const dayInterviews = day.date ? getInterviewsForDate(day.date) : [];
          const isToday =
            day.date &&
            day.isCurrentMonth &&
            day.date === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={index}
              className={`min-h-[120px] rounded-xl border p-2 transition-all ${
                day.isCurrentMonth
                  ? "bg-white/5 border-purple-500/20 hover:bg-white/10 hover:border-purple-500/40"
                  : "bg-white/[0.02] border-white/5 opacity-50"
              } ${isToday ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/20" : ""}`}
            >
              {day.date && (
                <>
                  <div className={`text-sm font-semibold mb-2 ${isToday ? "text-purple-400" : "text-white/70"}`}>
                    {day.date}
                  </div>
                  
                  {/* Interview Events */}
                  <div className="space-y-1">
                    {dayInterviews.slice(0, 3).map((interview, idx) => (
                      <button
                        key={interview._id || idx}
                        onClick={() => onInterviewClick(interview)}
                        className={`w-full text-left px-2 py-1 rounded-lg text-xs font-medium text-white border-l-2 transition-all hover:scale-105 ${
                          STATUS_COLORS[interview.status] || "bg-gray-500 border-gray-400"
                        }`}
                        title={`${interview.candidateName} - ${interview.jobTitle}`}
                      >
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="truncate">
                            {new Date(interview.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="truncate text-[10px] mt-0.5 opacity-90">
                          {interview.candidateName}
                        </div>
                      </button>
                    ))}
                    {dayInterviews.length > 3 && (
                      <div className="text-xs text-purple-400 font-semibold text-center py-1">
                        +{dayInterviews.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-purple-500/20">
        <span className="text-sm font-semibold text-white/70">Status:</span>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`}></div>
            <span className="text-xs text-white/60 capitalize">
              {status.replace("-", " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
