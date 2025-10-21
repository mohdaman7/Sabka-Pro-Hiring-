import CRMSidebar from "@/views/crm/CRMSidebar";
import CRMHeader from "@/views/crm/CRMHeader";

export default function CRMLayout({ children }) {
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
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
          style={{ background: "rgba(240,194,238,0.03)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
      </div>

      {/* Sidebar - fixed and non-scrollable */}
      <div className="flex-shrink-0 h-screen">
        <CRMSidebar />
      </div>

      {/* Main content - scrollable area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <CRMHeader />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
