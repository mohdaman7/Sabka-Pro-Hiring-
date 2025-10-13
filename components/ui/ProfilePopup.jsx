"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePopup({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || "User";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-xl transition-all hover:bg-white/10 hover:scale-105 group"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-2 transition-all group-hover:shadow-xl group-hover:ring-[#b87bd1]"
          style={{
            background: "linear-gradient(135deg,#803791,#b87bd1)",
            ringColor: "rgba(255,255,255,0.2)",
          }}
        >
          <span className="text-white font-semibold text-sm">
            {getInitials(user?.firstName, user?.lastName)}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl border border-white/10 backdrop-blur-xl z-50"
            style={{
              background:
                "linear-gradient(135deg, rgba(128,55,145,0.15), rgba(184,123,209,0.1))",
            }}
          >
            {/* User Info Section */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg ring-2"
                  style={{
                    background: "linear-gradient(135deg,#803791,#b87bd1)",
                    ringColor: "rgba(255,255,255,0.3)",
                  }}
                >
                  <span className="text-white font-semibold text-sm">
                    {getInitials(user?.firstName, user?.lastName)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {getUserName()}
                  </p>
                  <p className="text-white/60 text-xs truncate">
                    {user?.email}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {user?.role}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        user?.status === "active"
                          ? "bg-green-500/20 text-green-300"
                          : user?.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {user?.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/profile");
                }}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 group"
              >
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Profile</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/settings");
                }}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 group"
              >
                <Settings className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Settings</span>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-red-300 hover:text-red-100 hover:bg-red-500/20 transition-all duration-200 group mt-2 border-t border-white/10 pt-3"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
