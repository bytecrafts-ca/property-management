"use client";

import { collection, addDoc } from "firebase/firestore";
import { getFirebaseDb } from "./client";
import { PM_CONTACT_SUBMISSIONS_COLLECTION } from "./collections";

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  address: string;
  message: string;
};

export async function submitContactForm(input: ContactSubmission) {
  await addDoc(collection(getFirebaseDb(), PM_CONTACT_SUBMISSIONS_COLLECTION), {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    propertyType: input.propertyType,
    address: input.address.trim(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  });
}
