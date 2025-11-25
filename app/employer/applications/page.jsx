"use client";

import { Suspense } from "react";
import EmployerApplication from "@/views/employer/EmployerApplications";

export default function EmployerApplicationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmployerApplication />
    </Suspense>
  );
}
