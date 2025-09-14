import { NextFunction, Request, Response } from "express-serve-static-core";
import { whiteList } from "../config/cors";

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;
  if (origin && whiteList.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
};
