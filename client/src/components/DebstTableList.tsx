import type { Debt } from "../types/debt";
import DebtsTableItem from "./DebtsTableItem";

interface DebstTableListProps {
  debts: Debt[];
  onReload: () => void;
}

export default function DebstTableList({
  debts,
  onReload,
}: DebstTableListProps) {
  if (debts.length <= 0)
    return (
      <tr>
        <td colSpan={4}>
          <p className="py-4 text-gray-500 text-center">
            Aún no hay datos disponibles para visualizar
          </p>
        </td>
      </tr>
    );

  return debts.map((debt) => (
    <DebtsTableItem key={debt.id} debt={debt} onReload={onReload} />
  ));
}
