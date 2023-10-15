import { Plus } from "phosphor-react";
import { NewTransactionModal } from "../components/Admin/Global/NewTransactionModal";
import { TransactionsTable } from "../components/Admin/Global/TransactionsTable";
import { useStore } from "../stores/userData";

export function Dashboard() {
  const transactions = useStore((state) => {
    if (!state.currentWalletID) {
      return [];
    }

    return state.userData?.wallets.find(
      (wallet) => wallet.uid === state.currentWalletID,
    )?.transactions;
  });

  return (
    <section className="flex h-full w-full flex-col overflow-hidden pt-4">
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
      {transactions && (
        <TransactionsTable
          transactions={transactions.filter(
            (transaction) => !transaction.deletedAt,
          )}
        />
      )}
    </section>
  );
}
