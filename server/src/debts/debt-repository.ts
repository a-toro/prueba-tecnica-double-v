import { CreateUserDto } from "../auth/auth-dto";
import { pool } from "../data/db";
import { DebtStatus } from "../models/debt";
import { QueryDebtFiter } from "../types/query";
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

  async getDebtById(
    userId: string,
    debtId: string
  ): Promise<DebtDto | undefined> {
    const query = `SELECT id, "friendName", value, status FROM debts WHERE "userId" = $1 and id = $2;`;
    const result = await pool.query(query, [userId, debtId]);
    console.log({ getDebtById: result.rows[0] });
    return result.rows[0];
  }

  async getAllByUserId(
    userId: string,
    filter?: QueryDebtFiter
  ): Promise<DebtDto[] | undefined> {
    let whereStatement = `WHERE "userId" = $1`;
    const values: any[] = [userId];

    let statusField = "";
    if (filter?.status === "pending") {
      whereStatement += ` AND status = $2`;
      values.push(DebtStatus.Pending);
    } else if (filter?.status === "paid") {
      whereStatement += ` AND status = $2`;
      values.push(DebtStatus.Paid);
    }
    const query = `SELECT id, "friendName", value, status FROM debts ${whereStatement};`;
    const result = await pool.query(query, values);
    console.log({ getAllByUserId: result.rows[0] });
    return result.rows;
  }

  async updateDebt(debt: UpdateDebtDto, userId: string, debtId: string) {
    const query = `
        UPDATE debts
        SET 
          "friendName" = $1,
          value = $2,
          status = $3
        WHERE
          "userId" = $4 and id = $5
        RETURNING id;
    `;

    const result = await pool.query(query, [
      debt.friendName,
      debt.value,
      debt.status,
      userId,
      debtId,
    ]);

    console.log({ updateDebt: result });
    return result.rows[0];
  }

  async deleteDebt(userId: string, debtId: string) {
    const query = `
        DELETE FROM debts
        WHERE
          "userId" = $1 and id = $2
        RETURNING id;
    `;

    const result = await pool.query(query, [userId, debtId]);

    console.log({ deleteDebt: result });
    return result.rows[0];
  }
}
