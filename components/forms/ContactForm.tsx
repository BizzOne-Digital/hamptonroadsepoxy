"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

const inputClass =
  "w-full rounded-lg border border-forest/15 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 text-center flex flex-col items-center gap-4 shadow-sm border border-cream">
        <CheckCircle2 className="text-gold" size={40} />
        <h3 className="font-heading text-2xl text-forest">Message Sent!</h3>
        <p className="text-charcoal/70">
          Thanks for reaching out. We&apos;ll be in touch shortly. Need help
          right away? Call us at{" "}
          <a href={siteConfig.phoneHref} className="text-forest font-semibold">
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-cream flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-forest mb-1.5 block">Full Name</label>
          <input id="name" name="name" required className={inputClass} placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-forest mb-1.5 block">Phone</label>
          <input id="phone" name="phone" required className={inputClass} placeholder="(757) 000-0000" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-semibold text-forest mb-1.5 block">Email</label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@email.com" />
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-semibold text-forest mb-1.5 block">Service Interested In</label>
        <select id="service" name="service" required defaultValue="" className={inputClass}>
          <option value="" disabled>Select a service</option>
          <option value="Metallic Epoxy Flooring">Metallic Epoxy Flooring</option>
          <option value="Quartz Epoxy Flooring">Quartz Epoxy Flooring</option>
          <option value="Epoxy Flooring">Epoxy Flooring</option>
          <option value="Not Sure Yet">Not Sure Yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-forest mb-1.5 block">Tell Us About Your Project</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Garage floor, roughly 500 sq ft, looking for a metallic finish..."
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={status === "loading"} className="mt-2">
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={16} /> Sending...
          </>
        ) : (
          "Get a Free Quote"
        )}
      </Button>
    </form>
  );
}
