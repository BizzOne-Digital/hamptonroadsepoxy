"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Trash2, Loader2, Upload } from "lucide-react";
import type { GalleryItemDTO } from "@/types";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItemDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Metallic Epoxy");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleUpload() {
    setError("");
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Please choose an image first.");
      return;
    }
    if (!title.trim()) {
      setError("Please add a title for this image.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

      const createRes = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          imageUrl: uploadData.imageUrl,
          publicId: uploadData.publicId,
        }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.error || "Failed to save image");

      setItems((prev) => [createData.item, ...prev]);
      setTitle("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    setBusyId(id);
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i._id !== id));
    setBusyId(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl text-forest">Gallery</h1>
        <p className="text-charcoal/60 mt-1">Manage project photos shown on the website.</p>
      </div>

      <div className="bg-white rounded-2xl border border-cream p-6 flex flex-col gap-4">
        <h2 className="font-heading text-xl text-forest">Upload New Image</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image title"
            className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-forest/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option>Metallic Epoxy</option>
            <option>Quartz Epoxy</option>
            <option>Epoxy Flooring</option>
            <option>Commercial</option>
            <option>Residential</option>
          </select>
          <input ref={fileRef} type="file" accept="image/*" className="text-sm" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="self-start inline-flex items-center gap-2 rounded-full bg-forest text-ivory px-6 py-2.5 text-sm font-semibold hover:bg-[#0a1522] disabled:opacity-60"
        >
          {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {loading ? (
        <p className="text-charcoal/50 flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Loading gallery...</p>
      ) : items.length === 0 ? (
        <p className="text-charcoal/50">No gallery images yet. Upload your first one above.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl border border-cream overflow-hidden group">
              <div className="relative aspect-square">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
              </div>
              <div className="p-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-forest truncate">{item.title}</p>
                  <p className="text-xs text-charcoal/50 truncate">{item.category}</p>
                </div>
                <button
                  onClick={() => remove(item._id)}
                  disabled={busyId === item._id}
                  aria-label="Delete image"
                  className="text-red-500 hover:text-red-700 disabled:opacity-50 shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
