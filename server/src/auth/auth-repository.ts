import { CreateUserDto } from "../auth/auth-dto";
import { pool } from "../data/db";

export class AuthRepository {
  async findUserByEmail(email: string) {
    const query = "SELECT id, username, email, password FROM users WHERE email = $1 LIMIT 1";
    const result = await pool.query(query, [email]);
    console.log({ findUserByEmail: result.rows });
    return result.rows[0];
  }

  async create(user: CreateUserDto) {
    const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email
        ;
    `;

    const result = await pool.query(query, [
      user.username,
      user.email,
      user.password,
    ]);

    console.log({ createUser: result });
    return result.rows[0];
  }
}
