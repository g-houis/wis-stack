import express, { Response } from 'express';
import { validate } from '../../lib/validator/validate.middleware';
import { CarDto, postCarSchema } from './car.validations';
import { ProjectError, WsErrors } from '../../lib/error/error.types';
import { TypedRequest } from '../../lib/request/TypedRequest.type';

const carController = express.Router();

carController.get('/error', () => {
  throw new ProjectError(WsErrors.ERROR);
});

carController.post('/', validate(postCarSchema), (req: TypedRequest<CarDto>, res: Response) => {
  res.status(200).send(req.body);
});

export default carController;