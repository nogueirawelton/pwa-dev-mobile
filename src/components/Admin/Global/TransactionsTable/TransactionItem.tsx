import { ArrowDownRight, ArrowUpRight } from "phosphor-react";
import { Transaction } from "../../../../@types/Transaction";
import { TransactionTypes } from "../../../../@types/TransactionTypes";
import { format } from "date-fns";

interface TransactionProps {
  data: Transaction;
  isOdd: boolean;
}

export function TransactionItem({
  data: { name, type, date, amount, category },
  isOdd,
}: TransactionProps) {
  return (
    <tr
      className="h-20 whitespace-nowrap rounded-md text-zinc-700  ring-zinc-50 data-[odd=false]:bg-zinc-50 data-[odd=true]:ring-1"
      data-odd={isOdd}
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
      <td className="px-6">{format(new Date(date), "dd/MM/yyyy")}</td>
      <td className="px-6 text-sm capitalize">
        <span className="rounded-md border border-zinc-200 bg-sky-50 px-3 py-1 text-sky-500">
          {category.toLowerCase()}
        </span>
      </td>
      <td className="px-6"></td>
    </tr>
  );
}
