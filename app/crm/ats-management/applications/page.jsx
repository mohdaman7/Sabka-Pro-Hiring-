import { Suspense } from "react";
import ApplicationsModule from "@/views/crm/ats-management/ApplicationsModule";

export const metadata = {
  title: "Applications Management | ATS",
  description: "Track and manage all job applications",
};

export default function ApplicationsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Applications...</p>
        </div>
      </div>
    }>
      <ApplicationsModule />
    </Suspense>
  );
}
