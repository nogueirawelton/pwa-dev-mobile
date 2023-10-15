import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Transaction } from "../../../../@types/Transaction";
import { TransactionItem } from "./TransactionItem";
import { AnimatePresence } from "framer-motion";

interface TransactionsTableProps {
  transactions: Transaction[] | null;
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="mt-4 flex-1 overflow-hidden">
      <ScrollArea.Root className="h-full w-full" type="auto">
        <ScrollArea.Viewport className="max-h-full overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="h-12 rounded-md bg-zinc-50 text-left ring-1 ring-zinc-100">
                <th className="px-6 text-sm font-medium text-zinc-500">Nome</th>
                <th className="px-6 text-sm font-medium text-zinc-500">Tipo</th>
                <th className="px-6 text-sm font-medium text-zinc-500">
                  Valor
                </th>
                <th className="px-6 text-sm font-medium text-zinc-500">Data</th>
                <th className="px-6 text-sm font-medium text-zinc-500">
                  Categoria
                </th>
                <th className="w-32 px-6"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {transactions?.map((transaction, index) => (
                  <TransactionItem
                    key={transaction.uid}
                    data={transaction}
                    isOdd={index % 2 == 0}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="horizontal"
          className="!relative h-1 w-full -translate-y-1 rounded-md bg-zinc-100"
        >
          <ScrollArea.Thumb className="!h-1 flex-1 rounded-md bg-zinc-200" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="h-full w-1 rounded-md bg-zinc-100"
        >
          <ScrollArea.Thumb className="!w-1 flex-1 rounded-md bg-zinc-200" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
