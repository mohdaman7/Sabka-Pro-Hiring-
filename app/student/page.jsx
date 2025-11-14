"use client";
// import StudentDashboard from "@/views/student/StudentDashboard";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/coming-soon");
  }, [router]);

  return null;

  // return <StudentDashboard />;
}
