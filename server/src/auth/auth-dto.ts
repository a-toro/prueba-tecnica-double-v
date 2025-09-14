import { User } from "../models/user";

export interface CreateUserDto extends Omit<User, "id" | "createdAt"> {}

export interface CredentialsUserDto extends Pick<User, "email" | "password"> {}
