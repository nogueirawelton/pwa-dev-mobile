import { Logo } from "../../Logo";
import { Nav } from "./Nav";
import { User } from "./User";
import { WalletSelect } from "./WalletSelect";

export function Sidebar() {
  return (
    <aside className="fixed top-0 z-40 flex h-screen w-screen flex-col justify-between bg-zinc-900 px-4 py-5 sm:w-80 lg:static">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4 text-lg font-medium text-zinc-100">
            <Logo className="h-10 w-10" color="#f5f5f5" />
            KpzFinances
          </div>
        </div>
        <WalletSelect />
        <Nav />
      </div>
      <User />
    </aside>
  );
}
