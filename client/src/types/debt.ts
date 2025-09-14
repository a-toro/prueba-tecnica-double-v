// export type DebtStatus = "pending" | "paid";
export const DebtStatus = {
  Pending: "pending",
  Paid: "paid",
} as const;

// Tipo derivado del objeto
export type DebtStatus = (typeof DebtStatus)[keyof typeof DebtStatus];

export interface Debt {
  id: string;
  name?: string;
  friendName?: string;
  value?: number;
  status?: DebtStatus;
}
