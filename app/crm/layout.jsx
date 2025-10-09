import CRMSidebar from "@/views/crm/CRMSidebar";
import CRMHeader from "@/views/crm/CRMHeader";

export default function CRMLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#803791]/8 via-[#b87bd1]/6 to-transparent flex">
      <CRMSidebar />
      <div className="flex-1 flex flex-col">
        <CRMHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
