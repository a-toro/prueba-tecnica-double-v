import type { DebtStatus } from "../../types/debt";

interface ChipStatusDebtProps {
  status: DebtStatus;
}

const statusStyle: Record<DebtStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  paid: "bg-green-100 text-green-800 border-green-300",
};
export default function ChipStatusDebt({ status }: ChipStatusDebtProps) {
  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full border ${statusStyle[status]}`}
    >
      {status === "pending" ? "Pendiente" : "Pagado"}
    </span>
  );
}
