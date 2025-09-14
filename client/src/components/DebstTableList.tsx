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
    return <p>Aún no hay datos disponibles para visualizar</p>;

  return debts.map((debt) => (
    <DebtsTableItem key={debt.id} debt={debt} onReload={onReload} />
  ));
}
