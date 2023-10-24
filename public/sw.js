import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("sync", (event) => {
  switch (event.tag) {
    case "sync-data": {
      event.waitUntil(() => {
        console.log("Sync");
      });
    }
  }
});
