import { createAccessToken } from "../lib/jwt";
import { hashPassword } from "../lib/utils";
import { CreateUserDto, CredentialsUserDto } from "./auth-dto";
import { AuthRepository } from "./auth-repository";
import bcrypt from "bcryptjs";

const authRepository = new AuthRepository();

export async function registerNewUser(user: CreateUserDto) {
  // Validar si el email no esta registrado y esta disponible.
  const findUser = await authRepository.findUserByEmail(user.email);

  if (findUser) {
    throw new Error("Usuario no disponible");
  }
  // Hash password
  const hashedPassword = await hashPassword(user.password);

  return authRepository.create({
    email: user.email,
    username: user.username,
    password: hashedPassword,
  });
}

export async function login(userCredentials: CredentialsUserDto) {
  // Validar si el email se encientra registrado
  const findUser = await authRepository.findUserByEmail(userCredentials.email);

  if (!findUser) return null;

  const matchPassword = await bcrypt.compare(
    userCredentials.password,
    findUser.password
  );

  if (!matchPassword) return null;

  const accessToken = createAccessToken({
    email: findUser.email,
    id: findUser.id,
  });

  return {
    users: {
      id: findUser.id,
      username: findUser.username,
    },
    accessToken,
  };
}
