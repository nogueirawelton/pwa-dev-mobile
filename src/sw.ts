import { precacheAndRoute } from "workbox-precaching";
import { ref, set } from "firebase/database";
import { openDB } from "idb";
import { db } from "../src/firebase";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("sync", (event: any) => {
  switch (event.tag) {
    case "sync-data": {
      event.waitUntil(onSyncData());
    }
  }
});

async function onSyncData() {
  const dbPromise = openDB("kpz-finances-persist", 1, {
    upgrade(db) {
      db.createObjectStore("kpz-finances-persist");
    },
  });

  const idb = await dbPromise;
  const data = await idb.get("kpz-finances-persist", "kpz-finances-persist");

  console.log(data);
  if (data) {
    const { state } = JSON.parse(data);
    updateData(state);
  }

  self.registration.showNotification("Título da Notificação");
}

function updateData(state: any) {
  state.userData.wallets.forEach(async (wallet: any) => {
    await set(
      ref(db, `/users/${state.userData.uid}/wallets/${wallet.uid}`),
      wallet,
    );
  });
}
