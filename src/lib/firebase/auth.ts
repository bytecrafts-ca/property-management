"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import type { AuthUser } from "@/components/residents/residents-client";
import { getFirebaseAuth, getFirebaseDb } from "./client";
import { PM_ROLES_COLLECTION, PM_TENANTS_COLLECTION } from "./collections";

export type UserRole = "admin" | "tenant";

export async function getUserRole(uid: string): Promise<UserRole | null> {
  const snap = await getDoc(doc(getFirebaseDb(), PM_ROLES_COLLECTION, uid));
  const role = snap.data()?.role;
  return role === "admin" || role === "tenant" ? role : null;
}

export async function resolveAuthUser(user: User): Promise<AuthUser | null> {
  const role = await getUserRole(user.uid);
  if (role === "admin") return { role: "admin" };
  if (role === "tenant") {
    const tenantSnap = await getDoc(doc(getFirebaseDb(), PM_TENANTS_COLLECTION, user.uid));
    const tenant = tenantSnap.data();
    return {
      role: "tenant",
      id: user.uid,
      email: user.email ?? tenant?.email ?? "",
      name: tenant?.name ?? user.displayName ?? "Tenant",
    };
  }
  return null;
}

export function watchAuthUser(onUser: (user: AuthUser | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), async (firebaseUser) => {
    if (!firebaseUser) {
      onUser(null);
      return;
    }
    const resolved = await resolveAuthUser(firebaseUser);
    onUser(resolved);
  });
}

export async function signIn(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
  const user = await resolveAuthUser(credential.user);
  if (!user) {
    await signOut(getFirebaseAuth());
    throw new Error("Invalid email or password.");
  }
  return user;
}

export async function signOutUser() {
  await signOut(getFirebaseAuth());
}

export async function sendTenantPasswordReset(email: string) {
  await sendPasswordResetEmail(getFirebaseAuth(), email.trim());
}
