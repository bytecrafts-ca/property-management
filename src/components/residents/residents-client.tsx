"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig, siteImages } from "@/lib/site";
import { watchAuthUser, signOutUser } from "@/lib/firebase/auth";
import { LoginPanel } from "@/components/residents/login-panel";
import { TenantDashboard } from "@/components/residents/tenant-dashboard";
import { AdminDashboard } from "@/components/residents/admin-dashboard";
import { ResidentsHero } from "@/components/residents/residents-hero";

gsap.registerPlugin(ScrollTrigger);

export type AuthUser =
  | { role: "admin" }
  | { role: "tenant"; id: string; email: string; name: string };

const actionCards = [
  {
    label: "Maintenance",
    title: "Submit a request",
    description: "Log in to view your unit and send maintenance or complaint requests.",
    href: "/request",
    image: siteImages.homes.kitchen,
  },
  {
    label: "Emergencies",
    title: "Need help now?",
    description: "Floods, no heat, lockouts. Call immediately. Do not wait on a form.",
    href: `tel:${siteConfig.contact.emergencyPhone}`,
    image: siteImages.homes.bedroom,
    external: true,
  },
  {
    label: "Homes",
    title: "Browse homes",
    description: "See homes we manage and place tenants in across the GTA.",
    href: "/properties",
    image: siteImages.homes.living,
  },
] as const;

export function ResidentsClient() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = watchAuthUser((nextUser) => {
        setUser(nextUser);
        setLoading(false);
      });
    } catch {
      setLoading(false);
    }
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user || loading) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll("[data-res-card]"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
          }
        );
      }
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.querySelectorAll("[data-gallery-item]"),
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: galleryRef.current, start: "top 80%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [user, loading]);

  async function handleLogout() {
    await signOutUser();
    setUser(null);
  }

  if (!loading && user?.role === "admin") {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (!loading && user?.role === "tenant") {
    return <TenantDashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <>
      <ResidentsHero onLogin={() => setLoginOpen(true)} />

      {!loading && (
        <>
      <section className="bg-surface px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto max-w-7xl">
          <span className="pill-label mb-6 inline-block">Tenant support</span>
          <h2 className="text-display-sm mb-12 max-w-2xl sm:mb-16">Everything you need, one place.</h2>

          <div ref={cardsRef} className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {actionCards.map((card) => {
              const inner = (
                <>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-4 text-label text-white/90">{card.label}</p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-xl sm:text-2xl">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
                  </div>
                </>
              );

              if ("external" in card && card.external) {
                return (
                  <a
                    key={card.label}
                    href={card.href}
                    data-res-card
                    className="group card-photo block overflow-hidden bg-paper"
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link
                  key={card.label}
                  href={card.href}
                  data-res-card
                  className="group card-photo block overflow-hidden bg-paper"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={galleryRef} className="border-t border-line bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div data-gallery-item className="card-photo relative aspect-[3/4]">
              <Image src={siteImages.homes.living} alt="" fill unoptimized className="object-cover" sizes="300px" />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div data-gallery-item className="card-photo relative aspect-[4/3] flex-1">
                <Image src={siteImages.homes.modern} alt="" fill unoptimized className="object-cover" sizes="300px" />
              </div>
              <div data-gallery-item className="card-photo relative aspect-[4/3] flex-1">
                <Image src={siteImages.homes.porch} alt="" fill unoptimized className="object-cover" sizes="300px" />
              </div>
            </div>
          </div>

          <div data-gallery-item>
            <span className="pill-label mb-6 inline-block">Why tenants stay</span>
            <h2 className="text-display-sm mb-6">Handled homes. Fast responses.</h2>
            <p className="prose-dek text-muted mb-6">{siteConfig.tenants.note}</p>
            <p className="mb-8 text-sm leading-relaxed text-muted sm:text-base">
              We manage the rental experience for the tenants living in our properties with the same care we give
              owners. When something breaks, you hear back quickly. When something urgent happens, you call and we
              move.
            </p>
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-surface hover:bg-ink/90"
            >
              Sign in to your account
            </button>
          </div>
        </div>
      </section>
        </>
      )}

      <LoginPanel
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={(nextUser) => {
          setUser(nextUser);
          setLoginOpen(false);
        }}
      />
    </>
  );
}
