import { Plus } from "phosphor-react";
import { NewTransactionModal } from "../components/Admin/Global/NewTransactionModal";
import { TransactionsTable } from "../components/Admin/Global/TransactionsTable";
import { useStore } from "../stores/userData";
import { differenceInMilliseconds } from "date-fns";

export function Dashboard() {
  const lastTransactions = useStore((state) => {
    if (!state.currentWalletID) {
      return [];
    }

    const allCurrentWalletTransactions = state.userData?.wallets.find(
      (wallet) => wallet.uid === state.currentWalletID,
    )?.transactions;

    const filteredTransactions = allCurrentWalletTransactions?.filter(
      (transaction) => !transaction.deletedAt,
    );

    const sortedTransactionsByCreationTime = filteredTransactions?.sort(
      (a, b) => {
        return differenceInMilliseconds(
          new Date(b.createdAt),
          new Date(a.createdAt),
        );
      },
    );

    return sortedTransactionsByCreationTime;
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
      {!!lastTransactions?.length ? (
        <TransactionsTable transactions={lastTransactions} />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-zinc-500">
          <p className="text-center text-sm">
            Nenhuma transação adicionada, clique em <i>Nova Transação</i> para
            criar a primeira!
          </p>
        </div>
      )}
    </section>
  );
}
