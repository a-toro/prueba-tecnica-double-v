import { NextFunction, Request, Response } from "express-serve-static-core";

export function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log({ error });
  if (error instanceof Error) {
    return res.status(500).json({
      message: error.message,
    });
  } else {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
