"use client";

import { useEffect, useState } from "react";
import { collabService } from "@/services/collabService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, Mail, Trash2, Shield, CheckCircle, Clock } from "lucide-react";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "hiring_manager", label: "Hiring Manager" },
  { value: "recruiter", label: "Recruiter" },
  { value: "viewer", label: "Viewer" },
];

export default function EmployerTeam() {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("recruiter");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await collabService.getTeam();
      setTeam(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const invite = async () => {
    try {
      await collabService.inviteMember(inviteEmail, inviteRole);
      setInviteEmail("");
      setInviteRole("recruiter");
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to invite");
    }
  };

  const updateRole = async (invitedEmail, role) => {
    try {
      await collabService.updateMember(invitedEmail, { role });
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to update role");
    }
  };

  const remove = async (invitedEmail) => {
    try {
      await collabService.removeMember(invitedEmail);
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to remove member");
    }
  };

  return (
    <div className="p-4 sm:p-5 md:p-6 max-w-5xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#803791] to-[#b87bd1] shadow-xl">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl font-bold text-white">Team</h1>
          <p className="text-white/70 text-sm">Manage members and roles</p>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Invite Member</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="email@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="bg-transparent text-white placeholder:text-white/60"
          />
          <Select value={inviteRole} onValueChange={setInviteRole}>
            <SelectTrigger className="w-full sm:w-52 text-white">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={invite} className="bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white">
            <Plus className="w-4 h-4 mr-2" /> Invite
          </Button>
        </CardContent>
      </Card>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300">{error}</div>
      )}

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!team || loading ? (
            <div className="text-white/70">Loading...</div>
          ) : (
            <div className="divide-y divide-white/10">
              {(team.members || []).map((m, idx) => (
                <div key={idx} className="py-3 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">
                      {m.userId?.email || m.invitedEmail}
                    </div>
                    <div className="text-xs text-white/60 flex items-center gap-2">
                      {m.status === "active" ? (
                        <><CheckCircle className="w-3 h-3" /> Active</>
                      ) : m.status === "invited" ? (
                        <><Clock className="w-3 h-3" /> Invited</>
                      ) : (
                        <span>Removed</span>
                      )}
                    </div>
                  </div>
                  <div className="w-48">
                    {m.role === "owner" ? (
                      <div className="text-xs text-white/80 flex items-center gap-1"><Shield className="w-4 h-4" /> Owner</div>
                    ) : (
                      <Select value={m.role} onValueChange={(val) => updateRole(m.invitedEmail || m.userId?._id, val)}>
                        <SelectTrigger className="text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((r) => (
                            <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  {m.role !== "owner" && (
                    <Button variant="ghost" className="text-red-300" onClick={() => remove(m.invitedEmail || m.userId?._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
