export interface Debt {
  id: string;
  userId: string;
  friendName: string;
  value: number;
  status: DebtStatus;
}

export enum DebtStatus {
  Pending = "pending",
  Paid = "paid",
}
