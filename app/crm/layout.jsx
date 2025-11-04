"use client";
import CRMSidebar from "@/views/crm/CRMSidebar";
import CRMHeader from "@/views/crm/CRMHeader";
import { useState, useEffect } from "react";

export default function CRMLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, keep sidebar open by default
      if (!mobile) {
        setSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen flex bg-transparent overflow-hidden">
      {/* CRM background gradient */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent" />
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
      </div>

      {/* Sidebar */}
      <CRMSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <CRMHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto p-3 sm:p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
