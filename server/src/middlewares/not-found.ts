import { NextFunction, Request, Response } from "express-serve-static-core";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const urlPath = req.url;
  return next(new Error(`Route ${urlPath} not found`));
}
