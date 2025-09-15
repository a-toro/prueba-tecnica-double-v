import type { Debt } from "../types/debt";
import DebstTableList from "./DebstTableList";

interface DebstTableProps {
  debts: Debt[];
  onReload: () => void;
}

export default function DebstTable({ debts, onReload }: DebstTableProps) {
  return (
    <div className=" border w-auto border-gray-400 rounded-md p-4 flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Lista de deudas</h3>
      <div className="border border-gray-500 rounded-md p-4 overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">Nombre</th>
              <th className="text-left">Monto</th>
              <th className="text-left">Estado</th>
              {/* <th>Fecha</th> */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{<DebstTableList debts={debts} onReload={onReload} />}</tbody>
        </table>
      </div>
    </div>
  );
}
