import StudentHeader from "@/views/student/StudentHeader"
import StudentSidebar from "@/views/student/StudentSidebar"

export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex">
      <StudentSidebar />
      <div className="flex-1 flex flex-col">
        <StudentHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
