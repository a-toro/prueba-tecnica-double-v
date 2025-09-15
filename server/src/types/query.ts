import { DebtStatus } from "../models/debt";

export interface QueryDebtFiter {
  status?: "all" | DebtStatus.Pending | DebtStatus.Paid;
}
