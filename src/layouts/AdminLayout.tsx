import { Outlet, useLocation } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Sidebar } from "../components/Admin/Sidebar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getDayPeriodMessage } from "../utils/getDayPeriodMessage";
import { CircleNotch, List, X } from "phosphor-react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { useStore } from "../stores/userData";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { getUserRealtimeData } from "../services/auth/getUserRealtimeData";

export function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentHour = new Date().getHours();
  const currentDate = format(new Date(), "EEEE, dd 'de' MMMM 'de' Y", {
    locale: ptBR,
  });

  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    let debounceTimeout: ReturnType<typeof setTimeout> | null;

    async function handleLogin(signedUser: User) {
      const userRealtimeData = await getUserRealtimeData(signedUser.uid);
      setUserData(userRealtimeData);
    }

    onAuthStateChanged(auth, async (signedUser) => {
      if (!signedUser) {
        navigate("/login");
        return;
      }

      if (userData) {
        return;
      }

      if (debounceTimeout) clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(() => {
        debounceTimeout = null;

        handleLogin(signedUser);
      }, 300);
    });
  }, []);

  if (!userData) {
    return (
      <div className="grid h-screen w-screen place-items-center">
        <CircleNotch className="h-10 w-10 animate-spin text-sky-500" />
      </div>
    );
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
      <main className="flex w-full flex-col space-y-4 divide-y divide-zinc-200 overflow-hidden bg-white px-6 py-4 text-zinc-900 lg:rounded-bl-lg lg:rounded-tl-lg">
        <header className="flex items-center justify-between">
          <div className="flex flex-col">
            <small className="text-sm font-semibold capitalize text-zinc-600">
              {currentDate}
            </small>
            <strong className="text-xl font-semibold text-zinc-900">
              {getDayPeriodMessage(currentHour)}
              {userData?.name ? `, ${userData.name.split(" ")[0]}` : ""}
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
        {pathname == "/admin" ? <Dashboard /> : <Outlet />}
      </main>
    </Collapsible.Root>
  );
}
