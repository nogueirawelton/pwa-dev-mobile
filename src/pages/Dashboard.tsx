import { Plus } from "phosphor-react";

const mock = [
  {
    name: "Transação 1",
    type: "deposit",
    description: "Lorem ipsum dolor sit amet",
    category: "Teste",
  },
];

export function Dashboard() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <strong className="text-sm font-semibold text-zinc-800">
          Transações Recentes
        </strong>
        <button className="flex items-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-zinc-100">
          <Plus weight="bold" className="text-zinc-100" />
          <span className="hidden text-sm sm:block">Nova Transação</span>
        </button>
      </div>
      <table className="mt-4 w-full">
        <thead>
          <tr className="bg-zinc-200">
            <th className="rounded-l-md py-2 text-sm font-medium text-zinc-500">
              Nome
            </th>
            <th className="py-2 text-sm font-medium text-zinc-500">Tipo</th>
            <th className="py-2 text-sm font-medium text-zinc-500">
              Descrição
            </th>
            <th className="py-2 text-sm font-medium text-zinc-500">
              Categoria
            </th>
            <th className="rounded-r-md"></th>
          </tr>
        </thead>
        <tbody>
          {mock.map(({ name, type, description, category }) => (
            <tr>
              <td>{name}</td>
              <td>{type}</td>
              <td>{description}</td>
              <td>{category}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
