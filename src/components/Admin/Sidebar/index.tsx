import { Logo } from "../../Logo";
import { Nav } from "./Nav";
import { User } from "./User";
import { WalletSelect } from "./WalletSelect";

export function Sidebar() {
  return (
    <aside className="flex flex-col justify-between px-4 py-8">
      <div>
        <header className="flex items-center gap-4 text-lg font-medium text-zinc-100">
          <Logo className="h-10 w-10" color="#f5f5f5" />
          KpzFinances
        </header>
        <WalletSelect />
        <Nav />
      </div>
      <User />
    </aside>
  );
}
