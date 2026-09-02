#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PROJECT_ID = "whitby-link-ca";
const API_KEY = "AIzaSyAe7vzB11y-meA38U7hAObEVIrtxfXuf9s";
const ADMIN_EMAIL = process.env.FIREBASE_ADMIN_EMAIL ?? "admin@property-management.ca";
const ADMIN_PASSWORD = process.env.FIREBASE_ADMIN_PASSWORD ?? "PropertyMgmt2026!";
const ROLES_COLLECTION = "pmRoles";

function getAccessToken() {
  const configPath = path.join(os.homedir(), ".config", "configstore", "firebase-tools.json");
  const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  return cfg.tokens.access_token;
}

async function authRequest(pathname, body) {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/${pathname}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? JSON.stringify(data));
  return data;
}

async function ensureAdminUser() {
  try {
    const created = await authRequest("accounts:signUp", {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      returnSecureToken: true,
    });
    return created.localId;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("EMAIL_EXISTS")) throw error;
    const signedIn = await authRequest("accounts:signInWithPassword", {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      returnSecureToken: true,
    });
    return signedIn.localId;
  }
}

async function setAdminRole(uid) {
  const token = getAccessToken();
  const base = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${ROLES_COLLECTION}/${uid}`;
  const res = await fetch(`${base}?updateMask.fieldPaths=role`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: { role: { stringValue: "admin" } },
    }),
  });

  if (!res.ok) {
    const createRes = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${ROLES_COLLECTION}?documentId=${uid}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: { role: { stringValue: "admin" } },
        }),
      }
    );
    if (!createRes.ok) {
      throw new Error(await createRes.text());
    }
  }
}

async function main() {
  console.log("Setting up Firebase admin account...");
  const uid = await ensureAdminUser();
  await setAdminRole(uid);
  console.log("Firebase admin ready.");
  console.log(`Email: ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log(`UID: ${uid}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
