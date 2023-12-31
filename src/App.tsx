import "./firebase";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
