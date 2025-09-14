import { Debt } from "../models/debt";

export interface DebtDto extends Omit<Debt, "createdAt"> {}
export interface CreateDebtDto
  extends Omit<Debt, "id" | "createdAt" | "userId"> {}
export interface UpdateDebtDto
  extends Partial<Pick<Debt, "friendName" | "value" | "status">> {}
