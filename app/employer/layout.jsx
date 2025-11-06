"use client";

import { useState } from "react";
import EmployerSidebar from "@/views/employer/EmployerSidebar";
import EmployerHeader from "@/views/employer/EmployerHeader";

export default function EmployerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-transparent overflow-hidden">
      {/* Shared employer background (matching student theme) */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
          style={{ background: "rgba(240,194,238,0.03)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
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
