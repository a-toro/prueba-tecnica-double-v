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

export async function getDebtByIdService(userId: string, debtId: string) {
  return debtRepository.getDebtById(userId, debtId);
}

export async function getAllDebtByIdService(userId: string) {
  return debtRepository.getAllByUserId(userId);
}
