import { Suspense } from "react";
import ReportsModule from "@/views/crm/ats-management/ReportsModule";

export const metadata = {
  title: "ATS Reports & Analytics | ATS",
  description: "View comprehensive ATS analytics and insights",
};

export default function ReportsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Reports...</p>
        </div>
      </div>
    }>
      <ReportsModule />
    </Suspense>
  );
}
