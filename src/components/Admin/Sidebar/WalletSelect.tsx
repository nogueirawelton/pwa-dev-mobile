import * as Select from "@radix-ui/react-select";
import { CaretDown, CurrencyDollar } from "phosphor-react";
import { useAuth } from "../../../hooks/useAuth";

export function WalletSelect() {
  const { user } = useAuth();

  if (!user) return null;
  const mainWalletID = user.wallets[0].uid;

  return (
    <Select.Root
      defaultValue={mainWalletID}
      disabled={user.wallets.length <= 1}
    >
      <Select.Trigger
        asChild
        className="group mt-10 flex h-14 w-full items-center justify-between rounded-md bg-zinc-800 p-2 transition-colors duration-300 hover:bg-zinc-700"
      >
        <div>
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-zinc-900">
              <CurrencyDollar className="text-xl" />
            </div>
            <div className="flex flex-col items-start">
              <small className="text-xs font-bold text-zinc-500">
                Carteira
              </small>
              <Select.Value />
            </div>
          </div>
          {user.wallets.length > 1 && (
            <Select.Icon>
              <CaretDown className="text-sm text-zinc-500 transition-all duration-300 group-data-[state=open]:-rotate-180" />
            </Select.Icon>
          )}
        </div>
      </Select.Trigger>
      <Select.Content
        side="bottom"
        position="popper"
        sideOffset={4}
        className="group"
      >
        <Select.Viewport className="w-[--radix-select-trigger-width] rounded-md bg-zinc-800 p-2 text-zinc-100 shadow-lg">
          {user?.wallets.map((wallet) => (
            <Select.Item
              value={wallet.uid}
              key={wallet.uid}
              className="flex h-8 items-center rounded-md px-1 outline-none hover:bg-zinc-700"
            >
              <Select.ItemText>{wallet.name}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}
