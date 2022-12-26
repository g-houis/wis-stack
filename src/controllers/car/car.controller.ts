import express, { Response } from 'express';
import { validate } from '../../lib/validator/validate.middleware';
import { CarDto, postCarSchema } from './car.validations';
import { ProjectError, WsErrors } from '../../lib/error/error.types';
import { TypedRequest } from '../../lib/request/TypedRequest.type';
import CarService from '../../services/car/car.service';

const carController = express.Router();

carController.get('/error', () => {
  throw new ProjectError(WsErrors.ERROR);
});

carController.post('/', validate(postCarSchema), (req: TypedRequest<CarDto>, res: Response) => {
  const createdCar = CarService.createCar(req.body);
  res.status(200).send(createdCar);
});

export default carController;