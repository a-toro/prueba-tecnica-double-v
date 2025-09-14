import { Pool } from "pg";
import { EnvConfig } from "../config/env";

export const pool = new Pool({
  host: EnvConfig.PG_HOST,
  port: Number(EnvConfig.PG_PORT),
  user: EnvConfig.PG_USER,
  password: EnvConfig.PG_PASSWORD,
  database: EnvConfig.PG_DATABASE,
});
