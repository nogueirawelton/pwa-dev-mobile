import { signOut } from "firebase/auth";
import {
  Calendar,
  HouseSimple,
  Receipt,
  SignOut,
  UserCircle,
  Wallet,
} from "phosphor-react";
import { NavLink, useLocation } from "react-router-dom";
import { auth } from "../../../firebase";

interface NavProps {
  closeMenu: () => void;
}

export function Nav({ closeMenu }: NavProps) {
  const { pathname } = useLocation();

  function handleLogout() {
    signOut(auth);
  }

  return (
    <div className="mt-10">
      <strong className="text-xs font-medium text-zinc-500">Navegação</strong>
      <nav className="mt-4 flex flex-col items-start gap-2 text-zinc-100">
        <NavLink
          onClick={closeMenu}
          data-current={pathname === "/admin"}
          to="/admin"
          className="flex w-full items-center gap-3 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-zinc-800 data-[current=true]:bg-zinc-800"
        >
          <HouseSimple className="h-6 w-6" />
          Dashboard
        </NavLink>
        <NavLink
          onClick={closeMenu}
          to="/admin/transactions"
          className="flex w-full items-center gap-3 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-zinc-800 aria-[current]:bg-zinc-800"
        >
          <Receipt className="h-6 w-6" />
          Transações
        </NavLink>
        <NavLink
          onClick={closeMenu}
          to="/admin/schedules"
          className="flex w-full items-center gap-3 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-zinc-800 aria-[current]:bg-zinc-800"
        >
          <Calendar className="h-6 w-6" />
          Agendamentos
        </NavLink>
        <NavLink
          onClick={closeMenu}
          to="/admin/wallets"
          className="flex w-full items-center gap-3 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-zinc-800 aria-[current]:bg-zinc-800"
        >
          <Wallet className="h-6 w-6" />
          Carteiras
        </NavLink>
        <NavLink
          onClick={closeMenu}
          to="/admin/profile"
          className="flex w-full items-center gap-3 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-zinc-800 aria-[current]:bg-zinc-800"
        >
          <UserCircle className="h-6 w-6" />
          Perfil
        </NavLink>
        <button
          className="mt-4 flex w-full items-center gap-3 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-zinc-800 aria-[current]:bg-zinc-800"
          onClick={handleLogout}
        >
          <SignOut className="h-6 w-6" />
          Sair
        </button>
      </nav>
    </div>
  );
}
