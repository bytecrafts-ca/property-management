import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StickyCallBar } from "@/components/sticky-call-bar";
import { LenisProvider } from "@/components/lenis-provider";
import { IntroProvider } from "@/components/intro-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/meta";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  ...buildMetadata("/"),
  metadataBase: new URL(siteConfig.domain),
  verification: siteConfig.gscVerification ? { google: siteConfig.gscVerification } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} lenis`}>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-surface"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <LenisProvider>
          <IntroProvider>
            <Nav />
            <main id="main-content">{children}</main>
            <Footer />
            <StickyCallBar />
          </IntroProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
