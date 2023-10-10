import { Outlet, useLocation } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Sidebar } from "../components/Admin/Sidebar";

export function AdminLayout() {
  const { pathname } = useLocation();

  return (
    <div className="grid h-screen grid-cols-[275px_1fr] text-zinc-100">
      <Sidebar />
      <main className="rounded-bl-lg rounded-tl-lg bg-zinc-100 text-zinc-900">
        {pathname == "/admin" ? <Dashboard /> : <Outlet />}
      </main>
    </div>
  );
}
