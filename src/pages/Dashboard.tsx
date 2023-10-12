import { Plus } from "phosphor-react";
import { NewTransactionModal } from "../components/Admin/Global/NewTransactionModal";
import { TransactionsTable } from "../components/Admin/Global/TransactionsTable";
import { useUserDataStore } from "../stores/userData";

export function Dashboard() {
  const userData = useUserDataStore((state) => state.userData);

  console.log(userData);
  const recentTransactions =
    useUserDataStore((state) => state.userData?.wallets[0].transactions)?.slice(
      0,
      10,
    ) || null;

  return (
    <section className="flex h-screen flex-col">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <strong className="font-semibold text-zinc-800">
            Transações Recentes
          </strong>
          <NewTransactionModal>
            <button className="flex items-center gap-2 rounded-md bg-sky-500 px-4 py-3 text-zinc-100">
              <Plus weight="bold" className="text-zinc-100" />
              <span className="hidden sm:block">Nova Transação</span>
            </button>
          </NewTransactionModal>
        </div>
        <TransactionsTable transactions={recentTransactions} />
      </div>
    </section>
  );
}
