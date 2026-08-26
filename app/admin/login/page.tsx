"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-cream p-8">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center">
            <Lock className="text-gold" size={20} />
          </div>
          <h1 className="font-heading text-2xl text-forest">Admin Login</h1>
          <p className="text-charcoal/60 text-sm text-center">
            Hampton Roads Epoxy administration panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-forest mb-1.5 block">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-forest mb-1.5 block">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest text-ivory px-6 py-3 text-sm font-semibold hover:bg-[#0a1522] transition-colors disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} /> Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
