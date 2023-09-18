import { Outlet, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Dashboard } from "../pages/Dashboard";
import { SignOut } from "phosphor-react";
import { Logo } from "../components/Logo";

export function AdminLayout() {
  const { pathname } = useLocation();

  const auth = getAuth();

  return (
    <div className="grid h-screen grid-cols-[320px_1fr] text-white">
      <aside className="flex flex-col justify-between px-4 py-8">
        <div>
          <header className="flex items-center gap-4 text-lg font-medium text-zinc-100">
            <Logo className="h-10 w-10" color="#f5f5f5" />
            KpzFinances
          </header>
          <div></div>
          <nav></nav>
        </div>
        <button
          className="flex select-none items-center justify-between rounded-md bg-zinc-800 p-2 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700"
          onClick={() => signOut(auth)}
        >
          <div className="flex items-center gap-4">
            <img
              className="h-10 w-10 rounded-full"
              src="https://github.com/nogueirawelton.png"
              alt=""
            />
            <span>Welton Nogueira</span>
          </div>
          <SignOut className="h-5 w-5" />
        </button>
      </aside>
      <main className="rounded-lg bg-zinc-100 text-zinc-900">
        {pathname == "/admin" ? <Dashboard /> : <Outlet />}
      </main>
    </div>
  );
}
