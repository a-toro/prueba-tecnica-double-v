import { useState } from "react";
import { currencyFormat } from "../lib/currencyFormat";
import { DebtStatus, type Debt } from "../types/debt";
import ChipStatusDebt from "./ui/ChipStatusDebt";
import Modal from "./ui/Modal";
import { DebtsForm } from "./DebtsForm";
import { API_BASE_URL } from "../lib/constants";
import { useSnackbar } from "notistack";

interface DebtsTableItemProps {
  debt: Debt;
  onReload: () => void;
}
export default function DebtsTableItem({
  debt,
  onReload,
}: DebtsTableItemProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [openUpdateDebt, setOpenUpdateDebt] = useState(false);
  const [openViewDebt, setOpenViewDebt] = useState(false);
  const [openDeleteDebt, setOpenDeleteDebt] = useState(false);

  const onUpdateDebtOpenClose = () => setOpenUpdateDebt((prev) => !prev);
  const onViewDebtOpenClose = () => setOpenViewDebt((prev) => !prev);
  const onDeleteDebtOpenClose = () => setOpenDeleteDebt((prev) => !prev);

  const deleteDebt = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/debts/${debt.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      enqueueSnackbar("Registro eliminado", { variant: "success" });
      // Refrescar tabla
      if (onReload instanceof Function) onReload();
      // Cerrar modal
      onDeleteDebtOpenClose();
    } catch (error) {
      let message = "Ah ocurrido un error. Intente nuevamente";
      if (error instanceof Error) {
        message = error.message;
      }
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <>
      <tr key={debt.id} className="h-10">
        <td>{debt.friendName}</td>

        <td>{currencyFormat(debt?.value || 0)}</td>
        <td>
          <ChipStatusDebt status={debt.status as DebtStatus} />
        </td>
        <td>
          <div className="flex gap-1">
            <button onClick={onDeleteDebtOpenClose}>Eliminar</button>
            <button onClick={onViewDebtOpenClose}>Ver</button>
            {debt.status === DebtStatus.Pending && (
              <button onClick={onUpdateDebtOpenClose}>Editar</button>
            )}
          </div>
        </td>
      </tr>
      {/* Modal para actualizar deuda */}
      <Modal open={openUpdateDebt} setOpen={setOpenUpdateDebt}>
        <DebtsForm
          onReload={onReload}
          debt={debt}
          onClose={onUpdateDebtOpenClose}
        />
      </Modal>
      {/* Modal para visualizar deuda */}
      <Modal open={openViewDebt} setOpen={setOpenViewDebt}>
        <DebtsForm
          onReload={onReload}
          debt={debt}
          onClose={onViewDebtOpenClose}
          isOnlyView={true}
        />
      </Modal>
      {/* Modal para eliminar deuda */}
      <Modal open={openDeleteDebt} setOpen={setOpenDeleteDebt}>
        <div className="flex flex-col gap-7 h-ful">
          <p className="text-md">
            ¿Desea eliminar el registro{" "}
            <span className="font-semibold">{debt.friendName}</span>?
          </p>
          <div className="flex flex-row items-center justify-end gap-2">
            <button
              onClick={onDeleteDebtOpenClose}
              type="button"
              className="w-full sm:w-auto bg-white border-gray-400 border px-4 py-2 text-sm inline-flex justify-center items-center rounded-sm"
            >
              Cancelar
            </button>
            <button
              onClick={deleteDebt}
              className="w-full sm:w-auto bg-red-600 text-white rounded-sm inline-flex justify-center items-center text-sm h-fit px-4 py-2 "
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
