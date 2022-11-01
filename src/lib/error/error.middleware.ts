import express, { NextFunction, Request, Response } from 'express';
import { ApiError, BadRequestError, ERRORS_TYPE, NotFoundError, WsErrors } from './error.types';

export const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(new NotFoundError(WsErrors.notFound.default));
};

export const errorHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next?: NextFunction,
): void => {
  switch (error.name) {
    case ERRORS_TYPE.BAD_REQUEST:
      apiErrorHandler(error as BadRequestError, req, res);
      break;
    case ERRORS_TYPE.ERROR:
      apiErrorHandler(error as ApiError, req, res);
      break;
    case ERRORS_TYPE.NOT_FOUND:
      apiErrorHandler(error as ApiError, req, res);
      break;
    default:
      unknowErrorHandler(error, req, res);
  }
  next();
};

const apiErrorHandler = (
  error: ApiError,
  req: express.Request,
  res: express.Response,
): void => {
  if (error.name === ERRORS_TYPE.ERROR) {
    console.error(`${error.name} ${error.message} ${error.stack}`);
  } else {
    console.error(`${error.name} ${error.message}`);
  }
  res
    .status(error.status ?? 500)
    .send({
      error: {
        code: error.code,
        title: error.title,
        detail: error.detail,
        fields: error.fields,
      },
    });
};

const unknowErrorHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
): void => {
  console.error(`${error.name} ${error.message} ${error.stack}`);
  res
    .status(500)
    .send({ error: { name: ERRORS_TYPE.ERROR } });
};