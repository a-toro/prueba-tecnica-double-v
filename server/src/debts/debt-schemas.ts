import { z } from "zod";
import { DebtStatus } from "../models/debt";

export const createDebtSchema = z.object({
  friendName: z
    .string({ error: "El campo friendName es obligatorio" })
    .trim()
    .min(1, "El campo friendName es obligatorio")
    .nonempty("El campo friendName es obligatorio"),
  value: z
    .number({ error: "El campo value debe ser un valor númerico" })
    .positive("El campo value debe ser positivo mayor que cero"),
  status: z.enum([DebtStatus.Pending, DebtStatus.Paid], {
    error: `El campo status debe de ser del valor ${DebtStatus.Pending} o ${DebtStatus.Paid}`,
  }),
});
