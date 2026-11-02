import type { Metadata } from "next";
import { BrandName } from "@/components/brand-name";
import { WifiField } from "@/components/stays/wifi-field";
import { withBasePath } from "@/lib/base-path";
import { buildMetadata } from "@/lib/seo/meta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("/wifi");

const wifi = {
  network: "BELL765",
  password: "994F4F225395",
};

export default function WifiPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-paper px-5 py-10 sm:py-16">
      <div className="w-full max-w-md">
        <p className="mb-6 text-center text-lg font-semibold tracking-tight text-ink">
          <BrandName />
        </p>

        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.12)] sm:p-8">
          <div className="text-center">
            <p className="pill-label mb-4">Welcome</p>
            <h1 className="text-display-md mb-3">Guest Wi-Fi</h1>
            <p className="text-[15px] leading-relaxed text-muted">
              Tap copy to grab the password, or scan the code from another device.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            <WifiField label="Network" value={wifi.network} />
            <WifiField
              label="Password"
              value={wifi.password}
              display={wifi.password.replace(/(.{4})(?=.)/g, "$1 ")}
              hint="No spaces. All letters are capitals."
            />
          </div>

          <div className="mt-7 flex flex-col items-center border-t border-line pt-7">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimization needed */}
            <img
              src={withBasePath("/stays/wifi-qr.svg")}
              alt={`QR code to join the ${wifi.network} Wi-Fi network`}
              width={176}
              height={176}
              className="h-44 w-44 rounded-xl border border-line"
            />
            <p className="mt-3 text-sm text-muted">Scan with your camera to join</p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Need anything during your stay?{" "}
          <a
            href={`tel:${siteConfig.nap.phoneTel}`}
            className="whitespace-nowrap font-medium text-ink underline underline-offset-4 hover:no-underline"
          >
            Call or text {siteConfig.nap.phoneDisplay}
          </a>
        </p>
      </div>
    </div>
  );
}
