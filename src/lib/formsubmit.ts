import { siteConfig } from "@/lib/site";

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${siteConfig.nap.email}`;

export async function submitViaFormSubmit(payload: Record<string, string>) {
  const res = await fetch(FORMSUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!res.ok) {
    throw new Error("FormSubmit request failed");
  }

  return res.json().catch(() => ({ ok: true }));
}
