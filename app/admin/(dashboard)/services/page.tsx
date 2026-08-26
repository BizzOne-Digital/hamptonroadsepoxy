"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Trash2, Loader2, Plus, Pencil, X, Upload } from "lucide-react";
import type { ServiceDTO, ServiceImageDTO } from "@/types";

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  features: "",
  order: 0,
  image: undefined as ServiceImageDTO | undefined,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setServices(data.services ?? []);
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

  function startEdit(service: ServiceDTO) {
    setForm({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      description: service.description,
      features: service.features.join("\n"),
      order: service.order,
      image: service.image,
    });
    setEditingId(service._id);
    setShowForm(true);
    setError("");
  }

  async function handleImageUpload() {
    setError("");
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Please choose an image first.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");
      setForm((f) => ({ ...f, image: { url: uploadData.imageUrl, publicId: uploadData.publicId } }));
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setError("");
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug,
      shortDescription: form.shortDescription,
      description: form.description,
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      order: Number(form.order) || 0,
      ...(form.image ? { image: form.image } : {}),
    };

    try {
      const res = await fetch(editingId ? `/api/admin/services/${editingId}` : "/api/admin/services", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save service");

      if (editingId) {
        setServices((prev) => prev.map((s) => (s._id === editingId ? data.service : s)));
      } else {
        setServices((prev) => [...prev, data.service]);
      }
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save service");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    setBusyId(id);
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s._id !== id));
    setBusyId(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl text-forest">Services</h1>
          <p className="text-charcoal/60 mt-1">Manage the flooring services listed on your website.</p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-full bg-forest text-ivory px-5 py-2.5 text-sm font-semibold hover:bg-[#0a1522]"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-cream p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-forest">{editingId ? "Edit Service" : "New Service"}</h2>
            <button onClick={() => setShowForm(false)} aria-label="Close form"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Title"
              className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="Slug (e.g. metallic-epoxy-flooring)"
              className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <textarea
            value={form.shortDescription}
            onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
            placeholder="Short description"
            rows={2}
            className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Full description"
            rows={4}
            className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <textarea
            value={form.features}
            onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
            placeholder="Features (one per line)"
            rows={4}
            className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
            placeholder="Display order"
            className="w-32 rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-forest">Service Image</h3>
            <div className="flex items-center gap-4">
              {form.image?.url && (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-cream shrink-0">
                  <Image src={form.image.url} alt="Service preview" fill className="object-cover" sizes="96px" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <input ref={fileRef} type="file" accept="image/*" className="text-sm" />
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={uploading}
                  className="self-start inline-flex items-center gap-2 rounded-full bg-forest/10 text-forest px-4 py-2 text-xs font-semibold hover:bg-forest/20 disabled:opacity-60"
                >
                  {uploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                  {uploading ? "Uploading..." : form.image?.url ? "Replace Image" : "Upload Image"}
                </button>
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="self-start inline-flex items-center gap-2 rounded-full bg-gold text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#255cc4] disabled:opacity-60"
          >
            {saving && <Loader2 className="animate-spin" size={16} />}
            {editingId ? "Save Changes" : "Create Service"}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-charcoal/50 flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-2xl border border-cream p-5 flex flex-col gap-3">
              {service.image?.url && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image src={service.image.url} alt={service.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
              )}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading text-lg text-forest">{service.title}</h3>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => startEdit(service)} aria-label="Edit" className="text-forest hover:text-gold">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => remove(service._id)}
                    disabled={busyId === service._id}
                    aria-label="Delete"
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-charcoal/50">/{service.slug}</p>
              <p className="text-sm text-charcoal/70">{service.shortDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
