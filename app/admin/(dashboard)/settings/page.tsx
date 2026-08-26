"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import type { SiteSettingDTO } from "@/types";

const emptyForm: SiteSettingDTO = {
  phone: "",
  email: "",
  address: "",
  businessName: "",
  ownerName: "",
  facebookUrl: "",
  instagramUrl: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettingDTO>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) {
        setForm({
          phone: data.settings.phone ?? "",
          email: data.settings.email ?? "",
          address: data.settings.address ?? "",
          businessName: data.settings.businessName ?? "",
          ownerName: data.settings.ownerName ?? "",
          facebookUrl: data.settings.facebookUrl ?? "",
          instagramUrl: data.settings.instagramUrl ?? "",
        });
      }
      setLoading(false);
    })();
  }, []);

  async function handleSave() {
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save settings");
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-charcoal/50 flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Loading settings...</p>;
  }

  const inputClass = "rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold";

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-3xl text-forest">Settings</h1>
        <p className="text-charcoal/60 mt-1">Business contact information used across the website.</p>
      </div>

      <div className="bg-white rounded-2xl border border-cream p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-forest">Business Name</label>
            <input value={form.businessName} onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-forest">Owner Name</label>
            <input value={form.ownerName} onChange={(e) => setForm((f) => ({ ...f, ownerName: e.target.value }))} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-forest">Phone</label>
            <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-forest">Email</label>
            <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputClass} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-forest">Service Area / Address</label>
          <input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-forest">Facebook URL (optional)</label>
            <input value={form.facebookUrl} onChange={(e) => setForm((f) => ({ ...f, facebookUrl: e.target.value }))} className={inputClass} placeholder="https://facebook.com/..." />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-forest">Instagram URL (optional)</label>
            <input value={form.instagramUrl} onChange={(e) => setForm((f) => ({ ...f, instagramUrl: e.target.value }))} className={inputClass} placeholder="https://instagram.com/..." />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && (
          <p className="text-sm text-emerald-700 flex items-center gap-2">
            <CheckCircle2 size={16} /> Settings saved successfully.
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="self-start inline-flex items-center gap-2 rounded-full bg-forest text-ivory px-6 py-2.5 text-sm font-semibold hover:bg-[#0a1522] disabled:opacity-60"
        >
          {saving && <Loader2 className="animate-spin" size={16} />}
          Save Settings
        </button>
      </div>
    </div>
  );
}
