import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt-payload";
import { EnvConfig } from "../config/env";

export function createAccessToken({
  ...payload
}: Omit<JwtPayload, "iat" | "exp">) {
  const token = jwt.sign(payload, EnvConfig.JWT_ACCESS_TOKEN_SECRET, {
    // expiresIn: "30s",
    expiresIn: "1h",
  });

  return token;
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, EnvConfig.JWT_ACCESS_TOKEN_SECRET) as JwtPayload;
  } catch (error) {
    console.log({ error });
    return null;
  }
}
