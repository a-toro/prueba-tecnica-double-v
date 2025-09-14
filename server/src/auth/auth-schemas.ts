import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "El campo username es obligatorio")
    .nonempty("El campo name es obligatorio"),
  email: z.email("Email no válido").min(1, "El campo email es obligatorio"),
  password: z
    .string()
    .trim()
    .min(1, "El campo password es obligatorio")
    .nonempty("El campo password es obligatorio"),
});

export const loginSchema = z.object({
  email: z
    .email("Email nó valido")
    .trim()
    .min(1, "El campo email es obligatorio"),
  password: z
    .string()
    .trim()
    .min(1, "El campo password es obligatorio")
    .nonempty("El campo password es obligatorio"),
});
