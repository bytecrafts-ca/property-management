import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { deleteTenant, getTenantById, toPublic, updateTenant } from "@/lib/tenant-store";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const tenant = await getTenantById(id);
  if (!tenant) return NextResponse.json({ error: "Tenant not found." }, { status: 404 });
  return NextResponse.json({ tenant: toPublic(tenant) });
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const tenant = await updateTenant(id, {
      email: body.email,
      password: body.password || undefined,
      name: body.name,
      phone: body.phone,
      unit: body.unit,
      address: body.address,
      neighbourhood: body.neighbourhood,
      rent: body.rent !== undefined && body.rent !== "" ? Number(body.rent) : null,
      leaseStart: body.leaseStart,
      emergencyContact: body.emergencyContact,
      notes: body.notes,
    });
    return NextResponse.json({ tenant });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update tenant." },
      { status: 400 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteTenant(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete tenant." },
      { status: 400 }
    );
  }
}
