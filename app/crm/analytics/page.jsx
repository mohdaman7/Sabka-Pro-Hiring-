"use client";

import { useState } from "react";
import CRMLayout from "@/views/crm/CRMLayout";
import AnalyticsDashboard from "@/views/crm/analytics/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <CRMLayout>
      <AnalyticsDashboard />
    </CRMLayout>
  );
}
