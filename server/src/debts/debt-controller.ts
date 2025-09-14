import { NextFunction, Request, Response } from "express";
import { CreateDebtDto } from "./debt-dto";
import { createDebtSchema } from "./debt-schemas";
import { getDebtByIdService, registerNewDebt } from "./debt-services";

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

export async function getDebtByIdController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const debtId = req.params.id;

    console.log({ debtId });

    if (!debtId.trim()) {
      return res.status(400).json({
        error: {
          message: "El param id es obligatorio",
        },
      });
    }

    const userId = req.user!.id;

    const debt = await getDebtByIdService(userId, debtId);

    if (!debt)
      return res.status(400).json({
        error: `No se encontró el id ${debtId}`,
      });

    return res.status(200).json({
      debt,
    });
  } catch (error) {
    next(error);
  }
}
