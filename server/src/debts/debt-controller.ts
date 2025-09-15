import { NextFunction, Request, Response } from "express";
import { CreateDebtDto, DebtDto, UpdateDebtDto } from "./debt-dto";
import { createDebtSchema, updateDebtSchema } from "./debt-schemas";
import {
  deleteDebtService,
  getAllDebtByIdService,
  getDebtByIdService,
  registerNewDebt,
  updateDebtService,
} from "./debt-services";
import { QueryDebtFiter } from "../types/query";
import redisClient from "../lib/redis";
import { REDIS_CACHE_KEY_START } from "../lib/constants";
import { invalidCacheKeyRedis } from "../lib/invalidCacheKeyRedis";

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

    await invalidCacheKeyRedis(userId);

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

export async function getAllDebtByIdController(
  req: Request<{}, {}, {}, QueryDebtFiter>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.id;

    const query = req.query;

    const queryForKeyCache = new URLSearchParams(
      query as Record<string, string>
    );

    const cahcheKey = `${REDIS_CACHE_KEY_START}:${userId}:${queryForKeyCache.toString()}`;
    console.log({ cahcheKey });

    const cache = await redisClient.get(cahcheKey);

    let debts = undefined;
    if (cache) {
      debts = JSON.parse(cache);
    } else {
      debts = await getAllDebtByIdService(userId, query);
      await redisClient.setEx(cahcheKey, 60, JSON.stringify(debts));
    }

    if (!debts)
      return res.status(400).json({
        error: `Error al consultar las deudas registradas`,
      });

    return res.status(200).json({
      debts,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatetDebtController(
  req: Request<{ id: string }, {}, UpdateDebtDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const parseRequest = updateDebtSchema.safeParse(req.body);

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

    const debtId = req.params.id;

    if (!debtId.trim()) {
      return res.status(400).json({
        error: {
          message: "El param id es obligatorio",
        },
      });
    }

    const userId = req.user!.id;

    await updateDebtService(
      {
        friendName: parseRequest.data.friendName,
        value: parseRequest.data.value,
        status: parseRequest.data.status,
      },
      userId,
      debtId
    );

    await invalidCacheKeyRedis(userId);

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function deleteDebtController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const debtId = req.params.id;

    if (!debtId.trim()) {
      return res.status(400).json({
        error: {
          message: "El param id es obligatorio",
        },
      });
    }

    const userId = req.user!.id;

    await deleteDebtService(userId, debtId);

    await invalidCacheKeyRedis(userId);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
