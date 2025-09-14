import { useState } from "react";
import { DebtsForm } from "../components/DebtsForm";
import Modal from "../components/ui/Modal";
import useFetch from "../hooks/useFetch";
import DebstTable from "../components/DebstTable";
import type { Debt } from "../types/debt";
import { API_BASE_URL } from "../lib/constants";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const { isError, isLoading, data, onReload } = useFetch<{
    debts: Debt[];
  }>(`${API_BASE_URL}/debts?status=${filter}`);

  const onOpenClose = () => setOpen((prev) => !prev);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    if (onReload instanceof Function) onReload();
  };

  if (isLoading) return <div>Cargando datos...</div>;
  if (isError) return <div>Error al cragar los datos</div>;

  const debtsList = data!.debts as Debt[];

  return (
    <>
      <main className="p-5 w-full flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p className="text-gray-500 text-sm">
              Gestiona y controla todas tus deudas desde aquí
            </p>
          </div>
          <button
            onClick={onOpenClose}
            className="w-full sm:w-auto bg-black/90 text-white rounded-sm inline-flex justify-center items-center text-sm h-fit px-4 py-2 "
          >
            Registrar deuda
          </button>
        </div>
        <div className="border px-4 py-2 rounded-sm border-gray-500">
          <div className="flex flex-row gap-2 items-center">
            <span>Filtrar: </span>
            <select
              value={filter}
              onChange={handleFilter}
              className="px-4 py-2 outline-0"
            >
              <option value="all">Todo</option>
              <option value="pending">Pendientes</option>
              <option value="paid">Pagadas</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="w-auto text-2xl font-semibold">
            Gestionar tus deudas
          </h2>
          <DebstTable debts={debtsList} onReload={onReload} />
        </div>
      </main>
      <Modal open={open} setOpen={setOpen}>
        <DebtsForm onClose={onOpenClose} onReload={onReload} />
      </Modal>
    </>
  );
}
