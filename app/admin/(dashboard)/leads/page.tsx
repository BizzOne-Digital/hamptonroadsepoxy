"use client";

import { useEffect, useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import type { LeadDTO, LeadStatus } from "@/types";

const statuses: LeadStatus[] = ["new", "contacted", "quoted", "won", "lost"];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/leads");
    const data = await res.json();
    setLeads(data.leads ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function updateStatus(id: string, status: LeadStatus) {
    setBusyId(id);
    await fetch(`/api/admin/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    setBusyId(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    setBusyId(id);
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l._id !== id));
    setBusyId(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl text-forest">Leads</h1>
        <p className="text-charcoal/60 mt-1">Contact form submissions from the website.</p>
      </div>

      <div className="bg-white rounded-2xl border border-cream overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-cream text-forest text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Contact</th>
                <th className="text-left px-5 py-3">Service</th>
                <th className="text-left px-5 py-3">Message</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-charcoal/50">
                    <Loader2 className="animate-spin inline mr-2" size={16} /> Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-charcoal/50">No leads yet.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="align-top">
                    <td className="px-5 py-4 font-semibold text-forest whitespace-nowrap">{lead.name}</td>
                    <td className="px-5 py-4 text-charcoal/70">
                      <div>{lead.email}</div>
                      <div>{lead.phone}</div>
                    </td>
                    <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap">{lead.service}</td>
                    <td className="px-5 py-4 text-charcoal/70 max-w-xs">{lead.message}</td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        disabled={busyId === lead._id}
                        onChange={(e) => updateStatus(lead._id, e.target.value as LeadStatus)}
                        className="text-xs font-semibold rounded-md border border-cream px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <div className="mt-1"><StatusBadge status={lead.status} /></div>
                    </td>
                    <td className="px-5 py-4 text-charcoal/50 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => remove(lead._id)}
                        disabled={busyId === lead._id}
                        aria-label="Delete lead"
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
