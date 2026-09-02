import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createTenant, listTenants } from "@/lib/tenant-store";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const tenants = await listTenants();
  return NextResponse.json({ tenants });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const tenant = await createTenant({
      email: body.email ?? "",
      password: body.password ?? "",
      name: body.name ?? "",
      phone: body.phone ?? "",
      unit: body.unit ?? "",
      address: body.address ?? "",
      neighbourhood: body.neighbourhood ?? "",
      rent: body.rent ? Number(body.rent) : null,
      leaseStart: body.leaseStart ?? "",
      emergencyContact: body.emergencyContact ?? "",
      notes: body.notes ?? "",
    });
    return NextResponse.json({ tenant }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create tenant." },
      { status: 400 }
    );
  }
}
