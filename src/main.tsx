import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.min.css";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
