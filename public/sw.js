import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("sync", (event) => {
  switch (event.tag) {
    case "sync-data": {
      event.waitUntil(onSyncData());
    }
  }
});

async function onSyncData() {
  const request = indexedDB.open("kpz-finances-persist");

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["kpz-finances-persist"], "readonly");
    const objectStore = transaction.objectStore("kpz-finances-persist");

    const getRequest = objectStore.getAll();

    getRequest.onsuccess = (event) => {
      const data = event.target.result;
      console.log("Dados recuperados:", data);
    };
  };
}
