// TEMPORARILY DISABLED - Redirecting to Coming Soon
// import EmployerDashboard from "@/views/employer/EmployerDashboard"
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployerPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/coming-soon");
  }, [router]);
  
  return null;
  
  // return <EmployerDashboard />
}
