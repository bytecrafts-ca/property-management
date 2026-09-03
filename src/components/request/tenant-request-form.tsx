"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, siteImages } from "@/lib/site";
import { submitTenantRequest } from "@/lib/firebase/tenant-requests";

const requestTypes = [
  { value: "maintenance", label: "Maintenance / repair" },
  { value: "complaint", label: "Complaint" },
  { value: "appliance", label: "Appliance issue" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "heating", label: "Heat / AC" },
  { value: "other", label: "Other" },
] as const;

const urgencyLevels = [
  { value: "routine", label: "Routine" },
  { value: "soon", label: "Needs attention soon" },
  { value: "urgent", label: "Urgent (but not emergency)" },
] as const;

const inputClass =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors focus:border-ink";

export function TenantRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [unit, setUnit] = useState("");
  const [requestType, setRequestType] = useState<(typeof requestTypes)[number]["value"]>("maintenance");
  const [urgency, setUrgency] = useState<(typeof urgencyLevels)[number]["value"]>("routine");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await submitTenantRequest({ name, email, phone, unit, requestType, urgency, message });
      setSent(true);
      setName("");
      setEmail("");
      setPhone("");
      setUnit("");
      setRequestType("maintenance");
      setUrgency("routine");
      setMessage("");
    } catch {
      setError("Something went wrong. Call us if this is urgent.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-[1.25rem] border border-line bg-surface p-8 sm:p-10">
        <span className="pill-label mb-4 inline-block">Request received</span>
        <h2 className="text-display-sm mb-4 text-2xl sm:text-3xl">We have your request.</h2>
        <p className="prose-dek text-muted mb-8 max-w-md">
          Our team will follow up. If heat, water, flooding, or lockouts are involved, call now instead of waiting on
          email.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.contact.emergencyPhone.replace(/\D/g, "")}`}
            className="rounded-full bg-ink px-6 py-3 text-center text-sm text-surface hover:bg-ink/90"
          >
            Call {siteConfig.contact.emergencyPhone}
          </a>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="rounded-full border border-line px-6 py-3 text-sm hover:bg-soft"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
      <form onSubmit={handleSubmit} className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-8">
        <span className="pill-label mb-4 inline-block">Tenant request</span>
        <h2 className="text-display-sm mb-2 text-2xl sm:text-3xl">Tell us what needs attention</h2>
        <p className="mb-8 text-sm leading-relaxed text-muted">
          Maintenance, complaints, and unit issues. Clear details help us dispatch the right fix faster.
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
            <span className="text-label text-muted mb-2 block">Unit / address</span>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              placeholder="Building, unit, or street"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="text-label text-muted mb-2 block">Request type</span>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value as typeof requestType)}
              className={inputClass}
            >
              {requestTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-label text-muted mb-2 block">Urgency</span>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as typeof urgency)}
              className={inputClass}
            >
              {urgencyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-label text-muted mb-2 block">What is going on?</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Describe the issue, when it started, and any access notes."
              className={`${inputClass} resize-y`}
            />
          </label>
        </div>

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-surface hover:bg-ink/90 disabled:opacity-60 sm:w-auto sm:px-8"
        >
          {loading ? "Sending..." : "Submit request"}
        </button>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Already a portal tenant?{" "}
          <Link href="/residents" className="link-underline">
            Sign in here
          </Link>
          .
        </p>
      </form>

      <div className="flex flex-col gap-5">
        <div className="card-photo relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[280px]">
          <Image
            src={siteImages.homes.living}
            alt="Well maintained rental home interior"
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-label mb-2 text-white/80">Response path</p>
            <p className="font-display text-xl text-white sm:text-2xl">We handle it so owners stay out of the ticket.</p>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-7">
          <p className="text-label text-muted mb-3">Emergencies</p>
          <p className="mb-5 text-sm leading-relaxed text-muted">
            Flooding, no heat, no water, gas smell, or lockouts. Do not wait on this form.
          </p>
          <a
            href={`tel:${siteConfig.contact.emergencyPhone.replace(/\D/g, "")}`}
            className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface hover:bg-ink/90"
          >
            Call {siteConfig.contact.emergencyPhone}
          </a>
        </div>

        <div className="rounded-[1.25rem] border border-line bg-soft p-6 sm:p-7">
          <p className="text-label text-muted mb-3">What happens next</p>
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            <li>We review the request and urgency.</li>
            <li>We follow up with next steps or a vendor visit.</li>
            <li>Owners stay informed when spend or access is needed.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
