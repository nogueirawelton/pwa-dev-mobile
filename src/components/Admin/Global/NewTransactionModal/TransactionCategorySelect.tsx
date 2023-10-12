import * as Select from "@radix-ui/react-select";
import { Categories } from "../../../../@types/Categories";
import { CaretDown } from "phosphor-react";
import { ControllerRenderProps } from "react-hook-form";
import { forwardRef } from "react";

export const TransactionCategorySelect = forwardRef<
  HTMLButtonElement,
  ControllerRenderProps
>(({ onChange, ...field }, ref) => {
  return (
    <Select.Root onValueChange={(value) => onChange(value)} {...field}>
      <Select.Trigger
        ref={ref}
        className="group flex h-12 w-full items-center justify-between rounded-md border border-zinc-200 bg-zinc-100 p-2 data-[placeholder]:text-zinc-400 "
      >
        <Select.Value placeholder="Categoria" />
        <Select.Icon className="SelectIcon">
          <CaretDown className="text-zinc-500" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content
        side="bottom"
        position="popper"
        sideOffset={4}
        className="group"
      >
        <Select.Viewport className="w-[--radix-select-trigger-width] rounded-md border border-zinc-200 bg-zinc-100 p-2 text-zinc-100 shadow-lg">
          {Object.values(Categories).map((category) => (
            <Select.Item
              value={category}
              key={category}
              className="flex h-8 items-center rounded-md px-1 text-zinc-800 outline-none hover:bg-sky-500 hover:text-zinc-100"
            >
              <Select.ItemText asChild>
                <span className="capitalize">
                  {category.toLocaleLowerCase()}
                </span>
              </Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
});
