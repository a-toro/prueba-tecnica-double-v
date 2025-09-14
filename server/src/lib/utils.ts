import bcryptjs from "bcryptjs";
import { EnvConfig } from "../config/env";

export async function hashPassword(password: string): Promise<string> {
  return await bcryptjs.hash(password, EnvConfig.SALT_ROUNDS);
}
