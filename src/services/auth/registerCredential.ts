import { User } from "firebase/auth";

interface CredentialData {
  id: string;
  credential: ArrayBuffer;
}

export async function registerCredential(user: User) {
   if (!window.matchMedia("(display-mode: standalone)").matches || navigator.onLine) {
     return;
  }

  return await insertOnIndexedDB(user);
}

export function openDB(): Promise<IDBDatabase> {
  const db = indexedDB.open("credentials", 1);

  db.onupgradeneeded = (event: any) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains("credentials")) {
      db.createObjectStore("credentials", { keyPath: "id" });
    }
  };

  return new Promise((resolve, reject) => {
    db.onsuccess = () => resolve(db.result);
    db.onerror = () => reject(db.error);
  });
}

async function insertOnIndexedDB(user: User) {
  const existentCredential = await getExistentCredential(user.uid);

  if (!existentCredential) {
    const credential = (await navigator.credentials.create({
      publicKey: {
        challenge: new Uint8Array(32),
        rp: { id: "kpz-finances.vercel.app", name: "KpzFinances" },
        user: {
          id: new Uint8Array(32),
          name: user.email || "anonymous@email.com",
          displayName: user.displayName || "Anonymous",
        },
        pubKeyCredParams: [], // -7 para ECDSA
        timeout: 60000,
      },
    })) as PublicKeyCredential;

    const db = await openDB();
    const transaction = db.transaction(["credentials"], "readwrite");
    const store = transaction.objectStore("credentials");

    store.add({ id: user.uid, credential: credential.rawId });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve(null);
      transaction.onerror = () => reject(transaction.error);
    });
  }
}

export async function getExistentCredential(
  userID: string,
): Promise<CredentialData> {
  const db = await openDB();
  const transaction = db.transaction(["credentials"], "readonly");
  const store = transaction.objectStore("credentials");

  const request = store.get(userID);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
