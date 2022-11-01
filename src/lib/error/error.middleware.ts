import { NextFunction, Request, Response } from 'express';

export const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).end();
  next();
};
