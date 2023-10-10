import "./firebase";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { AuthContextProvider } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
