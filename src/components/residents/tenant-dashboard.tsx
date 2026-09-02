"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TenantPublic } from "@/lib/tenant-types";
import type { AuthUser } from "@/components/residents/residents-client";
import { heroImage, siteConfig, siteImages } from "@/lib/site";

type TenantDashboardProps = {
  user: Extract<AuthUser, { role: "tenant" }>;
  onLogout: () => void;
};

export function TenantDashboard({ user, onLogout }: TenantDashboardProps) {
  const [tenant, setTenant] = useState<TenantPublic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tenant/me")
      .then((r) => r.json())
      .then((data) => setTenant(data.tenant ?? null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section
        className="relative isolate min-h-[44svh] overflow-hidden"
        data-nav="dark"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div aria-hidden className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt="" className="h-full w-full object-cover object-center" />
        </div>
        <div aria-hidden className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-black/25 to-black/60" />
        <div className="relative z-[2] mx-auto flex min-h-[44svh] max-w-5xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-label text-white backdrop-blur-sm">
                Tenant account
              </span>
              <h1 className="text-display-md text-white">Welcome back, {user.name.split(" ")[0]}.</h1>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-white/35 px-6 py-3 text-sm text-white hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
      </section>

      <div className="bg-paper px-5 pb-20 pt-10 sm:px-8 sm:pt-12" data-nav="light">
        <div className="mx-auto max-w-5xl">
          {loading ? (
            <p className="text-sm text-muted">Loading your details...</p>
          ) : tenant ? (
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <section className="overflow-hidden rounded-[1.25rem] border border-line bg-surface">
                <div className="relative aspect-[21/9] sm:aspect-[21/8]">
                  <Image src={siteImages.homes.living} alt="" fill unoptimized className="object-cover" sizes="700px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-label text-white/80 mb-2">Your rental</p>
                    <h2 className="font-display text-2xl text-white sm:text-3xl">{tenant.address}</h2>
                    <p className="mt-1 text-sm text-white/85">
                      {tenant.unit} · {tenant.neighbourhood}
                    </p>
                  </div>
                </div>
                <dl className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
                  <Info label="Lease start" value={tenant.leaseStart || "—"} />
                  <Info label="Rent" value={tenant.rent ? `$${tenant.rent.toLocaleString()} /mo` : "—"} />
                  <Info label="Phone on file" value={tenant.phone} />
                  <Info label="Emergency contact" value={tenant.emergencyContact || "—"} />
                  <Info label="Email" value={tenant.email} />
                </dl>
              </section>

              <div className="space-y-5">
                <section className="card-photo overflow-hidden bg-surface">
                  <div className="relative aspect-[16/10]">
                    <Image src={siteImages.homes.kitchen} alt="" fill unoptimized className="object-cover" sizes="400px" />
                  </div>
                  <div className="p-6 sm:p-7">
                    <h2 className="text-display-sm mb-3 text-2xl">Need something?</h2>
                    <p className="mb-6 text-sm leading-relaxed text-muted">
                      Submit maintenance or complaint requests. We respond quickly and keep you updated.
                    </p>
                    <Link
                      href="/request"
                      className="inline-block rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-surface hover:bg-ink/90"
                    >
                      Submit a request
                    </Link>
                  </div>
                </section>

                <section className="card-photo overflow-hidden bg-surface">
                  <div className="relative aspect-[16/10]">
                    <Image src={siteImages.homes.bedroom} alt="" fill unoptimized className="object-cover" sizes="400px" />
                    <div className="absolute inset-0 bg-ink/25" />
                  </div>
                  <div className="p-6 sm:p-7">
                    <h2 className="text-display-sm mb-3 text-2xl">Emergency</h2>
                    <p className="mb-4 text-sm leading-relaxed text-muted">
                      Floods, no heat, lockouts, or anything urgent. Call now.
                    </p>
                    <a href={`tel:${siteConfig.contact.emergencyPhone}`} className="text-sm font-medium link-underline">
                      {siteConfig.contact.emergencyPhone}
                    </a>
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">We could not load your account details.</p>
          )}
        </div>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-label text-muted mb-1">{label}</dt>
      <dd className="text-sm sm:text-base">{value}</dd>
    </div>
  );
}
