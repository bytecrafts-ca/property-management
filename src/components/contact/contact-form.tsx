"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig, siteImages } from "@/lib/site";
import { submitContactForm } from "@/lib/firebase/contact";

const propertyTypes = [
  { value: "house", label: "House" },
  { value: "duplex", label: "Duplex" },
  { value: "condo", label: "Condo unit" },
  { value: "other", label: "Other" },
] as const;

const inputClass =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-ink";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState<(typeof propertyTypes)[number]["value"]>("house");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await submitContactForm({ name, email, phone, propertyType, address, message });
      setSent(true);
      setName("");
      setEmail("");
      setPhone("");
      setPropertyType("house");
      setAddress("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-[1.25rem] border border-line bg-surface p-8 sm:p-10">
        <span className="pill-label mb-4 inline-block">Message sent</span>
        <h2 className="text-display-sm mb-4 text-2xl sm:text-3xl">We will be in touch.</h2>
        <p className="prose-dek text-muted mb-8 max-w-md">
          Thanks for reaching out. We review every inquiry and follow up with clear next steps, usually within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="rounded-full border border-line px-6 py-3 text-sm hover:bg-soft"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
      <form onSubmit={handleSubmit} className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-8">
        <span className="pill-label mb-4 inline-block">Get a quote</span>
        <h2 className="text-display-sm mb-2 text-2xl sm:text-3xl">Tell us about your property</h2>
        <p className="mb-8 text-sm leading-relaxed text-muted">
          Share a few details and we will follow up with pricing and how we would manage the rental.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-label text-muted mb-2 block">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="text-label text-muted mb-2 block">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="text-label text-muted mb-2 block">Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="text-label text-muted mb-2 block">Property type</span>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as typeof propertyType)}
              className={inputClass}
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-label text-muted mb-2 block">Address or neighbourhood</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Leslieville, Toronto"
              className={inputClass}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-label text-muted mb-2 block">Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Tell us about the property, current tenant situation, and what you need managed."
              className={`${inputClass} resize-y`}
            />
          </label>
        </div>

        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-surface hover:bg-ink/90 disabled:opacity-60 sm:w-auto sm:px-8"
        >
          {loading ? "Sending..." : "Send message"}
        </button>
      </form>

      <div className="flex flex-col gap-5">
        <div className="card-photo relative aspect-[4/3] overflow-hidden">
          <Image src={siteImages.homes.living} alt="" fill unoptimized className="object-cover" sizes="500px" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-label text-white/80 mb-2">Greater Toronto Area</p>
            <p className="font-display text-xl text-white sm:text-2xl">Investors. Owners. One manager.</p>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-7">
          <p className="text-label text-muted mb-4">Direct contact</p>
          <div className="space-y-4 text-sm">
            <p>
              <span className="mb-1 block text-muted">Phone</span>
              <a href={`tel:${siteConfig.contact.phone}`} className="font-medium link-underline">
                {siteConfig.contact.phone}
              </a>
            </p>
            <p>
              <span className="mb-1 block text-muted">Email</span>
              <a href={`mailto:${siteConfig.contact.email}`} className="font-medium link-underline">
                {siteConfig.contact.email}
              </a>
            </p>
            <p>
              <span className="mb-1 block text-muted">Office</span>
              <span className="leading-relaxed">{siteConfig.contact.address}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
