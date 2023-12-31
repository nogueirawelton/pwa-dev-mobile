import { precacheAndRoute } from "workbox-precaching";
import { ref, set } from "firebase/database";
import { openDB } from "idb";
import { db } from "../src/firebase";
import { differenceInHours } from "date-fns";

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
}

function updateData(state: any) {
  state.userData.wallets.forEach((wallet: any) => {
    wallet.transactions.forEach(async (transaction: any) => {
      console.log(
        differenceInHours(new Date(transaction.transactionDate), new Date()),
      );
      if (
        !transaction.deletedAt &&
        transaction.isSchedule &&
        differenceInHours(new Date(transaction.transactionDate), new Date()) <
          24
      ) {
        transaction.isSchedule = false;

        self.registration.showNotification(`Transação Agendada`, {
          body: `Sua Transação ${transaction.name} está agendada para hoje!`,
        });

        if ("vibrate" in navigator) {
          navigator.vibrate(500);
        }
      }
      await set(
        ref(
          db,
          `/users/${state.userData.uid}/wallets/${wallet.uid}/transactions/${transaction.uid}`,
        ),
        transaction,
      );
    });
  });
}
