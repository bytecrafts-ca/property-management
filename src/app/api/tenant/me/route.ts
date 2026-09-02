import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getTenantById, toPublic } from "@/lib/tenant-store";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "tenant") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const tenant = await getTenantById(session.id);
  if (!tenant) return NextResponse.json({ error: "Tenant not found." }, { status: 404 });
  return NextResponse.json({ tenant: toPublic(tenant) });
}
