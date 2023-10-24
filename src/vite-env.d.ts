/// <reference types="vite/client" />

declare global {
  interface Window {
    __WB_MANIFEST: any; // Ou o tipo apropriado para __WB_MANIFEST
  }
}

export {};
