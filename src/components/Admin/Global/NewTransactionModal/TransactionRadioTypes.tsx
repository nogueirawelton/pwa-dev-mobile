import * as RadioGroup from "@radix-ui/react-radio-group";
import { TransactionTypes } from "../../../../@types/TransactionTypes";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";

export const TransactionRadioTypes = forwardRef<
  HTMLDivElement,
  ControllerRenderProps
>(({ onChange, ...field }, ref) => {
  return (
    <RadioGroup.Root
      onValueChange={(value) => onChange(value)}
      {...field}
      ref={ref}
      className="flex gap-4"
      defaultValue={TransactionTypes.DEPOSIT}
    >
      <RadioGroup.Item
        value={TransactionTypes.DEPOSIT}
        className="boder-zinc-200 group flex h-12 w-full items-center justify-center gap-2 rounded-md border bg-zinc-100 data-[state=checked]:border-sky-500 data-[state=checked]:bg-sky-500 data-[state=checked]:text-zinc-100"
      >
        <ArrowCircleUp className="h-6 w-6 text-green-600 group-data-[state=checked]:text-zinc-100" />
        Entrada
      </RadioGroup.Item>
      <RadioGroup.Item
        value={TransactionTypes.WITHDRAW}
        className="boder-zinc-200 group flex h-12 w-full items-center justify-center gap-2 rounded-md border bg-zinc-100 data-[state=checked]:border-sky-500 data-[state=checked]:bg-sky-500 data-[state=checked]:text-zinc-100"
      >
        <ArrowCircleDown className="h-6 w-6 text-red-600 group-data-[state=checked]:text-zinc-100" />
        Saída
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
});
