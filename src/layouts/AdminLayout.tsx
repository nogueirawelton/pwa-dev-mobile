import { Outlet, useLocation } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Sidebar } from "../components/Admin/Sidebar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import getDayPeriodMessage from "../utils/getDayPeriodMessage";
import { List, X } from "phosphor-react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { useUserDataStore } from "../stores/userData";

export function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();
  const user = useUserDataStore((state) => state.userData);
  const currentDate = format(new Date(), "EEEE, dd 'de' MMMM 'de' Y", {
    locale: ptBR,
  });

  const currentHour = new Date().getHours();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <Collapsible.Root
      className="flex h-screen w-screen text-zinc-100"
      open={isMenuOpen}
      onOpenChange={setIsMenuOpen}
    >
      <Collapsible.Content
        forceMount
        className="z-50 data-[state=closed]:hidden data-[state=open]:animate-float-right lg:data-[state=closed]:block"
      >
        <Sidebar closeMenu={closeMenu} />
      </Collapsible.Content>
      <main className="flex-1 space-y-4 divide-y divide-zinc-200 overflow-hidden bg-white px-6 py-4 text-zinc-900 lg:rounded-bl-lg lg:rounded-tl-lg ">
        <header className="flex items-center justify-between">
          <div className="flex flex-col">
            <small className="text-sm font-semibold capitalize text-zinc-600">
              {currentDate}
            </small>
            <strong className="text-xl font-semibold text-zinc-900">
              {getDayPeriodMessage(currentHour)}
              {user?.name ? `, ${user.name.split(" ")[0]}` : ""}
            </strong>
          </div>
          <Collapsible.Trigger asChild>
            <button className="relative z-50">
              {isMenuOpen ? (
                <X className="h-8 w-8 text-zinc-100 sm:text-zinc-900 lg:hidden" />
              ) : (
                <List className="h-8 w-8 text-zinc-900 lg:hidden" />
              )}
            </button>
          </Collapsible.Trigger>
        </header>
        <div className="pt-4">
          {pathname == "/admin" ? <Dashboard /> : <Outlet />}
        </div>
      </main>
    </Collapsible.Root>
  );
}
