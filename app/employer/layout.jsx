"use client"

import { useState } from "react"
import EmployerSidebar from "@/views/employer/EmployerSidebar"
import EmployerHeader from "@/views/employer/EmployerHeader"

export default function EmployerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <EmployerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:ml-64">
        <EmployerHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}