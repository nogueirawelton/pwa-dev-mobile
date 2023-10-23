import "./firebase";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    navigator.serviceWorker
      .register("/aux-sw.js", {
        type: "module",
      })
      .then(function (registration) {
        console.log("Service worker  registrado com sucesso:", registration);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
