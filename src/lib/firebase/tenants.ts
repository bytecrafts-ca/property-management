"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, type UserCredential } from "firebase/auth";
import { deleteApp, initializeApp } from "firebase/app";
import type { TenantPublic } from "@/lib/tenant-types";
import { firebaseConfig } from "./config";
import { getFirebaseDb } from "./client";
import { PM_ROLES_COLLECTION, PM_TENANTS_COLLECTION } from "./collections";
import { sendTenantPasswordReset } from "./auth";

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

function toTenantPublic(id: string, data: Record<string, unknown>): TenantPublic {
  return {
    id,
    email: String(data.email ?? ""),
    name: String(data.name ?? ""),
    phone: String(data.phone ?? ""),
    unit: String(data.unit ?? ""),
    address: String(data.address ?? ""),
    neighbourhood: String(data.neighbourhood ?? ""),
    rent: typeof data.rent === "number" ? data.rent : data.rent ? Number(data.rent) : null,
    leaseStart: String(data.leaseStart ?? ""),
    emergencyContact: String(data.emergencyContact ?? ""),
    notes: String(data.notes ?? ""),
    createdAt: String(data.createdAt ?? ""),
    updatedAt: String(data.updatedAt ?? ""),
  };
}

function tenantPayload(input: TenantInput) {
  return {
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    unit: input.unit.trim(),
    address: input.address.trim(),
    neighbourhood: input.neighbourhood.trim(),
    rent: input.rent,
    leaseStart: input.leaseStart,
    emergencyContact: input.emergencyContact.trim(),
    notes: input.notes.trim(),
    updatedAt: new Date().toISOString(),
  };
}

async function createAuthUser(email: string, password: string): Promise<UserCredential> {
  const appName = `tenant-create-${Date.now()}`;
  const secondaryApp = initializeApp(firebaseConfig, appName);
  const secondaryAuth = getAuth(secondaryApp);

  try {
    return await createUserWithEmailAndPassword(secondaryAuth, email.trim().toLowerCase(), password);
  } finally {
    await deleteApp(secondaryApp);
  }
}

export async function listTenants(): Promise<TenantPublic[]> {
  const snap = await getDocs(collection(getFirebaseDb(), PM_TENANTS_COLLECTION));
  return snap.docs.map((entry) => toTenantPublic(entry.id, entry.data()));
}

export async function getTenantById(id: string): Promise<TenantPublic | null> {
  const snap = await getDoc(doc(getFirebaseDb(), PM_TENANTS_COLLECTION, id));
  if (!snap.exists()) return null;
  return toTenantPublic(snap.id, snap.data());
}

export async function createTenant(input: TenantInput): Promise<TenantPublic> {
  if (!input.password) throw new Error("Password is required for new tenants.");

  const credential = await createAuthUser(input.email, input.password);
  const uid = credential.user.uid;
  const now = new Date().toISOString();

  await setDoc(doc(getFirebaseDb(), PM_TENANTS_COLLECTION, uid), {
    ...tenantPayload(input),
    createdAt: now,
    updatedAt: now,
  });

  await setDoc(doc(getFirebaseDb(), PM_ROLES_COLLECTION, uid), { role: "tenant" });

  const created = await getTenantById(uid);
  if (!created) throw new Error("Unable to create tenant.");
  return created;
}

export async function updateTenant(id: string, input: Partial<TenantInput>): Promise<TenantPublic> {
  const current = await getTenantById(id);
  if (!current) throw new Error("Tenant not found.");

  const next: TenantInput = {
    email: input.email ?? current.email,
    password: input.password,
    name: input.name ?? current.name,
    phone: input.phone ?? current.phone,
    unit: input.unit ?? current.unit,
    address: input.address ?? current.address,
    neighbourhood: input.neighbourhood ?? current.neighbourhood,
    rent: input.rent !== undefined ? input.rent : current.rent,
    leaseStart: input.leaseStart ?? current.leaseStart,
    emergencyContact: input.emergencyContact ?? current.emergencyContact,
    notes: input.notes ?? current.notes,
  };

  await updateDoc(doc(getFirebaseDb(), PM_TENANTS_COLLECTION, id), tenantPayload(next));

  if (input.password) {
    await sendTenantPasswordReset(next.email);
  }

  const updated = await getTenantById(id);
  if (!updated) throw new Error("Unable to update tenant.");
  return updated;
}

export async function deleteTenant(id: string): Promise<void> {
  await deleteDoc(doc(getFirebaseDb(), PM_TENANTS_COLLECTION, id));
  await deleteDoc(doc(getFirebaseDb(), PM_ROLES_COLLECTION, id));
}
