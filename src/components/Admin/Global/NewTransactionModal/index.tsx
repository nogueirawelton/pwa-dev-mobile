import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { ReactNode } from "react";
import CurrencyInput from "react-currency-input-field";
import { TransactionCategorySelect } from "./TransactionCategorySelect";
import { TransactionRadioTypes } from "./TransactionRadioTypes";
import { zodResolver } from "@hookform/resolvers/zod";

interface NewTransactionModalProps {
  children: ReactNode;
}

export function NewTransactionModal({ children }: NewTransactionModalProps) {
  // ---------- HOOK FORM CONFIG ---------- //

  const formSchema = z.object({
    name: z.string().min(1, "Nome Inválido"),
    date: z.string(),
    amount: z
      .string({ required_error: "Valor não informado" })
      .refine((amount) => Number(amount) >= 1, "Valor Inválido"),
    category: z.string({ required_error: "Categoria não Selecionada" }),
    type: z.string(),
    description: z.string(),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <Dialog.Root onOpenChange={() => reset()}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-xl origin-center rounded-md bg-zinc-50 p-8 shadow-sm data-[state=open]:animate-zoom-in">
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
                className="h-12 w-full rounded-md border border-zinc-200 bg-zinc-100 px-4 placeholder:text-zinc-400"
              />
              {errors.name && (
                <small className="text-red-500">{errors.name.message}</small>
              )}
            </div>
            <div className="flex gap-4">
              <input
                {...register("date")}
                defaultValue={new Date().toLocaleDateString("en-CA")}
                type="date"
                className="px- h-12 w-full rounded-md border border-zinc-200 bg-zinc-100 px-4 placeholder:text-zinc-400"
              />
              <div className="w-full ">
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
                      className="h-12 w-full rounded-md border border-zinc-200 bg-zinc-100 px-4"
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

            <textarea
              {...register("description")}
              placeholder="Descrição"
              className="h-24 w-full resize-none rounded-md border border-zinc-200 bg-zinc-100 p-4 px-4"
            ></textarea>
            <button className="h-12 rounded-md bg-sky-500 font-semibold text-zinc-100">
              Cadastrar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
