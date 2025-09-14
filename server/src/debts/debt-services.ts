import { DebtStatus } from "../models/debt";
import { CreateDebtDto, UpdateDebtDto } from "./debt-dto";
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

export async function updateDebtService(
  debt: UpdateDebtDto,
  userId: string,
  debtId: string
) {
  const findDebt = await getDebtByIdService(userId, debtId);

  if (!findDebt) {
    throw new Error(`La deuda con id ${debtId} no existe.`);
  }

  // Regla de negocio: una deuda pagada no puede ser modificada.
  if (findDebt.status === DebtStatus.Paid) {
    throw new Error(
      `No se pueden actualizar registros con status ${DebtStatus.Paid}`
    );
  }

  if (Number(debt.value) < 0) {
    throw new Error("El campo value deber ser positivo");
  }

  return debtRepository.updateDebt(
    {
      friendName: debt.friendName ? debt.friendName : findDebt.friendName,
      value: debt.value ? debt.value : findDebt.value,
      status: debt.status ? debt.status : findDebt.status,
    },
    userId,
    debtId
  );
}

export async function deleteDebtService(userId: string, debtId: string) {
  const findDebt = await getDebtByIdService(userId, debtId);

  if (!findDebt) {
    throw new Error(`La deuda con id ${debtId} no existe.`);
  }

  return debtRepository.deleteDebt(userId, debtId);
}
