import { Suspense } from "react";
import InterviewsModule from "@/views/crm/ats-management/InterviewsModule";

export const metadata = {
  title: "Interview Scheduler | ATS",
  description: "Schedule and manage candidate interviews",
};

export default function InterviewsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Interviews...</p>
        </div>
      </div>
    }>
      <InterviewsModule />
    </Suspense>
  );
}
