import CRMSidebar from "@/views/crm/CRMSidebar"
import CRMHeader from "@/views/crm/CRMHeader"

export default function CRMLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex">
      <CRMSidebar />
      <div className="flex-1 flex flex-col">
        <CRMHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
