import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "./auth-dto";
import { createUserSchema, loginSchema } from "./auth-schemas";
import { login, registerNewUser } from "./auth-services";

export async function registerUser(
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const parseRequest = createUserSchema.safeParse(req.body);

    if (!parseRequest.success) {
      const errors = parseRequest.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json({
        data: null,
        errors,
        statusCode: 400,
      });
    }

    await registerNewUser({
      username: parseRequest.data.username,
      email: parseRequest.data.email,
      password: parseRequest.data.password,
    });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error && error.message === "Usuario no disponible") {
      return res.status(400).json({ error: error.message, statusCode: 400 });
    }
    next(error);
  }
}

export async function loginUser(
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const parseRequest = loginSchema.safeParse(req.body);

    if (!parseRequest.success) {
      const errors = parseRequest.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json({
        data: null,
        errors,
        statusCode: 400,
      });
    }

    const result = await login({
      email: parseRequest.data.email,
      password: parseRequest.data.password,
    });

    if (!result) {
      return res.status(400).json({
        message: "Email o contraseña incorrectos",
        statusCode: 400,
      });
    }

    return res.status(200).json({
      data: {
        user: result.users,
      },
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
}
