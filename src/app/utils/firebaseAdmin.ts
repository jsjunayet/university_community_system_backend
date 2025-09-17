// utils/firebaseAdmin.ts
import admin from "firebase-admin";
import serviceAccount from "./firebase-service-account.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

// এখানে const না বানিয়ে সরাসরি export করো
export const fcm = admin.messaging();
