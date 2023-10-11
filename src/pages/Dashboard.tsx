import { ArrowDownRight, ArrowUpRight, Plus, X } from "phosphor-react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Dialog from "@radix-ui/react-dialog";

const mock = [
  {
    name: "Transação 1",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 2",
    type: "withdraw",
    date: "21/02/2001",
    description:
      "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
  {
    name: "Transação 3",
    type: "deposit",
    date: "21/02/2001",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
];

export function Dashboard() {
  return (
    <section className="flex h-screen flex-col">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <strong className="font-semibold text-zinc-800">
            Transações Recentes
          </strong>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="flex items-center gap-2 rounded-md bg-sky-500 px-4 py-3 text-zinc-100">
                <Plus weight="bold" className="text-zinc-100" />
                <span className="hidden sm:block">Nova Transação</span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)]" />
              <Dialog.Content className="data-[state=open]:animate-zoom-in fixed left-1/2 top-1/2 z-50 w-[95%] max-w-xl origin-center rounded-md bg-zinc-50 p-8 shadow-sm">
                <Dialog.Title className="mb-4 text-2xl font-bold text-zinc-900">
                  Cadastrar Transação
                </Dialog.Title>
                <Dialog.Close>
                  <X className="absolute right-5 top-5 text-2xl text-zinc-500" />
                </Dialog.Close>
                <form className="flex flex-col gap-2">
                  <input
                    placeholder="Nome"
                    type="text"
                    className="h-12 w-full px-4"
                  />
                  <input
                    placeholder="Valor"
                    min={0}
                    type="number"
                    className="h-12 w-full px-4"
                  />
                  <textarea
                    placeholder="Descrição"
                    className="h-24 w-full resize-none p-4"
                  ></textarea>
                  <button className="h-12 rounded-md bg-sky-500 font-semibold text-zinc-100">
                    Cadastrar
                  </button>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <ScrollArea.Root className="mt-4 flex-1 overflow-auto">
          <ScrollArea.Viewport className="h-full pb-8">
            <table className="w-full">
              <thead>
                <tr className="h-12 rounded-md bg-zinc-50 text-left ring-1 ring-zinc-100">
                  <th className="px-6 text-sm font-medium text-zinc-500">
                    Nome
                  </th>
                  <th className="px-6 text-sm font-medium text-zinc-500">
                    Tipo
                  </th>
                  <th className="px-6 text-sm font-medium text-zinc-500">
                    Data
                  </th>
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
                {mock.map(
                  ({ name, type, date, description, category }, index) => (
                    <tr
                      key={name}
                      className="h-20 whitespace-nowrap rounded-md text-zinc-700  ring-zinc-50 data-[odd=true]:bg-zinc-50 data-[odd=true]:ring-1"
                      data-odd={!!(index % 2)}
                    >
                      <td className="px-6 font-medium">{name}</td>
                      <td
                        className="px-6 font-medium data-[type=deposit]:text-green-600 data-[type=withdraw]:text-red-600"
                        data-type={type}
                      >
                        {type == "deposit" ? (
                          <span className="flex items-center gap-3">
                            Depósito
                            <span className="rounded bg-green-100 p-0.5 text-xs ring-1 ring-green-200">
                              <ArrowUpRight />
                            </span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-3">
                            Retirada
                            <span className="rounded bg-red-100 p-0.5 text-xs ring-1 ring-red-200">
                              <ArrowDownRight />
                            </span>
                          </span>
                        )}
                      </td>
                      <td>{date}</td>
                      <td
                        className="max-w-xs truncate whitespace-nowrap px-6"
                        title={description}
                      >
                        {description}
                      </td>
                      <td className="px-6">{category}</td>
                      <td className="px-6"></td>
                    </tr>
                  ),
                )}
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
      </div>
    </section>
  );
}
