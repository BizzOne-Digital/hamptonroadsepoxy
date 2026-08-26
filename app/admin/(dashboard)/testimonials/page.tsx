"use client";

import { useEffect, useState } from "react";
import { Trash2, Loader2, Plus, Pencil, X, Star } from "lucide-react";
import type { TestimonialDTO } from "@/types";

const emptyForm = { name: "", location: "", quote: "", rating: 5 };

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    const data = await res.json();
    setTestimonials(data.testimonials ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  function startCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function startEdit(t: TestimonialDTO) {
    setForm({ name: t.name, location: t.location, quote: t.quote, rating: t.rating });
    setEditingId(t._id);
    setShowForm(true);
    setError("");
  }

  async function handleSave() {
    setError("");
    if (!form.name.trim() || !form.quote.trim()) {
      setError("Name and quote are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(editingId ? `/api/admin/testimonials/${editingId}` : "/api/admin/testimonials", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, isDemo: false }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save testimonial");

      if (editingId) {
        setTestimonials((prev) => prev.map((t) => (t._id === editingId ? data.testimonial : t)));
      } else {
        setTestimonials((prev) => [data.testimonial, ...prev]);
      }
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    setBusyId(id);
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setTestimonials((prev) => prev.filter((t) => t._id !== id));
    setBusyId(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl text-forest">Testimonials</h1>
          <p className="text-charcoal/60 mt-1">Manage client testimonials shown on the homepage.</p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-full bg-forest text-ivory px-5 py-2.5 text-sm font-semibold hover:bg-[#0a1522]"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-cream p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-forest">{editingId ? "Edit Testimonial" : "New Testimonial"}</h2>
            <button onClick={() => setShowForm(false)} aria-label="Close form"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Name"
              className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <input
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              placeholder="Location (e.g. Norfolk, VA)"
              className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <textarea
            value={form.quote}
            onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
            placeholder="Testimonial quote"
            rows={4}
            className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <select
            value={form.rating}
            onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
            className="w-32 rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="self-start inline-flex items-center gap-2 rounded-full bg-gold text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#255cc4] disabled:opacity-60"
          >
            {saving && <Loader2 className="animate-spin" size={16} />}
            {editingId ? "Save Changes" : "Create Testimonial"}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-charcoal/50 flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Loading testimonials...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t._id} className="bg-white rounded-2xl border border-cream p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => startEdit(t)} aria-label="Edit" className="text-forest hover:text-gold">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => remove(t._id)}
                    disabled={busyId === t._id}
                    aria-label="Delete"
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-charcoal/70">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-forest">{t.name}</p>
                <p className="text-xs text-charcoal/50">{t.location}</p>
                {t.isDemo && (
                  <span className="inline-block mt-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    Demo Data
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
