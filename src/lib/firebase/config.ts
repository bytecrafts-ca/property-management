export const firebasePublicConfig = {
  apiKey: "AIzaSyAe7vzB11y-meA38U7hAObEVIrtxfXuf9s",
  authDomain: "whitby-link-ca.firebaseapp.com",
  projectId: "whitby-link-ca",
  storageBucket: "whitby-link-ca.firebasestorage.app",
  messagingSenderId: "254042083047",
  appId: "1:254042083047:web:dd427191b3f6b0d3411c42",
} as const;

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? firebasePublicConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? firebasePublicConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? firebasePublicConfig.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? firebasePublicConfig.storageBucket,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? firebasePublicConfig.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? firebasePublicConfig.appId,
};

export const firebaseProjectId = firebaseConfig.projectId;
