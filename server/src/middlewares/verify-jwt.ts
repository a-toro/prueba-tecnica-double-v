import { NextFunction, Request, Response } from "express-serve-static-core";
import { verifyAccessToken } from "../lib/jwt";
import { JWT_SCHEMA } from "../lib/constants";
import { UserAuth } from "../types/user-auth";
import { AuthRepository } from "../auth/auth-repository";

const authRepository = new AuthRepository();

export async function verifyJWT(
  req: Request<UserAuth>,
  res: Response,
  next: NextFunction
): Promise<any> {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith(JWT_SCHEMA))
    return res.sendStatus(401);

  const token = authHeader?.split(" ")?.[1] as string;

  const decoded = verifyAccessToken(token);

  if (!decoded) return res.sendStatus(403);

  const findUser = await authRepository.findUserByEmail(decoded.email);

  if (!findUser) return res.sendStatus(403);

  req.user = {
    id: findUser.id,
    username: findUser.name,
    email: findUser.email,
  };

  next();
}
