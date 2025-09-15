import * as dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Cargar el archivo .env desde la raiz del proyecto.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export type EnvConfig = typeof EnvConfig;

const envEschema = z.object({
  API_PORT: z.coerce.number().default(5000),
  API_ROOT: z.string().default("/api"),
  JWT_ACCESS_TOKEN_SECRET: z
    .string()
    .min(1, "La variable JWT_SECRET_KEY es obligatoria"),
  SALT_ROUNDS: z.coerce
    .number()
    .min(1, "La variable SALT_ROUNDS es obligatoria"),
  PG_HOST: z.string().min(1, "La variable PG_HOST es obligatoria"),
  PG_PORT: z.string().min(1, "La variable PG_PORT es obligatoria"),
  PG_USER: z.string().min(1, "La variable PG_USER es obligatoria"),
  PG_PASSWORD: z.string().min(1, "La variable PG_PASSWORD es obligatoria"),
  PG_DATABASE: z.string().min(1, "La variable PG_DATABASE es obligatoria"),
  REDIS_URL: z.string().min(1, "La variable PG_DATABASE es obligatoria"),
});

const { success, error, data } = envEschema.safeParse(process.env);

if (!success) {
  console.error("Error en las variables de entorno", error.format());
  process.exit(1);
}

const {
  API_PORT = 5000,
  API_ROOT = "/api",
  JWT_ACCESS_TOKEN_SECRET,
  SALT_ROUNDS,
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  REDIS_URL,
} = data;

export const EnvConfig = {
  API_PORT,
  API_ROOT,
  JWT_ACCESS_TOKEN_SECRET,
  SALT_ROUNDS,
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  REDIS_URL,
};

console.log({ EnvConfig });
