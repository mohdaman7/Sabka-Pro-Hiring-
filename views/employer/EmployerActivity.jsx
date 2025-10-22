"use client";

import { useEffect, useState } from "react";
import { collabService } from "@/services/collabService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, MessageSquare, Settings, Calendar, ChevronRight } from "lucide-react";

const typeIcon = {
  team_member_added: Users,
  team_member_removed: Users,
  team_member_role_changed: Settings,
  candidate_note_added: MessageSquare,
  candidate_note_updated: MessageSquare,
  application_status_changed: FileText,
  interview_scheduled: Calendar,
  interview_rescheduled: Calendar,
  interview_cancelled: Calendar,
  job_posted: FileText,
  job_updated: FileText,
  job_status_changed: FileText,
  saved_view_created: Settings,
  saved_view_updated: Settings,
  saved_view_deleted: Settings,
};

function formatDate(d) {
  try { return new Date(d).toLocaleString(); } catch { return ""; }
}

export default function EmployerActivity() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await collabService.getActivity({ limit: 50 });
        setItems(res.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-xl">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Activity</h1>
          <p className="text-white/70 text-sm">Team and hiring timeline</p>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-white/70">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-white/60">No activity yet.</div>
          ) : (
            <div className="space-y-3">
              {items.map((a) => {
                const Icon = typeIcon[a.type] || ChevronRight;
                return (
                  <div key={a._id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20">
                          {a.type.replace(/_/g, " ")}
                        </Badge>
                        <span className="text-xs text-white/60">{formatDate(a.createdAt)}</span>
                      </div>
                      <div className="text-white/90 mt-1 text-sm">
                        {a.meta?.message || a.target?.label || ""}
                      </div>
                      <div className="text-white/50 text-xs">
                        by {a.actorId?.firstName} {a.actorId?.lastName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
