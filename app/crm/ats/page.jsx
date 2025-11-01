import { Suspense } from "react";
import ATSManagement from "@/views/crm/ATSManagement";

export const metadata = {
  title: "ATS - Applicant Tracking System | CRM",
  description:
    "Manage resumes, job postings, and candidate search with AI-powered ATS",
};

export default function ATSPage() {
  return (
    <Suspense
      fallback={<div className="p-6 text-white/70">Loading ATS...</div>}
    >
      <ATSManagement />
    </Suspense>
  );
}
