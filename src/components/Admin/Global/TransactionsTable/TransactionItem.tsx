import { ArrowDownRight, ArrowUpRight, Trash } from "phosphor-react";
import { Transaction } from "../../../../@types/Transaction";
import { TransactionTypes } from "../../../../@types/TransactionTypes";
import { format } from "date-fns";
import { useStore } from "../../../../stores/userData";
import { deleteTransactionById } from "../../../../services/transactions/deleteTransactionById";
import { throwErrorMessage } from "../../../../utils/throwErrorMessage";
import { motion } from "framer-motion";

interface TransactionProps {
  data: Transaction;
  isOdd: boolean;
}

export function TransactionItem({
  data: { uid, name, type, transactionDate, amount, category },
  isOdd,
}: TransactionProps) {
  const { currentWalletID, userID } = useStore((state) => {
    return {
      currentWalletID: state.currentWalletID,
      userID: state.userData?.uid,
    };
  });

  const deleteTransaction = useStore((state) => state.deleteTransaction);

  async function removeTransaction() {
    if (currentWalletID && userID) {
      try {
        await deleteTransactionById(userID, currentWalletID, uid);

        deleteTransaction(currentWalletID, uid);
      } catch (err) {
        throwErrorMessage("Erro ao deletar transação!");
      }
    }
  }

  return (
    <motion.tr
      className="h-20 whitespace-nowrap rounded-md text-zinc-700  ring-zinc-50 data-[odd=false]:bg-zinc-50 data-[odd=motion.true]:ring-1"
      data-odd={isOdd}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: 25 },
      }}
      layout
    >
      <td className="px-6 font-medium">{name}</td>
      <td
        className="px-6 font-medium data-[type=ENTRADA]:text-green-600 data-[type=SAÍDA]:text-red-600"
        data-type={type}
      >
        {type == TransactionTypes.DEPOSIT && (
          <span className="flex items-center gap-3">
            Depósito
            <span className="rounded bg-green-100 p-0.5 text-xs ring-1 ring-green-200">
              <ArrowUpRight />
            </span>
          </span>
        )}
        {type == TransactionTypes.WITHDRAW && (
          <span className="flex items-center gap-3">
            Retirada
            <span className="rounded bg-red-100 p-0.5 text-xs ring-1 ring-red-200">
              <ArrowDownRight />
            </span>
          </span>
        )}
      </td>
      <td className="px-6">
        {Number(amount.replace(",", ".")).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td className="px-6">
        {format(new Date(transactionDate), "dd/MM/yyyy")}
      </td>
      <td className="px-6 text-sm capitalize">
        <span className="rounded-md border border-zinc-200 bg-sky-50 px-3 py-1 text-sky-500">
          {category.toLowerCase()}
        </span>
      </td>
      <td className="px-6">
        <button
          className="grid h-8 w-8 place-items-center rounded-md border-red-100 text-xl hover:border hover:bg-red-50"
          onClick={removeTransaction}
        >
          <Trash className="text-red-500" />
        </button>
      </td>
    </motion.tr>
  );
}
