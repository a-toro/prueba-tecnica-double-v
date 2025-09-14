import * as Yup from "yup";
import { useFormik } from "formik";
import type { Debt } from "../types/debt";
import { DebtStatus } from "../types/debt";
import { useSnackbar } from "notistack";
import { API_BASE_URL } from "../lib/constants";

interface DebtsFormProps {
  debt?: Debt;
  onClose: () => void;
  onReload?: () => void;
  isOnlyView?: boolean;
}

const initialValues = function (debt?: Debt) {
  return {
    name: debt?.friendName || "",
    amount: debt?.value || "",
    status: debt?.status || DebtStatus.Pending,
  };
};

const validationSchema = function () {
  return Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    amount: Yup.number()
      .positive("Ingreser un valor positivo")
      .required("Campo obligatorio"),
    status: Yup.string().required("Campo obligatorio"),
  });
};

export function DebtsForm({
  debt,
  onClose,
  onReload,
  isOnlyView,
}: DebtsFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: initialValues(debt),
    validationSchema: validationSchema(),
    onSubmit: async (values) => {
      try {
        // Crear nueva deuda
        if (!debt) {
          const newDebt = {
            friendName: values.name,
            status: values.status,
            value: Number(values.amount),
          };
          const response = await fetch(`${API_BASE_URL}/debts`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newDebt),
          });

          if (response.status !== 204) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          enqueueSnackbar("Registro exitoso", { variant: "success" });

          // Refrescar tabla
          if (onReload instanceof Function) onReload();

          // Cerrar modal
          if (onClose instanceof Function) onClose();
        } else {
          // Editar deuda
          const updateDebt = {
            friendName: values.name,
            status: values.status,
            value: Number(values.amount),
          };
          const response = await fetch(`${API_BASE_URL}/debts/${debt.id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(updateDebt),
          });

          if (response.status !== 204) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          enqueueSnackbar("Registro actualizado", { variant: "success" });
          // Refrescar tabla
          if (onReload instanceof Function) onReload();
          // Cerrar modal
          if (onClose instanceof Function) onClose();
        }
      } catch (error) {
        let message = "Ah ocurrido un error. Intente nuevamente";
        if (error instanceof Error) {
          message = error.message;
        }
        enqueueSnackbar(message, { variant: "error" });
      }
    },
  });

  return (
    <div className="flex flex-col gap-2 max-w-md sm:min-w-sm">
      <h2 className="text-lg font-semibold">
        {debt
          ? isOnlyView
            ? "Visualizar deuda"
            : "Actualizar deuda"
          : "Nueva deuda"}
      </h2>
      <p className="text-sm text-gray-500">
        {debt
          ? isOnlyView
            ? "Visualize los datos datos de su deuda"
            : "Complete los datos para actualizar los datos de su deuda"
          : "Complete los datos para registrar una nueva deuda"}
      </p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nombre de la deuda</label>
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full border rounded-sm outline-0 p-2 focus:border-blue-600 focus:shadow"
              name="name"
              id="name"
              type="text"
              disabled={isOnlyView}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="amount">Monto</label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              className="w-full border rounded-sm outline-0 p-2 focus:border-blue-600 focus:shadow"
              disabled={isOnlyView}
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="text-red-500 text-sm">{formik.errors.amount}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="border w-full p-2 focus:border-blue-600 focus:shadow outline-0 rounded-sm"
              disabled={isOnlyView}
            >
              <option value="pending">Pendiente</option>
              <option value="paid">Pagada</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="text-red-500 text-sm">{formik.errors.status}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-wrap-reverse items-center gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={() => {
              if (onClose instanceof Function) onClose();
            }}
            type="button"
            className="w-full sm:w-auto bg-white border-gray-400 border px-4 py-2 text-sm inline-flex justify-center items-center rounded-sm"
          >
            {isOnlyView ? "Cerrar" : "Cancelar"}
          </button>
          {!isOnlyView && (
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full sm:w-auto bg-black/90 text-white rounded-sm inline-flex justify-center items-center text-sm h-fit px-4 py-2 "
            >
              {debt ? "Actualizar" : "Crear deuda"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
