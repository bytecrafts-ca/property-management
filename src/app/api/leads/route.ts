import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  propertyType?: string;
  units?: string;
  address?: string;
  message?: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    if (!body.name || !body.email || !body.phone || !body.city) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const lead = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    const dir = path.join(process.cwd(), "content");
    const file = path.join(dir, "leads.json");
    await fs.mkdir(dir, { recursive: true });

    let existing: unknown[] = [];
    try {
      existing = JSON.parse(await fs.readFile(file, "utf8")) as unknown[];
    } catch {
      existing = [];
    }

    existing.push(lead);
    await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to save lead." }, { status: 500 });
  }
}
