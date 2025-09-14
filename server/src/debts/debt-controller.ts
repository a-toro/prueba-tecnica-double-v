import { NextFunction, Request, Response } from "express";
import { CreateDebtDto } from "./debt-dto";
import { createDebtSchema } from "./debt-schemas";
import { registerNewDebt } from "./debt-services";

export async function registerDebt(
  req: Request<{}, {}, CreateDebtDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const parseRequest = createDebtSchema.safeParse(req.body);

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

    const userId = req.user!.id;

    await registerNewDebt(
      {
        friendName: parseRequest.data.friendName,
        value: parseRequest.data.value,
        status: parseRequest.data.status,
      },
      userId
    );

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
