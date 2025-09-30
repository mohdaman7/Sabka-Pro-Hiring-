import EmployerHeader from "@/views/employer/EmployerHeader"
import EmployerSidebar from "@/views/employer/EmployerSidebar"

export default function EmployerLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex">
      <EmployerSidebar />
      <div className="flex-1 flex flex-col">
        <EmployerHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
