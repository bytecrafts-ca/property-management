"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TenantPublic } from "@/lib/tenant-types";
import type { AuthUser } from "@/components/residents/residents-client";
import { PageHero } from "@/components/page-hero";
import { heroImage, siteConfig, siteImages } from "@/lib/site";
import { getTenantById } from "@/lib/firebase/tenants";

type TenantDashboardProps = {
  user: Extract<AuthUser, { role: "tenant" }>;
  onLogout: () => void;
};

export function TenantDashboard({ user, onLogout }: TenantDashboardProps) {
  const [tenant, setTenant] = useState<TenantPublic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTenantById(user.id)
      .then((data) => setTenant(data))
      .finally(() => setLoading(false));
  }, [user.id]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("nav-theme-sync"));
  }, []);

  return (
    <>
      <PageHero
        badge="Tenant account"
        title={`Welcome back, ${user.name.split(" ")[0]}.`}
        image={heroImage}
        showScroll
      >
        <div className="mt-8 sm:mt-10">
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:px-8"
          >
            Sign out
          </button>
        </div>
      </PageHero>

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
