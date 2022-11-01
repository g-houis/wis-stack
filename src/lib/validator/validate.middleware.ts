import {NextFunction, Request, Response} from 'express';
import Joi, { Schema, ValidationErrorItem } from 'joi';
import { BadRequestError, FieldError, WsErrors } from '../error/error.types';

type RequestSchema = {
    params?: Schema,
    body?: Schema,
    query?: Schema
}

type RequestData = {
    params?: unknown,
    body?: unknown,
    query?: unknown
}

export const validate = (schema: RequestSchema) => (req: Request, res: Response, next: NextFunction): void => {
    const toValidate: RequestData = {};
    if (req?.params && Object.keys(req?.params).length ) toValidate.params = req.params;
    if (req?.query && Object.keys(req?.query).length) toValidate.query = req.query;
    if (req?.body && Object.keys(req?.body).length) toValidate.body = req.body;

    const { value, error } = Joi.compile(schema)
        .prefs({abortEarly: false})
        .validate(toValidate);

    if (error) {
        const errors: FieldError[] = error.details.map((details: ValidationErrorItem) => ({field: details.context.key, reason: details.message}));
        return next(new BadRequestError(WsErrors.badRequest.default, errors));
    }

    Object.assign(req, value);
    return next();
};