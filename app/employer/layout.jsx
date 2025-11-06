"use client";

import { useState } from "react";
import EmployerSidebar from "@/views/employer/EmployerSidebar";
import EmployerHeader from "@/views/employer/EmployerHeader";

export default function EmployerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0118 0%, #1a0a2e 50%, #0a0118 100%)" }}>
      {/* Dark gradient background matching Interview Dashboard */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Sidebar - Hidden on mobile, overlay when open */}
      <div className="hidden lg:block flex-shrink-0 h-screen">
        <EmployerSidebar
          isOpen={false}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative">
            <EmployerSidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <EmployerHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto p-3 sm:p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
