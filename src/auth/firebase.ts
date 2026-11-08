import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

export const firebaseConfigured = Object.values(config).every((value) => typeof value === 'string' && value.length > 0);

let appPromise: Promise<FirebaseApp | null> | null = null;

async function getFirebaseApp() {
  if (!firebaseConfigured) return Promise.resolve(null);
  if (!appPromise) {
    appPromise = (async () => {
      const appSdk = await import('firebase/app');
      return appSdk.getApps().length ? appSdk.getApp() : appSdk.initializeApp(config);
    })();
  }
  return appPromise;
}

export async function getFirebaseAuth(): Promise<Auth | null> {
  const app = await getFirebaseApp();
  if (!app) return null;
  const { getAuth } = await import('firebase/auth');
  return getAuth(app);
}

export async function getFirebaseDb(): Promise<Firestore | null> {
  const app = await getFirebaseApp();
  if (!app) return null;
  const { getFirestore, initializeFirestore } = await import('firebase/firestore');
  // Enterprise projects may use a named database. Preserve the default
  // database behavior when no explicit database ID is configured.
  const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID?.trim();
  return databaseId ? initializeFirestore(app, {}, databaseId) : getFirestore(app);
}
