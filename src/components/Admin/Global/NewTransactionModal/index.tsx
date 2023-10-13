import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { ReactNode, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { TransactionCategorySelect } from "./TransactionCategorySelect";
import { TransactionRadioTypes } from "./TransactionRadioTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import createNewTransaction from "../../../../services/transactions/createNewTransaction";
import { Transaction } from "../../../../@types/Transaction";
import { TransactionTypes } from "../../../../@types/TransactionTypes";
import { useStore } from "../../../../stores/userData";
import { v4 } from "uuid";
import { throwSuccessMessage } from "../../../../utils/throwSuccessMessage";

interface NewTransactionModalProps {
  children: ReactNode;
}

export function NewTransactionModal({ children }: NewTransactionModalProps) {
  const [open, setOpen] = useState(false);

  const userID = useStore((state) => state.userData?.uid);
  const currentWalletID = useStore((state) => state.currentWalletID);
  const insertNewTransaction = useStore((state) => state.insertNewTransaction);

  // ---------- HOOK FORM CONFIG ---------- //

  const formSchema = z.object({
    name: z.string().min(1, "Nome Inválido"),
    date: z.string().nonempty("Data não Selecionada"),
    amount: z
      .string({ required_error: "Valor não informado" })
      .refine(
        (amount) => Number(amount.replace(",", ".")) >= 1,
        "Valor Inválido",
      ),
    category: z.string({ required_error: "Categoria não Selecionada" }),
    type: z.string(),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Transaction>({
    defaultValues: {
      name: "",
      date: new Date().toLocaleDateString("en-CA"),
      amount: "",
      category: undefined,
      type: TransactionTypes.DEPOSIT,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Transaction> = async (data) => {
    const transaction = {
      ...data,
      date: new Date(`${data.date}T00:00:00`).toString(),
      uid: v4(),
    };

    if (currentWalletID) {
      await createNewTransaction(transaction, userID, currentWalletID);

      insertNewTransaction(currentWalletID, transaction);
    }
    setOpen(false);
    throwSuccessMessage("Transação adicionada com sucesso!");
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        reset();
        setOpen(value);
      }}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-xl origin-center rounded-md bg-zinc-50 p-6 shadow-sm data-[state=open]:animate-zoom-in lg:p-8">
          <Dialog.Title className="mb-4 text-2xl font-bold text-zinc-900">
            Cadastrar Transação
          </Dialog.Title>
          <Dialog.Close>
            <X className="absolute right-5 top-5 text-2xl text-zinc-500" />
          </Dialog.Close>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                {...register("name")}
                placeholder="Nome"
                type="text"
                className="autofill-light h-12 w-full rounded-md border border-zinc-200 bg-zinc-100 px-4 placeholder:text-zinc-400"
              />
              {errors.name && (
                <small className="text-red-500">{errors.name.message}</small>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register("date")}
                  type="date"
                  className="autofill-light px- h-12 w-full rounded-md border border-zinc-200 bg-zinc-100 px-4 placeholder:text-zinc-400"
                />
                {errors.date && (
                  <small className="text-red-500">{errors.date.message}</small>
                )}
              </div>
              <div>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field: { onChange, ...field } }) => (
                    <CurrencyInput
                      {...field}
                      placeholder="Valor"
                      prefix="R$ "
                      decimalSeparator=","
                      onValueChange={(value) => onChange(value)}
                      className="autofill-light h-12 w-full rounded-md border border-zinc-200 bg-zinc-100 px-4"
                    />
                  )}
                />
                {errors.amount && (
                  <small className="text-red-500">
                    {errors.amount.message}
                  </small>
                )}
              </div>
            </div>
            <div>
              <Controller
                control={control}
                name="category"
                render={({ field }) => <TransactionCategorySelect {...field} />}
              />
              {errors.category && (
                <small className="text-red-500">
                  {errors.category.message}
                </small>
              )}
            </div>
            <Controller
              control={control}
              name="type"
              render={({ field }) => <TransactionRadioTypes {...field} />}
            />

            <button className="h-12 rounded-md bg-sky-500 font-semibold text-zinc-100">
              Cadastrar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
