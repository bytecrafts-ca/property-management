"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/site";

const inputClass =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-ink";

type LeadFormProps = {
  source?: string;
  heading?: string;
  subheading?: string;
};

export function LeadForm({
  source = "website",
  heading = "Get a free rental analysis",
  subheading = "Tell us about your Durham Region property. We will follow up with clear next steps.",
}: LeadFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      city: String(form.get("city") ?? ""),
      propertyType: String(form.get("propertyType") ?? ""),
      units: String(form.get("units") ?? ""),
      address: String(form.get("address") ?? ""),
      message: String(form.get("message") ?? ""),
      source,
    };

    try {
      const res = await fetch("/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Unable to send");
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Call us at 416-834-3587.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-8">
      <h2 className="text-display-sm mb-2 text-2xl sm:text-3xl">{heading}</h2>
      <p className="mb-8 text-sm leading-relaxed text-muted">{subheading}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-label text-muted mb-2 block">Full name</span>
          <input name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-label text-muted mb-2 block">Email</span>
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-label text-muted mb-2 block">Phone</span>
          <input name="phone" type="tel" required autoComplete="tel" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-label text-muted mb-2 block">City</span>
          <select name="city" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a city
            </option>
            {siteConfig.serviceAreaCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="block">
          <span className="text-label text-muted mb-2 block">Property type</span>
          <select name="propertyType" required className={inputClass} defaultValue="house">
            <option value="house">House</option>
            <option value="duplex">Duplex</option>
            <option value="condo">Condo unit</option>
            <option value="townhouse">Townhouse</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="block">
          <span className="text-label text-muted mb-2 block">Units</span>
          <input name="units" type="number" min={1} defaultValue={1} className={inputClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-label text-muted mb-2 block">Property address or neighbourhood</span>
          <input name="address" className={inputClass} placeholder="Neighbourhood is fine if you prefer" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-label text-muted mb-2 block">Message</span>
          <textarea
            name="message"
            rows={4}
            className={`${inputClass} resize-y`}
            placeholder="Current tenant status, vacancy, or what you want managed."
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-surface hover:bg-ink/90 disabled:opacity-60 sm:w-auto sm:px-8"
        data-cta="lead-form-submit"
      >
        {loading ? "Sending..." : "Request analysis"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        No pressure. We respond during business hours. Prefer a call?{" "}
        <a href="tel:4168343587" className="link-underline">
          416-834-3587
        </a>
      </p>
    </form>
  );
}
