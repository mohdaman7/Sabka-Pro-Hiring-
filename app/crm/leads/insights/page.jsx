import dynamic from "next/dynamic";

const LeadsInsights = dynamic(() => import("@/views/crm/LeadsInsights"), {
  ssr: false,
});

export default function LeadsInsightsPage() {
  return <LeadsInsights />;
}
