import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { ReactNode, useMemo, useState } from "react";
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
import { isAfter } from "date-fns";
import { throwErrorMessage } from "../../../../utils/throwErrorMessage";
import { motion } from "framer-motion";

interface NewTransactionModalProps {
  children: ReactNode;
}

export function NewTransactionModal({ children }: NewTransactionModalProps) {
  const [open, setOpen] = useState(false);

  const { currentWalletID, userID } = useStore((state) => {
    return {
      currentWalletID: state.currentWalletID,
      userID: state.userData?.uid,
    };
  });

  const insertNewTransaction = useStore((state) => state.insertNewTransaction);

  // ---------- HOOK FORM CONFIG ---------- //

  const formSchema = z.object({
    name: z.string().min(1, "Nome Inválido"),
    transactionDate: z.string().nonempty("Data não Selecionada"),
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
      transactionDate: new Date().toLocaleDateString("en-CA"),
      amount: "",
      category: undefined,
      type: TransactionTypes.DEPOSIT,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Transaction> = async (data) => {
    const parsedTransactionDate = new Date(`${data.transactionDate}T00:00:00`);
    const currentDate = new Date();

    const newTransaction = {
      ...data,
      uid: v4(),
      transactionDate: parsedTransactionDate.toString(),
      createdAt: currentDate.toString(),
      deletedAt: "",
      isSchedule: isAfter(parsedTransactionDate, currentDate),
    };

    if (currentWalletID && userID) {
      try {
        await createNewTransaction(newTransaction, userID, currentWalletID);

        insertNewTransaction(currentWalletID, newTransaction);

        setOpen(false);
        throwSuccessMessage("Transação adicionada com sucesso!");
      } catch (err) {
        throwErrorMessage("Erro ao adicionar transação!");
      }
    }
  };

  const MotionContent = useMemo(() => motion(Dialog.Content), []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (value !== open) {
          setOpen(value);
          reset();
        }
      }}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)]" />
        <MotionContent
          className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-xl rounded-md bg-zinc-50 p-4 shadow-sm md:p-6 lg:p-8"
          initial="closed"
          animate="open"
          variants={{
            closed: { opacity: 0, scale: 0.75, x: "-50%", y: "-50%" },
            open: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
          }}
          transition={{
            duration: 0.6,
            ease: "backInOut",
          }}
        >
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
                className="autofill-light h-12 w-full rounded-md border border-zinc-200 bg-zinc-100 px-2 placeholder:text-zinc-400 sm:px-4"
              />
              {errors.name && (
                <small className="text-red-500">{errors.name.message}</small>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register("transactionDate")}
                  placeholder="Data"
                  type="date"
                  className="autofill-light h-12 w-full rounded-md border border-zinc-200 bg-zinc-100 px-2 placeholder:text-zinc-400 sm:px-4"
                />
                {errors.transactionDate && (
                  <small className="text-red-500">
                    {errors.transactionDate.message}
                  </small>
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
                      className="autofill-light h-12 w-full rounded-md border border-zinc-200 bg-zinc-100 px-2 sm:px-4"
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
        </MotionContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
