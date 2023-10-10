import * as Select from "@radix-ui/react-select";

export function WalletSelect() {
  return (
    <Select.Root>
      <Select.Trigger className="h-full w-8 bg-zinc-600">
        <Select.Value placeholder="teste" />
        {/* <Select.Icon /> */}
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="h-8 w-full">
          <Select.Viewport>
            <Select.Item value="1">Teste</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
