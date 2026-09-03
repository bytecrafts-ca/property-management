"use client";

import { collection, addDoc } from "firebase/firestore";
import { getFirebaseDb } from "./client";
import { PM_TENANT_REQUESTS_COLLECTION } from "./collections";

export type TenantRequestSubmission = {
  name: string;
  email: string;
  phone: string;
  unit: string;
  requestType: string;
  urgency: string;
  message: string;
};

export async function submitTenantRequest(input: TenantRequestSubmission) {
  await addDoc(collection(getFirebaseDb(), PM_TENANT_REQUESTS_COLLECTION), {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    unit: input.unit.trim(),
    requestType: input.requestType,
    urgency: input.urgency,
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  });
}
