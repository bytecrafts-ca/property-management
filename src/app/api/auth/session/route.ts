import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getSession,
  verifyAdminLogin,
  verifyPassword,
  signSession,
  sessionCookieOptions,
  SESSION_COOKIE,
} from "@/lib/auth";
import { getTenantByEmail } from "@/lib/tenant-store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    if (verifyAdminLogin(email, password)) {
      const token = signSession({ role: "admin" });
      const jar = await cookies();
      jar.set(sessionCookieOptions(token));
      return NextResponse.json({ user: { role: "admin" } });
    }

    const tenant = await getTenantByEmail(email);
    if (!tenant || !(await verifyPassword(password, tenant.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = signSession({
      role: "tenant",
      id: tenant.id,
      email: tenant.email,
      name: tenant.name,
    });
    const jar = await cookies();
    jar.set(sessionCookieOptions(token));
    return NextResponse.json({
      user: { role: "tenant", id: tenant.id, email: tenant.email, name: tenant.name },
    });
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });
  return NextResponse.json({ user: session });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
