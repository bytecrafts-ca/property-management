import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LenisProvider } from "@/components/lenis-provider";
import { IntroProvider } from "@/components/intro-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${siteConfig.fullName} | ${siteConfig.market}`,
  description: siteConfig.tagline,
  metadataBase: new URL(siteConfig.domain),
  verification: siteConfig.gscVerification ? { google: siteConfig.gscVerification } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} lenis`}>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <LenisProvider>
          <IntroProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
          </IntroProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
