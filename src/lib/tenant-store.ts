import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { hashPassword } from "./auth";

export type TenantRecord = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone: string;
  unit: string;
  address: string;
  neighbourhood: string;
  rent: number | null;
  leaseStart: string;
  emergencyContact: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

import type { TenantPublic } from "./tenant-types";

export type { TenantPublic } from "./tenant-types";

export type TenantInput = {
  email: string;
  password?: string;
  name: string;
  phone: string;
  unit: string;
  address: string;
  neighbourhood: string;
  rent: number | null;
  leaseStart: string;
  emergencyContact: string;
  notes: string;
};

const storePath = path.join(process.cwd(), "content", "tenants.json");

async function ensureStore() {
  try {
    await fs.access(storePath);
  } catch {
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    await fs.writeFile(storePath, "[]", "utf8");
  }
}

async function readAll(): Promise<TenantRecord[]> {
  await ensureStore();
  const raw = await fs.readFile(storePath, "utf8");
  return JSON.parse(raw) as TenantRecord[];
}

async function writeAll(tenants: TenantRecord[]) {
  await fs.writeFile(storePath, JSON.stringify(tenants, null, 2), "utf8");
}

export function toPublic(tenant: TenantRecord): TenantPublic {
  const { passwordHash: _, ...rest } = tenant;
  return rest;
}

export async function listTenants(): Promise<TenantPublic[]> {
  const tenants = await readAll();
  return tenants.map(toPublic);
}

export async function getTenantById(id: string) {
  const tenants = await readAll();
  return tenants.find((t) => t.id === id) ?? null;
}

export async function getTenantByEmail(email: string) {
  const tenants = await readAll();
  return tenants.find((t) => t.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function createTenant(input: TenantInput) {
  const tenants = await readAll();
  if (tenants.some((t) => t.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("A tenant with this email already exists.");
  }
  if (!input.password) throw new Error("Password is required for new tenants.");

  const now = new Date().toISOString();
  const tenant: TenantRecord = {
    id: randomUUID(),
    email: input.email.trim().toLowerCase(),
    passwordHash: await hashPassword(input.password),
    name: input.name.trim(),
    phone: input.phone.trim(),
    unit: input.unit.trim(),
    address: input.address.trim(),
    neighbourhood: input.neighbourhood.trim(),
    rent: input.rent,
    leaseStart: input.leaseStart,
    emergencyContact: input.emergencyContact.trim(),
    notes: input.notes.trim(),
    createdAt: now,
    updatedAt: now,
  };

  tenants.push(tenant);
  await writeAll(tenants);
  return toPublic(tenant);
}

export async function updateTenant(id: string, input: Partial<TenantInput>) {
  const tenants = await readAll();
  const index = tenants.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Tenant not found.");

  const current = tenants[index];
  if (input.email && input.email.toLowerCase() !== current.email) {
    if (tenants.some((t) => t.email.toLowerCase() === input.email!.toLowerCase())) {
      throw new Error("A tenant with this email already exists.");
    }
  }

  const updated: TenantRecord = {
    ...current,
    email: input.email?.trim().toLowerCase() ?? current.email,
    name: input.name?.trim() ?? current.name,
    phone: input.phone?.trim() ?? current.phone,
    unit: input.unit?.trim() ?? current.unit,
    address: input.address?.trim() ?? current.address,
    neighbourhood: input.neighbourhood?.trim() ?? current.neighbourhood,
    rent: input.rent !== undefined ? input.rent : current.rent,
    leaseStart: input.leaseStart ?? current.leaseStart,
    emergencyContact: input.emergencyContact?.trim() ?? current.emergencyContact,
    notes: input.notes?.trim() ?? current.notes,
    updatedAt: new Date().toISOString(),
  };

  if (input.password) {
    updated.passwordHash = await hashPassword(input.password);
  }

  tenants[index] = updated;
  await writeAll(tenants);
  return toPublic(updated);
}

export async function deleteTenant(id: string) {
  const tenants = await readAll();
  const next = tenants.filter((t) => t.id !== id);
  if (next.length === tenants.length) throw new Error("Tenant not found.");
  await writeAll(next);
}
