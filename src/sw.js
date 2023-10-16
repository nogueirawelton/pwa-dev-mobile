self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Retorna do cache
      }
      return fetch(event.request); // Faz uma requisição real
    }),
  );
});
