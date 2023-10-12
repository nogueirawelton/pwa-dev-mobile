import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Transaction } from "../../../../@types/Transaction";
import { TransactionItem } from "./TransactionItem";

interface TransactionsTableProps {
  transactions: Transaction[] | null;
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <ScrollArea.Root className="mt-4 flex-1 overflow-auto">
      <ScrollArea.Viewport className="h-full pb-8">
        <table className="w-full">
          <thead>
            <tr className="h-12 rounded-md bg-zinc-50 text-left ring-1 ring-zinc-100">
              <th className="px-6 text-sm font-medium text-zinc-500">Nome</th>
              <th className="px-6 text-sm font-medium text-zinc-500">Tipo</th>
              <th className="px-6 text-sm font-medium text-zinc-500">Data</th>
              <th className="px-6 text-sm font-medium text-zinc-500">
                Descrição
              </th>
              <th className="px-6 text-sm font-medium text-zinc-500">
                Categoria
              </th>
              <th className="px-6"></th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, index) => (
              <TransactionItem
                key={transaction.uid}
                data={transaction}
                isOdd={index % 2 == 0}
              />
            ))}
          </tbody>
        </table>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb className="h-4 w-full bg-zinc-200" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
