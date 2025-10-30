import dynamic from "next/dynamic";

const LeadsKanban = dynamic(() => import("@/views/crm/LeadsKanban"), {
  ssr: false,
});

export default function LeadsKanbanPage() {
  return <LeadsKanban />;
}
