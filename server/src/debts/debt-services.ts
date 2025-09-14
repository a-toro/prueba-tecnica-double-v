import { CreateDebtDto } from "./debt-dto";
import { DebtRepository } from "./debt-repository";

const debtRepository = new DebtRepository();

export async function registerNewDebt(debt: CreateDebtDto, userId: string) {
  return debtRepository.createDebt(
    {
      friendName: debt.friendName,
      status: debt.status,
      value: debt.value,
    },
    userId
  );
}
