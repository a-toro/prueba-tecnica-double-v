import { CreateUserDto } from "../auth/auth-dto";
import { pool } from "../data/db";
import { CreateDebtDto, DebtDto, UpdateDebtDto } from "./debt-dto";

export class DebtRepository {
  async createDebt(debt: CreateDebtDto, userId: string) {
    const query = `
        INSERT INTO debts ("userId", "friendName", value, status)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        ;
    `;

    const result = await pool.query(query, [
      userId,
      debt.friendName,
      debt.value,
      debt.status,
    ]);

    console.log({ createDebt: result });
    return result.rows[0];
  }

  
}
